/**
 * MyPokeLog — Game & Pokédex Configuration
 *
 * Each game declares syntax Pokédex(es) it has officially.
 * No "universal National Dex" — each National Dex is game-specific.
 *
 * Model:
 *   GAME_CONFIGS[gameKey] = {
 *     name: string,
 *     dexes: [
 *       {
 *         id: string,          // unique global dex ID
 *         name: string,        // display name
 *         type: 'regional' | 'national',
 *         storageKey: string,  // localStorage key
 *         dexKey: string       // key into DEX_REGISTRY (dexRegistry.js)
 *       }, ...
 *     ]
 *   }
 */

import { t } from '../i18n/i18nService.js';

export const GAME_CONFIGS = {

  // =============================================
  // GEN 1 — Kanto
  // =============================================

  gen1_rby: {
    key: "gen1_rby",
    get name() { return getLocalizedGameName("gen1_rby"); },
    get regionalDexName() { return getLocalizedRegionName("gen1_rby"); },
    dexes: [
      { id: 'gen1_rby_kanto',        name: 'Kanto',   type: 'regional', storageKey: 'dex_gen1_rby_kanto',        dexKey: 'kanto' }
    ]
  },

  gen1_leafgreen: {
    key: "gen1_leafgreen",
    get name() { return getLocalizedGameName("gen1_leafgreen"); },
    get regionalDexName() { return getLocalizedRegionName("gen1_leafgreen"); },
    dexes: [
      { id: 'gen1_frlg_kanto',       name: 'Kanto',   type: 'regional', storageKey: 'dex_gen1_frlg_kanto',       dexKey: 'kanto' },
      { id: 'gen1_frlg_national',    name: 'Nacional', type: 'national', storageKey: 'dex_gen1_frlg_national',    dexKey: 'national_386' }
    ]
  },

  gen1_letsgo: {
    key: "gen1_letsgo",
    get name() { return getLocalizedGameName("gen1_letsgo"); },
    get regionalDexName() { return getLocalizedRegionName("gen1_letsgo"); },
    dexes: [
      { id: 'gen1_letsgo_kanto',     name: 'Kanto',   type: 'regional', storageKey: 'dex_gen1_letsgo_kanto',     dexKey: 'letsgo_kanto' }
    ]
  },

  // =============================================
  // GEN 2 — Johto
  // =============================================

  gen2_gsc: {
    key: "gen2_gsc",
    get name() { return getLocalizedGameName("gen2_gsc"); },
    get regionalDexName() { return getLocalizedRegionName("gen2_gsc"); },
    dexes: [
      { id: 'gen2_gsc_johto',        name: 'Johto',   type: 'regional', storageKey: 'dex_gen2_gsc_johto',        dexKey: 'original_johto' }
    ]
  },

  gen2_hgss: {
    key: "gen2_hgss",
    get name() { return getLocalizedGameName("gen2_hgss"); },
    get regionalDexName() { return getLocalizedRegionName("gen2_hgss"); },
    dexes: [
      { id: 'gen2_hgss_johto',       name: 'Johto',   type: 'regional', storageKey: 'dex_gen2_hgss_johto',       dexKey: 'updated_johto' },
      { id: 'gen2_hgss_national',    name: 'Nacional', type: 'national', storageKey: 'dex_gen2_hgss_national',    dexKey: 'national_493' }
    ]
  },

  // =============================================
  // GEN 3 — Hoenn
  // =============================================

  gen3_emerald: {
    key: "gen3_emerald",
    get name() { return getLocalizedGameName("gen3_emerald"); },
    get regionalDexName() { return getLocalizedRegionName("gen3_emerald"); },
    dexes: [
      { id: 'gen3_rse_hoenn',        name: 'Hoenn',   type: 'regional', storageKey: 'dex_gen3_rse_hoenn',        dexKey: 'hoenn' },
      { id: 'gen3_rse_national',     name: 'Nacional', type: 'national', storageKey: 'dex_gen3_rse_national',     dexKey: 'national_386' }
    ]
  },

  gen3_roza: {
    key: "gen3_roza",
    get name() { return getLocalizedGameName("gen3_roza"); },
    get regionalDexName() { return getLocalizedRegionName("gen3_roza"); },
    dexes: [
      { id: 'gen3_oras_hoenn',       name: 'Hoenn',   type: 'regional', storageKey: 'dex_gen3_oras_hoenn',       dexKey: 'updated_hoenn' },
      { id: 'gen3_oras_national',    name: 'Nacional', type: 'national', storageKey: 'dex_gen3_oras_national',    dexKey: 'national_721' }
    ]
  },

  // =============================================
  // GEN 4 — Sinnoh
  // =============================================

  gen4_sinnoh_original: {
    key: "gen4_sinnoh_original",
    get name() { return getLocalizedGameName("gen4_sinnoh_original"); },
    get regionalDexName() { return getLocalizedRegionName("gen4_sinnoh_original"); },
    dexes: [
      { id: 'gen4_dp_sinnoh',        name: 'Sinnoh',  type: 'regional', storageKey: 'dex_gen4_dp_sinnoh',        dexKey: 'original_sinnoh' },
      { id: 'gen4_dp_national',      name: 'Nacional', type: 'national', storageKey: 'dex_gen4_dp_national',      dexKey: 'national_493' }
    ]
  },

  gen4_sinnoh_extended: {
    key: "gen4_sinnoh_extended",
    get name() { return getLocalizedGameName("gen4_sinnoh_extended"); },
    get regionalDexName() { return getLocalizedRegionName("gen4_sinnoh_extended"); },
    dexes: [
      { id: 'gen4_platinum_sinnoh',  name: 'Sinnoh',  type: 'regional', storageKey: 'dex_gen4_platinum_sinnoh',  dexKey: 'extended_sinnoh' },
      { id: 'gen4_platinum_national',name: 'Nacional', type: 'national', storageKey: 'dex_gen4_platinum_national',dexKey: 'national_493' }
    ]
  },

  gen4_bdsp: {
    key: "gen4_bdsp",
    get name() { return getLocalizedGameName("gen4_bdsp"); },
    get regionalDexName() { return getLocalizedRegionName("gen4_bdsp"); },
    dexes: [
      { id: 'gen4_bdsp_sinnoh',      name: 'Sinnoh',  type: 'regional', storageKey: 'dex_gen4_bdsp_sinnoh',      dexKey: 'original_sinnoh' },
      { id: 'gen4_bdsp_national',    name: 'Nacional', type: 'national', storageKey: 'dex_gen4_bdsp_national',    dexKey: 'national_493' }
    ]
  },

  // =============================================
  // GEN 5 — Unova / Teselia
  // =============================================

  gen5_unova_original: {
    key: "gen5_unova_original",
    get name() { return getLocalizedGameName("gen5_unova_original"); },
    get regionalDexName() { return getLocalizedRegionName("gen5_unova_original"); },
    dexes: [
      { id: 'gen5_bw_unova',         name: 'Teselia', type: 'regional', storageKey: 'dex_gen5_bw_unova',         dexKey: 'original_unova' },
      { id: 'gen5_bw_national',      name: 'Nacional', type: 'national', storageKey: 'dex_gen5_bw_national',      dexKey: 'national_649' }
    ]
  },

  gen5_unova_updated: {
    key: "gen5_unova_updated",
    get name() { return getLocalizedGameName("gen5_unova_updated"); },
    get regionalDexName() { return getLocalizedRegionName("gen5_unova_updated"); },
    dexes: [
      { id: 'gen5_b2w2_unova',       name: 'Teselia', type: 'regional', storageKey: 'dex_gen5_b2w2_unova',       dexKey: 'updated_unova' },
      { id: 'gen5_b2w2_national',    name: 'Nacional', type: 'national', storageKey: 'dex_gen5_b2w2_national',    dexKey: 'national_649' }
    ]
  },

  // =============================================
  // GEN 6 — Kalos
  // =============================================

  gen6_kalos: {
    key: "gen6_kalos",
    get name() { return getLocalizedGameName("gen6_kalos"); },
    get regionalDexName() { return getLocalizedRegionName("gen6_kalos"); },
    dexes: [
      { id: 'gen6_xy_central',       name: 'Kalos Central',  type: 'regional', storageKey: 'dex_gen6_xy_central',       dexKey: 'kalos_central' },
      { id: 'gen6_xy_coastal',       name: 'Kalos Costera',  type: 'regional', storageKey: 'dex_gen6_xy_coastal',       dexKey: 'kalos_coastal' },
      { id: 'gen6_xy_mountain',      name: 'Kalos Montaña',  type: 'regional', storageKey: 'dex_gen6_xy_mountain',      dexKey: 'kalos_mountain' },
      { id: 'gen6_xy_national',      name: 'Nacional',       type: 'national', storageKey: 'dex_gen6_xy_national',      dexKey: 'national_721' }
    ]
  },

  // =============================================
  // GEN 7 — Alola
  // =============================================

  gen7_alola_original: {
    key: "gen7_alola_original",
    get name() { return getLocalizedGameName("gen7_alola_original"); },
    get regionalDexName() { return getLocalizedRegionName("gen7_alola_original"); },
    dexes: [
      { id: 'gen7_sm_alola',         name: 'Alola',   type: 'regional', storageKey: 'dex_gen7_sm_alola',         dexKey: 'original_alola' }
    ]
  },

  gen7_alola_updated: {
    key: "gen7_alola_updated",
    get name() { return getLocalizedGameName("gen7_alola_updated"); },
    get regionalDexName() { return getLocalizedRegionName("gen7_alola_updated"); },
    dexes: [
      { id: 'gen7_usum_alola',       name: 'Alola',   type: 'regional', storageKey: 'dex_gen7_usum_alola',       dexKey: 'updated_alola' }
    ]
  },

  // =============================================
  // GEN 8 — Galar
  // =============================================

  gen8_galar: {
    key: "gen8_galar",
    get name() { return getLocalizedGameName("gen8_galar"); },
    get regionalDexName() { return getLocalizedRegionName("gen8_galar"); },
    dexes: [
      { id: 'gen8_swsh_galar',       name: 'Galar',              type: 'regional', storageKey: 'dex_gen8_swsh_galar',       dexKey: 'galar' }
    ]
  },

  gen8_isle_of_armor: {
    key: "gen8_isle_of_armor",
    get name() { return getLocalizedGameName("gen8_isle_of_armor"); },
    get regionalDexName() { return getLocalizedRegionName("gen8_isle_of_armor"); },
    dexes: [
      { id: 'gen8_armor_isle',       name: 'Isla de la Armadura', type: 'regional', storageKey: 'dex_gen8_armor_isle',       dexKey: 'isle_of_armor' }
    ]
  },

  gen8_crown_tundra: {
    key: "gen8_crown_tundra",
    get name() { return getLocalizedGameName("gen8_crown_tundra"); },
    get regionalDexName() { return getLocalizedRegionName("gen8_crown_tundra"); },
    dexes: [
      { id: 'gen8_tundra_crown',     name: 'Corona de las Nieves', type: 'regional', storageKey: 'dex_gen8_tundra_crown',     dexKey: 'crown_tundra' }
    ]
  },

  // =============================================
  // GEN 9 — Paldea
  // =============================================

  gen9_paldea: {
    key: "gen9_paldea",
    get name() { return getLocalizedGameName("gen9_paldea"); },
    get regionalDexName() { return getLocalizedRegionName("gen9_paldea"); },
    dexes: [
      { id: 'gen9_sv_paldea',        name: 'Paldea',            type: 'regional', storageKey: 'dex_gen9_sv_paldea',        dexKey: 'paldea' }
    ]
  },

  gen9_kitakami: {
    key: "gen9_kitakami",
    get name() { return getLocalizedGameName("gen9_kitakami"); },
    get regionalDexName() { return getLocalizedRegionName("gen9_kitakami"); },
    dexes: [
      { id: 'gen9_dlc1_kitakami',    name: 'Kitakami',          type: 'regional', storageKey: 'dex_gen9_dlc1_kitakami',    dexKey: 'kitakami' }
    ]
  },

  gen9_blueberry: {
    key: "gen9_blueberry",
    get name() { return getLocalizedGameName("gen9_blueberry"); },
    get regionalDexName() { return getLocalizedRegionName("gen9_blueberry"); },
    dexes: [
      { id: 'gen9_dlc2_blueberry',   name: 'Academia Arándano', type: 'regional', storageKey: 'dex_gen9_dlc2_blueberry',   dexKey: 'blueberry' }
    ]
  },

  // =============================================
  // ESPECIALES — Leyendas
  // =============================================

  special_hisui: {
    key: "special_hisui",
    get name() { return getLocalizedGameName("special_hisui"); },
    get regionalDexName() { return getLocalizedRegionName("special_hisui"); },
    dexes: [
      { id: 'special_hisui_main',    name: 'Hisui',             type: 'regional', storageKey: 'dex_special_hisui_main',    dexKey: 'hisui' }
    ]
  },

  special_legends_za: {
    key: "special_legends_za",
    get name() { return getLocalizedGameName("special_legends_za"); },
    get regionalDexName() { return getLocalizedRegionName("special_legends_za"); },
    dexes: [
      { id: 'special_za_lumiose',    name: 'Luminalia',         type: 'regional', storageKey: 'dex_special_za_lumiose',    dexKey: 'legends_za' },
      { id: 'special_za_hyperspace', name: 'Hiperespacio',      type: 'regional', storageKey: 'dex_special_za_hyperspace', dexKey: 'hyperspace' }
    ]
  },

  special_pokopia: {
    key: "special_pokopia",
    get name() { return getLocalizedGameName("special_pokopia"); },
    get regionalDexName() { return getLocalizedRegionName("special_pokopia"); },
    dexes: [
      { id: 'special_pokopia_main',  name: 'Pokédex',           type: 'regional', storageKey: 'dex_special_pokopia_main',  dexKey: 'pokopia' }
    ]
  }
};

