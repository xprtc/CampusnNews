import styles from "./page.module.css";
import PostFeedWrapper from "@/components/PostFeedWrapper";

export default function Page() {
  return (
    <div>
      <h1 className={styles.titelposts}> Posts</h1>
          <div className={styles.mainContainer}>
      {/* Der Wrapper kümmert sich allein um das Laden der Posts */}
      <div className={styles.gridPost}>
        <PostFeedWrapper />
      </div>
    </div>
    </div>

  );
}