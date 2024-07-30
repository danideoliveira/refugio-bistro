import { MouseEvent, useState } from "react";
import { Container, StyledSlider } from "./Carousel.styled";
import { images } from "../Images/Images";

interface IProduct {
  image: string;
  title: string;
  price: string;
}

interface ISettings {
  dots?: boolean;
  infinite?: boolean;
  speed?: number;
  slidesToShow?: number;
  slidesToScroll?: number;
  initialSlide?: number;
}

function Carousel() {
  const settings: ISettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
  };

  const [selectedFood, setSelectedFood] = useState<string>("meals");
  const [resetSlide, setResetSlide] = useState<ISettings>(settings);

  const handleButtonActive = (e: MouseEvent) => {
    const element = e.target as HTMLButtonElement;

    setResetSlide(settings);
    setSelectedFood(element.id);
    const carouselButtons: NodeListOf<HTMLElement> = document.querySelectorAll(
      ".carousel-buttons button",
    );

    carouselButtons.forEach((button) => {
      button.removeAttribute("class");
    });

    element.setAttribute("class", "active");
  };

  const products: any = {
    meals: [
      {
        image: images.meal3,
        title: "Refeição",
        price: "R$17,00",
      },
      {
        image: images.meal1,
        title: "Refeição",
        price: "R$12,00",
      },
      {
        image: images.meal2,
        title: "Refeição",
        price: "R$25,00",
      },
    ],

    snacks: [
      {
        image: images.snack1,
        title: "Hamburguer Tradicional + Batata Frita",
        price: "R$12,00",
      },
      {
        image: images.snack2,
        title: "Hamburguer Tradicional + Batata Frita",
        price: "R$25,00",
      },
      {
        image: images.snack3,
        title: "Hamburguer Tradicional + Batata Frita",
        price: "R$17,00",
      },
    ],

    desserts: [
      {
        image: images.dessert1,
        title: "Sobremesa",
        price: "R$12,00",
      },
      {
        image: images.dessert2,
        title: "Sobremesa",
        price: "R$25,00",
      },
      {
        image: images.dessert3,
        title: "Sobremesa",
        price: "R$17,00",
      },
    ],
  };

  return (
    <Container>
      <div className="carousel-buttons">
        <button id="meals" className="active" onClick={handleButtonActive}>
          Refeições
        </button>
        <button id="snacks" onClick={handleButtonActive}>
          Lanches
        </button>
        <button id="desserts" onClick={handleButtonActive}>
          Sobremesas
        </button>
      </div>

      {selectedFood && (
        <StyledSlider {...resetSlide}>
          {products[selectedFood].map((product: IProduct, index: number) => (
            <div className="carousel-card" key={index}>
              <div className="carousel-image">
                <img src={product.image} alt={`Slide ${index + 1}`} />
              </div>
              <h3>{product.title}</h3>
              <span>{product.price}</span>
            </div>
          ))}
        </StyledSlider>
      )}
    </Container>
  );
}

export default Carousel;
