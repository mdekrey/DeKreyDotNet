
import { MDXProvider, useMDXComponents } from '@mdx-js/react';
import React, { useMemo } from "react"
import Layout from "src/components/layout"
import articleStyles from "./article.module.css"
import SEO from "src/components/seo";
import { GetStaticPathsResult, GetStaticProps, GetStaticPropsResult } from "next"
import { BlogPost, getAllPosts, getPostBySlug } from "src/articles/utils";

import {getMDXComponent} from 'mdx-bundler/client';

type ArticleProps = {
    data: { markdownRemark: BlogPost }
}

export default function Article({ data }: ArticleProps) {
    const post = data.markdownRemark;


    const pathedComponents = useMemo((): React.ComponentProps<typeof MDXProvider>['components'] => ({
        img: ({ placeholder, ...props }) => {
            return (<span className="relative flex justify-center"><img style={{ maxWidth: '590px' }} {...props} /></span>);
        }
    }), [post]);
    const components = useMDXComponents(pathedComponents);
    // console.log(components);
    const Component = React.useMemo(() => getMDXComponent(post.code), [post.code])
    // console.log(post);
    return (
        <Layout>
            <SEO title={post.frontmatter.title} image={post.frontmatter.image} />
            <article className={articleStyles.article}>
                <header className={articleStyles.header}>
                    <h1>{post.frontmatter.title}</h1>
                    <p className={articleStyles.subheader}>{new Date(post.frontmatter.date).toLocaleDateString()} &mdash; {post.frontmatter.readingTime.text}</p>
                </header>
                {/* <div className={articleStyles.markdown} dangerouslySetInnerHTML={{ __html: post.html }} /> */}
                {/* <MDXProvider components={components}>
                    <MDXRemote {...post.html} />
                </MDXProvider> */}
                <div className={articleStyles.markdown}>
                    <Component components={components} />
                </div>
            </article>
        </Layout>
    )
}


export const getStaticProps: GetStaticProps<ArticleProps, { slug: string }> = async ({ params }): Promise<GetStaticPropsResult<ArticleProps>> => {
    const post = await getPostBySlug(params.slug);

    return {
        props: {
            data: {
                markdownRemark: post,
            }
        },
    }
}

export const getStaticPaths = async (): Promise<GetStaticPathsResult> => {
    const posts = await getAllPosts();
    return {
        paths: posts.map(post => ({
            params: {
                slug: post.slug,
            },
        })), fallback: false
    };
}