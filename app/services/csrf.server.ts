import {CSRF, CSRFError} from 'remix-utils/csrf/server'
import {createCookie} from "@remix-run/node";


const sessionSecret = process.env.SESSION_SECRET ?? "default-secret"

const cookie = createCookie("csrf", {
    httpOnly: true,
    path: "/",
    secure: process.env.NODE_ENV === "production",
    secrets: [sessionSecret],
    sameSite: "lax",
})

export const csrf = new CSRF({cookie})

// export async function checkCsrf(formData: FormData, headers: Headers) {
//     try {
//         await csrf.validate(formData, headers)
//     } catch (error) {
//         if (error instanceof CSRFError) {
//             throw new Response('CSRF token is invalid', {status: 403})
//         }
//         throw error
//     }
// }