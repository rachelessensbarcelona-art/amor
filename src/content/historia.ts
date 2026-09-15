/**
 * ─────────────────────────────────────────────────────────────
 *  TODO EL CONTENIDO DE LA WEB ESTÁ EN ESTE ARCHIVO.
 *  Cambia aquí los textos, los versos y las fotos.
 *  No hace falta tocar ningún otro archivo.
 *  (Si no sabes por dónde empezar, lee el README.md)
 * ─────────────────────────────────────────────────────────────
 */

/** Una foto (o vídeo) presentada como polaroid. */
export type Pieza = {
  /** Ruta dentro de /public. Ej: "/fotos/playa.jpg" */
  src: string;
  /** Descripción para quien no puede ver la imagen. */
  alt: string;
  /** "foto" o "video". Por defecto, "foto". */
  tipo?: "foto" | "video";
  /** Solo para vídeos: imagen que se ve mientras el vídeo carga. */
  portada?: string;
  /** Giro en grados, entre -4 y 4. Fijo a propósito: si fuera aleatorio daría errores. */
  giro: number;
  /** Cuánto se desplaza con el scroll (efecto profundidad). Entre 16 y 44. */
  parallax: number;
  /** Ancho de la polaroid. Formato CSS clamp(mínimo, tamaño en móvil, máximo). */
  ancho: string;
  /** Proporción de la foto: "3/4" (vertical) o "4/3" (horizontal). */
  ratio: "3/4" | "4/3";
  /** true = se carga de inmediato (sin esperar al scroll). Úsalo solo en las primeras. */
  inmediata?: boolean;
};

/** Una estrofa del poema, con las fotos que la acompañan debajo. */
export type Estrofa = {
  /** Cada línea del array es un verso. */
  versos: string[];
  /** De 0 a 3 fotos o vídeos. Si lo dejas vacío, la estrofa va sola. */
  piezas: Pieza[];
};

export const pareja = {
  ella: "Raquel",
  yo: "Gerson",
  /** Lo primero que se lee, en grande y a mano. */
  saludo: "Para Raquel",
  /** Texto del sobre cerrado. */
  invitacion: "toca para abrirlo",
  /** Lo que aparece al abrir el sobre. */
  dedicatoria:
    "Compartiendo todo esto contigo me di cuenta de una cosa: es contigo con quien quiero estar.",
};

