import PostForm from "@/components/PostForm";
import { updatePost } from "@/actions/postActions";
import PostsAPI from "@/lib/api/Posts";
import { verifySession } from "@/lib/session";
import { redirect } from "next/navigation";

export default async function EditPostPage({ params }) {
  const session = await verifySession();
  if (!session) {
    redirect("/login");
  }

  const { id } = await params;

  const post = await PostsAPI.read(id, session.accessToken);

  return (
    <main>
      <h1>Post bearbeiten</h1>
      {/* 3. Das Formular mit den geladenen Daten füllen */}
      <PostForm 
        action={updatePost} 
        id={post.id} 
        title={post.title} 
        text={post.text} 
      />
    </main>
  );
}