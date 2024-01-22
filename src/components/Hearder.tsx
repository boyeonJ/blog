import { css } from "@emotion/react";
import { useEffect, useState } from "react";
import colors from "../constants/colors";
import FixedBox from "./atoms/fixed_box";
import FlexBox from "./atoms/flex_box";
import { maxq, minq } from "../utils/styleUtil";
import StyledTypography from "./atoms/styled_typography";
import { Link } from "gatsby-link";
import IconButton from "./atoms/icon_button";

const headerStyle: {
    height: any;
    container: any;
} = {
    height: css({ height: "90px" }),
    container: css({
        top: 0,
        padding: "1rem 2rem",
        backgroundColor: colors.primary1,
        borderBottom: `2px solid ${colors.gray9}`,
    }),
};

const navStyle = {
    li: css([{
        listStyleType: 'none',
        padding: 0,
        margin: 0,
    }, { li: { marginRight: "3rem" } }]),
};

const Header = () => {
    const [theme, setTheme] = useState("light");
    useEffect(() => {
        document.body.dataset.theme = theme;
    }, [theme]);

    return (
        <header css={headerStyle.height}>
            <FixedBox css={[headerStyle.height, headerStyle.container]}>
                <FlexBox
                    direction="row"
                    align="center"
                    justify="space-between"
                    css={{ height: "100%" }}
                >
                    <HeaderLeft />
                    <NavBar />
                    <HeaderRight setTheme={setTheme} theme={theme} />
                </FlexBox>
            </FixedBox>
        </header>
    );
};

const HeaderLeft = () => {
    return (
        <div className="logo">
            <Link to={"../../blog"}>
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
            css={{
                [maxq[1]]: {
                    display: "none",
                },
            }}
        >
            <ul css={navStyle.li}>
                <FlexBox direction="row">
                    {["blog", "resume"].map((value: string) => (
                        <li key={value}>
                            <Link to={`../../${value}`}>
                                <StyledTypography variant="h1" >{value.toUpperCase()}</StyledTypography>
                            </Link>
                        </li>
                    ))}
                </FlexBox>
            </ul>
        </nav>
    );
};

const HeaderRight = ({ setTheme, theme }: any) => {
    return (
        <FlexBox direction="row" align="center" css={{ gap: "20px" }}>
            <IconButton
                onClick={() => setTheme("light" === theme ? "dark" : "light")}
                name={"moon"}
            />
            <IconButton
                name="bars"
                css={{
                    [minq[1]]: {
                        display: "none",
                    },
                }}
            />
        </FlexBox>
    );
};

export default Header;
