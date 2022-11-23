import React from 'react';

import Layout from '../components/layout';
import SEO from '../components/seo';
import { GetStaticProps, GetStaticPropsResult } from 'next/types';
import { BlogPostSummary, toSummary } from 'src/articles/blog-post-summary-display';
import { IntroBlock } from 'src/components/intro-block';
import { getArticlesPage } from 'src/articles/pages';
import { BlogPostList } from '../articles/blog-post-list';

type IndexProps = {
	posts: BlogPostSummary[];
	pageCount: number;
};

const IndexPage = ({ posts, pageCount }: IndexProps) => {
	return (
		<Layout>
			<SEO title="Home" />

			<Layout.NoScrollHeaderSlot>
				<IntroBlock />
			</Layout.NoScrollHeaderSlot>

			<Layout.Main className="z-10" />
			<Layout.Footer className="z-10" />

			<BlogPostList posts={posts} page={1} pageCount={pageCount} />
		</Layout>
	);
};

export default IndexPage;

export const getStaticProps: GetStaticProps<IndexProps> = async (): Promise<GetStaticPropsResult<IndexProps>> => {
	const pageInfo = await getArticlesPage(1);

	return {
		props: { posts: pageInfo?.articles.map(toSummary) ?? [], pageCount: pageInfo?.totalPageCount ?? 0 },
	};
};
