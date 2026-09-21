import Image from "next/image"
import { ArrowUpRight } from "lucide-react"

const galleryImages = [
  { src: "/images/bus_32_seater.jpeg", alt: "Kalika Travels 32 seater bus", label: "Group travel" },
  { src: "/images/ertiga_9077.jpeg", alt: "Kalika Travels Ertiga", label: "Family rides" },
  { src: "/images/tempo_traveler_8757.jpeg", alt: "Kalika Travels tempo traveller", label: "Tempo traveller" },
  { src: "/images/innova_7722.jpeg", alt: "Kalika Travels Innova", label: "Premium comfort" },
]

export function GallerySection() {
  return (
    <section className="bg-background py-16 sm:py-20 md:py-28" aria-labelledby="gallery-title">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <span className="text-sm font-semibold uppercase tracking-widest text-accent">Our vehicles</span>
            <h2 id="gallery-title" className="mt-3 font-heading text-3xl font-bold text-foreground sm:text-4xl">
              Ready for your next journey
            </h2>
            <p className="mt-4 text-muted-foreground">
              Choose from clean, comfortable vehicles maintained for local rides, group outings and outstation travel.
            </p>
          </div>
          <a
            href="#contact"
            className="inline-flex w-fit items-center gap-2 text-sm font-semibold text-primary transition-colors hover:text-primary/75"
          >
            Ask about availability
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>

        <div className="motion-stagger mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {galleryImages.map((image) => (
            <figure key={image.src} className="group overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
              <div className="relative aspect-[4/3] overflow-hidden bg-secondary">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <figcaption className="px-4 py-3 text-sm font-semibold text-foreground">{image.label}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
