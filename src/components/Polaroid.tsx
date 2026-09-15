"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
import { useEffect, useRef } from "react";
import type { Pieza } from "@/content/historia";

/** Vídeo que no se descarga hasta que entra en pantalla, y entonces arranca en bucle. */
function VideoDiferido({
  src,
  alt,
  portada,
}: {
  src: string;
  alt: string;
  portada?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;

    const observador = new IntersectionObserver(
      ([entrada]) => {
        if (!entrada?.isIntersecting) return;
        observador.disconnect();
        video.preload = "auto";
        video.load();
        void video.play().catch(() => {});
      },
      { threshold: 0.25 },
    );
    observador.observe(video);
    return () => observador.disconnect();
  }, []);

  return (
    <video
      ref={ref}
      src={src}
      poster={portada}
      muted
      loop
      playsInline
      preload="none"
      aria-label={alt}
      className="absolute inset-0 h-full w-full object-cover"
    />
  );
}

/**
 * Una foto (o vídeo) con borde blanco de polaroid.
 * Dos capas: la de fuera hace el parallax con el scroll, la de dentro
 * hace la caída con rebote al entrar en pantalla. Así no se pisan.
 */
export default function Polaroid({ pieza, orden = 0 }: { pieza: Pieza; orden?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const menosMovimiento = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const desplazamiento = useTransform(
    scrollYProgress,
    [0, 1],
    [-pieza.parallax / 2, pieza.parallax / 2],
  );
  const y = useSpring(desplazamiento, { stiffness: 140, damping: 26, mass: 0.4 });

  return (
    <motion.div
      ref={ref}
      style={menosMovimiento ? undefined : { y }}
      className="will-change-transform"
    >
      <motion.div
        className="bg-papel shadow-[0_12px_26px_rgba(58,28,40,0.16)]"
        style={{ width: pieza.ancho, padding: "9px 9px 11px" }}
        initial={
          menosMovimiento
            ? { opacity: 1, rotate: pieza.giro }
            : { opacity: 0, y: -28, scale: 0.94, rotate: 0 }
        }
        whileInView={{ opacity: 1, y: 0, scale: 1, rotate: pieza.giro }}
        viewport={{ once: true, amount: 0.25 }}
        transition={
          menosMovimiento
            ? { duration: 0 }
            : {
                type: "spring",
                stiffness: 220,
                damping: 13,
                mass: 0.8,
                delay: orden * 0.08,
                opacity: { duration: 0.55, delay: orden * 0.08 },
              }
        }
      >
        <div
          className="relative block w-full bg-[#eadad7]"
          style={{ aspectRatio: pieza.ratio }}
        >
          {pieza.tipo === "video" ? (
            <VideoDiferido src={pieza.src} alt={pieza.alt} portada={pieza.portada} />
          ) : (
            <Image
              src={pieza.src}
              alt={pieza.alt}
              fill
              sizes="(max-width: 640px) 60vw, 300px"
              priority={pieza.inmediata}
              className="object-cover"
            />
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
