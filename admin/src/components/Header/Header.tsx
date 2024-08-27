import { useContext, useState } from "react";
import { images } from "../Images/Images";
import { Container, StyledButton } from "./Header.styled";
import { IoMenu } from "react-icons/io5";
import { AdminContext } from "../../contexts/authAdmin";

function Header(): JSX.Element {
  const { setCurrentPage, logout } = useContext<any>(AdminContext);
  const [openMobileMenu, setOpenMobileMenu] = useState<boolean>(false);
  const [buttonSelected, setButtonSelected] = useState<string>("Planilha");

  function handleSelectButton(navButton: INav): void {
    setCurrentPage(navButton.page);
    setButtonSelected(navButton.content);
    setOpenMobileMenu(!openMobileMenu);
  }

  interface INav {
    page: string;
    content: string;
  }

  const navButtons: Array<INav> = [
    { page: "table", content: "Planilha" },
    { page: "graph", content: "Gráficos" },
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
                key={navButton.page}
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
