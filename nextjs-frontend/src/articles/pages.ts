import { getAllPosts } from './utils';
import identity from 'lodash/fp/identity';
import groupBy from 'lodash/fp/groupBy';

const groupByIdentity = groupBy(identity);
export async function getCountByTag() {
	const allPosts = await getAllPosts();
	const allTags = allPosts.flatMap((post) => post.frontmatter.tags ?? []);

	const entries = Object.entries(groupByIdentity(allTags)).map(([tag, tags]) => [tag, tags.length] as const);

	return Object.fromEntries(entries);
}

export const postsPerPage = 5;
export async function getPageCount(tag?: string) {
	const posts = await getFilteredPosts(tag);
	return Math.ceil(posts.length / postsPerPage);
}

export async function getArticlesPage(page: number, tag?: string) {
	const posts = await getFilteredPosts(tag);
	const totalPageCount = Math.ceil(posts.length / postsPerPage);
	if (page < 1 || page > totalPageCount) return null;

	const selection = posts
		.sort((a, b) => -a.frontmatter.date.localeCompare(b.frontmatter.date))
		.slice((page - 1) * postsPerPage, page * postsPerPage);

	return { articles: selection, totalPageCount };
}

async function getFilteredPosts(tag?: string) {
	const allPosts = await getAllPosts();
	const filtered = !tag
		? allPosts.filter((post) => !post.frontmatter.draft)
		: allPosts.filter((post) => !post.frontmatter.draft).filter((post) => post.frontmatter.tags?.includes(tag));
	return filtered;
}
