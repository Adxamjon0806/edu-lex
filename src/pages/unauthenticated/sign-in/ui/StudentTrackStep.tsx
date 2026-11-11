import { useId } from 'react'

import { Link } from '@tanstack/react-router'
import { Sparkles } from 'lucide-react'

import { DIRECTIONS } from '~/entities/direction'

import { buttonVariants, ChipGroup, Radio, RadioGroup, SegmentedControl } from '~/shared/ui'

import { LEVELS, REGIONS, type Level } from '../config/onboarding'
import { SectionLabel } from './SectionLabel'
import { StepActions } from './StepActions'
import { StepHeading } from './StepHeading'

type StudentTrackStepProps<T> = Readonly<{
  directions: readonly string[]
  level: Level
  onBack: () => void
  onDirectionsChange: (directions: string[]) => void
  onFinish: () => Promise<T>
  onLevelChange: (level: Level) => void
  onRegionChange: (region: string) => void
  region: string
}>

// Шаг 4 для студента: направления (можно несколько), регион и уровень английского.
export function StudentTrackStep<T>({
  directions,
  level,
  onBack,
  onDirectionsChange,
  onFinish,
  onLevelChange,
  onRegionChange,
  region,
}: StudentTrackStepProps<T>) {
  const regionLabelId = useId()
  const levelLabelId = useId()

  return (
    <>
      <StepHeading
        subtitle="На основе ответов система сгенерирует персональный учебный план."
        subtitleClassName="max-lg:hidden"
        title="Настроим ваш трек"
      />
      {/*
        Карточки направлений по макету: мобильный — строка с иконкой без подложки; планшет — сетка 2×2,
        иконка 40px сверху и подпись на английском; десктоп — сетка 2×2, иконка 44px слева.
      */}
      <RadioGroup
        className="flex flex-col gap-2 md:grid md:grid-cols-2 md:gap-3"
        legend={
          <SectionLabel desktop="Академическое направление" mobile="Направление" tablet="Академическое направление" />
        }
        legendClassName="mb-2 md:mb-3"
        multiple
        onChange={onDirectionsChange}
        value={directions}
      >
        {DIRECTIONS.map(({ en, icon: Icon, ru, value }) => (
          <Radio
            className="flex min-h-14 items-center gap-3 rounded-12 p-3 md:flex-col md:items-start md:p-4 lg:flex-row lg:items-center lg:gap-3.5"
            key={value}
            value={value}
          >
            <span className="flex shrink-0 items-center justify-center text-success md:size-10 md:rounded-10 md:bg-success-subtle lg:size-11">
              <Icon aria-hidden className="size-5 md:size-4.5 lg:size-5" />
            </span>
            <span className="flex flex-col gap-0.5">
              <span className="text-14 font-bold text-heading md:text-15">{ru}</span>
              <span className="text-13 font-medium text-muted max-md:hidden">{en}</span>
            </span>
          </Radio>
        ))}
      </RadioGroup>
      <div className="flex flex-col gap-2 md:gap-3">
        <SectionLabel desktop="Целевой регион или вуз" id={regionLabelId} mobile="Регион" tablet="Регион или вуз" />
        <ChipGroup
          aria-labelledby={regionLabelId}
          className="md:gap-2.5"
          itemClassName="max-md:min-h-11 max-md:px-3.5 max-md:text-13"
          onChange={onRegionChange}
          options={REGIONS}
          value={region}
        />
      </div>
      <div className="flex flex-col gap-2 md:gap-3">
        <SectionLabel
          desktop="Уровень английского"
          id={levelLabelId}
          mobile="Английский"
          tablet="Уровень английского"
        />
        <SegmentedControl
          aria-labelledby={levelLabelId}
          className="lg:max-w-130"
          descriptionClassName="max-lg:hidden"
          itemClassName="py-3 text-15 md:text-16"
          onChange={onLevelChange}
          options={LEVELS}
          value={level}
        />
      </div>
      <StepActions
        onBack={onBack}
        renderPrimary={(className) => (
          <Link className={buttonVariants({ className, size: 'lg' })} onClick={() => void onFinish()} to="/">
            <Sparkles aria-hidden className="max-lg:hidden" />
            Сгенерировать план
          </Link>
        )}
      />
    </>
  )
}
