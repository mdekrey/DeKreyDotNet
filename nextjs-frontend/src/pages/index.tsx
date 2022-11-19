import React from 'react';

import Layout from '../components/layout';
import SEO from '../components/seo';
import { GetStaticProps, GetStaticPropsResult } from 'next/types';
import { BlogPost, getAllPosts } from '../articles/utils';
import fullUrl from 'src/images/full.jpg';
import styles from './index.module.css';
import classNames from 'classnames';
import { BlogPostSummaryDisplay } from 'src/components/blog-post-summary-display';

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
						'flex flex-col items-center md:flex-row md:items-start md:justify-center max-h-screen overflow-hidden mx-auto max-w-4xl sticky top-0 pt-16 px-4 md:px-8',
						styles['post-blur']
					)}>
					<div className="flex flex-col flex-shrink-0 mt-8 md:mt-[20%]">
						<h1 className="text-2xl md:text-left font-bold">
							Hey, <br />
							<span className="text-purple-700 text-4xl">I'm Matt DeKrey!</span>
						</h1>
						<p className="text-xs">MAT deh-KRAY</p>
						<p className="text-xs">/mæt d&#x026A;&#x02c8;kre&#x026A;/</p>
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
					<BlogPostSummaryDisplay post={blogSummary} key={blogSummary.slug} />
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
