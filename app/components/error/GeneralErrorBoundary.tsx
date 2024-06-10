import {type ErrorResponse, isRouteErrorResponse, useParams, useRouteError,} from '@remix-run/react'
import {getErrorMessage} from '~/lib/misc'
import {ReactNode} from "react";

type StatusHandler = (info: {
    error: ErrorResponse
    params: Record<string, string | undefined>
}) => ReactNode | null

type ErrorBoundaryProps = {
    defaultStatusHandler?: StatusHandler
    statusHandlers?: Record<number, StatusHandler>
    unexpectedErrorHandler?: (error: unknown) => ReactNode | null
}

export const GeneralErrorBoundary = ({
                                         defaultStatusHandler = ({error}) => (
                                             <p>
                                                 {error.status} {error.data}
                                             </p>
                                         ),
                                         statusHandlers,
                                         unexpectedErrorHandler = error => (
                                             <p>{getErrorMessage(error)}</p>
                                         )
                                     }: ErrorBoundaryProps) => {
    const error = useRouteError()
    // captureRemixErrorBoundaryError(error)
    const params = useParams()

    if (typeof document !== 'undefined') {
        console.error(error)
    }

    return (
        <div className="container flex items-center justify-center p-20 text-h2">
            {isRouteErrorResponse(error)
                ? (statusHandlers?.[error.status] ?? defaultStatusHandler)({
                    error,
                    params,
                })
                : unexpectedErrorHandler(error)}
        </div>
    )
}