import { FC } from 'react'

interface PostContentProps {
    html: string
}

const PostContent = function ({ html }: PostContentProps) {
    return <div dangerouslySetInnerHTML={{ __html: html }} />
}

export default PostContent