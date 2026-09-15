/**
 * npm run fotos
 *
 * Coge TODAS las imágenes de  public/fotos/originales/
 * y las deja en                public/fotos/
 * reducidas a 1600 px de lado mayor y en JPG con calidad 80.
 *
 * Para qué: las fotos que salen del móvil pesan varios megas cada una y
 * harían que la web tardase en cargar. Así pesan unas diez veces menos
 * y se ven igual de bien en una pantalla.
 */

import { mkdir, readdir, stat } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const ORIGINALES = path.join(process.cwd(), "public", "fotos", "originales");
const DESTINO = path.join(process.cwd(), "public", "fotos");
const LADO_MAYOR = 1600;
const CALIDAD = 80;
const EXTENSIONES = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif", ".heic", ".tif", ".tiff"]);

const kb = (bytes) => `${Math.round(bytes / 1024)} KB`;

async function main() {
  let archivos;
  try {
    archivos = await readdir(ORIGINALES);
  } catch {
    console.error(
      `\nNo encuentro la carpeta public/fotos/originales.\n` +
        `Créala, mete ahí tus fotos tal cual salen del móvil y vuelve a ejecutar: npm run fotos\n`,
    );
    process.exitCode = 1;
    return;
  }

  const imagenes = archivos.filter((f) => EXTENSIONES.has(path.extname(f).toLowerCase()));

  if (imagenes.length === 0) {
    console.log("\nNo hay ninguna imagen en public/fotos/originales. No hago nada.\n");
    return;
  }

  await mkdir(DESTINO, { recursive: true });

  let antes = 0;
  let despues = 0;

  for (const nombre of imagenes) {
    const origen = path.join(ORIGINALES, nombre);
    const salida = path.join(DESTINO, `${path.parse(nombre).name}.jpg`);

    const { size: pesoOriginal } = await stat(origen);
    const info = await sharp(origen)
      .rotate() // respeta la orientación con la que se hizo la foto
      .resize({
        width: LADO_MAYOR,
        height: LADO_MAYOR,
        fit: "inside",
        withoutEnlargement: true,
      })
      .jpeg({ quality: CALIDAD, mozjpeg: true, progressive: true })
      .toFile(salida);

    antes += pesoOriginal;
    despues += info.size;
    console.log(
      `  ${nombre.padEnd(28)} ${kb(pesoOriginal).padStart(9)} →  ${kb(info.size).padStart(9)}  (${info.width}×${info.height})`,
    );
  }

  const ahorro = antes > 0 ? Math.round((1 - despues / antes) * 100) : 0;
  console.log(
    `\n${imagenes.length} foto(s) listas en public/fotos — ${kb(antes)} → ${kb(despues)} (${ahorro}% menos)\n`,
  );
}

main().catch((error) => {
  console.error("\nAlgo ha fallado al procesar las fotos:\n", error);
  process.exitCode = 1;
});
