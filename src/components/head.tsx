import { HeadFC } from "gatsby";
import { GraphQLNode } from "../models/types";
import * as React from 'react'

export const Head: HeadFC<GraphQLNode> = ({
    data: { site:
        { siteMetadata:
            {
                title,
                description,
                image,
                siteUrl
            }
        }
    }
}) => {
    return (
        <>
            <html lang="ko" />
            <title>정보연 블로그</title>
            <meta name="description" content={description} />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <meta httpEquiv="Content-Type" content="text/html;charset=UTF-8" />

            <meta property="og:type" content="website" />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={image} />
            <meta property="og:url" content={siteUrl} />
            <meta property="og:site_name" content={title} />
        </>
    )
}