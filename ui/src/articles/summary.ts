import type { BlogPost } from './post';

export type BlogPostSummary = Pick<
	BlogPost,
	'slug' | 'frontmatter' | 'excerpt' | 'readingTime'
>;

export function toSummary(post: BlogPost): BlogPostSummary {
	return {
		slug: post.slug,
		frontmatter: post.frontmatter,
		readingTime: post.readingTime,
		excerpt: post.frontmatter.excerpt ?? post.excerpt ?? null,
	};
}
