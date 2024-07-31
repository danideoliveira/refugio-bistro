import styled from "styled-components";
import { setFlexbox } from "../../helpers/mixins";
import { palette } from "../../helpers/palette";
import { Link } from "react-router-dom";

export const Container = styled.form`
  ${setFlexbox("space-evenly", "center", "column")}
  width: 100%;
  padding: 5rem 0;
  gap: 5rem;
  max-width: 40rem;
  background-color: ${palette.form_background};
  border-radius: 5px;

  .box-inputs {
    ${setFlexbox("center", "center", "column")}
    gap: 0.5rem;
  }

  .input-square {
    ${setFlexbox("center", "flex-start", "column")}
    width: 21rem;
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
    font-size: 1.4rem;
    font-weight: 600;
    color: ${palette.form_text_color};
  }

  input {
    width: 100%;
    font-size: 1.5rem;
    padding: 0.7rem 1rem;
    border: none;
    border-radius: 5px;
    box-shadow: 0px 2px 5px 0px rgb(0, 0, 0, 0.25);

    & + span {
      margin: 0.5rem 0;
      font-size: 1.2rem;
      color: ${palette.form_error};
      font-weight: 500;
    }
  }

  button {
    padding: 0.5rem 2rem;
    border: none;
    border-radius: 5px;
    font-size: 1.6rem;
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
  font-size: 1.1rem;
  font-weight: 500;
  color: ${palette.form_text_color};
  text-decoration: none;
`;
