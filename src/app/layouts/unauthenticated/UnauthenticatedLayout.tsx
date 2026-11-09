import { Outlet } from '@tanstack/react-router'

// Страницы неавторизованной части занимают весь экран (онбординг в макете — без шапки и подвала),
// поэтому отступы и разметку main задают сами страницы.
export function UnauthenticatedLayout() {
  return <Outlet />
}