// =============================================
// GEN ERA MAPPING — for generation/game selectors
// =============================================

export const GEN_ERA_MAPPING = {
  gen1: {
    label: "Gen 1 (Kanto)",
    games: [
      { key: "gen1_rby",       label: "🔴 Rojo / Azul / Amarillo (Kanto - 151)" },
      { key: "gen1_leafgreen", label: "🍃 Verde Hoja / Rojo Fuego (Kanto - 151)" },
      { key: "gen1_letsgo",    label: "⚡ Let's Go Pikachu / Eevee (Kanto - 153)" }
    ]
  },
  gen2: {
    label: "Gen 2 (Johto)",
    games: [
      { key: "gen2_gsc",  label: "🟡 Oro / Plata / Cristal (Johto - 251)" },
      { key: "gen2_hgss", label: "🌙 HeartGold / SoulSilver (Johto Actualizada - 256)" }
    ]
  },
  gen3: {
    label: "Gen 3 (Hoenn)",
    games: [
      { key: "gen3_emerald", label: "🟢 Esmeralda / Rubí / Zafiro (Hoenn - 202)" },
      { key: "gen3_roza",    label: "🔴 ROZA (Hoenn Actualizada - 211)" }
    ]
  },
  gen4: {
    label: "Gen 4 (Sinnoh)",
    games: [
      { key: "gen4_sinnoh_extended", label: "❄️ Platino (Sinnoh Ampliada - 210)" },
      { key: "gen4_sinnoh_original", label: "💎 Diamante / Perla (Sinnoh Original - 151)" },
      { key: "gen4_bdsp",            label: "💎 Diamante Brillante / Perla Reluciente (Sinnoh - 151)" }
    ]
  },
  gen5: {
    label: "Gen 5 (Teselia)",
    games: [
      { key: "gen5_unova_updated",  label: "🏙️ Negro 2 / Blanco 2 (Teselia Actualizada - 301)" },
      { key: "gen5_unova_original", label: "⬛ Negro / Blanco (Teselia Original - 156)" }
    ]
  },
  gen6: {
    label: "Gen 6 (Kalos)",
    games: [
      { key: "gen6_kalos", label: "🏰 X / Y (Kalos - 454)" }
    ]
  },
  gen7: {
    label: "Gen 7 (Alola)",
    games: [
      { key: "gen7_alola_updated",  label: "☀️ Ultrasol / Ultramona (Alola Actualizada - 403)" },
      { key: "gen7_alola_original", label: "🌴 Sol / Luna (Alola Original - 302)" }
    ]
  },
  gen8: {
    label: "Gen 8 (Galar & DLCs)",
    games: [
      { key: "gen8_galar",         label: "⚔️ Espada / Escudo (Galar - 400)" },
      { key: "gen8_isle_of_armor", label: "🛡️ DLC 1: Isla de la Armadura (211)" },
      { key: "gen8_crown_tundra",  label: "❄️ DLC 2: Las Nieves de la Corona (210)" }
    ]
  },
  gen9: {
    label: "Gen 9 (Paldea / DLCs)",
    games: [
      { key: "gen9_paldea",    label: "🔴 Escarlata / Púrpura (Paldea - 400)" },
      { key: "gen9_kitakami",  label: "🍃 DLC 1: La máscara turquesa (Norarca - 200)" },
      { key: "gen9_blueberry", label: "🫐 DLC 2: El disco índigo (Academia Arándano - 243)" }
    ]
  },
  legends_special: {
    label: "Leyendas & Especiales",
    games: [
      { key: "special_hisui",      label: "📜 Pokémon Leyendas: Arceus (Hisui - 242)" },
      { key: "special_legends_za", label: "⚡ Pokémon Leyendas: Z-A (Luminalia - 232)" },
      { key: "special_pokopia",    label: "🏝️ Pokémon Pokopia (Pokopia - 300)" }
    ]
  }
};




