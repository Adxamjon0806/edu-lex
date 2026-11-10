import { Link } from '@tanstack/react-router'

import { Badge, buttonVariants, Card } from '~/shared/ui'

import { DAILY_LESSON } from '../config/dashboard'

/*
 * Мини-урок дня. Раскладка из макета:
 * - до md — метка, название кейса, одна фраза и кнопка emerald на всю ширину;
 * - md–lg — плюс термины кейса и кнопка с рамкой;
 * - от lg — плюс область права рядом с меткой, полное описание и лёгкая тень.
 */
export function DailyLessonCard() {
  const { area, caseName, duration, summary, terms, year } = DAILY_LESSON

  return (
    <Card
      aria-labelledby="daily-lesson-title"
      as="section"
      className="flex flex-col gap-2.5 p-4.5 md:gap-3 md:p-6 lg:gap-3.5 lg:p-7 lg:shadow-sm"
    >
      <div className="flex items-center gap-2.5">
        <Badge className="max-md:px-2 max-md:text-11" tone="premium">
          {duration}
        </Badge>
        <span className="text-12 font-semibold text-muted max-lg:hidden">{area}</span>
      </div>
      <h2 className="font-serif text-19 font-semibold text-heading md:text-23 lg:text-26" id="daily-lesson-title">
        <i>{caseName}</i> [{year}]
      </h2>
      <p className="max-w-160 text-14 leading-normal text-body-secondary md:text-15 md:leading-relaxed">
        <span className="md:hidden">{summary.mobile}</span>
        <span className="max-md:hidden lg:hidden">{summary.tablet}</span>
        <span className="max-lg:hidden">{summary.desktop}</span>
      </p>
      <ul aria-label="Термины кейса" className="flex flex-wrap gap-2 max-md:hidden">
        {terms.map((term) => (
          <li key={term}>
            <Badge pill size="lg" tone="success">
              {term}
            </Badge>
          </li>
        ))}
      </ul>
      <Link className={buttonVariants({ className: 'py-3.25 md:hidden', fullWidth: true })} to="/learning">
        Начать разбор
      </Link>
      <Link
        className={buttonVariants({ className: 'self-start px-5.5 max-md:hidden lg:mt-1', variant: 'secondary' })}
        to="/learning"
      >
        Начать разбор
      </Link>
    </Card>
  )
}
