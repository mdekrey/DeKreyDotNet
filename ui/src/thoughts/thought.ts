import type { MDXInstance } from 'astro';

export type ThoughtFrontmatter = {
	tags?: string[];
};

export type Thought = {
	date: Date;
} & MDXInstance<ThoughtFrontmatter>;
