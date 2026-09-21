"use client"

import { useEffect, useState } from "react"
import { Mail, Phone, Trash2 } from "lucide-react"

const OWNER_USERNAME = "nileshlonkar"

type CallbackRequest = {
  id: number
  name: string
  phone: string
  trip?: string | null
  travelDate?: string | null
  destination?: string | null
  passengers?: number | null
  source?: string | null
  createdAt: string
}

type MessageItem = {
  id: number
  name: string
  phone: string
  email: string
  message: string
  trip?: string | null
  travelDate?: string | null
  destination?: string | null
  passengers?: number | null
  source?: string | null
  createdAt: string
}

type TripEnquiry = {
  id: number
  name: string
  phone: string
  vehicle?: string | null
  fromLocation: string
  toLocation: string
  travelDate?: string | null
  passengers?: number | null
  createdAt: string
}

function phoneDigits(phone: string) {
  return phone.replace(/\D/g, "")
}

function ContactActions({ phone, email }: { phone: string; email?: string }) {
  const whatsappNumber = phoneDigits(phone)

  return (
    <div className="mt-4 flex flex-wrap gap-2 border-t border-border pt-3">
      <a
        href={`tel:${phoneDigits(phone)}`}
        className="inline-flex items-center gap-1.5 rounded-md bg-primary px-3 py-2 text-xs font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
      >
        <Phone className="h-3.5 w-3.5" />
        Call
      </a>
      <a
        href={`https://wa.me/${whatsappNumber}`}
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center gap-1.5 rounded-md border border-accent bg-accent/10 px-3 py-2 text-xs font-semibold text-foreground transition-colors hover:bg-accent/20"
      >
        WhatsApp
      </a>
      {email ? (
        <a
          href={`mailto:${email}`}
          className="inline-flex items-center gap-1.5 rounded-md border border-border bg-background px-3 py-2 text-xs font-semibold text-foreground transition-colors hover:bg-secondary"
        >
          <Mail className="h-3.5 w-3.5" />
          Email
        </a>
      ) : null}
    </div>
  )
}

