import { classNames } from '~/shared/lib'
import { Radio, RadioGroup } from '~/shared/ui'

import { PAYMENT_METHODS } from '../config/subscription'

type PaymentMethodsProps = Readonly<{
  className?: string
  onChange: (method: string) => void
  value: string
}>

/*
 * Способы оплаты: сетка 3×2 (радиогруппа на navy), выбранный — с рамкой emerald.
 * С md — в рамке с заголовком «СПОСОБ ОПЛАТЫ»; до md рамки нет, заголовок только для скринридера.
 */
export function PaymentMethods({ className, onChange, value }: PaymentMethodsProps) {
  return (
    <div className={classNames('w-full md:rounded-18 md:border md:border-navy-600 md:p-5.5 lg:p-6', className)}>
      <RadioGroup
        className="grid grid-cols-3 gap-1.5 md:gap-2"
        legend="СПОСОБ ОПЛАТЫ"
        legendClassName="mb-3 text-12 font-bold tracking-widest text-navy-200 max-md:sr-only"
        onChange={onChange}
        value={value}
      >
        {PAYMENT_METHODS.map(({ icon: Icon, key, label }) => (
          <Radio
            className="flex min-h-14 flex-col items-center justify-center gap-1 rounded-10 px-1 py-2 text-center text-10 font-semibold md:gap-1.5 md:px-2 md:py-3.5 md:text-12 lg:py-3"
            key={key}
            surface="navy"
            value={key}
          >
            <Icon aria-hidden className="size-4.5 md:size-5" />
            {label}
          </Radio>
        ))}
      </RadioGroup>
    </div>
  )
}
