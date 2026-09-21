export const metadata = {
  title: "Privacy Policy | Kalika Translink",
  description: "Privacy policy for Kalika Translink enquiries and bookings.",
}

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-background px-4 py-12 sm:px-6 sm:py-20">
      <article className="mx-auto max-w-3xl">
        <a href="/" className="text-sm font-semibold text-primary hover:text-primary/75">← Back to Kalika Translink</a>
        <p className="mt-10 text-sm font-semibold uppercase tracking-widest text-accent">Legal</p>
        <h1 className="mt-3 font-heading text-4xl font-bold text-foreground">Privacy Policy</h1>
        <p className="mt-4 text-muted-foreground">Last updated: September 21, 2026</p>
        <div className="mt-10 space-y-8 leading-relaxed text-muted-foreground">
          <section><h2 className="font-heading text-xl font-bold text-foreground">Information we collect</h2><p className="mt-3">When you submit an enquiry, we collect the name, phone number, email address and trip details you provide so Kalika Translink can respond to your request.</p></section>
          <section><h2 className="font-heading text-xl font-bold text-foreground">How we use it</h2><p className="mt-3">We use enquiry information to provide quotes, confirm vehicle availability, contact you about your trip and improve our service. We do not sell your personal information.</p></section>
          <section><h2 className="font-heading text-xl font-bold text-foreground">Contact</h2><p className="mt-3">For privacy questions, contact Nilesh Lonkar at <a className="font-semibold text-primary" href="mailto:nilesh.mymails@gmail.com">nilesh.mymails@gmail.com</a>.</p></section>
        </div>
      </article>
    </main>
  )
}
