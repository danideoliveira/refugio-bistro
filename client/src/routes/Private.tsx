import { ReactNode, useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../contexts/auth";
import Loading from "../components/Loading/Loading";

export default function Private({
  children,
  reversePrivate,
}: {
  children: ReactNode;
  reversePrivate?: boolean;
}) {
  const { user } = useContext<any>(AuthContext);
  const userLocalStorage = localStorage.getItem("@currentUser");

  if (userLocalStorage && !user) {
    return <Loading />;
  }

  if (user && !reversePrivate) {
    return <Navigate to="/" />;
  } else if (!user && reversePrivate) {
    return <Navigate to="/login" />;
  }

  return children;
}
