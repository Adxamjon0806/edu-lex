import { Link } from '@tanstack/react-router'

// «В профиль» после теста.
export function ProfileLink({ className }: Readonly<{ className: string }>) {
  return (
    <Link className={className} to="/profile">
      В профиль
    </Link>
  )
}
