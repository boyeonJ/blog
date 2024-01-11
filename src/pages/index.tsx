import type { HeadFC, PageProps } from "gatsby"
import React, { FC, useEffect, useState } from "react";
import IconButton from "../components/atoms/IconButton";
import FlexBox from "../components/atoms/FlexBox";
import colors from "../constants/colors";
import { Global } from "@emotion/react";
import global from "../styles/global";


const IndexPage: FC<PageProps> = ({ data, location }) => {
  const [theme, setTheme] = useState("light");
  useEffect(() => {
    document.body.dataset.theme = theme;
  }, [theme]);

  return (
    <>
      <Global styles={global} />
      <FlexBox css={{ backgroundColor: colors.primary1 }}>
        <IconButton
          onClick={() => setTheme("light" === theme ? "dark" : "light")}
          name={"light" === theme ? "clear_night" : "clear_day"}
          size="large"
        />
      </FlexBox>
    </>
  )
}

export default IndexPage

export const Head: HeadFC = () => <title>Home Page</title>
