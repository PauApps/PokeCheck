export function updateStats(activeList, caughtSet, elements) {
  const { caughtCountEl, completionPercentageEl, progressFillEl, badgeItemEl, milestoneBadgeEl, badgeLabelEl } = elements;
  const maxTotal = activeList.length;
  let count = 0;

  activeList.forEach(p => {
    if (caughtSet.has(p.nationalNum)) count++;
  });

  const pctNum = maxTotal > 0 ? (count / maxTotal) * 100 : 0;
  const pct = maxTotal > 0 ? pctNum.toFixed(1) : '0';

  if (caughtCountEl) caughtCountEl.textContent = `${count} / ${maxTotal}`;
  if (completionPercentageEl) completionPercentageEl.textContent = `${pct}%`;
  if (progressFillEl) progressFillEl.style.width = `${pct}%`;

  if (badgeItemEl && milestoneBadgeEl && badgeLabelEl) {
    if (pctNum >= 100) {
      badgeItemEl.style.display = 'flex';
      milestoneBadgeEl.textContent = '🏆';
      badgeLabelEl.textContent = 'Maestro Pokédex';
    } else if (pctNum >= 75) {
      badgeItemEl.style.display = 'flex';
      milestoneBadgeEl.textContent = '🥇';
      badgeLabelEl.textContent = 'Oro (75%)';
    } else if (pctNum >= 50) {
      badgeItemEl.style.display = 'flex';
      milestoneBadgeEl.textContent = '🥈';
      badgeLabelEl.textContent = 'Plata (50%)';
    } else if (pctNum >= 25) {
      badgeItemEl.style.display = 'flex';
      milestoneBadgeEl.textContent = '🥉';
      badgeLabelEl.textContent = 'Bronce (25%)';
    } else {
      badgeItemEl.style.display = 'none';
    }
  }
}
