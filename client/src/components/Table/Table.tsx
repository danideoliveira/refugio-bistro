import { ReactNode } from "react";
import { Container } from "./Table.styled";

interface ComponentProps {
  children: ReactNode;
}

function Table({ children }: ComponentProps): JSX.Element {
  return <Container>{children}</Container>;
}

export default Table;
