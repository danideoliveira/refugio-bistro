import styled from "styled-components";
import { images } from "../../components/Images/Images";
import { setFlexbox } from "../../helpers/mixins";
import { palette } from "../../helpers/palette";
import { Link } from "react-router-dom";

export const Container = styled.section`
  ${setFlexbox("center", "center", "column")}
  width: 100%;
  height: 100vh;
  background-color: aliceblue;
  background-image: ${`url(${images.profileBackground})`};
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  position: relative;
  gap: 2rem;

  form {
    max-width: 60rem;
  }

  .box-inputs {
    ${setFlexbox("center", "center", "column")}
    gap: 3rem;
  }

  .box-buttons {
    ${setFlexbox("center", "center", "row")}
    gap: 2rem;
  }

  .logout-button {
    padding: 0.5rem 1rem;
    font-size: 1.6rem;
    text-decoration: none;
    transition: 0.3s all ease;
    font-weight: 500;
    border-radius: 5px;
    background: darkred;
    color: ${palette.header_link_color};
    border: none;
    cursor: pointer;

    &:hover {
      filter: brightness(0.8);
    }
  }

  .modal-my-reservation .modal-button-delete {
    font-size: 1.8rem;
  }

  @media screen and (max-width: 780px) {
    height: auto;
    min-height: 100vh;
    padding: 2rem 0;

    .modal-my-reservation .modal-box {
      width: 90%;
      max-width: 50rem;
      overflow-x: hidden;
      height: auto;
      max-height: 80%;
    }

    .modal-info {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      width: 100%;
    }

    .modal-info div {
      width: auto;
    }
  }
`;

export const StyledLink = styled(Link)`
  padding: 0.5rem 1rem;
  font-size: 1.8rem;
  text-decoration: none;
  transition: 0.3s all ease;
  border: 2px solid ${palette.reservation_button_background};
  color: ${palette.reservation_button_background};
  font-weight: 500;
  border-radius: 5px;
  transition: 0.3s all ease;

  &:hover {
    color: ${palette.reservation_button_color};
    background-color: ${palette.reservation_button_background};
  }
`;

export const Reservations = styled.div`
  ${setFlexbox("space-evenly", "center", "column")}
  width: 100%;
  padding: 5rem 0;
  gap: 5rem;
  max-width: 75rem;
  background-color: ${palette.form_background};
  border-radius: 5px;

  h2 {
    color: ${palette.form_title_color};
    font-size: 3rem;
  }

  label {
    font-size: 1.8rem;
    font-weight: 600;
    color: ${palette.form_text_color};
  }

  @media screen and (max-width: 780px) {
    width: 90%;
  }
`;
