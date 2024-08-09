import { useContext } from "react";
import { images } from "../Images/Images";
import { Container, StyledHashLink, StyledLink } from "./Header.styled";
import { AuthContext } from "../../contexts/auth";
import { FaUserCircle } from "react-icons/fa";

function Header() {
  const { user } = useContext<any>(AuthContext);

  return (
    <>
      <Container>
        <div className="header-box">
          <div className="header-logo">
            <img src={images.logo} alt="logo" className="logo" />
            {user && <span>Olá, {user.name.split(" ")[0]}!</span>}
          </div>

          <nav>
            <StyledLink to="/">Início</StyledLink>
            <StyledHashLink smooth to="/#menu">
              Cardápio
            </StyledHashLink>
            {!user ? (
              <StyledLink to="/login" className="header-login">
                Login
              </StyledLink>
            ) : (
              <>
                <StyledLink to="/my-reservation">Minhas Reservas</StyledLink>
                <StyledLink className="header-profile-button" to="/profile">
                  <FaUserCircle />
                  Meu Perfil
                </StyledLink>
              </>
            )}
          </nav>
        </div>
      </Container>
    </>
  );
}

export default Header;
