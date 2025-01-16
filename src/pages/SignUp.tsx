import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { Button } from "../components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../components/ui/form"
import { Input } from "../components/ui/input"
import { Link } from "react-router-dom"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"
import { cn } from "../lib/utils"
import { useNavigate } from "react-router-dom"
import { useToast } from "../hooks/use-toast"
import axios from "axios"

const signUpSchema = yup.object({
  username: yup
    .string()
    .min(3, "Username must be at least 3 characters")
    .required("Username is required"),
  email: yup
    .string()
    .email("Please enter a valid email")
    .required("Email is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      "Password must contain at least one uppercase letter, one lowercase letter, and one number"
    )
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Please confirm your password"),
}).required()

type SignUpFormData = yup.InferType<typeof signUpSchema>

export function SignUpForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const form = useForm<SignUpFormData>({
    resolver: yupResolver(signUpSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  })
  const { toast } = useToast()

  const navigate = useNavigate()
  const registerUser = async (userData: any) => {
const {email, username, password} = userData
    const payload = {
      email,password,username
    }
    try {
      const response = await axios.post('http://localhost:3000/api/auth/register', payload, {
        withCredentials: true
      });
      console.log(response,'123456789')
      return response.data;
    } catch (error:any) {
      console.error('Error:', error.response?.data || error.message);
      throw error;
    }
  };

  const onSubmit = async (data: SignUpFormData) => {
    registerUser(data)
    .then(response => console.log(response))
    .catch(error => console.error(error));

    // try {
    //   const existingUsers = JSON.parse(sessionStorage.getItem('users') || '[]');
      
    //   const userExists = existingUsers.some((user: SignUpFormData) => 
    //     user.email === data.email || user.username === data.username
    //   );

    //   if (userExists) {
    //     form.setError('email', { 
    //       type: 'manual', 
    //       message: 'An account with this email or username already exists' 
    //     });
    //     return;
    //   }

    //   // Add new user to the users array
    //   existingUsers.push(data);
    //   sessionStorage.setItem('users', JSON.stringify(existingUsers));
      
    //   toast({
    //     title: "User Created",
    //     description: "Please login with the credentials",
    //   })
    //   navigate('/login');
      
    // } catch (error) {
    //   console.error("Sign up failed:", error)
    // }
  }

  return (
    <div className={cn("h-full flex flex-col gap-6 justify-center items-center", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Create an account</CardTitle>
          <CardDescription>
            Enter your information to create your account
          </CardDescription>
        </CardHeader>
        <CardContent>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="johndoe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="john@example.com" type="email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your password" type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input placeholder="Confirm your password" type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full">
                Create Account
              </Button>
            </form>
          </Form>

          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link to="/login" className="underline text-primary">
              Sign in
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 