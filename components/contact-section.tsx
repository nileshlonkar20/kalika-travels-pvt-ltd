"use client"

import { useState } from "react"
import { Phone, Mail, MapPin, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { contact } from "@/lib/site-data"

type ContactMessage = {
  name: string
  phone: string
  email: string
  message: string
  createdAt: string
}

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  })
  const [tripFormData, setTripFormData] = useState({
    name: "",
    phone: "",
    vehicle: "",
    fromLocation: "",
    toLocation: "",
    travelDate: "",
    passengers: "",
  })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isTripSubmitted, setIsTripSubmitted] = useState(false)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleTripChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target
    setTripFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const enquiry: ContactMessage = {
      ...formData,
      createdAt: new Date().toISOString(),
    }

    try {
      const response = await fetch("/api/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...enquiry,
          source: "message",
          trip: "General enquiry",
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to submit enquiry")
      }

      setIsSubmitted(true)
      setFormData({
        name: "",
        phone: "",
        email: "",
        message: "",
      })
    } catch {
      window.alert("Unable to save your enquiry right now. Please contact the owner directly.")
    }
  }

  const handleTripSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    try {
      const response = await fetch("/api/trip-enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(tripFormData),
      })
      if (!response.ok) throw new Error("Failed to submit trip enquiry")

      setIsTripSubmitted(true)
      setTripFormData({ name: "", phone: "", vehicle: "", fromLocation: "", toLocation: "", travelDate: "", passengers: "" })
    } catch {
      window.alert("Unable to save your trip enquiry right now. Please contact the owner directly.")
    }
  }

  return (
    <section id="contact" className="bg-background py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid min-w-0 gap-12 lg:grid-cols-2">
          <div className="min-w-0">
            <span className="text-sm font-semibold uppercase tracking-widest text-accent">Contact Us</span>
            <h2 className="mt-3 font-heading text-3xl font-bold text-foreground sm:text-4xl">
              We&apos;re glad to help you — 365 days, 24 × 7
            </h2>
            <p className="mt-4 text-muted-foreground">
              Have a question or ready to book? Reach out any time and our team will get you on the road.
            </p>

            <div className="mt-8 space-y-5">
              <a
                href={contact.phoneHref}
                aria-label={`Call Kalika Translink at ${contact.phone}`}
                className="group flex items-start gap-4"
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Phone className="h-5 w-5" />
                </span>
                <span>
                  <span className="block text-sm font-medium text-muted-foreground">Call Us</span>
                  <span className="font-heading font-semibold text-foreground group-hover:text-primary">
                    {contact.phone}
                  </span>
                </span>
              </a>

              <a href={contact.emailHref} className="flex items-start gap-4 group">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Mail className="h-5 w-5" />
                </span>
                <span>
                  <span className="block text-sm font-medium text-muted-foreground">Email Us</span>
                  <span className="break-all font-heading font-semibold text-foreground group-hover:text-primary">
                    {contact.email}
                  </span>
                </span>
              </a>

              <div className="flex items-start gap-4">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <MapPin className="h-5 w-5" />
                </span>
                <span>
                  <span className="block text-sm font-medium text-muted-foreground">Visit Us</span>
                  <span>
                    <span className="block font-heading font-semibold leading-snug text-foreground">{contact.address}</span>
                    <a
                      href={contact.mapsHref}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-1 inline-flex text-sm font-semibold text-primary hover:text-primary/75"
                    >
                      Open in Google Maps
                    </a>
                  </span>
                </span>
              </div>

              <div className="flex items-start gap-4">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Clock className="h-5 w-5" />
                </span>
                <span>
                  <span className="block text-sm font-medium text-muted-foreground">Working Hours</span>
                  <span className="font-heading font-semibold text-foreground">Open 24 × 7, all 365 days</span>
                </span>
              </div>
            </div>
          </div>

          <div className="min-w-0 space-y-6">
            <div className="rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8">
            <h3 className="font-heading text-xl font-bold text-foreground">Have any questions?</h3>
            <p className="mt-1 text-sm text-muted-foreground">Send us a message and we&apos;ll respond shortly.</p>

            {isSubmitted && (
              <div className="mt-4 rounded-lg border border-emerald-200 bg-emerald-50 p-3 text-sm font-medium text-emerald-700">
                Thank you! Your message has been sent successfully.
              </div>
            )}

            <form className="mt-6 grid gap-4" onSubmit={handleSubmit}>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="grid gap-1.5">
                  <label htmlFor="c-name" className="text-sm font-medium">
                    Name
                  </label>
                  <input
                    id="c-name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    className="h-11 rounded-md border border-input bg-background px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    required
                  />
                </div>
                <div className="grid gap-1.5">
                  <label htmlFor="c-phone" className="text-sm font-medium">
                    Phone
                  </label>
                  <input
                    id="c-phone"
                    name="phone"
                    type="tel"
                    inputMode="numeric"
                    pattern="[6-9][0-9]{9}"
                    title="Enter a valid 10-digit Indian mobile number"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Mobile number"
                    className="h-11 rounded-md border border-input bg-background px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    required
                  />
                </div>
              </div>
              <div className="grid gap-1.5">
                <label htmlFor="c-email" className="text-sm font-medium">
                  Email
                </label>
                <input
                  id="c-email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className="h-11 rounded-md border border-input bg-background px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  required
                />
              </div>
              <div className="grid gap-1.5">
                <label htmlFor="c-message" className="text-sm font-medium">
                  Message
                </label>
                <textarea
                  id="c-message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us about your trip — dates, destination and number of passengers."
                  className="rounded-md border border-input bg-background p-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  required
                />
              </div>
              <Button type="submit" size="lg" className="w-full">
                Send Message
              </Button>
            </form>
            </div>

            <div className="rounded-2xl border border-primary/15 bg-primary p-6 text-primary-foreground shadow-sm sm:p-8">
              <h3 className="font-heading text-xl font-bold">Where are you going?</h3>
              <p className="mt-1 text-sm text-primary-foreground/75">Share your route and we&apos;ll suggest the right vehicle.</p>
              {isTripSubmitted ? (
                <div className="mt-4 rounded-lg border border-emerald-200/40 bg-emerald-400/20 p-3 text-sm font-medium">Trip enquiry received. Nilesh will contact you shortly.</div>
              ) : null}
              <form className="mt-5 grid gap-4" onSubmit={handleTripSubmit}>
                <div className="grid gap-4 sm:grid-cols-2">
                  <input name="name" value={tripFormData.name} onChange={handleTripChange} placeholder="Your name" required className="h-11 rounded-md border-0 bg-white px-3 text-sm text-foreground outline-none focus-visible:ring-2 focus-visible:ring-accent" />
                  <input name="phone" type="tel" inputMode="numeric" pattern="[6-9][0-9]{9}" value={tripFormData.phone} onChange={handleTripChange} placeholder="10-digit mobile number" required className="h-11 rounded-md border-0 bg-white px-3 text-sm text-foreground outline-none focus-visible:ring-2 focus-visible:ring-accent" />
                </div>
                <select name="vehicle" value={tripFormData.vehicle} onChange={handleTripChange} className="h-11 rounded-md border-0 bg-white px-3 text-sm text-foreground outline-none focus-visible:ring-2 focus-visible:ring-accent">
                  <option value="">Select a vehicle</option>
                  <option>Bus on Rent</option>
                  <option>Car on Rent</option>
                  <option>Tempo Traveller</option>
                </select>
                <div className="grid gap-4 sm:grid-cols-2">
                  <input name="fromLocation" value={tripFormData.fromLocation} onChange={handleTripChange} placeholder="From" required className="h-11 rounded-md border-0 bg-white px-3 text-sm text-foreground outline-none focus-visible:ring-2 focus-visible:ring-accent" />
                  <input name="toLocation" value={tripFormData.toLocation} onChange={handleTripChange} placeholder="To" required className="h-11 rounded-md border-0 bg-white px-3 text-sm text-foreground outline-none focus-visible:ring-2 focus-visible:ring-accent" />
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <input name="travelDate" type="date" value={tripFormData.travelDate} onChange={handleTripChange} min={new Date().toISOString().split("T")[0]} className="h-11 rounded-md border-0 bg-white px-3 text-sm text-foreground outline-none focus-visible:ring-2 focus-visible:ring-accent" />
                  <input name="passengers" type="number" min="1" max="50" value={tripFormData.passengers} onChange={handleTripChange} placeholder="Passengers" className="h-11 rounded-md border-0 bg-white px-3 text-sm text-foreground outline-none focus-visible:ring-2 focus-visible:ring-accent" />
                </div>
                <Button type="submit" size="lg" className="w-full bg-accent text-accent-foreground hover:bg-accent/90">Request a Trip Quote</Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
