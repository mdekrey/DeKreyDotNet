declare module '*.mdx' {
	export const frontmatter: {
		excerpt: string;
		draft?: boolean;
		title?: string;
		image?: string;
		date?: string;
		tags?: string[];
	};
	export const readingTime: {
		text: string;
		minutes: number;
		time: number;
		words: number;
	};
}
