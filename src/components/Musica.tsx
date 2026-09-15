"use client";

import { useEffect, useRef, useState } from "react";
import { musica } from "@/content/historia";

/**
 * Reproductor mínimo. Empieza a sonar al abrir el sobre, con dos segundos
 * de fundido de entrada. Si el archivo no existe, el botón no aparece.
 */
export default function Musica({ activo }: { activo: boolean }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const rafRef = useRef(0);
  const arrancadoRef = useRef(false);
  const [disponible, setDisponible] = useState(true);
  const [sonando, setSonando] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !activo || arrancadoRef.current) return;
    arrancadoRef.current = true;

    audio.volume = 0;
    void audio.play().then(
      () => setSonando(true),
      () => setSonando(false),
    );

    const inicio = performance.now();
    const subir = (t: number) => {
      // El primer fotograma puede llegar con una marca de tiempo anterior a
      // `inicio`, así que hay que acotar entre 0 y 1 o el navegador se queja.
      const k = Math.min(1, Math.max(0, (t - inicio) / 2000));
      audio.volume = musica.volumen * k;
      if (k < 1) rafRef.current = requestAnimationFrame(subir);
    };
    rafRef.current = requestAnimationFrame(subir);

    return () => cancelAnimationFrame(rafRef.current);
  }, [activo]);

  useEffect(() => () => cancelAnimationFrame(rafRef.current), []);

  const alternar = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      void audio.play().then(
        () => setSonando(true),
        () => {},
      );
    } else {
      audio.pause();
      setSonando(false);
    }
  };

  return (
    <>
      <audio
        ref={audioRef}
        src={musica.src}
        loop
        preload="none"
        onError={() => setDisponible(false)}
      />
      {disponible && activo && (
        <button
          type="button"
          onClick={alternar}
          aria-label={sonando ? "Silenciar la música" : "Poner la música"}
          aria-pressed={sonando}
          className="fixed bottom-4 right-4 z-[70] flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border-0 bg-papel text-xl leading-none shadow-[0_8px_20px_rgba(58,28,40,0.22)]"
          style={{ color: sonando ? "var(--color-hilo)" : "var(--color-noche-suave)" }}
        >
          ♪
        </button>
      )}
    </>
  );
}
