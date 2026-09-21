"use client"

import { useState } from "react"
import Image from "next/image"
import { Phone, ArrowRight, ChevronLeft, ChevronRight, Images, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { services, contact } from "@/lib/site-data"

const serviceGalleries: Record<string, string[]> = {
  "bus-32-seater": [
    "/images/1-bus_32_seater.jpeg",
    "/images/1-bus_32_seater_inside.jpeg",
    "/images/bus_32_seater.jpeg",
  ],
  "tempo-traveller": [
    "/images/tempo_traveler_8757.jpeg",
    "/images/tempo_traveler_8775.jpeg",
    "/images/tempo_traveler_9077.jpeg",
    "/images/1-inside.jpeg",
    "/images/2-inside.jpeg",
    "/images/3-inside.jpeg",
    "/images/4-inside.jpeg",
    "/images/5-inside.jpeg",
    "/images/6-inside.jpeg",
  ],
}

const galleryTitles: Record<string, string> = {
  "bus-32-seater": "32 Seater Bus gallery",
  "tempo-traveller": "Tempo Traveller gallery",
}

export function FleetSection() {
  const [selectedGallery, setSelectedGallery] = useState<string | null>(null)
  const [selectedImage, setSelectedImage] = useState(0)

  const gallery = selectedGallery ? serviceGalleries[selectedGallery] || [] : []

  const openGallery = (serviceId: string) => {
    if (!serviceGalleries[serviceId]) return
    setSelectedGallery(serviceId)
    setSelectedImage(0)
  }

  const closeGallery = () => setSelectedGallery(null)

  const showPrevious = () => {
    setSelectedImage((current) => (current - 1 + gallery.length) % gallery.length)
  }

  const showNext = () => {
    setSelectedImage((current) => (current + 1) % gallery.length)
  }

  return (
    <section id="fleet" className="bg-secondary/40 py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-accent">Our Fleet</span>
          <h2 className="mt-3 font-heading text-3xl font-bold text-foreground sm:text-4xl">Choose your ride</h2>
          <p className="mt-4 text-muted-foreground">
            A diverse fleet of SUVs, sedans, tempo travellers and AC/Non-AC buses — all with experienced drivers and
            transparent, per-kilometre pricing.
          </p>
        </div>

        <div className="mt-14 grid gap-8 md:grid-cols-2 xl:grid-cols-4">
          {services.map((service) => (
            <article
              key={service.id}
              className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <button
                type="button"
                onClick={() => openGallery(service.id)}
                disabled={!serviceGalleries[service.id]}
                className={`relative aspect-[4/3] overflow-hidden bg-secondary text-left ${
                  serviceGalleries[service.id] ? "cursor-pointer" : "cursor-default"
                }`}
                aria-label={serviceGalleries[service.id] ? `View ${service.title} photos` : service.title}
              >
                <Image
                  src={service.image || "/placeholder.svg"}
                  alt={service.title}
                  fill
                  sizes="(min-width: 1280px) 25vw, (min-width: 768px) 50vw, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {serviceGalleries[service.id] ? (
                  <span className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-black/65 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur">
                    <Images className="h-3.5 w-3.5" />
                    View {serviceGalleries[service.id].length} photos
                    {service.id === "tempo-traveller" ? " · 6 inside" : ""}
                  </span>
                ) : null}
                <div className="absolute right-3 top-3 rounded-full bg-accent px-3 py-1 text-sm font-bold text-accent-foreground shadow">
                  from {service.price}
                  <span className="font-medium">{service.unit}</span>
                </div>
              </button>

              <div className="flex flex-1 flex-col p-6">
                <h3 className="font-heading text-xl font-bold text-foreground">{service.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{service.description}</p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {service.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md bg-secondary px-2.5 py-1 text-xs font-medium text-secondary-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <Button
                  render={<a href={contact.phoneHref} />}
                  nativeButton={false}
                  variant="ghost"
                  className="mt-5 justify-between px-0 text-primary hover:bg-transparent"
                >
                  <span className="flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    Book {service.title}
                  </span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </div>
            </article>
          ))}
        </div>
      </div>

      {selectedGallery ? (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label={galleryTitles[selectedGallery] || "Vehicle photo gallery"}
          onClick={closeGallery}
        >
          <div
            className="relative w-full max-w-4xl rounded-2xl bg-background p-3 shadow-2xl sm:p-5"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mb-3 flex items-center justify-between gap-3 px-1">
              <div>
                <p className="font-heading text-lg font-bold text-foreground">
                  {galleryTitles[selectedGallery] || "Vehicle gallery"}
                </p>
                <p className="text-xs text-muted-foreground">Exterior and inside views</p>
              </div>
              <button
                type="button"
                onClick={closeGallery}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:bg-secondary"
                aria-label="Close photo gallery"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="relative aspect-video overflow-hidden rounded-xl bg-secondary">
              <Image
                src={gallery[selectedImage]}
                alt={`${galleryTitles[selectedGallery] || "Vehicle"} photo ${selectedImage + 1}`}
                fill
                sizes="(min-width: 1024px) 900px, 100vw"
                className="object-contain"
              />
              <button
                type="button"
                onClick={showPrevious}
                className="absolute left-3 top-1/2 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/60 text-white transition-colors hover:bg-black/80"
                aria-label="Previous photo"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={showNext}
                className="absolute right-3 top-1/2 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/60 text-white transition-colors hover:bg-black/80"
                aria-label="Next photo"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-3 grid grid-cols-6 gap-2">
              {gallery.map((image, index) => (
                <button
                  key={image}
                  type="button"
                  onClick={() => setSelectedImage(index)}
                  className={`relative aspect-square overflow-hidden rounded-lg border-2 ${
                    selectedImage === index ? "border-accent" : "border-transparent"
                  }`}
                  aria-label={`Show ${selectedGallery === "tempo-traveller" && index >= 3 ? "inside" : "exterior"} photo ${index + 1}`}
                  aria-pressed={selectedImage === index}
                >
                  <Image
                    src={image}
                    alt=""
                    fill
                    sizes="120px"
                    className="object-cover"
                  />
                  {selectedGallery === "tempo-traveller" && index >= 3 ? (
                    <span className="absolute inset-x-0 bottom-0 bg-black/65 py-1 text-[10px] font-semibold text-white">
                      Inside
                    </span>
                  ) : null}
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </section>
  )
}
