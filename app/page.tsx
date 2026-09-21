import { SiteHeader } from "@/components/site-header"
import { Hero } from "@/components/hero"
import { AboutSection } from "@/components/about-section"
import { FleetSection } from "@/components/fleet-section"
import { WhyUsSection } from "@/components/why-us-section"
import { TripsSection } from "@/components/trips-section"
import { TestimonialSection } from "@/components/testimonial-section"
import { ContactSection } from "@/components/contact-section"
import { SiteFooter } from "@/components/site-footer"
import { GallerySection } from "@/components/gallery-section"
import { FaqSection } from "@/components/faq-section"
import { FloatingWhatsApp } from "@/components/floating-whatsapp"

export default function Page() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <AboutSection />
        <FleetSection />
        <WhyUsSection />
        <TripsSection />
        <GallerySection />
        <TestimonialSection />
        <FaqSection />
        <ContactSection />
      </main>
      <SiteFooter />
      <FloatingWhatsApp />
    </>
  )
}
