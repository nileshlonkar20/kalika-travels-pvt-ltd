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

  const handleVideoPlay = (playingIndex: number) => {
    videoRefs.current.forEach((video, index) => {
      if (index !== playingIndex) video?.pause()
    })
    setActiveVideo(playingIndex)
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
            &ldquo;We had hired a bus from Kalika Travels for an office outing. The driver was punctual and the bus was in
            a well-maintained condition. We had a good experience during the entire process — from making the booking
            to the end of the journey. Will definitely recommend Kalika Travels if you need their services.&rdquo;
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
                aria-label={`Kalika Travels ${video.label} video`}
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
      </div>
    </section>
  )
}
