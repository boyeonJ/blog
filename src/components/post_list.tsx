import { Link } from "gatsby-link";
import colors from "../constants/colors";
import FlexBox from "./atoms/flex_box";
import StyledTypography from "./atoms/styled_typography";
import Icon from "./atoms/icon";
import { Post } from "../models/types";
import useInfiniteScroll from "../hooks/use-infinite-scroll";

const PostList = ({ posts, selectedCategory }: { posts: Post[], selectedCategory: string }) => {
    const { containerRef, slicedPosts } = useInfiniteScroll(selectedCategory, posts);

    return (
        <section>
            <div ref={containerRef}>
                {slicedPosts.map((post, index) => (
                    <Article key={index} {...post} />
                ))}
            </div>
        </section>)
}

const Article = ({ node: { frontmatter, fields: { slug } } }: Post) => {
    return (
        <article
            css={{
                // borderBottom: `2px solid ${colors.gray9}`,
                padding: "30px 20px",
            }}
        >
            <Link to={slug} >
                <FlexBox css={{ gap: "20px" }}>
                    <StyledTypography variant="h3">{frontmatter.title}</StyledTypography>
                    <StyledTypography color="gray2" variant="h6">
                        {frontmatter.summary}
                    </StyledTypography>
                    <FlexBox direction="row" css={{ gap: "5px" }}>
                        {/* <Icon size="1x" name="calendar" /> */}
                        <StyledTypography color="gray2">
                            {frontmatter.date}
                        </StyledTypography>
                    </FlexBox>
                </FlexBox>
            </Link>
        </article >
    )
}

export default PostList;