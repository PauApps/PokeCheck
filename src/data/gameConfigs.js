import { REGIONAL_DEXES } from "./regionalDexes.js";

export const GAME_CONFIGS = {
      gen9_paldea: {
        name: "Gen 9: Escarlata / Púrpura (Paldea)",
        regionalDexName: "Paldea Regional (400)",
        regionalIds: REGIONAL_DEXES.paldea,
        nationalMaxId: 1025,
        versions: ['scarlet', 'violet'],
        storageKey: 'pokedex_caught_gen9_paldea'
      },
      gen9_kitakami: {
        name: "Gen 9: Escarlata / Púrpura — DLC 1: La máscara turquesa (Norarca)",
        regionalDexName: "La máscara turquesa - Norarca (200)",
        regionalIds: REGIONAL_DEXES.kitakami,
        nationalMaxId: 1025,
        versions: ['scarlet', 'violet'],
        storageKey: 'pokedex_caught_gen9_kitakami'
      },
      gen9_blueberry: {
        name: "Gen 9: Escarlata / Púrpura — DLC 2: El disco índigo (Academia Arándano)",
        regionalDexName: "El disco índigo - Arándano (243)",
        regionalIds: REGIONAL_DEXES.blueberry,
        nationalMaxId: 1025,
        versions: ['scarlet', 'violet'],
        storageKey: 'pokedex_caught_gen9_blueberry'
      },
      gen_legends_za: {
        name: "Pokémon Leyendas: Z-A (Ciudad Luminalia)",
        regionalDexName: "Luminalia Regional (232)",
        regionalIds: REGIONAL_DEXES.legends_za,
        nationalMaxId: 1025,
        versions: ['x', 'y', 'omega-ruby', 'alpha-sapphire', 'scarlet', 'violet', 'legends-za'],
        storageKey: 'pokedex_caught_legends_za'
      },
      gen_pokopia: {
        name: "Pokémon Pokopia (Islas Pokopia)",
        regionalDexName: "Pokopia Regional (300)",
        regionalIds: REGIONAL_DEXES.pokopia,
        nationalMaxId: 1025,
        versions: ['scarlet', 'violet', 'sword', 'shield'],
        storageKey: 'pokedex_caught_pokopia'
      },
      gen8_galar: {
        name: "Gen 8: Espada / Escudo (Galar)",
        regionalDexName: "Galar Regional (400)",
        regionalIds: REGIONAL_DEXES.galar,
        nationalMaxId: 898,
        versions: ['sword', 'shield'],
        storageKey: 'pokedex_caught_gen8_galar'
      },
      gen8_isle_of_armor: {
        name: "Gen 8: Espada / Escudo - Isla de la Armadura (DLC)",
        regionalDexName: "Isla de la Armadura (211)",
        regionalIds: REGIONAL_DEXES.isle_of_armor,
        nationalMaxId: 898,
        versions: ['sword', 'shield'],
        storageKey: 'pokedex_caught_gen8_armor'
      },
      gen8_crown_tundra: {
        name: "Gen 8: Espada / Escudo - Las Nieves de la Corona (DLC)",
        regionalDexName: "Las Nieves de la Corona (210)",
        regionalIds: REGIONAL_DEXES.crown_tundra,
        nationalMaxId: 898,
        versions: ['sword', 'shield'],
        storageKey: 'pokedex_caught_gen8_tundra'
      },
      gen8_hisui: {
        name: "Gen 8: Leyendas Arceus (Hisui)",
        regionalDexName: "Hisui Regional (242)",
        regionalIds: REGIONAL_DEXES.hisui,
        nationalMaxId: 898,
        versions: ['legends-arceus'],
        storageKey: 'pokedex_caught_gen8_hisui'
      },
      gen7_alola_updated: {
        name: "Gen 7: Ultrasol / Ultramona (Alola Actualizada)",
        regionalDexName: "Alola Actualizada (403)",
        regionalIds: REGIONAL_DEXES.updated_alola,
        nationalMaxId: 809,
        versions: ['ultra-sun', 'ultra-moon'],
        storageKey: 'pokedex_caught_gen7_ultra'
      },
      gen7_alola_original: {
        name: "Gen 7: Sol / Luna (Alola Original)",
        regionalDexName: "Alola Original (302)",
        regionalIds: REGIONAL_DEXES.original_alola,
        nationalMaxId: 802,
        versions: ['sun', 'moon'],
        storageKey: 'pokedex_caught_gen7_alola'
      },
      gen7_letsgo: {
        name: "Gen 7: Let's Go Pikachu / Eevee (Kanto)",
        regionalDexName: "Let's Go Kanto (153)",
        regionalIds: REGIONAL_DEXES.letsgo_kanto,
        nationalMaxId: 809,
        versions: ['lets-go-pikachu', 'lets-go-eevee'],
        storageKey: 'pokedex_caught_gen7_letsgo'
      },
      gen6_kalos: {
        name: "Gen 6: X / Y (Kalos Completa)",
        regionalDexName: "Kalos Regional (454)",
        regionalIds: REGIONAL_DEXES.kalos,
        nationalMaxId: 721,
        versions: ['x', 'y'],
        storageKey: 'pokedex_caught_gen6_kalos'
      },
      gen6_hoenn_updated: {
        name: "Gen 6: Rubí Omega / Zafiro Alfa (Hoenn Actualizada)",
        regionalDexName: "Hoenn Actualizada (211)",
        regionalIds: REGIONAL_DEXES.updated_hoenn,
        nationalMaxId: 721,
        versions: ['omega-ruby', 'alpha-sapphire'],
        storageKey: 'pokedex_caught_gen6_roza'
      },
      gen5_unova_updated: {
        name: "Gen 5: Negro 2 / Blanco 2 (Teselia Actualizada)",
        regionalDexName: "Teselia Actualizada (301)",
        regionalIds: REGIONAL_DEXES.updated_unova,
        nationalMaxId: 649,
        versions: ['black-2', 'white-2'],
        storageKey: 'pokedex_caught_gen5_b2w2'
      },
      gen5_unova_original: {
        name: "Gen 5: Negro / Blanco (Teselia Original)",
        regionalDexName: "Teselia Original (156)",
        regionalIds: REGIONAL_DEXES.original_unova,
        nationalMaxId: 649,
        versions: ['black', 'white'],
        storageKey: 'pokedex_caught_gen5_unova'
      },
      gen4_sinnoh_extended: {
        name: "Gen 4: Platino (Sinnoh Ampliada)",
        regionalDexName: "Sinnoh Platí (210)",
        regionalIds: REGIONAL_DEXES.extended_sinnoh,
        nationalMaxId: 493,
        versions: ['platinum'],
        storageKey: 'pokedex_caught_gen4_platinum'
      },
      gen4_sinnoh_original: {
        name: "Gen 4: Diamante / Perla (Sinnoh Original)",
        regionalDexName: "Sinnoh Original (151)",
        regionalIds: REGIONAL_DEXES.original_sinnoh,
        nationalMaxId: 493,
        versions: ['diamond', 'pearl'],
        storageKey: 'pokedex_caught_gen4_sinnoh'
      },
      gen4_johto_updated: {
        name: "Gen 4: HeartGold / SoulSilver (Johto Actualizada)",
        regionalDexName: "Johto Actualizada (256)",
        regionalIds: REGIONAL_DEXES.updated_johto,
        nationalMaxId: 493,
        versions: ['heartgold', 'soulsilver'],
        storageKey: 'pokedex_caught_gen4_hgss'
      },
      gen3_leafgreen: {
        name: "Gen 3: Verde Hoja / Rojo Fuego (Kanto)",
        regionalDexName: "Kanto Regional (151)",
        regionalIds: REGIONAL_DEXES.kanto,
        nationalMaxId: 386,
        versions: ['firered', 'leafgreen'],
        storageKey: 'pokedex_caught_gen3_kanto'
      },
      gen3_emerald: {
        name: "Gen 3: Esmeralda / Rubí / Zafiro (Hoenn Original)",
        regionalDexName: "Hoenn Original (202)",
        regionalIds: REGIONAL_DEXES.hoenn,
        nationalMaxId: 386,
        versions: ['ruby', 'sapphire', 'emerald'],
        storageKey: 'pokedex_caught_gen3_hoenn'
      },
      gen2_gsc: {
        name: "Gen 2: Oro / Plata / Cristal (Johto Original)",
        regionalDexName: "Johto Original (251)",
        regionalIds: REGIONAL_DEXES.original_johto,
        nationalMaxId: 251,
        versions: ['gold', 'silver', 'crystal'],
        storageKey: 'pokedex_caught_gen2_johto'
      },
      gen1_rby: {
        name: "Gen 1: Rojo / Azul / Amarillo (Kanto)",
        regionalDexName: "Kanto Original (151)",
        regionalIds: REGIONAL_DEXES.kanto,
        nationalMaxId: 151,
        versions: ['red', 'blue', 'yellow'],
        storageKey: 'pokedex_caught_gen1_kanto'
      }
    };

