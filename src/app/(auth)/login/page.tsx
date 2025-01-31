'use client'

/**
 * v0 by Vercel.
 * @see https://v0.dev/t/zqdqUnRSx7N
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { signIn } from "next-auth/react"
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"

export default function Component() {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
})
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setCredentials((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { username, password } = credentials;
    if (!username || !password) {
      return toast({ title: 'Unable to login', description: "Username or password is empty", variant: 'destructive' });
    }

    setIsLoading(true);
    try {
      const result = await signIn('credentials', { username, password, redirect: false });
      if (result?.error) {
        return toast({ title: "Invalid Credentials", variant: 'destructive' });
      }

      toast({
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
      })
      router.replace("/")
    } catch {
      toast({ title: "Something is wrong", variant: 'destructive' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-[100dvh] items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-md space-y-6">
        <div className="space-y-2 text-center">
          <div className="inline-block rounded-lg bg-primary px-3 py-1 text-sm font-medium text-primary-foreground">
            PLN Dashboard
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Sign in to your account</h1>
          {/* <p className="text-muted-foreground">Enter your credentials to access the PLN performance dashboard.</p> */}
        </div>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input id="username" name="username" placeholder="Enter your username" onChange={handleChange} required  value={credentials.username} />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
              <Link
                href="#"
                className="text-sm font-medium underline text-primary-foreground hover:text-primary"
                prefetch={false}
              >
                Forgot password?
              </Link>
            </div>
            <Input id="password" name="password" type="password" placeholder="Enter your password" required onChange={handleChange} value={credentials.password} />
          </div>
          <div className="flex items-center">
            <Checkbox id="remember" />
            <Label htmlFor="remember" className="ml-2 text-sm font-medium">
              Remember me
            </Label>
          </div>
          <Button type="submit" className="w-full" disabled={isLoading ? true : false}>
            Sign in
          </Button>
        </form>
      </div>
    </div>
  )
}

