import { TYPE_COLORS } from '../data/constants.js';
import { getPrimarySpriteUrl, handleImageError } from '../services/spriteService.js';
import { isGlobalShiny } from './themeUI.js';
import { getIcon } from './icons.js';
import { t } from '../i18n/i18nService.js';

export function belongsToGen(nationalNum, genVal) {
  const gen = parseInt(genVal);
  const ranges = {
    1: [1, 151],
    2: [152, 251],
    3: [252, 386],
    4: [387, 493],
    5: [494, 649],
    6: [650, 721],
    7: [722, 809],
    8: [810, 905],
    9: [906, 1025]
  };
  if (!ranges[gen]) return true;
  return nationalNum >= ranges[gen][0] && nationalNum <= ranges[gen][1];
}

/**
 * Renders the Pokédex grid cards matching Mock 4
 */
export function renderGrid(options) {
  const {
    gridEl,
    activeList,
    caughtSet,
    filters,
    currentDexMode,
    onToggleCaught,
    onOpenModal
  } = options;

  if (!gridEl) return;
  gridEl.innerHTML = '';
  const fragment = document.createDocumentFragment();

  const query = (filters.query || '').trim().toLowerCase();
  const status = filters.status || 'all';
  const genVal = filters.genVal || 'all';
  const selectedTypes = Array.isArray(filters.types) ? filters.types : (filters.type && filters.type !== 'all' ? [filters.type] : []);

  const filtered = activeList.filter(p => {
    const matchesQuery = !query || 
      p.name.toLowerCase().includes(query) || 
      p.displayId.includes(query) || 
      String(p.nationalNum).includes(query);

    const isCaught = caughtSet.has(p.nationalNum);
    const matchesStatus = (status === 'all') || 
                          (status === 'caught' && isCaught) || 
                          (status === 'missing' && !isCaught);

    const matchesGen = genVal === 'all' || belongsToGen(p.nationalNum, genVal);

    let matchesType = true;
    if (selectedTypes.length > 0) {
      matchesType = selectedTypes.includes(p.type1) || (p.type2 && selectedTypes.includes(p.type2));
    }

    return matchesQuery && matchesStatus && matchesGen && matchesType;
  });

  if (filtered.length === 0) {
    const emptyEl = document.createElement('div');
    emptyEl.className = 'grid-empty-state';
    emptyEl.innerHTML = `
      <div class="empty-icon">${getIcon('search')}</div>
      <p>${t('labels.noResults')}</p>
    `;
    gridEl.appendChild(emptyEl);
    return;
  }

  const shinyMode = isGlobalShiny();

  filtered.forEach(p => {
    const isCaught = caughtSet.has(p.nationalNum);
    const card = document.createElement('div');
    card.className = `pokemon-card ${isCaught ? 'caught' : 'pending'}`;
    card.dataset.id = p.nationalNum;

    // Type pills with semantic outline border
    const tType1 = t(`types.${p.type1}`);
    const color1 = TYPE_COLORS[p.type1] || '#78c850';
    let typesHTML = `<span class="type-pill" style="border-color: ${color1}; color: ${color1};">${tType1}</span>`;
    
    if (p.type2) {
      const tType2 = t(`types.${p.type2}`);
      const color2 = TYPE_COLORS[p.type2] || '#a040a0';
      typesHTML += `<span class="type-pill" style="border-color: ${color2}; color: ${color2};">${tType2}</span>`;
    }

    const spriteUrl = getPrimarySpriteUrl(p.nationalNum, shinyMode);
    const natIdStr = String(p.nationalNum).padStart(3, '0');

    card.innerHTML = `
      <div class="pokemon-card-body">
        <div class="pokemon-card-top-row">
          <span class="pokemon-card-num">#${p.displayId}</span>
          <span class="pokemon-card-badge ${isCaught ? 'badge-caught' : 'badge-pending'}">
            ${isCaught ? `<span class="badge-icon">${getIcon('check')}</span> ${t('card.caught')}` : `<span class="badge-icon">${getIcon('pending')}</span> ${t('card.pending')}`}
          </span>
        </div>

        <div class="pokemon-card-sprite-wrap">
          <img class="pokemon-card-sprite ${isCaught ? 'sprite-caught' : 'sprite-pending'}" src="${spriteUrl}" alt="${p.name}" loading="lazy">
        </div>

        <div class="pokemon-card-name">${p.name}</div>
        <div class="pokemon-card-nat">Nat. #${natIdStr}</div>

        <div class="pokemon-card-types">
          ${typesHTML}
        </div>
      </div>

      <div class="pokemon-card-actions">
        <button type="button" class="btn-card-info" data-id="${p.nationalNum}">
          <span class="btn-icon">${getIcon('info')}</span>
          <span>${t('card.moreInfo')}</span>
        </button>
      </div>
    `;

    const spriteImg = card.querySelector('.pokemon-card-sprite');
    spriteImg.addEventListener('error', function() {
      handleImageError(this, p.nationalNum, false, shinyMode);
    });

    const infoBtn = card.querySelector('.btn-card-info');

    // Clicking anywhere on the card toggles caught status
    card.addEventListener('click', () => {
      onToggleCaught(p.nationalNum, !isCaught);
    });

    // Clicking "Más info" opens the modal
    infoBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      onOpenModal(p.nationalNum);
    });

    fragment.appendChild(card);
  });

  gridEl.appendChild(fragment);
}
