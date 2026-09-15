"use client";

import { useEffect, useImperativeHandle, useRef } from "react";
import type { RefObject } from "react";

export type ManejoCorazones = {
  /** Lanza la explosión desde un punto de la pantalla (coordenadas de viewport). */
  explotar: (x: number, y: number) => void;
};

type Particula = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  tam: number;
  giro: number;
  velGiro: number;
  color: string;
  alfa: number;
  vida: number;
  suave?: boolean;
};

const TONOS = ["#D7263D", "#E8556C", "#F07E92", "#B01B30", "#FFB3C0"];

function dibujarCorazon(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  tam: number,
  giro: number,
  color: string,
  alfa: number,
) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(giro);
  ctx.scale(tam / 16, tam / 16);
  ctx.globalAlpha = alfa;
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(0, 5);
  ctx.bezierCurveTo(-1, 2, -8, -2, -8, -7);
  ctx.bezierCurveTo(-8, -11, -4.5, -13, -2, -11);
  ctx.bezierCurveTo(-0.8, -10, 0, -8.5, 0, -7.5);
  ctx.bezierCurveTo(0, -8.5, 0.8, -10, 2, -11);
  ctx.bezierCurveTo(4.5, -13, 8, -11, 8, -7);
  ctx.bezierCurveTo(8, -2, 1, 2, 0, 5);
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}

/**
 * Corazones en canvas con física propia: un abanico de partículas desde el
 * botón (gravedad, giro, desvanecimiento) y después unos segundos de
 * corazones cayendo suave desde arriba.
 */
export default function LluviaCorazones({
  ref,
  cantidad,
}: {
  ref: RefObject<ManejoCorazones | null>;
  cantidad: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef(0);

  useEffect(() => {
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  useImperativeHandle(ref, () => ({
    explotar(cx: number, cy: number) {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const menosMovimiento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const ancho = window.innerWidth;
      const alto = window.innerHeight;
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      canvas.width = Math.floor(ancho * dpr);
      canvas.height = Math.floor(alto * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      canvas.style.opacity = "1";

      const total = menosMovimiento ? 26 : cantidad;
      const particulas: Particula[] = [];
      for (let i = 0; i < total; i++) {
        const angulo = -Math.PI / 2 + (Math.random() - 0.5) * Math.PI * 1.35;
        const velocidad = 5 + Math.random() * 11;
        particulas.push({
          x: cx,
          y: cy,
          vx: Math.cos(angulo) * velocidad,
          vy: Math.sin(angulo) * velocidad,
          tam: 10 + Math.random() * 20,
          giro: Math.random() * 6.28,
          velGiro: (Math.random() - 0.5) * 0.22,
          color: TONOS[i % TONOS.length]!,
          alfa: 1,
          vida: 0,
        });
      }

      const inicio = performance.now();
      const lluviaHasta = inicio + (menosMovimiento ? 1200 : 4200);
      let ultimaLluvia = 0;

      cancelAnimationFrame(rafRef.current);
      const bucle = (t: number) => {
        ctx.clearRect(0, 0, ancho, alto);

        if (t < lluviaHasta && t - ultimaLluvia > (menosMovimiento ? 420 : 105)) {
          ultimaLluvia = t;
          const porTanda = menosMovimiento ? 1 : 3;
          for (let j = 0; j < porTanda; j++) {
            particulas.push({
              x: Math.random() * ancho,
              y: -30,
              vx: (Math.random() - 0.5) * 1.1,
              vy: 1.4 + Math.random() * 1.8,
              tam: 12 + Math.random() * 16,
              giro: Math.random() * 6.28,
              velGiro: (Math.random() - 0.5) * 0.08,
              color: TONOS[Math.floor(Math.random() * TONOS.length)]!,
              alfa: 0.9,
              vida: 0,
              suave: true,
            });
          }
        }

        for (let i = particulas.length - 1; i >= 0; i--) {
          const p = particulas[i]!;
          p.vida += 1;
          if (p.suave) {
            p.vy += 0.008;
            p.vx += Math.sin((p.vida + p.tam) / 26) * 0.045;
          } else {
            p.vy += 0.26;
            p.vx *= 0.993;
            p.alfa -= 0.0075;
          }
          p.x += p.vx;
          p.y += p.vy;
          p.giro += p.velGiro;
          if (p.alfa <= 0.02 || p.y > alto + 60) {
            particulas.splice(i, 1);
            continue;
          }
          dibujarCorazon(ctx, p.x, p.y, p.tam, p.giro, p.color, Math.max(0, Math.min(1, p.alfa)));
        }

        if (particulas.length > 0) {
          rafRef.current = requestAnimationFrame(bucle);
        } else {
          canvas.style.opacity = "0";
        }
      };
      rafRef.current = requestAnimationFrame(bucle);
    },
  }));

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[60] h-full w-full opacity-0 transition-opacity duration-300"
    />
  );
}
