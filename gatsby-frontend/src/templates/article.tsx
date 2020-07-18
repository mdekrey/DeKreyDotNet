import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import articleStyles from "./article.module.css"


export default function Article({ data }: { data: any }) {
  const post = data.markdownRemark;
  return (
    <Layout>
      <article className={articleStyles.article}>
        <header className={articleStyles.header}>
            <h1>{post.frontmatter.title}</h1>
            <p className={articleStyles.subheader}>{new Date(post.frontmatter.date).toLocaleDateString()} &mdash; {post.timeToRead} {post.timeToRead === 1 ? 'minute' : 'minutes'} to read</p>
        </header>
        <div className={articleStyles.markdown} dangerouslySetInnerHTML={{ __html: post.html }} />
      </article>
    </Layout>
  )
}

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      timeToRead
      frontmatter {
        title
        date
        author
        source
        tags
      }
    }
  }
`;