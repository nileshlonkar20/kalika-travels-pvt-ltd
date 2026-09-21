export const contact = {
  phone: "+91 70305 09058",
  phoneHref: "tel:+917030509058",
  email: "nilesh.mymails@gmail.com",
  emailHref: "mailto:nilesh.mymails@gmail.com",
  whatsappHref: "https://wa.me/917030509058",
  instagramHref: "https://www.instagram.com/kalika_travels?stkn=bGoyNjh2ODAzZ3Zs&utm_source=qr",
  mapsHref: "https://www.google.com/maps/search/?api=1&query=Jaibhavaninagar%2C+Thergaon%2C+Pune%2C+Maharashtra+411033",
  ownerName: "Nilesh Lonkar",
  address:
    "Jaibhavaninagar, Thergaon, Pune, Maharashtra 411033",
  shortAddress: "Jaibhavaninagar, Thergaon, Pune, Maharashtra 411033",
} as const

export const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Fleet", href: "#fleet" },
  { label: "Why Us", href: "#why-us" },
  { label: "Trips", href: "#trips" },
  { label: "Contact", href: "#contact" },
] as const

export const stats = [
  { value: 150, suffix: "+", label: "Experienced Drivers" },
  { value: 100, suffix: "%", label: "Happy Customers" },
  { value: 5000, suffix: "+", label: "Satisfied Clients" },
  { value: 15, suffix: "+", label: "Years of Experience" },
] as const

export const services = [
  {
    id: "bus-32-seater",
    title: "Bus 32 Seater",
    price: "₹36",
    unit: "/km",
    image: "/images/bus_32_seater.jpeg",
    description:
      "Comfortable 32-seater AC and Non-AC bus for family trips, staff travel, and group outings with reliable drivers.",
    tags: ["32 Seater", "AC / Non-AC", "Group Travel"],
  },
  {
    id: "ertiga",
    title: "Ertiga",
    price: "₹15",
    unit: "/km",
    image: "/images/ertiga_9077.jpeg",
    description:
      "Spacious and efficient 7-seater Ertiga for local and outstation travel with luggage-friendly comfort.",
    tags: ["7 Seater", "Family Ride", "Local / Outstation"],
  },
  {
    id: "tempo-traveller",
    title: "Tempo Traveller",
    price: "₹24",
    unit: "/km",
    image: "/images/tempo_traveler_8757.jpeg",
    description:
      "Reliable 9 to 20 seater tempo traveller for group journeys, pilgrimages, weddings and intercity vacations.",
    tags: ["9–20 Seater", "AC / Non-AC", "Group Travel"],
  },
  {
    id: "innova",
    title: "Innova",
    price: "₹20",
    unit: "/km",
    image: "/images/innova_7722.jpeg",
    description:
      "Premium 7-seater Innova with strong comfort, smooth ride quality and dependable driver support for every trip.",
    tags: ["7 Seater", "Premium SUV", "Comfort Travel"],
  },
] as const

export const features = [
  {
    title: "Hassle Free & 100% Safe",
    description: "Latest, fully functional and frequently serviced vehicle models for a worry-free journey.",
  },
  {
    title: "Fully Sanitized Vehicles",
    description: "Every vehicle is thoroughly cleaned and sanitized before your trip begins.",
  },
  {
    title: "Expert Local Drivers",
    description: "Never worry about your route — our drivers know the exact best match for your needs.",
  },
  {
    title: "Transparent Billing",
    description: "Clear, upfront pricing with no hidden charges. What you see is what you pay.",
  },
  {
    title: "Always On Time",
    description: "Driver and cab report 15 minutes before schedule at your location, every time.",
  },
  {
    title: "Extra Comfort",
    description: "Vehicles equipped with world-class tool kits and spare parts for comfortable travel.",
  },
] as const

export const trips = [
  {
    title: "Local Trip",
    minimum: "Minimum 80 km",
    duration: "8 Hours",
    price: "As per vehicle (AC / Non-AC)",
  },
  {
    title: "Outstation Trip",
    minimum: "Minimum 300 km",
    duration: "Full Day · 12:00 to 23:59",
    price: "As per vehicle (AC / Non-AC)",
  },
  {
    title: "Special Tour Package",
    minimum: "Mumbai · Shirdi · Mahabaleshwar",
    duration: "Customised multi-day tours",
    price: "Custom quote on request",
  },
] as const

export const destinations = [
  "Mumbai",
  "Shirdi",
  "Mahabaleshwar",
  "Lonavla",
  "Lavasa",
  "Nashik",
  "Ch. Sambhajinagar",
  "Panchgani",
] as const
