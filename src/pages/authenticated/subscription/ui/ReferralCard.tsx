import { Gift } from 'lucide-react'

import { REFERRAL } from '../config/subscription'

/*
 * «Приведи друга» с реферальным кодом, пунктирная золотая рамка. На мобильном в макете её нет.
 * На десктопе — лёгкая золотая заливка, полное описание и код в рамке.
 */
export function ReferralCard() {
  return (
    <section
      aria-labelledby="referral-title"
      className="flex w-full items-center gap-3.5 rounded-16 border border-dashed border-gold p-4.5 max-md:hidden lg:max-w-265 lg:gap-4 lg:rounded-18 lg:bg-gold/5 lg:px-6 lg:py-5"
    >
      <Gift aria-hidden className="size-6 shrink-0 text-gold-400 lg:size-6.5" />
      <div className="flex flex-1 flex-col gap-0.5">
        <h2 className="font-serif text-17 font-semibold lg:text-18" id="referral-title">
          {REFERRAL.title}
        </h2>
        <p className="text-13 font-medium text-navy-200">
          <span className="lg:hidden">{REFERRAL.description.tablet}</span>
          <span className="max-lg:hidden">{REFERRAL.description.desktop}</span>
        </p>
      </div>
      <p className="text-14 font-extrabold tracking-widest text-gold-300 lg:rounded-10 lg:border lg:border-navy-400 lg:px-3.5 lg:py-2.5 lg:text-15">
        <span className="sr-only">Ваш код: </span>
        {REFERRAL.code}
      </p>
    </section>
  )
}
