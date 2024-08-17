import { ReactNode, useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../contexts/auth";

export default function Private({
  children,
  reversePrivate,
}: {
  children: ReactNode;
  reversePrivate?: boolean;
}) {
  const { user } = useContext<any>(AuthContext);

  if (user?.email && !reversePrivate) {
    return <Navigate to="/" />;
  } else if (!user?.email && reversePrivate) {
    return <Navigate to="/login" />;
  }

  return children;
}
