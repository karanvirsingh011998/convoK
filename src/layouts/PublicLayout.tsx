import FooterComponent from "../components/footer"
import { ThemeToggle } from "../components/theme-toggle"
import { Link, Outlet } from "react-router-dom"

export const PublicLayout = () => {
  return (
    <div className="h-screen flex flex-col">
      <header className="border-b">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <Link to="/">
          <h1 className="text-xl font-bold">ConvoK</h1>
          </Link>
          <ThemeToggle />
        </div>
      </header>

      <main className="flex-grow">
        <Outlet />
      </main>
      <FooterComponent />
    </div>
  )
} 
