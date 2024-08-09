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

  .box-inputs {
    ${setFlexbox("center", "center", "column")}
  }
`;
