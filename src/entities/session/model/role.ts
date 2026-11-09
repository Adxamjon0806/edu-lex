export type UserRole = 'student' | 'teacher'

// Ключ, под которым онбординг сохраняет выбранную роль. Временное хранилище до появления авторизации на сервере.
const ROLE_STORAGE_KEY = 'role'

// Роль из localStorage или null, если её нет, она испорчена или хранилище недоступно (приватный режим).
export function getStoredRole(): null | UserRole {
  try {
    const value = localStorage.getItem(ROLE_STORAGE_KEY)
    return isUserRole(value) ? value : null
  } catch {
    return null
  }
}

export function saveRole(role: UserRole): void {
  try {
    localStorage.setItem(ROLE_STORAGE_KEY, role)
  } catch {
    // Хранилище недоступно: роль не сохранится, и защищённые страницы вернут на онбординг.
  }
}

function isUserRole(value: unknown): value is UserRole {
  return value === 'student' || value === 'teacher'
}
