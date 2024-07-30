import Slider from "react-slick";
import styled from "styled-components";
import { palette } from "../../helpers/palette";
import { setFlexbox } from "../../helpers/mixins";

export const Container = styled.div`
  ${setFlexbox("center", "flex-start", "column")}
  gap: 1rem;
  height: 300px;

  .carousel-card {
    transition: 0.3s all ease;
  }

  .carousel-image {
    ${setFlexbox("center", "center", "row")}
    width: 100%;
    height: 30rem;
    overflow: hidden;
    border-radius: 5px;

    img {
      transition: 0.3s all ease;
      border-radius: 5px;

      &:hover {
        transform: scale(1.05);
      }
    }
  }

  .carousel-buttons {
    ${setFlexbox("center", "flex-start", "row")}
    gap: 2rem;

    button {
      padding: 0.5rem;
      color: ${palette.carousel_button_color};
      font-weight: 600;
      border: none;
      border-radius: 5px;
      background-color: transparent;
      cursor: pointer;
      transition: 0.3s all ease;
      font-size: 1.6rem;
    }

    .active {
      background-color: ${palette.carousel_button_color};
      color: ${palette.carousel_button_background};
    }
  }
`;

export const StyledSlider = styled(Slider)`
  max-width: 50rem;

  h3 {
    color: ${palette.carousel_title_color};
    font-size: 1.8rem;
  }

  span {
    color: ${palette.carousel_text_color};
    font-size: 1.8rem;
    font-weight: 600;
  }
`;

export const Slide = styled.div`
  opacity: 0.5;
  transition: opacity 0.5s ease-in-out;

  &.slick-center {
    opacity: 1;
  }

  img {
    width: 100%;
    display: block;
  }
`;

export const SampleNextArrow = styled.div`
  display: block;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 50%;
  width: 40px;
  height: 40px;
  z-index: 1;
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;

  &:before {
    color: black;
  }
`;

export const SamplePrevArrow = styled(SampleNextArrow)`
  left: 10px;
  right: auto;
`;
