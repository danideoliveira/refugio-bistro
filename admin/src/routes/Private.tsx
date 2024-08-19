import { ReactNode, useContext } from "react";
import { Navigate } from "react-router-dom";
import { AdminContext } from "../contexts/authAdmin";

export default function Private({
  children,
  reversePrivate,
}: {
  children: ReactNode;
  reversePrivate?: boolean;
}) {
  const { user } = useContext<any>(AdminContext);

  if (!user.email && reversePrivate) {
    return <Navigate to="/login" />;
  } else if (user.email && !reversePrivate) {
    return <Navigate to="/" />;
  }

  return children;
}
