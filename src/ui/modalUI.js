import { POKEMON_DATA } from '../data/pokemonData.js';
import { TYPE_COLORS } from '../data/constants.js';
import { getPrimarySpriteUrl, handleImageError } from '../services/spriteService.js';
import { fetchPokemonDetails, fetchPokemonEncounters } from '../services/pokeapiService.js';
import { isGlobalShiny } from './themeUI.js';
import { t } from '../i18n/i18nService.js';

let activePokemonId = null;
let currentModalShiny = false;

function padId(id) {
  return String(id).padStart(3, '0');
}

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

  const currentIndex = activeList.findIndex(item => item.nationalNum === id);

  let prevP = null;
  let nextP = null;

  if (currentIndex !== -1 && activeList.length > 1) {
    const prevIdx = currentIndex === 0 ? activeList.length - 1 : currentIndex - 1;
    const nextIdx = currentIndex === activeList.length - 1 ? 0 : currentIndex + 1;
    prevP = activeList[prevIdx];
    nextP = activeList[nextIdx];
  }

  const {
    modalOverlay, modalCloseBtn, modalPrevBtn, modalNextBtn,
    modalPrevLabel, modalNextLabel, modalSprite, modalId, modalName,
    modalTypes, modalBodyContent, shinyToggleBtn
  } = modalElements;

  if (prevP) {
    modalPrevBtn.style.visibility = 'visible';
    modalPrevLabel.textContent = prevP.name;
  } else {
    modalPrevBtn.style.visibility = 'hidden';
  }

  if (nextP) {
    modalNextBtn.style.visibility = 'visible';
    modalNextLabel.textContent = nextP.name;
  } else {
    modalNextBtn.style.visibility = 'hidden';
  }

  const p = POKEMON_DATA.find(item => item.id === id);
  if (!p) return;

  const currentItem = activeList.find(item => item.nationalNum === id);
  const displayTag = currentItem ? currentItem.displayId : padId(p.id);

  modalId.textContent = `#${displayTag}`;
  modalName.textContent = p.name;

  const tType1 = t(`types.${p.type1}`);
  let typesHTML = `<span class="type-badge" style="background-color: ${TYPE_COLORS[p.type1] || '#a8a878'}">${tType1}</span>`;
  if (p.type2) {
    const tType2 = t(`types.${p.type2}`);
    typesHTML += `<span class="type-badge" style="background-color: ${TYPE_COLORS[p.type2] || '#a8a878'}">${tType2}</span>`;
  }
  modalTypes.innerHTML = typesHTML;

  modalSprite.src = getPrimarySpriteUrl(id, currentModalShiny);
  modalSprite.onerror = function() {
    handleImageError(this, id, currentModalShiny, isGlobalShiny());
  };

  if (shinyToggleBtn) {
    shinyToggleBtn.classList.toggle('active', currentModalShiny);
  }

  modalBodyContent.innerHTML = `
    <div style="text-align: center; padding: 20px; color: var(--text-muted);">
      <div class="loading-spinner"></div>
      <p>${t('modals.detail.loading')}</p>
    </div>
  `;

  modalOverlay.classList.add('active');
  document.body.style.overflow = 'hidden';

  // Fetch API details asynchronously
  Promise.all([
    fetchPokemonDetails(id),
    fetchPokemonEncounters(id)
  ]).then(([apiDetails, encountersData]) => {
    if (activePokemonId === id) {
      renderModalContent(p, apiDetails, encountersData, {
        caughtSet,
        gameConfig,
        modalBodyContent,
        onToggleCaught
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
  modalOverlay.classList.remove('active');
  document.body.style.overflow = '';
}

function renderModalContent(p, apiDetails, encountersData, context) {
  const { caughtSet, gameConfig, modalBodyContent, onToggleCaught } = context;
  const isCaught = caughtSet.has(p.id);
  const targetVersions = gameConfig.versions || [];
  const gameEncounters = [];

  if (encountersData && Array.isArray(encountersData)) {
    encountersData.forEach(enc => {
      const match = enc.version_details.find(vd => targetVersions.includes(vd.version.name));
      if (match) {
        const locName = enc.location_area.name.replace(/-/g, ' ');
        const formattedLoc = locName.charAt(0).toUpperCase() + locName.slice(1);
        gameEncounters.push({
          location: formattedLoc,
          version: match.version.name,
          chance: match.max_chance,
          method: match.encounter_details[0]?.method?.name?.replace(/-/g, ' ') || 'encounter'
        });
      }
    });
  }

  const fallbackText = t('modals.detail.fallbackText', { game: gameConfig.name });

  let encountersHTML = '';
  if (gameEncounters.length > 0) {
    const rows = gameEncounters.slice(0, 5).map(e => `
      <tr>
        <td style="text-transform: capitalize; font-weight: 500;">${e.location}</td>
        <td><span class="version-badge">${e.version}</span></td>
        <td>${e.method} (${e.chance}%)</td>
      </tr>
    `).join('');

    encountersHTML = `
      <div style="margin-top: 16px;">
        <h4 style="font-size: 13px; text-transform: uppercase; color: var(--text-muted); margin-bottom: 8px;">${t('modals.detail.locationsTitle', { game: gameConfig.name })}</h4>
        <table class="encounter-table">
          <thead>
            <tr>
              <th>${t('modals.detail.tableZone')}</th>
              <th>${t('modals.detail.tableEdition')}</th>
              <th>${t('modals.detail.tableMethod')}</th>
            </tr>
          </thead>
          <tbody>
            ${rows}
          </tbody>
        </table>
      </div>
    `;
  } else {
    encountersHTML = `
      <div style="margin-top: 16px; background: rgba(255,255,255,0.03); padding: 12px; border-radius: 8px; border: 1px dashed var(--border);">
        <h4 style="font-size: 13px; text-transform: uppercase; color: var(--text-muted); margin-bottom: 4px;">${t('modals.detail.methodTitle')}</h4>
        <p style="font-size: 13px; color: var(--text-muted); margin: 0;">${fallbackText}</p>
      </div>
    `;
  }

  let statsHTML = '';
  if (apiDetails && apiDetails.stats) {
    const statBars = apiDetails.stats.map(s => {
      const nameMap = {
        'hp': t('statsNames.hp'),
        'attack': t('statsNames.attack'),
        'defense': t('statsNames.defense'),
        'special-attack': t('statsNames.spAttack'),
        'special-defense': t('statsNames.spDefense'),
        'speed': t('statsNames.speed')
      };
      const statName = nameMap[s.stat.name] || s.stat.name;
      const pct = Math.min(100, (s.base_stat / 180) * 100);
      return `
        <div style="display: flex; align-items: center; gap: 8px; font-size: 12px; margin-bottom: 4px;">
          <span style="width: 70px; color: var(--text-muted);">${statName}</span>
          <span style="width: 30px; font-weight: bold; text-align: right;">${s.base_stat}</span>
          <div style="flex: 1; height: 6px; background: var(--surface-hover); border-radius: 3px; overflow: hidden;">
            <div style="width: ${pct}%; height: 100%; background: var(--accent);"></div>
          </div>
        </div>
      `;
    }).join('');

    statsHTML = `
      <div style="margin-top: 16px;">
        <h4 style="font-size: 13px; text-transform: uppercase; color: var(--text-muted); margin-bottom: 8px;">${t('modals.detail.baseStats')}</h4>
        ${statBars}
      </div>
    `;
  }

  const heightM = apiDetails?.height ? (apiDetails.height / 10).toFixed(1) : '?';
  const weightKg = apiDetails?.weight ? (apiDetails.weight / 10).toFixed(1) : '?';

  modalBodyContent.innerHTML = `
    <div style="display: flex; gap: 16px; margin-bottom: 16px; font-size: 13px; background: rgba(255,255,255,0.02); padding: 10px; border-radius: 8px;">
      <div><strong>${t('modals.detail.height')}:</strong> ${heightM} m</div>
      <div><strong>${t('modals.detail.weight')}:</strong> ${weightKg} kg</div>
      <div><strong>${t('modals.detail.nationalNum')}:</strong> #${padId(p.id)}</div>
    </div>
    ${statsHTML}
    ${encountersHTML}
    <div style="margin-top: 20px; display: flex; justify-content: flex-end;">
      <button class="btn ${isCaught ? '' : 'btn-accent'}" id="modal-toggle-caught-btn">
        ${isCaught ? t('modals.detail.markPending') : t('modals.detail.markCaught')}
      </button>
    </div>
  `;

  const toggleBtn = modalBodyContent.querySelector('#modal-toggle-caught-btn');
  toggleBtn.addEventListener('click', () => {
    const nextState = !isCaught;
    if (onToggleCaught) onToggleCaught(p.id, nextState);
    renderModalContent(p, apiDetails, encountersData, context);
  });
}

export function toggleModalShiny(modalSprite) {
  currentModalShiny = !currentModalShiny;
  if (activePokemonId && modalSprite) {
    modalSprite.src = getPrimarySpriteUrl(activePokemonId, currentModalShiny);
  }
  return currentModalShiny;
}
