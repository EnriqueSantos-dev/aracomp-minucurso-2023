import React from "react";
import styles from "./layout.module.css";
import Image from "next/image";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className={styles.container}>
      {children}
      <section className={styles["image-container"]}>
        <Image src="/aracomp-logo.png" alt="Logo do Arapcomp" fill priority />
      </section>
    </main>
  );
}
