import { Link } from '@tanstack/react-router'
import { Lock, type LucideIcon } from 'lucide-react'

import { classNames } from '~/shared/lib'
import { Button, SegmentedControl, TextField } from '~/shared/ui'

import {
  AUTH_METHOD_TEXTS,
  AUTH_METHODS,
  AUTH_MODE_TEXTS,
  ROLES,
  type AuthMethod,
  type AuthMode,
  type Role,
} from '../config/onboarding'
import { getPasswordScore, PASSWORD_BAR_CLASSES, PASSWORD_HINTS } from '../lib/passwordStrength'
import { StepActions } from './StepActions'
import { StepHeading } from './StepHeading'

type AuthStepProps = Readonly<{
  identifier: string
  method: AuthMethod
  mode: AuthMode
  onBack: () => void
  onForgotPassword: () => void
  onIdentifierChange: (value: string) => void
  onMethodChange: (method: AuthMethod) => void
  onModeChange: (mode: AuthMode) => void
  onPasswordChange: (value: string) => void
  onSubmit: () => void
  password: string
  role: Role
}>

// Шаг 2: регистрация или вход по почте или телефону. Ширина формы на десктопе — до 520px, как в макете.
export function AuthStep({
  identifier,
  method,
  mode,
  onBack,
  onForgotPassword,
  onIdentifierChange,
  onMethodChange,
  onModeChange,
  onPasswordChange,
  onSubmit,
  password,
  role,
}: AuthStepProps) {
  const modeTexts = AUTH_MODE_TEXTS[mode]
  const methodTexts = AUTH_METHOD_TEXTS[method]
  const canSubmit = identifier.trim().length > 0 && password.length > 0
  const isSignup = mode === 'signup'
  const roleInfo = ROLES.find(({ value }) => value === role) ?? ROLES[0]

  return (
    <form
      className="flex flex-col gap-4 md:gap-5.5 lg:max-w-130"
      noValidate
      onSubmit={(event) => {
        event.preventDefault()
        if (canSubmit) onSubmit()
      }}
    >
      <StepHeading subtitle={modeTexts.subtitle} title={modeTexts.title} />
      <RoleBadge icon={roleInfo.icon} onChange={onBack} title={roleInfo.title} />
      <SegmentedControl
        aria-label="Способ входа"
        itemClassName="text-14"
        onChange={onMethodChange}
        options={AUTH_METHODS}
        value={method}
      />
      <TextField
        autoComplete={methodTexts.autoComplete}
        icon={methodTexts.idIcon}
        label={methodTexts.idLabel}
        onChange={(event) => {
          onIdentifierChange(event.target.value)
        }}
        placeholder={methodTexts.idPlaceholder}
        type={methodTexts.idType}
        value={identifier}
      />
      <TextField
        autoComplete={isSignup ? 'new-password' : 'current-password'}
        hint={isSignup && <PasswordStrength password={password} />}
        icon={Lock}
        label="Пароль"
        labelAction={
          !isSignup && (
            <Link
              className="rounded-4 text-13 font-bold text-success hover:text-emerald focus-visible:outline-2 focus-visible:outline-emerald"
              onClick={onForgotPassword}
              to="/sign-in"
            >
              Забыли пароль?
            </Link>
          )
        }
        onChange={(event) => {
          onPasswordChange(event.target.value)
        }}
        placeholder={modeTexts.passwordPlaceholder}
        type="password"
        value={password}
      />
      <StepActions
        hideBackOnMobile
        onBack={onBack}
        renderPrimary={(className) => (
          <Button className={className} disabled={!canSubmit} size="lg" type="submit">
            {modeTexts.submit}
          </Button>
        )}
        stretchOnDesktop
      />
      <p className="flex flex-wrap justify-center gap-1.5 pt-0.5 text-14 font-medium text-muted md:pt-1.5">
        <span>{modeTexts.switchQuestion}</span>
        <button
          className="cursor-pointer rounded-4 font-bold text-success hover:text-emerald focus-visible:outline-2 focus-visible:outline-emerald"
          onClick={() => {
            onModeChange(isSignup ? 'login' : 'signup')
          }}
          type="button"
        >
          {modeTexts.switchAction}
        </button>
      </p>
    </form>
  )
}

// Индикатор надёжности пароля при регистрации: 4 полоски и подсказка.
function PasswordStrength({ password }: Readonly<{ password: string }>) {
  const score = getPasswordScore(password)

  return (
    <>
      <div aria-hidden className="mt-0.5 flex gap-1">
        {[1, 2, 3, 4].map((bar) => (
          <span
            className={classNames('h-1 flex-1 rounded-4', PASSWORD_BAR_CLASSES[bar <= score ? score : 0])}
            key={bar}
          />
        ))}
      </div>
      <span className="text-12 font-medium text-muted">{PASSWORD_HINTS[score]}</span>
    </>
  )
}

// Плашка выбранной роли с кнопкой «Изменить» (возврат к шагу 1).
function RoleBadge({
  icon: Icon,
  onChange,
  title,
}: Readonly<{ icon: LucideIcon; onChange: () => void; title: string }>) {
  return (
    <div className="flex items-center gap-2.5 self-start rounded-full bg-success-subtle py-1.5 pr-1.5 pl-3.5 text-success">
      <Icon aria-hidden className="size-4 shrink-0" />
      <span className="text-13 font-bold">{title}</span>
      <button
        className="cursor-pointer rounded-16 bg-surface px-3 py-1.5 text-12 font-bold text-body transition-colors hover:bg-surface-muted focus-visible:outline-2 focus-visible:outline-emerald"
        onClick={onChange}
        type="button"
      >
        Изменить
      </button>
    </div>
  )
}
