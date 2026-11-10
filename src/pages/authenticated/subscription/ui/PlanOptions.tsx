import { Badge, Radio, RadioGroup, RadioIndicator } from '~/shared/ui'

import { PLANS } from '../config/subscription'
import type { PlanKey } from '../model/types'

type PlanOptionsProps = Readonly<{
  onChange: (plan: PlanKey) => void
  value: PlanKey
}>

/*
 * Тарифы студента (радиогруппа на navy): выбранный — золотая рамка, кольцо и тень.
 * Вид из макета:
 * - до md — компактные строки: индикатор, название и пояснение, цена справа; метки «Выгоднее всего» нет;
 * - md–lg — такие же строки крупнее, метка рядом с названием;
 * - от lg — три карточки в ряд: метка над карточкой, индикатор справа от названия, цена, пояснение.
 */
export function PlanOptions({ onChange, value }: PlanOptionsProps) {
  return (
    <div className="w-full">
      <RadioGroup
        className="flex flex-col gap-4 md:gap-3.5 lg:flex-row lg:justify-center lg:gap-5"
        legend="Тариф"
        legendClassName="sr-only"
        onChange={(plan) => {
          onChange(plan as PlanKey)
        }}
        value={value}
      >
        {PLANS.map(({ badge, key, name, note, per, price }) => (
          <Radio
            className="relative flex items-center gap-3 rounded-16 p-4 md:gap-4.5 md:rounded-18 md:px-6 md:py-5.5 lg:max-w-85 lg:flex-1 lg:flex-col lg:items-stretch lg:gap-2.5 lg:rounded-20 lg:p-7"
            key={key}
            selectedTone="gold"
            surface="navy"
            value={key}
          >
            {badge !== undefined && (
              <Badge className="absolute -top-3 left-7 text-11 max-lg:hidden" tone="gold">
                {badge}
              </Badge>
            )}
            <RadioIndicator className="size-5 md:size-5.5 lg:absolute lg:top-7 lg:right-7 lg:size-5" tone="gold" />
            <span className="flex min-w-0 flex-1 flex-col gap-0.75 md:gap-1 lg:contents">
              <span className="flex items-center gap-2.5 text-14 font-bold text-gold-300 md:text-16 lg:order-1 lg:text-15">
                {name}
                {badge !== undefined && (
                  <Badge className="text-10 max-md:hidden lg:hidden" size="sm" tone="gold">
                    {badge}
                  </Badge>
                )}
              </span>
              <span className="text-12 font-semibold text-emerald-300 md:text-13 lg:order-3">{note}</span>
            </span>
            <span className="flex flex-col items-end lg:order-2 lg:flex-row lg:items-baseline lg:gap-2">
              <span className="font-serif text-24 leading-none font-semibold md:text-34 lg:text-48">{price}</span>
              <span className="text-11 font-medium text-navy-200 md:text-12 lg:text-14">{per}</span>
            </span>
          </Radio>
        ))}
      </RadioGroup>
    </div>
  )
}
