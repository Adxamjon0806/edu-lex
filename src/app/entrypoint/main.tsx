import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import '~/app/styles'

import { Providers } from '~/app/composition'

const rootElement = document.getElementById('root')

if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <Providers />
    </StrictMode>,
  )
}
