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
        [maxq[2]]: { padding: "180px 50px 0 50px" },
        padding: "180px 200px 0 200px"
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