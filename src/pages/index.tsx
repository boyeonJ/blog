import { graphql, type HeadFC, type PageProps } from "gatsby"
import React, { FC } from "react";
import colors from "../constants/colors";
import { Global, css } from "@emotion/react";
import global from "../styles/global";
import Header from "../components/Hearder";
import Footer from "../components/Footer";
import { Remark } from "../models/types";
import PostList from "../components/PostList";
import { maxq } from "../utils/styleUtil";
import { GatsbyImage, StaticImage } from "gatsby-plugin-image";

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
  }, location }) => {

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
          {/* static image component*/}
          <StaticImage
            src="../../static/profile-image.png"
            alt="profile-image"
            placeholder="blurred"
            width={100}
            height={100}
            css={{ borderRadius: '50%' }}
          />
          {/* dynamic image component - file query */}
          <GatsbyImage image={gatsbyImageData} alt="test" />
          {/* dynamic image component - remark query */}
          <GatsbyImage image={edges[0].node.frontmatter.thumbnail.childImageSharp.gatsbyImageData} alt="test" />
          <PostList posts={edges} />
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
              gatsbyImageData(width: 768, height: 400)
            }
          }
        }
      }
    }
  }
  file(name: { eq: "profile-image" }) {
    childImageSharp {
      gatsbyImageData(width: 120, height: 120)
    }
  }
}
`