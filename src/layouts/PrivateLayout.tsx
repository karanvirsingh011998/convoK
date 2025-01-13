import { ThemeToggle } from "../components/theme-toggle"
import { Link, Outlet, useNavigate } from "react-router-dom"
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../components/ui/dropdown-menu"
import FooterComponent from "../components/footer"
import { logout } from "../utils/auth"

export const PrivateLayout = () => {
  const navigate = useNavigate()

  const goToPage = (text: string) => {
    navigate(text);
  };
  return (
    <div className="h-screen flex flex-col">
      <header className="border-b">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/">
          <h1 className="text-xl font-bold">ConvoK</h1>
          </Link>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={()=> goToPage('/dashboard')}>Dashboard</DropdownMenuItem>
                <DropdownMenuItem onClick={()=> goToPage('/profile')}>Profile</DropdownMenuItem>
                <DropdownMenuItem onClick={()=> goToPage('/settings')}>Settings</DropdownMenuItem>
                <DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      <main className="flex-grow">
        <Outlet />
      </main>
      <FooterComponent />
    </div>
  )
} 