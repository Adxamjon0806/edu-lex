import { useId, useState } from 'react'

import { Link } from '@tanstack/react-router'
import { ChevronLeft } from 'lucide-react'

import { iconButtonVariants } from '~/shared/ui'

import { MODULE, TERMS } from '../config/learning'
import type { LearningTab } from '../model/types'
import { CaseTextTab } from './CaseTextTab'
import { FlashcardsTab } from './FlashcardsTab'
import { LearningTabs } from './LearningTabs'
import { SpeechTab } from './SpeechTab'

/*
 * Экран обучения (экран «03 Learning Hub»): шапка модуля и три режима — карточки, текст с кейсом, речь.
 * Шапка из макета: до md — кнопка «назад» слева от названия и вкладки строкой ниже, md–lg — вкладки
 * строкой ниже на всю ширину, от lg — вкладки справа от названия.
 * Отображается только выбранная панель: состояние переворота карточки и записи при смене вкладки сбрасывается, как в макете.
 */
export function LearningPage() {
  const idPrefix = useId()
  const [tab, setTab] = useState<LearningTab>('cards')
  // Текущий термин общий для карточек и речи.
  const [termIndex, setTermIndex] = useState(0)

  return (
    <div className="flex flex-col gap-4 md:gap-6">
      <header className="flex flex-col gap-4 md:gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div className="flex items-center gap-3">
          <Link aria-label="На главную" className={iconButtonVariants({ className: 'md:hidden' })} to="/">
            <ChevronLeft aria-hidden />
          </Link>
          <div className="flex flex-col md:gap-1">
            <p className="text-12 font-semibold text-muted md:text-13">{MODULE.course}</p>
            <h1 className="font-serif text-20 font-semibold text-heading md:text-30 lg:text-32">{MODULE.title}</h1>
          </div>
        </div>
        <LearningTabs idPrefix={idPrefix} onChange={setTab} value={tab} />
      </header>
      <div aria-labelledby={`${idPrefix}-tab-${tab}`} id={`${idPrefix}-panel-${tab}`} role="tabpanel">
        {tab === 'cards' && <FlashcardsTab onTermChange={setTermIndex} termIndex={termIndex} terms={TERMS} />}
        {tab === 'text' && <CaseTextTab />}
        {tab === 'speech' && <SpeechTab term={TERMS[termIndex]} />}
      </div>
    </div>
  )
}
