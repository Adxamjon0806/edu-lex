import { useId } from 'react'

import { classNames } from '~/shared/lib'
import { Button, OtpInput } from '~/shared/ui'

import { AUTH_METHOD_TEXTS, DISABLED_PRIMARY_CLASS_NAME, type AuthMethod } from '../config/onboarding'
import { maskIdentifier } from '../lib/maskIdentifier'
import { StepActions } from './StepActions'
import { StepHeading } from './StepHeading'

const CODE_LENGTH = 6

type OtpStepProps = Readonly<{
  code: string
  identifier: string
  isResent: boolean
  method: AuthMethod
  onBack: () => void
  onCodeChange: (code: string) => void
  onConfirm: () => void
  onResend: () => void
}>

// Шаг 3: код подтверждения из письма или SMS. Ширина на десктопе — до 520px, как в макете.
export function OtpStep({
  code,
  identifier,
  isResent,
  method,
  onBack,
  onCodeChange,
  onConfirm,
  onResend,
}: OtpStepProps) {
  const { changeWhat, otpIcon: Icon, otpSubtitle, otpTitle } = AUTH_METHOD_TEXTS[method]
  const isComplete = code.length === CODE_LENGTH
  const resendId = useId()

  return (
    <form
      className="flex flex-col gap-4.5 md:gap-6 lg:max-w-130"
      noValidate
      onSubmit={(event) => {
        event.preventDefault()
        if (isComplete) onConfirm()
      }}
    >
      <span className="flex size-14 items-center justify-center rounded-18 bg-success-subtle text-success md:size-16">
        <Icon aria-hidden className="size-6 md:size-7" />
      </span>
      <div className="flex flex-col gap-2">
        <StepHeading
          subtitle={
            <>
              {otpSubtitle} <span className="font-bold text-body">{maskIdentifier(identifier, method)}</span>
            </>
          }
          title={otpTitle}
        />
        <button
          className="cursor-pointer self-start rounded-4 text-14 font-bold text-success hover:text-emerald focus-visible:outline-2 focus-visible:outline-emerald"
          onClick={onBack}
          type="button"
        >
          Изменить {changeWhat}
        </button>
      </div>
      <OtpInput
        aria-describedby={resendId}
        aria-label="Код подтверждения"
        length={CODE_LENGTH}
        onChange={onCodeChange}
        value={code}
      />
      <p className="flex flex-wrap gap-1.5 text-14 font-medium text-muted" id={resendId}>
        <span>Не пришёл код?</span>
        <button
          className="cursor-pointer rounded-4 font-bold text-success hover:text-emerald focus-visible:outline-2 focus-visible:outline-emerald"
          onClick={onResend}
          type="button"
        >
          {isResent ? 'Код отправлен повторно' : 'Отправить ещё раз'}
        </button>
      </p>
      <StepActions
        onBack={onBack}
        renderPrimary={(className) => (
          <Button
            className={classNames(className, DISABLED_PRIMARY_CLASS_NAME)}
            disabled={!isComplete}
            size="lg"
            type="submit"
          >
            Подтвердить
          </Button>
        )}
        stretchOnDesktop
      />
    </form>
  )
}
