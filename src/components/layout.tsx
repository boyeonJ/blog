import { Global, css } from "@emotion/react"
import colors from "../constants/colors"
import { FC, ReactNode } from "react"
import { maxq } from "../utils/styleUtil"
import Header from "./header"
import Footer from "./footer"
import global from "../styles/global"

const indexStyles = {
    main: css({
        backgroundColor: colors.primary1,
        minHeight: "100vh",
        [maxq[3]]: { padding: "130px 15px 0 15px" },
        padding: "130px 300px 50px 300px"
    })
}

type LayoutProps = {
    children: ReactNode
}

const Layout = ({
    children,
}: LayoutProps) => {

    return (
        <div>
            <Global styles={global} />
            <Header />
            <main css={indexStyles.main}>
                {children}
            </main>
            <Footer />
        </div>
    )
}

export default Layout