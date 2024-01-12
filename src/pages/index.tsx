import type { HeadFC, PageProps } from "gatsby"
import React, { FC } from "react";
import colors from "../constants/colors";
import { Global, css } from "@emotion/react";
import global from "../styles/global";
import Header from "../components/Hearder";
import Footer from "../components/Footer";

const indexStyles = {
  main: css({
    backgroundColor: colors.primary1,
    minHeight: "100vh",
    paddingTop: "30px",
  })
}

const IndexPage: FC<PageProps> = ({ data, location }) => {

  return (
    <>
      <Global styles={global} />
      <Header />
      <main
        css={indexStyles.main}>
        <h2>h2</h2>
      </main>
      <Footer />
    </>
  )
}

export default IndexPage

export const Head: HeadFC = () => <title>Home Page</title>
