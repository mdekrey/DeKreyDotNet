import fs from 'fs';
import path from 'path';
import {remark} from 'remark'
import html from 'remark-html'
import readingTime from 'remark-reading-time'
import matter from 'gray-matter'
import { serialize } from 'next-mdx-remote/serialize'


export type BlogPost = {
    slug: string;
    html: Awaited<ReturnType<typeof serialize>>;
    excerpt: string;
    importPath: string;
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
const articlesImportRoot = 'src/articles';

export async function getPostBySlug(slug: string): Promise<BlogPost> {
    const fsDir = path.join(articlesFsRoot, slug);
    const importPath = `${articlesImportRoot}/${slug}`;
    const fileContent = fs.readFileSync(path.join(fsDir, `${slug}.md`));
    const htmlPipeline = remark()
        .use(readingTime, { name: 'readingTime' });
    const { data, content } = matter(fileContent);

    const mdxSource = await serialize(content, {
        scope: {},
        mdxOptions: {
            baseUrl: importPath,
            remarkPlugins: [
                [require("@pondorasti/remark-img-links"), { absolutePath: importPath }]
            ],
        }
    });
    const markdown = await htmlPipeline.process(content);

    // const jsx = await import(path.join(articlesRoot, `${slug}/${slug}.md`));
    // console.log(jsx);

    return {
        slug,
        html: mdxSource, //markdown.toString(),
        excerpt: '',
        importPath,
        frontmatter: {
            title: data.title,
            image: null, // data.image ? await import(path.join(articlesRoot, slug, data.image)) : null,
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
            .map((slug) => getPostBySlug(slug))
    );

    return posts;
}
