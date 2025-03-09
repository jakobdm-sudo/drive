"use client";

import { useState, useEffect } from "react";
import { Button } from "~/components/button-landing";
import { CloudUpload, Database, Lock, Moon, Sun } from "lucide-react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { redirect } from "next/navigation";
import { auth } from "node_modules/@clerk/nextjs/dist/types/app-router/server/auth";
import { handleLogin } from "~/server/actions";

export default function LandingPage() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="relative sticky top-0 z-50 border-b border-border bg-gradient-to-b from-background to-background/95 backdrop-blur-sm">
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          <div className="flex items-center gap-2">
            <CloudUpload className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold">JakoDrive</span>
          </div>
          <div className="flex items-center gap-4">
         
            <div className="flex items-center gap-4">
              <form action={handleLogin}>
                <Button variant="outline" type="submit">
                  Login
                </Button>
              </form>
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
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative flex flex-1 flex-col items-center justify-center overflow-hidden px-4 py-20 text-center md:py-32">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/20 via-background to-accent/30 dark:from-primary/30 dark:via-background/80 dark:to-primary/10" />
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent dark:from-primary/20"></div>
        <div className="relative z-10 mx-auto max-w-4xl space-y-6">
          <h1 className="text-4xl font-bold tracking-tight md:text-6xl">
            Store, share, and collaborate with{" "}
            <span className="text-primary">JakoDrive</span>
          </h1>
          <p className="mx-auto max-w-2xl text-xl text-muted-foreground">
            The secure cloud storage solution that puts your data privacy first.
            Access your files from anywhere, anytime.
          </p>
          <div className="flex flex-col justify-center gap-4 pt-6 sm:mx-auto sm:max-w-[450px] sm:flex-row">
            <form action={handleLogin} className="w-full sm:w-auto">
              <Button className="w-full px-8 text-lg sm:w-auto" type="submit">
                Get Started
              </Button>
            </form>
            <Button variant="outline" className="w-full px-8 text-lg sm:w-auto">
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative overflow-hidden py-20">
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-muted/50 to-background dark:from-muted/20 dark:to-background" />
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-3xl font-bold">
            Why Choose JakoDrive?
          </h2>
          <div className="grid gap-8 md:grid-cols-3">
            <FeatureCard
              icon={<CloudUpload className="h-10 w-10 text-primary" />}
              title="Easy File Management"
              description="Upload, organize, and access your files with our intuitive interface. Drag and drop functionality makes file management effortless."
            />
            <FeatureCard
              icon={<Lock className="h-10 w-10 text-primary" />}
              title="Advanced Security"
              description="Your data is protected with end-to-end encryption. We prioritize your privacy and security above all else."
            />
            <FeatureCard
              icon={<Database className="h-10 w-10 text-primary" />}
              title="Generous Storage"
              description="Start with 15GB of free storage and upgrade as your needs grow. Flexible plans for individuals and teams."
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-between md:flex-row">
            <div className="mb-4 flex items-center gap-2 md:mb-0">
              <CloudUpload className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold">JakoDrive</span>
            </div>
            <div className="flex flex-wrap justify-center gap-6">
              <Link
                href="#"
                className="text-muted-foreground hover:text-foreground"
              >
                Terms
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-foreground"
              >
                Privacy
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-foreground"
              >
                Help
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-foreground"
              >
                Contact
              </Link>
            </div>
          </div>
          <div className="mt-6 text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} JakoDrive. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }) {
  return (
    <div className="flex flex-col items-center rounded-lg border border-border bg-gradient-to-b from-card to-card/95 p-6 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
      <div className="mb-4">{icon}</div>
      <h3 className="mb-2 text-xl font-semibold">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
}
