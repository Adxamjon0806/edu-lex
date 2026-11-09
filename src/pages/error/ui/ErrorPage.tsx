import { useEffect } from 'react'

import { useQueryErrorResetBoundary } from '@tanstack/react-query'
import { useRouter, type ErrorComponentProps } from '@tanstack/react-router'

// Страница ошибки загрузки или рендера маршрута (https://tanstack.com/router/latest/docs/framework/react/guide/external-data-loading).
// Показывается в корне, как NotFoundPage, поэтому и разметка как у неё.
export function ErrorPage({ error }: Readonly<ErrorComponentProps>) {
  const queryErrorResetBoundary = useQueryErrorResetBoundary()

  // Сбрасываем ошибки запросов сразу при показе страницы, а не по кнопке: иначе useSuspenseQuery
  // при следующем рендере, в том числе после ухода на другую страницу, снова выбросил бы ошибку из кэша.
  useEffect(() => {
    queryErrorResetBoundary.reset()
  }, [queryErrorResetBoundary])

  const router = useRouter()

  return (
    <main className="flex flex-1 items-center px-4 md:px-6 lg:px-8">
      <section className="flex grow justify-center text-center">
        {/* Отступы на сетке с шагом 8px (https://atlassian.design/foundations/spacing) по принципу близости:
            заголовок и текст ошибки — одна группа (8px), кнопка — отдельное действие (24px). */}
        <div className="flex flex-col items-center gap-6">
          {/* Скринридер сразу зачитывает сообщение об ошибке. Кнопка вне alert: эта роль только для текста
              (https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/alert_role). */}
          <div className="flex flex-col gap-2" role="alert">
            <h1>Something went wrong</h1>
            {/* Текст ошибки нужен разработчику; пользователю в продакшене он ничего не скажет и может раскрыть детали. */}
            {import.meta.env.DEV && <pre>{error instanceof Error ? error.message : String(error)}</pre>}
          </div>
          {/* invalidate, а не reset из пропсов: перезапускает loader маршрута и сбрасывает границу ошибки. */}
          <button
            onClick={() => {
              void router.invalidate()
            }}
            type="button"
          >
            Try again
          </button>
        </div>
      </section>
    </main>
  )
}
