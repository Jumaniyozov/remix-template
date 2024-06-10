import {createCookieSessionStorage} from "@remix-run/node";

export type User = {
    user_id: string
    role: string
    access_token: string
    balance: number
    name: string
    phone_number: string
    email: string
    image_url: string
}

export const USER_SESSION_KEY = "userId";
const SESSION_SECRET = process.env.SESSION_SECRET ?? "default-secret";

// export the whole sessionStorage object
export const sessionStorage = createCookieSessionStorage({
    cookie: {
        name: USER_SESSION_KEY, // use any name you want here
        sameSite: "lax", // this helps with CSRF
        path: "/", // remember to add this so the cookie will work in all routes
        httpOnly: true, // for security reasons, make this cookie http only
        secrets: [SESSION_SECRET], // replace this with an actual secret
        secure: process.env.NODE_ENV === "production", // enable this in prod only
    },
});


export const {getSession, commitSession, destroySession} = sessionStorage;