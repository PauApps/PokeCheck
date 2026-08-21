import { TYPE_COLORS } from '../data/constants.js';
import { t } from '../i18n/i18nService.js';
import { calculateGlobalProgress } from '../services/storageService.js';
import { GAME_CONFIGS } from '../data/gameConfigs.js';

let activeProgressSubTab = 'all';

/**
 * Calculates next milestone target based on total dex length and current caught count.
 */
export function calculateNextMilestone(caughtCount, totalCount) {
  if (totalCount === 0) return { target: 10, remaining: 10, progressPct: 0 };
  if (caughtCount >= totalCount) {
    return { target: totalCount, remaining: 0, progressPct: 100, isCompleted: true };
  }

  const milestones = [10, 25, 50, 75, 100, 150, 200, 250, 300, 350, 400, 500, 600, 700, 800, 900, 1025];
  let target = totalCount;

  for (const m of milestones) {
    if (m > caughtCount) {
      target = Math.min(m, totalCount);
      break;
    }
  }

  const prevMilestone = milestones.slice().reverse().find(m => m <= caughtCount) || 0;
  const range = target - prevMilestone;
  const progressInRange = caughtCount - prevMilestone;
  const progressPct = range > 0 ? Math.min(100, Math.round((progressInRange / range) * 100)) : 100;

  return {
    target,
    remaining: target - caughtCount,
    progressPct,
    isCompleted: false
  };
}

/**
 * Renders the full "Tu progreso" screen including Active Pokédex & Global Progress Overview.
 */
