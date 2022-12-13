declare module '*.mdx' {
	export type FrontMatter = {
		draft?: boolean;
		title?: string;
		image?: string;
		excerpt?: string;
		date?: string;
		tags?: string[];
	};
	export const frontmatter: FrontMatter;

	export type ReadingTime = {
		text: string;
		minutes: number;
		time: number;
		words: number;
	};
	export const readingTime: ReadingTime;
	export const excerpt: string;

	export const ogImage: string | undefined;
}
