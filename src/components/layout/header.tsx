
"use client"

import Link from "next/link"
import { Code2, LogIn, Menu } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useState } from "react"
import { Separator } from "@/components/ui/separator"

const navItems = [
  { href: "/#hero", label: "Home" },
  { href: "/#skills", label: "Skills" },
  { href: "/#services", label: "Services" },
  { href: "/#experience", label: "Experience" },
  { href: "/#projects", label: "Projects" },
  { href: "/#certificates", label: "Certificates" },
  { href: "/#reviews", label: "Reviews" },
  { href: "/#contact", label: "Contact" },
]

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/#hero" className="flex items-center gap-2" aria-label="SayanDevelops Home">
          <Code2 className="h-7 w-7 text-primary" />
          <span className="text-xl font-bold tracking-tight">SayanDevelops</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="transition-colors hover:text-primary"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button asChild variant="ghost" className="hidden md:inline-flex">
             <Link href="/admin/login">Admin Login</Link>
          </Button>
          <ThemeToggle />
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px] sm:w-[320px]">
              <div className="p-6 flex flex-col h-full">
                <Link href="/#hero" className="flex items-center gap-2 mb-8" onClick={() => setMobileMenuOpen(false)}>
                  <Code2 className="h-7 w-7 text-primary" />
                  <span className="text-xl font-bold tracking-tight">SayanDevelops</span>
                </Link>
                <nav className="flex flex-col gap-6 flex-grow">
                  {navItems.map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      className="text-lg font-medium transition-colors hover:text-primary"
                       onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ))}
                </nav>
                 <Separator className="my-4" />
                 <Link
                    href="/admin/login"
                    className="flex items-center text-lg font-medium transition-colors hover:text-primary"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <LogIn className="mr-2 h-5 w-5" />
                    Admin Login
                  </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
