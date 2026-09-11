import { useEffect, useRef, useState } from "react"

export function useInView({ threshold = 0.01, once = true } = {}) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          if (once) observer.disconnect()
          return
        }
        if (!once) setVisible(false)
      },
      { threshold, rootMargin: "0px 0px -8% 0px" },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [once, threshold])

  return [ref, visible]
}
