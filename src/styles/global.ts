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
--clr-grey-1: #E9E9EB;
--clr-grey-2: #A4A4A4;
`;
const darkTheme = `
--clr-primary-1: #000000;
--clr-primary-2: #101015;
--clr-primary-3: #FFFFFF;
--clr-grey-1: #36363A;
--clr-grey-2: #919193;
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
