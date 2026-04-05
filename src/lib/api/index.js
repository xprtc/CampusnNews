const BASE_URL =
  process.env.API_BASE_URL?.replace(/\/$/, "") || "http://127.0.0.1:3001";
 
// central error handling
async function handleResponse(response) {
    if (!response.ok) {
        const error = new Error("Request failed with status " + response.status);
        error.response = response;
        throw error;
    }
    return response.json();
}
 
/* GET */
export async function getJSON(url, accessToken = null) {
    const options = {
        method: "GET",
        headers: {
            "content-type": "application/json",
        },
        cache: "no-store",
    };
 
    if (accessToken) {
        options.headers["Authorization"] = `Bearer ${accessToken}`;
    }
 
    const response = await fetch(url, options);
    return handleResponse(response);
}
 
/* POST */
export async function postJSON(url, body = {}, accessToken = null) {
    const options = {
        method: "POST",
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify(body),
    };
 
    if (accessToken) {
        options.headers["Authorization"] = `Bearer ${accessToken}`;
    }
 
    const response = await fetch(url, options);
    return handleResponse(response);
}
 
/* PUT */
export async function putJSON(url, body = {}, accessToken = null) {
    const options = {
        method: "PUT",
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify(body),
    };
 
    if (accessToken) {
        options.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    const response = await fetch(url, options);
    return handleResponse(response);
}
 
/* DELETE */
export async function deleteJSON(url, accessToken = null) {
    const options = {
        method: "DELETE",
        headers: {
            "content-type": "application/json",
        },
    };
 
    if (accessToken) {
        options.headers["Authorization"] = `Bearer ${accessToken}`;
    }
 
    const response = await fetch(url, options);
    return handleResponse(response);
}
 
export { BASE_URL };