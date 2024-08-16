import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AdminContext } from "../contexts/authAdmin";

export default function Private({
  children,
  reversePrivate,
}: {
  children: any;
  reversePrivate?: boolean;
}) {
  // const { user } = useContext<any>(AdminContext);
  const currentUser: string | null = localStorage.getItem("@admin");

  if (!currentUser && reversePrivate) {
    return <Navigate to="/login" />;
  } else if (currentUser && !reversePrivate) {
    return <Navigate to="/" />;
  }

  return children;
}
