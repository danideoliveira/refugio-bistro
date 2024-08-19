import styled from "styled-components";
import { images } from "../../components/Images/Images";
import { setFlexbox } from "../../helpers/mixins";
import { palette } from "../../helpers/palette";

export const Container = styled.section`
  ${setFlexbox("center", "center", "row")}
  width: 100%;
  height: 100vh;
  background-color: aliceblue;
  background-image: ${`url(${images.reservationBackground})`};
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

export const Box = styled.div`
  ${setFlexbox("center", "center", "row")}
  width: 80%;
  max-width: 70rem;
  height: 53rem;
  border-radius: 5px;
  overflow: hidden;

  .res-text-box {
    ${setFlexbox("center", "center", "column")}
  }

  .res-info-box {
    ${setFlexbox("center", "center", "row")}
    height: 30rem;
  }

  h2 {
    font-size: 3rem;
    color: ${palette.reservation_title_color};
  }

  span {
    font-size: 1.8rem;
    color: ${palette.reservation_text_color};
    font-weight: 500;
  }

  .res-image {
    width: 100%;
    height: 100%;
    background-image: ${`url(${images.reservationBox})`};
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
  }

  .res-content {
    ${setFlexbox("space-evenly", "center", "column")}
    width: 100%;
    height: 100%;
    background-color: ${palette.reservation_background};
    position: relative;
  }

  .res-drop-list {
    ${setFlexbox("center", "center", "column")}
    gap: 1rem;
  }

  @media screen and (max-width: 780px) {
    width: 90%;

    .res-image {
      display: none;
    }
  }
`;

export const BackButton = styled.button`
  ${setFlexbox("center", "center", "row")}
  position: absolute;
  left: 0;
  top: 0;
  margin: 2rem 1rem;
  font-size: 2rem;
  background: transparent;
  border: none;
  cursor: pointer;
`;

export const NextButton = styled.button`
  ${setFlexbox("center", "center", "row")}
  height: 3.5rem;
  width: 12rem;
  border: none;
  border-radius: 5px;
  font-size: 1.8rem;
  background-color: ${palette.reservation_button_background};
  color: ${palette.reservation_button_color};
  font-weight: 600;
  transition: 0.3s all ease;
  cursor: pointer;

  svg {
    margin-left: 0.5rem;
  }

  &:hover {
    filter: contrast(1.5);
  }
`;

export const LocationList = styled.ul`
  ${setFlexbox("center", "center", "column")}
  gap: 2rem;

  button {
    ${setFlexbox("flex-start", "center", "row")}
    font-size: 1.8rem;
    width: 25rem;
    padding: 1rem;
    gap: 2rem;
    border-radius: 5px;
    color: ${palette.reservation_button_background};
    border: 2px solid ${palette.reservation_button_background};
    background: transparent;
    cursor: pointer;
    transition: 0.3s all ease;

    &:hover {
      color: ${palette.reservation_button_color};
      background-color: ${palette.reservation_button_background};
    }
  }

  button.active {
    color: ${palette.reservation_button_color};
    background-color: ${palette.reservation_button_background};
  }
`;

export const ReviewGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;

  @media screen and (max-width: 780px) {
    gap: 0;
  }
`;

export const InfoSquare = styled.div`
  ${setFlexbox("center", "center", "column")}
  width: 15rem;
  text-align: center;
  padding: 1rem;

  label {
    font-size: 1.6rem;
    font-weight: 700;
  }

  p {
    font-size: 1.6rem;
    font-weight: 400;
  }
`;