export function renderProgressScreen(containerEl, activeList, caughtSet, options = {}) {
  if (!containerEl) return;

  let allGameConfigs = options.allGameConfigs || GAME_CONFIGS;
  let onSelectGame = options.onSelectGame;

  // Support options object signature flexibility
  if (containerEl && !containerEl.nodeType && containerEl.containerEl) {
    const opts = containerEl;
    containerEl = opts.containerEl;
    activeList = opts.activeList;
    caughtSet = opts.caughtSet;
    allGameConfigs = opts.allGameConfigs || GAME_CONFIGS;
    onSelectGame = opts.onSelectGame;
  }

  const total = activeList ? activeList.length : 0;
  let caught = 0;
  const typeCounts = {};

  Object.keys(TYPE_COLORS).forEach(type => {
    typeCounts[type] = 0;
  });

  if (activeList && caughtSet) {
    activeList.forEach(p => {
      if (caughtSet.has(p.nationalNum)) {
        caught++;
        if (p.type1 && typeCounts[p.type1] !== undefined) {
          typeCounts[p.type1]++;
        }
        if (p.type2 && typeCounts[p.type2] !== undefined) {
          typeCounts[p.type2]++;
        }
      }
    });
  }

  const pending = Math.max(0, total - caught);
  const completionPct = total > 0 ? ((caught / total) * 100).toFixed(0) : '0';
  const milestoneInfo = calculateNextMilestone(caught, total);

  const sortedTypes = Object.entries(typeCounts)
    .filter(([_, count]) => count > 0)
    .sort((a, b) => b[1] - a[1]);

  const maxTypeCount = sortedTypes.length > 0 ? Math.max(...sortedTypes.map(t => t[1])) : 1;

  const typeBarsHTML = sortedTypes.length > 0
    ? sortedTypes.map(([typeName, count]) => {
        const color = TYPE_COLORS[typeName] || '#78c850';
        const translatedType = t(`types.${typeName}`);
        const barWidthPct = Math.max(10, Math.round((count / maxTypeCount) * 100));

        return `
          <div class="progress-type-row">
            <span class="progress-type-name" style="color: ${color};">${translatedType}</span>
            <div class="progress-type-track">
              <div class="progress-type-bar" style="width: ${barWidthPct}%; background-color: ${color};"></div>
            </div>
            <span class="progress-type-count">${count}</span>
          </div>
        `;
      }).join('')
    : `<div class="progress-empty-types">${t('labels.missingOnly')}</div>`;

  const remainingText = milestoneInfo.isCompleted
    ? t('progressView.allComplete')
    : t('progressView.remainingText', { count: `<strong>${milestoneInfo.remaining}</strong>`, target: milestoneInfo.target });

  // Calculate Global Progress Overview
  const globalStats = calculateGlobalProgress(allGameConfigs);

  const gamesProgressHTML = globalStats.gamesProgress.map(g => {
    const rawName = g.gameName || g.gameKey;
    const cleanName = rawName.replace(/^Gen\s*\d+:\s*/i, '').replace(/\s*\([^)]*\)/g, '').trim();
    const isCompleted = g.isCompleted;
    const completedBadgeText = t('progressView.completedBadge') || '100% COMPLETADO';

    return `
      <div class="progress-game-item ${isCompleted ? 'completed' : ''}" data-game="${g.gameKey}">
        <div class="progress-game-header">
          <span class="progress-game-title">${cleanName}</span>
          ${isCompleted ? `<span class="progress-game-badge">${completedBadgeText}</span>` : ''}
        </div>
        <div class="progress-game-bar-track">
          <div class="progress-game-bar-fill" style="width: ${g.percentage}%; ${isCompleted ? 'background: #10b981;' : ''}"></div>
        </div>
        <div class="progress-game-footer">
          <span>${g.mainDexName}</span>
          <span>${g.caughtCount} / ${g.totalCount} (${g.percentage}%)</span>
        </div>
      </div>
    `;
  }).join('');

  const globalTitleText = t('progressView.globalTitle') || 'Visión de Progreso Global';
  const globalSubtitleText = t('progressView.globalSubtitle') || 'Resumen consolidado de todas tus partidas y especies capturadas en MyPokeLog.';
  const activeDexTitleText = t('progressView.activeDexTitle') || 'Pokédex Activa';
  const uniqueSpeciesLabel = t('progressView.uniqueSpecies') || 'ESPECIES ÚNICAS';
  const gamesCompletedLabel = t('progressView.gamesCompleted') || 'JUEGOS COMPLETADOS';
  const totalCatchesLabel = t('progressView.totalCatches') || 'CAPTURAS TOTALES';
  const uniqueCardTitle = t('progressView.uniqueSpeciesCardTitle') || 'Colección Global de Especies (1..1025)';
  const uniqueHintText = t('progressView.uniqueSpeciesHint', { count: `<strong>${globalStats.uniqueCaughtCount}</strong>`, pct: globalStats.uniquePercentage })
    || `Has registrado <strong>${globalStats.uniqueCaughtCount}</strong> de las 1025 especies únicas de Pokémon (${globalStats.uniquePercentage}% del total nacional).`;
  const gamesTitle = t('progressView.gamesProgressTitle') || 'Progreso por Edición y Juego';
  const gamesCompletedCountText = t('progressView.gamesCompletedCount', { count: globalStats.completedGamesCount }) || `${globalStats.completedGamesCount} completados`;

  containerEl.innerHTML = `
    <div class="screen-header">
      <h1 class="screen-title" data-i18n="progressView.title">${t('progressView.title')}</h1>
    </div>

    <!-- Pestañas Rápidas de Progreso -->
    <div class="progress-subtabs-row">
      <button type="button" class="progress-subtab-btn ${activeProgressSubTab === 'all' ? 'active' : ''}" data-subtab="all">Todo</button>
      <button type="button" class="progress-subtab-btn ${activeProgressSubTab === 'active' ? 'active' : ''}" data-subtab="active">${activeDexTitleText}</button>
      <button type="button" class="progress-subtab-btn ${activeProgressSubTab === 'global' ? 'active' : ''}" data-subtab="global">${globalTitleText}</button>
    </div>

    <!-- SECCIÓN 1: POKÉDEX ACTIVA -->
    <div id="progress-section-active" style="${activeProgressSubTab === 'global' ? 'display: none;' : 'display: block;'}">
      <div class="progress-section-divider">
        <h2 class="progress-subhead">${activeDexTitleText}</h2>
      </div>

      <!-- 3 KPI Cards Activos -->
      <div class="progress-kpi-grid">
        <div class="kpi-card kpi-caught">
          <span class="kpi-value">${caught}</span>
          <span class="kpi-label" data-i18n="stats.caught">${t('stats.caught')}</span>
        </div>
        <div class="kpi-card kpi-pending">
          <span class="kpi-value">${pending}</span>
          <span class="kpi-label" data-i18n="stats.pending">${t('stats.pending')}</span>
        </div>
        <div class="kpi-card kpi-completed">
          <span class="kpi-value">${completionPct}%</span>
          <span class="kpi-label" data-i18n="stats.completed">${t('stats.completed')}</span>
        </div>
      </div>

      <!-- Desktop 2-Column Split para Pokédex Activa -->
      <div class="progress-desktop-split">
        <!-- Próximo Hito Card -->
        <div class="progress-section-card">
          <div class="progress-section-header">
            <span class="progress-section-label" data-i18n="progressView.nextMilestone">${t('progressView.nextMilestone')}</span>
            <span class="milestone-ratio">${caught} / ${milestoneInfo.target}</span>
          </div>
          <div class="milestone-bar-track">
            <div class="milestone-bar-fill" style="width: ${milestoneInfo.progressPct}%;"></div>
          </div>
          <p class="milestone-hint">${remainingText}</p>
        </div>

        <!-- Capturados por Tipo Card -->
        <div class="progress-section-card">
          <div class="progress-section-header">
            <span class="progress-section-label" data-i18n="progressView.byType">${t('progressView.byType')}</span>
          </div>
          <div class="progress-types-list">
            ${typeBarsHTML}
          </div>
        </div>
      </div>
    </div>

    <!-- SECCIÓN 2: VISIÓN DE PROGRESO GLOBAL -->
    <div id="progress-section-global" style="${activeProgressSubTab === 'active' ? 'display: none;' : 'display: block;'}">
      <div class="progress-section-divider global-divider">
        <h2 class="progress-subhead">${globalTitleText}</h2>
        <p class="progress-subhead-desc">${globalSubtitleText}</p>
      </div>

      <!-- 3 KPI Cards Globales -->
      <div class="progress-kpi-grid">
        <div class="kpi-card kpi-caught">
          <span class="kpi-value">${globalStats.uniqueCaughtCount}</span>
          <span class="kpi-label">${uniqueSpeciesLabel}</span>
        </div>
        <div class="kpi-card kpi-completed">
          <span class="kpi-value">${globalStats.completedGamesCount} / ${globalStats.totalGamesCount}</span>
          <span class="kpi-label">${gamesCompletedLabel}</span>
        </div>
        <div class="kpi-card kpi-pending">
          <span class="kpi-value">${globalStats.totalCatchesAllDexes}</span>
          <span class="kpi-label">${totalCatchesLabel}</span>
        </div>
      </div>

      <!-- Colección Global de Especies Únicas -->
      <div class="progress-section-card">
        <div class="progress-section-header">
          <span class="progress-section-label">${uniqueCardTitle}</span>
          <span class="milestone-ratio">${globalStats.uniqueCaughtCount} / 1025</span>
        </div>
        <div class="milestone-bar-track">
          <div class="milestone-bar-fill" style="width: ${globalStats.uniquePercentage}%;"></div>
        </div>
        <p class="milestone-hint">${uniqueHintText}</p>
      </div>

      <!-- Desglose de Progreso por Juego -->
      <div class="progress-section-card">
        <div class="progress-section-header">
          <span class="progress-section-label">${gamesTitle}</span>
          <span class="milestone-ratio">${gamesCompletedCountText}</span>
        </div>
        <div class="progress-games-grid">
          ${gamesProgressHTML}
        </div>
      </div>
    </div>
  `;

  // Subtab buttons click listeners
  containerEl.querySelectorAll('.progress-subtab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const mode = btn.getAttribute('data-subtab');
      if (mode) {
        activeProgressSubTab = mode;
        containerEl.querySelectorAll('.progress-subtab-btn').forEach(b => {
          b.classList.toggle('active', b.getAttribute('data-subtab') === mode);
        });
        const activeSec = containerEl.querySelector('#progress-section-active');
        const globalSec = containerEl.querySelector('#progress-section-global');
        if (activeSec) {
          activeSec.style.display = (mode === 'global') ? 'none' : 'block';
        }
        if (globalSec) {
          globalSec.style.display = (mode === 'active') ? 'none' : 'block';
        }
      }
    });
  });

  // Click on any game card in the global breakdown switches to that game
  containerEl.querySelectorAll('.progress-game-item').forEach(item => {
    item.addEventListener('click', () => {
      const gKey = item.getAttribute('data-game');
      if (onSelectGame && gKey) {
        onSelectGame(gKey);
      }
    });
  });
}


