import { useEffect, useMemo, useState } from "react";
import { images } from "../../components/Images/Images";
import { FaClock, FaLocationDot } from "react-icons/fa6";
import Dropdown from "../../components/Dropdown/Dropdown";
import { FaCalendarAlt, FaUserFriends } from "react-icons/fa";
import { MdTableRestaurant } from "react-icons/md";
import { InfoSquare, LocationList, ReviewGrid } from "./Reservation.styled";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../services/firebaseConnection";
import { StyledLoading } from "../../components/Form/Form.styled";

interface ILocation {
  image: string;
  name: string;
  address: string;
  url: string;
}

const locations: Array<ILocation> = [
  {
    name: "Rio de Janeiro",
    image: images.location1,
    address: "Av. Lorem Ipsum, Rio de Janeiro, RJ",
    url: "",
  },

  {
    name: "São Paulo",
    image: images.location2,
    address: "Av. Lorem Ipsum, São Paulo, SP",
    url: "",
  },

  {
    name: "Minas Gerais",
    image: images.location3,
    address: "Av. Lorem Ipsum, Belo Horizonte, MG",
    url: "",
  },
];

export const LocationInfo = (props: any): JSX.Element => {
  const defaultValue = props.chosenLocation[0];
  const setLocation = props.chosenLocation[1];
  const [selectedButton, setSelectedButton] = useState<string>(defaultValue);

  const handleSelectLocation = (item: ILocation): void => {
    setSelectedButton(item.name);
    setLocation(item.name);
  };

  return (
    <>
      <LocationList className="button-list">
        {locations.map((currentLocation: ILocation) => (
          <button
            key={currentLocation.name}
            id={currentLocation.name}
            onClick={(): void => handleSelectLocation(currentLocation)}
            className={selectedButton === currentLocation.name ? "active" : ""}
          >
            <FaLocationDot />
            <h3>{currentLocation.name}</h3>
          </button>
        ))}
      </LocationList>
    </>
  );
};

export const GeneralInfo = (props: any): JSX.Element => {
  const today: Date = new Date();
  today.setDate(today.getDate());
  const arrDate: Array<string> = useMemo(() => [], []);
  const itemsVerified: Array<string> = useMemo(() => [], []);
  const [defaultVerified, setDefaultVerified] = useState<any>([]);

  for (let i = 0; i < 5; i++) {
    today.setDate(today.getDate() + 1);
    arrDate.push(today.toLocaleDateString());
  }

  useEffect(() => {
    async function getEsgoted() {
      const postsRef = collection(db, "users");

      await getDocs(postsRef).then(async (snapshot) => {
        const list: Array<any> = [];

        snapshot.forEach((doc) => {
          if (doc.data().reservations.length > 0) {
            doc.data().reservations.forEach((value: any) => {
              list.push(value.date);
            });
          }
        });

        arrDate.forEach((item) => {
          const filteredList: Array<any> = list.filter(
            (value) => value === item,
          );

          if (filteredList.length > 10) {
            itemsVerified.push(`${item} (ESGOTADO)`);
          } else {
            itemsVerified.push(item);
            setDefaultVerified((prev: any) => [...prev, item]);
          }
        });
      });
    }

    getEsgoted();
  }, [itemsVerified, arrDate]);

  useEffect(() => {
    if (defaultVerified[0] && defaultVerified[0].includes("/")) {
      setDefaultVerified(defaultVerified[0]);
      props.chosenDate[1](defaultVerified[0]);
    }
  }, [defaultVerified, props.chosenDate]);

  return (
    <>
      {defaultVerified[0] ? (
        <div className="res-drop-list">
          <Dropdown
            title="Dia da Reserva"
            icon={FaCalendarAlt}
            items={itemsVerified}
            defaultValue={defaultVerified[0]}
            action={props.chosenDate[1]}
          />
          <Dropdown
            title="Horário"
            icon={FaClock}
            items={["18:00", "19:00", "20:00", "21:00", "22:00"]}
            defaultValue={props.chosenHour[0]}
            action={props.chosenHour[1]}
          />
          <Dropdown
            title="Pessoas"
            icon={FaUserFriends}
            items={["2", "4", "6", "8", "10"]}
            defaultValue={props.chosenPeople[0]}
            action={props.chosenPeople[1]}
          />
          <Dropdown
            title="Ambiente"
            icon={MdTableRestaurant}
            items={["Térreo", "Superior"]}
            defaultValue={props.chosenPlace[0]}
            action={props.chosenPlace[1]}
          />
        </div>
      ) : (
        <StyledLoading />
      )}
    </>
  );
};

export const ReviewInfo = (props: any): JSX.Element => {
  const { location, date, hour, people, place } = props.reservationInfo;

  return (
    <>
      <ReviewGrid>
        <InfoSquare>
          <label>Unidade</label>
          <p>{location}</p>
        </InfoSquare>

        <InfoSquare>
          <label>Endereço</label>
          {locations.map((value: ILocation) => (
            <p key={value.name}>{value.name === location && value.address}</p>
          ))}
        </InfoSquare>

        <InfoSquare>
          <label>Data da Reserva</label>
          <p>{date}</p>
        </InfoSquare>

        <InfoSquare>
          <label>Horário</label>
          <p>{hour}</p>
        </InfoSquare>

        <InfoSquare>
          <label>Pessoas</label>
          <p>{people}</p>
        </InfoSquare>

        <InfoSquare>
          <label>Ambiente</label>
          <p>{place}</p>
        </InfoSquare>
      </ReviewGrid>
    </>
  );
};
