"use client";

import { Fragment } from "react";
import { motion, useReducedMotion } from "motion/react";
import Polaroid from "@/components/Polaroid";
import type { Estrofa as TipoEstrofa } from "@/content/historia";

/** Una estrofa del poema y, debajo, las fotos que la acompañan. */
export default function Estrofa({ estrofa }: { estrofa: TipoEstrofa }) {
  const menosMovimiento = useReducedMotion();

  return (
    <>
      <motion.p
        className="t-verso m-0"
        initial={menosMovimiento ? { opacity: 1 } : { opacity: 0, y: 22 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: menosMovimiento ? 0 : 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        {estrofa.versos.map((verso, i) => (
          <Fragment key={verso}>
            {i > 0 && <br />}
            {verso}
          </Fragment>
        ))}
      </motion.p>

      {estrofa.piezas.length > 0 && (
        <div className="flex w-full flex-wrap items-start justify-center gap-[clamp(12px,3.5vw,22px)]">
          {estrofa.piezas.map((pieza, i) => (
            <Polaroid key={pieza.src} pieza={pieza} orden={i} />
          ))}
        </div>
      )}
    </>
  );
}
