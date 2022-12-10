import { GetStaticPathsResult, GetStaticProps, GetStaticPropsResult } from 'next/types';
import { getArticlesPage, getPageCount, getCountByTag } from 'src/articles/pages';
import { BlogPostSummary, toSummary } from 'src/articles/blog-post-summary-display';
import Layout from 'src/components/layout';
import SEO from 'src/components/seo';
import { BlogPostList } from 'src/articles/blog-post-list';

type PostsPageProps = {
	tag: string;
	page: number;
	pageCount: number;
	posts: BlogPostSummary[];
};

const PostsPage = ({ tag, page, posts, pageCount }: PostsPageProps) => {
	return (
		<Layout>
			<SEO title={`Blog Posts tagged ${tag} - Page ${page}`} />

			<BlogPostList page={page} posts={posts} pageCount={pageCount} />
		</Layout>
	);
};

export default PostsPage;

export const getStaticProps: GetStaticProps<PostsPageProps, { page: string; tag: string }> = async ({
	params,
}): Promise<GetStaticPropsResult<PostsPageProps>> => {
	const tag = params.tag;
	const page = Number.parseInt(params.page, 10);
	if (Number.isNaN(page)) return { notFound: true };

	const pageInfo = await getArticlesPage(page, tag);
	if (pageInfo === null) return { notFound: true };

	return {
		props: { tag, page, posts: pageInfo.articles.map(toSummary), pageCount: pageInfo.totalPageCount },
	};
};

export const getStaticPaths = async (): Promise<GetStaticPathsResult> => {
	const tags = Object.keys(await getCountByTag());

	return {
		paths: (
			await Promise.all(
				tags.map(async (tag) =>
					Array(await getPageCount(tag))
						.fill(0)
						.map((_, index) => ({ params: { tag, page: (index + 1).toFixed(0) } }))
				)
			)
		).flat(),
		fallback: false,
	};
};
