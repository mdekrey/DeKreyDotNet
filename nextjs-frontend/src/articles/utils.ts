import fs from 'fs';
import path from 'path';

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
		)
			.filter((post) => post.frontmatter.date)
			.sort((a, b) => -a.frontmatter.date.localeCompare(b.frontmatter.date));
	}

	return [...posts];
}
