import { ReactNode } from "react";

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
        frontmatter: {
            title: string
            summary: string
            date: string
            categories: string[]
            thumbnail: {
                publicURL: string
            }
        }
    }
}

export type Remark = { allMarkdownRemark: { edges: Post[] } };