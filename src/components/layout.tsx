import { Global, css } from "@emotion/react"
import colors from "../constants/colors"
import { FC, ReactNode, useEffect } from "react"
import { maxq } from "../utils/styleUtil"
import Header from "./hearder"
import Footer from "./footer"
import global from "../styles/global"

const indexStyles = {
    main: css({
        backgroundColor: colors.primary1,
        minHeight: "100vh",
        paddingTop: "110px",
    })
}

type LayoutProps = {
    children: ReactNode
}

const Layout: FC<LayoutProps> = ({
    children,
}) => {

    return (
        <div>
            <Global styles={global} />
            <Header />
            <main
                css={indexStyles.main}>
                <div
                    css={{
                        // [maxq[2]]: { margin: "0 100px" },
                        [maxq[1]]: { margin: "0px 20px" },
                        margin: "0 350px",
                    }}
                >
                    {children}
                </div>
            </main>
            <Footer />
        </div>
    )
}

export default Layout