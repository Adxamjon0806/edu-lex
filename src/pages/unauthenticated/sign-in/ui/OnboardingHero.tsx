import { Logo, ProgressBar } from '~/shared/ui'

import { STEPS_TOTAL } from '../config/onboarding'

type OnboardingHeroProps = Readonly<{
  stepNumber: number
}>

/*
 * Тёмно-синяя часть онбординга (значения из макета):
 * - мобильный — полоса сверху: логотип 36px и прогресс, без заголовка;
 * - планшет — полоса сверху: логотип 44px, заголовок 38px и прогресс;
 * - десктоп — колонка 520px на всю высоту: логотип 52px с подписью, заголовок 52px, подзаголовок и прогресс внизу.
 */
export function OnboardingHero({ stepNumber }: OnboardingHeroProps) {
  const stepLabel = `Шаг ${String(stepNumber)} из ${String(STEPS_TOTAL)}`

  return (
    <header className="flex flex-col gap-5.5 bg-navy px-6 pt-6 pb-7 text-white md:gap-7 md:px-12 md:py-10 lg:sticky lg:top-0 lg:h-dvh lg:justify-between lg:p-14">
      <Logo className="md:hidden" size={36} />
      <Logo className="max-md:hidden lg:hidden" size={44} />
      <Logo className="max-lg:hidden" size={52} tagline="EDTECH PLATFORM" />
      <div className="flex flex-col gap-5 max-md:hidden">
        <p className="max-w-150 font-serif text-38 leading-tight font-semibold text-pretty lg:text-52">
          Академический английский для поступления за рубеж
        </p>
        <p className="max-w-100 text-17 leading-relaxed text-navy-100 max-lg:hidden">
          Профильная лексика права, бизнеса, IT и медицины — на реальных кейсах ведущих университетов.
        </p>
      </div>
      <div className="flex flex-col gap-2 md:gap-2.5 lg:gap-3">
        <span aria-hidden className="text-12 font-semibold text-navy-200 md:text-13">
          {stepLabel}
        </span>
        <ProgressBar
          glow
          label="Прогресс регистрации"
          track="navy"
          value={(stepNumber / STEPS_TOTAL) * 100}
          valueText={stepLabel}
        />
      </div>
    </header>
  )
}
