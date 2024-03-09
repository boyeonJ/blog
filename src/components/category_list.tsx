import { FC } from "react"
import StyledTypography from "./atoms/styled_typography"
import { Link } from "gatsby"
import FlexBox from "./atoms/flex_box"
import colors from "../constants/colors"
import { SerializedStyles, css } from "@emotion/react"

export type CategoryListProps = {
    selectedCategory: string
    categoryList: {
        [key: string]: number
    }
}

const categoryStyles: { [key: string]: SerializedStyles } = {
    category: css({
        marginRight: '10px',
        '&:hover': {
            color: colors.primary4
        }
    })
}

const CategoryList = ({
    selectedCategory,
    categoryList,
}: CategoryListProps) => {
    return (
        <FlexBox gap="20px" align="center">
            <FlexBox gap="8px" align="center">
                <StyledTypography variant="h2B">{selectedCategory}</StyledTypography>
                <StyledTypography variant="h4" color="gray2">{categoryList[selectedCategory]} POSTS</StyledTypography>
            </FlexBox>
            <FlexBox direction="row" gap="5px" wrap="wrap" justify="center">
                {
                    Object.entries(categoryList).map(([name]) => (
                        <Link to={`./?category=${name}`} key={name}>
                            <StyledTypography
                                color={name === selectedCategory ? 'primary4' : 'primary3'}
                                css={categoryStyles.category} >
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