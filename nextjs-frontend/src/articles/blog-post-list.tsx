import React from 'react';
import { BlogPostSummaryDisplay, BlogPostSummary } from 'src/articles/blog-post-summary-display';
import { Paginator } from 'src/components/pagination/paginator';

export function BlogPostList({
	posts,
	page,
	pageCount,
}: {
	posts: BlogPostSummary[];
	page: number;
	pageCount: number;
}) {
	return (
		<div className="divide-y -my-8">
			{posts.map((blogSummary) => (
				<BlogPostSummaryDisplay post={blogSummary} key={blogSummary.slug} />
			))}
			{pageCount !== 1 ? (
				<div className="flex flex-col items-center py-8">
					<p>More results:</p>
					<Paginator page={page} pageCount={pageCount} path={(v) => `/posts/pages/${v}`}></Paginator>
				</div>
			) : null}
		</div>
	);
}
