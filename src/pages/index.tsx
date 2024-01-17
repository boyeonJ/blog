import { graphql, type HeadFC, type PageProps } from "gatsby"
import React, { FC, useMemo } from "react";
import colors from "../constants/colors";
import { Global, css } from "@emotion/react";
import global from "../styles/global";
import Header from "../components/hearder";
import Footer from "../components/footer";
import { Post, Remark } from "../models/types";
import PostList from "../components/post_list";
import { maxq } from "../utils/styleUtil";
import queryString, { ParsedQuery } from 'query-string'
import CategoryList, { CategoryListProps } from "../components/category_list";
import Layout from "../components/layout";

const IndexPage: FC<PageProps<Remark>> = ({
  data: {
    allMarkdownRemark: { edges },
    file: {
      childImageSharp: { gatsbyImageData },
    }
  }, location: { search } }) => {

  const parsed: ParsedQuery<string> = queryString.parse(search)
  const selectedCategory: string =
    typeof parsed.category !== 'string' || !parsed.category
      ? 'All'
      : parsed.category


  const categoryList = useMemo(
    () =>
      edges.reduce(
        (
          list: CategoryListProps['categoryList'],
          {
            node: {
              frontmatter: { categories },
            },
          }: Post,
        ) => {
          categories?.forEach(category => {
            if (list[category] === undefined) list[category] = 1;
            else list[category]++;
          });

          list['All']++;

          return list;
        },
        { All: 0 },
      ),
    [],
  )

  return (
    <>
      <Layout>
        <CategoryList
          selectedCategory={selectedCategory}
          categoryList={categoryList}
        />
        <PostList posts={edges} selectedCategory={selectedCategory} />
      </Layout>
    </>
  )
}

export default IndexPage

export const Head: HeadFC = () => <title>Home Page</title>


export const getPostList = graphql`
query getPostList {
  allMarkdownRemark(
    sort: [{frontmatter: {date: DESC}}, {frontmatter: {title: ASC}}]
  ) {
      edges {
        node {
          id
          html
          fields {
            slug
          }
          frontmatter {
            title
            summary
            date(formatString: "YYYY.MM.DD.")
            categories
            thumbnail {
              childImageSharp {
                gatsbyImageData(width: 768, height: 200)
              }
            }
          }
        }
      }
  }
  file(name: {eq: "profile-image" }) {
    childImageSharp {
      gatsbyImageData(width: 120, height: 120)
    }
  }
}
`