import { Link, graphql } from 'gatsby'
import { FC } from 'react'
import React from 'react'
import { Post } from '../models/types'
import Layout from '../components/layout'
import styled from '@emotion/styled'
import colors from '../constants/colors'
import FlexBox from '../components/atoms/flex_box'
import StyledTypography from '../components/atoms/styled_typography'
import Spacing from '../components/atoms/spacing'


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
    font-size: 1.2rem;
    font-weight: 400;
    color: ${colors.primary3};

    p {
        margin-bottom: 1.5rem;
    }

    // Heading Element Style
    h1,
    h2,
    h3 {
        font-weight: 500;
        margin-bottom: 20px;
        margin-top: 70px;
    }

    hr + h1,
    hr + h2,
    hr + h3 {
        margin-top: 0;
        margin-bottom: 0;
    }

    h1 {
        font-size: 2.5rem,
    }

    h2 {
        font-size: 2.2rem,
    }

    h3 {
        font-size: 1.8rem,
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

    img {
        max-width: 100%;
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
                categories
            },
        },
    } = edges[0]


    return (
        <>
            <FlexBox css={{ gap: "10px" }}>
                <StyledTypography variant='h1B'>{title}</StyledTypography>
                <FlexBox gap="10px" align='flex-end' css={{ width: '100%' }}>
                    <FlexBox direction='row' gap="5px">
                        {categories.map((category: string) => (
                            <Link to={`../post/?category=${category}`} key={category}>
                                <div css={{ backgroundColor: colors.gray12, borderRadius: '8px', padding: '2px 7px' }}>
                                    <StyledTypography>
                                        {category}
                                    </StyledTypography>
                                </div>
                            </Link>
                        ))}
                    </FlexBox>
                    <StyledTypography>
                        {date}
                    </StyledTypography>
                </FlexBox>
            </FlexBox>
            <Spacing size={20} />
            <MarkdownRenderer dangerouslySetInnerHTML={{ __html: html }} />
        </>
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