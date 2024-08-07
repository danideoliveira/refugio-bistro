import { useContext, useEffect, useState } from "react";
import Form from "../../components/Form/Form";
import { Container } from "./Profile.styled";
import { AuthContext } from "../../contexts/auth";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../services/firebaseConnection";
import { toast } from "react-toastify";
import { StyledLoading } from "../../components/Form/Form.styled";
import { MdEdit } from "react-icons/md";
import { FaSave } from "react-icons/fa";
import { IoSettingsSharp } from "react-icons/io5";
import Modal from "../../components/Modal/Modal";
import { IoIosArrowBack } from "react-icons/io";
import { FaTrashCan } from "react-icons/fa6";

function Profile() {
  const { user, setUser, logout, deleteAccount } = useContext(AuthContext) as {
    user: { uid: string; name: string; email: string };
    setUser: (user: any) => void;
    logout: () => void;
    deleteAccount: () => void;
  };
  const [newName, setNewName] = useState<string>("");
  const [newEmail, setNewEmail] = useState<string>("");
  const [disabledInput, setDisabledInput] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [showSettings, setShowSettings] = useState<boolean>();
  const [showModal, setShowModal] = useState<boolean>(false);

  const schema = z.object({
    name: z.string().min(1, "O campo nome é obrigatório!").default(user?.name),
    email: z.string().email("Digite um email válido").default(user?.email),
  });

  type FormData = z.infer<typeof schema>;
  useEffect(() => {
    if (user?.name) {
      setNewName(user.name);
      setNewEmail(user.email);
    }
  }, [user]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async () => {
    setLoading(true);
    try {
      const docRef = doc(db, "users", user.uid);
      await updateDoc(docRef, {
        name: newName,
        email: newEmail,
      });
      setUser((prev: any) => ({ ...prev, name: newName, email: newEmail }));
      localStorage.setItem(
        "@currentUser",
        JSON.stringify({ ...user, name: newName, email: newEmail }),
      );
      toast.success("Perfil atualizado com sucesso!");
    } catch (error) {
      toast.error("Erro ao atualizar perfil.");
      console.error("Erro ao atualizar perfil: ", error);
    } finally {
      setLoading(false);
      setDisabledInput(true);
    }
  };

  return (
    <Container>
      <div className="box-profile">
        {user?.name ? (
          <>
            <div className="profile-configuration">
              <button
                className="delete-account"
                style={{ display: showSettings ? "flex" : "none" }}
                onClick={() => setShowModal(true)}
              >
                Deletar conta
              </button>
              <button
                className="configuration-icon"
                onClick={() => setShowSettings(showSettings ? false : true)}
              >
                <IoSettingsSharp />
              </button>
            </div>
            <Form onSubmit={handleSubmit(onSubmit)}>
              <h2>Meu Perfil</h2>
              <div className="box-inputs">
                <div className="input-square">
                  <label>Nome Completo</label>
                  <input
                    value={newName}
                    {...register("name")}
                    disabled={disabledInput}
                    onChange={(e) => setNewName(e.target.value)}
                  />
                  {errors.name && <span>{errors.name.message}</span>}
                </div>

                <div className="input-square">
                  <label>Email</label>
                  <input
                    value={newEmail}
                    {...register("email")}
                    disabled={disabledInput}
                    onChange={(e) => setNewEmail(e.target.value)}
                  />
                  {errors.email && <span>{errors.email.message}</span>}
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
                    type="submit"
                    className="edit-button"
                    disabled={loading}
                  >
                    {loading ? (
                      <StyledLoading />
                    ) : (
                      <>
                        <FaSave /> Salvar
                      </>
                    )}
                  </button>
                )}
                <button
                  className="logout-button"
                  type="button"
                  onClick={logout}
                >
                  Sair
                </button>
              </div>
            </Form>
          </>
        ) : (
          <span className="profile-loading">
            <StyledLoading />
            Carregando...
          </span>
        )}
      </div>

      {showModal && (
        <Modal>
          <button className="modal-close" onClick={() => setShowModal(false)}>
            <IoIosArrowBack />
          </button>

          <h2>Tem certeza que deseja excluir sua conta?</h2>
          <div className="button-box">
            <button className="modal-button-delete" onClick={deleteAccount}>
              <FaTrashCan /> Excluir conta
            </button>
          </div>
        </Modal>
      )}
    </Container>
  );
}

export default Profile;
