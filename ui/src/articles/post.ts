import type { MDXInstance } from 'astro';

export type BlogPostFrontmatter = {
	draft?: boolean;
	title?: string;
	excerpt?: string;
	date: string;
	tags?: string[];
};

export type ReadingTime = {
	text: string;
	minutes: number;
	time: number;
	words: number;
};

export type BlogPost = {
	slug: string;
	image?: ImageMetadata;

	readingTime: ReadingTime;
	excerpt: string;
} & MDXInstance<BlogPostFrontmatter>;
