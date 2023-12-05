import styles from "./styles.module.css";

type ErrorMessageProps = {
  message: string;
};

export default function ErrorMessage({ message }: ErrorMessageProps) {
  return <p className={styles.message}>{message}</p>;
}
