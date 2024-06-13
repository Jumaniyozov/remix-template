import {Children, PropsWithChildren, ReactNode} from 'react'

type SwitchProps = PropsWithChildren

export function Switch({children}: SwitchProps) {
    let matchChild: ReactNode = null
    let defaultCase: ReactNode = null

    Children.forEach(children, (child) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        if (!matchChild && child?.type === Case) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            const {condition} = child.props

            const conditionalResult = Boolean(condition)

            if (conditionalResult) {
                matchChild = child
            }
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
        } else if (!defaultCase && child.type === Default) {
            defaultCase = child
        }
    })

    return matchChild ?? defaultCase ?? null
}

export function Case({
                         children,
                         // eslint-disable-next-line @typescript-eslint/no-unused-vars
                         condition,
                     }: {
    condition: boolean
    children: ReactNode
}) {
    return children
}

export function Default({children}: { children: ReactNode }) {
    return children
}
