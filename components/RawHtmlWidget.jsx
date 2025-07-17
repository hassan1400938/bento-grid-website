'use client'

import { useEffect, useRef } from 'react'

export default function RawHtmlWidget({ src }) {
  const containerRef = useRef(null)

  useEffect(() => {
    fetch(src)
      .then((res) => res.text())
      .then((html) => {
        const shadowRoot = containerRef.current.attachShadow({ mode: 'open' })
        shadowRoot.innerHTML = html
      })
      .catch(console.error)
  }, [src])

  return <div ref={containerRef} className="w-full h-full rounded-3xl" />
}
