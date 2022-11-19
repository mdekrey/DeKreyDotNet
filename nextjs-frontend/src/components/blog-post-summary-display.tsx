import classNames from 'classnames';
import Link from 'next/link';
import { BlogPost } from 'src/articles/utils';
import { linkClassName } from './styles';

type BlogPostSummary = Pick<BlogPost, 'slug' | 'frontmatter'>;

export const BlogPostSummaryDisplay = ({ post: blogSummary }: { post: BlogPostSummary }) => (
	<div className="py-8 flex flex-wrap md:flex-nowrap">
		<div className="md:w-64 md:mb-0 mb-6 flex-shrink-0 flex flex-col">
			<span className="tracking-widest font-medium text-gray-900">
				{(blogSummary.frontmatter.tags && blogSummary.frontmatter.tags[0]) || 'software'}
			</span>
			<span className="mt-1 text-gray-500 text-sm">{blogSummary.frontmatter.date}</span>
		</div>
		<div className="md:flex-grow">
			<h2 className={classNames(linkClassName, 'text-2xl font-medium mb-2')}>
				<Link href={`/articles/${blogSummary.slug}`}>
					<a>{blogSummary.frontmatter.title}</a>
				</Link>
			</h2>
			<p className="leading-relaxed">{blogSummary.frontmatter.excerpt}</p>
			<Link href={`/articles/${blogSummary.slug}`}>
				<a className={classNames(linkClassName, 'inline-flex items-center mt-4')}>
					Read More
					<svg
						className="w-4 h-4 ml-2"
						viewBox="0 0 24 24"
						stroke="currentColor"
						strokeWidth="2"
						fill="none"
						strokeLinecap="round"
						strokeLinejoin="round">
						<path d="M5 12h14"></path>
						<path d="M12 5l7 7-7 7"></path>
					</svg>
				</a>
			</Link>
		</div>
	</div>
);
