import { GEN_ERA_MAPPING } from '../data/gameConfigs.js';

export function findGenEraForGame(gameKey) {
  for (const [eraKey, group] of Object.entries(GEN_ERA_MAPPING)) {
    if (group.games.some(g => g.key === gameKey)) {
      return eraKey;
    }
  }
  const firstKey = Object.keys(GEN_ERA_MAPPING)[0];
  return firstKey || 'gen9';
}

export function renderGenEraSelector(genEraSelector) {
  if (!genEraSelector) return;
  const currentVal = genEraSelector.value;
  genEraSelector.innerHTML = Object.entries(GEN_ERA_MAPPING).map(([key, group]) =>
    `<option value="${key}">${group.label}</option>`
  ).join('');
  if (currentVal && GEN_ERA_MAPPING[currentVal]) {
    genEraSelector.value = currentVal;
  }
}

export function populateGameSelectorForEra(eraKey, genEraSelector, gameSelector, selectedGameKey = null) {
  if (!gameSelector) return;
  const group = GEN_ERA_MAPPING[eraKey] || GEN_ERA_MAPPING.gen9;
  gameSelector.innerHTML = '';

  group.games.forEach(g => {
    const opt = document.createElement('option');
    opt.value = g.key;
    opt.textContent = g.label;
    if (selectedGameKey && g.key === selectedGameKey) {
      opt.selected = true;
    }
    gameSelector.appendChild(opt);
  });

  if (genEraSelector) {
    genEraSelector.value = eraKey;
  }
}

let toastTimeout = null;

export function showToast(toastEl, toastMsg, message) {
  if (!toastEl || !toastMsg) return;
  toastMsg.textContent = message;
  toastEl.classList.add('show');
  if (toastTimeout) clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toastEl.classList.remove('show');
  }, 2500);
}

export function initCollapsibleCategories() {
  const isMobile = window.innerWidth <= 640;

  document.querySelectorAll('.collapsible-card').forEach(card => {
    const indicator = card.querySelector('.collapse-indicator');
    // La Categoría 1 siempre arranca desplegada por defecto
    if (card.id === 'cat-game-selection') {
      card.classList.remove('collapsed');
      if (indicator) indicator.textContent = '▾ Plegar';
    } else if (isMobile) {
      card.classList.add('collapsed');
      if (indicator) indicator.textContent = '▸ Desplegar';
    } else {
      card.classList.remove('collapsed');
      if (indicator) indicator.textContent = '▾ Plegar';
    }
  });

  document.querySelectorAll('.filter-category-header.collapsible').forEach(header => {
    header.addEventListener('click', () => {
      const card = header.closest('.collapsible-card');
      const indicator = header.querySelector('.collapse-indicator');
      if (card) {
        const isCollapsed = card.classList.toggle('collapsed');
        if (indicator) {
          indicator.textContent = isCollapsed ? '▸ Desplegar' : '▾ Plegar';
        }
      }
    });
  });
}
