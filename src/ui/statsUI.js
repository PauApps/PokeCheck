import { t } from '../i18n/i18nService.js';

export function updateStats(activeList, caughtSet, elements) {
  const {
    caughtCountEl,
    caughtCountNumEl,
    caughtCountTotalEl,
    completionPercentageEl,
    progressFillEl,
    badgeItemEl,
    milestoneBadgeEl,
    badgeLabelEl
  } = elements;

  const maxTotal = activeList.length;
  let count = 0;

  activeList.forEach(p => {
    if (caughtSet.has(p.nationalNum)) count++;
  });

  const pctNum = maxTotal > 0 ? (count / maxTotal) * 100 : 0;
  const pct = maxTotal > 0 ? pctNum.toFixed(1) : '0.0';

  if (caughtCountNumEl) caughtCountNumEl.textContent = count;
  if (caughtCountTotalEl) caughtCountTotalEl.textContent = `/ ${maxTotal}`;
  if (caughtCountEl) caughtCountEl.textContent = `${count} / ${maxTotal}`;
  if (completionPercentageEl) completionPercentageEl.textContent = `${pct}%`;
  if (progressFillEl) progressFillEl.style.width = `${pctNum}%`;

  if (badgeItemEl && milestoneBadgeEl && badgeLabelEl) {
    if (pctNum >= 100) {
      badgeItemEl.style.display = 'flex';
      milestoneBadgeEl.textContent = '🏆';
      badgeLabelEl.textContent = t('stats.badges.master');
    } else if (pctNum >= 75) {
      badgeItemEl.style.display = 'flex';
      milestoneBadgeEl.textContent = '🥇';
      badgeLabelEl.textContent = t('stats.badges.gold');
    } else if (pctNum >= 50) {
      badgeItemEl.style.display = 'flex';
      milestoneBadgeEl.textContent = '🥈';
      badgeLabelEl.textContent = t('stats.badges.silver');
    } else if (pctNum >= 25) {
      badgeItemEl.style.display = 'flex';
      milestoneBadgeEl.textContent = '🥉';
      badgeLabelEl.textContent = t('stats.badges.bronze');
    } else {
      badgeItemEl.style.display = 'none';
    }
  }

  return { count, maxTotal, pctNum, pct };
}
