import { useState } from 'react'

import { Crown, Lock } from 'lucide-react'

import { Button } from '~/shared/ui'

import { DEFAULT_PAYMENT, DEFAULT_PLAN, PLANS, SUBSCRIPTION_TEXTS } from '../config/subscription'
import type { PlanKey } from '../model/types'
import { IncludedFeatures } from './IncludedFeatures'
import { PaymentMethods } from './PaymentMethods'
import { PlanOptions } from './PlanOptions'
import { ReferralCard } from './ReferralCard'
import { SubscriptionTopBar } from './SubscriptionTopBar'

/*
 * Подписка и оплата для студента (экран «08 Subscription & Payments»). Переключатель «Студент /
 * Преподаватель» из макета убран: у студента и преподавателя будут свои страницы.
 * Страница всегда тёмная (staticData.darkPage маршрута): цвета только из палитры navy, emerald и gold,
 * без токенов темы. До lg — полноэкранная (staticData.focusMode) со своей шапкой.
 * Порядок блоков: на десктопе «Включено» и способы оплаты рядом, на планшете способы оплаты выше списка.
 * Пока это вёрстка: «Оформить» и «Восстановить покупки» ничего не делают, выбор тарифа меняет цену в кнопке.
 */
export function SubscriptionPage() {
  const [plan, setPlan] = useState<PlanKey>(DEFAULT_PLAN)
  const [payment, setPayment] = useState(DEFAULT_PAYMENT)
  const price = PLANS.find(({ key }) => key === plan)?.price

  return (
    <div className="flex flex-1 flex-col">
      <SubscriptionTopBar />
      <div className="flex flex-col items-center gap-4 px-5 pt-4 pb-7 md:gap-7 md:p-10 lg:gap-8 lg:px-6 lg:py-4">
        <div className="flex flex-col items-center gap-1.5 text-center md:gap-2.5 lg:gap-3">
          <Crown aria-hidden className="size-6.5 text-gold-400 md:size-7 lg:size-8" />
          <h1 className="font-serif text-30 font-semibold md:text-38 lg:text-44">{SUBSCRIPTION_TEXTS.title}</h1>
          <p className="max-w-140 text-16 font-medium text-navy-200 max-lg:hidden">{SUBSCRIPTION_TEXTS.description}</p>
        </div>
        <PlanOptions onChange={setPlan} value={plan} />
        <div className="flex w-full flex-col gap-4 md:gap-7 lg:grid lg:max-w-265 lg:grid-cols-2 lg:gap-6">
          <IncludedFeatures />
          <PaymentMethods className="max-lg:order-first" onChange={setPayment} value={payment} />
        </div>
        <div className="flex w-full flex-col items-center gap-4 md:gap-2.5">
          <Button
            className="w-full rounded-14 py-4.25 text-16 shadow-glow-lg md:py-4.5 md:text-17 lg:w-auto lg:px-14"
            size="lg"
          >
            Оформить · {price}
          </Button>
          <p className="flex items-center gap-1.5 text-12 font-medium text-navy-200 max-lg:hidden">
            <Lock aria-hidden className="size-3.5" />
            {SUBSCRIPTION_TEXTS.secureNote}
          </p>
          <p className="text-center text-11 leading-normal font-medium text-navy-200 md:hidden">
            {SUBSCRIPTION_TEXTS.mobileNote}
          </p>
        </div>
        <ReferralCard />
      </div>
    </div>
  )
}
