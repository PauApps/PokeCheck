import { GEN_ERA_MAPPING, GAME_CONFIGS, getLocalizedGameLabel, getLocalizedEraLabel } from '../data/gameConfigs.js';
import { TYPE_COLORS } from '../data/constants.js';
import { t } from '../i18n/i18nService.js';
import { isGameComplete } from '../services/storageService.js';

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
  genEraSelector.innerHTML = Object.entries(GEN_ERA_MAPPING).map(([key, group]) => {
    const hasCompletedGame = group.games.some(g => isGameComplete(GAME_CONFIGS[g.key]));
    const prefix = hasCompletedGame ? '👑 ' : '';
    const eraLabel = getLocalizedEraLabel(key);
    return `<option value="${key}">${prefix}${eraLabel}</option>`;
  }).join('');
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
    const isFinished = isGameComplete(GAME_CONFIGS[g.key]);
    const completeTag = t('labels.completeBadge');
    const gameLabel = getLocalizedGameLabel(g.key);
    opt.textContent = isFinished ? `🏆 ${gameLabel} ${completeTag}` : gameLabel;
    if (selectedGameKey && g.key === selectedGameKey) {
      opt.selected = true;
    }
    gameSelector.appendChild(opt);
  });

  if (genEraSelector) {
    genEraSelector.value = eraKey;
  }
}

export function populateTypeFilter(typeFilterEl) {
  if (!typeFilterEl) return;
  const currentVal = typeFilterEl.value || 'all';

  const typesList = Object.keys(TYPE_COLORS);
  let html = `<option value="all">${t('labels.allTypes')}</option>`;

  typesList.forEach(typeName => {
    const translatedName = t(`types.${typeName}`);
    const emoji = getTypeEmoji(typeName);
    html += `<option value="${typeName}">${emoji} ${translatedName} (${typeName})</option>`;
  });

  typeFilterEl.innerHTML = html;
  typeFilterEl.value = currentVal;
}

function getTypeEmoji(type) {
  const emojis = {
    Grass: '🌱', Fire: '🔥', Water: '💧', Bug: '🐛', Normal: '⚪',
    Poison: '☠️', Electric: '⚡', Ground: '⛰️', Fighting: '🥊', Psychic: '🔮',
    Rock: '🪨', Steel: '⚙️', Ice: '❄️', Ghost: '👻', Dragon: '🐉',
    Dark: '🌙', Fairy: '✨'
  };
  return emojis[type] || '✨';
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
    if (card.id === 'cat-game-selection') {
      card.classList.remove('collapsed');
      if (indicator) indicator.textContent = t('categories.fold');
    } else if (isMobile) {
      card.classList.add('collapsed');
      if (indicator) indicator.textContent = t('categories.unfold');
    } else {
      card.classList.remove('collapsed');
      if (indicator) indicator.textContent = t('categories.fold');
    }
  });

  document.querySelectorAll('.filter-category-header.collapsible').forEach(header => {
    header.addEventListener('click', () => {
      const card = header.closest('.collapsible-card');
      const indicator = header.querySelector('.collapse-indicator');
      if (card) {
        const isCollapsed = card.classList.toggle('collapsed');
        if (indicator) {
          indicator.textContent = isCollapsed ? t('categories.unfold') : t('categories.fold');
        }
      }
    });
  });
}