/**
 * Helper: get the first dex config for a game
 */
export function getFirstDex(gameKey) {
  const game = GAME_CONFIGS[gameKey];
  if (!game || !game.dexes || game.dexes.length === 0) return null;
  return game.dexes[0];
}

/**
 * Helper: get a specific dex config by dexId within a game
 */
export function getDexConfig(gameKey, dexId) {
  const game = GAME_CONFIGS[gameKey];
  if (!game || !game.dexes) return null;
  return game.dexes.find(d => d.id === dexId) || game.dexes[0];
}

const RAW_GAME_NAMES = {
  gen1_rby: "Gen 1: Rojo / Azul / Amarillo",
  gen1_leafgreen: "Gen 1: Rojo Fuego / Verde Hoja",
  gen1_letsgo: "Gen 1: Let's Go Pikachu / Eevee",
  gen2_gsc: "Gen 2: Oro / Plata / Cristal",
  gen2_hgss: "Gen 2: HeartGold / SoulSilver",
  gen3_emerald: "Gen 3: Rubí / Zafiro / Esmeralda",
  gen3_roza: "Gen 3: Rubí Omega / Zafiro Alfa",
  gen4_sinnoh_original: "Gen 4: Diamante / Perla",
  gen4_sinnoh_extended: "Gen 4: Platino",
  gen4_bdsp: "Gen 4: Diamante Brillante / Perla Reluciente",
  gen5_unova_original: "Gen 5: Negro / Blanco",
  gen5_unova_updated: "Gen 5: Negro 2 / Blanco 2",
  gen6_kalos: "Gen 6: X / Y",
  gen7_alola_original: "Gen 7: Sol / Luna",
  gen7_alola_updated: "Gen 7: Ultrasol / Ultraluna",
  gen8_galar: "Gen 8: Espada / Escudo",
  gen8_isle_of_armor: "Gen 8: Espada / Escudo — DLC 1: Isla de la Armadura",
  gen8_crown_tundra: "Gen 8: Espada / Escudo — DLC 2: Las Nieves de la Corona",
  gen9_paldea: "Gen 9: Escarlata / Púrpura",
  gen9_kitakami: "Gen 9: Escarlata / Púrpura — DLC 1: La máscara turquesa",
  gen9_blueberry: "Gen 9: Escarlata / Púrpura — DLC 2: El disco índigo",
  special_hisui: "Pokémon Leyendas: Arceus",
  special_legends_za: "Pokémon Leyendas: Z-A",
  special_pokopia: "Pokémon Pokopia"
};

