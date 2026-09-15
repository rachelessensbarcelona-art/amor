"use client";

import { useRef, useState } from "react";
import HiloRojo from "@/components/HiloRojo";
import LluviaCorazones, { type ManejoCorazones } from "@/components/LluviaCorazones";
import Musica from "@/components/Musica";
import Poema from "@/components/Poema";
import PreguntaFinal from "@/components/PreguntaFinal";
import Proximamente from "@/components/Proximamente";
import ScrollSuave, { scrollSuave } from "@/components/ScrollSuave";
import Sobre from "@/components/Sobre";
import { final } from "@/content/historia";

/** Une todas las piezas y guarda los dos estados que comparten: sobre abierto y pregunta aceptada. */
export default function Experiencia() {
  const [abierto, setAbierto] = useState(false);
  const [aceptado, setAceptado] = useState(false);
  const corazonesRef = useRef<ManejoCorazones>(null);

  const aceptar = (x: number, y: number) => {
    setAceptado(true);
    corazonesRef.current?.explotar(x, y);
    if (navigator.vibrate) {
      try {
        navigator.vibrate([80, 40, 80]);
      } catch {
        /* algunos navegadores lo bloquean; da igual */
      }
    }
  };

  const volverAEmpezar = () => {
    const suave = scrollSuave();
    if (suave) suave.scrollTo(0, { duration: 1.2 });
    else window.scrollTo({ top: 0, behavior: "auto" });

    setTimeout(() => {
      setAceptado(false);
      setAbierto(false);
    }, suave ? 900 : 0);
  };

  return (
    <>
      <ScrollSuave />

      <main className="relative w-full overflow-hidden">
        <HiloRojo />
        <Sobre abierto={abierto} onAbrir={() => setAbierto(true)} />
        <Poema />
        <Proximamente />
        <PreguntaFinal aceptado={aceptado} onAceptar={aceptar} onReiniciar={volverAEmpezar} />
      </main>

      <LluviaCorazones ref={corazonesRef} cantidad={final.corazones} />
      <Musica activo={abierto} />
    </>
  );
}
