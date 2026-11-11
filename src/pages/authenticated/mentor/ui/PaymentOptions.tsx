import { classNames } from '~/shared/lib'
import { Radio, RadioGroup } from '~/shared/ui'

import { PAYMENT_OPTIONS } from '../config/mentor'

type PaymentOptionsProps = Readonly<{
  /** Вид из макета: desktop — сетка 2×2, иконка слева; tablet — 4 колонки, иконка над подписью. */
  layout: 'desktop' | 'tablet'
  onChange: (value: string) => void
  value: string
}>

// Способ оплаты сессии (радиогруппа): выбранный — мятный фон и рамка emerald. На мобильном в макете его нет.
export function PaymentOptions({ layout, onChange, value }: PaymentOptionsProps) {
  const isDesktop = layout === 'desktop'

  return (
    <RadioGroup
      className={classNames('grid gap-2', isDesktop ? 'grid-cols-2' : 'grid-cols-4')}
      legend="Способ оплаты"
      legendClassName="sr-only"
      onChange={onChange}
      value={value}
    >
      {PAYMENT_OPTIONS.map(({ icon: Icon, key, label }) => (
        <Radio
          className={classNames(
            'flex items-center rounded-10 font-semibold text-body',
            isDesktop ? 'gap-2 p-2.75 text-13' : 'flex-col justify-center gap-1.5 px-1.5 py-3 text-center text-12',
          )}
          key={key}
          value={key}
        >
          <Icon aria-hidden className="size-4.5 shrink-0" />
          {label}
        </Radio>
      ))}
    </RadioGroup>
  )
}
