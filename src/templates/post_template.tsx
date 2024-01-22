import { graphql } from 'gatsby'
import { FC } from 'react'
import { Post } from '../models/types'
import Layout from '../components/layout'
import styled from '@emotion/styled'
import colors from '../constants/colors'
import FlexBox from '../components/atoms/flex_box'
import StyledTypography from '../components/atoms/styled_typography'
import Spacing from '../components/atoms/spacing'
import Icon from '../components/atoms/icon'

type PostTemplateProps = {
    data: {
        allMarkdownRemark: {
            edges: Post[]
        }
    }
}

const MarkdownRenderer = styled.div`
    padding: 30px 0;
    word-break: break-all;
    line-height: 2;
    font-size: 1rem;
    font-weight: 400;
    color: ${colors.primary3}

    p {
        margin-bottom: 1.5rem;
    }

    // Heading Element Style
    h1,
    h2,
    h3 {
        font-weight: 500;
        margin-bottom: 30px;
        margin-top: 30px;
    }

    hr + h1,
    hr + h2,
    hr + h3 {
        margin-top: 0;
        margin-bottom: 0;
    }

    h1 {
        font-size: 2rem;
    }

    h2 {
        font-size: 1.5rem;
    }

    h3 {
        font-size: 1.3rem;
    }

    // Adjust Quotation Element Style
    blockquote {
        margin-bottom: 1.5rem;
        border-left: 4px solid ${colors.gray2};
        padding-left: 20px;
        margin: 0;
        color: #aeabab;
    }

    // Adjust Horizontal Rule style
    hr {
        border: 1px solid ${colors.gray1};
        margin-bottom: 30px;
        margin-top: 30px;
    }
    
    ol,ul {
        padding-right: 32px
    }

    // Adjust Link Element Style
    a {
        color: #4263eb;
        text-decoration: underline;
    }

    // Adjust Code Style
    pre[class*='language-'] {
        margin: 30px 0;
        padding: 15px;
        font-size: 15px;

        ::-webkit-scrollbar-thumb {
            background: rgba(255, 255, 255, 0.5);
            border-radius: 3px;
        }
    }

    code[class*='language-'],
    pre[class*='language-'] {
        tab-size: 2;
    }
`

const PostTemplate: FC<PostTemplateProps> = function ({
    data: {
        allMarkdownRemark: { edges },
    },
}) {
    const {
        node: {
            html,
            frontmatter: {
                title,
                date,
                thumbnail: {
                    childImageSharp: { gatsbyImageData },
                },
            },
        },
    } = edges[0]


    return (
        <Layout>
            <FlexBox css={{ gap: "30px" }}>
                <StyledTypography variant='h1'>{title}</StyledTypography>
                <FlexBox direction="row" css={{ gap: "5px" }}>
                    <Icon size="1x" name="calendar" />
                    <StyledTypography variant="h2" color="gray2">
                        {date}
                    </StyledTypography>
                </FlexBox>
            </FlexBox>
            <Spacing size={20} css={{ borderBottom: `1px solid ${colors.gray1}` }} />
            <MarkdownRenderer dangerouslySetInnerHTML={{ __html: html }} />
        </Layout>
    )

}

export default PostTemplate;
export { Head } from "../components/head"

export const queryMarkdownDataBySlug = graphql`
  query queryMarkdownDataBySlug($slug: String) {
    allMarkdownRemark(filter: { fields: { slug: { eq: $slug } } }) {
      edges {
        node {
          html
          frontmatter {
            title
            summary
            date(formatString: "YYYY.MM.DD.")
            categories
            thumbnail {
              childImageSharp {
                gatsbyImageData
              }
            }
          }
        }
      }
    }
  }
`