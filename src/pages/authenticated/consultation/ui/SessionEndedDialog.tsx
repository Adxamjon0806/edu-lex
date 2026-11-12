import { useEffect, useRef, useState } from 'react'

import { Link } from '@tanstack/react-router'
import { CircleCheck } from 'lucide-react'

import { Button, buttonVariants } from '~/shared/ui'

import { DEFAULT_RATING, ENDED_TEXTS } from '../config/consultation'
import { StarRating } from './StarRating'

type SessionEndedDialogProps = Readonly<{
  onReturn: () => void
  open: boolean
  price: number
}>

/*
 * «Сессия завершена» поверх звонка: нативный <dialog> (фокус внутри, Esc закрывает его, как «Вернуться»).
 * Вид из макета: на десктопе — карточка с иконкой в круге и подробным текстом; на планшете — карточка
 * короче; на мобильном — без карточки. «На главную» есть на всех ширинах (в макете — только на десктопе).
 * Оценка пока никуда не отправляется.
 */
export function SessionEndedDialog({ onReturn, open, price }: SessionEndedDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  // Фокус при открытии — на «Вернуться»: иначе браузер ставит его на первую звезду оценки.
  const returnRef = useRef<HTMLButtonElement>(null)
  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    if (open && !dialog.open) {
      dialog.showModal()
      returnRef.current?.focus()
    }
    if (!open && dialog.open) dialog.close()
  }, [open])

  const [rating, setRating] = useState(DEFAULT_RATING)

  return (
    <dialog
      aria-labelledby="session-ended-title"
      className="m-0 hidden h-full max-h-none w-full max-w-none items-center justify-center bg-navy-950/92 p-6 text-white backdrop-blur-sm open:flex md:bg-navy-950/90 md:p-10 lg:bg-navy-950/88 lg:backdrop-blur-md"
      onClose={onReturn}
      ref={dialogRef}
    >
      <div className="flex max-w-115 flex-col items-center gap-3 text-center md:gap-3.5 md:rounded-22 md:border md:border-navy-500 md:bg-navy md:p-9 lg:gap-4 lg:px-12 lg:py-10">
        <CircleCheck aria-hidden className="size-11 text-emerald-500 md:size-10 lg:hidden" />
        <span className="flex size-16 items-center justify-center rounded-full bg-emerald/18 text-emerald-500 max-lg:hidden">
          <CircleCheck aria-hidden className="size-7.5" />
        </span>
        <h2 className="font-serif text-24 font-semibold md:text-26 lg:text-28" id="session-ended-title">
          {ENDED_TEXTS.title}
        </h2>
        <p className="text-13 leading-relaxed font-medium text-navy-100 md:text-14">
          ${price} <span className="lg:hidden">{ENDED_TEXTS.transferredShort}</span>
          <span className="max-lg:hidden">
            {ENDED_TEXTS.transferred} {ENDED_TEXTS.rateHint}
          </span>
        </p>
        <StarRating onChange={setRating} value={rating} />
        <div className="flex flex-wrap justify-center gap-2.5">
          <Button onClick={onReturn} ref={returnRef} variant="on-navy">
            {ENDED_TEXTS.rejoin}
          </Button>
          <Link className={buttonVariants()} to="/">
            {ENDED_TEXTS.home}
          </Link>
        </div>
      </div>
    </dialog>
  )
}
