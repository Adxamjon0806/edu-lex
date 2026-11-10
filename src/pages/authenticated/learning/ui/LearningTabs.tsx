import { useRef, type KeyboardEvent } from 'react'

import { classNames } from '~/shared/lib'

import { LEARNING_TABS } from '../config/learning'
import type { LearningTab } from '../model/types'

type LearningTabsProps = Readonly<{
  className?: string
  /** Префикс id: вкладка `${idPrefix}-tab-${value}` управляет панелью `${idPrefix}-panel-${value}`. */
  idPrefix: string
  onChange: (tab: LearningTab) => void
  value: LearningTab
}>

/*
 * Вкладки экрана обучения (WAI-ARIA Tabs): стрелки, Home и End переключают вкладку, в порядке Tab
 * участвует только выбранная. Вид из макета: дорожка surface-muted, выбранная вкладка navy.
 * До md подписи короткие и без иконок, на планшете вкладки делят ширину поровну, на десктопе — по содержимому.
 * Hover в макете не нарисован: текст невыбранной вкладки темнеет.
 */
export function LearningTabs({ className, idPrefix, onChange, value }: LearningTabsProps) {
  const tabRefs = useRef<Partial<Record<LearningTab, HTMLButtonElement>>>({})

  function handleKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
    const index = LEARNING_TABS.findIndex((tab) => tab.value === value)
    const lastIndex = LEARNING_TABS.length - 1
    const nextIndex = {
      ArrowLeft: index === 0 ? lastIndex : index - 1,
      ArrowRight: index === lastIndex ? 0 : index + 1,
      End: lastIndex,
      Home: 0,
    }[event.key]
    if (nextIndex === undefined) return

    event.preventDefault()
    const next = LEARNING_TABS[nextIndex].value
    onChange(next)
    tabRefs.current[next]?.focus()
  }

  return (
    <div
      aria-label="Режимы обучения"
      className={classNames('flex gap-1 rounded-12 bg-surface-muted p-1', className)}
      role="tablist"
    >
      {LEARNING_TABS.map(({ icon: Icon, label, shortLabel, value: tab }) => {
        const selected = tab === value
        return (
          <button
            aria-controls={`${idPrefix}-panel-${tab}`}
            aria-selected={selected}
            className={classNames(
              'flex min-h-11 flex-1 cursor-pointer items-center justify-center gap-2 rounded-9 py-2.75 text-13 font-semibold transition-colors',
              'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald',
              'md:py-3 md:text-14 lg:flex-none lg:px-4.5 lg:py-2.75',
              selected ? 'bg-navy text-white' : 'text-body-secondary hover:text-heading',
            )}
            id={`${idPrefix}-tab-${tab}`}
            key={tab}
            onClick={() => {
              onChange(tab)
            }}
            onKeyDown={handleKeyDown}
            ref={(element) => {
              tabRefs.current[tab] = element ?? undefined
            }}
            role="tab"
            tabIndex={selected ? 0 : -1}
            type="button"
          >
            <Icon aria-hidden className="size-4 max-md:hidden" />
            <span className="md:hidden">{shortLabel}</span>
            <span className="max-md:hidden">{label}</span>
          </button>
        )
      })}
    </div>
  )
}
