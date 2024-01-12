import colors from "../constants/colors";
import FlexBox from "./atoms/FlexBox";
import StyledTypography from "./atoms/StyledTypography";

const Footer = () => {
    return (
        <section
            css={{ backgroundColor: colors.primary1, bottom: 0, width: '100vw' }}
        >
            <FlexBox align="center" css={{ padding: '50px' }}>
                <StyledTypography color="gray2">Copyright ⓒ 2023 정보연 All rights reserved.</StyledTypography>
            </FlexBox>
        </section>
    );
};

export default Footer;
