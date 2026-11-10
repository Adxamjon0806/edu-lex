import { Link } from '@tanstack/react-router'

// «В профиль» после теста. Профиля пока нет: ссылка ведёт туда же, куда пункт «Профиль» в навигации.
export function ProfileLink({ className }: Readonly<{ className: string }>) {
  return (
    <Link className={className} hash="profile" to="/">
      В профиль
    </Link>
  )
}
