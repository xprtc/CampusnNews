import PostAPI from "@/lib/api/Posts";
import styles from "./DetailPost.module.css";
import PostFunctions from "@/components/PostFunction";
import { verifySession } from "@/lib/session";

export default async function PostDetailsPage({params}){

    const {id} = await params; //ID aus den Params auslesen

    const post = await PostAPI.read(id); //Post mit dieser ID laden
    
    const session = await verifySession()
    const userId = session?.user?.id ?? null;

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                //untendran werden die daten im return ausgeben

                <h2>{post.title}</h2> 
                
                <p>Von: {post.username} | Am: {post.createdAt}</p>
                
                <p>{post.text}</p>
            </div>
            <div>
                <PostFunctions id={post.id} post={post} userId={userId}/>
            </div>
        </div>
    );
}
