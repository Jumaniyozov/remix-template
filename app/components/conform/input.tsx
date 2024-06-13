import { FieldMetadata, getInputProps } from '@conform-to/react'

import { ComponentProps } from 'react'
import { Input } from '~/components/ui/input'

export const InputConform = ({
  meta,
  type,
  ...props
}: {
  meta: FieldMetadata<string | string[] | number | File | File[]>
  type: Parameters<typeof getInputProps>[1]['type']
} & ComponentProps<typeof Input>) => {
  return (
    <Input
      {...getInputProps(meta, { type, ariaAttributes: true })}
      {...props}
    />
  )
}
