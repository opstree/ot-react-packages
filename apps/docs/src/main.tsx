import React from 'react'
import { LenisProvider } from './leisprovider/lenisProvider.js'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@workspace/ui/global.css'
import './style/index.css'
// import './style/mdx.css'
import { ThemeProvider } from './components/theme-provider.js'
import App from './App.js'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <LenisProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </LenisProvider>
    </ThemeProvider>
  </StrictMode>
)
