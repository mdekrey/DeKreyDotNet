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

export type BlogPost = {
	slug: string;
	code: string;
	frontmatter: {
		excerpt: string;
		title?: string;
		image?: string;
		date?: string;
		tags?: string[];
		readingTime: ReadingTimeData;
	};
};

type ReadingTimeData = {
	text: string;
	minutes: number;
	time: number;
	words: number;
};

const articlesFsRoot = path.join(process.cwd(), 'src/articles');
const articlesImportRoot = '/src/articles';
const publicBundleFsRoot = path.join(process.cwd(), 'public/articles');
const publicBundlePath = '/articles/';

export async function getPostBySlug(slug: string): Promise<BlogPost> {
	const fsDir = path.join(articlesFsRoot, slug);
	const fileContent = fs.readFileSync(path.join(fsDir, `index.mdx`));

	const { code, frontmatter, matter } = await bundleMDX({
		cwd: fsDir,
		bundleDirectory: publicBundleFsRoot,
		bundlePath: publicBundlePath,
		source: fileContent.toString(),
		globals: {
			Figure: 'Figure',
			Figcaption: 'Figcaption',
		},
		xdmOptions(options) {
			options.rehypePlugins = [
				...(options.rehypePlugins ?? []),
				[rehypeHighlight, { languages: { fsharp, dockerfile } }],
			];
			options.remarkPlugins = [...(options.remarkPlugins ?? []), remarkUnwrapImages, remarkMdxImages, readingTime];
			return options;
		},
		esbuildOptions: (options) => {
			options.loader = {
				...options.loader,
				'.png': 'file',
				'.svg': 'file',
				'.jpg': 'file',
			};

			return options;
		},
	});

	return {
		slug,
		code,
		frontmatter: {
			excerpt: frontmatter.excerpt ?? (await getExcerpt(matter.content)),
			title: frontmatter.title,
			image: frontmatter.image ? path.join(articlesImportRoot, slug, frontmatter.image) : null,
			date: frontmatter.date,
			tags: frontmatter.tags,
			readingTime:
				frontmatter.readingTime ??
				((await remark().use(readingTime, { name: 'readingTime' }).process(matter.content)).data
					.readingTime as ReadingTimeData),
		},
	};
}

export async function getAllPosts() {
	const slugs = fs.readdirSync(articlesFsRoot);
	const posts = (
		await Promise.all(
			slugs
				.filter((slug) => fs.lstatSync(path.join(articlesFsRoot, slug)).isDirectory())
				.filter((slug) => fs.existsSync(path.join(articlesFsRoot, slug, 'index.mdx')))
				.map((slug) => getPostBySlug(slug))
		)
	).filter((post) => post.frontmatter.date);

	return posts;
}

async function getExcerpt(file: string) {
	const content = file.split('\n');
	const start = skipWhile(0, true);
	const end = skipWhile(start, false);
	const excerptParagraph = content.slice(start, end).join('\n');
	const limited = (await remark().use(strip).process(excerptParagraph)).toString().split(' ').splice(0, 25).join(' ');
	const result = limited === excerptParagraph ? excerptParagraph : limited + '...';

	return result || '';

	function skipWhile(startAt: number, isMarkdown: boolean) {
		let result = startAt;
		while (result < content.length) {
			if (isMarkdown && content[result].match(/^[a-zA-Z]/) && !content[result].startsWith('import')) break;
			if (!isMarkdown && (!content[result].match(/^[a-zA-Z]/) || content[result].startsWith('import'))) break;
			result++;
		}
		return result;
	}
}
