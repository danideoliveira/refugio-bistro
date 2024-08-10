import styled from "styled-components";
import { setFlexbox } from "../../helpers/mixins";
import { images } from "../../components/Images/Images";
import { palette } from "../../helpers/palette";
import { Link } from "react-router-dom";

export const Container = styled.div`
  ${setFlexbox("center", "center", "row")}
  width: 100%;
  height: 100vh;
  background-image: ${`url(${images.homeImage})`};
  background-size: cover;
  background-repeat: no-repeat;
  position: relative;

  .home-box {
    ${setFlexbox("center", "flex-start", "column")}
    gap: 2rem;
    width: 90%;
    z-index: 99;
  }

  .home-content {
    ${setFlexbox("center", "flex-start", "column")}
    width: 50%;
    max-width: 50rem;
  }

  .gradient {
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      rgba(14, 14, 14, 1) 7%,
      rgba(255, 255, 255, 0) 100%
    );
    position: absolute;
  }
`;

export const Title = styled.h1`
  font-size: 5.4rem;
  color: ${palette.home_title_color};

  & + p {
    font-size: 1.6rem;
    color: ${palette.home_text_color};
    text-align: justify;
  }
`;

export const Button = styled(Link)`
  width: 15rem;
  font-size: 1.6rem;
  font-weight: 600;
  color: ${palette.home_button_color};
  background: transparent;
  border-radius: 5px;
  border: 2px solid ${palette.home_button_color};
  padding: 1rem;
  cursor: pointer;
  transition: 0.3s all ease;
  text-decoration: none;
  text-align: center;

  &:hover {
    background: ${palette.home_button_background};
    color: #0c0c0c;
  }
`;
