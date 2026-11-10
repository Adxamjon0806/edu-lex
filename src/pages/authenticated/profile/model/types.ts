export type Certificate = Readonly<{
  /** Выдан ли сертификат: невыданный приглушён, его PDF недоступен. */
  issued: boolean
  meta: string
  /** Короткая подпись для мобильного. */
  short: string
  status: string
  title: string
}>

export type Skill = Readonly<{ label: string; value: number }>
