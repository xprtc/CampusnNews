import Link from "next/link";
import styles from "./Navigation.module.css";
import { verifySession } from "@/lib/session";
import { logoutAction } from "@/actions/userActions";

export default async function Navigation() {
  const session = await verifySession();
  const isLoggedIn = !!session;

  return (
    <nav className={styles.nav}>
      <Link href="/" className={styles.navLink}>Home</Link>

      {/* Profile nur wenn eingeloggt */}
      {isLoggedIn && (
        <Link href="/profile" className={styles.navLink}>
          Profile
        </Link>
      )}

      {/* Login oder Logout */}
      {!isLoggedIn ? (
        <Link href="/login" className={styles.navLink}>
          Login
        </Link>
      ) : (
        <form action={logoutAction}>
          <button type="submit" className={styles.logoutButton}>
            Logout
          </button>
        </form>
      )}

      {/* Highlight-Button für neuen Post */}
      {
        session ? (<Link 
        href="/posts/create" 
        className={`${styles.navLink} ${styles.createButton}`}
      >
        Neuer Post
      </Link>) : (<Link 
        href="/login" 
        className={`${styles.navLink} ${styles.createButton}`}
      >
        Neuer Post
      </Link>)
      }
    </nav>
  );
}