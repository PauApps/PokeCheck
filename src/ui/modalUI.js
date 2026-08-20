import { POKEMON_DATA } from '../data/pokemonData.js';
import { TYPE_COLORS } from '../data/constants.js';
import { getPrimarySpriteUrl, handleImageError } from '../services/spriteService.js';
import { fetchPokemonDetails, fetchPokemonEncounters, fetchPokemonSpecies } from '../services/pokeapiService.js';
import { isGlobalShiny } from './themeUI.js';
import { getIcon } from './icons.js';
import { t, getLanguage } from '../i18n/i18nService.js';
import { getLocalizedGameName } from '../data/gameConfigs.js';

let activePokemonId = null;
let currentModalShiny = false;

function padId(id) {
  return String(id).padStart(3, '0');
}

// Map of region names by generation
const GEN_REGION_NAMES = {
  1: "Kanto",
  2: "Johto",
  3: "Hoenn",
  4: "Sinnoh",
  5: "Teselia / Unova",
  6: "Kalos",
  7: "Alola",
  8: "Galar",
  9: "Paldea"
};

function getRegionForPokemon(natId, gameConfig) {
  if (gameConfig && gameConfig.regionalDexName) {
    const rName = gameConfig.regionalDexName.split(' ')[0];
    if (rName) return rName;
  }
  if (natId <= 151) return "Kanto";
  if (natId <= 251) return "Johto";
  if (natId <= 386) return "Hoenn";
  if (natId <= 493) return "Sinnoh";
  if (natId <= 649) return "Teselia";
  if (natId <= 721) return "Kalos";
  if (natId <= 809) return "Alola";
  if (natId <= 905) return "Galar / Hisui";
  return "Paldea";
}

// Known starter / initial methods for special classic Pokémon
const SPECIAL_OBTAIN_METHODS = {
  1: { es: "Pokémon inicial: elígelo del Prof. Oak en Pueblo Paleta.", en: "Starter Pokémon: Choose from Prof. Oak in Pallet Town." },
  4: { es: "Pokémon inicial: elígelo del Prof. Oak en Pueblo Paleta.", en: "Starter Pokémon: Choose from Prof. Oak in Pallet Town." },
  7: { es: "Pokémon inicial: elígelo del Prof. Oak en Pueblo Paleta.", en: "Starter Pokémon: Choose from Prof. Oak in Pallet Town." },
  25: { es: "Encuentro salvaje en Bosque Verde o inicial en Pokémon Amarillo.", en: "Wild encounter in Viridian Forest or starter in Pokémon Yellow." },
  133: { es: "Regalo en la Mansión Azul de Ciudad Azulona.", en: "Gift at the Celadon Mansion in Celadon City." },
  152: { es: "Pokémon inicial: elígelo del Prof. Elm en Pueblo Primavera.", en: "Starter Pokémon: Choose from Prof. Elm in New Bark Town." },
  155: { es: "Pokémon inicial: elígelo del Prof. Elm en Pueblo Primavera.", en: "Starter Pokémon: Choose from Prof. Elm in New Bark Town." },
  158: { es: "Pokémon inicial: elígelo del Prof. Elm en Pueblo Primavera.", en: "Starter Pokémon: Choose from Prof. Elm in New Bark Town." },
  252: { es: "Pokémon inicial: elígelo del Prof. Abedul en Ruta 101.", en: "Starter Pokémon: Choose from Prof. Birch on Route 101." },
  255: { es: "Pokémon inicial: elígelo del Prof. Abedul en Ruta 101.", en: "Starter Pokémon: Choose from Prof. Birch on Route 101." },
  258: { es: "Pokémon inicial: elígelo del Prof. Abedul en Ruta 101.", en: "Starter Pokémon: Choose from Prof. Birch on Route 101." }
};

export function openModal(id, options) {
  const {
    activeList,
    caughtSet,
    gameConfig,
    modalElements,
    onToggleCaught
  } = options;

  activePokemonId = id;
  currentModalShiny = isGlobalShiny();

  const p = POKEMON_DATA.find(item => item.id === id);
  if (!p) return;

  const { modalOverlay, modalContainer } = modalElements;

  modalOverlay.classList.add('active');
  document.body.style.overflow = 'hidden';

  // Render initial loading / skeleton
  renderModalUI(p, null, null, null, {
    caughtSet,
    gameConfig,
    modalContainer,
    onToggleCaught,
    options
  });

  // Fetch API details asynchronously
  Promise.all([
    fetchPokemonDetails(id),
    fetchPokemonEncounters(id),
    fetchPokemonSpecies(id)
  ]).then(([apiDetails, encountersData, speciesData]) => {
    if (activePokemonId === id) {
      renderModalUI(p, apiDetails, encountersData, speciesData, {
        caughtSet,
        gameConfig,
        modalContainer,
        onToggleCaught,
        options
      });
    }
  });
}

