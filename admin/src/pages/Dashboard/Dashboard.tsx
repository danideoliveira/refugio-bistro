import {
  addDoc,
  collection,
  CollectionReference,
  doc,
  DocumentData,
  DocumentReference,
  DocumentSnapshot,
  getDoc,
  getDocs,
  onSnapshot,
  QueryDocumentSnapshot,
  QuerySnapshot,
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
import DateDropdown from "../../components/DatePicker/DatePicker";

interface IReservation {
  uid?: string;
  cpf: string;
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
  const [reservations, setReservations] = useState<Array<IReservation>>([]);
  const [expiredList, setExpiredList] = useState<Array<IReservation>>([]);
  const [usedList, setUsedList] = useState<Array<IReservation>>([]);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [customer, setCustomer] = useState<any>();
  const [locationFilter, setLocationFilter] =
    useState<string>("Qualquer unidade");
  const [dateFilter, setDateFilter] = useState<string>("Qualquer data");

  const today: Date = new Date();
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

      onSnapshot(collectionRef, (snapshot: QuerySnapshot) => {
        const list: Array<IReservation> = [];

        snapshot.forEach((doc: QueryDocumentSnapshot) => {
          const docReservations: Array<IReservation> = doc.data().reservations;

          docReservations.forEach(async (currentReservation: IReservation) => {
            const data: IReservation = {
              uid: doc.id,
              name: doc.data().name,
              phone: doc.data().phone,
              email: doc.data().email,
              cpf: doc.data().cpf,
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

      onSnapshot(collectionRef, (snapshot: QuerySnapshot) => {
        const list: Array<IReservation> = [];

        snapshot.forEach((doc: QueryDocumentSnapshot) => {
          const docReservations: DocumentData = doc.data();

          const data: IReservation = {
            uid: doc.id,
            name: docReservations.name,
            cpf: docReservations.cpf,
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

      onSnapshot(collectionRef, (snapshot: QuerySnapshot) => {
        const list: Array<IReservation> = [];

        snapshot.forEach((doc: QueryDocumentSnapshot) => {
          const docReservations: DocumentData = doc.data();

          const data: IReservation = {
            uid: doc.id,
            name: docReservations.name,
            cpf: docReservations.cpf,
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

  function sortReservations(list: Array<IReservation>): Array<IReservation> {
    return list.sort((a, b) => {
      const [dayA, monthA, yearA] = a.date.split("/").map(Number);
      const [dayB, monthB, yearB] = b.date.split("/").map(Number);

      const dateA: Date = new Date(yearA, monthA - 1, dayA);
      const dateB: Date = new Date(yearB, monthB - 1, dayB);

      if (dateA.getTime() !== dateB.getTime()) {
        return dateA.getTime() - dateB.getTime();
      }

      const [hourA, minuteA] = a.hour.split(":").map(Number);
      const [hourB, minuteB] = b.hour.split(":").map(Number);

      const timeA: number = hourA * 60 + minuteA;
      const timeB: number = hourB * 60 + minuteB;

      if (timeA !== timeB) {
        return timeA - timeB;
      }

      return a.moment.localeCompare(b.moment);
    });
  }

  function shouldDeleteReservation(reservation: IReservation): boolean {
    const [day, month, year] = reservation.date.split("/").map(Number);
    const [hour, minute] = reservation.hour.split(":").map(Number);

    const reservationTime: Date = new Date(year, month - 1, day, hour, minute);
    const currentTime: Date = new Date();

    const toleranceTime: Date = new Date(
      reservationTime.getTime() + 30 * 60000
    );

    return currentTime > toleranceTime;
  }

  async function deleteReservation(reservation: IReservation): Promise<void> {
    const checkExpiredReservations = expiredList.filter(
      (value: IReservation) =>
        value.date === reservation.date && value.cpf === reservation.cpf
    );

    if (checkExpiredReservations.length > 0) {
      setOpenModal(false);
      toast.error(
        "A reserva feita nesta data já consta como expirada por este cliente."
      );
    } else {
      if (reservation.uid) {
        const docRef = doc(db, "users", reservation.uid);

        await getDoc(docRef).then(async (snapshot) => {
          const data = snapshot.data();

          if (data?.reservations) {
            const otherReservations = data.reservations.filter(
              (value: IReservation) => value.date !== reservation.date
            );

            const expiredReservations = data.reservations.filter(
              (value: IReservation) => value.date === reservation.date
            );

            expiredReservations.forEach(
              (value: IReservation) => (value.status = "expired")
            );

            const existingExpired = expiredReservations[0];
            if (existingExpired) {
              const existingExpiredQuery = collection(
                db,
                "expired_reservations"
              );
              const querySnapshot = await getDocs(existingExpiredQuery);
              const existingDocs = querySnapshot.docs.map((doc) => doc.data());

              const alreadyExists = existingDocs.some(
                (doc) =>
                  doc.date === existingExpired.date &&
                  doc.email === existingExpired.email
              );

              if (!alreadyExists) {
                await addDoc(collection(db, "expired_reservations"), {
                  name: reservation.name,
                  email: reservation.email,
                  phone: reservation.phone,
                  ...existingExpired,
                });
              }
            }

            await updateDoc(docRef, {
              reservations: otherReservations,
            });
          }
        });
      }
    }
  }

  async function handleSetUsed(usedReservation: IReservation): Promise<void> {
    const checkUsedReservations: Array<IReservation> = usedList.filter(
      (value: IReservation) =>
        value.date === usedReservation.date && value.cpf == usedReservation.cpf
    );

    if (checkUsedReservations.length > 0) {
      setOpenModal(false);
      toast.error(
        "A reserva feita nesta data já consta como utilizada por este cliente."
      );
    } else {
      if (usedReservation.uid) {
        const docRef: DocumentReference = doc(db, "users", usedReservation.uid);

        try {
          await getDoc(docRef)
            .then(async (snapshot: DocumentSnapshot) => {
              const data: DocumentData | undefined = snapshot.data();

              if (data?.reservations) {
                const otherReservation: Array<IReservation> =
                  data.reservations.filter(
                    (value: IReservation) => value.date !== usedReservation.date
                  );
                const usedReservationFiltered: Array<IReservation> =
                  data.reservations.filter(
                    (value: IReservation) => value.date === usedReservation.date
                  );

                usedReservationFiltered.forEach(
                  (value: IReservation) => (value.status = "used")
                );

                const newData: Array<IReservation> = otherReservation
                  ? [...otherReservation]
                  : [];

                const { name, email, phone, ...restOfUsedReservation } =
                  usedReservationFiltered[0] || {};

                await addDoc(collection(db, "used_reservations"), {
                  name: usedReservation.name || name,
                  email: usedReservation.email || email,
                  phone: usedReservation.phone || phone,
                  ...restOfUsedReservation,
                });

                await updateDoc(docRef, {
                  reservations: newData,
                }).then(() => {
                  toast.success(
                    `Presença de ${usedReservation.name} confirmada!`
                  );
                });
              }
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
  }

  const getCurrentList = (
    location?: string,
    date?: string
  ): Array<IReservation> => {
    type StatusList = { status: string; list: Array<IReservation> };

    let filteredStatus: Array<IReservation> = [];
    const allStatus: Array<StatusList> = [
      { status: "all", list: [...reservations, ...expiredList, ...usedList] },
      { status: "open", list: reservations },
      { status: "expired", list: expiredList },
      { status: "used", list: usedList },
    ];

    allStatus.map((value: StatusList) => {
      if (value.status === currentList) {
        filteredStatus = value.list;
      }
    });

    if (location || date) {
      if (location !== "Qualquer unidade") {
        const filteredList: Array<IReservation> = [];
        filteredStatus.forEach((value: IReservation) => {
          if (value.location) {
            if (value.location === location) filteredList.push(value);
          }
        });

        filteredStatus = filteredList;
      }

      if (date !== "Qualquer data") {
        const filteredList: Array<IReservation> = [];

        filteredStatus.forEach((value: IReservation) => {
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

  function shortenString(str: string, maxLength: number): string {
    if (str.length > maxLength) {
      return str.substring(0, maxLength) + "...";
    }
    return str;
  }

  function getReservationStatus(reservation: IReservation): JSX.Element {
    type ReservationElement = {
      action: string;
      element: JSX.Element;
    };

    const allStatus: Array<ReservationElement> = [
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
              Confirmar
            </button>
          </td>
        ),
      },

      { action: "used", element: <td data-label="Status">Utilizada</td> },

      { action: "expired", element: <td data-label="Status">Expirada</td> },
    ];

    const filtered: Array<ReservationElement> = allStatus.filter(
      (value: ReservationElement) => {
        if (value.action === reservation.status) {
          return value.element;
        }
      }
    );

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
                <DateDropdown handleChange={setDateFilter} />{" "}
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
                  (reservation: IReservation, index: number) => (
                    <tr
                      key={index}
                      style={{
                        background: statusColor[reservation.status],
                      }}
                    >
                      <td data-label="Data da Reserva">{reservation.date}</td>
                      <td data-label="Horário">{reservation.hour}</td>
                      <td data-label="Pessoas">{reservation.people}</td>
                      <td data-label="Ambiente">{reservation.place}</td>
                      <td data-label="Unidade">{reservation.location}</td>
                      <td data-label="Cliente">
                        {shortenString(reservation.name, 25)}
                      </td>
                      <td data-label="Email">
                        {shortenString(reservation.email, 40)}
                      </td>
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
          <div>
            <span>Email:</span>
            <h3>{customer?.email}</h3>
            <span>Telefone:</span>
            <h3>{customer?.phone}</h3>
          </div>
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
