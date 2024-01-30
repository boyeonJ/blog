import { FC } from 'react'

interface PostContentProps {
    html: string
}

const PostContent: FC<PostContentProps> = function ({ html }) {
    return <div dangerouslySetInnerHTML={{ __html: html }} />
}

export default PostContent