export const metadata = {
  title: "Terms and Conditions | Kalika Translink",
  description: "Terms and conditions for Kalika Translink vehicle rentals and trip bookings.",
}

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-background px-4 py-12 sm:px-6 sm:py-20">
      <article className="mx-auto max-w-3xl">
        <a href="/" className="text-sm font-semibold text-primary hover:text-primary/75">← Back to Kalika Translink</a>
        <p className="mt-10 text-sm font-semibold uppercase tracking-widest text-accent">Legal</p>
        <h1 className="mt-3 font-heading text-4xl font-bold text-foreground">Terms and Conditions</h1>
        <p className="mt-4 text-muted-foreground">Last updated: September 21, 2026</p>
        <div className="mt-10 space-y-8 leading-relaxed text-muted-foreground">
          <section><h2 className="font-heading text-xl font-bold text-foreground">Bookings</h2><p className="mt-3">A booking is confirmed after vehicle availability, trip details and pricing are agreed with Kalika Translink. Quotes may change when dates, route, vehicle or passenger requirements change.</p></section>
          <section><h2 className="font-heading text-xl font-bold text-foreground">Trip responsibility</h2><p className="mt-3">Customers must provide accurate pickup, destination, date and passenger details. Extra kilometres, waiting time, tolls, parking and route changes may be charged where applicable and will be explained before confirmation whenever possible.</p></section>
          <section><h2 className="font-heading text-xl font-bold text-foreground">Contact</h2><p className="mt-3">For booking questions, call <a className="font-semibold text-primary" href="tel:+917030509058">+91 70305 09058</a>.</p></section>
        </div>
      </article>
    </main>
  )
}
