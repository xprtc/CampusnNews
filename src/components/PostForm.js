"use client"
import { useActionState } from "react"; 
import styles from "./PostForm.module.css";

export default function PostForm(props) {

  // Wir erhalten state, die auszuführende action und den pending-Status
  const [state, action, pending] = useActionState(props.action, {
    id: props.id,
    data: { 
        title: props.title, 
        text: props.text 
    }
  });

  return (
    <div className={styles['form-container-styling']}>
        {/* Formular mit der action aus dem Hook verbinden */}
        <form action={action} noValidate>
            <div>
                <label htmlFor="title">Title</label>
                <input 
                  id="title" 
                  name="title" 
                  // DefaultValue aus dem state (wichtig für Fehlermeldungen/Bearbeiten)
                  defaultValue={state?.data?.title} 
                />
            </div>
            <div>
                <label htmlFor="text">Text</label>
                <textarea 
                  id="text" 
                  name="text" 
                  // Hier nutzen wir state.data.text wie im initialState definiert
                  defaultValue={state?.data?.text} 
                />
            </div>

            {/* Button deaktivieren, während die Aktion läuft (pending) */}
            <button 
                className="button" 
                type="submit" 
                disabled={pending}
            >
                {pending ? "Wird gespeichert..." : "Post speichern"}
            </button>
            
            {state?.message && (
                <div className={styles.message}>
                    <p>{state.message}</p>
                </div>
            )}
        </form>
    </div>
  );
}