export function navigateModal(direction, options) {
  const { activeList } = options;
  if (!activePokemonId) return;

  const currentIndex = activeList.findIndex(item => item.nationalNum === activePokemonId);
  if (currentIndex === -1) return;

  let nextIndex = currentIndex + direction;
  if (nextIndex < 0) nextIndex = activeList.length - 1;
  if (nextIndex >= activeList.length) nextIndex = 0;

  const targetP = activeList[nextIndex];
  if (targetP) {
    openModal(targetP.nationalNum, options);
  }
}

export function closeModal(modalElements) {
  const { modalOverlay } = modalElements;
  if (modalOverlay) {
    modalOverlay.classList.remove('active');
  }
  document.body.style.overflow = '';
}

function renderModalUI(p, apiDetails, encountersData, speciesData, context) {
  const { caughtSet, gameConfig, modalContainer, onToggleCaught, options } = context;
  const isCaught = caughtSet.has(p.id);
  const currentLang = getLanguage();

  const primaryColor = TYPE_COLORS[p.type1] || '#10b981';
  const spriteUrl = getPrimarySpriteUrl(p.id, currentModalShiny);
  const padNum = padId(p.id);

  // 1. Category / Genera
  let categoryText = t('modals.detail.defaultCategory', { type: t(`types.${p.type1}`) });
  if (speciesData && speciesData.genera) {
    const genEntry = speciesData.genera.find(g => g.language.name === currentLang) ||
                     speciesData.genera.find(g => g.language.name === 'es') ||
                     speciesData.genera.find(g => g.language.name === 'en');
    if (genEntry) {
      categoryText = genEntry.genus;
    }
  }

  // 2. Type pills
  const tType1 = t(`types.${p.type1}`);
  const color1 = TYPE_COLORS[p.type1] || '#78c850';
  let typesHTML = `<span class="type-pill" style="border-color: ${color1}; color: ${color1};">${tType1}</span>`;
  if (p.type2) {
    const tType2 = t(`types.${p.type2}`);
    const color2 = TYPE_COLORS[p.type2] || '#a040a0';
    typesHTML += `<span class="type-pill" style="border-color: ${color2}; color: ${color2};">${tType2}</span>`;
  }

  // 3. Region
  const regionName = getRegionForPokemon(p.id, gameConfig);

  // 4. How to get
  let howToGetText = SPECIAL_OBTAIN_METHODS[p.id] ? (SPECIAL_OBTAIN_METHODS[p.id][currentLang] || SPECIAL_OBTAIN_METHODS[p.id].es) : null;
  if (!howToGetText && encountersData && Array.isArray(encountersData) && encountersData.length > 0) {
    const targetVersions = gameConfig.versions || [];
    const matchedEnc = encountersData.find(enc => enc.version_details.some(vd => targetVersions.includes(vd.version.name))) || encountersData[0];
    if (matchedEnc) {
      const locName = matchedEnc.location_area.name.replace(/-/g, ' ');
      const formattedLoc = locName.charAt(0).toUpperCase() + locName.slice(1);
      howToGetText = `${formattedLoc}.`;
    }
  }
  if (!howToGetText) {
    const localizedGName = gameConfig ? getLocalizedGameName(gameConfig.key) : 'Pokemon';
    howToGetText = t('modals.detail.fallbackText', { game: localizedGName });
  }

  // 5. Description (Flavor text)
  let descriptionText = t('modals.detail.loading');
  if (speciesData && speciesData.flavor_text_entries) {
    const flavorEntry = speciesData.flavor_text_entries.find(f => f.language.name === currentLang) ||
                        speciesData.flavor_text_entries.find(f => f.language.name === 'es') ||
                        speciesData.flavor_text_entries.find(f => f.language.name === 'en');
    if (flavorEntry) {
      descriptionText = flavorEntry.flavor_text.replace(/[\n\f]/g, ' ');
    }
  } else if (!speciesData) {
    descriptionText = `${p.name} #${padNum} (${t(`types.${p.type1}`)}).`;
  }

  modalContainer.innerHTML = `
    <div class="modal-card-dialog" style="--primary-glow: ${primaryColor};">
      <div class="modal-card-top-bar">
        <span class="modal-card-id">#${padNum}</span>
        <button type="button" class="btn-modal-close" id="modal-close-btn" aria-label="Cerrar" title="Cerrar">
          ${getIcon('close')}
        </button>
      </div>

      <div class="modal-sprite-hero-row">
        <button type="button" class="btn-modal-side-arrow" id="modal-prev-btn" aria-label="Anterior" title="Anterior">
          ${getIcon('arrowLeft')}
        </button>
        <div class="modal-sprite-hero">
          <div class="modal-sprite-glow"></div>
          <img class="modal-hero-sprite" src="${spriteUrl}" alt="${p.name}">
        </div>
        <button type="button" class="btn-modal-side-arrow" id="modal-next-btn" aria-label="Siguiente" title="Siguiente">
          ${getIcon('arrowRight')}
        </button>
      </div>

      <div class="modal-title-section">
        <h2 class="modal-pokemon-name">${p.name}</h2>
        <div class="modal-pokemon-category">${categoryText}</div>
        <div class="modal-pokemon-types">
          ${typesHTML}
        </div>
      </div>

      <div class="modal-info-list">
        <!-- REGIÓN -->
        <div class="modal-info-row">
          <div class="info-row-icon" style="color: #10b981;">
            ${getIcon('compass')}
          </div>
          <div class="info-row-content">
            <div class="info-row-label" data-i18n="modals.detail.region">${t('modals.detail.region')}</div>
            <div class="info-row-value">${regionName}</div>
          </div>
        </div>

        <!-- CÓMO CONSEGUIRLO -->
        <div class="modal-info-row">
          <div class="info-row-icon" style="color: #10b981;">
            ${getIcon('location')}
          </div>
          <div class="info-row-content">
            <div class="info-row-label" data-i18n="modals.detail.howToGet">${t('modals.detail.howToGet')}</div>
            <div class="info-row-value">${howToGetText}</div>
          </div>
        </div>

        <!-- DESCRIPCIÓN -->
        <div class="modal-info-row">
          <div class="info-row-icon" style="color: #10b981;">
            ${getIcon('book')}
          </div>
          <div class="info-row-content">
            <div class="info-row-label" data-i18n="modals.detail.description">${t('modals.detail.description')}</div>
            <div class="info-row-value info-description-text">${descriptionText}</div>
          </div>
        </div>

        <!-- ESTADO -->
        <div class="modal-info-row">
          <div class="info-row-icon" style="color: #10b981;">
            ${getIcon('sparkles')}
          </div>
          <div class="info-row-content">
            <div class="info-row-label" data-i18n="modals.detail.state">${t('modals.detail.state')}</div>
            <div class="info-row-value ${isCaught ? 'status-val-caught' : 'status-val-pending'}">
              ${isCaught ? t('modals.detail.caughtStatus') : t('modals.detail.pendingStatus')}
            </div>
          </div>
        </div>
      </div>

      <!-- BOTÓN PRINCIPAL -->
      <div class="modal-action-bar">
        <button type="button" class="btn-modal-capture ${isCaught ? 'btn-modal-is-caught' : 'btn-modal-is-pending'}" id="modal-main-action-btn">
          ${isCaught ? t('modals.detail.markPending') : t('modals.detail.markCaught')}
        </button>
      </div>
    </div>
  `;

  const heroImg = modalContainer.querySelector('.modal-hero-sprite');
  if (heroImg) {
    heroImg.addEventListener('error', function() {
      handleImageError(this, p.id, false, currentModalShiny);
    });
  }

  const prevBtn = modalContainer.querySelector('#modal-prev-btn');
  if (prevBtn) {
    prevBtn.addEventListener('click', () => navigateModal(-1, options));
  }

  const nextBtn = modalContainer.querySelector('#modal-next-btn');
  if (nextBtn) {
    nextBtn.addEventListener('click', () => navigateModal(1, options));
  }

  const closeBtn = modalContainer.querySelector('#modal-close-btn');
  if (closeBtn) {
    closeBtn.addEventListener('click', () => closeModal({ modalOverlay: modalContainer.closest('.modal-overlay') }));
  }

  const mainActionBtn = modalContainer.querySelector('#modal-main-action-btn');
  if (mainActionBtn) {
    mainActionBtn.addEventListener('click', () => {
      const nextState = !isCaught;
      if (onToggleCaught) onToggleCaught(p.id, nextState);
      // Close modal following mock UX intent
      closeModal({ modalOverlay: modalContainer.closest('.modal-overlay') });
    });
  }
}

export function toggleModalShiny(modalSprite) {
  currentModalShiny = !currentModalShiny;
  if (activePokemonId && modalSprite) {
    modalSprite.src = getPrimarySpriteUrl(activePokemonId, currentModalShiny);
  }
  return currentModalShiny;
}
