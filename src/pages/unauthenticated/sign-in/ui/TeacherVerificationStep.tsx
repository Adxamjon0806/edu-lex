import { FileBadge } from 'lucide-react'

import { Button, TextField } from '~/shared/ui'

import { TEACHER_FIELDS } from '../config/onboarding'
import { StepActions } from './StepActions'
import { StepHeading } from './StepHeading'

type TeacherVerificationStepProps<T> = Readonly<{
  onBack: () => void
  onSubmit: () => Promise<T>
}>

// Шаг 4 для преподавателя: анкета и документы для верификации.
export function TeacherVerificationStep<T>({ onBack, onSubmit }: TeacherVerificationStepProps<T>) {
  return (
    <>
      <StepHeading
        subtitle="Подтверждённые документы появятся в вашей публичной карточке в каталоге менторов."
        subtitleClassName="max-lg:hidden"
        title="Верификация профиля"
      />
      <div className="flex flex-col gap-4.5 md:gap-3.5 lg:grid lg:grid-cols-2 lg:gap-4">
        {TEACHER_FIELDS.map(({ label, value }) => (
          <TextField defaultValue={value} key={label} label={label} size="md" />
        ))}
      </div>
      <DocumentsDropzone />
      <StepActions
        onBack={onBack}
        renderPrimary={(className) => (
          <Button className={className} onClick={() => void onSubmit()} size="lg">
            Отправить на верификацию
          </Button>
        )}
      />
    </>
  )
}

/*
 * Блок загрузки документов: пунктирная рамка, весь блок — подпись к скрытому полю выбора файла.
 * На десктопе иконка в подложке и строка с форматами; на узких экранах в макете — короткий текст.
 * Hover и фокус в макете не нарисованы: рамка становится emerald, фокус — обводка.
 */
function DocumentsDropzone() {
  return (
    <label className="flex cursor-pointer items-center gap-3 rounded-14 border-[1.5px] border-dashed border-line-strong bg-surface p-4 transition-colors hover:border-emerald has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-emerald md:gap-3.5 md:p-5 lg:gap-4 lg:p-6">
      <input accept=".pdf,.jpg,.jpeg" className="sr-only" multiple type="file" />
      <span className="flex shrink-0 items-center justify-center text-premium lg:size-12 lg:rounded-12 lg:bg-premium-subtle">
        <FileBadge aria-hidden className="size-5 md:size-5.5" />
      </span>
      <span className="flex flex-1 flex-col gap-1">
        <span className="text-13 font-semibold md:text-14 lg:text-15 lg:font-bold">
          <span className="lg:hidden">Дипломы, IELTS / TOEFL</span>
          <span className="max-lg:hidden">Дипломы, IELTS / TOEFL, документы о степени</span>
        </span>
        <span className="text-13 font-medium text-muted max-lg:hidden">PDF или JPG до 10 МБ · проверка 24–48 ч</span>
      </span>
      <span className="text-13 font-bold text-success md:text-14">Загрузить</span>
    </label>
  )
}
