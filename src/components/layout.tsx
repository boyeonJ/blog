import { Global, css } from "@emotion/react"
import colors from "../constants/colors"
import { FC, ReactNode } from "react"
import { maxq } from "../utils/styleUtil"
import Header from "./hearder"
import Footer from "./footer"
import global from "../styles/global"
import { MetaData } from "../models/types"
import { HeadFC, HeadProps } from "gatsby"

const indexStyles = {
    main: css({
        backgroundColor: colors.primary1,
        minHeight: "100vh",
        paddingTop: "30px",
    })
}

type LayoutProps = {
    children: ReactNode
    metaData: Omit<MetaData, 'resumeInfo'>
}

const Layout: FC<LayoutProps> = ({
    children,
    metaData
}) => {

    return (
        <div>
            <Global styles={global} />
            <Header />
            <main
                css={indexStyles.main}>
                <div
                    css={{
                        [maxq[2]]: { margin: "0 100px" },
                        [maxq[1]]: { margin: "0px 20px" },
                        margin: "0 200px",
                    }}
                >
                    {children}
                </div>
            </main>
            <Footer />
        </div>
    )
}


export const Head: HeadFC<Omit<MetaData, 'resumeInfo'>> = (props) => {
    console.log(props);
    return (<>
        {/* 
        <title>정보연 블로그</title>

        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="Content-Type" content="text/html;charset=UTF-8" />

        <meta property="og:type" content="website" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={image} />
        <meta property="og:url" content={siteUrl} />
        <meta property="og:site_name" content={title} />

        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={image} />
        <meta name="twitter:site" content="@사용자이름" />
        <meta name="twitter:creator" content="@사용자이름" /> */}

    </>)
}

export default Layout