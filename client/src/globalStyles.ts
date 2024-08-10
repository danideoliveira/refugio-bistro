import { createGlobalStyle } from "styled-components";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const GlobalStyles = createGlobalStyle`
  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    font-family: "Source Sans 3", sans-serif;
    /* outline: 1px solid rebeccapurple; */
  }

  html {
    font-size: 62.5%;
    background-color: #0c0c0c;
  }


  .slider-container {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .slick-dots li.slick-active button::before{
    color: #fff;
  }


  .slick-dots li button::before{
    color: #fff;
  }

  .slick-prev {
    left: -50px;
  }

  .slick-next {
    right: -50px;
  }

  .slick-prev,
  .slick-next {
    border-radius: 50%;
    width: 40px;
    height: 40px;
    z-index: 1;
  }

  .slick-prev:before,
  .slick-next:before {
    color: white;
    font-size: 3rem;
  }

  .slick-slide {
    transition: opacity 0.5s ease-in-out;
  }

  .slick-center {
    opacity: 1;
  }

  .slick-slide img {
    width: 100%;
    display: block;
  }
`;

export default GlobalStyles;
