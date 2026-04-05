import { Suspense } from "react";
import LoginForm from "@/components/LoginForm";
import styles from "./login.module.css";

export default function LoginPage() {
  return (
    <main className={styles.container}>
      <h1 className={styles.title}>Login</h1>
      <Suspense fallback={<p className={styles.title}>…</p>}>
        <LoginForm />
      </Suspense>
    </main>
  );
}