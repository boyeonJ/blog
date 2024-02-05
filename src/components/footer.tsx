import { css } from "@emotion/react";
import colors from "../constants/colors";
import FlexBox from "./atoms/flex_box";
import StyledTypography from "./atoms/styled_typography";
import Spacing from "./atoms/spacing";

const footerStyles = {
    section: css({ backgroundColor: colors.primary1, bottom: 0, width: '100vw', padding: '50px 0' })
}

const Footer = () => {
    return (
        <section css={footerStyles.section}>
            <FlexBox align="center">
                <StyledTypography color="gray2">Copyright ⓒ 2023 정보연 All rights reserved.</StyledTypography>
            </FlexBox>
        </section>
    );
};

export default Footer;


