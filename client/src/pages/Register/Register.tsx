import Form from "../../components/Form/Form";
import { Container } from "./Register.styled";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { StyledLink, StyledLoading } from "../../components/Form/Form.styled";
import { useContext } from "react";
import { AuthContext } from "../../contexts/auth";
import { validateCPF } from "../../helpers/validateCpf";
import { toast } from "react-toastify";

const schema: z.ZodSchema = z.object({
  name: z
    .string()
    .min(1, "O campo nome é obrigatório.")
    .max(50, "Quantidade de caracteres excedida"),
  email: z
    .string()
    .email("Digite um email válido")
    .min(1, "O email é obrigatório"),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
  cpf: z.string().refine((cpf) => validateCPF(cpf), {
    message: "CPF inválido",
  }),
  phone: z
    .string()
    .regex(
      /^\(?\d{2}\)?[-.\s]?\d{5}[-.\s]?\d{4}$/,
      "Digite um número de celular válido",
    ),
});

function Register(): JSX.Element {
  const { signUp, loading }: any = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  async function onSubmit(data: any): Promise<void> {
    const { name, cpf, email, phone, password } = data;

    if (name.split(" ").length === 1) {
      toast.error("Digite o seu sobrenome");
    } else {
      await signUp(name.toUpperCase(), cpf, email, phone, password);
    }
  }

  return (
    <>
      <Container>
        <Form onSubmit={handleSubmit(onSubmit)} className="form-register">
          <h2>Cadastre-se</h2>

          <div className="box-inputs">
            <div className="input-square full">
              <label>Nome</label>
              <input {...register("name")} />
              <span
                className="error"
                style={{
                  visibility: errors?.name?.message?.toString()
                    ? "visible"
                    : "hidden",
                }}
              >
                {errors?.name?.message?.toString() || "default"}
              </span>
            </div>

            <div className="input-square">
              <label>CPF</label>
              <input type="number" {...register("cpf")} />
              <span
                className="error"
                style={{
                  visibility: errors?.cpf?.message?.toString()
                    ? "visible"
                    : "hidden",
                }}
              >
                {errors?.cpf?.message?.toString() || "default"}
              </span>
            </div>

            <div className="input-square">
              <label>Email</label>
              <input {...register("email")} />
              <span
                className="error"
                style={{
                  visibility: errors?.email?.message?.toString()
                    ? "visible"
                    : "hidden",
                }}
              >
                {errors?.email?.message?.toString() || "default"}
              </span>
            </div>

            <div className="input-square">
              <label>Telefone</label>
              <input type="number" {...register("phone")} />
              <span
                className="error"
                style={{
                  visibility: errors?.phone?.message?.toString()
                    ? "visible"
                    : "hidden",
                }}
              >
                {errors?.phone?.message?.toString() || "default"}
              </span>
            </div>

            <div className="input-square">
              <label>Senha</label>
              <input type="password" {...register("password")} />
              <span
                className="error"
                style={{
                  visibility: errors?.password?.message?.toString()
                    ? "visible"
                    : "hidden",
                }}
              >
                {errors?.password?.message?.toString() || "default"}
              </span>
            </div>
          </div>

          <div className="submit-square">
            <button> {!loading ? "Cadastrar" : <StyledLoading />}</button>
            <StyledLink to="/login">
              Já possui uma conta? Faça login!
            </StyledLink>
          </div>
        </Form>
      </Container>
    </>
  );
}

export default Register;
