import styled from "styled-components";
import { setFlexbox } from "../../helpers/mixins";

export const Container = styled.div`
  ${setFlexbox("center", "flex-start", "column")}
  z-index: 99;

  .date-picker {
    padding: 0.5rem 1rem;
    font-size: 1.5rem;
    box-shadow: 1px 1px 1px 1px #bbbbbb;
    border: none;
    border-radius: 5px;

    &:focus {
      outline: none;
    }

    &::placeholder {
      color: #000000;
    }
  }

  .react-datepicker {
    font-size: 1.5rem;
  }

  .react-datepicker__header:not(.react-datepicker__header--has-time-select) {
    width: 30rem;
  }

  .react-datepicker__day-names {
    ${setFlexbox("space-around", "center", "row")}
    padding: 0 1rem;
  }

  .react-datepicker__month {
    ${setFlexbox("center", "center", "column")}
  }

  h2.react-datepicker__current-month {
    font-size: 1.3rem;
  }

  .react-datepicker__week {
    ${setFlexbox("center", "center", "row")}
    gap: 2rem;
  }

  label {
    font-weight: 600;
    font-size: 1.6rem;
    color: #0e0e0e;
  }
`;
