import { Link } from "gatsby-link";
import colors from "../constants/colors";
import FlexBox from "./atoms/FlexBox";
import StyledTypography from "./atoms/StyledTypography";
import Icon from "./atoms/Icon";
import { Post } from "../models/types";

const PostList = ({ posts }: { posts: Post[] }) => {
    return (
        <section>
            <Header />
            {posts.map((post, index) => (
                <Article key={index} post={post} />
            ))}
        </section>)
}

const Header = () => {
    return (
        <header>
            <FlexBox
                css={{
                    borderBottom: `2px solid ${colors.gray1}`,
                    padding: "20px 0",
                }}
            >
                <StyledTypography variant="h1">Blog</StyledTypography>
                <StyledTypography color="gray2">
                    기술을 기록합니다.
                </StyledTypography>
            </FlexBox>
        </header>
    )
}

const Article = ({ post }: { post: Post }) => {
    return (
        <article
            css={{
                borderBottom: `2px solid ${colors.gray1}`,
                padding: "30px 20px",
            }}
        >
            <Link to={`/detail/`}>
                <FlexBox css={{ gap: "10px" }}>
                    <StyledTypography variant="h1">{post.node.frontmatter.title}</StyledTypography>
                    <FlexBox direction="row" css={{ gap: "5px" }}>
                        <Icon size="1x" name="calendar" />
                        <StyledTypography variant="h2" color="gray2">
                            {post.node.frontmatter.date}
                        </StyledTypography>
                    </FlexBox>
                    <StyledTypography variant="h2" color="gray2">
                        {post.node.frontmatter.summary}
                    </StyledTypography>
                </FlexBox>
            </Link>
        </article>
    )
}

export default PostList;