"use client";

import Polaroid from "@/components/Polaroid";
import { proximamente } from "@/content/historia";

/** El sitio donde todavía no hemos estado: Noruega. */
export default function Proximamente() {
  return (
    <section className="relative z-10 mx-auto flex max-w-[960px] flex-col items-center gap-[18px] px-5 pt-2.5 pb-[90px] text-center">
      <p className="t-antetitulo m-0 text-hilo">{proximamente.antetitulo}</p>
      <h2 className="t-destino m-0">{proximamente.destino}</h2>
      <p className="t-proxima m-0 mb-1.5">{proximamente.texto}</p>

      <div className="flex w-full flex-wrap items-start justify-center gap-[clamp(12px,3.5vw,22px)]">
        {proximamente.piezas.map((pieza, i) => (
          <Polaroid key={pieza.src} pieza={pieza} orden={i} />
        ))}
      </div>
    </section>
  );
}
