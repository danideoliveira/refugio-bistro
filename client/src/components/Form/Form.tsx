import { Container } from "./Form.styled";

function Form({ children, onSubmit }: any) {
  return (
    <>
      <Container onSubmit={onSubmit}>{children}</Container>
    </>
  );
}

export default Form;
