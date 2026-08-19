import { IMAGE_SOURCES, FALLBACK_SVG } from '../data/constants.js';

export function getPrimarySpriteUrl(id, shiny = false) {
  if (shiny) {
    return `https://cdn.jsdelivr.net/gh/PokeAPI/sprites@master/sprites/pokemon/shiny/${id}.png`;
  }
  return IMAGE_SOURCES[0](id);
}

export function handleImageError(img, id, isShiny = false, globalShinyMode = false) {
  let attempt = parseInt(img.dataset.attempt || '0') + 1;
  img.dataset.attempt = attempt;

  if (isShiny || globalShinyMode) {
    if (attempt === 1) {
      img.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/${id}.png`;
    } else {
      img.src = FALLBACK_SVG;
    }
  } else {
    if (attempt < IMAGE_SOURCES.length) {
      img.src = IMAGE_SOURCES[attempt](id);
    } else {
      img.src = FALLBACK_SVG;
    }
  }
}
