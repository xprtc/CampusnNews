import { getJSON, postJSON, putJSON, deleteJSON, BASE_URL } from ".";
const URL = `${BASE_URL}/posts`

const PostsAPI = {
  readAll() {
    return getJSON(`${URL}?_sort=-createdAt`)
  },

  read(id) {
    return getJSON(`${URL}/${id}`)
  },

  create(post) {
    return postJSON(URL, post)
  },

  update(post) {
    return putJSON(`${URL}/${post.id}`, post)
  },

  delete(id) {
    return deleteJSON(`${URL}/${id}`)
  },

async like(id, currentLikes, accessToken) {
  const post = await getJSON(`${URL}/${id}`, accessToken);
  return putJSON(`${URL}/${id}`, { ...post, likes: (currentLikes || 0) + 1 }, accessToken);
}
}

export default PostsAPI