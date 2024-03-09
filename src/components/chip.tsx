import colors from "../constants/colors"
import StyledTypography from "./atoms/styled_typography"

const Chip = ({ isActive = false, label }: { isActive?: boolean, label: string }) => {
    return (
        <div style={{ border: `1px solid ${isActive ? colors.primary4 : colors.gray2}` }} css={{ borderRadius: '8px', padding: '2px 5px' }}>
            <StyledTypography
                color={isActive ? "primary4" : "gray2"}
                variant='h7'>
                {label}
            </StyledTypography>
        </div>
    )
}

export default Chip

