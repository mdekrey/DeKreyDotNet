import { MDXProvider, useMDXComponents } from '@mdx-js/react';
import { ComponentProps } from 'react';
import Layout from 'src/components/layout';
import articleStyles from './article.module.css';
import SEO from 'src/components/seo';
import { GetStaticPathsResult, GetStaticProps, GetStaticPropsResult } from 'next';
import { getAllPosts } from 'src/articles/utils';

import { useAsync } from 'src/components/useAsync';

type ArticleProps = {
	data: { slug: string };
};

const pathedComponents: ComponentProps<typeof MDXProvider>['components'] = {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	img: ({ placeholder, ...props }) => {
		return (
			<span className="relative flex justify-center">
				<img style={{ maxWidth: '590px' }} alt="" {...props} />
			</span>
		);
	},
	pre: ({ className, ...props }) => {
		return <pre className={`${className ?? ''} overflow-hidden rounded-lg`} {...props} />;
	},
};

export default function Article({ data }: ArticleProps) {
	const components = useMDXComponents(pathedComponents);
	const componentModule = useAsync(
		async () => await (import(`../../articles/${data.slug}/index.mdx`) as Promise<typeof import('*.mdx')>),
		{} as Partial<typeof import('*.mdx')>,
		[]
	);
	console.log(componentModule);
	const { default: Component, frontmatter, readingTime } = componentModule ?? {};
	return (
		<Layout>
			<SEO title={frontmatter?.title ?? 'WIP'} image={frontmatter?.image ?? ''} />
			<article className={articleStyles.article}>
				<header className={articleStyles.header}>
					<h1 className="font-bold mb-4 text-4xl">{frontmatter?.title}</h1>
					<p className={articleStyles.subheader}>
						{frontmatter?.date} &mdash; {readingTime?.text}
					</p>
				</header>
				<div className={articleStyles.markdown}>{Component && <Component components={components} />}</div>
			</article>
		</Layout>
	);
}

export const getStaticProps: GetStaticProps<ArticleProps, { slug: string }> = async ({
	params,
}): Promise<GetStaticPropsResult<ArticleProps>> => {
	return {
		props: {
			data: {
				slug: params.slug,
			},
		},
	};
};

export const getStaticPaths = async (): Promise<GetStaticPathsResult> => {
	const posts = await getAllPosts();
	return {
		paths: posts.map((post) => ({
			params: {
				slug: post.slug,
			},
		})),
		fallback: false,
	};
};
