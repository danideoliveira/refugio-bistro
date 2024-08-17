import { ReactNode, useContext } from "react";
import { Navigate } from "react-router-dom";
import { AdminContext } from "../contexts/authAdmin";
import { StyledLoading } from "../components/Form/Form.styled";

export default function Private({
  children,
  reversePrivate,
}: {
  children: ReactNode;
  reversePrivate?: boolean;
}) {
  const { user } = useContext<any>(AdminContext);

  if (!user.email) {
    return (
      <div
        style={{
          width: "100%",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "#fff",
          fontSize: "3rem",
          gap: "2rem",
        }}
      >
        <StyledLoading />
        Carregando...
      </div>
    );
  }

  if (!user.email && reversePrivate) {
    return <Navigate to="/login" />;
  } else if (user.email && !reversePrivate) {
    return <Navigate to="/" />;
  }

  return children;
}
