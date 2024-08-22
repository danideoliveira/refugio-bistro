import styled from "styled-components";
import { setFlexbox } from "../../helpers/mixins";
import { palette } from "../../helpers/palette";

export const Container = styled.section`
  ${setFlexbox("center", "center", "column")}
  width: 95%;
  height: auto;
  background-color: #ffffff;
  padding: 5rem 0;
  margin: 0 auto;
  border-radius: 5px;
  margin-top: 3rem;
  margin-bottom: 3rem;

  .box-dashboard {
    min-width: 70rem;

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

    select {
      box-shadow: 1px 1px 1px 1px #bbbbbb;
      border: none;
      border-radius: 5px;

      &:focus {
        outline: none;
      }
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
    height: 20rem;
    font-size: 2rem;
    font-weight: 600;
  }

  .modal-dashboard {
    .modal-box {
      ${setFlexbox("center", "center", "column")}
      width: 30rem;
      gap: 3rem;
    }

    h3 {
      font-size: 1.5rem;
      margin-bottom: 1rem;
    }

    span {
      color: ${palette.form_text_color};
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

    .box-selects {
      flex-direction: column;
    }

    .box-select-list,
    select {
      width: 100%;
    }
  }
`;
