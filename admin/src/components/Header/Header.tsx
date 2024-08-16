import { useContext, useState } from "react";
import { images } from "../Images/Images";
import { Container, StyledButton } from "./Header.styled";
import { IoMenu } from "react-icons/io5";
import { AdminContext } from "../../contexts/authAdmin";

function Header(): JSX.Element {
  const { setCurrentList, logout } = useContext<any>(AdminContext);
  const [openMobileMenu, setOpenMobileMenu] = useState<boolean>(false);
  const [buttonSelected, setButtonSelected] =
    useState<string>("Todas as reservas");

  function handleSelectButton(navButton: INav): void {
    setCurrentList(navButton.list);
    setButtonSelected(navButton.content);
    setOpenMobileMenu(!openMobileMenu);
  }

  interface INav {
    list: string;
    content: string;
  }

  const navButtons: Array<INav> = [
    { list: "all", content: "Todas as reservas" },
    { list: "open", content: "Em aberto" },
    { list: "used", content: "Utilizadas" },
    { list: "expired", content: "Expiradas" },
  ];

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
            <button className="button-logout" onClick={logout}>
              Sair
            </button>
          </div>

          <nav>
            {navButtons.map((navButton) => (
              <StyledButton
                key={navButton.list}
                onClick={() => handleSelectButton(navButton)}
                className={buttonSelected === navButton.content ? "active" : ""}
              >
                {navButton.content}
              </StyledButton>
            ))}
          </nav>
        </div>
      </Container>
    </>
  );
}

export default Header;
