import * as React from "react"
import { PageProps, graphql } from "gatsby"
import Layout from "../components/layout"
import FlexBox from "../components/atoms/flex_box"
import StyledTypography from "../components/atoms/styled_typography"

const NotFoundPage: React.FC<PageProps> = () => {
  return (
    <FlexBox align="center">
      <StyledTypography variant="h1B">Not Found Page</StyledTypography>
      <StyledTypography color="gray3">요청하신 페이지를 찾을 수 없습니다.</StyledTypography>
    </FlexBox>
  )
}

export default NotFoundPage
export { Head } from "../components/head"


export const queryMarkdownDataBySlug = graphql`
  query getNotFoundPage {
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