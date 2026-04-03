import { getJSON, postJSON, putJSON, deleteJSON, BASE_URL } from ".";
const URL = `${BASE_URL}/posts`

/*
 * Posts API manages all post-related operations.
 */
const PostsAPI = {
  readAll() {
    return getJSON(`${URL}?_sort=-createdAt`)
  },

  read(id) {
    return getJSON(`${URL}/${id}`)
  },

  //Neuen Post erstellen
  create(post) {
    return postJSON(URL, post)
  },

  //Bestehenden Post aktualisieren
  update(post) {
    // Hier nutzen wir die ID des Posts, um den richtigen Endpunkt anzusprechen
    return putJSON(`${URL}/${post.id}`, post)
  },

  //Post löschen
  delete(id) {
    // Zum Löschen wird nur die ID an die URL angehängt
    return deleteJSON(`${URL}/${id}`)
  }
}

export default PostsAPI