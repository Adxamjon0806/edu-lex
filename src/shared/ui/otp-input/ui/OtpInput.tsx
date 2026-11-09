import { useState } from 'react'

import { classNames } from '~/shared/lib'

type OtpInputProps = Readonly<{
  'aria-describedby'?: string
  /** Подпись для скринридера: видимых подписей у ячеек нет. */
  'aria-label': string
  className?: string
  length?: number
  onChange: (value: string) => void
  value: string
}>

/*
 * Ввод кода подтверждения: одно настоящее поле поверх ячеек. Так работают вставка кода целиком,
 * автоподстановка из SMS (autocomplete="one-time-code") и стирание. Ячейки из макета: 46×56 и цифра 26px
 * на мобильном, 64×72 и 32px с md. Активная ячейка — рамка emerald с кольцом, заполненная — рамка line-accent.
 */
export function OtpInput({
  'aria-describedby': ariaDescribedBy,
  'aria-label': ariaLabel,
  className,
  length = 6,
  onChange,
  value,
}: OtpInputProps) {
  const [isFocused, setIsFocused] = useState(false)
  const activeIndex = Math.min(value.length, length - 1)

  return (
    <div className={classNames('relative flex w-fit gap-2 md:gap-3', className)}>
      {Array.from({ length }, (_, index) => {
        const digit = value[index] ?? ''
        const isActive = isFocused && value.length < length && index === activeIndex
        return (
          <span
            aria-hidden
            className={classNames(
              'flex h-14 w-11.5 items-center justify-center rounded-12 border-[1.5px] bg-surface font-serif text-26 font-semibold text-heading transition-all duration-150',
              'md:h-18 md:w-16 md:text-32',
              isActive && 'border-emerald ring-4 ring-emerald/14',
              !isActive && (digit ? 'border-line-accent' : 'border-line'),
            )}
            // Порядок ячеек не меняется, а цифры могут повторяться: индекс — устойчивый ключ.
            key={index}
          >
            {digit}
          </span>
        )
      })}
      <input
        aria-describedby={ariaDescribedBy}
        aria-label={ariaLabel}
        autoComplete="one-time-code"
        className="absolute inset-0 size-full cursor-pointer opacity-0"
        inputMode="numeric"
        maxLength={length}
        onBlur={() => {
          setIsFocused(false)
        }}
        onChange={(event) => {
          onChange(event.target.value.replaceAll(/\D/g, '').slice(0, length))
        }}
        onFocus={() => {
          setIsFocused(true)
        }}
        type="text"
        value={value}
      />
    </div>
  )
}
