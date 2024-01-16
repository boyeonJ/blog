import { Link } from "gatsby-link";
import colors from "../constants/colors";
import FlexBox from "./atoms/FlexBox";
import StyledTypography from "./atoms/StyledTypography";
import Icon from "./atoms/Icon";
import { Post } from "../models/types";
import { useMemo } from "react";

const PostList = ({ posts, selectedCategory }: { posts: Post[], selectedCategory: string }) => {
    const categoryPosts = useMemo(
        () =>
            posts.filter(({ node: { frontmatter: { categories } } }: Post) =>
                selectedCategory !== 'All'
                    ? categories.includes(selectedCategory)
                    : true,
            ),
        [selectedCategory],
    )

    return (
        <section>
            <Header />
            {categoryPosts.map((post, index) => (
                <Article key={index} {...post} />
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

const Article = ({ node: { frontmatter } }: Post) => {
    return (
        <article
            css={{
                borderBottom: `2px solid ${colors.gray1}`,
                padding: "30px 20px",
            }}
        >
            <Link to={`/detail/`}>
                <FlexBox css={{ gap: "20px" }}>
                    <StyledTypography variant="h1">{frontmatter.title}</StyledTypography>
                    <FlexBox direction="row" css={{ gap: "5px" }}>
                        <Icon size="1x" name="calendar" />
                        <StyledTypography variant="h2" color="gray2">
                            {frontmatter.date}
                        </StyledTypography>
                    </FlexBox>
                    {/* <GatsbyImage image={frontmatter.thumbnail.childImageSharp.gatsbyImageData} alt="thumbnail" /> */}
                    <StyledTypography variant="h2" color="gray2">
                        {frontmatter.summary}
                    </StyledTypography>
                </FlexBox>
            </Link>
        </article>
    )
}

export default PostList;