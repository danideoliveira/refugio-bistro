import { FaLocationDot } from "react-icons/fa6";
import {
  Container,
  LeftContent,
  LocationContent,
  RightContent,
} from "./Location.styled";
import { useEffect, useRef, useState } from "react";
import { images } from "../../components/Images/Images";
import gsap from "gsap";

interface ILocation {
  image: string;
  name: string;
  address: string;
  url: string;
}

function Location() {
  const titleRef: any = useRef();
  const textRef: any = useRef();
  const imageRef: any = useRef();

  const [locationSelected, setLocationSelected] = useState<ILocation>({
    name: "Rio de Janeiro",
    image: images.location1,
    address: "Av. Lorem Ipsum lorem Ipsum, 560  Rio de Janeiro, RJ - 00009999",
    url: "",
  });

  const [selectedButton, setSelectedButton] =
    useState<string>("Rio de Janeiro");

  const locations: Array<ILocation> = [
    {
      name: "Rio de Janeiro",
      image: images.location1,
      address:
        "Av. Lorem Ipsum lorem Ipsum, 560  Rio de Janeiro, RJ - 00009999",
      url: "",
    },

    {
      name: "São Paulo",
      image: images.location2,
      address: "Av. Lorem Ipsum lorem Ipsum, 560  São Paulo, SP - 00009999",
      url: "",
    },

    {
      name: "Minas Gerais",
      image: images.location3,
      address:
        "Av. Lorem Ipsum lorem Ipsum, 560  Belo Horizonte, MG - 00009999",
      url: "",
    },
  ];

  const handleSelectLocation = (item: ILocation) => {
    setLocationSelected(item);
    setSelectedButton(item.name);
  };

  useEffect(() => {
    gsap.to([titleRef.current, textRef.current, imageRef.current], {
      duration: 2,
      opacity: 1,
      ease: "none",
    });
  }, [locationSelected]);

  useEffect(() => {
    gsap.from([titleRef.current, textRef.current, imageRef.current], {
      duration: 0.5,
      opacity: 0,
      ease: "none",
    });
  }, [locationSelected]);

  return (
    <>
      <Container>
        <div className="location-box">
          <LeftContent>
            <div className="select-location-box">
              <h2>Unidades</h2>

              <div className="button-list">
                {locations.map((currentLocation) => (
                  <button
                    key={currentLocation.name}
                    id={currentLocation.name}
                    onClick={(): void => handleSelectLocation(currentLocation)}
                    className={
                      selectedButton === currentLocation.name ? "active" : ""
                    }
                  >
                    <FaLocationDot />
                    <h3>{currentLocation.name}</h3>
                  </button>
                ))}
              </div>
            </div>
          </LeftContent>
          <RightContent>
            {locationSelected && (
              <div
                className="location-box"
                style={{
                  backgroundImage: `url(${locationSelected.image})`,
                }}
                ref={imageRef}
              >
                <LocationContent>
                  <h3 ref={titleRef}>{locationSelected.name}</h3>
                  <p ref={textRef}>{locationSelected.address}</p>
                  <a>Como chegar?</a>
                </LocationContent>
                <div className="location-gradient" />
              </div>
            )}
          </RightContent>
          <img
            className="location-background"
            src={images.logoLocation}
            alt="location logo"
          />
        </div>
      </Container>
    </>
  );
}

export default Location;
