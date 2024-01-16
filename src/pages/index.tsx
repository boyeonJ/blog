import { graphql, type HeadFC, type PageProps } from "gatsby"
import React, { FC, useMemo } from "react";
import colors from "../constants/colors";
import { Global, css } from "@emotion/react";
import global from "../styles/global";
import Header from "../components/Hearder";
import Footer from "../components/Footer";
import { Post, Remark } from "../models/types";
import PostList from "../components/PostList";
import { maxq } from "../utils/styleUtil";
import queryString, { ParsedQuery } from 'query-string'
import CategoryList, { CategoryListProps } from "../components/CategoryList";


const indexStyles = {
  main: css({
    backgroundColor: colors.primary1,
    minHeight: "100vh",
    paddingTop: "30px",
  })
}


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
          categories.forEach(category => {
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
      <Global styles={global} />
      <Header />
      <main
        css={indexStyles.main}>
        <div
          css={{
            [maxq[2]]: { margin: "0 100px" },
            [maxq[1]]: { margin: "0px 20px" },
            margin: "0 200px",
          }}
        >
          <CategoryList
            selectedCategory={selectedCategory}
            categoryList={categoryList}
          />
          <PostList posts={edges} selectedCategory={selectedCategory} />
        </div>
      </main>
      <Footer />
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