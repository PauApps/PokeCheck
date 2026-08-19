export default {
  meta: {
    name: "Italiano",
    code: "it",
    flag: "🇮🇹"
  },
  brand: {
    title: "MyPokeLog",
    tag: "Multi-Generazione",
    subtitle: "Tracciatore Pokédex Regionale & Nazionale (1025 Pokémon) — mypokelog.app"
  },
  stats: {
    badge: "Distintivo",
    caught: "Catturati",
    progress: "Progresso",
    badges: {
      master: "Maestro Pokémon",
      gold: "Oro (75%)",
      silver: "Argento (50%)",
      bronze: "Bronzo (25%)"
    }
  },
  categories: {
    cat1: "🎮 1. Selezione Generazione, Gioco & Modalità Pokédex",
    cat2: "🔍 2. Ricerca & Filtri Pokémon",
    cat3: "🛠️ 3. Strumenti & Opzioni Dati",
    fold: "▾ Riduci",
    unfold: "▸ Espandi"
  },
  labels: {
    genEra: "1. GENERAZIONE / SAGA",
    game: "2. EDIZIONE / GIOCO",
    dexMode: "3. MODALITÀ POKÉDEX",
    searchPlaceholder: "Cerca Pokémon per nome o N°...",
    statusFilter: "📊 Tutti gli stati",
    caughtOnly: "✓ Catturati",
    missingOnly: "⏳ Mancanti",
    allGens: "🌟 Tutte le Gen",
    allTypes: "⚡ Tutti i tipi",
    completeBadge: "[COMPLETO]"
  },
  dexModes: {
    regional: "📍 Pokédex Regionale (Gioco)",
    national: "🌐 Pokédex Nazionale Globale"
  },
  buttons: {
    themeDark: "🌙 Scuro",
    themeLight: "☀️ Chiaro",
    shinyToggle: "✨ Sprite Cromatici",
    exportGame: "📄 JSON Gioco Attivo",
    exportGlobal: "🌐 Backup Globale (DB)",
    importData: "📥 Importa Dati (JSON)",
    share: "🔗 Condividi",
    bulkToggle: "👁️ Seleziona Visibili",
    reset: "🔄 Ripristina",
    moreInfo: "ℹ️ Più Info",
    copy: "📋 Copia Link",
    download: "💾 Scarica File",
    apply: "✅ Applica & Importa",
    saveToDex: "📥 Salva nel mio Pokédex",
    closePreview: "❌ Chiudi Anteprima"
  },
  card: {
    caught: "✓ CATTURATO",
    pending: "⏳ MANCANTE",
    nationalSub: "Nat. #{id}",
    toggleTitle: "Clicca per contrassegnare come catturato / mancante"
  },
  confirm: {
    resetGame: "Sei sicuro di voler ripristinare tutti i progressi per \"{game}\"? Questa azione non può essere annullata."
  },
  modals: {
    modalNav: {
      prev: "Precedente",
      next: "Successivo",
      hint: "Naviga con ◀ ▶"
    },
    detail: {
      height: "Altezza",
      weight: "Peso",
      nationalNum: "N° Nazionale",
      baseStats: "Statistiche di Base",
      locationsTitle: "Posizioni in {game}",
      methodTitle: "Metodo di Ottenimento / Habitat",
      fallbackText: "Ottenibile tramite evoluzione, allevamento, habitat selvatici o eventi speciali in {game}.",
      loading: "Caricamento dettagli e metodi di ottenimento...",
      tableZone: "Luogo / Zona",
      tableEdition: "Edizione",
      tableMethod: "Metodo e %",
      markPending: "❌ Segna come Mancante",
      markCaught: "✓ Segna come Catturato"
    },
    exportGame: {
      title: "Esportazione JSON - {game}",
      subtitle: "Riepilogo dei Pokémon catturati e mancanti in questo gioco."
    },
    exportGlobal: {
      title: "Backup Globale JSON (DB Completo)",
      subtitle: "Backup completo contenente i dati registrati su tutte le edizioni."
    },
    importModal: {
      title: "📥 Importa Progresso (JSON)",
      subtitle: "Carica dati di una generazione o backup globale da file o incollando il codice.",
      optionA: "📁 Opzione A: Carica File .json dal dispositivo",
      selectFile: "📂 Seleziona File .json",
      orSeparator: "— OPPURE incolla il codice JSON direttamente —",
      optionB: "📝 Opzione B: Incolla Codice JSON",
      textareaPlaceholder: "Incolla qui il tuo codice JSON di esportazione..."
    },
    shareModal: {
      title: "🔗 Link di Progresso Condivisibile",
      subtitle: "Condividi i tuoi progressi nel Pokédex con chiunque.",
      directLabel: "LINK DIRETTO AL TUO PROGRESSO:",
      disclaimer: "💡 Chiunque apra questo link vedrà i tuoi progressi e potrà caricarli nel proprio Pokédex. Nessun account o server richiesto."
    }
  },
  sharedBanner: {
    viewing: "Visualizzazione progresso condiviso:",
    inGame: "in {game}"
  },
  toasts: {
    caught: "✓ Catturato: {name}",
    pending: "⏳ Segnato come mancante: {name}",
    gameChanged: "🎮 Gioco cambiato in: {game}",
    modeChanged: "📍 Modalità cambiata in Pokédex {mode}",
    shinyOn: "✨ Sprite Cromatici Attivati",
    shinyOff: "🖼️ Sprite Normali Attivati",
    bulkCaught: "✓ Pokémon visibili segnati come catturati",
    bulkPending: "⏳ Pokémon visibili deselezionati",
    resetConfirmed: "🔄 Progresso per {game} ripristinato.",
    shareCopied: "🔗 Link di progresso copiato negli appunti.",
    shareSuccess: "✨ Progresso condiviso.",
    importSuccess: "📥 {mode} importato: +{count} Pokémon integrati.",
    sharedSaved: "✓ Progresso per {game} salvato nel tuo Pokédex."
  },
  types: {
    Grass: "Erba", Fire: "Fuoco", Water: "Acqua", Bug: "Coleottero",
    Normal: "Normale", Poison: "Veleno", Electric: "Elettro", Ground: "Terra",
    Fighting: "Lotta", Psychic: "Psico", Rock: "Roccia", Steel: "Acciaio",
    Ice: "Ghiaccio", Ghost: "Spettro", Dragon: "Drago", Dark: "Buio", Fairy: "Folletto"
  },
  statsNames: {
    hp: "PS", attack: "Attacco", defense: "Difesa",
    spAttack: "Att. Sp.", spDefense: "Dif. Sp.", speed: "Velocità"
  }
};
