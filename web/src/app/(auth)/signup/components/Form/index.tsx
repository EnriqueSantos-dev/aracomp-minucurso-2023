"use client";

import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { Label } from "@/components/Label";

import ErrorMessage from "@/components/ErrorMessage";
import { registerUser } from "@/services/auth.service";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import styles from "./styles.module.css";

const registerSchema = z
  .object({
    email: z.string().email("Digite um e-mail válido"),
    username: z
      .string()
      .min(3, "O nome de usuário deve ter no mínimo 3 caracteres"),
    password: z.string().min(6, "A senha deve ter no mínimo 6 caracteres"),
    confirmPassword: z
      .string()
      .min(6, "A senha deve ter no mínimo 6 caracteres"),
  })
  .superRefine(({ password, confirmPassword }, ctx) => {
    if (password !== confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "As senhas não coincidem",
        path: ["confirmPassword"],
      });
      return z.NEVER;
    }
    return true;
  });

type RegisterValues = z.infer<typeof registerSchema>;

export function Form() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = handleSubmit(async (values) => {
    try {
      await registerUser(values);
      toast.success(
        "Usuário criado com sucesso, você será redirecionado para a página de login"
      );
      router.push("/login");
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message);
        return;
      }
      toast.error("Erro ao criar usuário");
    }
  });

  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <div>
        <Label>
          Email
          <Input {...register("email")} placeholder="Digite um email" />
        </Label>
        {errors.email?.message && (
          <ErrorMessage message={errors.email.message} />
        )}
      </div>
      <div>
        <Label>
          Usuário
          <Input {...register("username")} placeholder="Digite seu usuário" />
        </Label>
        {errors.username?.message && (
          <ErrorMessage message={errors.username.message} />
        )}
      </div>
      <div>
        <Label>
          Senha
          <Input
            {...register("password")}
            type="password"
            placeholder="Digite sua senha"
          />
        </Label>
        {errors.password?.message && (
          <ErrorMessage message={errors.password.message} />
        )}
      </div>

      <div>
        <Label>
          Confirmar senha
          <Input
            {...register("confirmPassword")}
            type="password"
            placeholder="Digite sua senha"
          />
        </Label>
        {errors.confirmPassword?.message && (
          <ErrorMessage message={errors.confirmPassword.message} />
        )}
      </div>

      <Button type="submit" variant="secondary" isLoading={isSubmitting}>
        Criar conta
      </Button>
    </form>
  );
}
