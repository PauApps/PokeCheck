export default {
  meta: {
    name: "Español",
    code: "es",
    flag: "🇪🇸"
  },
  brand: {
    title: "MyPoke",
    fullName: "MyPokeLog",
    tag: "GEN 1",
    subtitle: "Pokédex Regional · {region} ({gen})",
    nationalSubtitle: "Pokédex Nacional · 1025 Pokémon (Gen 1-9)"
  },
  nav: {
    pokedex: "Pokédex",
    progress: "Progreso",
    settings: "Ajustes"
  },
  stats: {
    badge: "Insignia",
    caught: "CAPTURADOS",
    pending: "PENDIENTES",
    completed: "COMPLETADO",
    progress: "Progreso",
    badges: {
      master: "Maestro Pokémon",
      gold: "Oro (75%)",
      silver: "Plata (50%)",
      bronze: "Bronce (25%)"
    }
  },
  progressView: {
    title: "Tu progreso",
    nextMilestone: "PRÓXIMO HITO",
    remainingText: "Te faltan {count} para alcanzar los {target}.",
    allComplete: "¡Enhorabuena! Has completado el 100% de esta Pokédex.",
    byType: "CAPTURADOS POR TIPO"
  },
  filterSheet: {
    title: "Filtrar por tipo",
    subtitle: "Selecciona uno o varios tipos",
    selectedCount: "{count} seleccionados",
    clear: "Limpiar",
    viewResults: "Ver resultados"
  },
  settingsView: {
    title: "Ajustes",
    genSaga: "GENERACIÓN / SAGA",
    gameEdition: "EDICIÓN / JUEGO",
    preferences: "PREFERENCIAS",
    shinySprites: "Sprites shiny",
    data: "DATOS",
    dangerZone: "ZONA PELIGROSA",
    dangerWarning: "Restablecer marcará todos los Pokémon como pendientes. Esta acción no se puede deshacer.",
    resetBtn: "Restablecer progreso"
  },
  labels: {
    genEra: "1. GENERACIÓN / SAGA",
    game: "2. EDICIÓN / JUEGO",
    dexMode: "3. MODO POKÉDEX",
    searchPlaceholder: "Buscar por nombre o N.º...",
    statusFilter: "Todos",
    caughtOnly: "✓ Capturados",
    missingOnly: "⌛ Pendientes",
    allGens: "Todas las Gen",
    allTypes: "Todos los Tipos",
    completeBadge: "[COMPLETA]",
    noResults: "No se encontraron Pokémon con los filtros seleccionados.",
    specialTag: "ESPECIAL",
    legendsTag: "Leyendas"
  },
  dexModes: {
    regional: "Pokédex Regional",
    national: "Pokédex Nacional"
  },
  buttons: {
    themeDark: "Oscuro",
    themeLight: "Claro",
    shinyToggle: "Sprites Shiny",
    exportGame: "Exportar JSON",
    exportGlobal: "Backup global",
    importData: "Importar datos",
    share: "Compartir",
    bulkToggle: "Marcar Visibles",
    reset: "Restablecer",
    moreInfo: "Más info",
    copy: "Copiar Enlace",
    download: "Descargar Archivo",
    apply: "Aplicar e Importar Datos",
    saveToDex: "Guardar en mi Pokédex",
    closePreview: "Cerrar vista previa"
  },
  card: {
    caught: "CAPTURADO",
    pending: "PENDIENTE",
    nationalSub: "Nat. #{id}",
    toggleTitle: "Haz clic para marcar o desmarcar",
    moreInfo: "Más info",
    capture: "Capturar",
    setPending: "Pendiente"
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
      region: "REGIÓN",
      howToGet: "CÓMO CONSEGUIRLO",
      description: "DESCRIPCIÓN",
      state: "ESTADO",
      height: "Altura",
      weight: "Peso",
      nationalNum: "N.º Nacional",
      baseStats: "Estadísticas Base",
      locationsTitle: "Ubicaciones en {game}",
      methodTitle: "Método de Obtención",
      fallbackText: "Encuentro salvaje, evolución, crianza o evento especial en {game}.",
      loading: "Cargando información...",
      tableZone: "Zona / Ubicación",
      tableEdition: "Edición",
      tableMethod: "Método y %",
      markPending: "Marcar como pendiente",
      markCaught: "Marcar como capturado",
      pendingStatus: "Pendiente",
      caughtStatus: "Capturado",
      seedCategory: "Pokémon Semilla",
      defaultCategory: "Pokémon {type}"
    },
    exportGame: {
      title: "Exportar JSON — {game}",
      subtitle: "Resumen estructurado de tus Pokémon capturados y pendientes en este juego."
    },
    exportGlobal: {
      title: "Backup Global JSON (BBDD Completa)",
      subtitle: "Copia de seguridad completa con el avance registrado en todas las ediciones de juego."
    },
    importModal: {
      title: "Importar Progreso (JSON)",
      subtitle: "Carga datos de una generación o backup global desde un archivo o pegando el código.",
      optionA: "Opción A: Cargar Archivo .json desde tu dispositivo",
      selectFile: "Seleccionar Archivo .json",
      orSeparator: "— O pegando el código JSON directamente —",
      optionB: "Opción B: Pegar Código JSON",
      textareaPlaceholder: "Pega aquí tu código JSON de exportación o backup global..."
    },
    shareModal: {
      title: "Enlace Compartible de Progreso",
      subtitle: "Comparte tu avance de Pokédex con cualquier persona.",
      directLabel: "ENLACE DIRECTO DE TU PROGRESO:",
      disclaimer: "Cualquier persona que abra este enlace podrá visualizar tu avance y cargarlo en su propia Pokédex si lo desea. No requiere cuenta ni servidor."
    }
  },
  sharedBanner: {
    viewing: "Viendo progreso compartido:",
    inGame: "en {game}"
  },
  toasts: {
    caught: "✓ Capturado: {name}",
    pending: "⌛ Registrado como pendiente: {name}",
    gameChanged: "Juego cambiado a: {game}",
    modeChanged: "Modo cambiado a Pokédex {mode}",
    shinyOn: "Sprites Shiny Activados",
    shinyOff: "Sprites Normales Activados",
    bulkCaught: "Pokémon visibles marcados como capturados",
    bulkPending: "Pokémon visibles desmarcados",
    resetConfirmed: "Progreso de {game} reiniciado.",
    shareCopied: "Enlace de progreso copiado al portapapeles.",
    shareSuccess: "Progreso compartido.",
    importSuccess: "{mode} importado: +{count} Pokémon integrados.",
    sharedSaved: "Progreso de {game} guardado en tu Pokédex."
  },
  types: {
    Grass: "Planta", Fire: "Fuego", Water: "Agua", Bug: "Bicho",
    Normal: "Normal", Poison: "Veneno", Electric: "Eléctrico", Ground: "Tierra",
    Fighting: "Lucha", Psychic: "Psíquico", Rock: "Roca", Steel: "Acero",
    Ice: "Hielo", Ghost: "Fantasma", Dragon: "Dragón", Dark: "Siniestro", Fairy: "Hada", Flying: "Volador"
  },
  statsNames: {
    hp: "PS", attack: "Ataque", defense: "Defensa",
    spAttack: "At. Esp", spDefense: "Def. Esp", speed: "Velocidad"
  },
  footer: {
    desc: "Tracker de Pokédex multigeneración por juego y edición (Gen 1 a 9, Leyendas Z-A y Pokopia) con persistencia local, soporte 100% offline PWA, seguimiento regional y nacional, y sprites shiny.",
    sectionsTitle: "SECCIONES & HERRAMIENTAS",
    langTitle: "IDIOMAS & INFO",
    disclaimer: "© PauApps · MyPokeLog es un proyecto independiente sin afiliación con Nintendo, Game Freak ni The Pokémon Company."
  },
  regions: {
    kanto: "Kanto",
    johto: "Johto",
    original_johto: "Johto Original",
    updated_johto: "Johto Actualizada",
    hoenn: "Hoenn",
    sinnoh: "Sinnoh",
    original_sinnoh: "Sinnoh Original",
    extended_sinnoh: "Sinnoh Ampliada",
    unova: "Teselia",
    original_unova: "Teselia Original",
    updated_unova: "Teselia Actualizada",
    kalos: "Kalos",
    kalos_central: "Kalos Central",
    kalos_coastal: "Kalos Costera",
    kalos_mountain: "Kalos Montaña",
    alola: "Alola",
    original_alola: "Alola Original",
    updated_alola: "Alola Actualizada",
    galar: "Galar",
    paldea: "Paldea",
    kitakami: "Norarca",
    blueberry: "Arándano",
    isle_of_armor: "Isla de la Armadura",
    crown_tundra: "Las Nieves de la Corona",
    hisui: "Hisui",
    lumiose: "Luminalia",
    legends_za: "Luminalia",
    hyperspace: "Hiperespacio",
    letsgo_kanto: "Kanto (Let's Go)",
    updated_hoenn: "Hoenn (ROZA)",
    pokopia: "Pokopia"
  },
  categories: {
    fold: "▲ Plegar",
    unfold: "▼ Desplegar"
  },
  eras: {
    gen1: "Gen 1 (Kanto)",
    gen2: "Gen 2 (Johto)",
    gen3: "Gen 3 (Hoenn)",
    gen4: "Gen 4 (Sinnoh)",
    gen5: "Gen 5 (Teselia)",
    gen6: "Gen 6 (Kalos)",
    gen7: "Gen 7 (Alola)",
    gen8: "Gen 8 (Galar & DLCs)",
    gen9: "Gen 9 (Paldea / DLCs)",
    legends_special: "Leyendas & Especiales"
  },
  games: {
    gen9_paldea: {
      name: "Gen 9: Escarlata / Púrpura (Paldea)",
      label: "🔴 Escarlata / Púrpura (Paldea - 400 Reg / 1025 Nat)"
    },
    gen9_kitakami: {
      name: "Gen 9: Escarlata / Púrpura — DLC 1: La máscara turquesa (Norarca)",
      label: "🍃 DLC 1: La máscara turquesa (Norarca - 200 Reg / 1025 Nat)"
    },
    gen9_blueberry: {
      name: "Gen 9: Escarlata / Púrpura — DLC 2: El disco índigo (Academia Arándano)",
      label: "🫐 DLC 2: El disco índigo (Academia Arándano - 243 Reg / 1025 Nat)"
    },
    gen8_galar: {
      name: "Gen 8: Espada / Escudo (Galar)",
      label: "⚔️ Espada / Escudo (Galar - 400 Reg / 898 Nat)"
    },
    gen8_isle_of_armor: {
      name: "Gen 8: Espada / Escudo — DLC 1: Isla de la Armadura",
      label: "🛡️ DLC 1: Isla de la Armadura (211 Reg / 898 Nat)"
    },
    gen8_crown_tundra: {
      name: "Gen 8: Espada / Escudo — DLC 2: Las Nieves de la Corona",
      label: "❄️ DLC 2: Las Nieves de la Corona (210 Reg / 898 Nat)"
    },
    gen7_alola_updated: {
      name: "Gen 7: Ultrasol / Ultramona (Alola Actualizada)",
      label: "☀️ Ultrasol / Ultramona (Alola Actualizada - 403 Reg / 809 Nat)"
    },
    gen7_alola_original: {
      name: "Gen 7: Sol / Luna (Alola Original)",
      label: "🌴 Sol / Luna (Alola Original - 302 Reg / 802 Nat)"
    },
    gen6_kalos: {
      name: "Gen 6: X / Y (Kalos Completa)",
      label: "🏰 X / Y (Kalos - 454 Reg / 721 Nat)"
    },
    gen5_unova_updated: {
      name: "Gen 5: Negro 2 / Blanco 2 (Teselia Actualizada)",
      label: "🏙️ Negro 2 / Blanco 2 (Teselia Actualizada - 301 Reg / 649 Nat)"
    },
    gen5_unova_original: {
      name: "Gen 5: Negro / Blanco (Teselia Original)",
      label: "⬛ Negro / Blanco (Teselia Original - 156 Reg / 649 Nat)"
    },
    gen4_sinnoh_extended: {
      name: "Gen 4: Platino (Sinnoh Ampliada)",
      label: "❄️ Platino (Sinnoh Ampliada - 210 Reg / 493 Nat)"
    },
    gen4_sinnoh_original: {
      name: "Gen 4: Diamante / Perla (Sinnoh Original)",
      label: "💎 Diamante / Perla (Sinnoh Original - 151 Reg / 493 Nat)"
    },
    gen4_bdsp: {
      name: "Gen 4: Diamante Brillante / Perla Reluciente",
      label: "💎 Diamante Brillante / Perla Reluciente (Sinnoh - 151 Reg / 493 Nat)"
    },
    gen3_emerald: {
      name: "Gen 3: Esmeralda / Rubí / Zafiro (Hoenn Original)",
      label: "🟢 Esmeralda / Rubí / Zafiro (Hoenn - 202 Reg / 386 Nat)"
    },
    gen3_roza: {
      name: "Gen 3: Rubí Omega / Zafiro Alfa (Hoenn Actualizada)",
      label: "🔴 ROZA (Hoenn Actualizada - 211 Reg / 721 Nat)"
    },
    gen2_gsc: {
      name: "Gen 2: Oro / Plata / Cristal (Johto Original)",
      label: "🟡 Oro / Plata / Cristal (Johto - 251 Reg / 251 Nat)"
    },
    gen2_hgss: {
      name: "Gen 2: HeartGold / SoulSilver (Johto Actualizada)",
      label: "🌙 HeartGold / SoulSilver (Johto Actualizada - 256 Reg / 493 Nat)"
    },
    gen1_rby: {
      name: "Gen 1: Rojo / Azul / Amarillo (Kanto)",
      label: "🔴 Rojo / Azul / Amarillo (Kanto - 151 Reg / 151 Nat)"
    },
    gen1_leafgreen: {
      name: "Gen 1: Rojo Fuego / Verde Hoja (Kanto)",
      label: "🍃 Rojo Fuego / Verde Hoja (Kanto - 151 Reg / 386 Nat)"
    },
    gen1_letsgo: {
      name: "Gen 1: Let's Go Pikachu / Eevee (Kanto)",
      label: "⚡ Let's Go Pikachu / Eevee (Kanto - 153 Reg / 809 Nat)"
    },
    special_hisui: {
      name: "Pokémon Leyendas: Arceus (Hisui)",
      label: "📜 Pokémon Leyendas: Arceus (Hisui - 242 Reg / 898 Nat)"
    },
    special_legends_za: {
      name: "Pokémon Leyendas: Z-A (Ciudad Luminalia)",
      label: "⚡ Pokémon Leyendas: Z-A (Luminalia - 232 Reg / 1025 Nat)"
    },
    special_pokopia: {
      name: "Pokémon Pokopia (Islas Pokopia)",
      label: "🏝️ Pokémon Pokopia (Pokopia - 300 Reg / 1025 Nat)"
    }
  }
};
