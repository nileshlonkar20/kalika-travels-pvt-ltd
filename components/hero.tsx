"use client"

import { useEffect, useState } from "react"
import { Phone, Star, ShieldCheck, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { contact } from "@/lib/site-data"
import { getSupabasePublicClient } from "@/lib/supabase"

const initialState = {
  name: "",
  phone: "",
  trip: "",
  travelDate: "",
  destination: "",
  passengers: "",
}

const heroImages = [
  "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=2200&q=85",
  "https://images.unsplash.com/photo-1465447142348-e9952c393450?auto=format&fit=crop&w=2200&q=85",
  "https://images.unsplash.com/photo-1494515843206-f3117d3f51b7?auto=format&fit=crop&w=2200&q=85",
]

export function Hero() {
  const [formData, setFormData] = useState(initialState)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [activeImage, setActiveImage] = useState(0)
  const [isSubmitted, setIsSubmitted] = useState(false)

  useEffect(() => {
    const slideshow = window.setInterval(() => {
      setActiveImage((currentImage) => (currentImage + 1) % heroImages.length)
    }, 3000)

    return () => window.clearInterval(slideshow)
  }, [])

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch("/api/callback-requests", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          trip: formData.trip,
          source: "callback",
          createdAt: new Date().toISOString(),
        }),
      })

      if (!response.ok) {
        throw new Error("Unable to save callback request")
      }

      setFormData(initialState)
      setIsSubmitted(true)
    } catch {
      alert("Unable to save your request right now. Please call us directly.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="relative overflow-hidden bg-primary text-primary-foreground">
      <div className="absolute inset-0">
        {heroImages.map((image, index) => (
          <img
            key={image}
            src={image}
            alt=""
            aria-hidden="true"
            className={`absolute inset-0 h-full w-full object-cover object-center transition-opacity duration-1000 ${
              activeImage === index ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/15 to-transparent" />
      </div>

      <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 sm:py-20 md:py-28 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div className="motion-rise">
          <span className="inline-flex items-center gap-2 rounded-full bg-accent/20 px-4 py-1.5 text-sm font-medium text-accent">
            <Star className="h-4 w-4 fill-accent" />
            Rated 4.8 / 5 · 660+ Reviews
          </span>
          <h1 className="mt-5 font-heading text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            Best Bus, Car & Tempo Traveller on Rent in Pune
          </h1>
          <p className="mt-5 max-w-xl text-lg text-primary-foreground/80">
            Explore Pune hassle-free. Your trusted partner for affordable and reliable vehicle rentals for every
            occasion — with experienced drivers and a seamless journey, every time.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Button
              render={<a href={contact.phoneHref} />}
              nativeButton={false}
              size="lg"
              className="bg-accent text-accent-foreground hover:bg-accent/90"
            >
              <Phone className="h-5 w-5" />
              {contact.phone}
            </Button>
            <Button
              render={<a href="#fleet" />}
              nativeButton={false}
              size="lg"
              variant="outline"
              className="border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
            >
              View Our Fleet
            </Button>
          </div>

          <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3 text-sm text-primary-foreground/85">
            <span className="flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-accent" />
              100% Safe Journey
            </span>
            <span className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-accent" />
              24 × 7 · 365 Days
            </span>
            <span className="flex items-center gap-2">
              <Star className="h-5 w-5 text-accent" />
              15+ Years Experience
            </span>
          </div>
        </div>

        <div className="motion-rise motion-delay-2 rounded-2xl border border-primary-foreground/15 bg-background/95 p-5 text-foreground shadow-2xl backdrop-blur sm:p-8">
          <h2 className="font-heading text-xl font-bold">Quick Enquiry</h2>
          <p className="mt-1 text-sm text-muted-foreground">Tell us your plan — we&apos;ll call you back.</p>
          {isSubmitted ? (
            <div className="mt-4 rounded-lg border border-emerald-200 bg-emerald-50 p-3 text-sm font-medium text-emerald-700">
              Thank you. Your enquiry is received; Nilesh will contact you shortly.
            </div>
          ) : null}
          <form className="mt-5 grid gap-4" onSubmit={handleSubmit}>
            <div className="grid gap-1.5">
              <label htmlFor="hero-name" className="text-sm font-medium">
                Name
              </label>
              <input
                id="hero-name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your full name"
                className="h-11 rounded-md border border-input bg-background px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
                required
              />
            </div>
            <div className="grid gap-1.5">
              <label htmlFor="hero-phone" className="text-sm font-medium">
                Phone
              </label>
              <input
                id="hero-phone"
                name="phone"
                type="tel"
                inputMode="numeric"
                pattern="[6-9][0-9]{9}"
                title="Enter a valid 10-digit Indian mobile number"
                value={formData.phone}
                onChange={handleChange}
                placeholder="10-digit mobile number"
                className="h-11 rounded-md border border-input bg-background px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
                required
              />
            </div>
            <div className="grid gap-1.5">
              <label htmlFor="hero-trip" className="text-sm font-medium">
                Vehicle / Trip
              </label>
              <select
                id="hero-trip"
                name="trip"
                value={formData.trip}
                onChange={handleChange}
                required
                className="h-11 rounded-md border border-input bg-background px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <option value="" disabled>
                  Select a vehicle
                </option>
                <option>Bus on Rent</option>
                <option>Car on Rent</option>
                <option>Tempo Traveller</option>
                <option>Tour Package</option>
              </select>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="grid gap-1.5">
                <label htmlFor="hero-date" className="text-sm font-medium">Travel date</label>
                <input
                  id="hero-date"
                  name="travelDate"
                  type="date"
                  value={formData.travelDate}
                  onChange={handleChange}
                  min={new Date().toISOString().split("T")[0]}
                  required
                  className="h-11 rounded-md border border-input bg-background px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
                />
              </div>
              <div className="grid gap-1.5">
                <label htmlFor="hero-passengers" className="text-sm font-medium">Passengers</label>
                <input
                  id="hero-passengers"
                  name="passengers"
                  type="number"
                  min="1"
                  max="50"
                  value={formData.passengers}
                  onChange={handleChange}
                  placeholder="No. of people"
                  required
                  className="h-11 rounded-md border border-input bg-background px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
                />
              </div>
            </div>
            <div className="grid gap-1.5">
              <label htmlFor="hero-destination" className="text-sm font-medium">Destination</label>
              <input
                id="hero-destination"
                name="destination"
                type="text"
                value={formData.destination}
                onChange={handleChange}
                placeholder="Where are you travelling?"
                className="h-11 rounded-md border border-input bg-background px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
                required
              />
            </div>
            <Button type="submit" size="lg" className="mt-1 w-full" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Get a Callback"}
            </Button>
          </form>
        </div>
      </div>
    </section>
  )
}
