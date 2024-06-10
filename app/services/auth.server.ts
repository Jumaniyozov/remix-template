import {Authenticator} from "remix-auth";
import {sessionStorage, User} from "~/services/session.server";
import {FormStrategy} from "remix-auth-form";

export const authenticator = new Authenticator<User>(sessionStorage);
export const STRATEGY_NAME = "user-session";

async function login(lgn: string, pswrd: string): Promise<User> {
    if (lgn === "" || pswrd === "") {
        throw new Error("Invalid email or password")
    }

    const res = await fetch(`${process.env.API_URL}/users/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({login: lgn, password: pswrd}),
    });

    if (res.status !== 200) {
        throw new Error("Invalid email or password")
    }

    return await res.json();
}

authenticator.use(
    new FormStrategy(async ({form}) => {

        const email = form.get("username") as string;
        const password = form.get("password") as string;
        if (!email || !password) {
            throw new Error("Invalid email or password");
        }

        return login(email, password);
    }),
    STRATEGY_NAME
);