export const poema: Estrofa[] = [
  {
    versos: [
      "Miré al suelo",
      "y vi dos pares de pies",
      "yendo al mismo sitio",
      "sin habernos puesto de acuerdo.",
      "Así empezó todo:",
      "sin esfuerzo.",
    ],
    piezas: [
      {
        src: "/fotos/pasos-1.jpg",
        alt: "Nuestros pies",
        giro: -4,
        parallax: 34,
        ancho: "clamp(130px, 28vw, 189px)",
        ratio: "3/4",
        inmediata: true,
      },
      {
        src: "/fotos/pasos-2.jpg",
        alt: "Nuestros pies otra vez",
        giro: 3,
        parallax: 16,
        ancho: "clamp(150px, 33vw, 218px)",
        ratio: "3/4",
        inmediata: true,
      },
    ],
  },
  {
    versos: [
      "Y aquel mensaje de diciembre,",
      "escrito casi sin pensarlo,",
      "fue el principio de todo esto:",
      "de los viajes, de las fotos,",
      "de querer estar donde tú estés.",
    ],
    piezas: [
      {
        src: "/fotos/muralla.jpg",
        alt: "Raquel frente al mar",
        giro: 3.5,
        parallax: 20,
        ancho: "clamp(145px, 32vw, 210px)",
        ratio: "3/4",
      },
      {
        src: "/fotos/mar.jpg",
        alt: "Los dos frente al mar",
        giro: -3,
        parallax: 40,
        ancho: "clamp(125px, 27vw, 181px)",
        ratio: "3/4",
      },
    ],
  },
  {
    versos: [
      "Hubo días sin plan,",
      "sin nada que contar:",
      "arena, viento,",
      "una gorra torcida.",
      "Y aun así los recuerdo.",
      "Contigo lo normal",
      "se me queda bonito.",
    ],
    piezas: [
      {
        src: "/fotos/playa.jpg",
        alt: "Los dos en la playa",
        giro: -2.5,
        parallax: 26,
        ancho: "clamp(140px, 30vw, 203px)",
        ratio: "3/4",
      },
      {
        src: "/videos/video-1.mp4",
        portada: "/videos/video-1.jpg",
        alt: "Un vídeo nuestro",
        tipo: "video",
        giro: 4,
        parallax: 44,
        ancho: "clamp(120px, 26vw, 174px)",
        ratio: "3/4",
      },
    ],
  },
  {
    versos: [
      "Te besé delante de una piedra",
      "que llevaba siglos ahí,",
      "y pensé que nosotros",
      "también sabemos aguantar.",
    ],
    piezas: [
      {
        src: "/fotos/iglesia.jpg",
        alt: "Un beso",
        giro: 2,
        parallax: 22,
        ancho: "clamp(135px, 29vw, 196px)",
        ratio: "3/4",
      },
      {
        src: "/fotos/mercado.jpg",
        alt: "Los dos juntos",
        giro: -3.5,
        parallax: 38,
        ancho: "clamp(120px, 26vw, 174px)",
        ratio: "3/4",
      },
      {
        src: "/videos/video-2.mp4",
        portada: "/videos/video-2.jpg",
        alt: "Otro vídeo nuestro",
        tipo: "video",
        giro: 3,
        parallax: 30,
        ancho: "clamp(115px, 25vw, 167px)",
        ratio: "3/4",
      },
    ],
  },
  {
    versos: [
      "Me di cuenta tarde,",
      "o puede que justo a tiempo:",
      "no eran los sitios,",
      "eras tú.",
    ],
    piezas: [],
  },
  {
    versos: [
      "Que venga lo que tenga que venir:",
      "lo bueno lo celebramos",
      "y lo difícil lo superamos.",
      "Juntos, siempre juntos.",
    ],
    piezas: [],
  },
];

/** La frase manuscrita grande que cierra el poema. */
export const cierre = "Te amo, Raquel.";

export const proximamente = {
  antetitulo: "Próximamente",
  destino: "Noruega",
  texto:
    "El sitio de la próxima foto ya tiene nombre. Solo falta que me digas que sí.",
  piezas: [
    {
      src: "/fotos/noruega-aurora.jpg",
      alt: "La aurora boreal sobre una cabaña roja",
      giro: -3,
      parallax: 30,
      ancho: "clamp(170px, 50vw, 255px)",
      ratio: "3/4",
      inmediata: true,
    },
    {
      src: "/fotos/noruega-lofoten.jpg",
      alt: "Un pueblo de casas rojas entre montañas",
      giro: 2.5,
      parallax: 18,
      ancho: "clamp(200px, 59vw, 300px)",
      ratio: "4/3",
      inmediata: true,
    },
    {
      src: "/fotos/noruega-iglesia.jpg",
      alt: "Una iglesia de madera noruega",
      giro: -2,
      parallax: 26,
      ancho: "clamp(200px, 59vw, 300px)",
      ratio: "4/3",
      inmediata: true,
    },
  ] satisfies Pieza[],
};

export const final = {
  pregunta: "¿Lo que venga, lo hacemos juntos?",
  boton: "Sí, juntos",
  /** Se escribe letra a letra después de los corazones. */
  mensajeTrasAceptar:
    "Lo que venga lo superaremos, y todo va a salir bien. Juntos.",
  /** Aparece al terminar el mensaje. */
  posdata: "P.D. Ve preparando el abrigo.",
  reiniciar: "Volver a empezar",
  firma: "Gerson",
  /** Cuántos corazones explotan al pulsar el botón. */
  corazones: 150,
};

/** La canción. Déjalo en null si no quieres música. */
export const musica = {
  src: "/musica/cancion.mp3",
  volumen: 0.7,
};

/** Lo que se ve al compartir el enlace por WhatsApp. */
export const meta = {
  titulo: "Para Raquel",
  descripcion:
    "Una web pequeña con nuestros sitios, nuestras fotos y una pregunta al final.",
  imagenAlCompartir: "/fotos/pasos-1.jpg",
};
