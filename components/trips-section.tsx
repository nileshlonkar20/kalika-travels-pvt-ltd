import { MapPin, Clock, IndianRupee, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { trips, contact } from "@/lib/site-data"

export function TripsSection() {
  return (
    <section id="trips" className="relative overflow-hidden bg-primary py-20 text-primary-foreground md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-accent">Trip Options</span>
          <h2 className="mt-3 font-heading text-3xl font-bold sm:text-4xl">Plans for every journey</h2>
          <p className="mt-4 text-primary-foreground/80">
            From a quick local ride to a full outstation adventure or a custom tour package across Maharashtra.
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {trips.map((trip, index) => (
            <div
              key={trip.title}
              className="flex flex-col rounded-2xl border border-primary-foreground/15 bg-primary-foreground/5 p-6 backdrop-blur transition-transform duration-300 hover:-translate-y-1 sm:p-7"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-accent font-heading text-lg font-bold text-accent-foreground">
                  {index + 1}
                </span>
                <h3 className="font-heading text-xl font-bold">{trip.title}</h3>
              </div>

              <dl className="mt-6 space-y-4 text-sm">
                <div className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                  <span className="text-primary-foreground/85">{trip.minimum}</span>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                  <span className="text-primary-foreground/85">{trip.duration}</span>
                </div>
                <div className="flex items-start gap-3">
                  <IndianRupee className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                  <span className="text-primary-foreground/85">{trip.price}</span>
                </div>
              </dl>

              <Button
                render={<a href={contact.phoneHref} />}
                nativeButton={false}
                className="mt-8 w-full bg-accent text-accent-foreground hover:bg-accent/90"
              >
                <Phone className="h-4 w-4" />
                Enquire Now
              </Button>
            </div>
          ))}
        </div>
        <p className="mx-auto mt-8 max-w-2xl text-center text-sm text-primary-foreground/65">
          We share a clear quote before confirmation. Tolls, parking, waiting time and route changes are discussed in advance.
        </p>
      </div>
    </section>
  )
}
