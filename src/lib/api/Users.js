import { BASE_URL, postJSON, getJSON } from "."

const URL = BASE_URL

/*
 * Users API manages all user-related operations.
 * @description API for user authentication and management.
 * @requires module:lib/api/index
 */

const UsersApi = {
    login(user) {
        console.log("USER", user)
        return postJSON(`${URL}/login`, user)
    },
    read(id, accessToken) {
        return getJSON(`${URL}/users/${id}`, accessToken)
    }
}

export default UsersApi