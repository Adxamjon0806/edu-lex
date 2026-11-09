import { createContext, use } from 'react'

export type RadioGroupContextValue = Readonly<{
  disabled: boolean
  isChecked: (value: string) => boolean
  multiple: boolean
  name: string
  toggle: (value: string) => void
}>

export const RadioGroupContext = createContext<null | RadioGroupContextValue>(null)

export function useRadioGroupContext() {
  const context = use(RadioGroupContext)
  if (!context) throw new Error('Radio должен быть внутри RadioGroup')
  return context
}
