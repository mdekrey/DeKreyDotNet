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
using System.Net.Http;

namespace ContactFunctions
{
    public static class ContactFunction
    {
        private static readonly HttpClient recaptchaHttpClient = new HttpClient();
        private static readonly IConfiguration config = new ConfigurationBuilder()
            .AddJsonFile("local.settings.json", optional: true, reloadOnChange: true)
            .AddEnvironmentVariables()
            .Build();

        [FunctionName("ContactMatt")]
        public static async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Anonymous, "post", Route = null)] HttpRequest req,
            ILogger log)
        {
            var referrer = req.Headers["Referer"].FirstOrDefault() ?? "https://dekrey.net/";
            try
            {
                if (!await VerifyRecaptcha(req.Form["g-recaptcha-response"], log))
                    return RedirectFailure(referrer);
                if (!await SendMessage(CreateMessage(req), log).ConfigureAwait(false))
                    return RedirectFailure(referrer);

                return RedirectSuccess(referrer);
            }
            catch (Exception ex)
            {
                log.LogError(ex, "Unknown exception: " + ex.ToString());
                return RedirectFailure(referrer);
            }
        }

        private static RedirectResult RedirectSuccess(string referrer)
        {
            return new RedirectResult(new UriBuilder(referrer) { Path = "/contact/success/" }.Uri.OriginalString);
        }

        private static RedirectResult RedirectFailure(string referrer)
        {
            return new RedirectResult(new UriBuilder(referrer) { Path = "/contact/failure/" }.Uri.OriginalString);
        }

        private static async Task<bool> VerifyRecaptcha(string response, ILogger log)
        {
            var recaptchaUrl = $"https://www.google.com/recaptcha/api/siteverify?secret={config["RecaptchaSecretKey"]}&response={response}";
            var verificationResponse = await recaptchaHttpClient.GetAsync(recaptchaUrl);
            var verificationContent = await verificationResponse.Content.ReadAsStringAsync();

            if (!verificationResponse.IsSuccessStatusCode)
            {
                log.LogError($"Error while sending request to reCAPTCHA service. {verificationContent}");
                return false;
            }
            return true;
        }

        private static async Task<bool> SendMessage(SendGridMessage msg, ILogger log)
        {
            var client = new SendGridClient(config["SendGridApiKey"]);
            var response = await client.SendEmailAsync(msg).ConfigureAwait(false);
            var isSuccess = response.StatusCode == System.Net.HttpStatusCode.Accepted;
            if (!isSuccess)
            {
                var responseBody = await response.Body.ReadAsStringAsync();
                log.LogError(responseBody);
            }

            return isSuccess;
        }

        private static SendGridMessage CreateMessage(HttpRequest req)
        {
            var from = new EmailAddress("contact@dekrey.net", "Contact Form");
            var subject = $"{req.Form["name"]} via DeKrey.NET Contact Form";
            var to = new EmailAddress("mattdekrey@gmail.com", "Matt DeKrey");
            var plainTextContent = $@"{req.Form["name"]} <{req.Form["email"]}> writes...

{req.Form["message"]}";
            var htmlContent = $"<p>{req.Form["name"]} &lt;{req.Form["email"]}&gt; writes...</p><p>{req.Form["message"]}</p>";
            var msg = MailHelper.CreateSingleEmail(from, to, subject, plainTextContent, htmlContent);
            msg.ReplyTo = new EmailAddress(req.Form["email"], req.Form["name"]);
            return msg;
        }
    }
}
