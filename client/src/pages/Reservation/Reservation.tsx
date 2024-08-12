import { useContext, useState } from "react";
import { BackButton, Box, Container, NextButton } from "./Reservation.styled";
import { AuthContext } from "../../contexts/auth";
import { GeneralInfo, LocationInfo, ReviewInfo } from "./ReservationInfos";
import { IoIosArrowBack } from "react-icons/io";
import { db } from "../../services/firebaseConnection";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { StyledLoading } from "../../components/Form/Form.styled";

function Reservation(): JSX.Element {
  const { user, setUser } = useContext<any>(AuthContext);
  const tomorrow: Date = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const arrDate: Array<string> = [tomorrow.toLocaleDateString()];
  const [location, setLocation] = useState<string>("Rio de Janeiro");
  const [date, setDate] = useState<string>(tomorrow.toLocaleDateString());
  const [hour, setHour] = useState<string>("18:00");
  const [people, setPeople] = useState<string>("2");
  const [place, setPlace] = useState<string>("Térreo");
  const [steps, setSteps] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate: NavigateFunction = useNavigate();

  const reservationSteps: Array<JSX.Element> = [
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
  const firstStep: boolean = steps <= 0;
  const lastStep: boolean = steps >= reservationSteps.length - 1;

  for (let i = 0; i < 5; i++) {
    tomorrow.setDate(tomorrow.getDate() + 1);
    arrDate.push(tomorrow.toLocaleDateString());
  }

  async function handleSubmit(): Promise<void> {
    setLoading(true);
    const moment: Date = new Date();

    const newReservation = {
      location,
      date,
      hour,
      people,
      place,
      moment: moment.toLocaleString(),
    };

    let reservationsUpdated: Array<object> = [];
    const docRef = doc(db, "users", user.uid);
    let reservationDenied = false;

    try {
      const snapshot = await getDoc(docRef);
      const reservations = snapshot.data()?.reservations || [];

      if (reservations.length >= 2) {
        toast.error("Você não pode ter mais de 2 reservas");
        reservationDenied = true;
      } else {
        for (const value of reservations) {
          if (value.date === newReservation.date) {
            toast.warn("Você já possui uma reserva para este dia!");
            reservationDenied = true;
            break;
          }
        }

        if (!reservationDenied) {
          reservationsUpdated = [...reservations, newReservation];
          await updateDoc(docRef, { reservations: reservationsUpdated });

          const updatedSnapshot = await getDoc(docRef);
          const data = updatedSnapshot.data();
          setUser({ uid: user.uid, ...data });
          localStorage.setItem(
            "@currentUser",
            JSON.stringify({ uid: user.uid, ...data }),
          );
          toast.success(
            `Reserva efetuada para o dia ${newReservation.date} às ${newReservation.hour}`,
          );
          navigate("/my-reservation");
        }
      }
    } catch (err) {
      console.error("Erro ao processar reserva: ", err);
      toast.error("Erro ao processar reserva.");
    } finally {
      setLoading(false);
    }
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
              <h2>Olá, {user && user.name.split(" ")[0]}!</h2>
              <span>Faça sua reserva e evite filas!</span>
            </div>

            <div className="res-info-box">{reservationSteps[steps]}</div>

            <NextButton
              onClick={async () =>
                !lastStep
                  ? handleSetSteps(StepsAction.NEXT)
                  : await handleSubmit()
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
