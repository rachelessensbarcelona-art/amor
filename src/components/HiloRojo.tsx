"use client";

import { motion, useReducedMotion, useScroll, useSpring } from "motion/react";

/**
 * El hilo rojo del destino: un único trazo que recorre toda la página
 * de arriba abajo y se va dibujando conforme haces scroll.
 * Va pegado al lado izquierdo para no cruzar el texto.
 */
export default function HiloRojo() {
  const menosMovimiento = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const dibujado = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <svg
      viewBox="0 0 100 1000"
      preserveAspectRatio="none"
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 h-full w-full"
    >
      <motion.path
        d="M16,0 C30,58 6,108 18,168 C30,228 6,278 20,338 C34,398 6,448 18,508 C30,568 6,618 20,678 C34,738 6,788 18,848 C28,902 14,950 18,1000"
        fill="none"
        stroke="var(--color-hilo)"
        strokeWidth={2}
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
        opacity={0.85}
        style={{ pathLength: menosMovimiento ? 1 : dibujado }}
      />
    </svg>
  );
}
