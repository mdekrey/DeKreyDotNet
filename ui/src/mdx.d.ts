import 'astro';

declare module 'astro' {
	export interface MarkdownInstance /* <T extends Record<string, any>> */ {
		readingTime: ReadingTime;
		excerpt: string;
	}
}
