const faqs = [
  {
    question: "How early should I book a vehicle?",
    answer: "For the best availability, book at least two to three days ahead. We also accept urgent requests subject to vehicle and driver availability.",
  },
  {
    question: "Are local and outstation trips available?",
    answer: "Yes. We arrange local Pune trips, outstation journeys and customised multi-day tours across Maharashtra and nearby destinations.",
  },
  {
    question: "Are AC and non-AC vehicles available?",
    answer: "Yes. Bus and tempo traveller options are available in AC and non-AC configurations. We can recommend the right vehicle for your group size and route.",
  },
  {
    question: "How does pricing work?",
    answer: "Pricing depends on the vehicle, kilometres, route, dates and trip duration. We share a clear quote before you confirm, with no hidden charges.",
  },
  {
    question: "Can I request a driver with the vehicle?",
    answer: "Yes. Experienced drivers are available with every booking to help you travel safely and comfortably.",
  },
]

export function FaqSection() {
  return (
    <section className="bg-secondary/40 py-16 sm:py-20 md:py-28" aria-labelledby="faq-title">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <div className="text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-accent">FAQ</span>
          <h2 id="faq-title" className="mt-3 font-heading text-3xl font-bold text-foreground sm:text-4xl">
            Helpful answers before you travel
          </h2>
        </div>

        <div className="motion-rise mt-10 divide-y divide-border overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
          {faqs.map((faq) => (
            <details key={faq.question} className="group p-5 sm:p-6">
              <summary className="cursor-pointer list-none pr-8 font-heading font-semibold text-foreground marker:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring [&::-webkit-details-marker]:hidden">
                <span className="relative block after:absolute after:right-0 after:top-1/2 after:-translate-y-1/2 after:text-2xl after:font-normal after:text-accent after:content-['+'] group-open:after:content-['−']">
                  {faq.question}
                </span>
              </summary>
              <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted-foreground">{faq.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
