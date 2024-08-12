import styled from "styled-components";
import { images } from "../../components/Images/Images";
import { setFlexbox } from "../../helpers/mixins";
import { palette } from "../../helpers/palette";
import { Link } from "react-router-dom";

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

  form {
    max-width: 60rem;
  }

  .box-inputs {
    ${setFlexbox("center", "center", "column")}
    gap: 3rem;
  }

  .box-buttons {
    ${setFlexbox("center", "center", "row")}
    gap: 2rem;
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

  @media screen and (max-width: 780px) {
    height: auto;
    min-height: 100vh;
    padding: 2rem 0;

    .modal-my-reservation .modal-box {
      width: 90%;
      max-width: 50rem;
      overflow-x: hidden;
      height: auto;
      max-height: 80%;
    }

    .modal-info {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      width: 100%;
    }

    .modal-info div {
      width: auto;
    }
  }
`;

export const StyledLink = styled(Link)`
  padding: 0.5rem 1rem;
  font-size: 1.5rem;
  text-decoration: none;
  transition: 0.3s all ease;
  background-color: ${palette.reservation_button_background};
  color: ${palette.reservation_button_color};
  font-weight: 500;
  border-radius: 5px;
`;

export const Reservations = styled.div`
  ${setFlexbox("space-evenly", "center", "column")}
  width: 100%;
  padding: 5rem 0;
  gap: 5rem;
  max-width: 65rem;
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

  @media screen and (max-width: 780px) {
    width: 90%;
  }
`;

export const Table = styled.table`
  border: none;
  margin: 0;
  padding: 0;
  table-layout: fixed;
  border-collapse: collapse;

  & .action-row button {
    ${setFlexbox("center", "center", "row")}
    font-size: 1.3rem;
    gap: 0.5rem;

    svg {
      font-size: 2rem;
    }
  }

  & thead tr {
    border-radius: 50%;
    color: ${palette.reservation_background};
    background-color: ${palette.reservation_title_color};
  }

  & tbody td {
    padding: 2rem 1rem;
  }

  & caption {
    font-size: 1.5rem;
    margin: 0.5rem 0 0.75rem;
  }

  & tr {
    background-color: #f1f1f1;
    border: 3px solid #fff;
    padding: 0.35rem;
    font-size: 1.4rem;
  }

  & th {
    padding: 1rem 1rem;
    text-align: center;
    font-size: 1.4rem;
    text-transform: uppercase;
  }

  & td {
    text-align: center;
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

  @media screen and (max-width: 780px) {
    width: 90%;

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
      border: 3px solid #ddd;
      border-radius: 5px;
      display: block;
      margin-bottom: 2rem;
      background-color: #efefef;
    }

    & td {
      border-bottom: 1px solid #ddd;
      display: block;
      font-size: 1.6rem;
      text-align: right;
    }

    & td::before {
      content: attr(data-label);
      float: left;
      font-weight: bold;
      text-transform: uppercase;
    }

    .action-row {
      ${setFlexbox("center", "center", "row")}
      width: 100%;
      border-bottom: none;

      button {
        font-size: 1.6rem;
      }
    }
  }
`;
