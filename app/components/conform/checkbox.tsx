import {
  type FieldMetadata,
  unstable_useControl as useControl,
} from '@conform-to/react'
import { type ElementRef, useRef } from 'react'
import { Checkbox } from '~/components/ui/checkbox'
import { cn } from '~/lib/utils'

export function CheckboxConform({
  meta,
  className,
  checked,
  isView,
}: {
  meta: FieldMetadata<string | boolean | undefined>
  className?: string
  checked?: boolean
  isView?: boolean
}) {
  const checkboxRef = useRef<ElementRef<typeof Checkbox>>(null)
  const control = useControl(meta)

  return (
    <>
      <input
        className='sr-only'
        aria-hidden
        ref={control.register}
        disabled={isView}
        name={meta.name}
        tabIndex={-1}
        defaultChecked={checked}
        defaultValue={meta.initialValue}
        onFocus={() => checkboxRef.current?.focus()}
      />
      <Checkbox
        ref={checkboxRef}
        disabled={isView}
        id={meta.id}
        checked={control.value === 'on' || checked}
        onCheckedChange={checked => {
          control.change(checked ? 'on' : '')
        }}
        onBlur={control.blur}
        className={cn(
          'border-gray-300 focus:ring-0 focus:ring-offset-0 disabled:cursor-auto data-[state=checked]:bg-brand-500 data-[state=checked]:text-white data-[state=checked]:opacity-100',
          className,
        )}
      />
    </>
  )
}
