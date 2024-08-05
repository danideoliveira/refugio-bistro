import { doc, getDoc, setDoc } from "firebase/firestore";
import { useState, createContext, useEffect } from "react";
import { toast } from "react-toastify";
import { auth, db } from "../services/firebaseConnection";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext({});

function AuthProvider({ children }: any) {
  const [user, setUser] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function loadUser() {
      const currentUser = localStorage.getItem("@currentUser");
      currentUser && setUser(JSON.parse(currentUser));
    }

    loadUser();
  }, []);

  async function signUp(name: string, email: string, password: string) {
    setLoading(true);

    await createUserWithEmailAndPassword(auth, email, password)
      .then(async (value: any) => {
        const uid = value.user.uid;

        await setDoc(doc(db, "users", uid), {
          name: name.split(" ")[0],
          email,
          reservations: [],
        }).then(() => {
          const data: any = {
            uid,
            name: name.split(" ")[0],
            email,
            reservations: [],
          };

          setUser(data);
          storageUser(data);
          navigate("/login");
          toast.success("Usuário cadastrado com sucesso!");
        });
      })
      .catch((err) => {
        const errors = [
          { code: "auth/weak-password", message: "Senha muito fraca!" },
          { code: "auth/email-already-in-use", message: "Email já existe" },
          {
            code: "auth/invalid-credential",
            message: "Email ou Senha inválido!",
          },
          {
            code: "auth/missing-password",
            message: "Preencha o campo de senha!",
          },
        ];

        errors.forEach((currentError) => {
          currentError.code === err.code && toast.error(currentError.message);
        });
      })
      .finally(() => setLoading(false));
  }

  async function signIn(email: string, password: string) {
    setLoading(true);

    await signInWithEmailAndPassword(auth, email, password)
      .then(async (value: any) => {
        toast.success("Usuário logado!");

        const userRef = doc(db, "users", value.user.uid);

        await getDoc(userRef)
          .then((snapshot) => {
            const snapData = snapshot.data();
            const firstName = snapData?.name.split(" ")[0];

            const data = {
              uid: value.user.uid,
              name: firstName,
              email: snapData?.email,
              reservations: snapData?.reservations,
            };

            setUser(data);
            storageUser(data);
            navigate("/");
          })
          .catch((err) => {
            console.log("Erro ao buscar: " + err);
          });
      })
      .catch((err) => {
        const errors = [
          { code: "auth/weak-password", message: "Senha muito fraca!" },
          {
            code: "auth/email-already-in-use",
            message: "Este email já foi cadastrado!!",
          },
          {
            code: "auth/invalid-credential",
            message: "Email ou Senha inválido!",
          },
          {
            code: "auth/missing-password",
            message: "Preencha o campo de senha!",
          },
        ];

        errors.forEach((currentError) => {
          currentError.code === err.code && toast.error(currentError.message);
        });
      })
      .finally(() => setLoading(false));
  }

  async function logout() {
    await signOut(auth)
      .then(() => {
        setUser("");
        localStorage.clear();
        navigate("/");
      })
      .catch((err) => console.log("Erro ao deslogar! " + err));
  }

  function storageUser(data: any) {
    localStorage.setItem("@currentUser", JSON.stringify(data));
  }

  return (
    <AuthContext.Provider
      value={{ user, setUser, signUp, signIn, logout, loading, setLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
