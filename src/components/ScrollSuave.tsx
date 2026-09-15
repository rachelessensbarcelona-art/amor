"use client";

import Lenis from "lenis";
import { useEffect } from "react";

let instancia: Lenis | null = null;

/** Devuelve el scroll suave activo, si lo hay (null con `prefers-reduced-motion`). */
export function scrollSuave() {
  return instancia;
}

/**
 * Scroll suave con Lenis. Se desactiva por completo si el sistema pide
 * menos movimiento, para no marear a nadie.
 */
export default function ScrollSuave() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({ duration: 1.05, touchMultiplier: 1.6 });
    instancia = lenis;

    let raf = 0;
    const bucle = (t: number) => {
      lenis.raf(t);
      raf = requestAnimationFrame(bucle);
    };
    raf = requestAnimationFrame(bucle);

    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      instancia = null;
    };
  }, []);

  return null;
}
