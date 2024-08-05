import { Navigate } from "react-router-dom";

export default function Private({
  children,
  isReservationPath,
}: {
  children: any;
  isReservationPath?: boolean;
}) {
  const currentUser = localStorage.getItem("@currentUser");

  if (currentUser && !isReservationPath) {
    return <Navigate to="/" />;
  } else if (!currentUser && isReservationPath) {
    return <Navigate to="/login" />;
  }

  return children;
}
