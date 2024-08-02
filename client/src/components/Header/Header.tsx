import { useContext } from "react";
import { images } from "../Images/Images";
import { Container, StyledLink } from "./Header.styled";
import { AuthContext } from "../../contexts/auth";

function Header() {
  const { user, logout } = useContext<any>(AuthContext);

  return (
    <>
      <Container>
        <div className="header-box">
          <div className="header-logo">
            <img src={images.logo} alt="logo" className="logo" />
            {user && <span>Olá, {user.name}!</span>}
          </div>

          <nav>
            <StyledLink to="/">Início</StyledLink>
            <StyledLink to="#cardapio">Cardápio</StyledLink>
            {!user ? (
              <StyledLink to="/login" className="header-login">
                Login
              </StyledLink>
            ) : (
              <button className="header-logout" onClick={logout}>
                Sair
              </button>
            )}
          </nav>
        </div>
      </Container>
    </>
  );
}

export default Header;
