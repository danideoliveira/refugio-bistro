import { useContext, useState } from "react";
import { images } from "../Images/Images";
import { Container, StyledHashLink, StyledLink } from "./Header.styled";
import { AuthContext } from "../../contexts/auth";
import { FaUserCircle } from "react-icons/fa";
import { IoMenu } from "react-icons/io5";

function Header(): JSX.Element {
  const { user } = useContext<any>(AuthContext);
  const [openMobileMenu, setOpenMobileMenu] = useState<boolean>(false);

  function handleOpenModal() {
    setOpenMobileMenu(!openMobileMenu);
  }

  return (
    <>
      <Container style={{ right: openMobileMenu ? "0%" : "-100%" }}>
        <div className="header-box">
          <IoMenu
            className="burguer"
            onClick={() => setOpenMobileMenu(!openMobileMenu)}
          />
          <div className="header-logo">
            <img src={images.logo} alt="logo" className="logo" />
            {user?.name && <span>Olá, {user.name.split(" ")[0]}!</span>}
          </div>

          <nav>
            <StyledLink to="/" onClick={handleOpenModal}>
              Início
            </StyledLink>
            <StyledHashLink smooth to="/#menu" onClick={handleOpenModal}>
              Cardápio
            </StyledHashLink>
            {!user ? (
              <StyledLink
                to="/login"
                className="header-login"
                onClick={handleOpenModal}
              >
                Login
              </StyledLink>
            ) : (
              <>
                <StyledLink to="/my-reservation" onClick={handleOpenModal}>
                  Minhas Reservas
                </StyledLink>
                <StyledLink
                  className="header-profile-button"
                  to="/profile"
                  onClick={handleOpenModal}
                >
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
