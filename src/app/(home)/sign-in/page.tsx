"use client";

import { SignInButton, SignUpButton } from "@clerk/nextjs";
import { useState, useEffect } from "react";
import { Button } from "~/components/button-landing";
import { CloudUpload, ArrowLeft, Moon, Sun } from "lucide-react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/card";

export default function SignUpPage() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSignUp = () => {
    // This will be replaced with Clerk authentication later
    router.push("/drive");
  };

  const handleSignIn = () => {
    // This will be replaced with Clerk authentication later
    router.push("/drive");
  };

  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="relative sticky top-0 z-50 border-b border-border bg-gradient-to-b from-background to-background/95 backdrop-blur-sm">
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2">
              <CloudUpload className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold">JakoDrive</span>
            </Link>
          </div>
          <div className="flex items-center gap-4">
            {mounted && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                aria-label="Toggle theme"
              >
                {theme === "dark" ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )}
              </Button>
            )}
          </div>
        </div>
      </header>

      {/* Sign Up Section */}
      <section className="relative flex flex-1 items-center justify-center overflow-hidden p-4">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/20 via-background to-accent/30 dark:from-primary/30 dark:via-background/80 dark:to-primary/10" />
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent dark:from-primary/20"></div>

        <Card className="w-full max-w-md border-border bg-card/80 backdrop-blur-sm">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-2xl font-bold">
              Create your account
            </CardTitle>
            <CardDescription>
              Get started with JakoDrive and access your files anywhere
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2 text-center">
              <p className="text-muted-foreground">
                Sign up to get 15GB of free storage and access to all JakoDrive
                features.
              </p>

              <div className="mt-6 flex flex-col gap-4">
                <SignUpButton forceRedirectUrl={"/drive"} mode="modal">
                  <Button size="lg" className="w-full">
                    Sign up
                  </Button>
                </SignUpButton>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-border" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-card px-2 text-muted-foreground">
                      Or continue with
                    </span>
                  </div>
                </div>

                <SignInButton forceRedirectUrl={"/drive"} mode="modal">
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full"
                    >
                    Sign in
                  </Button>
                </SignInButton>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <p className="text-center text-xs text-muted-foreground">
              By signing up, you agree to our{" "}
              <Link
                href="#"
                className="underline underline-offset-4 hover:text-primary"
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                href="#"
                className="underline underline-offset-4 hover:text-primary"
              >
                Privacy Policy
              </Link>
              .
            </p>
          </CardFooter>
        </Card>
      </section>

      {/* Back to Home Link */}
      <div className="container mx-auto px-4 py-6">
        <Link
          href="/"
          className="flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to home</span>
        </Link>
      </div>
    </div>
  );
}
