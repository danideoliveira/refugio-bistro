import { useContext, useState } from "react";
import {
  Container,
  Reservations,
  StyledLink,
  Table,
} from "./MyReservation.styled";
import { AuthContext } from "../../contexts/auth";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../services/firebaseConnection";
import { toast } from "react-toastify";
import { TiDelete } from "react-icons/ti";
import Modal from "../../components/Modal/Modal";
import { IoIosArrowBack } from "react-icons/io";
import { InfoSquare, ReviewGrid } from "../Reservation/Reservation.styled";

function MyReservation(): JSX.Element {
  const { user, setUser }: any = useContext(AuthContext);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [chosenReservation, setChosenReservation] = useState<any>("");
  let ordenedReservations: Array<object> = user?.reservations;

  if (user?.reservations.length > 1) {
    ordenedReservations =
      user?.reservations[0].date > user?.reservations[1].date
        ? [user?.reservations[1], user?.reservations[0]]
        : [user?.reservations[0], user?.reservations[1]];
  }

  async function handleDeleteRow(date: string): Promise<void> {
    try {
      const updatedReservations = user.reservations.filter(
        (reservation: any) => reservation.date !== date,
      );

      const docRef = doc(db, "users", user.uid);
      await updateDoc(docRef, { reservations: updatedReservations });

      const updatedUser = {
        name: user.name,
        email: user.email,
        uid: user.uid,
        reservations: updatedReservations,
      };
      localStorage.setItem("@currentUser", JSON.stringify(updatedUser));

      setUser(updatedUser);
      setShowModal(!showModal);
      toast.info(`Sua reserva para o dia ${date} foi cancelada!`);
    } catch (error) {
      console.error("Erro ao deletar reserva: ", error);
      toast.error("Erro ao deletar reserva.");
    }
  }

  function handleShowModal(reservation: any): void {
    setChosenReservation(reservation);
    setShowModal(!showModal);
  }

  return (
    <Container>
      <Reservations>
        <h2>Minhas Reservas</h2>

        {user?.reservations.length > 0 ? (
          <Table>
            <thead>
              <tr>
                <th>Data</th>
                <th>Horário</th>
                <th>Pessoas</th>
                <th>Ambiente</th>
                <th>Unidade</th>
                <th>Efetuada em</th>
                <th>#</th>
              </tr>
            </thead>

            <tbody>
              {user?.reservations &&
                ordenedReservations.map((currentReservation: any) => (
                  <tr key={currentReservation.date}>
                    <td data-label="Data da Reserva">
                      {currentReservation.date}
                    </td>
                    <td data-label="Horário">{currentReservation.hour}</td>
                    <td data-label="Pessoas">{currentReservation.people}</td>
                    <td data-label="Ambiente">{currentReservation.place}</td>
                    <td data-label="Unidade">{currentReservation.location}</td>
                    <td data-label="Efetuada em:">
                      {currentReservation.moment}
                    </td>
                    <td className="action-row">
                      <button
                        type="button"
                        onClick={() => handleShowModal(currentReservation)}
                      >
                        <TiDelete /> Cancelar reserva
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
        ) : (
          <label>Você não possui nenhuma reserva.</label>
        )}
        {user?.reservations.length < 2 && (
          <StyledLink to="/reservation">+ Nova Reserva</StyledLink>
        )}
      </Reservations>
      <Modal
        condition={showModal}
        setCondition={setShowModal}
        className="modal-my-reservation"
      >
        <button className="modal-close" onClick={() => setShowModal(false)}>
          <IoIosArrowBack />
        </button>
        <h2>Deseja cancelar a sua reserva?</h2>

        <ReviewGrid className="modal-info">
          <InfoSquare>
            <label>Data</label>
            <p>{chosenReservation.date}</p>
          </InfoSquare>

          <InfoSquare>
            <label>Horário</label>
            <p>{chosenReservation.hour}</p>
          </InfoSquare>

          <InfoSquare>
            <label>Pessoas</label>
            <p>{chosenReservation.people}</p>
          </InfoSquare>

          <InfoSquare>
            <label>Ambiente</label>
            <p>{chosenReservation.place}</p>
          </InfoSquare>

          <InfoSquare>
            <label>Unidade</label>
            <p>{chosenReservation.location}</p>
          </InfoSquare>
        </ReviewGrid>

        <div className="button-box">
          <button
            className="modal-button-delete"
            onClick={async () => await handleDeleteRow(chosenReservation.date)}
          >
            <TiDelete />
            Cancelar reserva
          </button>
        </div>
      </Modal>
    </Container>
  );
}

export default MyReservation;
