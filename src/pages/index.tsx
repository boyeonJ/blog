import { graphql, type PageProps } from "gatsby"
import { FC, useMemo } from "react";
import React from "react";
import { GraphQLNode, Post, } from "../models/types";
import PostList from "../components/post_list";
import queryString, { ParsedQuery } from 'query-string'
import CategoryList, { CategoryListProps } from "../components/category_list";
import Spacing from "../components/atoms/spacing";

const Blog = ({
  data: {
    allMarkdownRemark: { edges }
  }, location: { search } }: PageProps<GraphQLNode>) => {


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
      <CategoryList
        selectedCategory={selectedCategory}
        categoryList={categoryList}
      />
      <Spacing size={50} />
      <PostList posts={edges} selectedCategory={selectedCategory} />
    </>
  )
}

export default Blog
export { Head } from "../components/head"

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
          }
        }
      }
  }
  file(name: {eq: "profile-image" }) {
    childImageSharp {
      gatsbyImageData(width: 120, height: 120)
    }
  }
  site {
    siteMetadata {
      title,
      description,
      siteUrl,
      author,
      image
    }
  }
}
`