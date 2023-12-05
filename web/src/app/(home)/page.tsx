import { me } from "@/services/auth.service";
import { cookies } from "next/headers";
import Image from "next/image";
import styles from "./style.module.css";
import { redirect } from "next/navigation";
import { Button } from "@/components/Button";

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
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="lucide lucide-log-out"
            viewBox="0 0 24 24"
          >
            <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"></path>
            <path d="M16 17L21 12 16 7"></path>
            <path d="M21 12L9 12"></path>
          </svg>
          Sair
        </Button>
      </form>
    </main>
  );
}
