import styled from "styled-components";
import { images } from "../../components/Images/Images";
import { setFlexbox } from "../../helpers/mixins";

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

  .form-register {
    max-width: 50rem;
    padding: 3rem 0;
    gap: 3rem;
  }

  @media screen and (max-width: 780px) {
    height: auto;
    padding: 2rem 0;

    .form-register {
      max-width: 30rem;
    }
    .form-register .box-inputs {
      ${setFlexbox("center", "center", "column")}
    }
  }
`;
