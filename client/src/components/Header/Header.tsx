import { images } from "../Images/Images";
import { Container, StyledLink } from "./Header.styled";

function Header() {
  return (
    <>
      <Container>
        <div className="header-box">
          <img src={images.logo} alt="logo" className="logo" />

          <nav>
            <StyledLink to="/">Início</StyledLink>
            <StyledLink to="#cardapio">Cardápio</StyledLink>
            <StyledLink to="/login" className="header-login">
              Login
            </StyledLink>
          </nav>
        </div>
      </Container>
    </>
  );
}

export default Header;
