import fs from 'fs';
import path from 'path';
import {remark} from 'remark'
import html from 'remark-html'
import readingTime from 'remark-reading-time'
import matter from 'gray-matter'
import { serialize } from 'next-mdx-remote/serialize'
import {bundleMDX} from 'mdx-bundler'
import {remarkMdxImages} from 'remark-mdx-images'
import remarkUnwrapImages from 'remark-unwrap-images'

export type BlogPost = {
    slug: string;
    code: string;
    excerpt: string;
    frontmatter: { title?: string; image?: string; date?: string; tags?: string[] };
    timeToRead: string;
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
    const htmlPipeline = remark()
        .use(readingTime, { name: 'readingTime' });
    const { data, content } = matter(fileContent);

    // const mdxSource = await serialize(content, {
    //     scope: {},
    //     mdxOptions: {
    //         baseUrl: importPath,
    //         remarkPlugins: [
    //             [require("@pondorasti/remark-img-links"), { absolutePath: importPath }]
    //         ],
    //         jsx: false,
    //     }
    // });
    const markdown = await htmlPipeline.process(content);
    const {code} = await bundleMDX({
        cwd: fsDir,
        bundleDirectory: publicBundleFsRoot,
        bundlePath: publicBundlePath,
        source: content,
        globals: {
            'Figure': 'Figure',
            'Figcaption': 'Figcaption',
        },
        xdmOptions(options) {
            options.remarkPlugins = [...(options.remarkPlugins ?? []), remarkUnwrapImages, remarkMdxImages]

            return options;
        },
        esbuildOptions: options => {
          options.loader = {
            ...options.loader,
            '.png': 'file',
            '.svg': 'file',
            '.jpg': 'file',
          }

          return options
        },
    })

    return {
        slug,
        code,
        excerpt: '',
        frontmatter: {
            title: data.title,
            image: data.image ? path.join(articlesImportRoot, slug, data.image) : null,
            date: data.date,
            tags: data.tags
        },
        timeToRead: (markdown.data.readingTime as ReadingTimeData).text,
    };
}

export async function getAllPosts() {
    const slugs = fs.readdirSync(articlesFsRoot);
    const posts = await Promise.all(
        slugs
            .filter(slug => fs.lstatSync(path.join(articlesFsRoot, slug)).isDirectory())
            .filter(slug => fs.existsSync(path.join(articlesFsRoot, slug, 'index.mdx')))
            .map((slug) => getPostBySlug(slug))
    );

    return posts;
}
