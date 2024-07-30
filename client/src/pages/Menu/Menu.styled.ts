import styled from "styled-components";
import { setFlexbox } from "../../helpers/mixins";
import { palette } from "../../helpers/palette";

export const Container = styled.section`
  ${setFlexbox("center", "center", "row")}
  width: 100%;
  height: 50rem;
  padding: 7rem 0;
  background-color: ${palette.menu_background};

  .box {
    ${setFlexbox("space-evenly", "center", "row")}
    width: 100%;
    max-width: 1280px;
  }
`;

export const Content = styled.article`
  width: 30%;
`;

export const Title = styled.h2`
  font-size: 5rem;
  color: ${palette.menu_title_color};

  & + p {
    font-size: 1.6rem;
    color: ${palette.menu_text_color};
    text-align: justify;
  }
`;
