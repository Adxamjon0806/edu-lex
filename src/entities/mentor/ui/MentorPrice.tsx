import { classNames } from '~/shared/lib'

type MentorPriceProps = Readonly<{
  className?: string
  /** Подпись после цены, например «/ 50 мин»; приглушена, как в макете. */
  note?: string
  price: number
}>

// Цена сессии на emerald-плашке: «$35» или «$35 / 50 мин». Размер и отступы задаёт место использования.
export function MentorPrice({ className, note, price }: MentorPriceProps) {
  return (
    <span className={classNames('shrink-0 rounded-8 bg-emerald font-bold whitespace-nowrap text-white', className)}>
      ${price}
      {note !== undefined && <span className="font-medium opacity-80"> {note}</span>}
    </span>
  )
}
