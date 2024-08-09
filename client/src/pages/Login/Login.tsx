import Form from "../../components/Form/Form";
import { Container } from "./Login.styled";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { StyledLink, StyledLoading } from "../../components/Form/Form.styled";
import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/auth";
import Modal from "../../components/Modal/Modal";

const loginSchema = z.object({
  email: z
    .string()
    .email("Digite um email válido")
    .min(1, "O email é obrigatório"),
  password: z.string().min(1, "Preencha o campo de senha"),
});

const resetPasswordSchema = z.object({
  emailReset: z
    .string()
    .email("Digite um email válido")
    .min(1, "O email é obrigatório"),
});

function Login() {
  const { signIn, loading, resetPassword }: any = useContext(AuthContext);
  const [showModal, setShowModal] = useState<boolean>(false);

  const {
    register: loginRegister,
    handleSubmit: handleLoginSubmit,
    formState: { errors: loginErrors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const {
    register: resetRegister,
    handleSubmit: handleResetSubmit,
    formState: { errors: resetErrors },
  } = useForm({
    resolver: zodResolver(resetPasswordSchema),
  });

  const onSubmitLogin = async (data: any) => {
    const { email, password }: { email: string; password: string } = data;
    await signIn(email, password);
  };

  const onSubmitResetPassword = async (data: any) => {
    resetPassword(data.emailReset);
    setShowModal(false);
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
            <StyledLink to="/register">
              Ainda não possui uma conta? Cadastre-se!
            </StyledLink>
            <span
              className="button-reset-password"
              onClick={() => setShowModal(!showModal)}
            >
              Esqueceu sua senha?
            </span>
          </div>
        </Form>

        <Modal
          condition={showModal}
          setCondition={setShowModal}
          className="modal-reset-password"
        >
          <Form
            onSubmit={handleResetSubmit(onSubmitResetPassword)}
            className="form-reset-password"
          >
            <h2 className="small">Digite seu email para recuperação</h2>
            <div className="box-inputs">
              <div className="input-square">
                <label>Email</label>
                <input disabled={loading} {...resetRegister("emailReset")} />
                <span className="error">
                  {resetErrors?.emailReset?.message?.toString() || ""}
                </span>
              </div>
            </div>

            <div className="submit-square">
              <button disabled={loading}>
                {!loading ? "Enviar" : <StyledLoading />}
              </button>
            </div>
          </Form>
        </Modal>
      </Container>
    </>
  );
}

export default Login;
