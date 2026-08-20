const pokemonCache = new Map();
const encountersCache = new Map();
const speciesCache = new Map();

/**
 * Fetches Pokémon detail information from PokéAPI with in-memory caching.
 * @param {number} id - National Pokémon ID
 * @returns {Promise<object|null>}
 */
export async function fetchPokemonDetails(id) {
  if (pokemonCache.has(id)) {
    return pokemonCache.get(id);
  }

  try {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    if (!res.ok) return null;
    const data = await res.json();
    pokemonCache.set(id, data);
    return data;
  } catch (err) {
    console.error(`Error fetching PokéAPI details for #${id}:`, err);
    return null;
  }
}

/**
 * Fetches Pokémon encounters from PokéAPI with in-memory caching.
 * @param {number} id - National Pokémon ID
 * @returns {Promise<Array|null>}
 */
export async function fetchPokemonEncounters(id) {
  if (encountersCache.has(id)) {
    return encountersCache.get(id);
  }

  try {
    const resEnc = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/encounters`);
    if (!resEnc.ok) return [];
    const data = await resEnc.json();
    encountersCache.set(id, data);
    return data;
  } catch (err) {
    console.error(`Error fetching PokéAPI encounters for #${id}:`, err);
    return [];
  }
}

/**
 * Fetches Pokémon species info (flavor text description & genera/category) with in-memory caching.
 * @param {number} id - National Pokémon ID
 * @returns {Promise<object|null>}
 */
export async function fetchPokemonSpecies(id) {
  if (speciesCache.has(id)) {
    return speciesCache.get(id);
  }

  try {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`);
    if (!res.ok) return null;
    const data = await res.json();
    speciesCache.set(id, data);
    return data;
  } catch (err) {
    console.error(`Error fetching PokéAPI species for #${id}:`, err);
    return null;
  }
}
