import { createGlobalStyle } from "styled-components";
import { setFlexbox } from "./helpers/mixins";
import { images } from "./components/Images/Images";

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
    background: #0e0e0e;
    font-size: 62.5%;
    background-image: ${`url(${images.loginBackground})`};
    background-size: cover;
    background-repeat: no-repeat;

    @media screen and (max-width: 780px) {
      font-size: 60%;
    }
  }
`;

export default GlobalStyles;
