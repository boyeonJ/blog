import { FC } from "react"
import StyledTypography from "./atoms/styled_typography"
import Button from "./foundations/button"
import { Link } from "gatsby"

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
        <div>
            {
                Object.entries(categoryList).map(([name, count]) => (
                    <Link to={`./?category=${name}`} key={name}>
                        <StyledTypography color="gray2" css={{ marginRight: '10px' }} >
                            #{name}({count})
                        </StyledTypography>
                    </Link>
                ))
            }
        </div>
    )
}

export default CategoryList;