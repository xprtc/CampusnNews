import { getJSON, postJSON, putJSON, deleteJSON, BASE_URL } from ".";
const URL = `${BASE_URL}/posts`

const PostsAPI = {
  readAll() {
    return getJSON(`${URL}?_sort=-createdAt`)
  },

  read(id, accessToken = null) {
    return getJSON(`${URL}/${id}`, accessToken);
  },

  create(post, accessToken = null) {
    return postJSON(URL, post, accessToken);
  },

  update(post, accessToken = null) {
    return putJSON(`${URL}/${post.id}`, post, accessToken);
  },

  delete(id, accessToken = null) {
    return deleteJSON(`${URL}/${id}`, accessToken);
  },

  async toggleLike(id, accessToken, userId) {
    const post = await getJSON(`${URL}/${id}`, accessToken);
    const uid = String(userId);
    let likedBy = Array.isArray(post.likedBy)
      ? post.likedBy.map(String)
      : [];
    const idx = likedBy.indexOf(uid);
    if (idx >= 0) {
      likedBy = likedBy.filter((x) => x !== uid);
    } else {
      likedBy = [...likedBy, uid];
    }
    const next = {
      ...post,
      likedBy,
      likes: likedBy.length,
      updatedAt: new Date().toISOString(),
    };
    await putJSON(`${URL}/${id}`, next, accessToken);
    return { liked: idx < 0, count: likedBy.length };
  }
}

export default PostsAPI