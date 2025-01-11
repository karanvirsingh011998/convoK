import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { ThemeProvider } from './components/theme-provider.tsx'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from './components/ui/toaster.tsx'

createRoot(document.getElementById('root')!).render(
  <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
    <BrowserRouter>
      <App />
      <Toaster />
    </BrowserRouter>
  </ThemeProvider>
)
