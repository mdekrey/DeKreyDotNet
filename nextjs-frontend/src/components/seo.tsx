import React from 'react';
import Head from 'next/head';
import siteMetadata from '../siteMetadata';

function SEO({
	title,
	image: metaImage,
	description: metaDescription = siteMetadata.description,
}: {
	title: string;
	image?: string;
	description?: string;
}) {
	const rootUrl = (siteMetadata.url as string).replace(/\/$/, '');

	return (
		<Head>
			<link rel="shortcut icon" href="/favicon-32x32.png" />
			<title>
				{title} | {siteMetadata.title}
			</title>
			<meta name={`description`} content={metaDescription} />
			<meta property={`og:title`} content={title} />
			<meta property={`og:description`} content={metaDescription} />
			{metaImage ? <meta property={`og:image`} content={rootUrl + metaImage} /> : null},
			<meta property={`og:type`} content={`website`} />
			<meta name={`twitter:card`} content={`summary`} />
			<meta name={`twitter:creator`} content={siteMetadata.author} />
			<meta name={`twitter:title`} content={title} />
			<meta name={`twitter:description`} content={metaDescription} />
			<link rel="alternate" type="application/rss+xml" title="RSS Feed for Dekrey.NET" href="/rss.xml" />
		</Head>
	);
}

export default SEO;
