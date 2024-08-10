import styled from "styled-components";
import { images } from "../../components/Images/Images";
import { setFlexbox } from "../../helpers/mixins";
import { palette } from "../../helpers/palette";

export const Container = styled.section`
  ${setFlexbox("center", "center", "row")}
  width: 100%;
  height: 100vh;
  background-color: aliceblue;
  background-image: ${`url(${images.loginBackground})`};
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  position: relative;

  .box-inputs {
    ${setFlexbox("center", "center", "column")}
  }

  .button-reset-password {
    font-size: 1.1rem;
    font-weight: 500;
    color: ${palette.form_text_color};
    text-decoration: none;
    cursor: pointer;
    text-decoration: underline;
  }

  .form-login {
    max-width: 30rem;
  }

  .modal-reset-password {
    .modal-box {
      max-width: 30rem;
    }

    form {
      gap: 2rem;
      padding: 3rem 0;
    }
  }
`;
