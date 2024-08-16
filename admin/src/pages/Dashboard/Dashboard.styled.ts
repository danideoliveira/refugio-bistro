import styled from "styled-components";
import { setFlexbox } from "../../helpers/mixins";
import { palette } from "../../helpers/palette";

export const Container = styled.section`
  ${setFlexbox("center", "center", "column")}
  width: 100%;
  height: auto;
  background-color: #ffffff;
  padding: 5rem 0;

  .box-dashboard {
    h1 {
      font-size: 3rem;
      width: 100%;
      color: ${palette.form_title_color};
    }

    ${setFlexbox("center", "center", "column")}
    gap: 3rem;
  }

  .box-selects {
    ${setFlexbox("center", "center", "row")}
    gap: 2rem;
  }

  .box-select-list {
    ${setFlexbox("center", "flex-start", "column")}

    label {
      font-weight: 600;
      font-size: 1.6rem;
      color: #0e0e0e;
    }

    select,
    option {
      font-size: 1.5rem;
    }
  }

  .dashboard-info {
    ${setFlexbox("space-between", "flex-end", "row")}
    width: 100%;
    gap: 9rem;

    span {
      font-size: 1.8rem;
      font-weight: 600;
    }

    select {
      padding: 0.5rem 1rem;
    }
  }

  .no-reservations {
    ${setFlexbox("center", "center", "row")}
    width: 100%;
    height: 30rem;
    font-size: 2rem;
    font-weight: 600;
  }

  .modal-dashboard {
    .modal-box {
      ${setFlexbox("center", "center", "column")}
      width: 30rem;
      gap: 3rem;
    }

    .modal-button {
      width: 100%;
      ${setFlexbox("center", "center", "row")}
      height: 3rem;
      border: none;
      color: ${palette.form_button_background};
      font-weight: 600;
      transition: 0.3s all ease;
      cursor: pointer;
      width: auto;
      border-radius: 5px;
      font-size: 1.5rem;
      padding: 1rem 1rem;
      background-color: transparent;
      border: 2px solid ${palette.form_button_background};

      &:hover {
        background-color: ${palette.form_button_background};
        color: #efefef;
      }
    }
  }

  @media screen and (max-width: 910px) {
    .box-dashboard h1 {
      width: 90%;
      text-align: center;
    }
    .dashboard-info {
      ${setFlexbox("center", "center", "column")}
      width: 90%;
      gap: 3rem;
    }
  }
`;

export const Table = styled.table`
  border: none;
  margin: 0;
  padding: 0;
  table-layout: fixed;
  border-collapse: collapse;
  z-index: 99;

  & .action-row button {
    ${setFlexbox("center", "center", "row")}
    font-size: 1.3rem;
    gap: 0.5rem;
    background-color: #efefef;
    color: ${palette.form_button_background};
    border-radius: 5px;

    svg {
      font-size: 1.5rem;
    }
  }

  & thead tr {
    background-color: #0e0e0e;
    color: #ffffff;
  }

  & tbody td {
    padding: 0.2rem 0.5rem;
    border: 1px solid;
  }

  & caption {
    font-size: 1.5rem;
    margin: 0.5rem 0 0.75rem;
  }

  & tr {
    background-color: #f1f1f1;
    border: 1px solid black;
    padding: 0.35rem;
    font-size: 1.4rem;
  }

  & th {
    padding: 1rem 1rem;
    text-align: center;
    font-size: 1.4rem;
    text-transform: uppercase;
    border: 1px solid black;
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
    color: ${palette.form_button_color};
    font-weight: 600;
    transition: 0.3s all ease;
    cursor: pointer;
    width: auto;
    font-size: 1.5rem;
    padding: 1rem 1rem;

    &:hover {
      background-color: ${palette.form_button_background};
      color: #efefef;
    }
  }

  @media screen and (max-width: 910px) {
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
