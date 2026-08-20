export default {
  meta: {
    name: "Deutsch",
    code: "de",
    flag: "🇩🇪"
  },
  brand: {
    title: "MyPoke",
    fullName: "MyPokeLog",
    tag: "GEN 1",
    subtitle: "Regionaler Pokédex · {region} ({gen})"
  },
  nav: {
    pokedex: "Pokédex",
    progress: "Fortschritt",
    settings: "Einstellungen"
  },
  stats: {
    badge: "Abzeichen",
    caught: "GEFANGEN",
    pending: "OFFEN",
    completed: "ABGESCHLOSSEN",
    progress: "Fortschritt",
    badges: {
      master: "Pokémon-Meister",
      gold: "Gold (75%)",
      silver: "Silber (50%)",
      bronze: "Bronze (25%)"
    }
  },
  progressView: {
    title: "Dein Fortschritt",
    nextMilestone: "NÄCHSTER MEILENSTEIN",
    remainingText: "Dir fehlen noch {count}, um {target} zu erreichen.",
    allComplete: "Glückwunsch! Du hast 100% dieses Pokédex vervollständigt.",
    byType: "GEFANGEN NACH TYP"
  },
  filterSheet: {
    title: "Nach Typ filtern",
    subtitle: "Wähle einen oder mehrere Typen",
    selectedCount: "{count} ausgewählt",
    clear: "Löschen",
    viewResults: "Ergebnisse anzeigen"
  },
  settingsView: {
    title: "Einstellungen",
    genSaga: "GENERATION / SAGA",
    gameEdition: "EDITION / SPIEL",
    preferences: "EINSTELLUNGEN",
    shinySprites: "Schillernde Sprites",
    data: "DATEN",
    dangerZone: "GEFAHRENZONE",
    dangerWarning: "Beim Zurücksetzen werden alle Pokémon als offen markiert. Dies kann nicht rückgängig gemacht werden.",
    resetBtn: "Fortschritt zurücksetzen"
  },
  regions: {
    kanto: "Kanto",
    johto: "Johto",
    original_johto: "Johto Original",
    updated_johto: "Johto Aktualisiert",
    hoenn: "Hoenn",
    sinnoh: "Sinnoh",
    original_sinnoh: "Sinnoh Original",
    extended_sinnoh: "Sinnoh Erweitert",
    unova: "Einall",
    original_unova: "Einall Original",
    updated_unova: "Einall Aktualisiert",
    kalos: "Kalos",
    kalos_central: "Zentral-Kalos",
    kalos_coastal: "Küsten-Kalos",
    kalos_mountain: "Gebirgs-Kalos",
    alola: "Alola",
    original_alola: "Alola Original",
    updated_alola: "Alola Aktualisiert",
    galar: "Galar",
    paldea: "Paldea",
    kitakami: "Kitakami",
    blueberry: "Blaubeer",
    isle_of_armor: "Rüstungsinsel",
    crown_tundra: "Schneelande der Krone",
    hisui: "Hisui",
    lumiose: "Illumina",
    hyperspace: "Hyperraum",
    pokopia: "Pokopia"
  },
  labels: {
    genEra: "1. GENERATION / SAGA",
    game: "2. EDITION / SPIEL",
    dexMode: "3. POKÉDEX-MODUS",
    searchPlaceholder: "Nach Name oder Nr. suchen...",
    statusFilter: "Alle",
    caughtOnly: "✓ Gefangen",
    missingOnly: "⌛ Ausstehend",
    allGens: "Alle Gen",
    allTypes: "Alle Typen",
    completeBadge: "[VOLLSTÄNDIG]",
    noResults: "Keine Pokémon gefunden, die den Filtern entsprechen.",
    specialTag: "SPEZIAL",
    legendsTag: "Legenden"
  },
  dexModes: {
    regional: "Regionaler Pokédex",
    national: "Nationaler Pokédex"
  },
  buttons: {
    themeDark: "Dunkel",
    themeLight: "Hell",
    shinyToggle: "Schillernde Sprites",
    exportGame: "JSON exportieren",
    exportGlobal: "Globales Backup",
    importData: "Daten importieren",
    share: "Teilen",
    bulkToggle: "Sichtbare umschalten",
    reset: "Zurücksetzen",
    moreInfo: "Mehr Info",
    copy: "Link kopieren",
    download: "Datei herunterladen",
    apply: "Anwenden & Importieren",
    saveToDex: "In meinem Pokédex speichern",
    closePreview: "Vorschau schließen"
  },
  card: {
    caught: "✓ GEFANGEN",
    pending: "⌛ OFFEN",
    nationalSub: "Nat. #{id}",
    toggleTitle: "Klicken zum Markieren",
    moreInfo: "Mehr Info",
    capture: "Fangen",
    setPending: "Offen"
  },
  confirm: {
    resetGame: "Möchtest du den gesamten Fortschritt für \"{game}\" wirklich zurücksetzen?"
  },
  modals: {
    modalNav: {
      prev: "Vorheriges",
      next: "Nächstes",
      hint: "Mit ◀ ▶ navigieren"
    },
    detail: {
      region: "REGION",
      howToGet: "FUNDORT / ERHALT",
      description: "BESCHREIBUNG",
      state: "STATUS",
      height: "Größe",
      weight: "Gewicht",
      nationalNum: "National-Nr.",
      baseStats: "Basiswerte",
      locationsTitle: "Fundorte in {game}",
      methodTitle: "Erhalt-Methode",
      fallbackText: "Wilder Fund, Entwicklung, Zucht oder Event in {game}.",
      loading: "Lade Informationen...",
      tableZone: "Zone / Ort",
      tableEdition: "Edition",
      tableMethod: "Methode & %",
      markPending: "Als offen markieren",
      markCaught: "Als gefangen markieren",
      pendingStatus: "Offen",
      caughtStatus: "Gefangen",
      seedCategory: "Samen-Pokémon",
      defaultCategory: "{type}-Pokémon"
    },
    exportGame: {
      title: "JSON-Export — {game}",
      subtitle: "Strukturierte Übersicht deiner gefangenen und offenen Pokémon."
    },
    exportGlobal: {
      title: "Globales JSON-Backup (Gesamte DB)",
      subtitle: "Vollständige Sicherung deines Fortschritts über alle Spiele hinweg."
    },
    importModal: {
      title: "Fortschritt importieren (JSON)",
      subtitle: "Lade Daten einer Generation oder ein globales Backup aus einer Datei oder durch Einfügen.",
      optionA: "Option A: .json-Datei vom Gerät hochladen",
      selectFile: ".json-Datei auswählen",
      orSeparator: "— Oder JSON-Code direkt einfügen —",
      optionB: "Option B: JSON-Code einfügen",
      textareaPlaceholder: "Füge hier deinen JSON-Code ein..."
    },
    shareModal: {
      title: "Teilbarer Fortschrittslink",
      subtitle: "Teile deinen Pokédex-Fortschritt mit anderen.",
      directLabel: "DIREKTER LINK ZU DEINEM FORTSCHRITT:",
      disclaimer: "Jeder mit diesem Link kann deinen Fortschritt ansehen und bei Bedarf importieren."
    }
  },
  sharedBanner: {
    viewing: "Geteilter Fortschritt wird angezeigt:",
    inGame: "in {game}"
  },
  toasts: {
    caught: "✓ Gefangen: {name}",
    pending: "⌛ Als offen markiert: {name}",
    gameChanged: "Spiel gewechselt zu: {game}",
    modeChanged: "Modus gewechselt zu {mode} Pokédex",
    shinyOn: "Schillernde Sprites aktiviert",
    shinyOff: "Normale Sprites aktiviert",
    bulkCaught: "Sichtbare Pokémon als gefangen markiert",
    bulkPending: "Sichtbare Pokémon als offen markiert",
    resetConfirmed: "Fortschritt für {game} wurde zurückgesetzt.",
    shareCopied: "Fortschrittslink in die Zwischenablage kopiert.",
    shareSuccess: "Fortschritt geteilt.",
    importSuccess: "{mode} importiert: +{count} Pokémon integriert.",
    sharedSaved: "Fortschritt von {game} in deinem Pokédex gespeichert."
  },
  types: {
    Grass: "Pflanze", Fire: "Feuer", Water: "Wasser", Bug: "Käfer",
    Normal: "Normal", Poison: "Gift", Electric: "Elektro", Ground: "Boden",
    Fighting: "Kampf", Psychic: "Psycho", Rock: "Gestein", Steel: "Stahl",
    Ice: "Eis", Ghost: "Geist", Dragon: "Drache", Dark: "Unlicht", Fairy: "Fee", Flying: "Flug"
  },
  statsNames: {
    hp: "KP", attack: "Angriff", defense: "Verteidigung",
    spAttack: "Sp.-Ang.", spDefense: "Sp.-Vert.", speed: "Initiative"
  },
  footer: {
    desc: "Multi-Generationen-Pokédex-Tracker mit lokaler Speicherung, 100% Offline-PWA-Unterstützung, regionalem & nationalem Tracking und Kompatibilität mit Gen 1 bis 9, Legenden Z-A und Pokopia.",
    sectionsTitle: "BEREICHE & WERKZEUGE",
    langTitle: "SPRACHEN & INFO",
    disclaimer: "© PauApps · MyPokeLog ist ein unabhängiges Projekt ohne Verbindung zu Nintendo, Game Freak oder The Pokémon Company."
  },
  eras: {
    gen1: "Gen 1 (Kanto)",
    gen2: "Gen 2 (Johto)",
    gen3: "Gen 3 (Hoenn)",
    gen4: "Gen 4 (Sinnoh)",
    gen5: "Gen 5 (Einall)",
    gen6: "Gen 6 (Kalos)",
    gen7: "Gen 7 (Alola)",
    gen8: "Gen 8 (Galar & DLCs)",
    gen9: "Gen 9 (Paldea / DLCs)",
    legends_special: "Legenden & Spezial"
  },

  games: {
    gen9_paldea: {
      name: "Gen 9: Karmesin / Purpur (Paldea)",
      label: "🔴 Karmesin / Purpur (Paldea - 400 Reg / 1025 Nat)"
    },
    gen9_kitakami: {
      name: "Gen 9: Karmesin / Purpur — DLC 1: Die Türkisgrüne Maske (Kitakami)",
      label: "🍃 DLC 1: Die Türkisgrüne Maske (Kitakami - 200 Reg / 1025 Nat)"
    },
    gen9_blueberry: {
      name: "Gen 9: Karmesin / Purpur — DLC 2: Die Indigoblaue Scheibe (Blaubeer-Akademie)",
      label: "🫐 DLC 2: Die Indigoblaue Scheibe (Blaubeer-Akademie - 243 Reg / 1025 Nat)"
    },
    gen8_galar: {
      name: "Gen 8: Schwert / Schild (Galar)",
      label: "⚔️ Schwert / Schild (Galar - 400 Reg / 898 Nat)"
    },
    gen8_isle_of_armor: {
      name: "Gen 8: Schwert / Schild — DLC 1: Die Rüstungsinsel",
      label: "🛡️ DLC 1: Die Rüstungsinsel (211 Reg / 898 Nat)"
    },
    gen8_crown_tundra: {
      name: "Gen 8: Schwert / Schild — DLC 2: Die Schneelande der Krone",
      label: "❄️ DLC 2: Die Schneelande der Krone (210 Reg / 898 Nat)"
    },
    gen7_alola_updated: {
      name: "Gen 7: UltraSonne / UltraMond (Alola Aktualisiert)",
      label: "☀️ UltraSonne / UltraMond (Alola Aktualisiert - 403 Reg / 809 Nat)"
    },
    gen7_alola_original: {
      name: "Gen 7: Sonne / Mond (Alola Original)",
      label: "🌴 Sonne / Mond (Alola Original - 302 Reg / 802 Nat)"
    },
    gen6_kalos: {
      name: "Gen 6: X / Y (Kalos Komplett)",
      label: "🏰 X / Y (Kalos - 454 Reg / 721 Nat)"
    },
    gen5_unova_updated: {
      name: "Gen 5: Schwarz 2 / Weiß 2 (Einall Aktualisiert)",
      label: "🏙️ Schwarz 2 / Weiß 2 (Einall Aktualisiert - 301 Reg / 649 Nat)"
    },
    gen5_unova_original: {
      name: "Gen 5: Schwarz / Weiß (Einall Original)",
      label: "⬛ Schwarz / Weiß (Einall Original - 156 Reg / 649 Nat)"
    },
    gen4_sinnoh_extended: {
      name: "Gen 4: Platin (Sinnoh Erweitert)",
      label: "❄️ Platin (Sinnoh Erweitert - 210 Reg / 493 Nat)"
    },
    gen4_sinnoh_original: {
      name: "Gen 4: Diamant / Perl (Sinnoh Original)",
      label: "💎 Diamant / Perl (Sinnoh Original - 151 Reg / 493 Nat)"
    },
    gen3_emerald: {
      name: "Gen 3: Smaragd / Rubin / Saphir (Hoenn Original)",
      label: "🟢 Smaragd / Rubin / Saphir (Hoenn - 202 Reg / 386 Nat)"
    },
    gen3_roza: {
      name: "Gen 3: Omega Rubin / Alpha Saphir (Hoenn Aktualisiert)",
      label: "🔴 ORAS (Hoenn Aktualisiert - 211 Reg / 721 Nat)"
    },
    gen2_gsc: {
      name: "Gen 2: Gold / Silber / Kristall (Johto Original)",
      label: "🟡 Gold / Silber / Kristall (Johto - 251 Reg / 251 Nat)"
    },
    gen2_hgss: {
      name: "Gen 2: HeartGold / SoulSilver (Johto Aktualisiert)",
      label: "🌙 HeartGold / SoulSilver (Johto Aktualisiert - 256 Reg / 493 Nat)"
    },
    gen1_rby: {
      name: "Gen 1: Rot / Blau / Gelb (Kanto)",
      label: "🔴 Rot / Blau / Gelb (Kanto - 151 Reg / 151 Nat)"
    },
    gen1_leafgreen: {
      name: "Gen 1: Feuerrot / Blattgrün (Kanto)",
      label: "🍃 Feuerrot / Blattgrün (Kanto - 151 Reg / 386 Nat)"
    },
    gen1_letsgo: {
      name: "Gen 1: Let's Go Pikachu / Evoli (Kanto)",
      label: "⚡ Let's Go Pikachu / Evoli (Kanto - 153 Reg / 809 Nat)"
    },
    special_hisui: {
      name: "Pokémon-Legenden: Arceus (Hisui)",
      label: "📜 Pokémon-Legenden: Arceus (Hisui - 242 Reg / 898 Nat)"
    },
    special_legends_za: {
      name: "Pokémon-Legenden: Z-A (Illumina City)",
      label: "⚡ Pokémon-Legenden: Z-A (Illumina - 232 Reg / 1025 Nat)"
    },
    special_pokopia: {
      name: "Pokémon Pokopia (Pokopia-Inseln)",
      label: "🏝️ Pokémon Pokopia (Pokopia - 300 Reg / 1025 Nat)"
    }
  }
};
