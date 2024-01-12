import { css } from "@emotion/react";
import { useEffect, useState } from "react";
import colors from "../constants/colors";
import FixedBox from "./atoms/FixedBox";
import FlexBox from "./atoms/FlexBox";
import { maxq, minq } from "../utils/styleUtil";
import StyledTypography from "./atoms/StyledTypography";
import { Link } from "gatsby-link";
import IconButton from "./atoms/IconButton";

const headerStyle: {
    height: any;
    container: any;
} = {
    height: css({ height: "90px" }),
    container: css({
        top: 0,
        padding: "1rem 2rem",
        backgroundColor: colors.primary1,
        borderBottom: `2px solid ${colors.gray1}`,
    }),
};

const navStyle = {
    li: css({ li: { marginRight: "3rem" } }),
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
            <StyledTypography variant="h0" css={{ lineHeight: "38px" }}>
                BOYEON
            </StyledTypography>
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
                            <Link to={value}>
                                <StyledTypography variant="h0" >{value.toUpperCase()}</StyledTypography>
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
