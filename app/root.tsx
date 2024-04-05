import {isRouteErrorResponse, Links, Meta, Outlet, Scripts, ScrollRestoration, useRouteError,} from "@remix-run/react";
import stylesheet from "~/tailwind.css?url";
import {LinksFunction} from "@remix-run/node";
import {useState} from "react";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {Toaster} from "~/components/ui/toaster";

export const links: LinksFunction = () => {
    return [
        {rel: "stylesheet", href: stylesheet},
        {rel: 'stylesheet', href: '/fonts/inter/inter.css'}
    ];
}

export function Layout({children}: { children: React.ReactNode }) {
    const [queryClient] = useState(
        () =>
            new QueryClient({
                defaultOptions: {
                    queries: {
                        // With SSR, we usually want to set some default staleTime
                        // above 0 to avoid refetching immediately on the client
                        staleTime: 60 * 1000
                    }
                }
            })
    )

    return (
        <html lang="en">
        <head>
            <meta charSet="utf-8"/>
            <meta name="viewport" content="width=device-width, initial-scale=1"/>
            <Meta/>
            <Links/>
        </head>
        <body>
        <QueryClientProvider client={queryClient}>
            {children}

            <ScrollRestoration/>
            <Scripts/>
        </QueryClientProvider>
        </body>
        </html>
    );
}

export default function App() {
    return (
        <>
            <Toaster/>
            <Outlet/>
        </>
    );
}


export function ErrorBoundary() {
    const error = useRouteError() as Error | undefined

    if (isRouteErrorResponse(error)) {
        return (
            <>
                <h1>
                    {error.status} {error.statusText}
                </h1>
                <p>{error.data}</p>
            </>
        )
    }

    return (
        <>
            <h1>Error!</h1>
            <p>{error?.message ?? 'Unknown error'}</p>
        </>
    )
}

