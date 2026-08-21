export default {
  meta: {
    name: "Français",
    code: "fr",
    flag: "🇫🇷"
  },
  brand: {
    title: "MyPoke",
    fullName: "MyPokeLog",
    tag: "GÉN 1",
    subtitle: "Pokédex Régional · {region} ({gen})",
    nationalSubtitle: "Pokédex National · 1025 Pokémon (Gén 1-9)"
  },
  nav: {
    pokedex: "Pokédex",
    progress: "Progression",
    settings: "Paramètres"
  },
  stats: {
    badge: "Badge",
    caught: "CAPTURÉS",
    pending: "EN ATTENTE",
    completed: "COMPLÉTÉ",
    progress: "Progression",
    badges: {
      master: "Maître Pokémon",
      gold: "Or (75%)",
      silver: "Argent (50%)",
      bronze: "Bronze (25%)"
    }
  },
  progressView: {
    title: "Votre progression",
    nextMilestone: "PROCHAIN PALIER",
    remainingText: "Il vous en manque {count} pour atteindre les {target}.",
    allComplete: "Félicitations ! Vous avez complété 100% de ce Pokédex.",
    byType: "CAPTURÉS PAR TYPE"
  },
  filterSheet: {
    title: "Filtrer par type",
    subtitle: "Sélectionnez un ou plusieurs types",
    selectedCount: "{count} sélectionnés",
    clear: "Effacer",
    viewResults: "Voir les résultats"
  },
  settingsView: {
    title: "Paramètres",
    genSaga: "GÉNÉRATION / SAGA",
    gameEdition: "ÉDITION / JEU",
    preferences: "PRÉFÉRENCES",
    shinySprites: "Sprites chromatiques",
    data: "DONNÉES",
    dangerZone: "ZONE DANGEREUSE",
    dangerWarning: "La réinitialisation marquera tous les Pokémon comme non capturés. Cette action est irréversible.",
    resetBtn: "Réinitialiser la progression"
  },
  regions: {
    kanto: "Kanto",
    johto: "Johto",
    original_johto: "Johto Original",
    updated_johto: "Johto Mis à Jour",
    hoenn: "Hoenn",
    sinnoh: "Sinnoh",
    original_sinnoh: "Sinnoh Original",
    extended_sinnoh: "Sinnoh Étendu",
    unova: "Unys",
    original_unova: "Unys Original",
    updated_unova: "Unys Mis à Jour",
    kalos: "Kalos",
    kalos_central: "Kalos Centre",
    kalos_coastal: "Kalos Côtes",
    kalos_mountain: "Kalos Monts",
    alola: "Alola",
    original_alola: "Alola Original",
    updated_alola: "Alola Mis à Jour",
    galar: "Galar",
    paldea: "Paldea",
    kitakami: "Septentria",
    blueberry: "Myrtille",
    isle_of_armor: "Île Solitaire de l'Armure",
    crown_tundra: "Terres Enneigées de la Couronne",
    hisui: "Hisui",
    lumiose: "Illumis",
    legends_za: "Illumis",
    hyperspace: "Hyper-Espace",
    letsgo_kanto: "Kanto (Let's Go)",
    updated_hoenn: "Hoenn (ROSA)",
    pokopia: "Pokopia"
  },
  categories: {
    fold: "▲ Réduire",
    unfold: "▼ Déplier"
  },
  labels: {
    genEra: "1. GÉNÉRATION / SAGA",
    game: "2. ÉDITION / JEU",
    dexMode: "3. MODE POKÉDEX",
    searchPlaceholder: "Rechercher par nom ou N°...",
    statusFilter: "Tous",
    caughtOnly: "✓ Capturés",
    missingOnly: "⌛ En attente",
    allGens: "Toutes les Gén",
    allTypes: "Tous les Types",
    completeBadge: "[COMPLET]",
    noResults: "Aucun Pokémon trouvé avec los filtres sélectionnés.",
    specialTag: "SPÉCIAL",
    legendsTag: "Légendes"
  },
  dexModes: {
    regional: "Pokédex Régional",
    national: "Pokédex National"
  },
  buttons: {
    themeDark: "Sombre",
    themeLight: "Clair",
    shinyToggle: "Sprites Shiny",
    exportGame: "Exporter JSON",
    exportGlobal: "Sauvegarde globale",
    importData: "Importer données",
    share: "Partager",
    bulkToggle: "Basculer Visibles",
    reset: "Réinitialiser",
    moreInfo: "Plus d'infos",
    copy: "Copier le Lien",
    download: "Télécharger Fichier",
    apply: "Appliquer et Importer",
    saveToDex: "Enregistrer dans mon Pokédex",
    closePreview: "Fermer l'aperçu"
  },
  card: {
    caught: "CAPTURÉ",
    pending: "EN ATTENTE",
    nationalSub: "Nat. #{id}",
    toggleTitle: "Cliquer pour marquer ou démarquer",
    moreInfo: "Plus d'infos",
    capture: "Capturer",
    setPending: "En attente"
  },
  confirm: {
    resetGame: "Êtes-vous sûr de vouloir réinitialiser la progression pour \"{game}\" ? Cette action est irréversible."
  },
  modals: {
    modalNav: {
      prev: "Précédent",
      next: "Suivant",
      hint: "Naviguer avec ◀ ▶"
    },
    detail: {
      region: "RÉGION",
      howToGet: "COMMENT L'OBTENIR",
      description: "DESCRIPTION",
      state: "ÉTAT",
      height: "Taille",
      weight: "Poids",
      nationalNum: "N° National",
      baseStats: "Statistiques de Base",
      locationsTitle: "Localisations dans {game}",
      methodTitle: "Méthode d'obtention",
      fallbackText: "Rencontre sauvage, évolution, reproduction ou événement spécial dans {game}.",
      loading: "Chargement des informations...",
      tableZone: "Zone / Lieu",
      tableEdition: "Édition",
      tableMethod: "Méthode et %",
      markPending: "Marquer comme en attente",
      markCaught: "Marquer comme capturé",
      pendingStatus: "En attente",
      caughtStatus: "Capturé",
      seedCategory: "Pokémon Graine",
      defaultCategory: "Pokémon {type}"
    },
    exportGame: {
      title: "Exporter JSON — {game}",
      subtitle: "Résumé structuré de vos Pokémon capturés et en attente dans ce jeu."
    },
    exportGlobal: {
      title: "Sauvegarde Globale JSON (BDD Complète)",
      subtitle: "Sauvegarde complète de votre avancée dans toutes les versions de jeux."
    },
    importModal: {
      title: "Importer la Progression (JSON)",
      subtitle: "Chargez les données d'une génération ou sauvegarde globale depuis un fichier ou en collant le code.",
      optionA: "Option A : Charger un fichier .json depuis votre appareil",
      selectFile: "Sélectionner un fichier .json",
      orSeparator: "— Ou en collant le code JSON directement —",
      optionB: "Option B : Coller le Code JSON",
      textareaPlaceholder: "Collez votre code JSON d'exportation ou sauvegarde ici..."
    },
    shareModal: {
      title: "Lien de Partage de Progression",
      subtitle: "Partagez l'avancée de votre Pokédex avec n'importe qui.",
      directLabel: "LIEN DIRECT DE VOTRE PROGRESSION :",
      disclaimer: "Toute personne disposant de ce lien pourra voir votre progression et l'intégrer à son propre Pokédex si elle le souhaite."
    }
  },
  sharedBanner: {
    viewing: "Consultation d'une progression partagée :",
    inGame: "dans {game}"
  },
  toasts: {
    caught: "✓ Capturé : {name}",
    pending: "⌛ Marqué comme en attente : {name}",
    gameChanged: "Jeu changé pour : {game}",
    modeChanged: "Mode changé pour le Pokédex {mode}",
    shinyOn: "Sprites Chromatiques Activés",
    shinyOff: "Sprites Normaux Activés",
    bulkCaught: "Pokémon visibles marqués comme capturés",
    bulkPending: "Pokémon visibles démarqués",
    resetConfirmed: "Progression de {game} réinitialisée.",
    shareCopied: "Lien de progression copié dans le presse-papiers.",
    shareSuccess: "Progression partagée.",
    importSuccess: "{mode} importé : +{count} Pokémon intégrés.",
    sharedSaved: "Progression de {game} sauvegardée dans votre Pokédex."
  },
  types: {
    Grass: "Plante", Fire: "Feu", Water: "Eau", Bug: "Insecte",
    Normal: "Normal", Poison: "Poison", Electric: "Électrik", Ground: "Sol",
    Fighting: "Combat", Psychic: "Psy", Rock: "Roche", Steel: "Acier",
    Ice: "Glace", Ghost: "Spectre", Dragon: "Dragon", Dark: "Ténèbres", Fairy: "Fée", Flying: "Vol"
  },
  statsNames: {
    hp: "PV", attack: "Attaque", defense: "Défense",
    spAttack: "Att. Spé", spDefense: "Déf. Spé", speed: "Vitesse"
  },
  footer: {
    desc: "Tracker de Pokédex multi-génération par jeu et édition (Gén 1 à 9, Légendes Z-A et Pokopia) avec sauvegarde locale, support 100% hors ligne PWA et sprites chromatiques.",
    sectionsTitle: "SECTIONS & OUTILS",
    langTitle: "LANGUES & INFOS",
    disclaimer: "© PauApps · MyPokeLog est un projet indépendant sans affiliation avec Nintendo, Game Freak ou The Pokémon Company."
  },
  eras: {
    gen1: "Gén 1 (Kanto)",
    gen2: "Gén 2 (Johto)",
    gen3: "Gén 3 (Hoenn)",
    gen4: "Gén 4 (Sinnoh)",
    gen5: "Gén 5 (Unys)",
    gen6: "Gén 6 (Kalos)",
    gen7: "Gén 7 (Alola)",
    gen8: "Gén 8 (Galar & DLCs)",
    gen9: "Gén 9 (Paldea / DLCs)",
    legends_special: "Légendes & Spéciaux"
  },

  games: {
    gen9_paldea: {
      name: "Gén 9 : Écarlate / Violet (Paldea)",
      label: "🔴 Écarlate / Violet (Paldea - 400 Rég / 1025 Nat)"
    },
    gen9_kitakami: {
      name: "Gén 9 : Écarlate / Violet — DLC 1 : Le Masque Turquoise (Septentria)",
      label: "🍃 DLC 1 : Le Masque Turquoise (Septentria - 200 Rég / 1025 Nat)"
    },
    gen9_blueberry: {
      name: "Gén 9 : Écarlate / Violet — DLC 2 : Le Disque Indigo (Institut Myrtille)",
      label: "🫐 DLC 2 : Le Disque Indigo (Institut Myrtille - 243 Rég / 1025 Nat)"
    },
    gen8_galar: {
      name: "Gén 8 : Épée / Bouclier (Galar)",
      label: "⚔️ Épée / Bouclier (Galar - 400 Rég / 898 Nat)"
    },
    gen8_isle_of_armor: {
      name: "Gén 8 : Épée / Bouclier — DLC 1 : L'Île Solitaire de l'Armure",
      label: "🛡️ DLC 1 : L'Île Solitaire de l'Armure (211 Rég / 898 Nat)"
    },
    gen8_crown_tundra: {
      name: "Gén 8 : Épée / Bouclier — DLC 2 : Les Terres Enneigées de la Couronne",
      label: "❄️ DLC 2 : Les Terres Enneigées de la Couronne (210 Rég / 898 Nat)"
    },
    gen7_alola_updated: {
      name: "Gén 7 : Ultra-Soleil / Ultra-Lune (Alola Mis à Jour)",
      label: "☀️ Ultra-Soleil / Ultra-Lune (Alola Mis à Jour - 403 Rég / 809 Nat)"
    },
    gen7_alola_original: {
      name: "Gén 7 : Soleil / Lune (Alola Original)",
      label: "🌴 Soleil / Lune (Alola Original - 302 Rég / 802 Nat)"
    },
    gen6_kalos: {
      name: "Gén 6 : X / Y (Kalos Complet)",
      label: "🏰 X / Y (Kalos - 454 Rég / 721 Nat)"
    },
    gen5_unova_updated: {
      name: "Gén 5 : Noir 2 / Blanc 2 (Unys Mis à Jour)",
      label: "🏙️ Noir 2 / Blanc 2 (Unys Mis à Jour - 301 Rég / 649 Nat)"
    },
    gen5_unova_original: {
      name: "Gén 5 : Noir / Blanc (Unys Original)",
      label: "⬛ Noir / Blanc (Unys Original - 156 Rég / 649 Nat)"
    },
    gen4_sinnoh_extended: {
      name: "Gén 4 : Platine (Sinnoh Étendu)",
      label: "❄️ Platine (Sinnoh Étendu - 210 Rég / 493 Nat)"
    },
    gen4_sinnoh_original: {
      name: "Gén 4 : Diamant / Perle (Sinnoh Original)",
      label: "💎 Diamant / Perle (Sinnoh Original - 151 Rég / 493 Nat)"
    },
    gen4_bdsp: {
      name: "Gén 4 : Diamant Étincelant / Perle Scintillante",
      label: "💎 Diamant Étincelant / Perle Scintillante (Sinnoh - 151 Rég / 493 Nat)"
    },
    gen3_emerald: {
      name: "Gén 3 : Émeraude / Rubis / Saphir (Hoenn Original)",
      label: "🟢 Émeraude / Rubis / Saphir (Hoenn - 202 Rég / 386 Nat)"
    },
    gen3_roza: {
      name: "Gén 3 : Rubis Oméga / Saphir Alpha (Hoenn Mis à Jour)",
      label: "🔴 ROSA (Hoenn Mis à Jour - 211 Rég / 721 Nat)"
    },
    gen2_gsc: {
      name: "Gén 2 : Or / Argent / Cristal (Johto Original)",
      label: "🟡 Or / Argent / Cristal (Johto - 251 Rég / 251 Nat)"
    },
    gen2_hgss: {
      name: "Gén 2 : HeartGold / SoulSilver (Johto Mis à Jour)",
      label: "🌙 HeartGold / SoulSilver (Johto Mis à Jour - 256 Rég / 493 Nat)"
    },
    gen1_rby: {
      name: "Gén 1 : Rouge / Bleu / Jaune (Kanto)",
      label: "🔴 Rouge / Bleu / Jaune (Kanto - 151 Rég / 151 Nat)"
    },
    gen1_leafgreen: {
      name: "Gén 1 : Rouge Feu / Vert Feuille (Kanto)",
      label: "🍃 Rouge Feu / Vert Feuille (Kanto - 151 Rég / 386 Nat)"
    },
    gen1_letsgo: {
      name: "Gén 1 : Let's Go Pikachu / Évoli (Kanto)",
      label: "⚡ Let's Go Pikachu / Évoli (Kanto - 153 Rég / 809 Nat)"
    },
    special_hisui: {
      name: "Légendes Pokémon : Arceus (Hisui)",
      label: "📜 Légendes Pokémon : Arceus (Hisui - 242 Rég / 898 Nat)"
    },
    special_legends_za: {
      name: "Légendes Pokémon : Z-A (Illumis)",
      label: "⚡ Légendes Pokémon : Z-A (Illumis - 232 Rég / 1025 Nat)"
    },
    special_pokopia: {
      name: "Pokémon Pokopia (Îles Pokopia)",
      label: "🏝️ Pokémon Pokopia (Pokopia - 300 Rég / 1025 Nat)"
    }
  }
};
