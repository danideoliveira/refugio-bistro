import Carousel from "../../components/Carousel/Carousel";
import { Container, Content, Title } from "./Menu.styled";

function Menu(): JSX.Element {
  return (
    <>
      <Container id="menu">
        <div className="box">
          <div className="menu-left">
            <Carousel />
          </div>
          <Content>
            <Title>Cardápio</Title>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel
              voluptatum esse sed nihil debitis, suscipit dicta doloribus
              dolorum itaque sint facilis reprehenderit laboriosam officiis
              neque id! Veritatis facere possimus consequuntur!
            </p>
          </Content>
        </div>
      </Container>
    </>
  );
}

export default Menu;
