import React from 'react';

import Layout from '../components/layout';
import SEO from '../components/seo';

const NotFoundPage = () => (
	<Layout>
		<SEO title="404: Not found" />
		<h1>404'd!</h1>
		<p>Oops! You broke it.</p>
		<p className="text-xs">I really hope this is logged somewhere&hellip;</p>
	</Layout>
);

export default NotFoundPage;
