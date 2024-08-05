import { Button, Container, Title } from "./Home.styled";

function Home() {
  return (
    <>
      <Container>
        <article className="home-box">
          <div className="home-content">
            <Title>Refúgio Bistrô</Title>

            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel
              voluptatum esse sed nihil debitis, suscipit dicta doloribus
              dolorum itaque sint facilis reprehenderit laboriosam officiis
              neque id! Veritatis facere possimus consequuntur!
            </p>
          </div>

          <Button to="/reservation">Faça sua reserva</Button>
        </article>
        <div className="gradient" />
      </Container>
    </>
  );
}

export default Home;
