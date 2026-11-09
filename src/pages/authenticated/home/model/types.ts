export type ActiveCourse = Readonly<{
  modulesDone: number
  modulesTotal: number
  /** Текущий модуль, например «Contract Formation». */
  moduleTitle: string
  /** Прогресс курса в процентах, 0–100. */
  progress: number
  termsLeft: number
  title: string
}>
