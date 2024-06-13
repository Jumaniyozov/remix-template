import * as React from 'react'

export type DivProps = React.HTMLAttributes<HTMLDivElement>

export type ListOfErrors = Array<string | null | undefined> | null | undefined

export const Field = (props: { children: React.ReactNode } & DivProps) => {
  const { children, ...rest } = props

  return (
    <div className='flex flex-col gap-2' {...rest}>
      {children}
    </div>
  )
}

export const FieldError = (props: { children: React.ReactNode } & DivProps) => {
  const { children, ...rest } = props
  return (
    <div className='text-sm text-red-600' {...rest}>
      {children}
    </div>
  )
}

export function ErrorList({
  id,
  errors,
}: {
  errors?: ListOfErrors
  id?: string
}) {
  const errorsToRender = errors?.filter(Boolean)
  if (!errorsToRender?.length) return null
  return (
    <ul id={id} className='flex flex-col gap-1'>
      {errorsToRender.map(e => (
        <li key={e} className='text-sm text-destructive '>
          {e}
        </li>
      ))}
    </ul>
  )
}
