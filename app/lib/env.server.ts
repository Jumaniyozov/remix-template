const requiredServerEnvs = [
    'NODE_ENV',
    'SESSION_SECRET'
] as const;

declare global {
    namespace NodeJS {
        interface ProcessEnv extends Record<typeof requiredServerEnvs[number], string> {
        }
    }
}

for (const env of requiredServerEnvs) {
    if (!process.env[env]) {
        throw new Error(`Environment variable ${env} is missing`);
    }
}

export function getEnv() {
    return {
        MODE: process.env.NODE_ENV,
        SESSION_SECRET: process.env.SESSION_SECRET
    }
}

type ENV = ReturnType<typeof getEnv>;

declare global {
    let ENV: ENV;

    interface Window {
        ENV: ENV
    }
}