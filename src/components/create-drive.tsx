"use client"

import { useState, useEffect } from "react"
import { Button } from "~/components/button-landing"
import { Input } from "~/components/input"
import { Label } from "~/components/label"
import { CloudUpload, ArrowLeft, Moon, Sun, FolderPlus, Database } from "lucide-react"
import Link from "next/link"
import { useTheme } from "next-themes"
import { redirect, useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "~/components/card"
import { MUTATIONS, QUERIES } from "~/server/db/queries"
import { auth } from "@clerk/nextjs/server"
import { handleCreateDriveAction } from "~/server/actions"

export default function CreateDrivePage() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [driveName, setDriveName] = useState("")
  const router = useRouter()

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  const handleCreateDrive = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await handleCreateDriveAction();
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b border-border relative bg-gradient-to-b from-background to-background/95 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
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
                {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </Button>
            )}
          </div>
        </div>
      </header>

      {/* Create Drive Section */}
      <section className="flex-1 flex items-center justify-center p-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-accent/30 dark:from-primary/30 dark:via-background/80 dark:to-primary/10 -z-10" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent dark:from-primary/20 -z-10"></div>

        <Card className="w-full max-w-md bg-card/80 backdrop-blur-sm border-border">
          <CardHeader className="text-center space-y-1">
            <div className="flex justify-center mb-2">
              <div className="p-3 rounded-full bg-primary/10 text-primary">
                <FolderPlus className="h-8 w-8" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold">Create New Drive</CardTitle>
            <CardDescription>Set up a new storage space for your files</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <form onSubmit={handleCreateDrive}>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="drive-name">Drive Name</Label>
                  <Input
                    id="drive-name"
                    placeholder="My Personal Drive"
                    value={driveName}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDriveName(e.target.value)}
                    required
                  />
                </div>

                <div className="pt-2">
                  <Button type="submit" size="lg" className="w-full">
                    Create Drive
                  </Button>
                </div>
              </div>
            </form>

           
          </CardContent>
          <CardFooter>
            <div className="w-full flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <Database className="h-4 w-4" />
              <span>Free storage: 15GB available</span>
            </div>
          </CardFooter>
        </Card>
      </section>

      {/* Back to Home Link */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to home</span>
          </Link>

          <Link href="/drive" className="text-muted-foreground hover:text-foreground transition-colors">
            Skip for now
          </Link>
        </div>
      </div>
    </div>
  )
}

