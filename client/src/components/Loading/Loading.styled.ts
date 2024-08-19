import styled from "styled-components";
import { setFlexbox } from "../../helpers/mixins";

export const Container = styled.div`
  ${setFlexbox("center", "center", "row")}
  width: 100%;
  height: 100vh;
  background-color: #0e0e0e;
  color: #ffffff;
  gap: 2rem;
  font-size: 2rem;

  svg {
    font-size: 3rem;
  }
`;
