import { FC, FunctionComponent } from 'react'
import styled from '@emotion/styled'

interface PostContentProps {
    html: string
}

// const MarkdownRenderer = styled.div`
//   // Renderer Style
//   display: flex;
//   flex-direction: column;
//   width: 768px;
//   margin: 0 auto;
//   padding: 100px 0;
// `

const PostContent: FC<PostContentProps> = function ({ html }) {
    return <div dangerouslySetInnerHTML={{ __html: html }} />
}

export default PostContent