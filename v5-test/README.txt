README — Proyecto “Cambio Climático” (Versión 1)
==================================================

Propósito
---------
Sitio web estático que reúne evidencias y visualizaciones sobre cambio climático, con estructura clara y foco en datos contrastados (OWID, WMO, NASA, Copernicus, IEA, etc.).

Estructura de carpetas (producción)
-----------------------------------
public_html/
├─ index.html                   # Menú principal / aterrizaje
├─ paginaX.html                 # Páginas de primer nivel
├─ paginaXY.html                # Subpáginas (2º nivel)
├─ paginaXYZ.html               # Subpáginas (3º nivel)
├─ assets/
│   ├─ css/
│   │   ├─ base.css            # Hoja base común (tokens + componentes)
│   │   └─ style.css           # (Opcional) Hoja con ajustes finales V1
│   ├─ img/                    # Imágenes optimizadas (kebab-case, sin espacios)
│   └─ js/                     # (si fuera necesario, mínimo indispensable)
├─ dev/                         # Prototipos (misma convención de nombres)
└─ status.html                  # Panel navegable de estado Prod/Dev

Convenciones de nombres
-----------------------
• Páginas:  pagina1.html, pagina11.html, pagina12.html, pagina321.html, etc.
• Imágenes: kebab-case, sin espacios ni acentos (p. ej., arctic-sea-ice-extent-2000-2024.png).
• Hojas CSS: base.css (común), style.css (homogeneización final V1).

Flujo de trabajo Prod / Dev
---------------------------
1) Prototipo → subir a /dev/ con el mismo nombre del archivo final (p. ej., /dev/pagina13.html).
2) Producción → cuando valide, copiar a la raíz (public_html/).
3) status.html → lista todas las páginas con enlaces Prod/Dev para ver de un vistazo.

Cómo añadir una nueva página
----------------------------
1) Copia la mini-plantilla HTML y edita lo necesario (título, metadescripción, contenido):
   - Incluye en <head>:
     <link rel="stylesheet" href="assets/css/base.css?v=1">
   - Usa clases comunes: .container, .grid, .card, .pill, .kpi, .meta
2) Inserta gráficos (OWID/WMO/etc.) con <iframe>:
   - AÑADE loading="lazy"
   - Incluye debajo un enlace alternativo “ver en fuente”
3) Añade línea de “Última actualización” y la fuente:
   <p class="meta">Última actualización: YYYY-MM-DD • Fuente: OWID/WMO/…</p>
4) Enlaces externos:
   target="_blank" rel="noopener"
5) Imágenes:
   - Siempre con alt descriptivo
   - Optimiza el peso antes de subir (PNG/JPG “sin pérdida visible”)
6) Enlaza la nueva página desde su “padre” (menú o índice correspondiente).

Cómo insertar gráficos de OWID / WMO / otros
--------------------------------------------
• OWID: copia el <iframe> desde la vista “Embed”. Ejemplo:
  <iframe loading="lazy" src="https://ourworldindata.org/grapher/sea-level?tab=chart"
          title="Evolución del nivel del mar"></iframe>
  <p class="small">Si no se carga: <a href="https://ourworldindata.org/grapher/sea-level?tab=chart" target="_blank" rel="noopener">ver en fuente</a>.</p>

• WMO / NASA / Copernicus / IEA: sigue el mismo patrón. Si no hay <iframe> oficial, enlaza la página de la fuente y usa un gráfico estático optimizado en /assets/img/.

Definición de Listo (DoD) V1
----------------------------
Una página está “cerrada” cuando:
1) Usa assets/css/base.css y NO tiene CSS inline.
2) Tiene <title> único y <meta name="description">.
3) Todas las imágenes tienen alt; iframes con loading="lazy".
4) Enlaces externos con target="_blank" rel="noopener".
5) Incluye “Última actualización” + fuente.
6) Jerarquía de encabezados correcta (una sola <h1>).
7) No hay 404 en imágenes/enlaces internos.
8) Revisión visual correcta (contraste, desbordes, responsive).

Accesibilidad y UX (mínimos)
----------------------------
• alt descriptivo y suficiente contraste.
• :focus visible (lo aporta base.css).
• Iconos con aria-hidden="true" solo si hay texto accesible adjunto.

Rendimiento básico
------------------
• Comprimir PNG/JPG (sin pérdida visible).
• Quitar CSS/JS no usados.
• (Opcional) Minificar CSS al final del cierre V1.

SEO mínimo
----------
• <title> y <meta name="description"> por página.
• Enlaces internos entre páginas (breadcrumb simple opcional).

Hosting y limpieza
------------------
• Eliminar archivos de prueba/antiguos.
• Verificar rutas/permiso de assets/.
• Vaciar caché (Hostinger/CDN) tras despliegues.

Backups rápidos
---------------
• Antes del cierre V1: copiar todos los HTML a /_backup-V1-preCierre/.
• Exportar status.html y checklist.csv como referencia.

Créditos y fuentes
------------------
• Datos y gráficos: OWID, WMO, NASA, Copernicus, IEA, etc. (citar en cada página).
• Autoría / edición: (tu nombre o el de tu equipo).

— Fin — 
