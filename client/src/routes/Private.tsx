import { Navigate } from "react-router-dom";

export default function Private({ children }: any) {
  const currentUser = localStorage.getItem("@currentUser");

  if (currentUser) {
    return <Navigate to="/" />;
  }

  return children;
}
