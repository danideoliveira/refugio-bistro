import { createGlobalStyle } from "styled-components";
import { setFlexbox } from "./helpers/mixins";

const GlobalStyles = createGlobalStyle`
  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    font-family: "Source Sans 3", sans-serif;
    /* outline: 1px solid rebeccapurple; */
  }

  .container {
    ${setFlexbox("center", "center", "row")}
  }

  html {
    font-size: 62.5%;

    @media screen and (max-width: 780px) {
      font-size: 60%;
    }
  }
`;

export default GlobalStyles;
