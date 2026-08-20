import { TYPE_COLORS } from '../data/constants.js';
import { t } from '../i18n/i18nService.js';

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

  // Calculate base milestone
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
 * Renders the full "Tu progreso" screen.
 */
export function renderProgressScreen(containerEl, activeList, caughtSet) {
  if (!containerEl) return;

  const total = activeList.length;
  let caught = 0;
  const typeCounts = {};

  // Initialize all types
  Object.keys(TYPE_COLORS).forEach(type => {
    typeCounts[type] = 0;
  });

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

  const pending = Math.max(0, total - caught);
  const completionPct = total > 0 ? ((caught / total) * 100).toFixed(0) : '0';
  const milestoneInfo = calculateNextMilestone(caught, total);

  // Filter types with at least 1 caught or show top types
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

  containerEl.innerHTML = `
    <div class="screen-header">
      <h1 class="screen-title" data-i18n="progressView.title">${t('progressView.title')}</h1>
    </div>

    <!-- 3 KPI Cards -->
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

    <!-- Desktop 2-Column Split -->
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
  `;
}
