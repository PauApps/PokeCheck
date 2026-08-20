export default {
  meta: {
    name: "Italiano",
    code: "it",
    flag: "🇮🇹"
  },
  brand: {
    title: "MyPoke",
    fullName: "MyPokeLog",
    tag: "GEN 1",
    subtitle: "Pokédex Regionale · {region} ({gen})",
    nationalSubtitle: "Pokédex Nazionale · 1025 Pokémon (Gen 1-9)"
  },
  nav: {
    pokedex: "Pokédex",
    progress: "Progresso",
    settings: "Impostazioni"
  },
  stats: {
    badge: "Medaglia",
    caught: "CATTURATI",
    pending: "IN ATTESA",
    completed: "COMPLETATO",
    progress: "Progresso",
    badges: {
      master: "Maestro Pokémon",
      gold: "Oro (75%)",
      silver: "Argento (50%)",
      bronze: "Bronzo (25%)"
    }
  },
  progressView: {
    title: "Il tuo progresso",
    nextMilestone: "PROSSIMO OBIETTIVO",
    remainingText: "Ti mancano {count} per raggiungere {target}.",
    allComplete: "Congratulazioni! Hai completato il 100% di questo Pokédex.",
    byType: "CATTURATI PER TIPO"
  },
  filterSheet: {
    title: "Filtra per tipo",
    subtitle: "Seleziona uno o più tipi",
    selectedCount: "{count} selezionati",
    clear: "Cancella",
    viewResults: "Vedi risultati"
  },
  settingsView: {
    title: "Impostazioni",
    genSaga: "GENERAZIONE / SAGA",
    gameEdition: "EDIZIONE / GIOCO",
    preferences: "PREFERENZE",
    shinySprites: "Sprite cromatici",
    data: "DATI",
    dangerZone: "ZONA PERICOLOSA",
    dangerWarning: "Il ripristino contrassegnerà tutti i Pokémon come in attesa. Questa azione non può essere annullata.",
    resetBtn: "Ripristina progresso"
  },
  regions: {
    kanto: "Kanto",
    johto: "Johto",
    original_johto: "Johto Originale",
    updated_johto: "Johto Aggiornato",
    hoenn: "Hoenn",
    sinnoh: "Sinnoh",
    original_sinnoh: "Sinnoh Originale",
    extended_sinnoh: "Sinnoh Esteso",
    unova: "Unima",
    original_unova: "Unima Originale",
    updated_unova: "Unima Aggiornato",
    kalos: "Kalos",
    kalos_central: "Kalos Centrale",
    kalos_coastal: "Kalos Costiera",
    kalos_mountain: "Kalos Montana",
    alola: "Alola",
    original_alola: "Alola Originale",
    updated_alola: "Alola Aggiornato",
    galar: "Galar",
    paldea: "Paldea",
    kitakami: "Nordivia",
    blueberry: "Mirtillo",
    isle_of_armor: "Isola dell'armatura",
    crown_tundra: "Terre innevate della corona",
    hisui: "Hisui",
    lumiose: "Luminopoli",
    legends_za: "Luminopoli",
    hyperspace: "Iperspazio",
    letsgo_kanto: "Kanto (Let's Go)",
    updated_hoenn: "Hoenn (ROZA)",
    pokopia: "Pokopia"
  },
  categories: {
    fold: "▲ Riduci",
    unfold: "▼ Espandi"
  },
  labels: {
    genEra: "1. GENERAZIONE / SAGA",
    game: "2. EDIZIONE / GIOCO",
    dexMode: "3. MODALITÀ POKÉDEX",
    searchPlaceholder: "Cerca per nome o N.º...",
    statusFilter: "Tutti",
    caughtOnly: "✓ Catturati",
    missingOnly: "⌛ In sospeso",
    allGens: "Tutte le Gen",
    allTypes: "Tutti i Tipi",
    completeBadge: "[COMPLETO]",
    noResults: "Nessun Pokémon trovato con i filtri selezionati.",
    specialTag: "SPECIALE",
    legendsTag: "Leggende"
  },
  dexModes: {
    regional: "Pokédex Regionale",
    national: "Pokédex Nazionale"
  },
  buttons: {
    themeDark: "Scuro",
    themeLight: "Chiaro",
    shinyToggle: "Sprite Shiny",
    exportGame: "Esporta JSON",
    exportGlobal: "Backup globale",
    importData: "Importa dati",
    share: "Condividi",
    bulkToggle: "Inverti Visibili",
    reset: "Ripristina",
    moreInfo: "Maggiori info",
    copy: "Copia Link",
    download: "Scarica File",
    apply: "Applica e Importa",
    saveToDex: "Salva nel mio Pokédex",
    closePreview: "Chiudi anteprima"
  },
  card: {
    caught: "✓ CATTURATO",
    pending: "⌛ IN ATTESA",
    nationalSub: "Nat. #{id}",
    toggleTitle: "Clicca per contrassegnare",
    moreInfo: "Maggiori info",
    capture: "Cattura",
    setPending: "In attesa"
  },
  confirm: {
    resetGame: "Sei sicuro di voler ripristinare tutti i progressi per \"{game}\"? L'operazione non può essere annullata."
  },
  modals: {
    modalNav: {
      prev: "Precedente",
      next: "Successivo",
      hint: "Naviga con ◀ ▶"
    },
    detail: {
      region: "REGIONE",
      howToGet: "COME OTTENERLO",
      description: "DESCRIZIONE",
      state: "STATO",
      height: "Altezza",
      weight: "Peso",
      nationalNum: "N° Nazionale",
      baseStats: "Statistiche Base",
      locationsTitle: "Posizioni in {game}",
      methodTitle: "Metodo di Ottenimento",
      fallbackText: "Incontro selvatico, evoluzione, allevamento o evento speciale in {game}.",
      loading: "Caricamento informazioni...",
      tableZone: "Zona / Posizione",
      tableEdition: "Edizione",
      tableMethod: "Metodo e %",
      markPending: "Segna come in attesa",
      markCaught: "Segna come catturato",
      pendingStatus: "In attesa",
      caughtStatus: "Catturato",
      seedCategory: "Pokémon Seme",
      defaultCategory: "Pokémon {type}"
    },
    exportGame: {
      title: "Esporta JSON — {game}",
      subtitle: "Riepilogo strutturato dei tuoi Pokémon catturati e in attesa in questo gioco."
    },
    exportGlobal: {
      title: "Backup Globale JSON (Database Completo)",
      subtitle: "Backup completo dei tuoi progressi in tutte le versioni di gioco."
    },
    importModal: {
      title: "Importa Progresso (JSON)",
      subtitle: "Carica i dati di una generazione o un backup globale da un file o incollando il codice.",
      optionA: "Opzione A: Carica un file .json dal tuo dispositivo",
      selectFile: "Seleziona file .json",
      orSeparator: "— Oppure incollando direttamente il codice JSON —",
      optionB: "Opzione B: Incolla Codice JSON",
      textareaPlaceholder: "Incolla qui il tuo codice JSON di esportazione o backup..."
    },
    shareModal: {
      title: "Link Condivisibile del Progresso",
      subtitle: "Condividi i tuoi progressi nel Pokédex con chiunque.",
      directLabel: "LINK DIRETTO AL TUO PROGRESSO:",
      disclaimer: "Chiunque disponga di questo link potrà visualizzare i tuoi progressi e importarli nel proprio Pokédex se lo desidera."
    }
  },
  sharedBanner: {
    viewing: "Visualizzazione progressi condivisi:",
    inGame: "in {game}"
  },
  toasts: {
    caught: "✓ Catturato: {name}",
    pending: "⌛ Segnato come in attesa: {name}",
    gameChanged: "Gioco cambiato in: {game}",
    modeChanged: "Modalità cambiata in Pokédex {mode}",
    shinyOn: "Sprite Cromatici Attivati",
    shinyOff: "Sprite Normali Attivati",
    bulkCaught: "Pokémon visibili contrassegnati come catturati",
    bulkPending: "Pokémon visibili contrassegnati come in attesa",
    resetConfirmed: "Progresso di {game} ripristinato.",
    shareCopied: "Link al progresso copiato negli appunti.",
    shareSuccess: "Progresso condiviso.",
    importSuccess: "{mode} importato: +{count} Pokémon integrati.",
    sharedSaved: "Progresso di {game} salvato nel tuo Pokédex."
  },
  types: {
    Grass: "Erba", Fire: "Fuoco", Water: "Acqua", Bug: "Coleottero",
    Normal: "Normale", Poison: "Veleno", Electric: "Elettro", Ground: "Terra",
    Fighting: "Lotta", Psychic: "Psico", Rock: "Roccia", Steel: "Acciaio",
    Ice: "Ghiaccio", Ghost: "Spettro", Dragon: "Drago", Dark: "Buio", Fairy: "Folletto", Flying: "Volante"
  },
  statsNames: {
    hp: "PS", attack: "Attacco", defense: "Difesa",
    spAttack: "Att. Sp.", spDefense: "Dif. Sp.", speed: "Velocità"
  },
  footer: {
    desc: "Tracker Pokédex multigenerazione per gioco ed edizione (Gen da 1 a 9, Leggende Z-A e Pokopia) con salvataggio locale, supporto PWA 100% offline e sprite cromatici.",
    sectionsTitle: "SEZIONI & STRUMENTI",
    langTitle: "LINGUE & INFO",
    disclaimer: "© PauApps · MyPokeLog è un progetto indipendente senza affiliazione con Nintendo, Game Freak o The Pokémon Company."
  },
  eras: {
    gen1: "Gen 1 (Kanto)",
    gen2: "Gen 2 (Johto)",
    gen3: "Gen 3 (Hoenn)",
    gen4: "Gen 4 (Sinnoh)",
    gen5: "Gen 5 (Unima)",
    gen6: "Gen 6 (Kalos)",
    gen7: "Gen 7 (Alola)",
    gen8: "Gen 8 (Galar & DLCs)",
    gen9: "Gen 9 (Paldea / DLCs)",
    legends_special: "Leggende & Speciali"
  },

  games: {
    gen9_paldea: {
      name: "Gen 9: Scarlatto / Violetto (Paldea)",
      label: "🔴 Scarlatto / Violetto (Paldea - 400 Reg / 1025 Nat)"
    },
    gen9_kitakami: {
      name: "Gen 9: Scarlatto / Violetto — DLC 1: La maschera turchese (Nordivia)",
      label: "🍃 DLC 1: La maschera turchese (Nordivia - 200 Reg / 1025 Nat)"
    },
    gen9_blueberry: {
      name: "Gen 9: Scarlatto / Violetto — DLC 2: Il disco indaco (Istituto Mirtillo)",
      label: "🫐 DLC 2: Il disco indaco (Istituto Mirtillo - 243 Reg / 1025 Nat)"
    },
    gen8_galar: {
      name: "Gen 8: Spada / Scudo (Galar)",
      label: "⚔️ Spada / Scudo (Galar - 400 Reg / 898 Nat)"
    },
    gen8_isle_of_armor: {
      name: "Gen 8: Spada / Scudo — DLC 1: L'isola solitaria dell'armatura",
      label: "🛡️ DLC 1: L'isola solitaria dell'armatura (211 Reg / 898 Nat)"
    },
    gen8_crown_tundra: {
      name: "Gen 8: Spada / Scudo — DLC 2: Le terre innevate della corona",
      label: "❄️ DLC 2: Le terre innevate della corona (210 Reg / 898 Nat)"
    },
    gen7_alola_updated: {
      name: "Gen 7: UltraSole / UltraLuna (Alola Aggiornato)",
      label: "☀️ UltraSole / UltraLuna (Alola Aggiornato - 403 Reg / 809 Nat)"
    },
    gen7_alola_original: {
      name: "Gen 7: Sole / Luna (Alola Originale)",
      label: "🌴 Sole / Luna (Alola Originale - 302 Reg / 802 Nat)"
    },
    gen6_kalos: {
      name: "Gen 6: X / Y (Kalos Completo)",
      label: "🏰 X / Y (Kalos - 454 Reg / 721 Nat)"
    },
    gen5_unova_updated: {
      name: "Gen 5: Nero 2 / Bianco 2 (Unima Aggiornato)",
      label: "🏙️ Nero 2 / Bianco 2 (Unima Aggiornato - 301 Reg / 649 Nat)"
    },
    gen5_unova_original: {
      name: "Gen 5: Nero / Bianco (Unima Originale)",
      label: "⬛ Nero / Bianco (Unima Originale - 156 Reg / 649 Nat)"
    },
    gen4_sinnoh_extended: {
      name: "Gen 4: Platino (Sinnoh Esteso)",
      label: "❄️ Platino (Sinnoh Esteso - 210 Reg / 493 Nat)"
    },
    gen4_sinnoh_original: {
      name: "Gen 4: Diamante / Perla (Sinnoh Originale)",
      label: "💎 Diamante / Perla (Sinnoh Originale - 151 Reg / 493 Nat)"
    },
    gen4_bdsp: {
      name: "Gen 4: Diamante Lucente / Perla Splendente",
      label: "💎 Diamante Lucente / Perla Splendente (Sinnoh - 151 Reg / 493 Nat)"
    },
    gen3_emerald: {
      name: "Gen 3: Smeraldo / Rubino / Zaffiro (Hoenn Originale)",
      label: "🟢 Smeraldo / Rubino / Zaffiro (Hoenn - 202 Reg / 386 Nat)"
    },
    gen3_roza: {
      name: "Gen 3: Rubino Omega / Zaffiro Alfa (Hoenn Aggiornato)",
      label: "🔴 ORAS (Hoenn Aggiornato - 211 Reg / 721 Nat)"
    },
    gen2_gsc: {
      name: "Gen 2: Oro / Argento / Cristallo (Johto Originale)",
      label: "🟡 Oro / Argento / Cristallo (Johto - 251 Reg / 251 Nat)"
    },
    gen2_hgss: {
      name: "Gen 2: HeartGold / SoulSilver (Johto Aggiornato)",
      label: "🌙 HeartGold / SoulSilver (Johto Aggiornato - 256 Reg / 493 Nat)"
    },
    gen1_rby: {
      name: "Gen 1: Rosso / Blu / Giallo (Kanto)",
      label: "🔴 Rosso / Blu / Giallo (Kanto - 151 Reg / 151 Nat)"
    },
    gen1_leafgreen: {
      name: "Gen 1: Rosso Fuoco / Verde Foglia (Kanto)",
      label: "🍃 Rosso Fuoco / Verde Foglia (Kanto - 151 Reg / 386 Nat)"
    },
    gen1_letsgo: {
      name: "Gen 1: Let's Go Pikachu / Eevee (Kanto)",
      label: "⚡ Let's Go Pikachu / Eevee (Kanto - 153 Reg / 809 Nat)"
    },
    special_hisui: {
      name: "Leggende Pokémon: Arceus (Hisui)",
      label: "📜 Leggende Pokémon: Arceus (Hisui - 242 Reg / 898 Nat)"
    },
    special_legends_za: {
      name: "Leggende Pokémon: Z-A (Luminopoli)",
      label: "⚡ Leggende Pokémon: Z-A (Luminopoli - 232 Reg / 1025 Nat)"
    },
    special_pokopia: {
      name: "Pokémon Pokopia (Isole Pokopia)",
      label: "🏝️ Pokémon Pokopia (Pokopia - 300 Reg / 1025 Nat)"
    }
  }
};
