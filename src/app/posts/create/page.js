import PostForm from "@/components/PostForm";
import { updatePost } from "@/actions/postActions";
import styles from "./page.module.css";
import { verifySession } from "@/lib/session";
import { redirect } from "next/navigation";

export default async function CreatePostPage() {
  const session = await verifySession();
  if (!session) {
    redirect("/login");
  }

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