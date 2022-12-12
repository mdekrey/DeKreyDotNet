import fs from 'fs';
import path from 'path';
import { remark } from 'remark';
import readingTime from 'remark-reading-time';
import { bundleMDX } from 'mdx-bundler';
import { remarkMdxImages } from 'remark-mdx-images';
import remarkUnwrapImages from 'remark-unwrap-images';
import rehypeHighlight from 'rehype-highlight';
import strip from 'strip-markdown';
import fsharp from 'highlight.js/lib/languages/fsharp';
import dockerfile from 'highlight.js/lib/languages/dockerfile';

export type BlogPost = { slug: string } & typeof import('something.mdx');

const articlesFsRoot = path.join(process.cwd(), 'src/articles');
const articlesImportRoot = 'src/articles';

let posts: BlogPost[] | undefined = undefined;
export async function getAllPosts() {
	if (posts === undefined) {
		const slugs = fs.readdirSync(articlesFsRoot);
		posts = (
			await Promise.all(
				slugs
					.filter((slug) => fs.lstatSync(path.join(articlesFsRoot, slug)).isDirectory())
					.filter((slug) => fs.existsSync(path.join(articlesFsRoot, slug, 'index.mdx')))
					.map(async (slug) => ({
						...(await (import(`${articlesImportRoot}/${slug}/index.mdx`) as Promise<typeof import('something.mdx')>)),
						slug,
					}))
			)
		).filter((post) => post.frontmatter.date);
	}

	return [...posts];
}