export const GEN_ERA_MAPPING = {
  gen9: {
    label: "🔴 Gen 9 (Paldea / DLCs)",
    games: [
      { key: "gen9_paldea", label: "🔴 Escarlata / Púrpura (Paldea - 400 Reg / 1025 Nat)" },
      { key: "gen9_kitakami", label: "🍃 DLC 1: La máscara turquesa (Norarca - 200 Reg / 1025 Nat)" },
      { key: "gen9_blueberry", label: "🫐 DLC 2: El disco índigo (Academia Arándano - 243 Reg / 1025 Nat)" }
    ]
  },
  gen8: {
    label: "⚔️ Gen 8 (Galar & DLCs)",
    games: [
      { key: "gen8_galar", label: "⚔️ Espada / Escudo (Galar - 400 Reg / 898 Nat)" },
      { key: "gen8_isle_of_armor", label: "🛡️ DLC 1: Isla de la Armadura (211 Reg / 898 Nat)" },
      { key: "gen8_crown_tundra", label: "❄️ DLC 2: Las Nieves de la Corona (210 Reg / 898 Nat)" }
    ]
  },
  gen7: {
    label: "☀️ Gen 7 (Alola)",
    games: [
      { key: "gen7_alola_updated", label: "☀️ Ultrasol / Ultramona (Alola - 403 Reg / 809 Nat)" },
      { key: "gen7_alola_original", label: "🌴 Sol / Luna (Alola Original - 302 Reg / 802 Nat)" }
    ]
  },
  gen6: {
    label: "🏰 Gen 6 (Kalos)",
    games: [
      { key: "gen6_kalos", label: "🏰 X / Y (Kalos - 454 Reg / 721 Nat)" }
    ]
  },
  gen5: {
    label: "🏙️ Gen 5 (Teselia)",
    games: [
      { key: "gen5_unova_updated", label: "🏙️ Negro 2 / Blanco 2 (Teselia Actualizada - 301 Reg / 649 Nat)" },
      { key: "gen5_unova_original", label: "⬛ Negro / Blanco (Teselia Original - 156 Reg / 649 Nat)" }
    ]
  },
  gen4: {
    label: "❄️ Gen 4 (Sinnoh)",
    games: [
      { key: "gen4_sinnoh_extended", label: "❄️ Platino (Sinnoh Ampliada - 210 Reg / 493 Nat)" },
      { key: "gen4_sinnoh_original", label: "💎 Diamante / Perla (Sinnoh Original - 151 Reg / 493 Nat)" }
    ]
  },
  gen3: {
    label: "🟢 Gen 3 (Hoenn)",
    games: [
      { key: "gen3_emerald", label: "🟢 Esmeralda / Rubí / Zafiro (Hoenn - 202 Reg / 386 Nat)" },
      { key: "gen6_hoenn_updated", label: "🔴 ROZA (Hoenn Actualizada - 211 Reg / 721 Nat)" }
    ]
  },
  gen2: {
    label: "🟡 Gen 2 (Johto)",
    games: [
      { key: "gen2_gsc", label: "🟡 Oro / Plata / Cristal (Johto - 251 Reg / 251 Nat)" },
      { key: "gen4_johto_updated", label: "🌙 HeartGold / SoulSilver (Johto Actualizada - 256 Reg / 493 Nat)" }
    ]
  },
  gen1: {
    label: "🔴 Gen 1 (Kanto)",
    games: [
      { key: "gen1_rby", label: "🔴 Rojo / Azul / Amarillo (Kanto - 151 Reg / 151 Nat)" },
      { key: "gen3_leafgreen", label: "🍃 Verde Hoja / Rojo Fuego (Kanto - 151 Reg / 386 Nat)" },
      { key: "gen7_letsgo", label: "⚡ Let's Go Pikachu / Eevee (Kanto - 153 Reg / 809 Nat)" }
    ]
  },
  legends_special: {
    label: "⚡ Leyendas & Especiales",
    games: [
      { key: "gen8_hisui", label: "📜 Leyendas Arceus (Hisui - 242 Reg / 898 Nat)" },
      { key: "gen_legends_za", label: "⚡ Pokémon Leyendas: Z-A (Luminalia - 232 Reg / 1025 Nat)" },
      { key: "gen_pokopia", label: "🏝️ Pokémon Pokopia (Pokopia - 300 Reg / 1025 Nat)" }
    ]
  }
};
