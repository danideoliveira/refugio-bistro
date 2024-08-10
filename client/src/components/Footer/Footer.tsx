import { FaFacebook, FaInstagram } from "react-icons/fa6";
import {
  BoxLogo,
  Container,
  MenuFooter,
  SocialMedia,
  StyledHashLink,
  StyledLink,
} from "./Footer.styled";
import { images } from "../Images/Images";

function Footer() {
  return (
    <Container>
      <div className="footer-box">
        <SocialMedia>
          <span>Siga-nos nas redes sociais</span>

          <div className="footer-media">
            <FaFacebook />
            <FaInstagram />
          </div>
        </SocialMedia>

        <MenuFooter>
          <span>Menu</span>
          <nav>
            <StyledLink to="/">Início</StyledLink>
            <StyledHashLink smooth to="/#menu">
              Cardápio
            </StyledHashLink>
            <StyledLink to="/my-reservation">Reservas</StyledLink>
            <StyledLink to="/profile">Perfil</StyledLink>
          </nav>
          <a href="#" className="footer-copy">
            Daniel de Oliveira Santos &copy; 2024
          </a>
        </MenuFooter>

        <BoxLogo>
          <img src={images.logo} alt="logo" />
        </BoxLogo>
      </div>
    </Container>
  );
}

export default Footer;
