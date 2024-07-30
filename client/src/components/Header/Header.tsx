import { Container, StyledLink } from "./Header.styled";

function Header() {
  return (
    <>
      <Container>
        <div className="header-box">
          <img src="" alt="logo" className="logo" />

          <nav>
            <StyledLink to="/">Início</StyledLink>
            <StyledLink to="#cardapio">Cardápio</StyledLink>
            <StyledLink to="/" className="header-login">
              Login
            </StyledLink>
          </nav>
        </div>
      </Container>
    </>
  );
}

export default Header;
