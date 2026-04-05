"use client"
import Post from "@/components/Post"
 
/**
 * Displaying all posts. Must be client site because of user interaction formular
 */
export default function PostFeed({ posts, currentUserId }) {
  return (
    <>
      {posts.map((post) => {
        const likedBy = Array.isArray(post.likedBy) ? post.likedBy : [];
        const initialCount = likedBy.length;
        return (
          <section key={post.id}>
            <Post
              title={post.title}
              username={post.username}
              text={post.text}
              id={post.id}
              initialCount={initialCount}
              likedBy={likedBy}
              currentUserId={currentUserId}
              createdAt={post.createdAt}
            />
          </section>
        );
      })}
    </>
  );
}
 
 