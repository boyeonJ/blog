import { FC } from "react"
import StyledTypography from "./atoms/StyledTypography"
import Button from "./foundations/Button"
import { navigate } from "gatsby-link"

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
                    <Button key={name} onClick={() => navigate(`/?category=${name}`)} css={{ backgroundColor: "transparent", borderColor: "transparent" }}>
                        <StyledTypography color="gray2" css={{ marginRight: '10px' }} >
                            #{name}({count})
                        </StyledTypography>
                    </Button>
                ))
            }
        </div>
    )
}

export default CategoryList;