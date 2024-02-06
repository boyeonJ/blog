import { SerializedStyles, css } from "@emotion/react";
import { useEffect, useState } from "react";
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
    container: css({
        top: 0,
        padding: "1rem 2rem",
        backgroundColor: colors.primary1,
        borderBottom: `1px solid ${colors.gray9}`,
        transition: 'all 0.3s linear'
    }),
};

const navStyles: {
    [key: string]: SerializedStyles
} = {
    ul: css([
        {
            listStyleType: 'none',
            padding: 0,
            margin: 0,
            display: 'flex'
        },
        { li: { marginRight: "1.7rem" } },
        {
            [maxq[2]]: {
                flexDirection: 'column',
                'span:hover': {
                    transition: 'all 0.3s linear',
                    marginLeft: '10px',
                },
            },
        },
        {
            [minq[2]]: {
                flexDirection: 'row',
                gap: '50px',
                marginRight: '40px',
            },
        }
    ])
};

const mediaStyles: {
    [key: string]: SerializedStyles
} = {
    maxNone: css({
        [maxq[2]]: {
            display: "none",
        },
    }),
    minNone: css({
        [minq[2]]: {
            display: "none",
        },
    }),
}

const Header = () => {
    const [isNavExpanded, setIsNavExpanded] = useState(false);
    const expandNavbar = () => setIsNavExpanded(!isNavExpanded);

    return (
        <header>
            <FixedBox css={headerStyles.container}>
                <FlexBox direction="row" justify="space-between" align="center">
                    <Link to={"../../../"} onClick={() => setIsNavExpanded(false)}>
                        <StyledTypography variant="h1B">
                            BOYEON
                        </StyledTypography>
                    </Link>
                    <NavBar css={mediaStyles.maxNone} barButtonHandler={expandNavbar} />
                    <HeaderRight barButtonHandler={expandNavbar} isNavExpanded={isNavExpanded} />
                </FlexBox>
                <NavBar css={[mediaStyles.minNone,]} isNavExpanded={isNavExpanded} barButtonHandler={expandNavbar} />
            </FixedBox >
        </header >
    );
};


const NavBar = ({ className, isNavExpanded = false, barButtonHandler }: { className?: string, isNavExpanded?: boolean, barButtonHandler: () => void }) => {
    return (
        <nav className={className}>
            <ul
                css={[
                    navStyles.ul,
                    {
                        [maxq[2]]: {
                            display: `${isNavExpanded ? 'flex' : 'none'}`
                        },
                    }]}
            >
                <li>
                    <Link to={`../../../`} onClick={barButtonHandler}>
                        <StyledTypography variant="h1">BLOG</StyledTypography>
                    </Link>
                </li>
                <li>
                    <Link to={`../../resume`} onClick={barButtonHandler}>
                        <StyledTypography variant="h1">RESUME</StyledTypography>
                    </Link>
                </li>
            </ul>
        </nav>
    );
};

const HeaderRight = ({ barButtonHandler, isNavExpanded }: { barButtonHandler: () => void, isNavExpanded: boolean }) => {
    const [theme, setTheme] = useState("light");

    useEffect(() => {
        document.body.dataset.theme = theme;
    }, [theme]);


    return (
        <FlexBox direction="row" align="center" gap="20px">
            <IconButton
                onClick={() => setTheme("light" === theme ? "dark" : "light")}
                name={"moon"}
                buttonName="themeButton"
            />
            <IconButton
                name="bars"
                css={[mediaStyles.minNone, {
                    transform: isNavExpanded ? 'rotate(90deg)' : 'rotate(0deg)',
                    transition: 'all 0.3s linear',
                }]}
                buttonName="menuButton"
                onClick={barButtonHandler}
            />
        </FlexBox>
    );
};

export default Header;
