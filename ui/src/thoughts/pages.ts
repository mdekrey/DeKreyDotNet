import { compareThoughts, getAllThoughts } from './all';
import identity from 'lodash/fp/identity';
import groupBy from 'lodash/fp/groupBy';

export async function getThoughtCountByTag() {
	const allPosts = await getAllThoughts();
	const allTags = allPosts.flatMap((post) => post.frontmatter.tags ?? []);

	const entries = Object.entries(groupBy(identity, allTags)).map(
		([tag, tags]) => [tag, tags.length] as const,
	);

	return Object.fromEntries(entries);
}

export const postsPerPage = 20;
export async function getThoughtsPageCount(tag?: string) {
	const posts = await getFilteredThoughts(tag);
	return Math.ceil(posts.length / postsPerPage);
}

export async function getThoughtsPage(page: number, tag?: string) {
	const posts = await getFilteredThoughts(tag);
	const totalPageCount = Math.ceil(posts.length / postsPerPage);
	if (page < 1 || page > totalPageCount) return null;

	const selection = posts
		.sort(compareThoughts)
		.slice((page - 1) * postsPerPage, page * postsPerPage);

	return { thoughts: selection, totalPageCount };
}

export async function getFilteredThoughts(tag?: string) {
	const result = await getAllThoughts();
	if (tag) result.filter((post) => post.frontmatter.tags?.includes(tag));
	return result;
}
