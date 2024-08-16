import {
  signInWithEmailAndPassword,
  signOut,
  UserCredential,
} from "firebase/auth";
import { useState, createContext } from "react";
import { auth } from "../services/firebaseConnection";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const AdminContext = createContext({});

interface IUser {
  email: string;
  password?: string;
}

export interface IFirebaseErrors {
  code: string;
  message: string;
}

function AdminProvider({ children }: any): JSX.Element {
  const [user, setUser] = useState<IUser>({ email: "", password: "" });
  const [currentList, setCurrentList] = useState<any>("all");
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  function checkFirebaseError(err: any): void {
    const firebaseErrors: Array<IFirebaseErrors> = [
      { code: "auth/weak-password", message: "Senha muito fraca!" },
      {
        code: "auth/email-already-in-use",
        message: "Este email já foi cadastrado!",
      },
      {
        code: "auth/invalid-credential",
        message: "Email ou Senha inválidos!",
      },
      {
        code: "auth/missing-password",
        message: "Preencha o campo de senha!",
      },
      { code: "auth/wrong-password", message: "Senha incorreta!" },
      {
        code: "auth/too-many-requests",
        message:
          "Acesso temporariamente bloqueado. Tente novamente mais tarde!",
      },
      { code: "auth/user-not-found", message: "Usuário não encontrado!" },
    ];

    firebaseErrors.forEach(
      (currentError: IFirebaseErrors) =>
        currentError.code === err.code && toast.error(currentError.message)
    );
  }

  async function signIn(email: string, password: string): Promise<void> {
    setLoading(true);
    const adminEmail = import.meta.env.VITE_REACT_ADMIN_EMAIL;
    const adminPassword = import.meta.env.VITE_REACT_ADMIN_PASS;

    await signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        if (email === adminEmail && password === adminPassword) {
          setUser({ email });
          storageAdmin({ email });
          navigate("/");
        } else {
          toast.error("Credenciais inválidas");
        }
      })
      .catch((err) => {
        checkFirebaseError(err);
      });
    setLoading(false);
  }

  async function logout(): Promise<void> {
    await signOut(auth)
      .then(() => {
        setUser({ email: "" });
        localStorage.clear();
        navigate("/login");
      })
      .catch((err) => console.log("Erro ao deslogar! " + err));
  }

  function storageAdmin(data: any): void {
    localStorage.setItem("@admin", JSON.stringify(data));
  }

  return (
    <AdminContext.Provider
      value={{
        user,
        signIn,
        logout,
        currentList,
        setCurrentList,
        checkFirebaseError,
        loading,
        setLoading,
        navigate,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
}

export default AdminProvider;
