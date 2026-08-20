/**
 * DEX_REGISTRY — Central Pokédex ID Registry
 *
 * Maps dexKey strings (referenced in GAME_CONFIGS) to arrays of National IDs
 * in official regional order.
 *
 * Usage:
 *   import { DEX_REGISTRY } from './dexRegistry.js';
 *   const ids = DEX_REGISTRY[dexConfig.dexKey];
 */

import { REGIONAL_DEXES } from './regionalDexes.js';

/**
 * Generate a sequential National Dex array from 1 to max (inclusive).
 */
function nationalRange(max) {
  return Array.from({ length: max }, (_, i) => i + 1);
}

export const DEX_REGISTRY = {
  // ── Gen 1 ──────────────────────────────────────────────
  kanto:              REGIONAL_DEXES.kanto,           // 151
  letsgo_kanto:       REGIONAL_DEXES.letsgo_kanto,   // 153

  // ── Gen 2 ──────────────────────────────────────────────
  original_johto:     REGIONAL_DEXES.original_johto, // 251
  updated_johto:      REGIONAL_DEXES.updated_johto,  // 256 (HGSS)

  // ── Gen 3 ──────────────────────────────────────────────
  hoenn:              REGIONAL_DEXES.hoenn,           // 202 (RSE)
  updated_hoenn:      REGIONAL_DEXES.updated_hoenn,  // 211 (ORAS)

  // ── Gen 4 ──────────────────────────────────────────────
  original_sinnoh:    REGIONAL_DEXES.original_sinnoh,// 151 (DP / BDSP)
  extended_sinnoh:    REGIONAL_DEXES.extended_sinnoh,// 210 (Platinum)

  // ── Gen 5 ──────────────────────────────────────────────
  original_unova:     REGIONAL_DEXES.original_unova, // 156 (BW)
  updated_unova:      REGIONAL_DEXES.updated_unova,  // 301 (B2W2)

  // ── Gen 6 ──────────────────────────────────────────────
  kalos_central:      REGIONAL_DEXES.kalos_central,  // 153
  kalos_coastal:      REGIONAL_DEXES.kalos_coastal,  // 153
  kalos_mountain:     REGIONAL_DEXES.kalos_mountain, // 151

  // ── Gen 7 ──────────────────────────────────────────────
  original_alola:     REGIONAL_DEXES.original_alola, // 302 (SM)
  updated_alola:      REGIONAL_DEXES.updated_alola,  // 403 (USUM)

  // ── Gen 8 ──────────────────────────────────────────────
  galar:              REGIONAL_DEXES.galar,           // 400
  isle_of_armor:      REGIONAL_DEXES.isle_of_armor,  // 211
  crown_tundra:       REGIONAL_DEXES.crown_tundra,   // 210
  hisui:              REGIONAL_DEXES.hisui,           // 242

  // ── Gen 9 ──────────────────────────────────────────────
  paldea:             REGIONAL_DEXES.paldea,          // 400
  kitakami:           REGIONAL_DEXES.kitakami,        // 200
  blueberry:          REGIONAL_DEXES.blueberry,       // 243

  // ── Specials ───────────────────────────────────────────
  legends_za:         REGIONAL_DEXES.legends_za,      // 232 (Lumiose)
  hyperspace:         REGIONAL_DEXES.hyperspace,      // 132
  pokopia:            REGIONAL_DEXES.pokopia,         // 300

  // ── National Dexes (game-specific) ────────────────────
  // Generated as sequential ranges — NOT a universal National Dex.
  national_386:       nationalRange(386),  // Gen 1-3 (FRLG, RSE)
  national_493:       nationalRange(493),  // Gen 1-4 (DP, Platinum, HGSS, BDSP)
  national_649:       nationalRange(649),  // Gen 1-5 (BW, B2W2)
  national_721:       nationalRange(721),  // Gen 1-6 (XY, ORAS)
};
