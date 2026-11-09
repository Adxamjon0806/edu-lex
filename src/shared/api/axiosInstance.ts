import axios from 'axios'

import { ENV_VARIABLES } from '~/shared/config'

export const axiosInstance = axios.create({
  baseURL: ENV_VARIABLES.API_URL,
  // По умолчанию таймаута нет (0): зависший запрос держал бы запрос TanStack Query в загрузке бесконечно.
  timeout: 30_000,
})
