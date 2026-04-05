'use client';
import { useCallback, useRef, useState } from 'react';
import Link from 'next/link';
import styles from './Post.module.css';
import { toggleLikeAction } from '@/actions/postActions';

const DOUBLE_TAP_MS = 320;

function userHasLiked(likedBy, currentUserId) {
  if (currentUserId == null) return false;
  const uid = String(currentUserId);
  return (Array.isArray(likedBy) ? likedBy : []).map(String).includes(uid);
}

export default function Posts(props) {
  const [count, setCount] = useState(props.initialCount ?? 0);
  const [liked, setLiked] = useState(
    userHasLiked(props.likedBy, props.currentUserId)
  );
  const [burst, setBurst] = useState(false);
  const lastTapRef = useRef(0);

  const date = props.createdAt
    ? new Date(props.createdAt).toLocaleDateString('de-CH')
    : '';

  const canLike = props.currentUserId != null;

  const showBurstAnim = useCallback(() => {
    setBurst(true);
    window.setTimeout(() => setBurst(false), 850);
  }, []);

  async function applyToggleResult() {
    const result = await toggleLikeAction(props.id);
    if (result?.ok) {
      setCount(result.count);
      setLiked(result.liked);
    }
  }

  /** Herz-Button: Like an/aus (wie bisher). */
  async function handleLikeClick() {
    if (!canLike) return;
    await applyToggleResult();
  }

  /**
   * Doppeltipp / Doppelklick auf den Post: wie Instagram — neues Like setzen + großes Herz.
   * Bereits geliked: nur Animation, kein Unlike.
   */
  async function handleDoubleLike() {
    if (!canLike) return;
    showBurstAnim();
    if (!liked) {
      await applyToggleResult();
    }
  }

  function onTouchEnd(e) {
    if (!canLike) return;
    const now = Date.now();
    if (now - lastTapRef.current < DOUBLE_TAP_MS) {
      e.preventDefault();
      lastTapRef.current = 0;
      void handleDoubleLike();
    } else {
      lastTapRef.current = now;
    }
  }

  function onDoubleClick(e) {
    e.preventDefault();
    void handleDoubleLike();
  }

  return (
    <div className={styles.card}>
      <div
        className={styles.doubleTapZone}
        onDoubleClick={onDoubleClick}
        onTouchEnd={onTouchEnd}
      >
        {burst && (
          <div className={styles.burstWrap} aria-hidden>
            <svg
              className={styles.burstHeart}
              viewBox="0 0 24 24"
              width="96"
              height="96"
            >
              <path
                fill="white"
                d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
              />
            </svg>
          </div>
        )}
        <div className={styles.mediaBlock}>
          <img
            src="/news-icon.png"
            className={styles.image}
            alt=""
            width="72"
            height="72"
            draggable={false}
          />
        </div>
        <h1 className={styles.title}>{props.title}</h1>
        <h3 className={styles.titelKlein}>By {props.username}</h3>
        {date && <p className={styles.date}>📅 {date}</p>}
        <p className={styles.bodyText}>{props.text}</p>
      </div>

      <div className={styles.cardFooter}>
        <Link href={`posts/${props.id}`} className={styles.readMore}>
          Read More
        </Link>
        <button
          type="button"
          onClick={handleLikeClick}
          disabled={!canLike}
          className={styles.likeButton}
          aria-pressed={liked}
          aria-label={liked ? 'Like entfernen' : 'Like hinzufügen'}
        >
          <svg
            className={styles.heartSvg}
            viewBox="0 0 24 24"
            width="26"
            height="26"
            aria-hidden
          >
            <path
              className={liked ? styles.heartFilled : styles.heartStroke}
              d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
            />
          </svg>
          <span className={styles.likeCount}>{count}</span>
        </button>
      </div>
    </div>
  );
}
