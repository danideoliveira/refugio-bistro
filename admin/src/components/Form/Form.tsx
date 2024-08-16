import { ReactNode } from "react";
import { Container } from "./Form.styled";
import { SubmitHandler } from "react-hook-form";

interface IForm {
  children: ReactNode;
  onSubmit?: SubmitHandler<any>;
  className: string;
}

function Form({ children, onSubmit, className }: IForm): JSX.Element {
  return (
    <>
      <Container onSubmit={onSubmit} className={className}>
        {children}
      </Container>
    </>
  );
}

export default Form;
