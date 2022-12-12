declare module '*.mdx' {
	export const frontmatter: {
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
	export const excerpt: string;
}
