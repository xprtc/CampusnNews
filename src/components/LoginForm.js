"use client";

import { useActionState } from "react";
import { useSearchParams } from "next/navigation";
import { loginAction } from "@/actions/userActions";
import styles from "./LoginForm.module.css";

export default function LoginForm() {
  const searchParams = useSearchParams();
  
  // Aufgabe 7b: Initialisiere useActionState [cite: 348, 349]
  const [state, action, pending] = useActionState(loginAction, {
    url: searchParams.get("redirect") ?? undefined,
  });

  return (
    <form action={action} className={styles.form} noValidate>
      <div className={styles.inputGroup}>
        <label className={styles.label} htmlFor="email">Email address</label>
        <input 
          className={styles.inputField}
          id="email" 
          name="email" 
          type="email" 
          defaultValue={state?.email} 
        />
        {/* Validierungsfehler anzeigen [cite: 353, 354] */}
        {state?.errors?.email && <p className={styles.error}>{state?.errors?.email}</p>}
      </div>

      <div className={styles.inputGroup}>
        <label className={styles.label} htmlFor="password">Password</label>
        <input 
          className={styles.inputField}
          id="password" 
          name="password" 
          type="password" 
        />
        {state?.errors?.password && <p className={styles.error}>{state?.errors?.password}</p>}
      </div>

      {state?.message && <p className={styles.message}>{state.message}</p>}

      <button className={styles.submitButton} disabled={pending} type="submit">
        log in
      </button>
    </form>
  );
}