import React, { useCallback, useRef } from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { useStaticQuery, graphql } from "gatsby";
import { load } from "recaptcha-v3";


const ContactPage = () => {
    const recaptchaInput = useRef<HTMLInputElement | null>(null);
    const form = useRef<HTMLFormElement | null>(null);
    const fieldset = useRef<HTMLFieldSetElement | null>(null);
    const data = useStaticQuery(graphql`
      query {
        headshot: file(relativePath: { eq: "headshot.jpg" }) {
          publicURL
        }
      }
`);
    const getRecaptchaAndSubmit = useCallback(async () => {
        if (!form.current) return;
        if (!recaptchaInput.current) return;

        const recaptcha = await load('6LdfwM8ZAAAAAOt9J_lEGUcHeWsTGpYBOaSpZB4x');
        const token = await recaptcha.execute('submit');
        recaptchaInput.current.value = token;
        form.current.submit();
    }, [form, recaptchaInput]);

    const submitForm = useCallback((ev: React.SyntheticEvent) => {
        ev.preventDefault();
        if (!fieldset.current) return;
        if (!recaptchaInput.current?.value) {
            fieldset.current.disabled = true;
            getRecaptchaAndSubmit();
            return false;
        }
        return true;
    }, [fieldset, recaptchaInput, getRecaptchaAndSubmit]);

    return (
        <Layout>
            <SEO title="Contact Matt DeKrey" image={data.headshot.publicURL} />
            <section className="text-gray-700">
                <div className="flex flex-col text-center w-full mb-12">
                    <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">Contact Me</h1>
                    <p className="lg:w-2/3 mx-auto leading-relaxed text-base">Hey, you clicked the link above. You know what to do.</p>
                </div>
                <form action="http://contact-dekrey.azurewebsites.net/api/ContactMatt?" ref={form} onSubmit={submitForm} method="post" className="lg:w-1/2 md:w-2/3 mx-auto pb-8 border-b border-gray-200">
                    <input type="hidden" ref={recaptchaInput} name="g-recaptcha-response" id="g-recaptcha-response" />
                    <div className="flex flex-wrap -m-2">
                        <div className="p-2 md:w-1/2 w-full">
                            <label htmlFor="name" className="sr-only">Name</label>
                            <input id="name" name="name" required className="w-full bg-gray-100 rounded border border-gray-400 focus:outline-none focus:border-indigo-500 text-base px-4 py-2" placeholder="Name" type="text" />
                        </div>
                        <div className="p-2 md:w-1/2 w-full">
                            <label htmlFor="email" className="sr-only">Email</label>
                            <input id="email" name="email" type="email" required className="w-full bg-gray-100 rounded border border-gray-400 focus:outline-none focus:border-indigo-500 text-base px-4 py-2" placeholder="Email" />
                        </div>
                        <div className="p-2 w-full">
                            <label htmlFor="message" className="sr-only">Message</label>
                            <textarea id="message" name="message" required className="w-full bg-gray-100 rounded border border-gray-400 focus:outline-none h-48 focus:border-indigo-500 text-base px-4 py-2 resize-none block" placeholder="Message"></textarea>
                        </div>
                        <fieldset ref={fieldset}>
                            <div className="p-2 w-full">
                                <button type="submit" className="flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">Send</button>
                            </div>
                        </fieldset>
                    </div>
                </form>
                <div className="p-2 w-full pt-8 text-center">
                    <p className="lg:w-2/3 mx-auto leading-relaxed text-base">Or, sure, you can just send me an email.</p>
                    <a className="text-indigo-500" href="mailto:matt.dekrey@gmail.com">matt.dekrey@gmail.com</a>
                </div>
            </section>

        </Layout>
    );
}

export default ContactPage

