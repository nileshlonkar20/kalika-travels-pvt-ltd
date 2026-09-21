export const metadata = {
  title: "Cancellation Policy | Kalika Travels",
  description: "Cancellation and changes policy for Kalika Travels bookings.",
}

export default function CancellationPage() {
  return (
    <main className="min-h-screen bg-background px-4 py-12 sm:px-6 sm:py-20">
      <article className="mx-auto max-w-3xl">
        <a href="/" className="text-sm font-semibold text-primary hover:text-primary/75">← Back to Kalika Travels</a>
        <p className="mt-10 text-sm font-semibold uppercase tracking-widest text-accent">Legal</p>
        <h1 className="mt-3 font-heading text-4xl font-bold text-foreground">Cancellation Policy</h1>
        <p className="mt-4 text-muted-foreground">Last updated: September 21, 2026</p>
        <div className="mt-10 space-y-8 leading-relaxed text-muted-foreground">
          <section><h2 className="font-heading text-xl font-bold text-foreground">Changes and cancellations</h2><p className="mt-3">Please contact Kalika Travels as early as possible if you need to change or cancel a booking. Charges, if any, depend on how close the request is to the trip date and whether the vehicle and driver have already been assigned.</p></section>
          <section><h2 className="font-heading text-xl font-bold text-foreground">Refunds</h2><p className="mt-3">Any eligible refund is reviewed against the agreed booking terms and returned through the original payment method where applicable. Custom tour packages may have separate conditions.</p></section>
          <section><h2 className="font-heading text-xl font-bold text-foreground">Contact us</h2><p className="mt-3">Call <a className="font-semibold text-primary" href="tel:+917030509058">+91 70305 09058</a> to discuss a change or cancellation.</p></section>
        </div>
      </article>
    </main>
  )
}
