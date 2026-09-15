"use client";

import { motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import { pareja } from "@/content/historia";

/**
 * La apertura: un sobre cerrado que se abre al tocarlo.
 * Ese toque es también el que desbloquea el audio (los navegadores
 * no dejan sonar la música sin una interacción previa).
 */
export default function Sobre({
  abierto,
  onAbrir,
}: {
  abierto: boolean;
  onAbrir: () => void;
}) {
  const menosMovimiento = useReducedMotion();
  const [oculto, setOculto] = useState(false);

  useEffect(() => {
    if (!abierto) {
      setOculto(false);
      return;
    }
    const t = setTimeout(() => setOculto(true), menosMovimiento ? 0 : 1450);
    return () => clearTimeout(t);
  }, [abierto, menosMovimiento]);

  const retraso = (ms: number) => (menosMovimiento ? 0 : ms / 1000);

  return (
    <section className="relative z-10 flex min-h-[100svh] flex-col items-center justify-center gap-[26px] px-6 pt-14 pb-10 text-center">
      <p className="t-saludo m-0 text-hilo">{pareja.saludo}</p>

      {!oculto && (
        <motion.button
          type="button"
          onClick={onAbrir}
          aria-label="Abrir el sobre"
          disabled={abierto}
          className="flex cursor-pointer flex-col items-center gap-4 rounded-2xl border-0 bg-transparent p-2.5 disabled:cursor-default"
          animate={abierto ? { opacity: 0, scale: 0.9, y: -10 } : { opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: menosMovimiento ? 0 : 0.6, delay: abierto ? retraso(900) : 0 }}
        >
          <div
            className="relative w-[min(300px,74vw)]"
            style={{ aspectRatio: "3 / 2", perspective: "900px" }}
          >
            {/* La carta, que asoma al abrirse */}
            <motion.div
              className="absolute left-[8%] top-[6%] z-[1] h-[86%] w-[84%] bg-papel shadow-[0_10px_26px_rgba(58,28,40,0.16)]"
              animate={{ y: abierto ? -46 : 14 }}
              transition={{
                duration: menosMovimiento ? 0 : 0.7,
                delay: abierto ? retraso(380) : 0,
                ease: [0.22, 1, 0.36, 1],
              }}
            />
            {/* El cuerpo del sobre */}
            <div
              className="absolute inset-0 z-[2] bg-[#fbf3f1] shadow-[0_14px_34px_rgba(58,28,40,0.18)]"
              style={{ clipPath: "polygon(0 100%, 0 0, 50% 46%, 100% 0, 100% 100%)" }}
            />
            {/* La solapa, que gira en 3D */}
            <motion.div
              className="absolute left-0 top-0 z-[3] h-[52%] w-full bg-[#f3e3e0]"
              style={{
                clipPath: "polygon(0 0, 100% 0, 50% 100%)",
                transformOrigin: "top center",
              }}
              animate={{ rotateX: abierto ? -172 : 0 }}
              transition={{ duration: menosMovimiento ? 0 : 0.9, ease: [0.4, 0.1, 0.2, 1] }}
            />
            {/* El lacre */}
            <div className="absolute left-1/2 top-[44%] z-[4] -ml-[17px] h-[34px] w-[34px] rounded-full bg-hilo shadow-[0_3px_8px_rgba(58,28,40,0.25)]" />
          </div>

          <span className="font-[family-name:var(--font-mano)] text-2xl text-tinta-suave">
            {pareja.invitacion}
          </span>
        </motion.button>
      )}

      <motion.div
        className="flex max-w-[60ch] flex-col items-center gap-[22px]"
        initial={false}
        animate={abierto ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
        transition={{
          duration: menosMovimiento ? 0 : 0.9,
          delay: abierto ? retraso(1650) : 0,
        }}
        aria-hidden={!abierto}
      >
        <p className="t-dedicatoria m-0">{pareja.dedicatoria}</p>
        <div className="anima-flota flex flex-col items-center gap-1.5">
          <span className="text-sm text-tinta-suave">desliza</span>
          <span className="block h-[38px] w-px bg-hilo" />
        </div>
      </motion.div>
    </section>
  );
}
