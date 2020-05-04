import { normalize } from 'styled-normalize';
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  ${normalize}

    body {
        margin: 0;
        padding: 0;
        font-family: 'Helvetica', sans-serif;
        font-size: 1.5rem;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        padding: 20px;
    }
    * {
      box-sizing: border-box;
    }
`;

export default GlobalStyle;
