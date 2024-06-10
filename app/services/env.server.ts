import {z} from 'zod';

const EnvSchema = z.object({
    NODE_ENV: z.enum(['development', 'production', 'test'] as const),
    HONEYPOT_SECRET: z.string(),
    SESSION_SECRET: z.string(),
    API_URL: z.string(),
})

declare global {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace NodeJS {
        interface ProcessEnv extends z.infer<typeof EnvSchema> {
        }
    }
}


export function init() {
    const parsed = EnvSchema.safeParse(process.env)
    if (!parsed.success) {
        console.error('Invalid environment variables:', parsed.error.flatten().fieldErrors)
        throw new Error(parsed.error.errors.map(e => e.message).join('\n'))
    }
}
