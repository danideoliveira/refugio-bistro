import styled from "styled-components";
import { setFlexbox } from "../../helpers/mixins";
import { Link } from "react-router-dom";
import { palette } from "../../helpers/palette";

export const Container = styled.header`
  ${setFlexbox("space-around", "center", "row")}
  height: 5rem;
  background: ${palette.header_background};

  .header-box {
    ${setFlexbox("space-between", "center", "row")}
    width: 90%;
  }

  .header-logo {
    ${setFlexbox("center", "center", "row")}
    gap: 1rem;

    span {
      color: #fff;
      font-size: 1.4rem;
    }
  }

  .header-logout {
    padding: 0.5rem 1rem;
    font-size: 1.6rem;
    text-decoration: none;
    transition: 0.3s all ease;
    font-weight: 500;
    border-radius: 5px;
    background: red;
    color: ${palette.header_link_color};
    border: none;
    cursor: pointer;

    &:hover {
      filter: brightness(0.8);
    }
  }

  img {
    width: 5rem;
    border-radius: 50%;
  }

  nav {
    ${setFlexbox("center", "center", "row")}
    gap: 2rem;
  }
`;

export const StyledLink = styled(Link)`
  padding: 0.5rem 1rem;
  font-size: 1.6rem;
  text-decoration: none;
  transition: 0.3s all ease;
  color: ${palette.header_link_color};
  font-weight: 500;
  border-radius: 5px;

  &.header-login {
    background: ${palette.header_link_color};
    color: ${palette.header_link_background};
  }

  &:hover {
    background: ${palette.header_link_color};
    color: ${palette.header_link_background};
  }
`;
