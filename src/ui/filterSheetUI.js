import { TYPE_COLORS } from '../data/constants.js';
import { getTypeSvg, getIcon } from './icons.js';
import { t } from '../i18n/i18nService.js';

// All 18 Pokémon types in standard order
const ALL_TYPES = [
  'Normal', 'Fire', 'Water',
  'Electric', 'Grass', 'Ice',
  'Fighting', 'Poison', 'Ground',
  'Flying', 'Psychic', 'Bug',
  'Rock', 'Ghost', 'Dragon',
  'Steel', 'Fairy', 'Dark'
];

let currentSelectedTypes = new Set();
let onApplyCallback = null;

/**
 * Initializes and renders the Type Filter Bottom Sheet
 */
export function initFilterSheet(elements) {
  const { sheetOverlay, sheetContainer, closeBtn, clearBtn, applyBtn, subtitleEl, gridEl } = elements;
  if (!sheetOverlay || !sheetContainer) return;

  function renderTypeGrid() {
    if (!gridEl) return;
    gridEl.innerHTML = ALL_TYPES.map(typeName => {
      const isSelected = currentSelectedTypes.has(typeName);
      const color = TYPE_COLORS[typeName] || '#78c850';
      const translatedName = t(`types.${typeName}`);
      const typeSvg = getTypeSvg(typeName);

      return `
        <button type="button" class="type-filter-card ${isSelected ? 'selected' : ''}" data-type="${typeName}" style="--type-color: ${color};">
          ${isSelected ? `<span class="type-card-check">${getIcon('check')}</span>` : ''}
          <div class="type-card-icon">${typeSvg}</div>
          <span class="type-card-name">${translatedName}</span>
        </button>
      `;
    }).join('');

    // Update subtitle
    if (subtitleEl) {
      if (currentSelectedTypes.size === 0) {
        subtitleEl.textContent = t('filterSheet.subtitle');
      } else {
        subtitleEl.textContent = t('filterSheet.selectedCount', { count: currentSelectedTypes.size });
      }
    }

    // Attach click listeners to type cards
    gridEl.querySelectorAll('.type-filter-card').forEach(card => {
      card.addEventListener('click', () => {
        const type = card.getAttribute('data-type');
        if (currentSelectedTypes.has(type)) {
          currentSelectedTypes.delete(type);
        } else {
          currentSelectedTypes.add(type);
        }
        renderTypeGrid();
      });
    });
  }

  // Clear button
  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      currentSelectedTypes.clear();
      renderTypeGrid();
    });
  }

  // Apply button
  if (applyBtn) {
    applyBtn.addEventListener('click', () => {
      closeFilterSheet(elements);
      if (onApplyCallback) {
        onApplyCallback(Array.from(currentSelectedTypes));
      }
    });
  }

  // Close handlers
  if (closeBtn) {
    closeBtn.addEventListener('click', () => closeFilterSheet(elements));
  }

  sheetOverlay.addEventListener('click', (e) => {
    if (e.target === sheetOverlay) {
      closeFilterSheet(elements);
    }
  });

  return {
    open: (initialSelectedTypes = [], onApply) => {
      currentSelectedTypes = new Set(initialSelectedTypes);
      onApplyCallback = onApply;
      renderTypeGrid();
      sheetOverlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    },
    close: () => closeFilterSheet(elements),
    getSelectedTypes: () => Array.from(currentSelectedTypes)
  };
}

export function closeFilterSheet(elements) {
  const { sheetOverlay } = elements;
  if (sheetOverlay) {
    sheetOverlay.classList.remove('active');
  }
  document.body.style.overflow = '';
}
