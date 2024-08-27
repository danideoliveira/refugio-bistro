import styled from "styled-components";
import { setFlexbox } from "../../helpers/mixins";
import { palette } from "../../helpers/palette";

export const Container = styled.section`
  ${setFlexbox("center", "center", "column")}
  width: 95%;
  height: auto;
  background-color: #ffffff;
  padding: 4.5rem 0;
  margin: 0 auto;
  border-radius: 5px;
  margin-top: 3rem;
  margin-bottom: 3rem;

  .box-dashboard {
    min-width: 70rem;
    ${setFlexbox("center", "center", "column")}
    gap: 3rem;

    &.vertical {
      flex-direction: row;

      h1 {
        text-align: center;
      }
    }

    h1 {
      font-size: 3rem;
      width: 100%;
      color: ${palette.form_title_color};
    }
  }

  .box-dashboard-info {
    ${setFlexbox("center", "center", "column")}
    gap: 4rem;
    width: 100%;

    &.vertical {
      width: auto;
    }
  }

  .box-graphs {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    gap: 2rem;
    grid-auto-flow: row;
    grid-template-areas:
      "location location"
      "place status";

    .location {
      grid-area: location;
    }

    .status {
      grid-area: status;
    }

    .place {
      grid-area: place;
    }

    .graph-bar,
    .graph-pie,
    .graph-horizontal-bar {
      ${setFlexbox("center", "center", "row")}
      box-shadow: 0px 2px 5px 2px #dfdfdf;
      border-radius: 5px;
      padding: 0.5rem;
    }

    .graph-bar {
      canvas {
        margin: 0 auto;
        width: 380px;
      }
    }

    .graph-pie {
      canvas {
        margin: 0 auto;
        width: 240px;
      }
    }

    .graph-horizontal-bar {
      canvas {
        margin: 0 auto;
        width: 500px;
      }
    }
  }

  .box-selects {
    ${setFlexbox("center", "center", "row")}
    gap: 2rem;

    &.vertical {
      flex-direction: column;
    }
  }

  .box-select-list {
    ${setFlexbox("center", "flex-start", "column")}

    &.vertical {
      width: 100%;
    }

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

    &.vertical {
      ${setFlexbox("center", "center", "column")}
      gap: 4rem;

      .box-select-list,
      select {
        width: 100%;
      }
    }

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
    .box-dashboard {
      min-width: 0;

      &.vertical {
        flex-direction: column;
      }
    }

    .box-dashboard h1 {
      width: 90%;
      text-align: center;
    }

    .box-graphs {
      ${setFlexbox("center", "center", "column")}
      gap: 5rem;

      .graph-bar {
        canvas {
          margin: 0 auto;
          width: 400px;
        }
      }

      .graph-pie {
        canvas {
          margin: 0 auto;
          width: 300px;
        }
      }
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

  @media screen and (max-width: 500px) {
    .box-graphs {
      flex-direction: column;
      gap: 5rem;

      .graph-bar {
        canvas {
          width: 250px;
        }
      }

      .graph-pie {
        canvas {
          width: 200px;
        }
      }

      .graph-horizontal-bar {
        canvas {
          width: 300px;
        }
      }
    }
  }
`;
