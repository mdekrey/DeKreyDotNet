import type { APIContext } from 'astro';

import { getFilteredPosts } from '@/articles/pages';
import rss, { type RSSFeedItem } from '@astrojs/rss';
import { toSummary } from '@/articles/summary';
import { getFilteredThoughts } from '@/thoughts/pages';
import { toUrlTimestamp } from '@/thoughts/thought';
import { compareDesc } from 'date-fns';

export async function GET(context: APIContext) {
	const allPosts = (await getFilteredPosts()).map(toSummary).map(
		(article) =>
			({
				title: article.frontmatter.title ?? 'Untitled Blog Post',
				pubDate: new Date(article.frontmatter.date),
				description: article.excerpt,
				link: `/articles/${article.slug}/`,
			}) satisfies RSSFeedItem,
	);
	const allThoughts = (await getFilteredThoughts()).map((thought) => {
		console.log(toUrlTimestamp(thought));
		return {
			title: 'Quick thought by Matt DeKrey...',
			pubDate: thought.date,
			description: thought.excerpt,
			link: `/thoughts/${toUrlTimestamp(thought)}/`,
		} satisfies RSSFeedItem;
	});
	return rss({
		// `<title>` field in output xml
		title: 'DeKrey.NET Blog',
		// `<description>` field in output xml
		description: 'Personal articles and profile of Matt DeKrey',
		// Pull in your project "site" from the endpoint context
		// https://docs.astro.build/en/reference/api-reference/#contextsite
		site: (context.site ?? context.url).href,
		// Array of `<item>`s in output xml
		// See "Generating items" section for examples using content collections and glob imports
		items: [...allThoughts, ...allPosts].sort((a, b) =>
			compareDesc(a.pubDate!, b.pubDate!),
		),
		// (optional) inject custom xml
		customData: `<language>en-us</language>`,
	});
}
