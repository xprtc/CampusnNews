import PostsAPI from "@/lib/api/Posts";
import PostFeed from "./PostFeed";
import { verifySession } from "@/lib/session";

export default async function PostFeedWrapper() {
  const posts = await PostsAPI.readAll();
  const session = await verifySession();
  const currentUserId = session?.user?.id ?? null;
  return <PostFeed posts={posts} currentUserId={currentUserId} />;
}
