import styled from "styled-components";
import { setFlexbox } from "../../helpers/mixins";
import { Link } from "react-router-dom";
import { palette } from "../../helpers/palette";
import { HashLink } from "react-router-hash-link";

export const Container = styled.footer`
  ${setFlexbox("center", "center", "column")}
  width: 100%;
  padding: 3rem 0 1rem 0;
  background-color: ${palette.footer_background};
  gap: 2rem;

  .footer-box {
    ${setFlexbox("space-evenly", "center", "row")}
    width: 90%;
  }

  @media screen and (max-width: 780px) {
    .footer-box {
      flex-direction: column;
      gap: 1rem;
    }

    .footer-box div {
      width: 100%;
    }

    .footer-box nav {
      flex-direction: column;
    }
  }
`;

export const SocialMedia = styled.div`
  ${setFlexbox("center", "flex-start", "column")}
  gap: 1rem;
  width: 20%;

  span {
    font-size: 1.5rem;
    font-weight: 600;
    color: ${palette.footer_text_color};
  }

  .footer-media {
    ${setFlexbox("flex-start", "center", "row")}
    width: 100%;
    gap: 1rem;
  }

  svg {
    font-size: 2.5rem;
    color: ${palette.footer_text_color};
    cursor: pointer;
  }

  @media screen and (max-width: 780px) {
    align-items: center;

    .footer-media {
      justify-content: center;
    }
  }
`;

export const MenuFooter = styled.div`
  ${setFlexbox("center", "center", "column")}
  gap: 1rem;

  span {
    text-align: center;
    font-size: 1.6rem;
    font-weight: 600;
    color: ${palette.footer_title_color};
  }

  nav {
    ${setFlexbox("center", "center", "row")}
    gap: 3rem;
  }

  .footer-copy {
    margin-top: 2rem;
    text-decoration: none;
    font-size: 1.2rem;
    font-weight: 500;
    color: ${palette.footer_text_color};
  }

  @media screen and (max-width: 780px) {
    margin: 2rem 0;

    span {
      margin-bottom: 2rem;
    }
  }
`;

export const BoxLogo = styled.div`
  ${setFlexbox("center", "center", "row")}
  overflow: hidden;
  width: 20%;

  img {
    border-radius: 50%;
    width: 5rem;
  }

  @media screen and (max-width: 780px) {
    display: none;
  }
`;

export const StyledLink = styled(Link)`
  text-decoration: none;
  font-size: 1.4rem;
  font-weight: 500;
  color: ${palette.footer_text_color};
`;

export const StyledHashLink = styled(HashLink)`
  text-decoration: none;
  font-size: 1.4rem;
  font-weight: 500;
  color: ${palette.footer_text_color};
`;
