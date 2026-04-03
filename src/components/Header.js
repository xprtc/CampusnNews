import Navigation from "./Navigation";
import Image from "next/image";
import styles from "./Header.module.css";
import Link from "next/link";
export default function Header() {
  return (
    <header className={styles.header}>

      <div className={styles.logoContainer}>
        <Link href="/"><Image 
          src="/logo_campnews.png" 
          alt="Logo" 
          width={40} 
          height={40} 
        /></Link>
      </div>

      <h1 className={styles.headerTitle}>Campus News</h1>

      <Navigation />
    </header>
  );
}