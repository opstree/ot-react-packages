import React from 'react'
import { useEffect, useRef } from 'react'
import ReactLenis from "lenis/react"
import type { LenisRef } from 'lenis/react'
import gsap from 'gsap'

export const LenisProvider = ({ children }: { children: React.ReactNode }) => {
    const lenisRef = useRef<LenisRef | null>(null)
    useEffect(() => {
        function update(time: number) {
            lenisRef.current?.lenis?.raf(time * 1000)
        }
        gsap.ticker.add(update)
        return () => {
            gsap.ticker.remove(update)
        }
    }, [])
    return (
        <ReactLenis root options={{ autoRaf: true, allowNestedScroll: true, syncTouch: false, smoothWheel: true, lerp: .5 }} ref={lenisRef}>
            {children}
        </ReactLenis>
    )
}
