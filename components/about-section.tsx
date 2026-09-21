import { Check } from "lucide-react"
import { stats, destinations } from "@/lib/site-data"
import { StatCounter } from "@/components/stat-counter"

export function AboutSection() {
  return (
    <section id="about" className="bg-background py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid min-w-0 items-center gap-12 lg:grid-cols-2">
          <div className="relative min-w-0">
            <div className="aspect-[4/3] overflow-hidden rounded-2xl shadow-xl">
              <img
                src="/images/owner_about.jpeg"
                alt="Nilesh Lonkar, owner of Kalika Travels"
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-4 hidden rounded-xl bg-accent px-6 py-5 text-accent-foreground shadow-lg sm:block">
              <div className="font-heading text-3xl font-extrabold">15+</div>
              <div className="text-sm font-medium">Years on the road</div>
            </div>
          </div>

          <div>
            <span className="text-sm font-semibold uppercase tracking-widest text-accent">About Us</span>
            <h2 className="mt-3 font-heading text-3xl font-bold text-foreground sm:text-4xl">
              Your trusted travel partner in Pune
            </h2>
            <p className="mt-5 text-muted-foreground leading-relaxed">
              Kalika Travels has completed 15 years of trusted service, offering buses on rent, private cab services
              and tempo traveller rentals across Pune and Pimpri-Chinchwad. Our office is close to Pune Airport and
              Pune Railway Station, and every member of our staff is well-skilled and experienced in this field.
            </p>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              Owned and managed by <strong className="font-semibold text-foreground">Nilesh Lonkar</strong>, we focus
              on safe, dependable travel with transparent service and customer-first support for every trip.
            </p>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              We start by understanding your needs, then offer easy-to-rent vehicles of your choice at the best price —
              for regular routes like Pune to Mumbai, Shirdi, Mahabaleshwar, Lonavla, Lavasa and every outstation trip
              you have planned.
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              {destinations.map((place) => (
                <span
                  key={place}
                  className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1 text-sm font-medium text-secondary-foreground"
                >
                  <Check className="h-3.5 w-3.5 text-accent" />
                  {place}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-2 gap-8 rounded-2xl border border-border bg-secondary/40 p-8 sm:mt-20 lg:grid-cols-4">
          {stats.map((stat) => (
            <StatCounter key={stat.label} value={stat.value} suffix={stat.suffix} label={stat.label} />
          ))}
        </div>
      </div>
    </section>
  )
}