export function getLocalizedGameName(gameKey) {
  const key = gameKey || 'gen9_paldea';
  const val = t(`games.${key}.name`);
  if (val && !val.startsWith('games.')) return val;
  return RAW_GAME_NAMES[key] || key;
}

export function getLocalizedGameLabel(gameKey) {
  const key = gameKey || 'gen9_paldea';
  const val = t(`games.${key}.label`);
  if (val && !val.startsWith('games.')) return val;
  return RAW_GAME_NAMES[key] || key;
}


export function getLocalizedRegionName(gameOrRegionKey) {
  const regionMap = {
    gen1_rby: 'kanto', gen1_leafgreen: 'kanto', gen1_letsgo: 'kanto',
    gen2_gsc: 'original_johto', gen2_hgss: 'updated_johto',
    gen3_emerald: 'hoenn', gen3_roza: 'hoenn',
    gen4_sinnoh_original: 'original_sinnoh', gen4_sinnoh_extended: 'extended_sinnoh', gen4_bdsp: 'original_sinnoh',
    gen5_unova_original: 'original_unova', gen5_unova_updated: 'updated_unova',
    gen6_kalos: 'kalos',
    gen7_alola_original: 'original_alola', gen7_alola_updated: 'updated_alola',
    gen8_galar: 'galar', gen8_isle_of_armor: 'isle_of_armor', gen8_crown_tundra: 'crown_tundra',
    gen9_paldea: 'paldea', gen9_kitakami: 'kitakami', gen9_blueberry: 'blueberry',
    special_hisui: 'hisui', special_legends_za: 'lumiose', special_pokopia: 'pokopia'
  };
  const regKey = regionMap[gameOrRegionKey] || gameOrRegionKey || 'kanto';
  const val = t(`regions.${regKey}`);
  if (val && !val.startsWith('regions.')) return val;
  return regKey;
}

export function getLocalizedEraLabel(eraKey) {
  const val = t(`eras.${eraKey}`);
  if (val && !val.startsWith('eras.')) return val;
  return GEN_ERA_MAPPING[eraKey]?.label || eraKey;
}

export function getLocalizedDexName(dex) {
  if (!dex) return '';
  if (dex.type === 'national') {
    const natTrans = t('dexModes.national');
    if (natTrans && !natTrans.startsWith('dexModes.')) return natTrans;
    return 'Pokédex Nacional';
  }
  const regTrans = t(`regions.${dex.dexKey}`);
  if (regTrans && !regTrans.startsWith('regions.')) return regTrans;
  return dex.name || 'Regional';
}

