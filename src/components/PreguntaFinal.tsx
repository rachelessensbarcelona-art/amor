"use client";

import { AnimatePresence, motion, useReducedMotion, useScroll, useSpring } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { final } from "@/content/historia";

/**
 * La pregunta, el botón que late y todo lo que pasa después:
 * el "pop" del botón, los corazones, el mensaje escrito letra a letra y la posdata.
 */
export default function PreguntaFinal({
  aceptado,
  onAceptar,
  onReiniciar,
}: {
  aceptado: boolean;
  onAceptar: (x: number, y: number) => void;
  onReiniciar: () => void;
}) {
  const menosMovimiento = useReducedMotion();
  const seccionRef = useRef<HTMLElement>(null);
  const botonRef = useRef<HTMLButtonElement>(null);

  const [mostrarBloque, setMostrarBloque] = useState(false);
  const [escrito, setEscrito] = useState("");
  const [mostrarPosdata, setMostrarPosdata] = useState(false);

  // El hilo termina de dibujarse formando el corazón que rodea al botón.
  const { scrollYProgress } = useScroll({
    target: seccionRef,
    offset: ["start end", "start 0.15"],
  });
  const corazonDibujado = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    if (!aceptado) {
      setMostrarBloque(false);
      setEscrito("");
      setMostrarPosdata(false);
      return;
    }

    const temporizadores: ReturnType<typeof setTimeout>[] = [];
    let intervalo: ReturnType<typeof setInterval> | undefined;

    temporizadores.push(
      setTimeout(
        () => {
          setMostrarBloque(true);

          if (menosMovimiento) {
            setEscrito(final.mensajeTrasAceptar);
            setMostrarPosdata(true);
            return;
          }

          let i = 0;
          intervalo = setInterval(() => {
            i += 1;
            setEscrito(final.mensajeTrasAceptar.slice(0, i));
            if (i >= final.mensajeTrasAceptar.length) {
              clearInterval(intervalo);
              temporizadores.push(setTimeout(() => setMostrarPosdata(true), 700));
            }
          }, 55);
        },
        menosMovimiento ? 0 : 1300,
      ),
    );

    return () => {
      temporizadores.forEach(clearTimeout);
      if (intervalo) clearInterval(intervalo);
    };
  }, [aceptado, menosMovimiento]);

  const aceptar = () => {
    if (aceptado) return;
    const r = botonRef.current?.getBoundingClientRect();
    onAceptar(
      r ? r.left + r.width / 2 : window.innerWidth / 2,
      r ? r.top + r.height / 2 : window.innerHeight / 2,
    );
  };

  return (
    <section
      ref={seccionRef}
      className="sobre-oscuro relative z-20 flex min-h-[100svh] flex-col items-center justify-center gap-[34px] overflow-hidden bg-noche px-6 py-[70px] text-center text-noche-tinta"
    >
      <motion.h2
        className="t-pregunta m-0"
        animate={aceptado ? { opacity: 0, y: -12 } : { opacity: 1, y: 0 }}
        transition={{
          duration: menosMovimiento ? 0 : 0.6,
          delay: aceptado && !menosMovimiento ? 0.9 : 0,
        }}
      >
        {final.pregunta}
      </motion.h2>

      <div className="relative flex h-[min(300px,78vw)] w-[min(330px,86vw)] items-center justify-center">
        <svg
          viewBox="0 0 200 190"
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 h-full w-full"
        >
          <motion.path
            d="M100,178 C34,124 12,86 12,58 C12,30 34,12 58,12 C77,12 92,23 100,38 C108,23 123,12 142,12 C166,12 188,30 188,58 C188,86 166,124 100,178 Z"
            fill="none"
            stroke="var(--color-hilo)"
            strokeWidth={2.5}
            strokeLinecap="round"
            style={{ pathLength: menosMovimiento ? 1 : corazonDibujado }}
          />
        </svg>

        <AnimatePresence>
          {!aceptado && (
            <motion.button
              key="boton-si"
              ref={botonRef}
              type="button"
              onClick={aceptar}
              className={`relative min-h-14 cursor-pointer rounded-full border-0 bg-hilo px-[30px] py-[18px] text-lg font-semibold text-white shadow-[0_12px_28px_rgba(215,38,61,0.38)] ${
                menosMovimiento ? "" : "anima-latido"
              }`}
              exit={
                menosMovimiento
                  ? { opacity: 0 }
                  : { scale: [1.18, 0], opacity: [1, 0] }
              }
              transition={
                menosMovimiento
                  ? { duration: 0 }
                  : { duration: 0.52, times: [0.33, 1], ease: [0.34, 1.56, 0.64, 1] }
              }
            >
              {final.boton}
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {mostrarBloque && (
          <motion.div
            key="bloque-final"
            className="flex flex-col items-center gap-[26px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: menosMovimiento ? 0 : 0.8 }}
          >
            <p className="t-mensaje m-0 min-h-[1.3em] text-noche-tinta">{escrito}</p>

            <motion.p
              className="t-posdata m-0 text-hilo"
              animate={{ opacity: mostrarPosdata ? 1 : 0 }}
              transition={{ duration: menosMovimiento ? 0 : 0.8 }}
            >
              {final.posdata}
            </motion.p>

            <button
              type="button"
              onClick={onReiniciar}
              className="min-h-11 cursor-pointer rounded-full border-[1.5px] border-noche-borde bg-transparent px-5 py-3 text-sm text-noche-tinta transition-colors hover:border-noche-tinta"
            >
              {final.reiniciar}
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <p className="absolute bottom-[22px] m-0 font-[family-name:var(--font-mano)] text-[22px] leading-tight text-noche-suave">
        {final.firma}
      </p>
    </section>
  );
}
