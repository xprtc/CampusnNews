"use client"
import Post from "@/components/Post"
 
/**
 * Displaying all posts. Must be client site because of user interaction formular
 */
export default function PostFeed({ posts }) {
 
    return (
        <>
        {
            posts.map(post => { //geht mit einer schleife durch die liste der Posts 
                return(
                    <section key={post.id}>
                        <Post
                        title={post.title}
                        username = {post.username}
                        text = {post.text}
                        id={post.id}
                        />
                    </section>
                )
            })
        }
        </>
    )
}
 
 