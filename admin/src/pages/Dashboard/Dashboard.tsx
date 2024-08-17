import {
  addDoc,
  collection,
  CollectionReference,
  doc,
  DocumentData,
  getDoc,
  onSnapshot,
  QueryDocumentSnapshot,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../services/firebaseConnection";
import { useContext, useEffect, useState } from "react";
import { Container } from "./Dashboard.styled";
import { AiFillLike } from "react-icons/ai";
import { AdminContext } from "../../contexts/authAdmin";
import Modal from "../../components/Modal/Modal";
import { toast } from "react-toastify";
import Table from "../../components/Table/Table";

interface IReservation {
  uid?: string;
  name: string;
  phone: string;
  email: string;
  date: string;
  hour: string;
  people: string;
  place: string;
  location: string;
  moment: string;
  status: string;
}

function Dashboard(): JSX.Element {
  const { currentList, checkFirebaseError } = useContext<any>(AdminContext);
  const [reservations, setReservations] = useState<any>([]);
  const [expiredList, setExpiredList] = useState<Array<any>>([]);
  const [usedList, setUsedList] = useState<any>([]);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [customer, setCustomer] = useState<any>();
  const [locationFilter, setLocationFilter] =
    useState<string>("Qualquer unidade");
  const [dateFilter, setDateFilter] = useState<string>("Qualquer data");

  const today = new Date();
  today.setDate(today.getDate());
  const arrDate: Array<string> = [today.toLocaleDateString()];

  for (let i = 0; i < 6; i++) {
    today.setDate(today.getDate() + 1);
    arrDate.push(today.toLocaleDateString());
  }

  const statusColor: any = {
    open: "#efefef",
    used: "#3eff68",
    expired: "#ff5d5d",
  };

  useEffect(() => {
    function loadAllReservations() {
      const collectionRef: CollectionReference = collection(db, "users");

      onSnapshot(collectionRef, (snapshot) => {
        const list: Array<IReservation> = [];

        snapshot.forEach((doc: QueryDocumentSnapshot) => {
          const docReservations: Array<any> = doc.data().reservations;

          docReservations.forEach(async (currentReservation) => {
            const data: IReservation = {
              uid: doc.id,
              name: doc.data().name,
              phone: doc.data().phone,
              email: doc.data().email,
              date: currentReservation.date,
              hour: currentReservation.hour,
              people: currentReservation.people,
              location: currentReservation.location,
              place: currentReservation.place,
              status: currentReservation.status,
              moment: currentReservation.moment,
            };

            if (shouldDeleteReservation(data)) {
              await deleteReservation(data);
            } else {
              list.push(data);
            }
          });
        });

        const sortedList: Array<IReservation> = sortReservations(list);
        setReservations(sortedList);
      });
    }

    loadAllReservations();
  }, []);

  useEffect(() => {
    function loadExpiredReservations() {
      const collectionRef: CollectionReference = collection(
        db,
        "expired_reservations"
      );

      onSnapshot(collectionRef, (snapshot) => {
        const list: Array<IReservation> = [];

        snapshot.forEach((doc: QueryDocumentSnapshot) => {
          const docReservations: DocumentData = doc.data();

          const data: IReservation = {
            uid: doc.id,
            name: docReservations.name,
            phone: docReservations.phone,
            email: docReservations.email,
            date: docReservations.date,
            hour: docReservations.hour,
            people: docReservations.people,
            location: docReservations.location,
            place: docReservations.place,
            status: docReservations.status,
            moment: docReservations.moment,
          };

          list.push(data);
        });

        const sortedList: Array<IReservation> = sortReservations(list);
        setExpiredList(sortedList);
      });
    }

    loadExpiredReservations();
  }, []);

  useEffect(() => {
    function loadUsedReservations() {
      const collectionRef: CollectionReference = collection(
        db,
        "used_reservations"
      );

      onSnapshot(collectionRef, (snapshot) => {
        const list: Array<IReservation> = [];

        snapshot.forEach((doc: QueryDocumentSnapshot) => {
          const docReservations: DocumentData = doc.data();

          const data: IReservation = {
            uid: doc.id,
            name: docReservations.name,
            phone: docReservations.phone,
            email: docReservations.email,
            date: docReservations.date,
            hour: docReservations.hour,
            people: docReservations.people,
            location: docReservations.location,
            place: docReservations.place,
            status: docReservations.status,
            moment: docReservations.moment,
          };

          list.push(data);
        });

        const sortedList: Array<IReservation> = sortReservations(list);
        setUsedList(sortedList);
      });
    }

    loadUsedReservations();
  }, []);

  function sortReservations(list: Array<IReservation>) {
    return list.sort((a, b) => {
      const [dayA, monthA, yearA] = a.date.split("/").map(Number);
      const [dayB, monthB, yearB] = b.date.split("/").map(Number);

      const dateA = new Date(yearA, monthA - 1, dayA);
      const dateB = new Date(yearB, monthB - 1, dayB);

      if (dateA.getTime() !== dateB.getTime()) {
        return dateA.getTime() - dateB.getTime();
      }

      const [hourA, minuteA] = a.hour.split(":").map(Number);
      const [hourB, minuteB] = b.hour.split(":").map(Number);

      const timeA = hourA * 60 + minuteA;
      const timeB = hourB * 60 + minuteB;

      if (timeA !== timeB) {
        return timeA - timeB;
      }

      return a.moment.localeCompare(b.moment);
    });
  }

  function shouldDeleteReservation(reservation: IReservation): boolean {
    const [day, month, year] = reservation.date.split("/").map(Number);
    const [hour, minute] = reservation.hour.split(":").map(Number);

    const reservationTime = new Date(year, month - 1, day, hour, minute);
    const currentTime = new Date();

    const toleranceTime = new Date(reservationTime.getTime() + 30 * 60000);

    return currentTime > toleranceTime;
  }

  async function deleteReservation(reservation: IReservation) {
    if (reservation.uid) {
      const docRef = doc(db, "users", reservation.uid);

      await getDoc(docRef).then(async (snapshot: any) => {
        const data: any = snapshot.data().reservations;
        const otherReservation: any = data.filter(
          (value: any) => value.date !== reservation.date
        );
        const expiredReservation: any = data.filter(
          (value: any) => value.date === reservation.date
        );

        expiredReservation.forEach((value: any) => (value.status = "expired"));

        const newData = otherReservation ? [...otherReservation] : [];

        await addDoc(collection(db, "expired_reservations"), {
          name: reservation.name,
          email: reservation.email,
          phone: reservation.phone,
          ...expiredReservation[0],
        }).then(() => console.log("reserva expirada salva"));

        await updateDoc(docRef, {
          reservations: newData,
        });
      });
    }
  }

  async function handleSetUsed(usedReservation: IReservation): Promise<void> {
    const check = usedList.filter(
      (value: any) =>
        value.date === usedReservation.date &&
        value.email == usedReservation.email
    );

    if (check.length > 0) {
      setOpenModal(false);
      toast.error(
        "A reserva feita nesta data já consta como utilizada por este cliente."
      );
      return;
    }

    if (usedReservation.uid) {
      const docRef = doc(db, "users", usedReservation.uid);

      try {
        await getDoc(docRef)
          .then(async (snapshot: any) => {
            const data: any = snapshot.data().reservations;
            const otherReservation: any = data.filter(
              (value: any) => value.date !== usedReservation.date
            );
            const usedReservationFiltered: any = data.filter(
              (value: any) => value.date === usedReservation.date
            );

            usedReservationFiltered.forEach(
              (value: any) => (value.status = "used")
            );

            const newData = otherReservation ? [...otherReservation] : [];

            await addDoc(collection(db, "used_reservations"), {
              name: usedReservation.name,
              email: usedReservation.email,
              phone: usedReservation.phone,
              ...usedReservationFiltered[0],
            });

            await updateDoc(docRef, {
              reservations: newData,
            }).then(() => {
              toast.success(`Presença de ${usedReservation.name} confirmada!`);
            });
          })
          .catch((err) => {
            console.log(err);
            checkFirebaseError(err);
          })
          .finally(() => setOpenModal(false));
      } catch (err) {
        console.log(err);
      }
    }
  }

  const getCurrentList = (
    location?: string,
    date?: string
  ): Array<IReservation> => {
    let filteredStatus: any = [];
    const allStatus = [
      { status: "all", list: [...reservations, ...expiredList, ...usedList] },
      { status: "open", list: reservations },
      { status: "expired", list: expiredList },
      { status: "used", list: usedList },
    ];

    allStatus.map((value) => {
      if (value.status === currentList) {
        filteredStatus = value.list;
      }
    });

    if (location || date) {
      if (location !== "Qualquer unidade") {
        const filteredList: any = [];
        filteredStatus.forEach((value: any) => {
          if (value.location) {
            if (value.location === location) filteredList.push(value);
          }
        });

        filteredStatus = filteredList;
      }

      if (date !== "Qualquer data") {
        const filteredList: any = [];

        filteredStatus.forEach((value: any) => {
          if (value.date) {
            if (value.date === date) filteredList.push(value);
          }
        });

        filteredStatus = filteredList;
      }
    }

    const sortedList = sortReservations(filteredStatus);
    return sortedList;
  };

  function getReservationStatus(reservation: IReservation) {
    const allStatus: any = [
      {
        action: "open",
        element: (
          <td className="action-row">
            <button
              type="button"
              onClick={() => {
                setCustomer(reservation);
                setOpenModal(true);
              }}
            >
              <AiFillLike
                color={reservation.status !== "open" ? "green" : ""}
              />
              Confirmar presença
            </button>
          </td>
        ),
      },

      { action: "used", element: <td data-label="Status">Utilizada</td> },

      { action: "expired", element: <td data-label="Status">Expirada</td> },
    ];

    const filtered = allStatus.filter((value: any) => {
      if (value.action === reservation.status) {
        return value.element;
      }
    });

    return filtered[0].element;
  }

  return (
    <>
      <Container>
        <div className="box-dashboard">
          <h1>Controle de Reservas</h1>
          <div className="dashboard-info">
            <div className="box-selects">
              <div className="box-select-list">
                <label>Unidade</label>
                <select
                  onChange={(e) => {
                    setLocationFilter(e.target.value);
                  }}
                >
                  <option>Qualquer unidade</option>
                  <option>Rio de Janeiro</option>
                  <option>São Paulo</option>
                  <option>Minas Gerais</option>
                </select>
              </div>

              <div className="box-select-list">
                <label>Data</label>
                <select
                  onChange={(e) => {
                    setDateFilter(e.target.value);
                  }}
                >
                  <option>Qualquer data</option>
                  {arrDate.map((value, index) => (
                    <option key={index}>{value}</option>
                  ))}
                </select>
              </div>
            </div>

            <span>
              {getCurrentList(locationFilter, dateFilter).length > 0
                ? `Reservas encontradas: ${
                    getCurrentList(locationFilter, dateFilter).length
                  }`
                : "Nenhuma reserva encontrada"}
            </span>
          </div>

          {getCurrentList(locationFilter, dateFilter).length > 0 ? (
            <Table>
              <thead>
                <tr>
                  <th>Data</th>
                  <th>Horário</th>
                  <th>Pessoas</th>
                  <th>Ambiente</th>
                  <th>Unidade</th>
                  <th>Cliente</th>
                  <th>Email</th>
                  <th>Telefone</th>
                  <th>Momento</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {getCurrentList(locationFilter, dateFilter).map(
                  (reservation: any, index: number) => (
                    <tr
                      key={index}
                      style={{ background: statusColor[reservation.status] }}
                    >
                      <td data-label="Data da Reserva">{reservation.date}</td>
                      <td data-label="Horário">{reservation.hour}</td>
                      <td data-label="Pessoas">{reservation.people}</td>
                      <td data-label="Ambiente">{reservation.place}</td>
                      <td data-label="Unidade">{reservation.location}</td>
                      <td data-label="Cliente">{reservation.name}</td>
                      <td data-label="Email">{reservation.email}</td>
                      <td data-label="Telefone">{reservation.phone}</td>
                      <td data-label="Momento">{reservation.moment}</td>
                      {reservation.status && getReservationStatus(reservation)}
                    </tr>
                  )
                )}
              </tbody>
            </Table>
          ) : (
            <div className="no-reservations">Não há reservas</div>
          )}
        </div>

        <Modal
          className="modal-dashboard"
          condition={openModal}
          setCondition={setOpenModal}
        >
          <h2>Confirmar presença de {customer?.name}?</h2>
          <button
            className="modal-button"
            onClick={() => handleSetUsed(customer)}
          >
            Confirmar presença
          </button>
        </Modal>
      </Container>
    </>
  );
}

export default Dashboard;
