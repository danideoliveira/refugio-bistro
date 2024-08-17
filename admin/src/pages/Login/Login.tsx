import Form from "../../components/Form/Form";
import { Container } from "./Login.styled";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { StyledLoading } from "../../components/Form/Form.styled";
import { useContext } from "react";
import { AdminContext } from "../../contexts/authAdmin";

const loginSchema: z.ZodSchema = z.object({
  email: z
    .string()
    .email("Digite um email válido")
    .min(1, "O email é obrigatório"),
  password: z.string().min(1, "Preencha o campo de senha"),
});

function Login(): JSX.Element {
  const { signIn, loading }: any = useContext(AdminContext);

  const {
    register: loginRegister,
    handleSubmit: handleLoginSubmit,
    formState: { errors: loginErrors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmitLogin = async (data: any): Promise<void> => {
    const { email, password }: { email: string; password: string } = data;
    await signIn(email, password);
  };

  return (
    <>
      <Container>
        <Form
          onSubmit={handleLoginSubmit(onSubmitLogin)}
          className="form-login"
        >
          <h2>Login</h2>

          <div className="box-inputs">
            <div className="input-square">
              <label>Email</label>
              <input disabled={loading} {...loginRegister("email")} />
              <span className="error">
                {loginErrors?.email?.message?.toString() || ""}
              </span>
            </div>
            <div className="input-square">
              <label>Senha</label>
              <input
                disabled={loading}
                type="password"
                {...loginRegister("password")}
              />
              <span className="error">
                {loginErrors?.password?.message?.toString() || ""}
              </span>
            </div>
          </div>

          <div className="submit-square">
            <button disabled={loading}>
              {!loading ? "Enviar" : <StyledLoading />}
            </button>
          </div>
        </Form>
      </Container>
    </>
  );
}

export default Login;
