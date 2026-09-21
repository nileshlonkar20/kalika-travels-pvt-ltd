import { ShieldCheck, SprayCan, Route, ReceiptText, Clock, Sofa } from "lucide-react"
import { features } from "@/lib/site-data"

const icons = [ShieldCheck, SprayCan, Route, ReceiptText, Clock, Sofa]

export function WhyUsSection() {
  return (
    <section id="why-us" className="bg-background py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-accent">Why Choose Us</span>
          <h2 className="mt-3 font-heading text-3xl font-bold text-foreground sm:text-4xl">
            Your safety is our priority
          </h2>
          <p className="mt-4 text-muted-foreground">
            We always use the latest, fully functional vehicles — well maintained, frequently serviced and equipped
            with world-class tool kits and spare parts.
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => {
            const Icon = icons[index % icons.length]
            return (
              <div
                key={feature.title}
                className="rounded-2xl border border-border bg-card p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-accent/50 hover:shadow-md"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Icon className="h-6 w-6" />
                </span>
                <h3 className="mt-4 font-heading text-lg font-bold text-foreground">{feature.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{feature.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
