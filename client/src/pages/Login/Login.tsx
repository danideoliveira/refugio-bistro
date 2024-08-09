import Form from "../../components/Form/Form";
import { Container } from "./Login.styled";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { StyledLink, StyledLoading } from "../../components/Form/Form.styled";
import { useContext } from "react";
import { AuthContext } from "../../contexts/auth";

const schema = z.object({
  email: z
    .string()
    .email("Digite um email válido")
    .min(1, "O email é obrigatório"),
  password: z.string().min(1, "Preencha o campo de senha"),
});

function Login() {
  const { signIn, loading }: any = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: any) => {
    const { email, password }: { email: string; password: string } = data;
    await signIn(email, password);
  };

  return (
    <>
      <Container>
        <Form onSubmit={handleSubmit(onSubmit)} className="form-login">
          <h2>Login</h2>

          <div className="box-inputs">
            <div className="input-square">
              <label>Email</label>
              <input disabled={loading} {...register("email")} />
              <span className="error">
                {errors?.email?.message?.toString() || ""}
              </span>
            </div>
            <div className="input-square">
              <label>Senha</label>
              <input
                disabled={loading}
                type="password"
                {...register("password")}
              />
              <span className="error">
                {errors?.password?.message?.toString() || ""}
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
          </div>
        </Form>
      </Container>
    </>
  );
}

export default Login;
