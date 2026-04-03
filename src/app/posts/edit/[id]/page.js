import PostForm from "@/components/PostForm";
import { updatePost } from "@/actions/postActions";
import PostsAPI from "@/lib/api/Posts";

export default async function EditPostPage({ params }) {
  // 1. ID aus der URL holen
  const { id } = await params;
  
  // 2. Den bestehenden Post aus der Datenbank laden
  const post = await PostsAPI.read(id);

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