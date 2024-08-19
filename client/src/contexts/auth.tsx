import {
  collection,
  CollectionReference,
  deleteDoc,
  doc,
  DocumentData,
  DocumentReference,
  DocumentSnapshot,
  getDoc,
  getDocs,
  orderBy,
  Query,
  query,
  QueryDocumentSnapshot,
  QuerySnapshot,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { useState, createContext, useEffect, ReactNode } from "react";
import { toast } from "react-toastify";
import { auth, db } from "../services/firebaseConnection";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  reauthenticateWithCredential,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  updateEmail,
  User,
  UserCredential,
} from "firebase/auth";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { formatCPF } from "../helpers/validateCpf";
import { EmailAuthProvider } from "firebase/auth/web-extension";

export const AuthContext: React.Context<object> = createContext({});

interface IUserData {
  uid?: string;
  name: string;
  cpf?: string;
  email: string;
  phone?: string;
  password?: string;
  reservations: Array<object>;
}

interface ComponentProps {
  children: ReactNode;
}

interface IFirebaseErrors {
  code: string;
  message: string;
}

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
      message: "Acesso temporariamente bloqueado. Tente novamente mais tarde!",
    },
    { code: "auth/user-not-found", message: "Usuário não encontrado!" },
  ];

  firebaseErrors.forEach((currentError: IFirebaseErrors) => {
    currentError.code === err.code && toast.error(currentError.message);
  });
}

function AuthProvider({ children }: ComponentProps): JSX.Element {
  const [user, setUser] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);
  const navigate: NavigateFunction = useNavigate();

  useEffect(() => {
    function checkLogin(): void {
      onAuthStateChanged(auth, async (user: User | null) => {
        if (user) {
          const docRef: DocumentReference = doc(db, "users", user.uid);

          await getDoc(docRef)
            .then((snapshot: DocumentSnapshot) => {
              const snapData: DocumentData | undefined = snapshot.data();
              const data: IUserData = {
                uid: user.uid,
                name: snapData?.name,
                cpf: snapData?.cpf,
                email: snapData?.email,
                reservations: snapData?.reservations,
              };
              localStorage.clear();
              storageUser(data);
              setUser(data);
            })
            .catch((err) => {
              console.log("Erro ao buscar: " + err);
            });
        }
      });
    }

    checkLogin();
  }, []);

  async function duplicatedCPF(cpf: string): Promise<boolean> {
    const collectionRef: CollectionReference = collection(db, "users");
    const formattedCPF: string = formatCPF(cpf);

    const q: Query = query(
      collectionRef,
      orderBy("name", "desc"),
      where("cpf", "==", formattedCPF),
    );

    const querySnapshot: boolean = await getDocs(q).then(
      (snapshot: QuerySnapshot) => {
        let isDuplicated: boolean = false;

        snapshot.forEach((doc: QueryDocumentSnapshot) => {
          if (formatCPF(doc.data().cpf) === formattedCPF) {
            isDuplicated = true;
            return;
          }
        });
        return isDuplicated;
      },
    );
    return querySnapshot;
  }

  async function signUp(
    name: string,
    cpf: string,
    email: string,
    phone: string,
    password: string,
  ): Promise<void> {
    setLoading(true);

    if (await duplicatedCPF(cpf)) {
      toast.error("Este CPF já foi cadastrado!");
      setLoading(false);
      return;
    } else {
      await createUserWithEmailAndPassword(auth, email, password)
        .then(async (value: UserCredential) => {
          const uid: string = value.user.uid;

          await setDoc(doc(db, "users", uid), {
            name,
            email,
            cpf: formatCPF(cpf),
            phone,
            reservations: [],
          }).then(() => {
            const data: IUserData = {
              uid,
              cpf,
              name,
              email,
              reservations: [],
            };

            setUser(data);
            storageUser(data);
            navigate("/");
            toast.success("Usuário cadastrado com sucesso!");
          });
        })
        .catch((err) => {
          checkFirebaseError(err);
        })
        .finally(() => setLoading(false));
    }
    setLoading(false);
  }

  async function signIn(email: string, password: string): Promise<void> {
    setLoading(true);

    await signInWithEmailAndPassword(auth, email, password)
      .then(async (value: UserCredential) => {
        const userRef: DocumentReference = doc(db, "users", value.user.uid);

        await getDoc(userRef)
          .then((snapshot: DocumentSnapshot) => {
            const snapData = snapshot.data();

            const data: IUserData = {
              uid: value.user.uid,
              name: snapData?.name,
              cpf: snapData?.cpf,
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
        checkFirebaseError(err);
      })
      .finally(() => setLoading(false));
  }

  async function logout(): Promise<void> {
    await signOut(auth)
      .then(() => {
        setUser("");
        localStorage.clear();
        navigate("/");
      })
      .catch((err) => console.log("Erro ao deslogar! " + err));
  }

  function storageUser(data: any): void {
    localStorage.setItem("@currentUser", JSON.stringify(data));
  }

  async function deleteAccount(password: string): Promise<void> {
    setLoading(true);
    const currentUser: User | null = auth.currentUser;

    try {
      if (currentUser) {
        const credential = EmailAuthProvider.credential(
          currentUser.email!,
          password,
        );

        await reauthenticateWithCredential(currentUser, credential);

        currentUser
          ?.delete()
          .then(async () => {
            const docRef: DocumentReference = doc(db, "users", user?.uid);
            await deleteDoc(docRef);
            setUser("");
            localStorage.clear();
            navigate("/");
          })
          .catch((err) => {
            console.log("Erro ao excluir a conta: " + err);
            toast.error("Erro ao excluir a conta.");
          });
      }
    } catch (err: any) {
      checkFirebaseError(err);
    } finally {
      setLoading(false);
    }
  }

  const updateUser = async (
    password: string,
    newName: string,
    newEmail: string,
    newPhone: string,
  ): Promise<void> => {
    setLoading(true);
    try {
      if (auth.currentUser) {
        const credential = EmailAuthProvider.credential(
          auth.currentUser.email!,
          password,
        );

        await reauthenticateWithCredential(auth.currentUser, credential);
        await updateEmail(auth.currentUser, newEmail);
      }

      const docRef: DocumentReference = doc(db, "users", user.uid);
      await updateDoc(docRef, {
        name: newName,
        email: newEmail,
        phone: newPhone,
      });

      setUser((prev: any) => ({
        ...prev,
        name: newName,
        email: newEmail,
        phone: newPhone,
      }));

      localStorage.setItem(
        "@currentUser",
        JSON.stringify({
          ...user,
          name: newName,
          email: newEmail,
          phone: newPhone,
        }),
      );

      toast.success("Perfil atualizado com sucesso!");
    } catch (err: any) {
      checkFirebaseError(err);
    } finally {
      setLoading(false);
    }
  };

  async function resetPassword(email: string): Promise<void> {
    setLoading(true);
    try {
      await sendPasswordResetEmail(auth, email);
      toast.info(`E-mail de redefinição de senha enviado para ${email}`);
    } catch (err) {
      checkFirebaseError(err);
      console.log("Erro ao resetar senha: " + err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        signUp,
        signIn,
        logout,
        loading,
        setLoading,
        deleteAccount,
        checkFirebaseError,
        updateUser,
        resetPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
