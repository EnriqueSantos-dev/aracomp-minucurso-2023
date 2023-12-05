import Link from "next/link";
import { Form } from "./components/Form";
import styles from "./styles.module.css";

export default function SignUpPage() {
  return (
    <section className={styles["form-container"]}>
      <Form />
      <Link href="/login" className={styles.link}>
        Já possui uma conta? Faça login
      </Link>
    </section>
  );
}
