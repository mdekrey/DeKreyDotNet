using System;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using Microsoft.Extensions.Configuration;
using SendGrid.Helpers.Mail;
using SendGrid;
using System.Linq;

namespace ContactFunctions
{
    public static class ContactFunction
    {
        private static readonly IConfiguration config = new ConfigurationBuilder()
            .AddJsonFile("local.settings.json", optional: true, reloadOnChange: true)
            .AddEnvironmentVariables()
            .Build();

        public struct ContactForm
        {
            [JsonProperty("name")] public string Name { get; set; }
            [JsonProperty("email")] public string Email { get; set; }
            [JsonProperty("body")] public string Body { get; set; }
        }


        [FunctionName("ContactMatt")]
        public static async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Anonymous, "post", Route = null)] HttpRequest req,
            ILogger log)
        {
            try
            {
                var client = new SendGridClient(config["SendGridApiKey"]);
                var from = new EmailAddress("contact@dekrey.net", "Contact Form");
                var subject = $"{req.Form["name"]} via DeKrey.Net Contact Form";
                var to = new EmailAddress("mattdekrey@gmail.com", "Matt DeKrey");
                var plainTextContent = $@"{req.Form["name"]} <{req.Form["email"]}> writes...

{req.Form["message"]}";
                var htmlContent = $"<p>{req.Form["name"]} &lt;{req.Form["email"]}&gt; writes...</p><p>{req.Form["message"]}</p>";
                var msg = MailHelper.CreateSingleEmail(from, to, subject, plainTextContent, htmlContent);
                msg.ReplyTo = new EmailAddress(req.Form["email"], req.Form["name"]);
                var response = await client.SendEmailAsync(msg).ConfigureAwait(false);
                var referrer = req.Headers["Referer"].FirstOrDefault() ?? "https://dekrey.net/";
                if (response.StatusCode != System.Net.HttpStatusCode.Accepted)
                {
                    var responseBody = await response.Body.ReadAsStringAsync();
                    log.LogError(responseBody);
                    return new RedirectResult(new UriBuilder(referrer) { Path = "/contact/failure/" }.Uri.OriginalString);
                }
                else
                {
                    return new RedirectResult(new UriBuilder(referrer) { Path = "/contact/success/" }.Uri.OriginalString);
                }
            }
            catch (Exception ex)
            {
                log.LogError(ex, "Unknown exception: " + ex.ToString());
                throw;
            }
        }
    }
}
