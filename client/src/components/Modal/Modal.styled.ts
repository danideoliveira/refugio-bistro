import styled from "styled-components";
import { palette } from "../../helpers/palette";
import { setFlexbox } from "../../helpers/mixins";

export const Container = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 99;

  h2 {
    color: ${palette.form_title_color};
    font-size: 2.6rem;
    text-align: center;
  }

  h2.small {
    font-size: 2rem;
  }

  & .button-box {
    ${setFlexbox("center", "center", "row")}
    width: 100%;
  }

  & .modal-info {
    display: flex;
    gap: 0;
    margin: 3rem 0;
  }

  & .modal-button-delete {
    ${setFlexbox("center", "center", "row")}
    font-size: 1.5rem;
    font-weight: 500;
    padding: 0.5rem 1rem;
    border-radius: 5px;
    gap: 1rem;
    color: #fff;
    border: none;
    background-color: darkred;
    cursor: pointer;
    margin-top: 3rem;

    svg {
      color: #fff;
    }
  }

  & .modal-box {
    position: fixed;
    max-width: 60rem;
    top: 15%;
    left: 0;
    right: 0;
    margin: 0 auto;
    padding: 4rem 2rem;
    background-color: #fff;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.8);
    border-radius: 5px;
  }

  .modal-close {
    background-color: transparent;
    border: 0;
    border-radius: 5px;
    position: absolute;
    top: 15px;
    left: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #000;
    font-size: 2rem;
    cursor: pointer;
  }

  .close svg {
    margin-right: 5px;
  }

  & h2 {
    margin: 2rem 0 1.2rem 0;
  }

  & span {
    font-weight: bold;
    font-size: 1.4rem;
  }

  & span i {
    font-weight: 400;
    margin-right: 1rem;
    padding: 2px 8px;
  }

  .row {
    margin-bottom: 1rem;
  }

  & p {
    padding-top: 0.5rem;
    white-space: pre-wrap;
    line-height: 150%;
  }

  .status-badge {
    margin-left: 1rem;
    border-radius: 2px;
  }
`;
