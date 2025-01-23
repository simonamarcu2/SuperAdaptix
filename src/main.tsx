import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/index.css'
import SuperAdaptixApp from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SuperAdaptixApp />
  </StrictMode>,
)
