import { TYPE_COLORS } from '../data/constants.js';
import { getPrimarySpriteUrl, handleImageError } from '../services/spriteService.js';
import { isGlobalShiny } from './themeUI.js';

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
 * Renders the Pokédex grid cards using DocumentFragment for maximum performance.
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

  gridEl.innerHTML = '';
  const fragment = document.createDocumentFragment();

  const query = (filters.query || '').trim().toLowerCase();
  const status = filters.status || 'all';
  const genVal = filters.genVal || 'all';
  const type = filters.type || 'all';

  const filtered = activeList.filter(p => {
    const matchesQuery = p.name.toLowerCase().includes(query) || 
                         p.displayId.includes(query) || 
                         String(p.nationalNum).includes(query);
    const isCaught = caughtSet.has(p.nationalNum);
    const matchesStatus = (status === 'all') || 
                          (status === 'caught' && isCaught) || 
                          (status === 'missing' && !isCaught);
    const matchesGen = genVal === 'all' || belongsToGen(p.nationalNum, genVal);
    const matchesType = (type === 'all') || (p.type1 === type || p.type2 === type);

    return matchesQuery && matchesStatus && matchesGen && matchesType;
  });

  const shinyMode = isGlobalShiny();

  filtered.forEach(p => {
    const isCaught = caughtSet.has(p.nationalNum);
    const card = document.createElement('div');
    card.className = `card ${isCaught ? 'caught' : ''}`;
    card.dataset.id = p.nationalNum;

    let typesHTML = `<span class="type-badge" style="background-color: ${TYPE_COLORS[p.type1] || '#a8a878'}">${p.type1}</span>`;
    if (p.type2) {
      typesHTML += `<span class="type-badge" style="background-color: ${TYPE_COLORS[p.type2] || '#a8a878'}">${p.type2}</span>`;
    }

    let natSubHTML = '';
    if (currentDexMode === 'regional' && p.nationalNum && p.nationalNum !== p.regionalNum) {
      natSubHTML = `<div class="card-nat-subid">Nat. #${String(p.nationalNum).padStart(3, '0')}</div>`;
    }

    const spriteUrl = getPrimarySpriteUrl(p.nationalNum, shinyMode);

    card.innerHTML = `
      <div class="card-content" title="Haz clic para marcar/desmarcar capturado">
        <span class="card-id">#${p.displayId}</span>
        <span class="card-status-badge">${isCaught ? '✓ CAPTURADO' : '⏳ PENDIENTE'}</span>
        <div class="card-sprite-container">
          <img class="card-sprite" src="${spriteUrl}" alt="${p.name}" loading="lazy">
        </div>
        <div class="card-name">${p.name}</div>
        ${natSubHTML}
        <div class="card-types" style="margin-top: 4px;">${typesHTML}</div>
      </div>
      <button class="card-info-btn" data-id="${p.nationalNum}" title="Ver ficha y método de obtención">
        ℹ️ MÁS INFO
      </button>
    `;

    const cardSprite = card.querySelector('.card-sprite');
    cardSprite.addEventListener('error', function() {
      handleImageError(this, p.nationalNum, false, shinyMode);
    });

    const cardContent = card.querySelector('.card-content');
    const infoBtn = card.querySelector('.card-info-btn');

    infoBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (onOpenModal) onOpenModal(p.nationalNum);
    });

    cardContent.addEventListener('click', () => {
      if (onToggleCaught) onToggleCaught(p.nationalNum, !caughtSet.has(p.nationalNum));
    });

    fragment.appendChild(card);
  });

  gridEl.appendChild(fragment);
}
