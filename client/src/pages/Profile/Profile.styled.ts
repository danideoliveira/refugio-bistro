import styled from "styled-components";
import { images } from "../../components/Images/Images";
import { setFlexbox } from "../../helpers/mixins";
import { palette } from "../../helpers/palette";

export const Container = styled.section`
  ${setFlexbox("center", "center", "column")}
  width: 100%;
  height: 100vh;
  background-color: aliceblue;
  background-image: ${`url(${images.profileBackground})`};
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  position: relative;
  gap: 2rem;

  .box-profile {
    ${setFlexbox("center", "center", "column")}
    padding: 5rem;
    width: 90%;
    max-width: 50rem;
    border-radius: 5px;
    background-color: ${palette.form_background};
    position: relative;
  }

  .box-inputs {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem 3rem;
  }

  .input-square {
    max-width: 21rem;
  }

  .profile-configuration {
    ${setFlexbox("center", "center", "row")}
    gap: 1rem;
    position: absolute;
    margin: 1rem;
    height: 3rem;
    left: 0;
    top: 0;
    transition: 0.3s all ease;

    .delete-account {
      border: none;
      border-radius: 5px;
      background-color: darkred;
      color: ${palette.profile_background};
      font-weight: 500;
    }

    .configuration-icon {
      ${setFlexbox("center", "center", "row")}
      padding: 0.5rem;
      cursor: pointer;
      border: none;
      border-radius: 50%;
      background-color: transparent;
    }

    svg {
      font-size: 2.5rem;
    }

    button {
      padding: 0.5rem 1rem;
      transition: 0.3s all ease;
      cursor: pointer;
    }
  }

  .box-buttons {
    ${setFlexbox("center", "center", "row")}
    gap: 2rem;

    .edit-button {
      ${setFlexbox("center", "center", "row")}
      gap: 1rem;
      padding: 0.5rem 2rem;
      width: 12rem;
      height: 3rem;
      border: 2px solid ${palette.profile_button_background};
      border-radius: 5px;
      font-size: 1.6rem;
      background-color: ${palette.profile_button_color};
      color: ${palette.profile_button_background};
      font-weight: 600;
      transition: 0.3s all ease;
      cursor: pointer;

      &:hover {
        background-color: ${palette.profile_button_background};
        color: ${palette.profile_button_color};
      }
    }
  }

  .logout-button {
    padding: 0.5rem 1rem;
    font-size: 1.6rem;
    text-decoration: none;
    transition: 0.3s all ease;
    font-weight: 500;
    border-radius: 5px;
    background: darkred;
    color: ${palette.header_link_color};
    border: none;
    cursor: pointer;

    &:hover {
      filter: brightness(0.8);
    }
  }

  .form-profile,
  .form-profile-update {
    padding: 0;
    max-width: 60rem;
  }

  .modal-delete-account {
    .modal-box {
      max-width: 30rem;
    }

    .input-square {
      width: 21rem;
    }

    form {
      gap: 2rem;
      padding: 0;
      margin-top: 3rem;
    }

    form button {
      width: 15rem;
      margin-top: 0;
    }
  }

  .modal-password {
    .modal-box {
      max-width: 30rem;
    }

    .input-square {
      width: 21rem;
    }

    form {
      gap: 2rem;
      padding: 0;
      margin-top: 3rem;
    }
  }

  @media screen and (max-width: 780px) {
    height: auto;
    padding: 2rem 0;

    .form-profile .box-inputs {
      display: flex;
      flex-direction: column;
    }
  }
`;
