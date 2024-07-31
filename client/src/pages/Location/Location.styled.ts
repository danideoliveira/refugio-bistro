import styled from "styled-components";
import { setFlexbox } from "../../helpers/mixins";
import { palette } from "../../helpers/palette";

export const Container = styled.section`
  ${setFlexbox("center", "center", "row")}
  width: 100%;
  max-height: 55rem;
  padding: 9rem 0;
  background-color: ${palette.location_background};
  position: relative;
  overflow: hidden;

  .location-box {
    ${setFlexbox("space-evenly", "center", "row")}
    width: 90%;
    height: 100%;
    max-width: 1080px;
  }

  .location-background {
    position: absolute;
    width: 30%;
    right: 0;
    bottom: 0;
  }
`;

export const LeftContent = styled.div`
  ${setFlexbox("center", "flex-start", "column")}
  width: 30%;
  gap: 3rem;
  z-index: 99;

  .select-location-box {
    ${setFlexbox("center", "center", "column")}
    gap: 3rem;
  }

  h2 {
    font-size: 3.4rem;
    color: ${palette.location_title_color};
  }

  .button-list {
    ${setFlexbox("center", "center", "column")}
    gap: 2rem;
  }

  button {
    ${setFlexbox("flex-start", "center", "row")}
    font-size: 1.6rem;
    width: 18rem;
    padding: 1rem;
    gap: 2rem;
    border-radius: 5px;
    color: ${palette.location_button_color};
    border: 1px solid ${palette.location_button_color};
    background: transparent;
    cursor: pointer;
    transition: 0.3s all ease;

    &:hover {
      color: ${palette.location_button_background};
      background-color: ${palette.location_button_color};
    }
  }

  button.active {
    background: ${palette.location_button_color};
    color: ${palette.location_button_background};
  }
`;
export const RightContent = styled.div`
  ${setFlexbox("center", "center", "row")}
  width: 50%;
  height: 35rem;
  z-index: 99;

  .location-box {
    ${setFlexbox("center", "flex-end", "column")}
    width: 100%;
    height: 100%;
    border-radius: 5px;
    position: relative;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
  }

  .location-gradient {
    position: absolute;
    border-radius: 5px;
    height: 100%;
    width: 100%;
    background: linear-gradient(
      90deg,
      rgba(0, 0, 0, 0) 7%,
      rgba(14, 14, 14, 1) 100%
    );
  }
`;

export const LocationContent = styled.div`
  ${setFlexbox("center", "flex-start", "column")}
  width: 50%;
  overflow: hidden;
  padding: 2rem;
  z-index: 99;

  img {
    width: 100%;
  }

  h3,
  p {
    color: ${palette.location_text_color};
  }

  h3 {
    font-size: 2.5rem;
  }

  p {
    font-size: 1.5rem;
    margin-bottom: 2rem;
  }

  a {
    width: 15rem;
    font-size: 1.6rem;
    font-weight: 600;
    color: ${palette.location_button_color};
    background: transparent;
    border: 1px solid ${palette.location_button_color};
    border-radius: 5px;
    padding: 1rem;
    cursor: pointer;
    transition: 0.3s all ease;
    text-decoration: none;
    text-align: center;

    &:hover {
      background: ${palette.location_button_background};
      color: ${palette.location_button_color};
      border: 1px solid ${palette.location_button_background};
    }
  }
`;
