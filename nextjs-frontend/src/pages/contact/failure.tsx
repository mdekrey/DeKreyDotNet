import React from 'react';

import Layout from '../../components/layout';
import SEO from '../../components/seo';

const ContactPage = () => (
	<Layout>
		<SEO title="Contact Matt DeKrey" />
		<section className="text-gray-700">
			<div className="flex flex-col text-center w-full mb-12">
				<h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">Contact Me</h1>
				<div className="p-2 w-full pt-8 text-center">
					<p className="lg:w-2/3 mx-auto leading-relaxed text-base">
						Looks like there was a problem. It might be just easier to email me directly.
					</p>
					<a className="text-indigo-500" href="mailto:matt.dekrey@gmail.com">
						matt.dekrey@gmail.com
					</a>
				</div>
			</div>
		</section>
	</Layout>
);

export default ContactPage;
