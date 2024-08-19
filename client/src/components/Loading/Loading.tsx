import { StyledLoading } from "../Form/Form.styled";
import { Container } from "./Loading.styled";

function Loading(): JSX.Element {
  return (
    <Container>
      <StyledLoading />
      Carregando...
    </Container>
  );
}

export default Loading;
