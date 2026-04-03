import Link from "next/link";
import Image from "next/image";
import styles from "./Post.module.css";
 
export default function Posts(props) {
  return (
    <div className={styles.card}>
      <img src="/news-icon.png" className={styles.image} alt="logo" width="32" height="32"></img>
      <h1 className={styles.title}>{props.title}</h1>
      <h3 className={styles.titelKlein}>By {props.username}</h3>
      <p>
          {props.text}
      </p>
      <Link href={`posts/${props.id}`} className={styles.readMore}>
        Read More
      </Link>
    </div>
  );
}
 