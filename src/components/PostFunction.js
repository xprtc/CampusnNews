"use client"

import Link from "next/link";
import { deletePostAction } from "@/actions/postActions"; // Import für Aufgabe 7

export default function PostFunctions(props) {
    const id = props.id;

    const userId = props.userId
    const post = props.post

    const isOwner = userId && String(userId) === String(post.userId)

    // Diese Funktion brauchen wir für Aufgabe 7 (Löschen)
    async function handleDelete(id) {
        if (confirm("Möchtest du diesen Post wirklich löschen?")) {
            await deletePostAction(id);
        }
    }

    return (
        <div className="post-functions">
            {/* Zurück zur Übersicht */}
            <Link href={"/"} className="button">Back</Link>

            {
                isOwner ? (
            <>
            <Link href={`/posts/edit/${id}`} className="button">
                Edit
            </Link>

            <button onClick={() => handleDelete(id)} className="button-delete">
                Delete
            </button>
            </>) : (<></>)
            }

        </div>
    );
}