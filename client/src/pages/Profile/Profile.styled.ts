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

  .profile-loading {
    ${setFlexbox("center", "center", "row")}
    gap: 2rem;
    font-size: 2rem;
    color: ${palette.profile_button_background};

    svg {
      font-size: 3rem;
    }
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
    right: 0;
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
`;

export const Reservations = styled.div`
  ${setFlexbox("space-evenly", "center", "column")}
  width: 100%;
  padding: 5rem 0;
  gap: 5rem;
  max-width: 60rem;
  background-color: ${palette.form_background};
  border-radius: 5px;

  h2 {
    color: ${palette.form_title_color};
    font-size: 2.6rem;
  }

  label {
    font-size: 1.4rem;
    font-weight: 600;
    color: ${palette.form_text_color};
  }
`;

export const Table = styled.table`
  border: none;
  margin: 0;
  padding: 0;
  table-layout: fixed;
  border-collapse: collapse;

  & caption {
    font-size: 1.5rem;
    margin: 0.5rem 0 0.75rem;
  }

  & tr {
    background-color: #f8f8f8;
    border: 1px solid #ddd;
    padding: 0.35rem;
  }

  & th,
  & td {
    padding: 0.6rem 1rem;
    text-align: center;
  }

  & th {
    font-size: 1.2rem;
    text-transform: uppercase;
  }

  & td .action {
    border: 0;
    padding: 5px;
    border-radius: 4px;
    display: inline-block;
    margin-right: 3px;
  }

  & td .action svg {
    vertical-align: middle;
  }

  & td .badge {
    padding: 3px;
    border-radius: 3px;
    color: #fff;
  }

  button {
    ${setFlexbox("center", "center", "row")}
    height: 3rem;
    border: none;
    border-radius: 5px;
    color: ${palette.form_button_color};
    font-weight: 600;
    transition: 0.3s all ease;
    cursor: pointer;
    width: auto;
    font-size: 1.5rem;
    padding: 1rem 1rem;
    background-color: darkred;

    &:hover {
      filter: contrast(1.5);
    }
  }

  @media screen and (max-width: 600px) {
    & caption {
      font-size: 1.3rem;
    }

    & thead {
      border: none;
      height: 1px;
      margin: -1px;
      overflow: hidden;
      padding: 0;
      position: absolute;
      width: 1px;
    }

    & tr {
      border-bottom: 3px solid #ddd;
      display: block;
      margin-bottom: 0.6rem;
    }

    & td {
      border-bottom: 1px solid #ddd;
      display: block;
      font-size: 1.4rem;
      text-align: right;
    }

    & td::before {
      content: attr(data-label);
      float: left;
      font-weight: bold;
      text-transform: uppercase;
    }
  }
`;
