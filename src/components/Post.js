'use client';
import { useState } from 'react';
import Link from 'next/link';
import styles from './Post.module.css';
import { likePostAction } from '@/actions/postActions';

export default function Posts(props) {
  const [likes, setLikes] = useState(props.likes || 0);

  const date = props.createdAt
    ? new Date(props.createdAt).toLocaleDateString('de-CH')
    : '';

  async function handleLike() {
    await likePostAction(props.id, likes);
    setLikes(likes + 1);
  }

  return (
    <div className={styles.card}>
      <img src="/news-icon.png" className={styles.image} alt="logo" width="32" height="32" />
      <h1 className={styles.title}>{props.title}</h1>
      <h3 className={styles.titelKlein}>By {props.username}</h3>
      {date && <p className={styles.date}>📅 {date}</p>}
      <p>{props.text}</p>
      <Link href={`posts/${props.id}`} className={styles.readMore}>
        Read More
      </Link>
      <button onClick={handleLike} className={styles.likeButton}>
        ❤️ {likes}
      </button>
    </div>
  );
}