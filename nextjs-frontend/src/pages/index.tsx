import React from 'react';

import Layout from '../components/layout';
import SEO from '../components/seo';
import { GetStaticProps, GetStaticPropsResult } from 'next/types';
import { BlogPost, getAllPosts } from '../articles/utils';
import { BlogPostSummaryDisplay } from 'src/components/blog-post-summary-display';
import { IntroBlock } from 'src/components/intro-block';

type BlogPostSummary = Pick<BlogPost, 'slug' | 'frontmatter'>;

type IndexProps = {
	posts: BlogPostSummary[];
};

const IndexPage = ({ posts }: IndexProps) => {
	return (
		<Layout>
			<SEO title="Home" />

			<Layout.NoScrollHeaderSlot>
				<IntroBlock />
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
