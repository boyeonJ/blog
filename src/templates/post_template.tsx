import { Link, graphql } from 'gatsby'
import React from 'react'
import { Post } from '../models/types'
import styled from '@emotion/styled'
import colors from '../constants/colors'
import FlexBox from '../components/atoms/flex_box'
import StyledTypography from '../components/atoms/styled_typography'
import Chip from '../components/chip'


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
    font-weight: 400;
    color: ${colors.primary3};
    width: 100%;
    line-height: 1.8rem;

    p {
        margin-bottom: 1.5rem;
    }

    h1,
    h2,
    h3,
    h4 {
        font-weight: 600;
    }

    // Heading Element Style
    h1 {
        padding-bottom: 10px;
        border-bottom: 1px solid ${colors.gray9};
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
        border: 1px solid ${colors.gray11};
        margin-bottom: 30px;
        margin-top: 30px;
    }
    
    ol,ul {
        padding-right: 32px
    }

    // Adjust Link Element Style
    a {
        text-decoration: underline;
    }

    img {
        max-width: 100%;
    }

    .gatsby-resp-image-wrapper {
        margin: 30px 0;
    }

    strong {
        box-shadow: inset 0 -6px 0 ${colors.primary4};
        line-height: 21px;
        font-weight: inherit;
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

const PostTemplate = function ({
    data: {
        allMarkdownRemark: { edges },
    },
}: PostTemplateProps) {
    const {
        node: {
            html,
            tableOfContents,
            frontmatter: {
                title,
                date,
                categories
            },
        },
    } = edges[0]

    return (
        <>
            <FlexBox gap="20px" align='center' css={{ paddingBottom: '30px' }}>
                <FlexBox direction='row' gap="5px">
                    {categories.map((category: string) => (
                        <Link to={`../post/?category=${category}`} key={category}>
                            <Chip label={category} />
                        </Link>
                    ))}
                </FlexBox>
                <StyledTypography css={{ textAlign: 'center' }} variant='h3B'>{title}</StyledTypography>
                <StyledTypography color='gray2'>{date}</StyledTypography>
            </FlexBox >
            <MarkdownRenderer dangerouslySetInnerHTML={{ __html: html }} />
            {/* <TableOfContents content={tableOfContents} /> */}
        </ >
    )
}

export default PostTemplate;
export { Head } from "../components/head"

export const queryMarkdownDataBySlug = graphql`
            query queryMarkdownDataBySlug($slug: String) {
                allMarkdownRemark(filter: {fields: {slug: {eq: $slug } } }) {
                edges {
                node {
                html
          tableOfContents
            frontmatter {
                title
            summary
            date(formatString: "YYYY.MM.DD.")
            categories
          }
        }
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