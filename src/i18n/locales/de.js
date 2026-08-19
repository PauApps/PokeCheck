export default {
  meta: {
    name: "Deutsch",
    code: "de",
    flag: "🇩🇪"
  },
  brand: {
    title: "MyPokeLog",
    tag: "Multi-Generation",
    subtitle: "Regional & National Pokédex Tracker (1025 Pokémon) — mypokelog.app"
  },
  stats: {
    badge: "Abzeichen",
    caught: "Gefangen",
    progress: "Fortschritt",
    badges: {
      master: "Pokédex Meister",
      gold: "Gold (75%)",
      silver: "Silber (50%)",
      bronze: "Bronze (25%)"
    }
  },
  categories: {
    cat1: "🎮 1. Generation, Spiel & Pokédex-Modus",
    cat2: "🔍 2. Suche & Pokémon-Filter",
    cat3: "🛠️ 3. Werkzeuge & Datenoptionen",
    fold: "▾ Einklappen",
    unfold: "▸ Ausklappen"
  },
  labels: {
    genEra: "1. GENERATION / SAGA",
    game: "2. EDITION / SPIEL",
    dexMode: "3. POKÉDEX-MODUS",
    searchPlaceholder: "Pokémon nach Name oder Nr. suchen...",
    statusFilter: "📊 Alle Zustände",
    caughtOnly: "✓ Gefangen",
    missingOnly: "⏳ Fehlend",
    allGens: "🌟 Alle Gen",
    allTypes: "⚡ Alle Typen",
    completeBadge: "[KOMPLETT]"
  },
  dexModes: {
    regional: "📍 Regionaler Pokédex (Spiel)",
    national: "🌐 Globaler Nationaler Pokédex"
  },
  buttons: {
    themeDark: "🌙 Dunkel",
    themeLight: "☀️ Hell",
    shinyToggle: "✨ Shiny Sprites",
    exportGame: "📄 Aktives Spiel JSON",
    exportGlobal: "🌐 Globales Backup (DB)",
    importData: "📥 Daten importieren (JSON)",
    share: "🔗 Teilen",
    bulkToggle: "👁️ Sichtbare umschalten",
    reset: "🔄 Zurücksetzen",
    moreInfo: "ℹ️ Mehr Info",
    copy: "📋 Link kopieren",
    download: "💾 Datei herunterladen",
    apply: "✅ Übernehmen & Importieren",
    saveToDex: "📥 In meinem Pokédex speichern",
    closePreview: "❌ Vorschau schließen"
  },
  card: {
    caught: "✓ GEFANGEN",
    pending: "⏳ FEHLEND",
    nationalSub: "Nat. #{id}",
    toggleTitle: "Klicken, um als gefangen / fehlend umzuschalten"
  },
  confirm: {
    resetGame: "Sind Sie sicher, dass Sie den gesamten Fortschritt für \"{game}\" zurücksetzen möchten? Dies kann nicht rückgängig gemacht werden."
  },
  modals: {
    modalNav: {
      prev: "Vorheriger",
      next: "Nächster",
      hint: "Navigieren mit ◀ ▶"
    },
    detail: {
      height: "Größe",
      weight: "Gewicht",
      nationalNum: "National-Nr.",
      baseStats: "Basiswerte",
      locationsTitle: "Fundorte in {game}",
      methodTitle: "Fangmethode / Lebensraum",
      fallbackText: "Erhältlich durch Entwicklung, Zucht, wilde Habitate oder spezielle Events in {game}.",
      loading: "Lade Details und Fangmethoden...",
      tableZone: "Ort / Zone",
      tableEdition: "Edition",
      tableMethod: "Methode & %",
      markPending: "❌ Als fehlend markieren",
      markCaught: "✓ Als gefangen markieren"
    },
    exportGame: {
      title: "JSON-Export - {game}",
      subtitle: "Zusammenfassung der gefangenen und fehlenden Pokémon in diesem Spiel."
    },
    exportGlobal: {
      title: "Globales JSON-Backup (Vollständige DB)",
      subtitle: "Vollständiges Backup mit allen aufgezeichneten Spieldaten."
    },
    importModal: {
      title: "📥 Fortschritt importieren (JSON)",
      subtitle: "Laden Sie Generationsdaten oder globales Backup aus einer Datei oder durch Einfügen des Codes.",
      optionA: "📁 Option A: .json Datei von Ihrem Gerät laden",
      selectFile: "📂 .json Datei auswählen",
      orSeparator: "— ODER JSON-Code direkt einfügen —",
      optionB: "📝 Option B: JSON-Code einfügen",
      textareaPlaceholder: "Fügen Sie hier Ihren Export- oder Backup-JSON-Code ein..."
    },
    shareModal: {
      title: "🔗 Teilbarer Fortschritts-Link",
      subtitle: "Teilen Sie Ihren Pokédex-Fortschritt mit jedem.",
      directLabel: "DIREKTER LINK ZU IHREM FORTSCHRITT:",
      disclaimer: "💡 Jeder, der diesen Link öffnet, kann Ihren Fortschritt sehen und in seinen Pokédex laden. Kein Konto erforderlich."
    }
  },
  sharedBanner: {
    viewing: "Geteilter Fortschritt wird angezeigt:",
    inGame: "in {game}"
  },
  toasts: {
    caught: "✓ Gefangen: {name}",
    pending: "⏳ Als fehlend markiert: {name}",
    gameChanged: "🎮 Spiel gewechselt zu: {game}",
    modeChanged: "📍 Modus gewechselt zu {mode} Pokédex",
    shinyOn: "✨ Shiny Sprites aktiviert",
    shinyOff: "🖼️ Normale Sprites aktiviert",
    bulkCaught: "✓ Sichtbare Pokémon als gefangen markiert",
    bulkPending: "⏳ Sichtbare Pokémon abgewählt",
    resetConfirmed: "🔄 Fortschritt für {game} zurückgesetzt.",
    shareCopied: "🔗 Fortschritts-Link in Zwischenablage kopiert.",
    shareSuccess: "✨ Fortschritt geteilt.",
    importSuccess: "📥 {mode} importiert: +{count} Pokémon hinzugefügt.",
    sharedSaved: "✓ Fortschritt für {game} in Ihrem Pokédex gespeichert."
  },
  types: {
    Grass: "Pflanze", Fire: "Feuer", Water: "Wasser", Bug: "Käfer",
    Normal: "Normal", Poison: "Gift", Electric: "Elektro", Ground: "Boden",
    Fighting: "Kampf", Psychic: "Psycho", Rock: "Gestein", Steel: "Stahl",
    Ice: "Eis", Ghost: "Geist", Dragon: "Drache", Dark: "Unlicht", Fairy: "Fee"
  },
  statsNames: {
    hp: "KP", attack: "Angriff", defense: "Verteidigung",
    spAttack: "Sp.-Ang.", spDefense: "Sp.-Vert.", speed: "Initiative"
  }
};
