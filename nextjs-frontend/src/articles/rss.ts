import fs from 'fs';
import { Feed, FeedOptions } from 'feed';
import { getAllPosts } from './utils';
import metadata from '../siteMetadata';

export async function generateRssFeed() {
	const allPosts = await getAllPosts();
	const site_url = metadata.url;

	const feedOptions: FeedOptions = {
		title: 'Blog | DeKrey.NET',
		description: 'Blog posts of Matt DeKrey',
		id: site_url,
		link: site_url,
		favicon: `${site_url}/favicon-32x32.png`,
		copyright: `All rights reserved ${new Date().getFullYear()}, Matt DeKrey`,
		generator: 'Feed for Node.js',
		feedLinks: {
			rss2: `${site_url}/rss.xml`,
		},
	};

	const feed = new Feed(feedOptions);

	allPosts.forEach((post) => {
		feed.addItem({
			title: post.frontmatter.title,
			id: `${site_url}/blog/${post.slug}`,
			link: `${site_url}/blog/${post.slug}`,
			description: post.excerpt,
			date: new Date(post.frontmatter.date),
		});
	});

	fs.writeFileSync('./public/rss.xml', feed.rss2());
}
