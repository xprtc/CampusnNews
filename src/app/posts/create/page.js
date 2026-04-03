import PostForm from "@/components/PostForm";
import { updatePost } from "@/actions/postActions";
import styles from "./page.module.css";

export default function CreatePostPage() {
  return (
    <main className={styles.main}>
      <h1 className={styles.title}>Neuen Post erstellen</h1>
      <PostForm 
        action={updatePost} 
        id={null} 
        title="" 
        text="" 
      />
    </main>
  );
}