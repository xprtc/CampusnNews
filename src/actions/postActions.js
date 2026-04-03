"use server"
import PostsAPI from "@/lib/api/Posts";
import { redirect } from "next/navigation";

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
  // SCHRITT 2: Eine Kopie der Schablone erstellen
  let fields = { ...schema };

  // SCHRITT 3: Die Daten aus dem Formular in die Schablone füllen
  // Wir gehen alle Eingabefelder durch. Wenn der Name (z.B. "title") im Schema ist,
  // speichern wir den Wert ab.
  for (const [key, value] of formData.entries()) {
    if (key in schema) {
      fields[key] = value;
    }
  }

  // SCHRITT 4: Die ID bestimmen
  // Wenn wir einen Post bearbeiten, kommt die ID aus dem 'state'.
  // Wenn wir einen neuen Post erstellen, ist sie null.
  const id = state.id || null;

  try {
    // SCHRITT 5: Automatische Daten hinzufügen
    fields.userId = "1"; // Fake-ID (später vom Login)
    fields.username = "admin"; // Fake-Name
    fields.updatedAt = new Date().toISOString(); // Aktueller Zeitstempel

    if (id) {
      // --- FALL A: POST BEARBEITEN (Update) ---
      // 1. Wir holen den alten Post, um das ursprüngliche Erstellungsdatum (createdAt) zu bekommen
      const existingPost = await PostsAPI.read(id);
      fields.createdAt = existingPost.createdAt;
      
      // 2. Wir fügen die ID zum Objekt hinzu, damit die API weiß, welcher Post gemeint ist
      fields.id = id;
      
      // 3. API-Aufruf zum Aktualisieren
      await PostsAPI.update(fields);
    } else {
      // --- FALL B: NEUER POST (Create) ---
      // 1. Neues Erstellungsdatum setzen
      fields.createdAt = new Date().toISOString();
      
      // 2. API-Aufruf zum Erstellen
      await PostsAPI.create(fields);
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
    await PostsAPI.delete(id)
    redirect ("/")
}