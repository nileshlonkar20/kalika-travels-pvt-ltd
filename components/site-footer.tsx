import { Bus, Phone, Mail, MapPin } from "lucide-react"
import { contact, navLinks, services } from "@/lib/site-data"

export function SiteFooter() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:grid-cols-2 sm:px-6 lg:grid-cols-4">
        <div className="sm:col-span-2 lg:col-span-1">
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent text-accent-foreground">
              <Bus className="h-6 w-6" />
            </span>
            <span className="font-heading text-lg font-bold">Kalika Travels</span>
          </div>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-primary-foreground/75">
            Offering buses, cars and tempo travellers on rent in Pune for over 15 years. Affordable, reliable and 100%
            safe journeys across Maharashtra.
          </p>
          <p className="mt-3 text-sm text-primary-foreground/75">Owner: {contact.ownerName}</p>
        </div>

        <div>
          <h3 className="font-heading text-sm font-semibold uppercase tracking-widest text-accent">Quick Links</h3>
          <ul className="mt-4 space-y-2 text-sm">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="text-primary-foreground/75 transition-colors hover:text-primary-foreground">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-heading text-sm font-semibold uppercase tracking-widest text-accent">Services</h3>
          <ul className="mt-4 space-y-2 text-sm">
            {services.map((service) => (
              <li key={service.id} className="text-primary-foreground/75">
                {service.title}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-heading text-sm font-semibold uppercase tracking-widest text-accent">Get in Touch</h3>
          <ul className="mt-4 space-y-3 text-sm">
            <li>
              <a href={contact.phoneHref} className="flex items-start gap-2.5 text-primary-foreground/75 transition-colors hover:text-primary-foreground">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                {contact.phone}
              </a>
            </li>
            <li>
              <a href={contact.emailHref} className="flex items-start gap-2.5 break-all text-primary-foreground/75 transition-colors hover:text-primary-foreground">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                {contact.email}
              </a>
            </li>
            <li>
              <a
                href={contact.instagramHref}
                target="_blank"
                rel="noreferrer"
                className="flex items-start gap-2.5 text-primary-foreground/75 transition-colors hover:text-primary-foreground"
              >
                <img
                  src="https://cdn.simpleicons.org/instagram/fbbf24"
                  alt=""
                  aria-hidden="true"
                  className="mt-0.5 h-4 w-4 shrink-0"
                />
                Instagram
              </a>
            </li>
            <li className="flex items-start gap-2.5 text-primary-foreground/75">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
              {contact.shortAddress}
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-primary-foreground/15">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-5 text-center text-sm text-primary-foreground/70 sm:flex-row sm:items-center sm:justify-between sm:px-6 sm:text-left">
          <span>&copy; {new Date().getFullYear()} Kalika Travels, Pune. All rights reserved.</span>
          <nav className="flex flex-wrap justify-center gap-x-4 gap-y-2 sm:justify-end" aria-label="Legal links">
            <a href="/privacy" className="transition-colors hover:text-primary-foreground">Privacy</a>
            <a href="/terms" className="transition-colors hover:text-primary-foreground">Terms</a>
            <a href="/cancellation" className="transition-colors hover:text-primary-foreground">Cancellation</a>
          </nav>
        </div>
      </div>
    </footer>
  )
}
