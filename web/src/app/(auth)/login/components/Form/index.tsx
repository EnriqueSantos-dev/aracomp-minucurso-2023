"use client";

import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { Label } from "@/components/Label";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

import ErrorMessage from "@/components/ErrorMessage";
import { apiInternal } from "@/lib/axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { LogIn } from "lucide-react";
import styles from "./styles.module.css";

const loginSchema = z.object({
  email: z.string().email("Digite um e-mail válido"),
  password: z.string().min(6, "A senha deve ter no mínimo 6 caracteres"),
});

type LoginValues = z.infer<typeof loginSchema>;

export function Form() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = handleSubmit(async (values) => {
    try {
      await apiInternal.post("/api/login", values);
      toast.success("Login realizado com sucesso");
      router.push("/");
    } catch (error) {
      toast.error("Usuário ou senha inválidos");
    }
  });

  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <div>
        <Label>
          Usuário
          <Input placeholder="Digite seu email" {...register("email")} />
        </Label>
        {errors.email?.message && (
          <ErrorMessage message={errors.email.message} />
        )}
      </div>
      <div>
        <Label>
          Senha
          <Input
            type="password"
            placeholder="Digite sua senha"
            {...register("password")}
          />
        </Label>
        {errors.password?.message && (
          <ErrorMessage message={errors.password.message} />
        )}
      </div>

      <Button type="submit" variant="secondary" isLoading={isSubmitting}>
        <LogIn size={20} />
        Login
      </Button>
    </form>
  );
}
