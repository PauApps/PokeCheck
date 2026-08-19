export default {
  meta: {
    name: "Français",
    code: "fr",
    flag: "🇫🇷"
  },
  brand: {
    title: "MyPokeLog",
    tag: "Multi-Génération",
    subtitle: "Suivi Pokédex Régional & National (1025 Pokémon) — mypokelog.app"
  },
  stats: {
    badge: "Badge",
    caught: "Capturés",
    progress: "Progression",
    badges: {
      master: "Maître Pokédex",
      gold: "Or (75%)",
      silver: "Argent (50%)",
      bronze: "Bronze (25%)"
    }
  },
  categories: {
    cat1: "🎮 1. Sélection de Génération, Jeu & Mode Pokédex",
    cat2: "🔍 2. Recherche & Filtres Pokémon",
    cat3: "🛠️ 3. Outils & Options de Données",
    fold: "▾ Réduire",
    unfold: "▸ Déplier"
  },
  labels: {
    genEra: "1. GÉNÉRATION / SAGA",
    game: "2. ÉDITION / JEU",
    dexMode: "3. MODE POKÉDEX",
    searchPlaceholder: "Rechercher par nom ou N°...",
    statusFilter: "📊 Tous les états",
    caughtOnly: "✓ Capturés",
    missingOnly: "⏳ Manquants",
    allGens: "🌟 Toutes les Gen",
    allTypes: "⚡ Tous les types",
    completeBadge: "[COMPLÉTÉ]"
  },
  dexModes: {
    regional: "📍 Pokédex Régional (Jeu)",
    national: "🌐 Pokédex National Global"
  },
  buttons: {
    themeDark: "🌙 Sombre",
    themeLight: "☀️ Clair",
    shinyToggle: "✨ Sprites Shiny",
    exportGame: "📄 JSON Jeu Actif",
    exportGlobal: "🌐 Sauvegarde Globale (BDD)",
    importData: "📥 Importer Données (JSON)",
    share: "🔗 Partager",
    bulkToggle: "👁️ Marquer Visibles",
    reset: "🔄 Réinitialiser",
    moreInfo: "ℹ️ Plus d'infos",
    copy: "📋 Copier Lien",
    download: "💾 Télécharger Fichier",
    apply: "✅ Appliquer et Importer",
    saveToDex: "📥 Enregistrer dans mon Pokédex",
    closePreview: "❌ Fermer l'aperçu"
  },
  card: {
    caught: "✓ CAPTURÉ",
    pending: "⏳ MANQUANT",
    nationalSub: "Nat. #{id}",
    toggleTitle: "Cliquer pour marquer capturé / manquant"
  },
  confirm: {
    resetGame: "Êtes-vous sûr de vouloir réinitialiser toute la progression pour \"{game}\" ? Cette action est irréversible."
  },
  modals: {
    modalNav: {
      prev: "Précédent",
      next: "Suivant",
      hint: "Naviguer avec ◀ ▶"
    },
    detail: {
      height: "Taille",
      weight: "Poids",
      nationalNum: "N° National",
      baseStats: "Statistiques de base",
      locationsTitle: "Localisations dans {game}",
      methodTitle: "Méthode d'obtention / Habitat",
      fallbackText: "Obtenable via évolution, reproduction, habitats sauvages ou événements dans {game}.",
      loading: "Chargement des détails et méthodes d'obtention...",
      tableZone: "Lieu / Zone",
      tableEdition: "Édition",
      tableMethod: "Méthode et %",
      markPending: "❌ Marquer comme Manquant",
      markCaught: "✓ Marquer comme Capturé"
    },
    exportGame: {
      title: "Exportation JSON - {game}",
      subtitle: "Résumé des Pokémon capturés et manquants pour ce jeu."
    },
    exportGlobal: {
      title: "Sauvegarde Globale JSON (BDD Complète)",
      subtitle: "Sauvegarde complète avec les données enregistrées sur toutes les éditions."
    },
    importModal: {
      title: "📥 Importer la progression (JSON)",
      subtitle: "Chargez les données d'une génération ou une sauvegarde globale.",
      optionA: "📁 Option A: Charger le fichier .json depuis votre appareil",
      selectFile: "📂 Sélectionner Fichier .json",
      orSeparator: "— OU coller le code JSON directement —",
      optionB: "📝 Option B: Coller le code JSON",
      textareaPlaceholder: "Collez votre code JSON d'exportation ici..."
    },
    shareModal: {
      title: "🔗 Lien de Progression Partageable",
      subtitle: "Partagez votre progression Pokédex avec n'importe qui.",
      directLabel: "LIEN DIRECT DE VOTRE PROGRESSION:",
      disclaimer: "💡 Toute personne ouvrant ce lien verra votre progression et pourra la charger dans son Pokédex. Sans compte ni serveur."
    }
  },
  sharedBanner: {
    viewing: "Affichage de la progression partagée:",
    inGame: "dans {game}"
  },
  toasts: {
    caught: "✓ Capturé: {name}",
    pending: "⏳ Marqué comme manquant: {name}",
    gameChanged: "🎮 Jeu changé pour: {game}",
    modeChanged: "📍 Mode changé pour Pokédex {mode}",
    shinyOn: "✨ Sprites Shiny Activés",
    shinyOff: "🖼️ Sprites Normaux Activés",
    bulkCaught: "✓ Pokémon visibles marqués comme capturés",
    bulkPending: "⏳ Pokémon visibles démarqués",
    resetConfirmed: "🔄 Progression de {game} réinitialisée.",
    shareCopied: "🔗 Lien de progression copié dans le presse-papiers.",
    shareSuccess: "✨ Progression partagée.",
    importSuccess: "📥 {mode} importé: +{count} Pokémon intégrés.",
    sharedSaved: "✓ Progression de {game} enregistrée dans votre Pokédex."
  },
  types: {
    Grass: "Plante", Fire: "Feu", Water: "Eau", Bug: "Insecte",
    Normal: "Normal", Poison: "Poison", Electric: "Électrik", Ground: "Sol",
    Fighting: "Combat", Psychic: "Psy", Rock: "Roche", Steel: "Acier",
    Ice: "Glace", Ghost: "Spectre", Dragon: "Dragon", Dark: "Ténèbres", Fairy: "Fée"
  },
  statsNames: {
    hp: "PV", attack: "Attaque", defense: "Défense",
    spAttack: "Att. Spé", spDefense: "Déf. Spé", speed: "Vitesse"
  }
};
