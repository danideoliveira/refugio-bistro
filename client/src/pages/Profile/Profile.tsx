import { useContext, useEffect, useState } from "react";
import Form from "../../components/Form/Form";
import { Container } from "./Profile.styled";
import { AuthContext } from "../../contexts/auth";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  doc,
  DocumentData,
  DocumentReference,
  DocumentSnapshot,
  getDoc,
} from "firebase/firestore";
import { db } from "../../services/firebaseConnection";
import { StyledLoading } from "../../components/Form/Form.styled";
import { MdEdit } from "react-icons/md";
import { FaSave } from "react-icons/fa";
import { IoSettingsSharp } from "react-icons/io5";
import Modal from "../../components/Modal/Modal";
import { FaTrashCan } from "react-icons/fa6";
import { validateCPF } from "../../helpers/validateCpf";
import Loading from "../../components/Loading/Loading";
import { toast } from "react-toastify";

function Profile(): JSX.Element {
  const { user, logout, deleteAccount, updateUser, loading, setLoading }: any =
    useContext(AuthContext);
  const [password, setPassword] = useState<string>("");
  const [newName, setNewName] = useState<string>("");
  const [newEmail, setNewEmail] = useState<string>("");
  const [newCPF, setNewCPF] = useState<string>("");
  const [newPhone, setNewPhone] = useState<string>("");
  const [disabledInput, setDisabledInput] = useState<boolean>(true);
  const [showSettings, setShowSettings] = useState<boolean>();
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showModalPassword, setShowModalPassword] = useState<boolean>(false);

  const schema: z.ZodSchema = z.object({
    name: z
      .string()
      .min(1, "O campo nome é obrigatório!")
      .max(50, "Quantidade de caracteres excedida")
      .default(user?.name),
    email: z.string().email("Digite um email válido").default(user?.email),
    cpf: z
      .string()
      .refine((cpf) => validateCPF(cpf), {
        message: "CPF inválido",
      })
      .optional(),
    phone: z
      .string()
      .regex(
        /^\(?\d{2}\)?[-.\s]?\d{5}[-.\s]?\d{4}$/,
        "Digite um número de celular válido",
      )
      .optional(),
    password: z.string(),
  });

  useEffect(() => {
    if (!user?.uid) return;
    async function currentUser() {
      const docRef: DocumentReference = doc(db, "users", user.uid);

      await getDoc(docRef).then((snapshot: DocumentSnapshot) => {
        const data: DocumentData | undefined = snapshot.data();
        if (data?.name) {
          setNewName(data?.name);
          setNewCPF(data?.cpf);
          setNewEmail(data?.email);
          setNewPhone(data?.phone);
        }
      });
    }

    currentUser();
  }, [user]);

  type FormData = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  function handleUpdateUser(): void {
    if (newName.split(" ").length === 1) {
      toast.error("Digite o seu sobrenome");
      setShowModalPassword(false);
      setPassword("");
    } else if (newName === "" || newEmail === "" || newPhone === "") {
      toast.error("Preencha todos os campos!");
      setShowModalPassword(false);
      setPassword("");
    } else {
      updateUser(password, newName.toUpperCase(), newEmail, newPhone);
      setPassword("");
      setDisabledInput(true);
      setShowModalPassword(false);
    }
  }

  return (
    <Container>
      <div className="box-profile">
        {user.name ? (
          <>
            <div className="profile-configuration">
              <button
                className="configuration-icon"
                onClick={() => setShowSettings(showSettings ? false : true)}
              >
                <IoSettingsSharp />
              </button>
              <button
                className="delete-account"
                style={{ display: showSettings ? "flex" : "none" }}
                onClick={() => setShowModal(true)}
              >
                Deletar conta
              </button>
            </div>
            <Form className="form-profile">
              <h2>Meu Perfil</h2>
              <div className="box-inputs">
                <div className="input-square">
                  <label>Nome</label>
                  <input
                    value={newName.toUpperCase()}
                    {...register("name")}
                    disabled={disabledInput}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setNewName(e.target.value)
                    }
                  />
                  <span
                    className="error"
                    style={{
                      visibility: errors?.name?.message?.toString()
                        ? "visible"
                        : "hidden",
                    }}
                  >
                    {errors?.name?.message?.toString() || "default"}
                  </span>
                </div>

                <div className="input-square">
                  <label>CPF</label>
                  <input
                    value={newCPF}
                    {...register("cpf")}
                    disabled={true}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setNewCPF(e.target.value)
                    }
                  />
                  <span
                    className="error"
                    style={{
                      visibility: errors?.cpf?.message?.toString()
                        ? "visible"
                        : "hidden",
                    }}
                  >
                    {errors?.cpf?.message?.toString() || "default"}
                  </span>
                </div>

                <div className="input-square">
                  <label>Email</label>
                  <input
                    value={newEmail}
                    {...register("email")}
                    disabled={disabledInput}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setNewEmail(e.target.value)
                    }
                  />
                  <span
                    className="error"
                    style={{
                      visibility: errors?.email?.message?.toString()
                        ? "visible"
                        : "hidden",
                    }}
                  >
                    {errors?.email?.message?.toString() || "default"}
                  </span>
                </div>

                <div className="input-square">
                  <label>Telefone</label>
                  <input
                    value={newPhone}
                    type="number"
                    {...register("phone")}
                    disabled={disabledInput}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setNewPhone(e.target.value)
                    }
                  />
                  <span
                    className="error"
                    style={{
                      visibility: errors?.phone?.message?.toString()
                        ? "visible"
                        : "hidden",
                    }}
                  >
                    {errors?.phone?.message?.toString() || "default"}
                  </span>
                </div>
              </div>
              <div className="box-buttons">
                {disabledInput ? (
                  <span
                    className="edit-button"
                    onClick={() => setDisabledInput(false)}
                  >
                    <MdEdit /> Editar
                  </span>
                ) : (
                  <button
                    className="edit-button"
                    type="button"
                    disabled={loading}
                    onClick={() => setShowModalPassword(true)}
                  >
                    Prosseguir
                  </button>
                )}
                {disabledInput ? (
                  <button
                    className="logout-button"
                    type="button"
                    onClick={logout}
                  >
                    Sair
                  </button>
                ) : (
                  <button
                    className="logout-button"
                    type="button"
                    onClick={() => setDisabledInput(true)}
                  >
                    Cancelar
                  </button>
                )}
              </div>
            </Form>
          </>
        ) : (
          <Loading />
        )}
      </div>

      <Modal
        condition={showModal}
        setCondition={setShowModal}
        className="modal-delete-account"
      >
        <Form
          onSubmit={handleSubmit(() => deleteAccount(password))}
          className="form-delete-account"
        >
          <div className="box-inputs-flex">
            <div className="input-square">
              <label>Digite sua senha</label>
              <input
                {...register("password")}
                value={password}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setPassword(e.target.value);
                }}
                type="password"
              />
              <span
                className="error"
                style={{
                  visibility: errors?.password?.message?.toString()
                    ? "visible"
                    : "hidden",
                }}
              >
                {errors?.password?.message?.toString() || "default"}
              </span>
            </div>
          </div>
          <div className="button-box">
            <button
              className="modal-button-delete"
              onClick={() => {
                setLoading(true);
                deleteAccount(password);
                setLoading(false);
              }}
            >
              {loading ? (
                <StyledLoading />
              ) : (
                <>
                  <FaTrashCan /> Excluir conta
                </>
              )}
            </button>
          </div>
        </Form>
      </Modal>

      <Modal
        condition={showModalPassword}
        setCondition={setShowModalPassword}
        className="modal-password"
      >
        <Form
          onSubmit={handleSubmit(handleUpdateUser)}
          className="form-profile-update"
        >
          <div className="box-inputs-flex">
            <div className="input-square">
              <label>Digite sua senha</label>
              <input
                {...register("password")}
                value={password}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setPassword(e.target.value);
                }}
                type="password"
              />
              <span
                className="error"
                style={{
                  visibility: errors?.password?.message?.toString()
                    ? "visible"
                    : "hidden",
                }}
              >
                {errors?.password?.message?.toString() || "default"}
              </span>
            </div>
          </div>

          <div className="box-buttons">
            <button className="edit-button">
              {loading ? (
                <StyledLoading />
              ) : (
                <>
                  <FaSave /> Salvar
                </>
              )}
            </button>
          </div>
        </Form>
      </Modal>
    </Container>
  );
}

export default Profile;
