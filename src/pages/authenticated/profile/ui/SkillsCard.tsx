import { Card } from '~/shared/ui'

import { SkillsRadar } from './SkillsRadar'

// Карточка радара навыков. Заголовок из макета: «Навыки» до md, «Навыки по категориям» с md, подпись на десктопе.
export function SkillsCard() {
  return (
    <Card
      aria-labelledby="skills-title"
      as="section"
      className="flex flex-col gap-1 p-4 md:gap-1.5 md:rounded-20 md:p-6 lg:gap-2 lg:p-7"
    >
      <div className="flex items-baseline justify-between gap-4">
        <h2 className="font-serif text-18 font-semibold text-heading md:text-22" id="skills-title">
          <span className="md:hidden">Навыки</span>
          <span className="max-md:hidden">Навыки по категориям</span>
        </h2>
        <span className="text-12 font-semibold text-muted max-lg:hidden" lang="en">
          Skills radar
        </span>
      </div>
      <div className="w-full self-center md:max-w-130 lg:max-w-136">
        <SkillsRadar />
      </div>
    </Card>
  )
}
