import { useContext, useState } from "react";
import { BackButton, Box, Container, NextButton } from "./Reservation.styled";
import { AuthContext } from "../../contexts/auth";
import { GeneralInfo, LocationInfo, ReviewInfo } from "./ReservationInfos";
import { IoIosArrowBack } from "react-icons/io";
import { db } from "../../services/firebaseConnection";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { StyledLoading } from "../../components/Form/Form.styled";

function Reservation() {
  const { user } = useContext<any>(AuthContext);
  const today = new Date();
  const arrDate = [today.toLocaleDateString()];
  const [location, setLocation] = useState<string>("Rio de Janeiro");
  const [date, setDate] = useState<string>(today.toLocaleDateString());
  const [hour, setHour] = useState<string>("18:00");
  const [people, setPeople] = useState<string>("2");
  const [place, setPlace] = useState<string>("Térreo");
  const [steps, setSteps] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const reservationSteps = [
    <LocationInfo chosenLocation={[location, setLocation]} />,
    <GeneralInfo
      chosenDate={[date, setDate]}
      chosenHour={[hour, setHour]}
      chosenPeople={[people, setPeople]}
      chosenPlace={[place, setPlace]}
    />,
    <ReviewInfo
      reservationInfo={{
        user,
        location,
        date,
        hour,
        people,
        place,
      }}
    />,
  ];
  const firstStep = steps <= 0;
  const lastStep = steps >= reservationSteps.length - 1;

  for (let i = 0; i < 5; i++) {
    today.setDate(today.getDate() + 1);
    arrDate.push(today.toLocaleDateString());
  }

  async function handleSubmit() {
    setLoading(true);
    const newReservation = {
      location,
      date,
      hour,
      people,
      place,
    };

    let reservationsUpdated: Array<object> = [];
    const docRef = doc(db, "users", user.uid);
    let reservationDenied = false;

    await getDoc(docRef)
      .then((snapshot) => {
        const reservations = snapshot.data()?.reservations;

        if (reservations.length > 1) {
          toast.error("Você não pode ter mais de 2 reservas");
          reservationDenied = true;
          return;
        }

        reservations.forEach((value: any) => {
          if (value.date === newReservation.date) {
            toast.warn("Você já possui uma reserva para este dia!");
            reservationDenied = true;
            return;
          }
        });

        reservationsUpdated = [...reservations, newReservation];
      })
      .catch((err) => {
        console.log("Erro ao buscar: " + err);
      });

    if (reservationDenied) return;

    await updateDoc(docRef, {
      reservations: reservationsUpdated,
    })
      .then(() => {
        toast.success(
          `Reserva efetuada para o dia ${newReservation.date} às ${newReservation.hour}`,
        );
        navigate("/");
      })
      .catch((err) => {
        console.log("Error: " + err);
      });
    setLoading(false);
  }

  enum StepsAction {
    BACK,
    NEXT,
  }

  function handleSetSteps(action: StepsAction): void {
    if (action === StepsAction.BACK) {
      if (firstStep) return;
      setSteps(steps - 1);
    } else {
      if (lastStep) return;
      setSteps(steps + 1);
    }
  }

  return (
    <>
      <Container>
        <Box>
          <div className="res-image" />
          <article className="res-content">
            <BackButton
              style={{ display: steps > 0 ? "flex" : "none" }}
              onClick={() => handleSetSteps(StepsAction.BACK)}
            >
              <IoIosArrowBack />
            </BackButton>
            <div className="res-text-box">
              <h2>Olá, {user && user.name}!</h2>
              <span>Faça sua reserva e evite filas!</span>
            </div>

            <div className="res-info-box">{reservationSteps[steps]}</div>

            <NextButton
              onClick={() =>
                !lastStep ? handleSetSteps(StepsAction.NEXT) : handleSubmit()
              }
            >
              {!loading ? (
                !lastStep ? (
                  "Próximo"
                ) : (
                  "Reservar"
                )
              ) : (
                <StyledLoading />
              )}
            </NextButton>
          </article>
        </Box>
      </Container>
    </>
  );
}

export default Reservation;
