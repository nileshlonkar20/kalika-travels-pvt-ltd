"use client"

import { useEffect, useState } from "react"
import { Phone, Mail, MapPin, Menu, X, Bus, UserCircle2, LogOut, ShieldCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { contact, navLinks } from "@/lib/site-data"

export function SiteHeader() {
  const [open, setOpen] = useState(false)
  const [loginOpen, setLoginOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  useEffect(() => {
    fetch("/api/owner-login")
      .then((response) => response.json())
      .then((result) => setIsLoggedIn(result.authenticated === true))
      .catch(() => setIsLoggedIn(false))
  }, [])

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    try {
      const response = await fetch("/api/owner-login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      })

      const result = await response.json()

      if (!response.ok || !result.success) {
        setError(result.message || "Invalid username or password.")
        return
      }

      setIsLoggedIn(true)
      setError("")
      setPassword("")
      setUsername("")
      setLoginOpen(false)

      if (typeof window !== "undefined") {
        window.open(`${window.location.origin}/owner`, "_blank", "noopener,noreferrer")
      }
    } catch {
      setError("Unable to connect to the server.")
    }
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setUsername("")
    setPassword("")
    setError("")

    fetch("/api/owner-login", { method: "DELETE" }).catch(() => undefined)
  }

  return (
    <header id="home" className="sticky top-0 z-50">
      {/* Top contact bar */}
      <div className="hidden bg-primary text-primary-foreground md:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-2 text-sm">
          <div className="flex items-center gap-6">
            <a href={contact.phoneHref} className="flex items-center gap-2 transition-opacity hover:opacity-80">
              <Phone className="h-4 w-4 text-accent" />
              {contact.phone}
            </a>
            <a href={contact.emailHref} className="flex items-center gap-2 transition-opacity hover:opacity-80">
              <Mail className="h-4 w-4 text-accent" />
              {contact.email}
            </a>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-accent" />
            <span>{contact.shortAddress}</span>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <div className="border-b border-border/60 bg-background/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:gap-4 sm:px-6">
          <a href="#home" className="flex min-w-0 items-center gap-2.5 sm:gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary text-primary-foreground">
              <Bus className="h-6 w-6" />
            </span>
            <span className="min-w-0 leading-tight">
              <span className="block truncate font-heading text-base font-bold text-foreground sm:text-lg">Kalika Travels</span>
              <span className="block text-xs font-medium uppercase tracking-widest text-muted-foreground">
                Travel · Pune
              </span>
            </span>
          </a>

          <nav className="hidden items-center gap-1 lg:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="rounded-md px-3 py-2 text-sm font-medium text-foreground/80 transition-colors hover:bg-secondary hover:text-foreground"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Button
              render={<a href={contact.phoneHref} />}
              nativeButton={false}
              className="hidden bg-accent text-accent-foreground hover:bg-accent/90 sm:inline-flex"
            >
              <Phone className="h-4 w-4" />
              Book Now
            </Button>

            {isLoggedIn ? (
              <button
                type="button"
                onClick={handleLogout}
                className="inline-flex items-center gap-2 rounded-md border border-border bg-background px-3 py-2 text-sm font-medium text-foreground hover:bg-secondary"
              >
                <ShieldCheck className="h-4 w-4 text-green-600" />
                Owner
                <LogOut className="h-4 w-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setLoginOpen(true)}
                className="inline-flex items-center gap-2 rounded-md border border-border bg-background px-3 py-2 text-sm font-medium text-foreground hover:bg-secondary"
              >
                <UserCircle2 className="h-4 w-4" />
                Owner Login
              </button>
            )}

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-border transition-colors hover:bg-secondary lg:hidden"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {open && (
          <nav className="border-t border-border bg-background px-6 py-4 lg:hidden">
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="rounded-md px-3 py-2.5 text-sm font-medium text-foreground/80 transition-colors hover:bg-secondary"
                >
                  {link.label}
                </a>
              ))}
              <Button
                render={<a href={contact.phoneHref} />}
                nativeButton={false}
                className="mt-2 bg-accent text-accent-foreground hover:bg-accent/90"
              >
                <Phone className="h-4 w-4" />
                Book Now
              </Button>

              {isLoggedIn ? (
                <button
                  type="button"
                  onClick={handleLogout}
                  className="mt-2 inline-flex items-center justify-center gap-2 rounded-md border border-border bg-background px-3 py-2.5 text-sm font-medium text-foreground hover:bg-secondary"
                >
                  <ShieldCheck className="h-4 w-4 text-green-600" />
                  Owner Logged In
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => setLoginOpen(true)}
                  className="mt-2 inline-flex items-center justify-center gap-2 rounded-md border border-border bg-background px-3 py-2.5 text-sm font-medium text-foreground hover:bg-secondary"
                >
                  <UserCircle2 className="h-4 w-4" />
                  Owner Login
                </button>
              )}
            </div>
          </nav>
        )}

        {loginOpen && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 px-4">
            <div className="w-full max-w-md rounded-2xl border border-border bg-background p-6 shadow-2xl">
              <div className="mb-5 flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-medium uppercase tracking-widest text-accent">Owner Access</p>
                  <h3 className="mt-1 font-heading text-2xl font-bold text-foreground">Login</h3>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setLoginOpen(false)
                    setError("")
                  }}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border text-foreground hover:bg-secondary"
                  aria-label="Close login"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="owner-username" className="text-sm font-medium text-foreground">
                    Username
                  </label>
                  <input
                    id="owner-username"
                    type="text"
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
                    className="h-11 w-full rounded-md border border-input bg-background px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    placeholder="Enter username"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="owner-password" className="text-sm font-medium text-foreground">
                    Password
                  </label>
                  <input
                    id="owner-password"
                    type="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    className="h-11 w-full rounded-md border border-input bg-background px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    placeholder="Enter password"
                  />
                </div>

                {error && <p className="text-sm text-red-600">{error}</p>}

                <Button type="submit" className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                  Login
                </Button>
              </form>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
