"use server"

import { z } from "zod"
import UsersAPI from "@/lib/api/Users" 
import { redirect } from "next/navigation"
import { createSession, deleteSession, verifySession } from "@/lib/session";

// Schema for validating the data of the fields from the form.
const schema = z.object({
    email: z.string().trim().email("Please complete your email address"), // When moving to a real API, email is replaced with username
    password: z.string().trim(),
})

/**
* Login function
*/
export async function loginAction(state, formData) {
    const data = Object.fromEntries(formData)
    const fields = schema.safeParse(data)

    console.log("LOGIN START")

    // remove password from data to avoid sending it back to the client. User should re-enter it.
    delete data.password
    if (!fields.success) {
        return {
            url: state?.url,
            data,
            errors: fields.error.flatten().fieldErrors,
        }
    }

    try {
        const data = await UsersAPI.login(fields.data) // Send a POST request to the API to log in the user
        console.log("data:", data)
        await createSession(data.accessToken)   // Create a new session, storing the token in a cookie

    } catch (error) {
        console.log("Login error:", error, error.status)
        return { // Return the form data and an error message summarising what went wrong as the new status
            url: state?.url,
            data,
            message:
                error.status === 400
                    ? "Die E-Mail Adresse oder das Passwort ist nicht korrekt. Bitte versuche es nochmal."
                    : "Ein problem ist aufgetretten mit dem Login. Bitte versuche es speter.",
        }
    }
    redirect(state?.url ?? "/profile")   // Redirect the user to the page they were originally trying to access.
}

/**
* A server action that handles user logouts.
*/
export async function logoutAction() {
  //
  await deleteSession();
 
  redirect("/");
}
 
/**
 * Get username of the logged in user
 */
export async function getUsernameAction() {
  const session = await verifySession();
 
  if (!session) {
    return null;
  }
 
  const { id } = session.user
  const {accessToken} = session
 
  const user = await UsersAPI.read(id, accessToken);
 
  return user?.username
}
 
/**
 * Get username of user per id
 */
export async function getUsernamePerIdAction(id) {
    const session = await verifySession()
    if(!session){
       return null;
    }
 
    const user = await UsersAPI.read(id, session.accessToken);
 
    return user?.username
}