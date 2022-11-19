import { getAllPosts } from './utils';

export const postsPerPage = 5;
export async function getPageCount(tag?: string) {
	const posts = await getAllPosts();
	// TODO: filter tag
	return Math.ceil(posts.length / postsPerPage);
}

export async function getArticlesPage(page: number, tag?: string) {
	const posts = await getAllPosts();
	// TODO: filter tag
	const totalPageCount = Math.ceil(posts.length / postsPerPage);
	if (page < 1 || page > totalPageCount) return null;

	const selection = posts
		.sort((a, b) => -a.frontmatter.date.localeCompare(b.frontmatter.date))
		.slice((page - 1) * postsPerPage, page * postsPerPage);

	return { articles: selection, totalPageCount };
}
