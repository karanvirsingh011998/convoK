import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { ThemeProvider } from './components/theme-provider.tsx'
import { HashRouter } from 'react-router-dom'
import { Toaster } from './components/ui/toaster.tsx'

createRoot(document.getElementById('root')!).render(
  <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
    <HashRouter>
      <App />
      <Toaster />
    </HashRouter>
  </ThemeProvider>
)
