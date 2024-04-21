import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { compareDesc, parse } from 'date-fns';
import { processSrcRoot } from '@/util/paths';
import type { Thought, ThoughtFrontmatter } from './thought';
import type { MDXInstance } from 'astro';

export const contentFsRoot = path.join(processSrcRoot, 'articles');
export const contentUrlRoot = pathToFileURL(contentFsRoot).href;

export async function getAllThoughts(): Promise<Thought[]> {
	const articles = await Promise.all(
		Object.values(
			import.meta.glob<MDXInstance<ThoughtFrontmatter>>('./*/*.{md,mdx}'),
		).map((v) => v()),
	);

	const result = articles
		.map((article): Thought => {
			const path = article.file.substring(contentFsRoot.length + 1);

			const dateStr = /^(.+)\.mdx?$/g.exec(path)![1]!;
			const date = parse(dateStr, `yyyy-MM/dd'T'HHmmss`, new Date());

			return {
				date,
				...article,
			};
		})
		.filter((post) => post.date)
		.sort((a, b) => compareDesc(a.date, b.date));

	return result;
}

export function compareThoughts(a: Thought, b: Thought) {
	return compareDesc(a.date, b.date);
}
