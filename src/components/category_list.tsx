import { FC } from "react"
import StyledTypography from "./atoms/styled_typography"
import Button from "./foundations/button"
import { Link } from "gatsby"
import FlexBox from "./atoms/flex_box"
import colors from "../constants/colors"

export type CategoryListProps = {
    selectedCategory: string
    categoryList: {
        [key: string]: number
    }
}

const CategoryList: FC<CategoryListProps> = ({
    selectedCategory,
    categoryList,
}: CategoryListProps) => {
    return (
        <FlexBox gap="50px" align="center">
            <FlexBox gap="10px" align="center">
                <StyledTypography variant="h1B">{selectedCategory}</StyledTypography>
                <StyledTypography variant="h4" color="gray2">{categoryList[selectedCategory]} POSTS</StyledTypography>
            </FlexBox>
            <FlexBox direction="row" gap="10px" css={{ flexWrap: 'wrap' }} justify="center">
                {
                    Object.entries(categoryList).map(([name]) => (
                        <Link to={`./?category=${name}`} key={name}>
                            <StyledTypography
                                variant={name === selectedCategory ? "h6B" : "h6"}
                                color={name === selectedCategory ? "primary3" : "gray2"}
                                css={{
                                    marginRight: '10px',
                                    '&:hover': {
                                        color: colors.primary3
                                    }
                                }} >
                                {name}
                            </StyledTypography>
                        </Link>
                    ))
                }
            </FlexBox>

        </FlexBox >
    )
}

export default CategoryList;