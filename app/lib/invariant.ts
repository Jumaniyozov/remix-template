export function invariantResponse(
    condition: unknown,
    message?: string | (() => string),
    responseInit?: ResponseInit
): asserts condition {
    if (!condition) {
        throw new Response(
            typeof message === 'function'
                ? message()
                : message ||
                'Invariant failed',
            {status: 400, ...responseInit}
        )
    }
}

export function mayNull() {
    return Math.random() > 0.5 ? null : 'hello'
}