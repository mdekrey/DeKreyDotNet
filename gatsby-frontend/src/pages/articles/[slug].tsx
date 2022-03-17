
import { MDXProvider } from '@mdx-js/react';
import React, { useMemo } from "react"
import Layout from "src/components/layout"
import articleStyles from "./article.module.css"
import SEO from "src/components/seo";
import { GetStaticPathsResult, GetStaticProps, GetStaticPropsResult } from "next"
import { BlogPost, getAllPosts, getPostBySlug } from "src/articles/utils";
import { MDXRemote } from 'next-mdx-remote';
import Image from 'next/image';


type ArticleProps = {
    data: { markdownRemark: BlogPost }
}

export default function Article({ data }: ArticleProps) {
    const post = data.markdownRemark;

    const components = useMemo((): React.ComponentProps<typeof MDXProvider>['components'] => ({
        img: ({ src, placeholder, ...props }) => {
            const imgSrc = src.startsWith('./')
                ? post.importPath + src.substring(1)
                : src;
            console.log(imgSrc);
            // return <Image src={imgSrc} {...props} />
            return null;
        },
    }), [post]);
    console.log(post.html);
    return (
        <Layout>
            <SEO title={post.frontmatter.title} image={post.frontmatter.image} />
            <article className={articleStyles.article}>
                <header className={articleStyles.header}>
                    <h1>{post.frontmatter.title}</h1>
                    <p className={articleStyles.subheader}>{new Date(post.frontmatter.date).toLocaleDateString()} &mdash; {post.timeToRead}</p>
                </header>
                {/* <div className={articleStyles.markdown} dangerouslySetInnerHTML={{ __html: post.html }} /> */}
                <MDXProvider components={components}>
                    <MDXRemote {...post.html} components={components} />
                </MDXProvider>
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