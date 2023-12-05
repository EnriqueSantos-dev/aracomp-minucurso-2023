import Link from "next/link";
import { Form } from "./components/Form";
import styles from "./styles.module.css";

export default function LoginPage() {
  return (
    <section className={styles["form-container"]}>
      <Form />
      <Link href="/signup" className={styles.link}>
        Não possui uma conta? Cadastre-se
      </Link>
    </section>
  );
}
