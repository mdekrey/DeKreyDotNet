import React from "react"
import { useStaticQuery, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const IndexPage = () => {
  const data = useStaticQuery(graphql`
    query MyQuery {
      allMarkdownRemark(
        sort: {fields: frontmatter___date, order: DESC},
        filter: { frontmatter: {draft: { eq: false } } },
        limit: 10) {
        nodes {
          id
          excerpt
          timeToRead
          frontmatter {
            title
            date
            author
            tags
            source
          }
        }
      }
    }
`);


  return (
    <Layout>
      <SEO title="Home" />

      <div className="divide-y -my-8">
        {(data.allMarkdownRemark.nodes as any[]).map(
          blogSummary =>
            <div className="py-8 flex flex-wrap md:flex-no-wrap" key={blogSummary.id}>
              <div className="md:w-64 md:mb-0 mb-6 flex-shrink-0 flex flex-col">
                <span className="tracking-widest font-medium title-font text-gray-900">{blogSummary.frontmatter.tags[0] || 'software'}</span>
                <span className="mt-1 text-gray-500 text-sm">{blogSummary.frontmatter.date}</span>
              </div>
              <div className="md:flex-grow">
                <h2 className="text-2xl font-medium text-gray-900 title-font mb-2">{blogSummary.frontmatter.title}</h2>
                <p className="leading-relaxed">{blogSummary.excerpt}</p>
                <a className="text-indigo-500 inline-flex items-center mt-4" href={blogSummary.frontmatter.source}>Read More
                  <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14"></path>
                    <path d="M12 5l7 7-7 7"></path>
                  </svg>
                </a>
              </div>
            </div>
        )}
      </div>
    </Layout>
  );
}

export default IndexPage
