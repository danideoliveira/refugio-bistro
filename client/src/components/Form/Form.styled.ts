import styled, { keyframes } from "styled-components";
import { setFlexbox } from "../../helpers/mixins";
import { palette } from "../../helpers/palette";
import { Link } from "react-router-dom";
import { AiOutlineLoading } from "react-icons/ai";

export const Container = styled.form`
  ${setFlexbox("space-evenly", "center", "column")}
  width: 100%;
  padding: 5rem 0;
  gap: 5rem;
  max-width: 60rem;
  background-color: ${palette.form_background};
  border-radius: 5px;

  .box-inputs {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem 3rem;

    .full {
      grid-area: 1 / 1 / 2 / 3;
      width: auto;
      max-width: none;
    }
  }

  .box-inputs-flex {
    ${setFlexbox("center", "center", "column")}
    gap: 0;
  }

  .input-square {
    ${setFlexbox("center", "flex-start", "column")}
    width: 100%;
    max-width: 21rem;
    gap: 0.5rem;
  }

  .submit-square {
    ${setFlexbox("center", "center", "column")}
    gap: 1.5rem;
  }

  h2 {
    color: ${palette.form_title_color};
    font-size: 2.6rem;
  }

  label {
    font-size: 1.6rem;
    font-weight: 600;
    color: ${palette.form_text_color};
  }

  input {
    width: 100%;
    font-size: 1.6rem;
    padding: 0.7rem 1rem;
    border: 1px solid #e3e3e3;
    border-radius: 5px;

    &:focus {
      outline: none;
    }

    & + span {
      margin: 0.5rem 0;
      font-size: 1.2rem;
      color: ${palette.form_error};
      font-weight: 500;
    }
  }

  input[type="number"]::-webkit-inner-spin-button,
  input[type="number"]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  input[type="number"] {
    appearance: textfield;
    -moz-appearance: textfield;
  }

  button {
    ${setFlexbox("center", "center", "row")}
    padding: 1rem 2rem;
    height: 3rem;
    width: 10rem;
    border: none;
    border-radius: 5px;
    font-size: 1.8rem;
    background-color: ${palette.form_button_background};
    color: ${palette.form_button_color};
    font-weight: 600;
    transition: 0.3s all ease;
    cursor: pointer;

    &:hover {
      filter: contrast(1.5);
    }
  }
`;

export const StyledLink = styled(Link)`
  font-size: 1.3rem;
  font-weight: 500;
  color: ${palette.form_text_color};
  text-decoration: none;
`;

const animate = keyframes`
  0% {
    rotate: 0deg;
  }

  100% {
    rotate: 360deg;
  }
`;

export const StyledLoading = styled(AiOutlineLoading)`
  animation: ${animate} 0.7s infinite;
`;
