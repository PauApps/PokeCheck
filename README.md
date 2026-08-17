# ⚡ PokéCheck - Controlador Pokédex Multigeneración

**PokéCheck** es una aplicación web standalone moderna, fluida y sin dependencias para llevar un seguimiento visual y estructurado del progreso de captura en todas las ediciones de la saga Pokémon (Generaciones 1 a 9, Leyendas: Z-A y Pokémon Pokopia).

![PokéCheck Icon](pokeball.ico)

---

## ✨ Características Principales

- 🌐 **100% Standalone (Sin Python ni servidor local)**: Funciona directamente en cualquier navegador web haciendo doble clic sobre `index.html` o `PokéCheck.lnk`.
- 🕹️ **Soporte para 13 Ediciones de Juego**:
  - 🔴 **Gen 9**: Escarlata / Púrpura (Paldea - 400 Reg / 1025 Nat)
  - ⚡ **Leyendas: Z-A**: Ciudad Luminalia (454 Reg / 1025 Nat)
  - 🏝️ **Pokémon Pokopia**: Islas Pokopia (300 Reg / 1025 Nat)
  - ⚔️ **Gen 8**: Espada / Escudo (Galar - 400 Reg / 898 Nat)
  - 📜 **Gen 8**: Leyendas Arceus (Hisui - 242 Reg / 898 Nat)
  - ☀️ **Gen 7**: Sol / Luna / Ultrasol (Alola - 403 Reg / 809 Nat)
  - 🇫🇷 **Gen 6**: X / Y / ROZA (Kalos - 454 Reg / 721 Nat)
  - 🏙️ **Gen 5**: Negro / Blanco / N2B2 (Teselia - 301 Reg / 649 Nat)
  - ❄️ **Gen 4**: Diamante / Perla / HGSS (Sinnoh - 210 Reg / 493 Nat)
  - 🟢 **Gen 3**: Verde Hoja / Rojo Fuego (Kanto - 151 Reg / 386 Nat)
  - 🟢 **Gen 3**: Esmeralda / Rubí / Zafiro (Hoenn - 211 Reg / 386 Nat)
  - 🟡 **Gen 2**: Oro / Plata / Cristal (Johto - 256 Reg / 251 Nat)
  - 🔴 **Gen 1**: Rojo / Azul / Amarillo (Kanto - 151 Reg / 151 Nat)
- 📍 **Modo Pokédex Regional vs. Nacional**: Alterna con un clic entre el orden numérico oficial de la región correspondiente o la Pokédex Nacional global (1-1025).
- 🖼️ **Multi-CDN de Sprites de Alta Velocidad**: Sistema en cascada con jsDelivr como CDN primario para evitar bloqueos y tiempos de carga.
- ⌨️ **Ficha Modal con Navegación por Teclado**: Consulta métodos de obtención en vivo desde PokéAPI y navega con las flechas (`◀` / `▶`) o `Esc`.
- 💾 **Persistencia BBDD JSON**: Guarda automáticamente el progreso en `LocalStorage` y permite descargar o importar `pokedex_db.json` para mantener tu avance entre ordenadores o sincronizarlo en GitHub.
- ✨ **Mode Sprites Shiny Global**: Alterna con un solo clic la visualización de todos los Pokémon en versión Shiny tanto en el grid como en la ficha modal.
- 🏷️ **Filtros Avanzados por Generación y Tipos**: Filtra instantáneamente por Generación (Gen 1 a Gen 9), estado de captura o tipo de Pokémon.
- 📄 **Exportador de Datos JSON**: Descarga o copia un resumen completo en JSON con el progreso actual, capturados e id de Pokémon pendientes.

---

## 🚀 Cómo Ejecutar

1. Clona o descarga este repositorio:
   ```bash
   git clone https://github.com/PauApps/PokeCheck.git
   ```
2. Haz doble clic sobre **`PokéCheck.lnk`** o **`index.html`** para abrir la aplicación directamente en tu navegador habitual.

---

## 🛠️ Estructura del Proyecto

- `index.html` / `PokéCheck.html`: Aplicación web completa en archivo único.
- `pokedex_db.json`: Base de datos de persistencia en formato JSON.
- `pokeball.ico`: Icono ejecutable de la Pokéball.
- `iniciar.bat` / `iniciar.ps1`: Llançadors ràpids per a Windows.
- `PokéCheck.lnk`: Acceso directo con icono personalizado.
