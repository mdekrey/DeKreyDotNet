import { GetStaticPathsResult, GetStaticProps, GetStaticPropsResult } from 'next/types';
import { getArticlesPage, getPageCount } from 'src/articles/pages';
import { BlogPostSummary, toSummary } from 'src/articles/blog-post-summary-display';
import Layout from 'src/components/layout';
import SEO from 'src/components/seo';
import { BlogPostList } from 'src/articles/blog-post-list';

type PostsPageProps = {
	page: number;
	pageCount: number;
	posts: BlogPostSummary[];
};

const PostsPage = ({ page, posts, pageCount }: PostsPageProps) => {
	return (
		<Layout>
			<SEO title={`Blog Posts - Page ${page}`} />

			<BlogPostList page={page} posts={posts} pageCount={pageCount} />
		</Layout>
	);
};

export default PostsPage;

export const getStaticProps: GetStaticProps<PostsPageProps, { page: string }> = async ({
	params,
}): Promise<GetStaticPropsResult<PostsPageProps>> => {
	const page = Number.parseInt(params.page, 10);
	if (Number.isNaN(page)) return { notFound: true };

	const pageInfo = await getArticlesPage(page);
	if (pageInfo === null) return { notFound: true };

	return {
		props: { page, posts: pageInfo.articles.map(toSummary), pageCount: pageInfo.totalPageCount },
	};
};

export const getStaticPaths = async (): Promise<GetStaticPathsResult> => {
	const pageCount = await getPageCount();

	return {
		paths: Array(pageCount)
			.fill(0)
			.map((_, index) => ({ params: { page: (index + 1).toFixed(0) } })),
		fallback: false,
	};
};
