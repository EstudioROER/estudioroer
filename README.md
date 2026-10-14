# Estudio ROER - Landing Page Oficial

Sitio web corporativo y de captación para **Estudio ROER Arquitectura** (especialistas en Regularización de Viviendas bajo Ley 20.898 / Ley del Mono y Permisos DOM) y **Arismendi & Vera Abogados Asociados** (Unidad Jurídica Inmobiliaria).

---

## 📁 Estructura del Repositorio y Regla de Organización

Para mantener el repositorio limpio, ligero y optimizado para producción (GitHub Pages o hosting web), los archivos se dividen estrictamente en dos categorías:

### 1. Archivos en GitHub (Producción Web)
Todo lo que forma parte del sitio web público y funcional:

```
EstudioROER_LandingPage/
│
├── index.html                   # Página principal de Estudio ROER
├── legal.html                   # Sección jurídica / Abogados Arismendi & Vera
├── gracias.html                 # Página de confirmación tras envío de formulario
├── robots.txt                   # Instrucciones para motores de búsqueda (SEO)
├── sitemap.xml                  # Mapa del sitio oficial
├── .gitignore                   # Reglas de exclusión para Git / GitHub
├── README.md                    # Documentación del proyecto y normativas
│
├── css/
│   ├── optik-theme.css          # Estilos principales de la landing page
│   └── legal-theme.css          # Estilos de la página legal
│
├── js/
│   └── main.js                  # Lógica interactiva (menú, cotizador, modales)
│
└── assets/
    ├── images/                  # Imágenes optimizadas para la web (logos, fotografías)
    └── docs/
        └── guia-regularizacion-roer.html  # Guía oficial descargable para clientes
```

---

### 2. Archivos Locales / Offline (Excluidos de GitHub vía `.gitignore`)
Todo el material de marketing no web, piezas gráficas de imprenta, campañas de redes sociales y archivos multimedia pesados se almacenan exclusivamente en la carpeta `_material_offline/`:

```
_material_offline/               # ⚠️ IGNORADO POR GIT - NO SE SUBE A GITHUB
│
├── anuncios_y_redes/            # Campañas Meta Ads, videos e historias de Instagram
│   ├── *.mp4, *.wav             # Videos y pistas de audio pesadas
│   ├── ad_*.jpg, 01_*.jpg       # Creatividades para Feed (1080x1080) y Story (1080x1920)
│   ├── visor_anuncios*.html     # Visores de previsualización offline
│   └── guias_*.md               # Guías estratégicas de WhatsApp Business y Meta Ads
│
├── impresion_y_volantes/        # Material para imprenta física
│   ├── *.pdf                    # Archivos de alta resolución para guillotina
│   ├── volante_*.html           # Plantillas de impresión 4 por hoja
│   └── qr_*.png                 # Códigos QR generados para material impreso
│
└── versiones_anteriores/        # Respaldos de versiones previas de código y estilos
```

---

## 📌 Regla de Oro: Cómo organizar nuevos archivos a medida que avancemos

A medida que se agreguen o modifiquen archivos en el proyecto:

1. **Si es para el sitio web:**
   - Páginas nuevas en la raíz: `nombre_pagina.html`.
   - Hojas de estilo en `css/`.
   - Scripts en `js/`.
   - Imágenes web (optimizadas y comprimidas en formato `.png`, `.jpg`, `.svg` o `.webp`) en `assets/images/`.
   - Documentos web en `assets/docs/`.

2. **Si es material publicitario offline o de imprenta:**
   - Volantes, trípticos o PDFs de imprenta ➔ `_material_offline/impresion_y_volantes/`.
   - Videos (`.mp4`), audios (`.wav`), piezas para reels/stories ➔ `_material_offline/anuncios_y_redes/`.
   - Notas internas, borradores o estrategias ➔ `_material_offline/`.

3. **Cualquier archivo de gran tamaño (.mp4, .wav, .zip, .pdf pesado):**
   - Nunca debe colocarse dentro de carpetas públicas de `assets/` para evitar exceder los límites de GitHub o ralentizar la carga web.

---

## 🚀 Despliegue en GitHub Pages

1. Subir los archivos a la rama `main` en GitHub:
   ```bash
   git add .
   git commit -m "feat: estructura optimizada de landing page"
   git push origin main
   ```
2. En GitHub: ir a **Settings** ➔ **Pages** ➔ Fuente: **Deploy from a branch** ➔ Rama: `main` / `root`.
3. El sitio web quedará activo inmediatamente.
