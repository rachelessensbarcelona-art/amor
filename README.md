# Para Raquel

Una web de una sola página: un sobre que se abre, un poema con vuestras fotos
y vídeos, las fotos de Noruega como un "próximamente", y al final una pregunta
con un botón que llena la pantalla de corazones.

Está pensada para verse en el móvil.

---

## Índice

1. [Cómo verla en tu ordenador](#1-cómo-verla-en-tu-ordenador)
2. [Cómo cambiar los textos](#2-cómo-cambiar-los-textos)
3. [Cómo cambiar las fotos](#3-cómo-cambiar-las-fotos)
4. [Cómo cambiar la canción](#4-cómo-cambiar-la-canción)
5. [Cómo cambiar los vídeos](#5-cómo-cambiar-los-vídeos)
6. [Cómo subirla a internet y conseguir el enlace](#6-cómo-subirla-a-internet-y-conseguir-el-enlace)
7. [Qué hay dentro (por si algún día te da curiosidad)](#7-qué-hay-dentro)

---

## 1. Cómo verla en tu ordenador

Necesitas tener instalado **Node.js** (descárgalo en <https://nodejs.org>, la
versión que pone "LTS").

Abre la terminal en la carpeta del proyecto y escribe estas dos líneas, una
detrás de otra:

```bash
npm install
npm run dev
```

Cuando termine te dirá algo como `http://localhost:3000`. Abre esa dirección
en el navegador y ahí está la web.

Mientras `npm run dev` esté en marcha, cada vez que guardes un cambio la web se
actualiza sola en el navegador. Para pararlo, pulsa `Ctrl + C` en la terminal.

> **Truco para verla como se verá en el móvil:** en Chrome, pulsa `F12` y luego
> el iconito de móvil que sale arriba a la izquierda del panel.

---

## 2. Cómo cambiar los textos

**Todos** los textos de la web están en un único archivo:

```
src/content/historia.ts
```

No hace falta que toques ningún otro. Ábrelo con cualquier editor de texto
(Bloc de notas vale; el Visual Studio Code es más cómodo) y cambia lo que haya
**entre comillas**. Las comillas tienen que quedarse donde están.

### El poema

Cada estrofa es un bloque. Cada línea del poema es una línea del listado
`versos`:

```ts
{
  versos: [
    "Miré al suelo",
    "y vi dos pares de pies",
    "yendo al mismo sitio",
  ],
  piezas: [ ... aquí van las fotos de esa estrofa ... ],
},
```

Para **añadir un verso**, copia una línea entera (con su coma al final) y
cambia el texto. Para **quitarlo**, borra la línea completa.

Para **añadir una estrofa nueva**, copia un bloque entero desde su `{` hasta su
`},` y pégalo donde quieras. Si no quieres fotos en esa estrofa, déjala así:

```ts
{
  versos: ["Un verso.", "Y otro."],
  piezas: [],
},
```

### El resto de textos

Más abajo en el mismo archivo están, con su nombre y un comentario explicando
cada uno:

| Qué es | Dónde |
| --- | --- |
| "Para Raquel", "toca para abrirlo" y la frase del sobre | `pareja` |
| "Te amo, Raquel." | `cierre` |
| "Próximamente · Noruega" y su frase | `proximamente` |
| La pregunta, el botón, el mensaje final y la posdata | `final` |
| El título y la descripción que se ven al mandar el enlace por WhatsApp | `meta` |

Si quieres **más o menos corazones** al pulsar el botón, cambia el número de
`corazones` dentro de `final` (ahora son 150).

---

## 3. Cómo cambiar las fotos

### Paso 1: mete las fotos originales

Copia las fotos, **tal cual salen del móvil**, en:

```
public/fotos/originales/
```

### Paso 2: encógelas

En la terminal:

```bash
npm run fotos
```

Esto coge todo lo que haya en `originales/`, lo reduce a 1600 píxeles de lado
mayor y lo guarda como `.jpg` en `public/fotos/`. Es importante: una foto
recién sacada del móvil pesa varios megas y haría que la web tardara un montón
en cargar en 4G.

Verás en la terminal cuánto pesaba cada una y cuánto pesa ahora.

### Paso 3: dile a la web que use la foto nueva

En `src/content/historia.ts`, busca la foto que quieras sustituir y cambia el
nombre del archivo:

```ts
{
  src: "/fotos/playa.jpg",        ← el nombre del archivo, con /fotos/ delante
  alt: "Los dos en la playa",     ← descripción (para quien no puede verla)
  giro: -2.5,                     ← lo torcida que se ve la polaroid (de -4 a 4)
  parallax: 26,                   ← cuánto se mueve con el scroll (de 16 a 44)
  ancho: "clamp(140px, 30vw, 203px)",
  ratio: "3/4",                   ← "3/4" si la foto es vertical, "4/3" si es horizontal
},
```

De todo eso, lo único que tienes que cambiar sí o sí es **`src`**, **`alt`** y,
si la foto es horizontal, **`ratio`**. Lo demás es decoración y puedes dejarlo
como está.

> ⚠️ El giro está puesto a mano a propósito (no es aleatorio). Si fuera
> aleatorio, la web daría error al cargar.

---

## 4. Cómo cambiar la canción

Sustituye el archivo:

```
public/musica/cancion.mp3
```

por el tuyo, **con ese mismo nombre**. Ya está.

La música empieza sola cuando se toca el sobre (antes no: los móviles no dejan
que suene nada hasta que la persona toca la pantalla). Sube de volumen poco a
poco durante dos segundos, y hay un botoncito ♪ abajo a la derecha para
quitarla.

Si borras el archivo, el botón de música simplemente no aparece y la web sigue
funcionando.

**Si tu MP3 pesa mucho** (más de 4 MB), conviene aligerarlo. Con
[ffmpeg](https://ffmpeg.org) instalado:

```bash
ffmpeg -i tu-cancion.mp3 -codec:a libmp3lame -b:a 128k public/musica/cancion.mp3
```

---

## 5. Cómo cambiar los vídeos

Los vídeos van en `public/videos/` y se reproducen **sin sonido y en bucle**,
como si fueran una foto que se mueve. No se descargan hasta que aparecen en
pantalla.

Para cambiar uno, sustituye el archivo `public/videos/video-1.mp4` (o el 2) por
el tuyo con el mismo nombre, y genera también su imagen de portada (lo que se
ve mientras el vídeo carga).

Con ffmpeg, las dos órdenes son:

```bash
# Aligerar el vídeo (de varios megas a menos de uno)
ffmpeg -i tu-video.mp4 -vf "scale='min(720,iw)':-2" -c:v libx264 -crf 28 \
  -pix_fmt yuv420p -movflags +faststart -an public/videos/video-1.mp4

# Sacar el primer fotograma como portada
ffmpeg -i public/videos/video-1.mp4 -frames:v 1 -q:v 4 public/videos/video-1.jpg
```

---

## 6. Cómo subirla a internet y conseguir el enlace

Gratis y en unos diez minutos, con Vercel.

### Paso 1: sube el proyecto a GitHub

Si aún no está, en la terminal dentro de la carpeta del proyecto:

```bash
git add .
git commit -m "Mi web"
git push
```

### Paso 2: conecta Vercel

1. Entra en <https://vercel.com> y pulsa **Sign Up**. Elige **Continue with
   GitHub** (así no tienes que crear otra cuenta).
2. Ya dentro, pulsa **Add New…** → **Project**.
3. Te saldrá la lista de tus repositorios de GitHub. Busca el de esta web y
   pulsa **Import**.
4. No cambies nada de lo que te propone: Vercel reconoce Next.js solo.
5. Pulsa **Deploy** y espera. Tarda un par de minutos.

### Paso 3: coge el enlace

Cuando termine, Vercel te enseña la web y un enlace del estilo:

```
https://el-nombre-de-tu-proyecto.vercel.app
```

**Ese es el enlace que le mandas a Raquel por WhatsApp.**

### Paso 4 (opcional pero recomendado): que la vista previa de WhatsApp salga bien

Para que al pegar el enlace en WhatsApp salga una foto en lugar de un cuadro
vacío:

1. En Vercel, entra en tu proyecto → **Settings** → **Environment Variables**.
2. Crea una variable:
   - **Name:** `NEXT_PUBLIC_SITE_URL`
   - **Value:** tu enlace completo, por ejemplo
     `https://el-nombre-de-tu-proyecto.vercel.app`
3. Ve a **Deployments**, pulsa los tres puntitos del último despliegue y elige
   **Redeploy**.

> La web lleva puesto `noindex`: Google no la va a encontrar ni a mostrar en los
> resultados de búsqueda. Solo llega quien tenga el enlace.

### Y si luego cambias algo

Cada vez que hagas `git push`, Vercel vuelve a publicar la web sola. El enlace
sigue siendo el mismo.

---

## 7. Qué hay dentro

Por si algún día quieres trastear:

```
src/
  content/historia.ts      ← TODO el contenido (lo único que necesitas tocar)
  app/
    layout.tsx             ← tipografías, título, vista previa de WhatsApp
    page.tsx               ← la página
    globals.css            ← colores y tamaños de letra
    icon.svg               ← el corazón de la pestaña del navegador
  components/
    Experiencia.tsx        ← junta todas las piezas
    Sobre.tsx              ← el sobre que se abre
    HiloRojo.tsx           ← el hilo rojo que se dibuja con el scroll
    Poema.tsx / Estrofa.tsx← el poema
    Polaroid.tsx           ← cada foto o vídeo con su borde blanco
    Proximamente.tsx       ← la sección de Noruega
    PreguntaFinal.tsx      ← la pregunta, el botón y el mensaje final
    LluviaCorazones.tsx    ← los corazones
    Musica.tsx             ← el reproductor
    ScrollSuave.tsx        ← el scroll suave
scripts/fotos.mjs          ← el `npm run fotos`
public/                    ← fotos, vídeos y música
diseno-original/           ← el prototipo de Claude Design del que salió esto
```

**Órdenes disponibles**

| Orden | Qué hace |
| --- | --- |
| `npm run dev` | Arranca la web en tu ordenador para verla |
| `npm run fotos` | Encoge las fotos de `public/fotos/originales/` |
| `npm run build` | Comprueba que todo está bien antes de publicar |
| `npm run start` | Arranca la versión ya publicada, en tu ordenador |

**Los colores**, por si quieres cambiarlos, están arriba del todo de
`src/app/globals.css`:

| | |
| --- | --- |
| Fondo rosa empolvado | `#F4E4E1` |
| Texto vino oscuro | `#3A1C28` |
| Hilo y corazones | `#D7263D` |
| Fondo de la pregunta final | `#2A1018` |

**Detalles pensados aparte**, por si te los preguntas:

- Si alguien tiene activado en su móvil "reducir movimiento", la web se
  comporta sola: sin parallax, el hilo sale dibujado entero y caen menos
  corazones.
- Al pulsar el botón, el móvil vibra un momento (donde el navegador lo permite).
- Las fotos no se descargan hasta que hacen falta, menos las primeras y las de
  Noruega, que van siempre por delante.
