export default {
  meta: {
    name: "English",
    code: "en",
    flag: "🇬🇧"
  },
  brand: {
    title: "MyPoke",
    fullName: "MyPokeLog",
    tag: "GEN 1",
    subtitle: "Regional Pokédex · {region} ({gen})",
    nationalSubtitle: "National Pokédex · 1025 Pokémon (Gen 1-9)"
  },
  nav: {
    pokedex: "Pokédex",
    progress: "Progress",
    settings: "Settings"
  },
  stats: {
    badge: "Badge",
    caught: "CAUGHT",
    pending: "PENDING",
    completed: "COMPLETED",
    progress: "Progress",
    badges: {
      master: "Pokémon Master",
      gold: "Gold (75%)",
      silver: "Silver (50%)",
      bronze: "Bronze (25%)"
    }
  },
  progressView: {
    title: "Your progress",
    nextMilestone: "NEXT MILESTONE",
    remainingText: "You need {count} more to reach {target}.",
    allComplete: "Congratulations! You have completed 100% of this Pokédex.",
    byType: "CAUGHT BY TYPE"
  },
  filterSheet: {
    title: "Filter by type",
    subtitle: "Select one or multiple types",
    selectedCount: "{count} selected",
    clear: "Clear",
    viewResults: "View results"
  },
  settingsView: {
    title: "Settings",
    genSaga: "GENERATION / SAGA",
    gameEdition: "EDITION / GAME",
    preferences: "PREFERENCES",
    shinySprites: "Shiny sprites",
    data: "DATA",
    dangerZone: "DANGER ZONE",
    dangerWarning: "Resetting will mark all Pokémon as pending. This action cannot be undone.",
    resetBtn: "Reset progress"
  },
  regions: {
    kanto: "Kanto",
    johto: "Johto",
    original_johto: "Original Johto",
    updated_johto: "Updated Johto",
    hoenn: "Hoenn",
    sinnoh: "Sinnoh",
    original_sinnoh: "Original Sinnoh",
    extended_sinnoh: "Extended Sinnoh",
    unova: "Unova",
    original_unova: "Original Unova",
    updated_unova: "Updated Unova",
    kalos: "Kalos",
    kalos_central: "Central Kalos",
    kalos_coastal: "Coastal Kalos",
    kalos_mountain: "Mountain Kalos",
    alola: "Alola",
    original_alola: "Original Alola",
    updated_alola: "Updated Alola",
    galar: "Galar",
    paldea: "Paldea",
    kitakami: "Kitakami",
    blueberry: "Blueberry",
    isle_of_armor: "Isle of Armor",
    crown_tundra: "Crown Tundra",
    hisui: "Hisui",
    lumiose: "Lumiose",
    legends_za: "Lumiose",
    hyperspace: "Hyperspace",
    letsgo_kanto: "Kanto (Let's Go)",
    updated_hoenn: "Hoenn (ORAS)",
    pokopia: "Pokopia"
  },
  categories: {
    fold: "▲ Collapse",
    unfold: "▼ Expand"
  },
  labels: {
    genEra: "1. GENERATION / SAGA",
    game: "2. EDITION / GAME",
    dexMode: "3. POKÉDEX MODE",
    searchPlaceholder: "Search by name or No...",
    statusFilter: "All",
    caughtOnly: "✓ Caught",
    missingOnly: "⌛ Pending",
    allGens: "All Gens",
    allTypes: "All Types",
    completeBadge: "[COMPLETE]",
    noResults: "No Pokémon found matching the selected filters.",
    specialTag: "SPECIAL",
    legendsTag: "Legends"
  },
  dexModes: {
    regional: "Regional Pokédex",
    national: "National Pokédex"
  },
  buttons: {
    themeDark: "Dark",
    themeLight: "Light",
    shinyToggle: "Shiny Sprites",
    exportGame: "Export JSON",
    exportGlobal: "Global backup",
    importData: "Import data",
    share: "Share",
    bulkToggle: "Toggle Visible",
    reset: "Reset",
    moreInfo: "More info",
    copy: "Copy Link",
    download: "Download File",
    apply: "Apply & Import Data",
    saveToDex: "Save to My Pokédex",
    closePreview: "Close preview"
  },
  card: {
    caught: "✓ CAUGHT",
    pending: "⌛ PENDING",
    nationalSub: "Nat. #{id}",
    toggleTitle: "Click to toggle caught status",
    moreInfo: "More info",
    capture: "Catch",
    setPending: "Pending"
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
      region: "REGION",
      howToGet: "HOW TO GET",
      description: "DESCRIPTION",
      state: "STATUS",
      height: "Height",
      weight: "Weight",
      nationalNum: "National No.",
      baseStats: "Base Stats",
      locationsTitle: "Locations in {game}",
      methodTitle: "Obtaining Method",
      fallbackText: "Wild encounter, evolution, breeding, or special event in {game}.",
      loading: "Loading information...",
      tableZone: "Zone / Location",
      tableEdition: "Edition",
      tableMethod: "Method & %",
      markPending: "Mark as pending",
      markCaught: "Mark as caught",
      pendingStatus: "Pending",
      caughtStatus: "Caught",
      seedCategory: "Seed Pokémon",
      defaultCategory: "{type} Pokémon"
    },
    exportGame: {
      title: "Export JSON — {game}",
      subtitle: "Structured overview of your caught and pending Pokémon in this game."
    },
    exportGlobal: {
      title: "Global Backup JSON (Complete DB)",
      subtitle: "Complete backup of your progress across all games and generations."
    },
    importModal: {
      title: "Import Progress (JSON)",
      subtitle: "Load data for a generation or global backup from a file or by pasting JSON.",
      optionA: "Option A: Upload a .json file from your device",
      selectFile: "Select .json file",
      orSeparator: "— Or paste raw JSON code directly —",
      optionB: "Option B: Paste JSON Code",
      textareaPlaceholder: "Paste your export or global backup JSON code here..."
    },
    shareModal: {
      title: "Shareable Progress Link",
      subtitle: "Share your Pokédex progress with anyone.",
      directLabel: "DIRECT LINK TO YOUR PROGRESS:",
      disclaimer: "Anyone with this link can view your progress and import it into their own Pokédex if they wish. No server or login required."
    }
  },
  sharedBanner: {
    viewing: "Viewing shared progress:",
    inGame: "in {game}"
  },
  toasts: {
    caught: "✓ Caught: {name}",
    pending: "⌛ Marked as pending: {name}",
    gameChanged: "Game changed to: {game}",
    modeChanged: "Mode changed to {mode} Pokédex",
    shinyOn: "Shiny Sprites Enabled",
    shinyOff: "Normal Sprites Enabled",
    bulkCaught: "Visible Pokémon marked as caught",
    bulkPending: "Visible Pokémon marked as pending",
    resetConfirmed: "Progress for {game} has been reset.",
    shareCopied: "Progress link copied to clipboard.",
    shareSuccess: "Progress shared.",
    importSuccess: "{mode} imported: +{count} Pokémon integrated.",
    sharedSaved: "Progress from {game} saved to your Pokédex."
  },
  types: {
    Grass: "Grass", Fire: "Fire", Water: "Water", Bug: "Bug",
    Normal: "Normal", Poison: "Poison", Electric: "Electric", Ground: "Ground",
    Fighting: "Fighting", Psychic: "Psychic", Rock: "Rock", Steel: "Steel",
    Ice: "Ice", Ghost: "Ghost", Dragon: "Dragon", Dark: "Dark", Fairy: "Fairy", Flying: "Flying"
  },
  statsNames: {
    hp: "HP", attack: "Attack", defense: "Defense",
    spAttack: "Sp. Atk", spDefense: "Sp. Def", speed: "Speed"
  },
  footer: {
    desc: "Multi-generation Pokédex tracker by game edition and generation (Gen 1 to 9, Legends Z-A, and Pokopia) with local persistence, 100% offline PWA support, and shiny sprites.",
    sectionsTitle: "SECTIONS & TOOLS",
    langTitle: "LANGUAGES & INFO",
    disclaimer: "© PauApps · MyPokeLog is an independent project with no affiliation with Nintendo, Game Freak or The Pokémon Company."
  },
  eras: {
    gen1: "Gen 1 (Kanto)",
    gen2: "Gen 2 (Johto)",
    gen3: "Gen 3 (Hoenn)",
    gen4: "Gen 4 (Sinnoh)",
    gen5: "Gen 5 (Unova)",
    gen6: "Gen 6 (Kalos)",
    gen7: "Gen 7 (Alola)",
    gen8: "Gen 8 (Galar & DLCs)",
    gen9: "Gen 9 (Paldea / DLCs)",
    legends_special: "Legends & Specials"
  },

  games: {
    gen9_paldea: {
      name: "Gen 9: Scarlet / Violet (Paldea)",
      label: "🔴 Scarlet / Violet (Paldea - 400 Reg / 1025 Nat)"
    },
    gen9_kitakami: {
      name: "Gen 9: Scarlet / Violet — DLC 1: The Teal Mask (Kitakami)",
      label: "🍃 DLC 1: The Teal Mask (Kitakami - 200 Reg / 1025 Nat)"
    },
    gen9_blueberry: {
      name: "Gen 9: Scarlet / Violet — DLC 2: The Indigo Disk (Blueberry Academy)",
      label: "🫐 DLC 2: The Indigo Disk (Blueberry Academy - 243 Reg / 1025 Nat)"
    },
    gen8_galar: {
      name: "Gen 8: Sword / Shield (Galar)",
      label: "⚔️ Sword / Shield (Galar - 400 Reg / 898 Nat)"
    },
    gen8_isle_of_armor: {
      name: "Gen 8: Sword / Shield — DLC 1: The Isle of Armor",
      label: "🛡️ DLC 1: The Isle of Armor (211 Reg / 898 Nat)"
    },
    gen8_crown_tundra: {
      name: "Gen 8: Sword / Shield — DLC 2: The Crown Tundra",
      label: "❄️ DLC 2: The Crown Tundra (210 Reg / 898 Nat)"
    },
    gen7_alola_updated: {
      name: "Gen 7: Ultra Sun / Ultra Moon (Alola Updated)",
      label: "☀️ Ultra Sun / Ultra Moon (Alola Updated - 403 Reg / 809 Nat)"
    },
    gen7_alola_original: {
      name: "Gen 7: Sun / Moon (Alola Original)",
      label: "🌴 Sun / Moon (Alola Original - 302 Reg / 802 Nat)"
    },
    gen6_kalos: {
      name: "Gen 6: X / Y (Kalos Complete)",
      label: "🏰 X / Y (Kalos - 454 Reg / 721 Nat)"
    },
    gen5_unova_updated: {
      name: "Gen 5: Black 2 / White 2 (Unova Updated)",
      label: "🏙️ Black 2 / White 2 (Unova Updated - 301 Reg / 649 Nat)"
    },
    gen5_unova_original: {
      name: "Gen 5: Black / White (Unova Original)",
      label: "⬛ Black / White (Unova Original - 156 Reg / 649 Nat)"
    },
    gen4_sinnoh_extended: {
      name: "Gen 4: Platinum (Sinnoh Extended)",
      label: "❄️ Platinum (Sinnoh Extended - 210 Reg / 493 Nat)"
    },
    gen4_sinnoh_original: {
      name: "Gen 4: Diamond / Pearl (Sinnoh Original)",
      label: "💎 Diamond / Pearl (Sinnoh Original - 151 Reg / 493 Nat)"
    },
    gen4_bdsp: {
      name: "Gen 4: Brilliant Diamond / Shining Pearl",
      label: "💎 Brilliant Diamond / Shining Pearl (Sinnoh - 151 Reg / 493 Nat)"
    },
    gen3_emerald: {
      name: "Gen 3: Emerald / Ruby / Sapphire (Hoenn Original)",
      label: "🟢 Emerald / Ruby / Sapphire (Hoenn - 202 Reg / 386 Nat)"
    },
    gen3_roza: {
      name: "Gen 3: Omega Ruby / Alpha Sapphire (Hoenn Updated)",
      label: "🔴 ORAS (Hoenn Updated - 211 Reg / 721 Nat)"
    },
    gen2_gsc: {
      name: "Gen 2: Gold / Silver / Crystal (Johto Original)",
      label: "🟡 Gold / Silver / Crystal (Johto - 251 Reg / 251 Nat)"
    },
    gen2_hgss: {
      name: "Gen 2: HeartGold / SoulSilver (Johto Updated)",
      label: "🌙 HeartGold / SoulSilver (Johto Updated - 256 Reg / 493 Nat)"
    },
    gen1_rby: {
      name: "Gen 1: Red / Blue / Yellow (Kanto)",
      label: "🔴 Red / Blue / Yellow (Kanto - 151 Reg / 151 Nat)"
    },
    gen1_leafgreen: {
      name: "Gen 1: FireRed / LeafGreen (Kanto)",
      label: "🍃 FireRed / LeafGreen (Kanto - 151 Reg / 386 Nat)"
    },
    gen1_letsgo: {
      name: "Gen 1: Let's Go Pikachu / Eevee (Kanto)",
      label: "⚡ Let's Go Pikachu / Eevee (Kanto - 153 Reg / 809 Nat)"
    },
    special_hisui: {
      name: "Pokémon Legends: Arceus (Hisui)",
      label: "📜 Pokémon Legends: Arceus (Hisui - 242 Reg / 898 Nat)"
    },
    special_legends_za: {
      name: "Pokémon Legends: Z-A (Lumiose City)",
      label: "⚡ Pokémon Legends: Z-A (Lumiose - 232 Reg / 1025 Nat)"
    },
    special_pokopia: {
      name: "Pokémon Pokopia (Pokopia Islands)",
      label: "🏝️ Pokémon Pokopia (Pokopia - 300 Reg / 1025 Nat)"
    }
  }
};
