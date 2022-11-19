import React from 'react';

import Layout from '../../components/layout';
import SEO from '../../components/seo';

const ContactPage = () => (
	<Layout>
		<SEO title="Contact Matt DeKrey" />
		<section className="text-gray-700">
			<div className="flex flex-col text-center w-full mb-12">
				<h1 className="sm:text-3xl text-2xl font-medium mb-4 text-gray-900">Contact Me</h1>
				<p className="lg:w-2/3 mx-auto leading-relaxed text-base">
					It went through! Now, I'll just need to get through my inbox...
				</p>
			</div>
		</section>
	</Layout>
);

export default ContactPage;
