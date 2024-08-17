import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { useState, createContext, useEffect, ReactNode } from "react";
import { auth } from "../services/firebaseConnection";
import { toast } from "react-toastify";
import { NavigateFunction, useNavigate } from "react-router-dom";

export const AdminContext: React.Context<object> = createContext({});

interface IUser {
  email: string;
  password?: string;
}

interface IFirebaseErrors {
  code: string;
  message: string;
}

interface ComponentProps {
  children: ReactNode;
}

function AdminProvider({ children }: ComponentProps): JSX.Element {
  const [user, setUser] = useState<IUser>({ email: "", password: "" });
  const [currentList, setCurrentList] = useState<string>("all");
  const [loading, setLoading] = useState<boolean>(false);
  const navigate: NavigateFunction = useNavigate();

  useEffect(() => {
    function checkLogin() {
      onAuthStateChanged(auth, (user) => {
        if (user?.email) {
          setUser({ email: user.email });
        } else {
          setUser({ email: "" });
          navigate("/login");
        }
      });
    }

    checkLogin();
  }, [navigate]);

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
    const adminEmail: string = import.meta.env.VITE_REACT_ADMIN_EMAIL;
    const adminPassword: string = import.meta.env.VITE_REACT_ADMIN_PASS;

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

  function storageAdmin(data: { email: string }): void {
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
