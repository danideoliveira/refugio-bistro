import { Navigate } from "react-router-dom";

export default function Private({
  children,
  reversePrivate,
}: {
  children: any;
  reversePrivate?: boolean;
}) {
  const currentUser = localStorage.getItem("@currentUser");

  if (currentUser && !reversePrivate) {
    return <Navigate to="/" />;
  } else if (!currentUser && reversePrivate) {
    return <Navigate to="/login" />;
  }

  return children;
}
