"use client";

import { motion, useReducedMotion } from "motion/react";
import Estrofa from "@/components/Estrofa";
import { cierre, poema } from "@/content/historia";

/** El poema entero: seis estrofas que aparecen al hacer scroll, con las fotos entre medias. */
export default function Poema() {
  const menosMovimiento = useReducedMotion();

  return (
    <section className="relative z-10 mx-auto flex max-w-[940px] flex-col items-center gap-[clamp(44px,9vw,74px)] px-5 pt-5 pb-10 text-center">
      {poema.map((estrofa) => (
        <Estrofa key={estrofa.versos[0]} estrofa={estrofa} />
      ))}

      <motion.p
        className="t-cierre m-0 text-hilo"
        initial={menosMovimiento ? { opacity: 1 } : { opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: menosMovimiento ? 0 : 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        {cierre}
      </motion.p>
    </section>
  );
}
