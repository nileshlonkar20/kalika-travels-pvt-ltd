"use client"

import { useRef, useState } from "react"
import { Star, Quote, Play } from "lucide-react"

const customerVideos = [
  { src: "/images/customer_satisfaction.mp4", label: "Customer satisfaction" },
  { src: "/images/customer_satisfaction_1.mp4", label: "Customer experience" },
  { src: "/images/customer_satisfaction_2.mp4", label: "Happy journey" },
  { src: "/images/customer_satisfaction_3.mp4", label: "Travel feedback" },
]

export function TestimonialSection() {
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([])
  const [activeVideo, setActiveVideo] = useState(0)
  const [rating, setRating] = useState(0)
  const [feedback, setFeedback] = useState("")
  const [name, setName] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleVideoPlay = (playingIndex: number) => {
    videoRefs.current.forEach((video, index) => {
      if (index !== playingIndex) video?.pause()
    })
    setActiveVideo(playingIndex)
  }

  const handleRatingSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!rating) return

    setIsSubmitting(true)
    try {
      const response = await fetch("/api/ratings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rating, name, feedback }),
      })
      if (!response.ok) throw new Error("Unable to submit rating")
      setIsSubmitted(true)
      setRating(0)
      setName("")
      setFeedback("")
    } catch {
      window.alert("Unable to submit your rating right now. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="bg-secondary/40 py-20 md:py-28">
      <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
        <span className="text-sm font-semibold uppercase tracking-widest text-accent">Testimonials</span>
        <h2 className="mt-3 font-heading text-3xl font-bold text-foreground sm:text-4xl">
          What our customers say
        </h2>

        <figure className="mt-10 rounded-2xl border border-border bg-card p-8 shadow-sm sm:p-12">
          <Quote className="mx-auto h-10 w-10 text-accent" aria-hidden />
          <blockquote className="mt-6 text-lg leading-relaxed text-foreground sm:text-xl">
            &ldquo;We had hired a bus from Kalika Translink for an office outing. The driver was punctual and the bus was in
            a well-maintained condition. We had a good experience during the entire process — from making the booking
            to the end of the journey. Will definitely recommend Kalika Translink if you need their services.&rdquo;
          </blockquote>
          <div className="mt-6 flex items-center justify-center gap-1 text-accent">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="h-5 w-5 fill-accent" />
            ))}
          </div>
          <figcaption className="mt-4 font-heading font-bold text-foreground">
            Janardan
            <span className="block text-sm font-normal text-muted-foreground">Office Outing · Pune</span>
          </figcaption>
        </figure>

        <div className="mt-8 overflow-hidden rounded-2xl border border-border bg-card p-3 text-left shadow-sm sm:p-4">
          <div className="relative overflow-hidden rounded-xl bg-black">
            {customerVideos.map((video, index) => (
              <video
                key={video.src}
                ref={(element) => {
                  videoRefs.current[index] = element
                }}
                className={`${activeVideo === index ? "block" : "hidden"} aspect-video w-full object-contain`}
                controls
                muted
                playsInline
                preload={index === 0 ? "metadata" : "none"}
                onPlay={() => handleVideoPlay(index)}
                aria-label={`Kalika Translink ${video.label} video`}
              >
                <source src={video.src} type="video/mp4" />
                Your browser does not support this customer video.
              </video>
            ))}
          </div>

          <div className="grid gap-2 pt-3 sm:grid-cols-4">
            {customerVideos.map((video, index) => (
              <button
                key={video.src}
                type="button"
                onClick={() => setActiveVideo(index)}
                className={`group flex items-center gap-3 rounded-xl border p-3 text-left transition-all ${
                  activeVideo === index
                    ? "border-primary bg-primary text-primary-foreground shadow-sm"
                    : "border-border bg-background text-foreground hover:border-primary/40 hover:bg-secondary"
                }`}
                aria-label={`Show ${video.label}`}
                aria-pressed={activeVideo === index}
              >
                <span
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${
                    activeVideo === index ? "bg-accent text-accent-foreground" : "bg-primary/10 text-primary"
                  }`}
                >
                  {activeVideo === index ? <Play className="h-4 w-4 fill-current" /> : `0${index + 1}`}
                </span>
                <span className="min-w-0">
                  <span className="block truncate text-xs font-bold uppercase tracking-wide">{video.label}</span>
                  <span className={`mt-0.5 block text-xs ${activeVideo === index ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
                    Video {index + 1}
                  </span>
                </span>
              </button>
            ))}
          </div>
        </div>

        <p className="mt-8 text-sm font-medium text-muted-foreground">
          Rated <span className="font-bold text-foreground">4.8 out of 5</span> across 660+ customer reviews
        </p>

        <div className="mt-10 rounded-2xl border border-border bg-card p-6 text-left shadow-sm sm:p-8">
          <div className="text-center">
            <h3 className="font-heading text-xl font-bold text-foreground">How was your experience?</h3>
            <p className="mt-1 text-sm text-muted-foreground">Your feedback helps us serve travellers better.</p>
          </div>
          {isSubmitted ? (
            <div className="mx-auto mt-5 max-w-md rounded-lg border border-emerald-200 bg-emerald-50 p-4 text-center text-sm font-medium text-emerald-700">
              Thank you for your response. We appreciate your feedback.
            </div>
          ) : (
            <form className="mx-auto mt-5 grid max-w-md gap-4" onSubmit={handleRatingSubmit}>
              <div className="flex justify-center gap-2" aria-label="Choose a rating">
                {Array.from({ length: 5 }).map((_, index) => {
                  const value = index + 1
                  return (
                    <button
                      key={value}
                      type="button"
                      onClick={() => setRating(value)}
                      className="rounded-md p-1 text-accent transition-transform hover:scale-110 focus-visible:ring-2 focus-visible:ring-ring"
                      aria-label={`${value} star${value === 1 ? "" : "s"}`}
                      aria-pressed={rating === value}
                    >
                      <Star className={`h-8 w-8 ${rating >= value ? "fill-accent" : ""}`} />
                    </button>
                  )
                })}
              </div>
              <input
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Your name (optional)"
                className="h-11 rounded-md border border-input bg-background px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
              <textarea
                value={feedback}
                onChange={(event) => setFeedback(event.target.value)}
                placeholder="Tell us about your journey (optional)"
                rows={3}
                className="rounded-md border border-input bg-background p-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
              <button
                type="submit"
                disabled={!rating || isSubmitting}
                className="rounded-md bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isSubmitting ? "Submitting..." : "Submit rating"}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
