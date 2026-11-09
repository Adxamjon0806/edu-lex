import { ArrowRight } from 'lucide-react'

import { Button, Radio, RadioGroup, RadioIndicator } from '~/shared/ui'

import { ROLES, type Role } from '../config/onboarding'
import { StepActions } from './StepActions'
import { StepHeading } from './StepHeading'

type RoleStepProps = Readonly<{
  onNext: () => void
  onRoleChange: (role: Role) => void
  role: Role
}>

/*
 * Шаг 1: выбор роли. Карточки по макету:
 * - мобильный — вертикальная: иконка 48px и индикатор сверху, заголовок 21px и описание;
 * - планшет — горизонтальная: иконка 60px, текст, индикатор справа;
 * - десктоп — две колонки, вертикальная карточка от 240px: иконка 56px, заголовок 26px, подпись на английском.
 */
export function RoleStep({ onNext, onRoleChange, role }: RoleStepProps) {
  return (
    <>
      <RadioGroup
        className="flex flex-col gap-4.5 md:gap-4 lg:grid lg:grid-cols-2 lg:gap-5"
        legend={
          <StepHeading
            subtitle="Выберите роль — от неё зависит интерфейс и возможности."
            subtitleClassName="max-lg:hidden"
            title="Кто вы на платформе?"
          />
        }
        legendClassName="mb-4.5 md:mb-7 lg:mb-8"
        onChange={(value) => {
          onRoleChange(value as Role)
        }}
        value={role}
      >
        {ROLES.map(({ description, en, icon: Icon, title, value }) => (
          <Radio
            className="flex flex-col gap-2.5 rounded-16 p-4.5 md:flex-row md:items-center md:gap-5 md:p-6 lg:min-h-60 lg:flex-col lg:items-stretch lg:gap-4 lg:p-7"
            key={value}
            ring
            value={value}
          >
            <span className="flex items-center justify-between md:contents lg:flex">
              <span className="flex size-12 shrink-0 items-center justify-center rounded-12 bg-success-subtle text-success md:size-15 md:rounded-14 lg:size-14">
                <Icon aria-hidden className="size-5.5 md:size-6.5" />
              </span>
              <RadioIndicator className="md:order-last lg:order-none" />
            </span>
            <span className="flex flex-col gap-1.5 md:flex-1 lg:gap-4">
              <span className="font-serif text-21 font-semibold text-heading md:text-24 lg:text-26">{title}</span>
              <span className="text-12 font-semibold tracking-wider text-premium uppercase max-lg:hidden">{en}</span>
              <span className="text-14 leading-normal text-muted md:text-15">{description}</span>
            </span>
          </Radio>
        ))}
      </RadioGroup>
      <StepActions
        renderPrimary={(className) => (
          <Button className={className} onClick={onNext} size="lg">
            Продолжить
            <ArrowRight aria-hidden className="max-lg:hidden" />
          </Button>
        )}
      />
    </>
  )
}
