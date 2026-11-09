import { useState } from 'react'

import { useNavigate } from '@tanstack/react-router'

import { saveRole } from '~/entities/session'

import {
  DEFAULTS,
  STEP_NUMBER,
  type AuthMethod,
  type AuthMode,
  type Level,
  type OnboardingStep,
  type Role,
} from '../config/onboarding'
import { AuthStep } from './AuthStep'
import { OnboardingHero } from './OnboardingHero'
import { OtpStep } from './OtpStep'
import { RoleStep } from './RoleStep'
import { StudentTrackStep } from './StudentTrackStep'
import { TeacherVerificationStep } from './TeacherVerificationStep'

/*
 * Онбординг — он же вход и регистрация: роль → почта или телефон с паролем → код → трек или верификация.
 * Сухая вёрстка: состояние только интерфейсное, запросов нет. Завершение пока возвращает к первому шагу.
 * Сетка из макета: до lg тёмно-синяя часть — полоса сверху, с lg — колонка 520px слева.
 */
export function SignInPage() {
  const [step, setStep] = useState<OnboardingStep>('role')
  const [role, setRole] = useState<Role>(DEFAULTS.role)

  const [authMode, setAuthMode] = useState<AuthMode>('signup')
  const [authMethod, setAuthMethod] = useState<AuthMethod>('email')
  const [identifier, setIdentifier] = useState('')
  const [password, setPassword] = useState('')

  const [code, setCode] = useState('')
  const [isCodeResent, setIsCodeResent] = useState(false)

  const [directions, setDirections] = useState<string[]>([...DEFAULTS.directions])
  const [region, setRegion] = useState<string>(DEFAULTS.region)
  const [level, setLevel] = useState<Level>(DEFAULTS.level)

  const navigate = useNavigate({ from: '/sign-in' })

  const goToRole = () => {
    setStep('role')
  }

  const handleSubmit = async () => {
    console.log(role)
    saveRole(role)
    setCode('')
    setIsCodeResent(false)
    setStep('otp')
    await navigate({ to: '/' })
  }

  return (
    <div className="flex min-h-dvh flex-1 flex-col lg:grid lg:grid-cols-[--spacing(130)_1fr]">
      <OnboardingHero stepNumber={STEP_NUMBER[step]} />
      <main className="flex flex-col gap-4.5 px-5 pt-6 pb-8 md:gap-7 md:p-12 lg:gap-8 lg:px-24 lg:py-18">
        {step === 'role' && (
          <RoleStep
            onNext={() => {
              setStep('auth')
            }}
            onRoleChange={setRole}
            role={role}
          />
        )}
        {step === 'auth' && (
          <AuthStep
            identifier={identifier}
            method={authMethod}
            mode={authMode}
            onBack={goToRole}
            onForgotPassword={goToRole}
            onIdentifierChange={setIdentifier}
            onMethodChange={(method) => {
              setAuthMethod(method)
              setIdentifier('')
            }}
            onModeChange={setAuthMode}
            onPasswordChange={setPassword}
            onSubmit={() => {
              setCode('')
              setIsCodeResent(false)
              setStep('otp')
            }}
            password={password}
            role={role}
          />
        )}
        {step === 'otp' && (
          <OtpStep
            code={code}
            identifier={identifier}
            isResent={isCodeResent}
            method={authMethod}
            onBack={() => {
              setStep('auth')
            }}
            onCodeChange={setCode}
            onConfirm={() => {
              setStep('profile')
            }}
            onResend={() => {
              setIsCodeResent(true)
              setCode('')
            }}
          />
        )}
        {step === 'profile' && role === 'student' && (
          <StudentTrackStep
            directions={directions}
            level={level}
            onBack={goToRole}
            onDirectionsChange={setDirections}
            onFinish={handleSubmit}
            onLevelChange={setLevel}
            onRegionChange={setRegion}
            region={region}
          />
        )}
        {step === 'profile' && role === 'teacher' && (
          <TeacherVerificationStep onBack={goToRole} onSubmit={handleSubmit} />
        )}
      </main>
    </div>
  )
}
