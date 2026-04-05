"use server"
import PostsAPI from "@/lib/api/Posts";
import { redirect } from "next/navigation";
import { verifySession } from "@/lib/session";

// SCHRITT 1: Das leere Schema definieren
// Das ist die "Schablone". Alles was hier steht, landet später in der db.json.
const schema = {
  title: "",
  text: "",
  createdAt: "",
  updatedAt: "",
  userId: "",
  username: ""
};

export async function updatePost(state, formData) {
  const session = await verifySession();
  if (!session) {
    return {
      id: state?.id ?? null,
      data: Object.fromEntries(formData),
      message: "Bitte einloggen, um den Post zu speichern.",
    };
  }

  let fields = { ...schema };

  for (const [key, value] of formData.entries()) {
    if (key in schema) {
      fields[key] = value;
    }
  }

  const id = state.id || null;
  const token = session.accessToken;
  const now = new Date().toISOString();

  try {
    fields.updatedAt = now;

    if (id) {
      const existingPost = await PostsAPI.read(id, token);
      if (String(existingPost.userId) !== String(session.user.id)) {
        return {
          id,
          data: { title: fields.title, text: fields.text },
          message: "Du darfst diesen Post nicht bearbeiten.",
        };
      }
      const merged = {
        ...existingPost,
        title: fields.title,
        text: fields.text,
        updatedAt: now,
      };
      await PostsAPI.update(merged, token);
    } else {
      fields.createdAt = now;
      fields.userId = String(session.user.id);
      fields.username = session.user.username ?? "user";
      await PostsAPI.create(
        {
          ...fields,
          likedBy: [],
          likes: 0,
        },
        token
      );
    }
  } catch (error) {
    // SCHRITT 6: Fehler abfangen
    // Falls etwas schiefgeht, schicken wir die Daten zurück an das Formular,
    // damit der User seinen Text nicht verliert.
    return {
      id: id,
      data: fields,
      message: "Ein Problem ist beim Speichern aufgetreten."
    };
  }

  // SCHRITT 7: Erfolgreich fertig? Dann zurück zur Startseite!
  // Wichtig: redirect muss außerhalb vom try/catch stehen.
  redirect("/");
}

export async function deletePostAction(id) {
  const session = await verifySession();
  if (!session) {
    return;
  }
  await PostsAPI.delete(id, session.accessToken);
  redirect("/");
}

export async function toggleLikeAction(postId) {
  const session = await verifySession();
  if (!session) {
    return { ok: false };
  }
  const { liked, count } = await PostsAPI.toggleLike(
    postId,
    session.accessToken,
    session.user.id
  );
  return { ok: true, liked, count };
}