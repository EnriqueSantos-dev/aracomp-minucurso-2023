import { me } from "@/services/auth.service";
import { cookies } from "next/headers";
import Image from "next/image";
import styles from "./style.module.css";
import { redirect } from "next/navigation";
import { Button } from "@/components/Button";
import { LogOut } from "lucide-react";

export default async function Home() {
  const token = cookies().get("access_token")?.value;
  const user = await me(token as string);

  async function logout() {
    "use server";
    cookies().delete("access_token");
    redirect("/login");
  }

  return (
    <main className={styles.container}>
      <div className={styles["image-container"]}>
        <Image src="/aracomp-logo.png" alt="Aracomp logo" fill priority />
      </div>
      <p>Parabéns, {user.username}</p>
      <form action={logout}>
        <Button type="submit" variant="secondary">
          <LogOut size={20} />
          Sair
        </Button>
      </form>
    </main>
  );
}
