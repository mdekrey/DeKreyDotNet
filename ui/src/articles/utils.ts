import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { processSrcRoot } from '@/util/paths';
import type { BlogPost, BlogPostFrontmatter } from './post';
import type { MDXInstance } from 'astro';

export const contentFsRoot = path.join(processSrcRoot, 'articles');
export const contentUrlRoot = pathToFileURL(contentFsRoot).href;

export async function getAllPosts(): Promise<BlogPost[]> {
	const articles = await Promise.all(
		Object.values(
			import.meta.glob<MDXInstance<BlogPostFrontmatter>>('./*/index.mdx'),
		).map((v) => v()),
	);

	const result = articles
		.map((article) => {
			const slug = article.file
				.substring(contentFsRoot.length + 1)
				.split('/')[0];

			return {
				slug,
				...article,
			};
		})
		.filter((article): article is BlogPost => !!article.slug)
		.filter((post) => post.frontmatter.date)
		.sort((a, b) => -a.frontmatter.date.localeCompare(b.frontmatter.date));

	return result;
}
