import { ReactNode } from "react";
import { IGatsbyImageData } from 'gatsby-plugin-image'

export type Color =
    | "primary1"
    | "primary2"
    | "gray1"
    | "gray2"
    | "primary3"

export type Variant =
    | "h0"
    | "h1"
    | "h2"
    | "h3"
    | "h4"
    | "h5"
    | "h6"
    | "h0B"
    | "h1B"
    | "h2B"
    | "h3B"
    | "h4B"
    | "h5B"
    | "h6B"


export type FoundationProps = {
    className?: string;
    children?: ReactNode;
};

export type Post = {
    node: {
        id: string
        html: string
        fields: {
            slug: string
        }
        frontmatter: {
            title: string
            summary: string
            date: string
            categories: string[]
            thumbnail: {
                childImageSharp: {
                    gatsbyImageData: IGatsbyImageData
                }
            }
        }
    }
}

export type GraphQLNode = {
    allMarkdownRemark: { edges: Post[] },
    file: {
        childImageSharp: { gatsbyImageData: IGatsbyImageData },
    },
    site: {
        siteMetadata: MetaData
    },
};

export type MetaData = {
    title: string,
    description: string,
    siteUrl: string,
    author: string,
    image: string,
    resumeInfo: {
        experiences: Experience[],
        projects: Project[]
    }
}

export type Experience = {
    name: string
    position: string
    period: string
    description: string
}

export type Project = {
    name: string
    company: string
    period: string
    description: string
    skills: string[]
}