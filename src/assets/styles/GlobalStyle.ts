import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  html {
    box-sizing: border-box;
    font-size: 62.5%;
    font-family: 'Montserrat', sans-serif;
  }

  body {
    margin: 0;
    padding: 0;
    font-size: 1.6rem;
  }

  *,
  *::after,
  *::before {
    box-sizing: inherit;
  }
`;

export default GlobalStyle;
