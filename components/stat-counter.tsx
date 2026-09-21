"use client"

import { useEffect, useRef, useState } from "react"

export function StatCounter({
  value,
  suffix = "",
  label,
}: {
  value: number
  suffix?: string
  label: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [display, setDisplay] = useState(0)
  const started = useRef(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || started.current) return
        started.current = true

        const duration = 1600
        const start = performance.now()
        const tick = (now: number) => {
          const progress = Math.min((now - start) / duration, 1)
          const eased = 1 - Math.pow(1 - progress, 3)
          setDisplay(Math.round(eased * value))
          if (progress < 1) requestAnimationFrame(tick)
        }
        requestAnimationFrame(tick)
      },
      { threshold: 0.4 },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [value])

  return (
    <div ref={ref} className="text-center">
      <div className="font-heading text-4xl font-extrabold text-primary sm:text-5xl">
        {display.toLocaleString("en-IN")}
        <span className="text-accent">{suffix}</span>
      </div>
      <div className="mt-2 text-sm font-medium uppercase tracking-wide text-muted-foreground">{label}</div>
    </div>
  )
}
