import type { MDXInstance } from 'astro';
import { format } from 'date-fns';

export type ThoughtFrontmatter = {
	tags?: string[];
};

export type Thought = {
	date: Date;
} & MDXInstance<ThoughtFrontmatter>;

export function toUrlTimestamp({ date }: Thought) {
	return format(date, `yyyy-MM-dd'T'HH:mm:ss`);
}
