import {Links, Meta, Outlet, Scripts, ScrollRestoration, useRouteLoaderData,} from "@remix-run/react";
import stylesheet from "~/tailwind.css?url";
import {ActionFunctionArgs, json, LinksFunction, LoaderFunctionArgs} from "@remix-run/node";
import {useEffect, useState} from "react";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {Toaster} from "~/components/ui/toaster";
import i18nServer, {localeCookie} from "~/services/i18n.server";
import {getToast} from "~/services/toast.server";
import {honeypot} from "~/services/honeypot.server";
import {csrf} from "~/services/csrf.server";
import {combineHeaders} from "~/lib/combineHeaders";
import {AuthenticityTokenProvider} from "remix-utils/csrf/react";
import {HoneypotProvider} from "remix-utils/honeypot/react";
import {useChangeLanguage} from "remix-i18next/react";
import {GeneralErrorBoundary} from "~/components/error/GeneralErrorBoundary";
import {getTheme, setTheme} from "~/services/theme.server";
import {parseWithZod} from "@conform-to/zod";
import {ThemeFormSchema} from "~/components/navbar/ThemeSwitch";
import {invariantResponse} from "~/lib/invariant";
import {cn} from "~/lib/utils";
import {useToast} from "~/components/ui/use-toast";

export const links: LinksFunction = () => {
    return [
        {rel: "stylesheet", href: stylesheet},
        {rel: 'stylesheet', href: '/fonts/inter/inter.css'}
    ];
}

export async function action({request}: ActionFunctionArgs) {
    const responseInit = new Headers()
    const formData = await request.formData()
    const submission = parseWithZod(formData, {
        schema: ThemeFormSchema
    })
    invariantResponse(submission.status === 'success', 'Invalid theme received')
    submission.value
    const {theme} = submission.value
    responseInit.append('Set-Cookie', setTheme(theme))
    return json({
        result: submission.reply(),
    }, {headers: combineHeaders(responseInit)})
}

export async function loader({request}: LoaderFunctionArgs) {
    const locale = await i18nServer.getLocale(request);
    const {toast, headers: toastHeaders} = await getToast(request)
    const honeyProps = honeypot.getInputProps()
    const [csrfToken, csrfCookieHeader] = await csrf.commitToken(request)

    const langs = ['uz', 'ru', 'en'];

    const csrfHeader = csrfCookieHeader ? new Headers({
        'Set-Cookie': csrfCookieHeader
    }) : {};

    return json(
        {
            toast, honeyProps, csrfToken, userPrefs: {
                theme: getTheme(request),
                locale: langs.includes(locale) ? locale : 'uz'
            }
        },
        {headers: combineHeaders({"Set-Cookie": await localeCookie.serialize(locale)}, toastHeaders, csrfHeader,)}
    );
}

export function Document({locale, theme, children}: { locale: string, theme: string, children: React.ReactNode }) {
    const {toast} = useToast()
    const data = useRouteLoaderData<typeof loader>('root')!


    useEffect(() => {
        if (data?.toast?.id) {
            toast({
                title: data.toast.title,
                description: data.toast.description,
                variant: data.toast.type
            })
        }
    }, [data?.toast?.id])


    return (
        <html lang={locale} className={cn(theme)}>
        <head>
            <meta charSet="utf-8"/>
            <meta name="viewport" content="width=device-width, initial-scale=1"/>
            <Meta/>
            <Links/>
            <title>Remix template</title>
        </head>
        <body className="relative">
        <Toaster/>
        {children}
        <ScrollRestoration/>
        <Scripts/>
        </body>
        </html>
    )
}

export function Layout() {
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

    const data = useRouteLoaderData<typeof loader>('root')!
    invariantResponse(data, 'No data found in route loader')

    return (
        <Document locale={data.userPrefs.locale ?? 'en'} theme={data.userPrefs.theme ?? 'system'}>
            <QueryClientProvider client={queryClient}>
                <AuthenticityTokenProvider token={data.csrfToken}>
                    <HoneypotProvider {...data.honeyProps}>
                        <Outlet/>
                    </HoneypotProvider>
                </AuthenticityTokenProvider>
            </QueryClientProvider>
        </Document>
    );
}


export default function App() {
    const data = useRouteLoaderData<typeof loader>('root');
    invariantResponse(data, 'No data found in route loader')
    useChangeLanguage(data.userPrefs.locale ?? 'en');
    return <Outlet/>;
}


export function ErrorBoundary() {
    return (
        <Document locale={'en'} theme={'system'}>
            <GeneralErrorBoundary/>
        </Document>
    )
}

export function useTypedRootLoaderData() {
    return useRouteLoaderData<typeof loader>('root')
}
