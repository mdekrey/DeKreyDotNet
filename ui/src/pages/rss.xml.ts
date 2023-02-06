import type { APIContext } from 'astro';

import { getFilteredPosts } from '@/articles/pages';
import rss from '@astrojs/rss';
import { toSummary } from '@/articles/summary';

export async function get(context: APIContext) {
	const allPosts = await getFilteredPosts();
	return rss({
		// `<title>` field in output xml
		title: 'DeKrey.NET Blog',
		// `<description>` field in output xml
		description: 'Personal articles and profile of Matt DeKrey',
		// Pull in your project "site" from the endpoint context
		// https://docs.astro.build/en/reference/api-reference/#contextsite
		site: (context.site ?? new URL('https://dekrey.net')).href,
		// Array of `<item>`s in output xml
		// See "Generating items" section for examples using content collections and glob imports
		items: allPosts.map(toSummary).map((article) => ({
			title: article.frontmatter.title ?? 'Untitled Blog Post',
			pubDate: new Date(article.frontmatter.date),
			description: article.excerpt,
			link: `/article/${article.slug}/`,
		})),
		// (optional) inject custom xml
		customData: `<language>en-us</language>`,
	});
}
