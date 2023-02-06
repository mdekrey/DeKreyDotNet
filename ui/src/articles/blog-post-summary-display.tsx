import { twMerge } from 'tailwind-merge';
import type { BlogPost } from './post';
import { linkClassName } from '@/components/styles';
import identity from 'lodash/fp/identity';
import sortBy from 'lodash/fp/sortBy';

const tagSort = sortBy<string>(identity);

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

export const BlogPostSummaryDisplay = ({
	post: blogSummary,
}: {
	post: BlogPostSummary;
}) => (
	<div className="py-8 flex flex-wrap md:flex-nowrap">
		<div className="md:w-64 md:mb-0 mb-6 flex-shrink-0 flex flex-col">
			{blogSummary.frontmatter.tags &&
				tagSort(blogSummary.frontmatter.tags).map((tag) => (
					<span className="tracking-widest font-medium text-gray-900" key={tag}>
						{tag}
					</span>
				))}
			<span className="mt-1 text-gray-500 text-sm">
				{blogSummary.frontmatter.date}
			</span>
		</div>
		<div className="md:flex-grow">
			<h2 className={twMerge('text-2xl font-medium mb-2', linkClassName)}>
				<a href={`/articles/${blogSummary.slug}`}>
					{blogSummary.frontmatter.title}
				</a>
			</h2>
			<p className="leading-relaxed">{blogSummary.excerpt}</p>
			<a
				href={`/articles/${blogSummary.slug}`}
				className={twMerge('inline-flex items-center mt-4', linkClassName)}
			>
				Read More{' '}
				{blogSummary.readingTime?.text && <>({blogSummary.readingTime.text})</>}
				<svg
					className="w-4 h-4 ml-2"
					viewBox="0 0 24 24"
					stroke="currentColor"
					strokeWidth="2"
					fill="none"
					strokeLinecap="round"
					strokeLinejoin="round"
				>
					<path d="M5 12h14"></path>
					<path d="M12 5l7 7-7 7"></path>
				</svg>
			</a>
		</div>
	</div>
);
