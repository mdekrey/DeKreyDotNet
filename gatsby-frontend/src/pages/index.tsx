import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Link from "next/link"
import { GetStaticProps, GetStaticPropsResult } from "next/types"
import { BlogPost, getAllPosts } from "../articles/utils"

type BlogPostSummary = Pick<BlogPost, 'slug' | 'frontmatter'>

type IndexProps = {
  posts: BlogPostSummary[]
}

const IndexPage = ({ posts }: IndexProps) => {


  return (
    <Layout>
      <SEO title="Home" />

      <div className="divide-y -my-8">
        {(posts).map(
          blogSummary =>
            <div className="py-8 flex flex-wrap md:flex-nowrap" key={blogSummary.slug}>
              <div className="md:w-64 md:mb-0 mb-6 flex-shrink-0 flex flex-col">
                <span className="tracking-widest font-medium title-font text-gray-900">{(blogSummary.frontmatter.tags && blogSummary.frontmatter.tags[0]) || 'software'}</span>
                <span className="mt-1 text-gray-500 text-sm">{blogSummary.frontmatter.date}</span>
              </div>
              <div className="md:flex-grow">
                <h2 className="text-2xl font-medium text-gray-900 title-font mb-2">
                  <Link href={`/articles/${blogSummary.slug}`}>
                    <a>{blogSummary.frontmatter.title}</a>
                  </Link>
                </h2>
                <p className="leading-relaxed">{blogSummary.frontmatter.excerpt}</p>
                <Link href={`/articles/${blogSummary.slug}`}>
                  <a className="text-indigo-500 inline-flex items-center mt-4">Read More
                    <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14"></path>
                      <path d="M12 5l7 7-7 7"></path>
                    </svg>
                  </a>
                </Link>
              </div>
            </div>
        )}
      </div>
    </Layout>
  );
}

export default IndexPage


export const getStaticProps: GetStaticProps<IndexProps> = async (): Promise<GetStaticPropsResult<IndexProps>> => {
  const posts = await getAllPosts();

  return { props: { posts: posts.map(toSummary) } }
}

function toSummary(post: BlogPost): BlogPostSummary {
  return {
    slug: post.slug,
    frontmatter: post.frontmatter,
  }
}
