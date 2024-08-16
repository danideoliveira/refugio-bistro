import styled from "styled-components";
import { setFlexbox } from "../../helpers/mixins";
import { palette } from "../../helpers/palette";

export const Container = styled.header`
  ${setFlexbox("space-around", "center", "row")}
  height: auto;
  padding: 1rem;
  width: 100%;
  background: ${palette.header_background};

  .header-box {
    ${setFlexbox("space-between", "center", "row")}
    width: 90%;

    .burguer {
      color: #fff;
      font-size: 3.5rem;
      margin: 2rem;
      cursor: pointer;
      display: none;
      position: fixed;
      right: 0;
      top: 0;
      background-color: #0e0e0e80;
      border-radius: 5px;
    }
  }

  .header-logo {
    ${setFlexbox("center", "center", "row")}
    gap: 1rem;

    .button-logout {
      font-size: 1.5rem;
      padding: 0 1rem;
      cursor: pointer;
      background-color: #f00;
      border: none;
      border-radius: 5px;
      color: #fff;
      font-weight: 500;
    }

    span {
      color: #fff;
      font-size: 1.6rem;
    }
  }

  img {
    width: 5rem;
    border-radius: 50%;
  }

  nav {
    ${setFlexbox("center", "center", "row")}
    gap: 2rem;
    width: 80%;
  }

  @media screen and (max-width: 780px) {
    ${setFlexbox("flex-start", "center", "column")}
    padding-top: 0rem;
    height: 100vh;
    width: 50%;
    position: fixed;
    z-index: 999;
    transition: 0.5s all ease-in-out;

    .header-logo {
      width: 100%;
      flex-direction: column;
    }

    .button-logout {
      width: 7rem;
    }

    .header-box {
      ${setFlexbox("center", "flex-start", "column")}
      gap: 5rem;
      height: auto;
      width: 100%;
      margin-top: 7rem;

      .burguer {
        display: block;
      }
    }

    nav {
      ${setFlexbox("center", "center", "column")}
      gap: 0;
      width: 100%;
    }

    button {
      width: 100%;
      text-align: center;
      border-radius: 0;
      font-size: 2rem;
      padding: 2rem 3rem;
    }
  }

  @media screen and (max-width: 480px) {
    width: 100%;
  }
`;

export const StyledButton = styled.button`
  width: 100%;
  padding: 0.5rem 1rem;
  font-size: 1.7rem;
  text-decoration: none;
  transition: 0.3s all ease;
  background-color: #0e0e0e;
  color: #ffffff;
  font-weight: 500;
  border-radius: 5px;
  cursor: pointer;
  border: none;

  &.header-profile-button {
    ${setFlexbox("center", "center", "row")}
    gap: 0.5rem;
    background: ${palette.header_link_color};
    color: ${palette.header_link_background};
  }

  &.header-login {
    background: ${palette.header_link_color};
    color: ${palette.header_link_background};
  }

  &:hover {
    background: ${palette.header_link_color};
    color: ${palette.header_link_background};
  }

  &.active {
    background: ${palette.location_button_color};
    color: ${palette.location_button_background};
  }

  @media screen and (max-width: 780px) {
    &.header-login,
    &.header-profile-button {
      background: transparent;
      color: ${palette.header_link_color};

      &:hover {
        background-color: ${palette.header_link_color};
        color: #0e0e0e;
        svg {
          color: #0e0e0e;
        }
      }
    }
  }
`;
