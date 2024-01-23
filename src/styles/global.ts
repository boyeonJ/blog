import { css } from "@emotion/react";

const defaultTheme = `
--light-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
--dark-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
--max-width: 1170px;
--fixed-width: 620px;
--transition: all 0.3s linear;
--spacing: 0.1rem;
--radius: 0.25rem;
`;

//primary-1 : 배경
//primary-3 : text color
//primary-2 : border
const lightTheme = `
--clr-primary-1: #FFFFFF;
--clr-primary-2: #FBFBFB;
--clr-primary-3: #212121;
--clr-primary-3: #212121;
--clr-grey-1: #878787;
--clr-grey-2: #909090;
--clr-grey-3: #9a9a9a;
--clr-grey-4: #a4a4a4;
--clr-grey-5: #aeaeae;
--clr-grey-6: #b8b8b8;
--clr-grey-7: #c1c1c1;
--clr-grey-8: #cbcbcb;
--clr-grey-9: #d5d5d5;
--clr-grey-10: #dfdfdf;
--clr-grey-11: #e9e9e9;
--clr-grey-12: #f2f2f2;
--clr-grey-13: #fcfcfc;
`;
const darkTheme = `
--clr-primary-1: #1a1e22;
--clr-primary-2: #101015;
--clr-primary-3: #FFFFFF;
--clr-grey-13: #878787;
--clr-grey-12: #909090;
--clr-grey-11: #9a9a9a;
--clr-grey-10: #a4a4a4;
--clr-grey-9: #aeaeae;
--clr-grey-8: #b8b8b8;
--clr-grey-7: #c1c1c1;
--clr-grey-6: #cbcbcb;
--clr-grey-5: #d5d5d5;
--clr-grey-4: #dfdfdf;
--clr-grey-3: #e9e9e9;
--clr-grey-2: #f2f2f2;
--clr-grey-1: #fcfcfc;
`;

const global = css`
  * {
    box-sizing: border-box;
  }
  img[alt="mdx"] {
    width: 500px;
  }
  ::after,
  ::before {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  body {
    color: var(--clr-primary-3);
    padding: 0;
    margin: 0;
    ${lightTheme}
    ${defaultTheme}
    font-family:
      'Avenir Next',
      'Spoqa Han Sans',
      'Apple SD Gothic Neo',
      'Nanum Barun Gothic',
      'Nanum Gothic',
      Verdana,
      Arial,
      'Malgun Gothic',
      Dotum,
      sans-serif;
  }
  a {
    color: inherit;
    text-decoration: none;
  }
  body[data-theme="light"] {
    ${lightTheme};
  }

  body[data-theme="dark"] {
    ${darkTheme};
  }
`;

export default global;
