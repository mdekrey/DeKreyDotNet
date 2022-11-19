import React from 'react';

import Layout from '../components/layout';
import SEO from '../components/seo';
import Link from 'next/link';
import { GetStaticProps, GetStaticPropsResult } from 'next/types';
import { BlogPost, getAllPosts } from '../articles/utils';
import fullUrl from 'src/images/full.jpg';
import styles from './index.module.css';
import classNames from 'classnames';

type BlogPostSummary = Pick<BlogPost, 'slug' | 'frontmatter'>;

type IndexProps = {
	posts: BlogPostSummary[];
};

const IndexPage = ({ posts }: IndexProps) => {
	return (
		<Layout>
			<SEO title="Home" />

			<Layout.NoScrollHeaderSlot>
				<div
					className={classNames(
						'flex flex-col items-center md:flex-row md:items-start md:justify-center max-h-screen overflow-hidden mx-auto max-w-4xl sticky top-0 pt-16',
						styles['post-blur']
					)}>
					<div className="flex flex-col flex-shrink-0 mt-8 md:mt-[20%]">
						<h1 className="text-2xl md:text-left">
							Hey, <br />
							I'm Matt DeKrey!
						</h1>
						<p className="text-xs">pronounced: MAT deh-KRAY</p>
						<p className="text-xs">he/him</p>
					</div>
					<div
						className="max-w-screen md:flex-shrink-default bg-contain bg-no-repeat h-[100vmin] w-[100vmin] md:h-[60vmin] md:w-[80vmin]"
						style={{
							backgroundImage: `url(${fullUrl.src})`,
							backgroundPosition: '50% 20%',
						}}
					/>
				</div>
			</Layout.NoScrollHeaderSlot>

			<div className="divide-y -my-8">
				{posts.map((blogSummary) => (
					<div className="py-8 flex flex-wrap md:flex-nowrap" key={blogSummary.slug}>
						<div className="md:w-64 md:mb-0 mb-6 flex-shrink-0 flex flex-col">
							<span className="tracking-widest font-medium text-gray-900">
								{(blogSummary.frontmatter.tags && blogSummary.frontmatter.tags[0]) || 'software'}
							</span>
							<span className="mt-1 text-gray-500 text-sm">{blogSummary.frontmatter.date}</span>
						</div>
						<div className="md:flex-grow">
							<h2 className="text-2xl font-medium text-gray-900 mb-2">
								<Link href={`/articles/${blogSummary.slug}`}>
									<a>{blogSummary.frontmatter.title}</a>
								</Link>
							</h2>
							<p className="leading-relaxed">{blogSummary.frontmatter.excerpt}</p>
							<Link href={`/articles/${blogSummary.slug}`}>
								<a className="text-indigo-500 inline-flex items-center mt-4">
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
				))}
			</div>
		</Layout>
	);
};

export default IndexPage;

export const getStaticProps: GetStaticProps<IndexProps> = async (): Promise<GetStaticPropsResult<IndexProps>> => {
	const posts = await getAllPosts();

	return {
		props: { posts: posts.map(toSummary).sort((a, b) => -a.frontmatter.date.localeCompare(b.frontmatter.date)) },
	};
};

function toSummary(post: BlogPost): BlogPostSummary {
	return {
		slug: post.slug,
		frontmatter: post.frontmatter,
	};
}
