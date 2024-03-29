import { ReactNode } from "react";
import { IGatsbyImageData } from 'gatsby-plugin-image'

export type Color =
    | "primary1"
    | "primary2"
    | "primary3"
    | "primary4"
    | "gray1"
    | "gray2"
    | "gray3"
    | "gray4"
    | "gray5"
    | "gray6"
    | "gray7"
    | "gray8"
    | "gray9"
    | "gray10"
    | "gray11"
    | "gray12"
    | "gray13"

export type Variant =
    | "h1"
    | "h2"
    | "h3"
    | "h4"
    | "h5"
    | "h6"
    | "h7"
    | "h8"
    | "h1B"
    | "h2B"
    | "h3B"
    | "h4B"
    | "h5B"
    | "h6B"
    | "h7B"
    | "h8B"


export type FoundationProps = {
    className?: string;
    children?: ReactNode;
};

export type Post = {
    node: {
        tableOfContents: string
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
        projects: Project[],
        personalProjects: PersonalProject[],
        skills: Skill[]
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
    tasks: string[]
    results: string[]
}

export type PersonalProject = {
    name: string
    period: string
    description: string
    skills: string[]
    results: string[]
    link: string;
    gitLink: string;
}

export type Skill = {
    name: string
    contents: string[]
}