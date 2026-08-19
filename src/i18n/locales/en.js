export default {
  meta: {
    name: "English",
    code: "en",
    flag: "🇬🇧"
  },
  brand: {
    title: "MyPokeLog",
    tag: "Multi-Generation",
    subtitle: "Regional & National Pokédex Tracker (1025 Pokémon) — mypokelog.app"
  },
  stats: {
    badge: "Badge",
    caught: "Caught",
    progress: "Progress",
    badges: {
      master: "Pokédex Master",
      gold: "Gold (75%)",
      silver: "Silver (50%)",
      bronze: "Bronze (25%)"
    }
  },
  categories: {
    cat1: "🎮 1. Generation, Game & Pokédex Mode",
    cat2: "🔍 2. Search & Pokémon Filters",
    cat3: "🛠️ 3. Tools & Data Options",
    fold: "▾ Collapse",
    unfold: "▸ Expand"
  },
  labels: {
    genEra: "1. GENERATION / SAGA",
    game: "2. EDITION / GAME",
    dexMode: "3. POKÉDEX MODE",
    searchPlaceholder: "Search Pokémon by name or No....",
    statusFilter: "📊 All States",
    caughtOnly: "✓ Caught",
    missingOnly: "⏳ Missing",
    allGens: "🌟 All Gens",
    allTypes: "⚡ All Types",
    completeBadge: "[COMPLETE]"
  },
  dexModes: {
    regional: "📍 Regional Pokédex (Game)",
    national: "🌐 Global National Pokédex"
  },
  buttons: {
    themeDark: "🌙 Dark",
    themeLight: "☀️ Light",
    shinyToggle: "✨ Shiny Sprites",
    exportGame: "📄 Active Game JSON",
    exportGlobal: "🌐 Global Backup (DB)",
    importData: "📥 Import Data (JSON)",
    share: "🔗 Share",
    bulkToggle: "👁️ Toggle Visible",
    reset: "🔄 Reset",
    moreInfo: "ℹ️ More Info",
    copy: "📋 Copy Link",
    download: "💾 Download File",
    apply: "✅ Apply & Import Data",
    saveToDex: "📥 Save to My Pokédex",
    closePreview: "❌ Close Preview"
  },
  card: {
    caught: "✓ CAUGHT",
    pending: "⏳ MISSING",
    nationalSub: "Nat. #{id}",
    toggleTitle: "Click to toggle caught / missing"
  },
  confirm: {
    resetGame: "Are you sure you want to reset all progress for \"{game}\"? This cannot be undone."
  },
  modals: {
    modalNav: {
      prev: "Previous",
      next: "Next",
      hint: "Navigate with ◀ ▶"
    },
    detail: {
      height: "Height",
      weight: "Weight",
      nationalNum: "National No.",
      baseStats: "Base Stats",
      locationsTitle: "Locations in {game}",
      methodTitle: "Obtain Method / Habitat",
      fallbackText: "Obtainable via evolution, breeding, wild habitats, or special events in {game}.",
      loading: "Loading details and encounter methods...",
      tableZone: "Zone / Location",
      tableEdition: "Edition",
      tableMethod: "Method & %",
      markPending: "❌ Mark as Missing",
      markCaught: "✓ Mark as Caught"
    },
    exportGame: {
      title: "JSON Export - {game}",
      subtitle: "Summary of caught and missing Pokémon in this game."
    },
    exportGlobal: {
      title: "Global JSON Backup (Complete DB)",
      subtitle: "Full backup containing progress recorded across all game editions."
    },
    importModal: {
      title: "📥 Import Progress (JSON)",
      subtitle: "Load generation data or global backup from a file or paste raw JSON code.",
      optionA: "📁 Option A: Load .json File from your device",
      selectFile: "📂 Select .json File",
      orSeparator: "— OR paste JSON code directly —",
      optionB: "📝 Option B: Paste JSON Code",
      textareaPlaceholder: "Paste your export or global backup JSON code here..."
    },
    shareModal: {
      title: "🔗 Shareable Progress Link",
      subtitle: "Share your Pokédex progress with anyone.",
      directLabel: "DIRECT LINK TO YOUR PROGRESS:",
      disclaimer: "💡 Anyone opening this link will see your progress and can load it into their Pokédex. No account or server required."
    }
  },
  sharedBanner: {
    viewing: "Viewing shared progress:",
    inGame: "in {game}"
  },
  toasts: {
    caught: "✓ Caught: {name}",
    pending: "⏳ Marked as missing: {name}",
    gameChanged: "🎮 Game switched to: {game}",
    modeChanged: "📍 Mode switched to {mode} Pokédex",
    shinyOn: "✨ Shiny Sprites Enabled",
    shinyOff: "🖼️ Normal Sprites Enabled",
    bulkCaught: "✓ Visible Pokémon marked as caught",
    bulkPending: "⏳ Visible Pokémon unmarked",
    resetConfirmed: "🔄 Progress for {game} reset.",
    shareCopied: "🔗 Progress link copied to clipboard.",
    shareSuccess: "✨ Progress shared.",
    importSuccess: "📥 {mode} imported: +{count} Pokémon merged.",
    sharedSaved: "✓ Progress for {game} saved to your Pokédex."
  },
  types: {
    Grass: "Grass", Fire: "Fire", Water: "Water", Bug: "Bug",
    Normal: "Normal", Poison: "Poison", Electric: "Electric", Ground: "Ground",
    Fighting: "Fighting", Psychic: "Psychic", Rock: "Rock", Steel: "Steel",
    Ice: "Ice", Ghost: "Ghost", Dragon: "Dragon", Dark: "Dark", Fairy: "Fairy"
  },
  statsNames: {
    hp: "HP", attack: "Attack", defense: "Defense",
    spAttack: "Sp. Atk", spDefense: "Sp. Def", speed: "Speed"
  }
};