export default function OwnerDashboardPage() {
  const [isAllowed, setIsAllowed] = useState(false)
  const [callbackRequests, setCallbackRequests] = useState<CallbackRequest[]>([])
  const [messages, setMessages] = useState<MessageItem[]>([])
  const [tripEnquiries, setTripEnquiries] = useState<TripEnquiry[]>([])
  const [actionError, setActionError] = useState("")

  useEffect(() => {
    const loadData = async () => {
      try {
        const sessionResponse = await fetch("/api/owner-login")
        const sessionResult = await sessionResponse.json()
        if (!sessionResult.authenticated) return

        setIsAllowed(true)
        const [callbackResponse, messageResponse, tripResponse] = await Promise.all([
          fetch("/api/callback-requests"),
          fetch("/api/messages"),
          fetch("/api/trip-enquiries"),
        ])

        const callbackResult = await callbackResponse.json()
        const messageResult = await messageResponse.json()
        const tripResult = await tripResponse.json()

        if (callbackResponse.ok && Array.isArray(callbackResult.callbackRequests)) {
          setCallbackRequests(callbackResult.callbackRequests)
        }

        if (messageResponse.ok && Array.isArray(messageResult.messages)) {
          setMessages(messageResult.messages)
        }
        if (tripResponse.ok && Array.isArray(tripResult.tripEnquiries)) {
          setTripEnquiries(tripResult.tripEnquiries)
        }
      } catch {
        setCallbackRequests([])
        setMessages([])
        setTripEnquiries([])
      }
    }

    loadData()
  }, [])

  const deleteCallbackRequest = async (id: number) => {
    if (!window.confirm("Delete this callback request?")) return
    try {
      const response = await fetch("/api/callback-requests", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: Number(id) }),
      })
      if (!response.ok) throw new Error("Unable to delete callback request")
      setCallbackRequests((requests) => requests.filter((request) => request.id !== id))
    } catch {
      setActionError("Could not delete the callback request. Please try again.")
    }
  }

  const deleteMessage = async (id: number) => {
    if (!window.confirm("Delete this message?")) return
    try {
      const response = await fetch("/api/messages", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: Number(id) }),
      })
      if (!response.ok) throw new Error("Unable to delete message")
      setMessages((currentMessages) => currentMessages.filter((message) => message.id !== id))
    } catch {
      setActionError("Could not delete the message. Please try again.")
    }
  }

  const deleteTripEnquiry = async (id: number) => {
    if (!window.confirm("Delete this trip enquiry?")) return
    try {
      const response = await fetch("/api/trip-enquiries", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: Number(id) }),
      })
      if (!response.ok) throw new Error("Unable to delete trip enquiry")
      setTripEnquiries((items) => items.filter((item) => item.id !== id))
    } catch {
      setActionError("Could not delete the trip enquiry. Please try again.")
    }
  }

  const handleBackToSite = async () => {
    await fetch("/api/owner-login", { method: "DELETE" })
    window.location.href = "/"
  }

  if (!isAllowed) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-background px-6">
        <div className="w-full max-w-md rounded-2xl border border-border bg-card p-8 text-center shadow-sm">
          <h1 className="font-heading text-3xl font-bold text-foreground">Access Denied</h1>
          <p className="mt-3 text-muted-foreground">Please log in from the main site using the owner credentials.</p>
          <a
            href="/"
            className="mt-6 inline-flex rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
          >
            Go to Home
          </a>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-secondary/30 px-4 py-6 sm:px-6 sm:py-10">
      <div className="mx-auto max-w-6xl">
        {actionError ? (
          <div className="mb-5 rounded-lg border border-red-200 bg-red-50 p-3 text-sm font-medium text-red-700" role="alert">
            {actionError}
          </div>
        ) : null}
        <div className="mb-8 flex flex-col gap-5 rounded-2xl bg-primary p-6 shadow-lg sm:flex-row sm:items-center sm:justify-between sm:p-8">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">Owner Panel</p>
            <h1 className="mt-2 font-heading text-3xl font-bold text-primary-foreground sm:text-4xl">Kalika Translink Dashboard</h1>
            <p className="mt-2 text-sm text-primary-foreground/75">Manage enquiries and contact customers directly.</p>
          </div>
          <button
            type="button"
            onClick={handleBackToSite}
            className="inline-flex w-fit rounded-md bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground hover:bg-accent/90"
          >
            Back to Site
          </button>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
            <p className="text-sm text-muted-foreground">Username</p>
            <p className="mt-2 font-heading text-2xl font-bold text-foreground">{OWNER_USERNAME}</p>
          </div>
          <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
            <p className="text-sm text-muted-foreground">Callback Requests</p>
            <p className="mt-2 font-heading text-2xl font-bold text-foreground">{callbackRequests.length}</p>
          </div>
          <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
            <p className="text-sm text-muted-foreground">Messages</p>
            <p className="mt-2 font-heading text-2xl font-bold text-foreground">{messages.length}</p>
          </div>
          <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
            <p className="text-sm text-muted-foreground">Trip Enquiries</p>
            <p className="mt-2 font-heading text-2xl font-bold text-foreground">{tripEnquiries.length}</p>
          </div>
        </div>

        <section className="mt-10 rounded-2xl border border-border bg-card p-6 shadow-sm">
          <div className="mb-5 flex items-center justify-between gap-4">
            <h2 className="font-heading text-2xl font-bold text-foreground">Callback Requests</h2>
          </div>

          {callbackRequests.length === 0 ? (
            <div className="rounded-xl border border-dashed border-border bg-secondary/40 p-8 text-center text-muted-foreground">
              No callback requests yet.
            </div>
          ) : (
            <div className="space-y-4">
              {callbackRequests.map((request, index) => (
                <div key={request.id || `${request.phone}-${index}`} className="rounded-xl border border-border bg-background p-4">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="font-heading text-lg font-semibold text-foreground">{request.name}</p>
                      <p className="text-sm text-muted-foreground">{request.phone}</p>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {new Date(request.createdAt).toLocaleString()}
                    </p>
                  </div>

                  <div className="mt-3 space-y-2 text-sm text-foreground/80">
                    {request.trip ? (
                      <p>
                        <span className="font-medium">Trip:</span> {request.trip}
                      </p>
                    ) : null}
                    {request.travelDate ? <p><span className="font-medium">Date:</span> {request.travelDate}</p> : null}
                    {request.destination ? <p><span className="font-medium">Destination:</span> {request.destination}</p> : null}
                    {request.passengers ? <p><span className="font-medium">Passengers:</span> {request.passengers}</p> : null}
                    <p>
                      <span className="font-medium">Source:</span> {request.source || "callback"}
                    </p>
                  </div>
                  <ContactActions phone={request.phone} />
                  <button
                    type="button"
                    onClick={() => deleteCallbackRequest(request.id)}
                    className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-destructive transition-colors hover:text-destructive/80"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                    Delete request
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>

        <section className="mt-10 rounded-2xl border border-border bg-card p-6 shadow-sm">
          <div className="mb-5 flex items-center justify-between gap-4">
            <h2 className="font-heading text-2xl font-bold text-foreground">Where They Are Going</h2>
          </div>
          {tripEnquiries.length === 0 ? (
            <div className="rounded-xl border border-dashed border-border bg-secondary/40 p-8 text-center text-muted-foreground">No trip enquiries yet.</div>
          ) : (
            <div className="space-y-4">
              {tripEnquiries.map((enquiry) => (
                <div key={enquiry.id} className="rounded-xl border border-border bg-background p-4">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="font-heading text-lg font-semibold text-foreground">{enquiry.name}</p>
                      <p className="text-sm text-muted-foreground">{enquiry.phone}</p>
                    </div>
                    <p className="text-xs text-muted-foreground">{new Date(enquiry.createdAt).toLocaleString()}</p>
                  </div>
                  <div className="mt-3 space-y-2 text-sm text-foreground/80">
                    <p><span className="font-medium">Route:</span> {enquiry.fromLocation} → {enquiry.toLocation}</p>
                    {enquiry.vehicle ? <p><span className="font-medium">Vehicle:</span> {enquiry.vehicle}</p> : null}
                    {enquiry.travelDate ? <p><span className="font-medium">Date:</span> {enquiry.travelDate}</p> : null}
                    {enquiry.passengers ? <p><span className="font-medium">Passengers:</span> {enquiry.passengers}</p> : null}
                  </div>
                  <ContactActions phone={enquiry.phone} />
                  <button type="button" onClick={() => deleteTripEnquiry(enquiry.id)} className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-destructive transition-colors hover:text-destructive/80">
                    <Trash2 className="h-3.5 w-3.5" />
                    Delete trip enquiry
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>

        <section className="mt-10 rounded-2xl border border-border bg-card p-6 shadow-sm">
          <div className="mb-5 flex items-center justify-between gap-4">
            <h2 className="font-heading text-2xl font-bold text-foreground">Messages</h2>
          </div>

          {messages.length === 0 ? (
            <div className="rounded-xl border border-dashed border-border bg-secondary/40 p-8 text-center text-muted-foreground">
              No messages yet.
            </div>
          ) : (
            <div className="space-y-4">
              {messages.map((message, index) => (
                <div key={message.id || `${message.email}-${index}`} className="rounded-xl border border-border bg-background p-4">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="font-heading text-lg font-semibold text-foreground">{message.name}</p>
                      <p className="text-sm text-muted-foreground">{message.phone}</p>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {new Date(message.createdAt).toLocaleString()}
                    </p>
                  </div>

                  <div className="mt-3 space-y-2 text-sm text-foreground/80">
                    <p>
                      <span className="font-medium">Email:</span> {message.email}
                    </p>
                    {message.trip ? (
                      <p>
                        <span className="font-medium">Trip:</span> {message.trip}
                      </p>
                    ) : null}
                    {message.travelDate ? <p><span className="font-medium">Date:</span> {message.travelDate}</p> : null}
                    {message.destination ? <p><span className="font-medium">Destination:</span> {message.destination}</p> : null}
                    {message.passengers ? <p><span className="font-medium">Passengers:</span> {message.passengers}</p> : null}
                    <p>
                      <span className="font-medium">Message:</span> {message.message}
                    </p>
                  </div>
                  <ContactActions phone={message.phone} email={message.email} />
                  <button
                    type="button"
                    onClick={() => deleteMessage(message.id)}
                    className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-destructive transition-colors hover:text-destructive/80"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                    Delete message
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  )
}
