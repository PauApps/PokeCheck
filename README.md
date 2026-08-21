# MyPokeLog (mypokelog.app) - Controlador Pokédex Multigeneración

**MyPokeLog** ([mypokelog.app](https://mypokelog.app)) es una aplicación web progresiva (PWA) moderna, modular y sin dependencias externas para llevar el seguimiento visual y estructurado del progreso de captura en todas las ediciones de la saga Pokémon (Generaciones 1 a 9, Leyendas: Z-A y Pokémon Pokopia).

---

## Características Principales

- **Arquitectura Multi-Dex Oficial**: Cada juego cuenta con sus Pokédexes oficiales correspondientes (Regional, expansiones de DLCs y Pokédex Nacional específica de cada juego), con sincronización automática de capturas compartidas entre Pokédexes del mismo juego.
- **Cobertura Completa de Ediciones (Gen 1 a Gen 9 y Especiales)**:
  - **Gen 1 (Kanto)**: Rojo / Azul / Amarillo (151), Rojo Fuego / Verde Hoja (151 Reg / 386 Nat), Let's Go Pikachu / Eevee (153).
  - **Gen 2 (Johto)**: Oro / Plata / Cristal (251), HeartGold / SoulSilver (256 Reg / 493 Nat).
  - **Gen 3 (Hoenn)**: Rubí / Zafiro / Esmeralda (202 Reg / 386 Nat), Rubí Omega / Zafiro Alfa (211 Reg / 721 Nat).
  - **Gen 4 (Sinnoh)**: Diamante / Perla (151 Reg / 493 Nat), Platino (210 Reg / 493 Nat), Diamante Brillante / Perla Reluciente (151 Reg / 493 Nat).
  - **Gen 5 (Teselia / Unova)**: Negro / Blanco (156 Reg / 649 Nat), Negro 2 / Blanco 2 (301 Reg / 649 Nat).
  - **Gen 6 (Kalos)**: X / Y (Kalos Central 153, Costera 153, Montaña 151 / 721 Nat).
  - **Gen 7 (Alola)**: Sol / Luna (302), Ultrasol / Ultraluna (403).
  - **Gen 8 (Galar & DLCs)**: Espada / Escudo (400), DLC 1 Isla de la Armadura (211), DLC 2 Las Nieves de la Corona (210).
  - **Gen 9 (Paldea & DLCs)**: Escarlata / Púrpura (400), DLC 1 La Máscara Turquesa - Norarca (200), DLC 2 El Disco Índigo - Academia Arándano (243).
  - **Leyendas & Especiales**: Pokémon Leyendas: Arceus (Hisui - 242), Pokémon Leyendas: Z-A (Ciudad Luminalia 232 & Hiperespacio 132), Pokémon Pokopia (300).
- **Visión de Progreso y Estadísticas Globales**:
  - Panel activo con cálculo dinámico de hitos próximos y distribución de capturas por tipo elemental.
  - Resumen consolidado global: contador de especies únicas nacionales (1..1025), porcentaje completado global, partidas finalizadas y desglose interactivo por juego.
- **Filtro Avanzado por Tipo (Bottom Sheet)**: Panel táctil con los 18 tipos elementales e iconografía vectorial SVG para filtrado múltiple.
- **Soporte PWA 100% Offline**: Service Worker con precaching estático y estrategia de caché Stale-While-Revalidate para funcionamiento completo sin conexión.
- **Internacionalización Completa (i18n)**: Soporte nativo y conmutador dinámico para 5 idiomas: Español, English, Français, Deutsch e Italiano.
- **Sprites Shiny Globales**: Alternancia global en tiempo real para visualizar sprites normales o variocolor (shiny) en el grid y en los detalles.
- **Ficha Detallada de Pokémon**: Integración con PokéAPI para datos en vivo (descripción, categoría, altura, peso, región y métodos/ubicaciones de obtención) con navegación por teclado (`◀` / `▶` / `Esc`).
- **Exportación, Importación y Backup Global**:
  - Exportación de progreso individual por juego en formato JSON estructurado.
  - Copia de seguridad global completa (`pokedex_db.json`) de todas las ediciones.
  - Restauración e importación directa desde archivo `.json` o texto.
- **Enlaces Compartibles con Compresión BitSet**: Generación de URLs cortas con hash Base64 que codifican el estado de captura exacto sin necesidad de base de datos ni servidor.
- **Landing Pages SEO Pre-renderizadas**: Generación estática para posicionamiento orgánico (`/living-dex/`, `/shiny-tracker/`, `/scarlet-violet-pokedex/`, etc.).

---

## Cómo Ejecutar

1. Clona el repositorio:
   ```bash
   git clone https://github.com/PauApps/PokeCheck.git
   cd PokeCheck
   ```

2. Abre la aplicación:
   - **Opción A (Directa)**: Abre `index.html` en tu navegador.
   - **Opción B (Servidor local)**:
     ```bash
     npm start
     ```
     O ejecuta `iniciar.bat` / `iniciar.ps1` en Windows.

3. Construcción de Landing Pages SEO:
   ```bash
   npm run build:landings
   ```

---

## Estructura del Proyecto

```text
PokeCheck/
├── index.html                   # Punto de entrada de la aplicación web
├── PokéCheck.html               # Alias standalone
├── sw.js                        # Service Worker (PWA Offline v3.0)
├── site.webmanifest             # Manifiesto PWA
├── sitemap.xml                  # Mapa del sitio para SEO
├── robots.txt                   # Directivas de rastreo
├── pokedex_db.json              # Base de datos local inicial
├── css/
│   ├── main.css                 # Variables, reset, layout y temas
│   └── components/
│       ├── controls.css         # Filtros, selectores, botones y navegación
│       ├── grid.css             # Grid responsivo y tarjetas de Pokémon
│       └── modal.css            # Ficha de detalle y modales
├── src/
│   ├── app.js                   # Controlador principal y ciclo de vida
│   ├── data/
│   │   ├── constants.js         # Constantes de tipos, colores y URLs
│   │   ├── dexRegistry.js       # Registro unificado de listas de IDs por Pokédex
│   │   ├── gameConfigs.js       # Configuraciones oficiales de juegos y eras
│   │   ├── landingsData.js      # Datos estáticos para páginas SEO
│   │   ├── pokemonData.js       # Catálogo de 1025 especies de Pokémon
│   │   └── regionalDexes.js     # Arrays oficiales de Pokédexes regionales
│   ├── i18n/
│   │   ├── i18nService.js       # Motor de traducción e interpolación
│   │   └── locales/             # Diccionarios de idioma (es, en, fr, de, it)
│   ├── services/
│   │   ├── pokeapiService.js    # Cliente PokéAPI con caché en memoria
│   │   ├── shareService.js      # Codificación BitSet y Web Share API
│   │   ├── spriteService.js     # Resolución de sprites y CDN fallback
│   │   └── storageService.js    # Persistencia LocalStorage, exportación e importación
│   └── ui/
│       ├── filterSheetUI.js     # Bottom sheet de selección de tipos
│       ├── filterUI.js          # Selectores y filtros auxiliares
│       ├── gridUI.js            # Renderizado del catálogo de tarjetas
│       ├── icons.js             # Biblioteca de iconos vectoriales SVG
│       ├── modalUI.js           # Modal de detalle del Pokémon
│       ├── progressUI.js        # Pantalla de progreso activo y visión global
│       ├── settingsUI.js        # Pantalla de ajustes, juegos y preferencias
│       ├── statsUI.js           # Barra de progreso y contadores de cabecera
│       └── themeUI.js           # Control de tema y modo shiny
└── scripts/
    └── build-landings.js        # Generador de landing pages estáticas para SEO
```

---

## Tecnologías Utilizadas

- **JavaScript Moderno (ES Modules)**: Sin empaquetadores ni dependencias pesadas.
- **CSS Modular con Variables**: Diseño fluido, responsivo y adaptado para móviles y escritorio.
- **Service Workers & Cache Storage API**: Soporte offline y funcionamiento PWA instalable.
- **PokéAPI REST API**: Enriquecimiento en tiempo real de datos de especies y métodos de captura.
- **LocalStorage API**: Persistencia local segura y privada sin recopilación de datos de usuario.

