import { MessageCircle } from "lucide-react"
import { contact } from "@/lib/site-data"

export function FloatingWhatsApp() {
  return (
    <a
      href={`${contact.whatsappHref}?text=${encodeURIComponent("Hello Kalika Travels, I would like to enquire about a vehicle.")}`}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat with Kalika Travels on WhatsApp"
      className="whatsapp-pulse fixed bottom-5 right-5 z-40 inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#25D366]/40 sm:bottom-6 sm:right-6"
    >
      <MessageCircle className="h-6 w-6" />
    </a>
  )
}
