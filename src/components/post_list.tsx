import { Link } from "gatsby-link";
import colors from "../constants/colors";
import FlexBox from "./atoms/flex_box";
import StyledTypography from "./atoms/styled_typography";
import { Post } from "../models/types";
import useInfiniteScroll from "../hooks/use-infinite-scroll";
import { css } from "@emotion/react";
import Chip from "./chip";

const articleStyles = {
    article: css({
        borderRadius: '10px',
        marginBottom: '20px',
        padding: `20px 20px`,
        border: `1px solid ${colors.gray9}`,
        boxShadow: '2px 2px 2px var(--clr-grey-11)',
    }),
    bottom: css({
        width: "100%"
    })
}

function PostList({ posts, selectedCategory }: { posts: Post[], selectedCategory: string }) {
    const { containerRef, slicedPosts } = useInfiniteScroll(selectedCategory, posts);

    return (
        <section>
            <div ref={containerRef}>
                {slicedPosts.map((post) => (
                    <Article key={post.node.id} {...post} selectedCategory={selectedCategory} />
                ))}
            </div>
        </section>)
}


const Article = ({ selectedCategory, node: { frontmatter, fields: { slug } } }: Post & { selectedCategory: string }) => {
    return (
        <article css={articleStyles.article}>
            <Link to={slug} >
                <FlexBox gap="20px" >
                    <StyledTypography variant="h5">{frontmatter.title}</StyledTypography>
                    <StyledTypography color="gray2" variant="h6">
                        {frontmatter.summary}
                    </StyledTypography>
                    <FlexBox direction="row" gap="5px" css={articleStyles.bottom} justify="space-between" align="flex-end">
                        <StyledTypography color="gray5">
                            {frontmatter.date}
                        </StyledTypography>
                        <FlexBox direction="row" gap="5px" wrap="wrap" justify="flex-end">
                            {frontmatter.categories.map((category: string) => (
                                <Chip key={category} label={category} isActive={selectedCategory === category} />
                            ))}
                        </FlexBox >
                    </FlexBox>
                </FlexBox>
            </Link>
        </article >
    )
}

export default PostList;