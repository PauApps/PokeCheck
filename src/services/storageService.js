/**
 * Storage & Database Persistence Service for MyPokeLog
 */

function isStorageAvailable() {
  return typeof localStorage !== 'undefined';
}

export function loadSelectedGame() {
  if (!isStorageAvailable()) return 'gen9_paldea';
  return localStorage.getItem('pokedex_selected_game') || 'gen9_paldea';
}

export function saveSelectedGame(gameKey) {
  if (isStorageAvailable()) localStorage.setItem('pokedex_selected_game', gameKey);
}

export function loadDexMode() {
  if (!isStorageAvailable()) return 'regional';
  return localStorage.getItem('pokedex_dex_mode') || 'regional';
}

export function saveDexMode(mode) {
  if (isStorageAvailable()) localStorage.setItem('pokedex_dex_mode', mode);
}

export function loadTheme() {
  if (!isStorageAvailable()) return 'dark';
  return localStorage.getItem('pokedex_theme') || 'dark';
}

export function saveTheme(theme) {
  if (isStorageAvailable()) localStorage.setItem('pokedex_theme', theme);
}

export function loadCaughtSet(gameConfig) {
  if (!gameConfig || !gameConfig.storageKey || !isStorageAvailable()) return new Set();
  const raw = localStorage.getItem(gameConfig.storageKey) || '[]';
  try {
    return new Set(JSON.parse(raw));
  } catch (e) {
    console.error('Error parsing caught set from LocalStorage:', e);
    return new Set();
  }
}

export function saveCaughtSet(gameConfig, caughtSet) {
  if (!gameConfig || !gameConfig.storageKey || !isStorageAvailable()) return;
  localStorage.setItem(gameConfig.storageKey, JSON.stringify(Array.from(caughtSet)));
}

export function generateExportJSON(gameConfig, activeList, caughtSet) {
  const total = activeList.length;
  let count = 0;
  activeList.forEach(p => {
    if (caughtSet.has(p.nationalNum)) count++;
  });
  const missingCount = total - count;
  const pct = total > 0 ? ((count / total) * 100).toFixed(2) : '0';

  const capturedList = [];
  const missingList = [];

  activeList.forEach(p => {
    const itemData = {
      regional_num: p.displayId,
      national_num: p.nationalNum,
      name: p.name,
      types: [p.type1, p.type2].filter(Boolean)
    };
    if (caughtSet.has(p.nationalNum)) {
      capturedList.push(itemData);
    } else {
      missingList.push(itemData);
    }
  });

  return {
    meta: {
      app: "MyPokeLog",
      url: "https://mypokelog.app",
      game_key: gameConfig.storageKey ? gameConfig.storageKey.replace('pokedex_caught_', '') : 'unknown',
      game_name: gameConfig.name,
      regional_dex_name: gameConfig.regionalDexName,
      timestamp: new Date().toISOString(),
      summary: {
        total_pokedex: total,
        captured_count: count,
        missing_count: missingCount,
        completion_percentage: `${pct}%`
      }
    },
    captured_pokemon: capturedList,
    missing_pokemon: missingList
  };
}

export function downloadExportJSONFile(jsonObj) {
  if (typeof document === 'undefined') return;
  const jsonStr = JSON.stringify(jsonObj, null, 2);
  const blob = new Blob([jsonStr], { type: 'application/json;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const downloadAnchor = document.createElement('a');
  downloadAnchor.href = url;
  downloadAnchor.download = `mypokelog_${jsonObj.meta ? jsonObj.meta.game_key : 'export'}_export.json`;
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  document.body.removeChild(downloadAnchor);
  URL.revokeObjectURL(url);
}

export function downloadDatabaseFile(GAME_CONFIGS) {
  if (typeof document === 'undefined' || !isStorageAvailable()) return;
  const gamesData = {};
  Object.keys(GAME_CONFIGS).forEach(gKey => {
    const sKey = GAME_CONFIGS[gKey].storageKey;
    const cList = JSON.parse(localStorage.getItem(sKey) || '[]');
    gamesData[gKey] = cList;
  });

  const dbData = {
    meta: {
      app: "MyPokeLog Database Backup",
      version: "2.0",
      exported_at: new Date().toISOString()
    },
    games: gamesData
  };

  const blob = new Blob([JSON.stringify(dbData, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'pokedex_db.json';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export async function loadLocalDatabase(GAME_CONFIGS) {
  if (typeof fetch === 'undefined' || !isStorageAvailable()) return false;
  try {
    const res = await fetch('./pokedex_db.json');
    if (!res.ok) return false;
    const data = await res.json();
    if (data && data.games) {
      let importedCount = 0;
      Object.keys(data.games).forEach(gKey => {
        if (GAME_CONFIGS[gKey]) {
          const sKey = GAME_CONFIGS[gKey].storageKey;
          const existing = new Set(JSON.parse(localStorage.getItem(sKey) || '[]'));
          const incoming = data.games[gKey] || [];
          let added = false;
          incoming.forEach(id => {
            if (!existing.has(id)) {
              existing.add(id);
              added = true;
              importedCount++;
            }
          });
          if (added) {
            localStorage.setItem(sKey, JSON.stringify(Array.from(existing)));
          }
        }
      });
      return importedCount;
    }
  } catch (err) {
    console.warn('pokedex_db.json pre-load not available or failed:', err);
  }
  return false;
}
