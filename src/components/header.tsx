import { SerializedStyles, css } from "@emotion/react";
import { useEffect, useState, Profiler } from "react";
import colors from "../constants/colors";
import FixedBox from "./atoms/fixed_box";
import FlexBox from "./atoms/flex_box";
import { maxq, minq } from "../utils/styleUtil";
import StyledTypography from "./atoms/styled_typography";
import { Link } from "gatsby-link";
import IconButton from "./atoms/icon_button";


const headerStyles: {
    [key: string]: SerializedStyles
} = {
    height: css({ height: "120px" }),
    innerHeight: css({ height: "100%" }),
    container: css({
        top: 0,
        padding: "1rem 2rem",
        backgroundColor: colors.primary1,
        borderBottom: `1px solid ${colors.gray9}`,
    }),
};

const navStyles: {
    [key: string]: SerializedStyles
} = {
    ul: css([{
        listStyleType: 'none',
        padding: 0,
        margin: 0,
    }, { li: { marginRight: "3rem" } }]),
};

const mediaStyles: {
    [key: string]: SerializedStyles
} = {
    maxNone: css({
        [maxq[1]]: {
            display: "none",
        },
    }),
    minNone: css({
        [minq[1]]: {
            display: "none",
        },
    }),
}

const Header = () => {
    return (
        <header css={headerStyles.height}>
            <FixedBox css={[headerStyles.height, headerStyles.container]}>
                <FlexBox
                    direction="row"
                    align="center"
                    justify="space-between"
                    css={headerStyles.innerHeight}
                >
                    <HeaderLeft />
                    <NavBar />
                    <HeaderRight />
                </FlexBox>
            </FixedBox>
        </header>
    );
};

const HeaderLeft = () => {
    return (
        <div className="logo">
            <Link to={"../../"}>
                <StyledTypography variant="h1">
                    BOYEON
                </StyledTypography>
            </Link>
        </div>
    );
};

const NavBar = () => {
    return (
        <nav
            css={mediaStyles.maxNone}
        >
            <ul css={navStyles.ul}>
                <FlexBox direction="row">
                    <li>
                        <Link to={`../../../`}>
                            <StyledTypography variant="h1" >BLOG</StyledTypography>
                        </Link>
                    </li>
                    <li>
                        <Link to={`../../resume`}>
                            <StyledTypography variant="h1" >RESUME</StyledTypography>
                        </Link>
                    </li>
                </FlexBox>
            </ul>
        </nav>
    );
};

const HeaderRight = () => {
    const [theme, setTheme] = useState("light");

    useEffect(() => {
        document.body.dataset.theme = theme;
    }, [theme]);


    return (
        <FlexBox direction="row" align="center" gap="20px">
            <IconButton
                onClick={() => setTheme("light" === theme ? "dark" : "light")}
                name={"moon"}
            />
            <IconButton
                name="bars"
                css={mediaStyles.minNone}
            />
        </FlexBox>
    );
};

export default Header;
