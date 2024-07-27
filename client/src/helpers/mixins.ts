import { css } from "styled-components";

export const setFlexbox = (
  justifyContent: string,
  alignItems: string,
  flexDirection: string,
) => css`
  display: flex;
  justify-content: ${justifyContent};
  align-items: ${alignItems};
  flex-direction: ${flexDirection};
`;
