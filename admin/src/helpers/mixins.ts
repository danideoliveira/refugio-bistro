import { css, RuleSet } from "styled-components";

export const setFlexbox = (
  justifyContent: string,
  alignItems: string,
  flexDirection: string,
): RuleSet<object> => css`
  display: flex;
  justify-content: ${justifyContent};
  align-items: ${alignItems};
  flex-direction: ${flexDirection};
`;
