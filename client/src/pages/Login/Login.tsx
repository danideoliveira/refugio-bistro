import Form from "../../components/Form/Form";
import { Container } from "./Login.styled";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { StyledLink } from "../../components/Form/Form.styled";

const schema = z.object({
  email: z
    .string()
    .email("Digite um email válido")
    .min(1, "O email é obrigatório"),
  password: z
    .string()
    .min(3, "A senha deve ter pelo menos 3 caracteres")
    .max(10, "A senha deve ter 10 caracteres"),
});

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: any) => {
    alert("Enviado");
    console.log(data);
  };

  return (
    <>
      <Container>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <h2>Login</h2>

          <div className="box-inputs">
            <div className="input-square">
              <label>Email</label>
              <input {...register("email")} />
              <span className="error">
                {errors?.email?.message?.toString() || ""}
              </span>
            </div>
            <div className="input-square">
              <label>Senha</label>
              <input type="password" {...register("password")} />
              <span className="error">
                {errors?.password?.message?.toString() || ""}
              </span>
            </div>
          </div>

          <div className="submit-square">
            <button>Enviar</button>
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
