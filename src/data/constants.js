export const TYPE_COLORS = {
  Grass: '#78c850', Fire: '#f08030', Water: '#6890f0', Bug: '#a8b820',
  Normal: '#a8a878', Poison: '#a040a0', Electric: '#f8d030', Ground: '#e0c068',
  Fairy: '#ee99ac', Fighting: '#c03028', Psychic: '#f85888', Rock: '#b8a038',
  Steel: '#b8b8d0', Ice: '#98d8d8', Ghost: '#705898', Dragon: '#7038f8', Dark: '#705848'
};

export const IMAGE_SOURCES = [
  id => `https://cdn.jsdelivr.net/gh/PokeAPI/sprites@master/sprites/pokemon/${id}.png`,
  id => `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`,
  id => `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${String(id).padStart(3, '0')}.png`,
  id => `https://cdn.jsdelivr.net/gh/PokeAPI/sprites@master/sprites/pokemon/other/official-artwork/${id}.png`
];

export const FALLBACK_SVG = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 100 100'><circle cx='50' cy='50' r='45' fill='%23ef4444'/><path d='M 5 50 A 45 45 0 0 0 95 50 Z' fill='%23ffffff'/><line x1='5' y1='50' x2='95' y2='50' stroke='%23111827' stroke-width='8'/><circle cx='50' cy='50' r='14' fill='%23111827'/><circle cx='50' cy='50' r='8' fill='%23ffffff'/></svg>";