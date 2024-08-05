import styled from "styled-components";
import { setFlexbox } from "../../helpers/mixins";
import { palette } from "../../helpers/palette";

export const Container = styled.div`
  width: 20rem;
  position: relative;

  .res-select-box {
    border-radius: 5px;
    ${setFlexbox("flex-start", "center", "row")}
    width: 100%;
    padding: 1rem;
    gap: 2rem;
    cursor: pointer;
    box-shadow: 0px 2px 5px 0px rgb(0, 0, 0, 0.25);
    position: relative;
  }

  .res-arrow-icon {
    ${setFlexbox("center", "center", "row")}
    right: 0;
    padding: 1rem;
    position: absolute;
  }

  .res-item-info {
    ${setFlexbox("center", "flex-start", "column")}
    gap: 0.2rem;

    label {
      cursor: pointer;
      font-size: 1.4rem;
      font-weight: 700;
    }

    span {
      font-size: 1.4rem;
      font-weight: 500;
    }
  }

  svg {
    font-size: 2rem;
  }

  ul {
    width: 100%;
    position: absolute;
    bottom: -8rem;
    list-style: none;
    left: 0;
    box-shadow: 0px 2px 5px 0px rgb(0, 0, 0, 0.25);
    border-radius: 5px;
    height: 7.5rem;
    overflow-x: hidden;
    display: none;
    z-index: 99;
    background-color: ${palette.dropdown_background};

    li {
      padding: 1rem;
      cursor: pointer;
      transition: 0.3s all ease;
      width: 100%;
      font-size: 1.4rem;
      font-weight: 500;

      &:hover {
        background-color: #e0e0e0;
      }
    }
  }

  ul.active {
    display: flex;
  }
`;
