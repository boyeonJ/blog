import { Link } from "gatsby-link";
import colors from "../constants/colors";
import FlexBox from "./atoms/flex_box";
import StyledTypography from "./atoms/styled_typography";
import { Post } from "../models/types";
import useInfiniteScroll from "../hooks/use-infinite-scroll";
import { css } from "@emotion/react";

const articleStyles = {
    article: css({ padding: "30px 0" }),
    bottom: css({ width: "100%" }),
    chip: css({ backgroundColor: colors.gray5, borderRadius: '8px', padding: '2px 7px' })
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
                    <StyledTypography variant="h3">{frontmatter.title}</StyledTypography>
                    <StyledTypography color="gray2" variant="h6">
                        {frontmatter.summary}
                    </StyledTypography>
                    <FlexBox direction="row" gap="5px" css={articleStyles.bottom} justify="space-between" align="center">
                        <StyledTypography color="gray5">
                            {frontmatter.date}
                        </StyledTypography>
                        <CategoryChips categories={frontmatter.categories} selectedCategory={selectedCategory} />
                    </FlexBox>
                </FlexBox>
            </Link>
        </article >
    )
}

const CategoryChips = ({ categories, selectedCategory }: { categories: string[], selectedCategory: string }) => {
    return (
        <FlexBox direction="row" gap="5px">
            {categories.map((category: string) => (
                <div key={category} css={articleStyles.chip}>
                    <StyledTypography
                        color={selectedCategory === category ? "primary3" : "gray13"}
                        variant={selectedCategory === category ? "h7B" : "h7B"}>
                        {category}
                    </StyledTypography>
                </div>
            ))}
        </FlexBox>
    )
}

export default PostList;