export default {
  meta: {
    name: "Español",
    code: "es",
    flag: "🇪🇸"
  },
  brand: {
    title: "MyPokeLog",
    tag: "Multigeneración",
    subtitle: "Controlador Pokédex Regional & Nacional (1025 Pokémon) — mypokelog.app"
  },
  stats: {
    badge: "Insignia",
    caught: "Capturados",
    progress: "Progreso",
    badges: {
      master: "Maestro Pokémon",
      gold: "Oro (75%)",
      silver: "Plata (50%)",
      bronze: "Bronce (25%)"
    }
  },
  categories: {
    cat1: "🎮 1. Selección de Generación, Juego & Modo Pokédex",
    cat2: "🔍 2. Buscador & Filtros de Pokémon",
    cat3: "🛠️ 3. Herramientas & Opciones de Datos",
    fold: "▾ Plegar",
    unfold: "▸ Desplegar"
  },
  labels: {
    genEra: "1. GENERACIÓN / SAGA",
    game: "2. EDICIÓN / JUEGO",
    dexMode: "3. MODO DE POKÉDEX",
    searchPlaceholder: "Buscar Pokémon por nombre o N.º...",
    statusFilter: "📊 Todos los estados",
    caughtOnly: "✓ Capturados",
    missingOnly: "⏳ Pendientes",
    allGens: "🌟 Todas las Gens",
    allTypes: "⚡ Todos los tipos",
    completeBadge: "[COMPLETA]"
  },
  dexModes: {
    regional: "📍 Pokédex Regional (Juego)",
    national: "🌐 Pokédex Nacional Global"
  },
  buttons: {
    themeDark: "🌙 Oscuro",
    themeLight: "☀️ Claro",
    shinyToggle: "✨ Sprites Shiny",
    exportGame: "📄 JSON Juego Activo",
    exportGlobal: "🌐 Backup Global (BBDD)",
    importData: "📥 Importar Datos (JSON)",
    share: "🔗 Compartir",
    bulkToggle: "👁️ Marcar Visibles",
    reset: "🔄 Reset",
    moreInfo: "ℹ️ Más Info",
    copy: "📋 Copiar Enlace",
    download: "💾 Descargar Archivo",
    apply: "✅ Aplicar e Importar Datos",
    saveToDex: "📥 Guardar en mi Pokédex",
    closePreview: "❌ Cerrar vista previa"
  },
  card: {
    caught: "✓ CAPTURADO",
    pending: "⏳ PENDIENTE",
    nationalSub: "Nat. #{id}",
    toggleTitle: "Haz clic para marcar/desmarcar capturado"
  },
  confirm: {
    resetGame: "¿Estás seguro de que deseas reiniciar todo el progreso registrado para \"{game}\"? Esta acción no se puede deshacer."
  },
  modals: {
    modalNav: {
      prev: "Anterior",
      next: "Siguiente",
      hint: "Navegar con ◀ ▶"
    },
    detail: {
      height: "Altura",
      weight: "Peso",
      nationalNum: "N.º Nacional",
      baseStats: "Estadísticas Base",
      locationsTitle: "Ubicaciones en {game}",
      methodTitle: "Método de Obtención / Hábitat",
      fallbackText: "Obtención mediante evolución, crianza, hábitats o eventos especiales en {game}.",
      loading: "Cargando información y métodos de obtención...",
      tableZone: "Zona / Ubicación",
      tableEdition: "Edición",
      tableMethod: "Método y %",
      markPending: "❌ Marcar como Pendiente",
      markCaught: "✓ Marcar como Capturado"
    },
    exportGame: {
      title: "Exportación JSON - {game}",
      subtitle: "Resumen de tus Pokémon capturados y pendientes en este juego."
    },
    exportGlobal: {
      title: "Backup Global JSON (BBDD Completa)",
      subtitle: "Copia de seguridad completa con el avance registrado en todas las ediciones de juego."
    },
    importModal: {
      title: "📥 Importar Progreso (JSON)",
      subtitle: "Carga datos de una generación o backup global desde un archivo o pegando el código.",
      optionA: "📁 Opción A: Cargar Archivo .json desde tu dispositivo",
      selectFile: "📂 Seleccionar Archivo .json",
      orSeparator: "— O pegando el código JSON directamente —",
      optionB: "📝 Opción B: Pegar Código JSON",
      textareaPlaceholder: "Pega aquí tu código JSON de exportación o backup global..."
    },
    shareModal: {
      title: "🔗 Enlace Compartible de Progreso",
      subtitle: "Comparte tu avance de Pokédex con cualquier persona.",
      directLabel: "ENLACE DIRECTO DE TU PROGRESO:",
      disclaimer: "💡 Cualquier persona que abra este enlace podrá visualizar tu avance y cargarlo en su propia Pokédex si lo desea. No requiere cuenta ni servidor."
    }
  },
  sharedBanner: {
    viewing: "Viendo progreso compartido:",
    inGame: "en {game}"
  },
  toasts: {
    caught: "✓ Capturado: {name}",
    pending: "⏳ Registrado como pendiente: {name}",
    gameChanged: "🎮 Juego cambiado a: {game}",
    modeChanged: "📍 Modo cambiado a Pokédex {mode}",
    shinyOn: "✨ Sprites Shiny Activados",
    shinyOff: "🖼️ Sprites Normales Activados",
    bulkCaught: "✓ Pokémon visibles marcados como capturados",
    bulkPending: "⏳ Pokémon visibles desmarcados",
    resetConfirmed: "🔄 Progreso de {game} reiniciado.",
    shareCopied: "🔗 Enlace de progreso copiado al portapapeles.",
    shareSuccess: "✨ Progreso compartido.",
    importSuccess: "📥 {mode} importado: +{count} Pokémon integrados.",
    sharedSaved: "✓ Progreso de {game} guardado en tu Pokédex."
  },
  types: {
    Grass: "Planta", Fire: "Fuego", Water: "Agua", Bug: "Bicho",
    Normal: "Normal", Poison: "Veneno", Electric: "Eléctrico", Ground: "Tierra",
    Fighting: "Lucha", Psychic: "Psíquico", Rock: "Roca", Steel: "Acero",
    Ice: "Hielo", Ghost: "Fantasma", Dragon: "Dragón", Dark: "Siniestro", Fairy: "Hada"
  },
  statsNames: {
    hp: "PS", attack: "Ataque", defense: "Defensa",
    spAttack: "At. Esp", spDefense: "Def. Esp", speed: "Velocidad"
  }
};
