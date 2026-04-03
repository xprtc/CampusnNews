import PostsAPI from "@/lib/api/Posts"
import  PostFeed  from "./PostFeed"

export default async function PostFeedWrapper() {
    const posts = await PostsAPI.readAll() //wrapper wartet kurz, bis die daten vom API-Server geliefert wurden
    return <PostFeed posts={posts} />
}
