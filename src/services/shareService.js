/**
 * Shareable URL Service for MyPokeLog
 * Encodes/decodes Pokédex caught status into ultra-compact Base64 BitSet strings.
 */

// Helper to convert Uint8Array to URL-safe Base64 string
function uint8ToBase64Url(bytes) {
  let binary = '';
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary)
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

// Helper to convert URL-safe Base64 string back to Uint8Array
function base64UrlToUint8(base64Url) {
  let base64 = base64Url
    .replace(/-/g, '+')
    .replace(/_/g, '/');
  while (base64.length % 4 !== 0) {
    base64 += '=';
  }
  const binary = atob(base64);
  const len = binary.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
}

/**
 * Encodes current game, dexMode, and caughtSet into a compact share string.
 */
export function encodeShareState(gameKey, dexMode, activeList, caughtSet) {
  const byteCount = Math.ceil(activeList.length / 8);
  const bytes = new Uint8Array(byteCount);

  activeList.forEach((p, idx) => {
    if (caughtSet.has(p.nationalNum)) {
      const byteIdx = Math.floor(idx / 8);
      const bitIdx = idx % 8;
      bytes[byteIdx] |= (1 << bitIdx);
    }
  });

  const b64 = uint8ToBase64Url(bytes);
  return `${gameKey}:${dexMode}:${b64}`;
}

/**
 * Decodes a share string back into gameKey, dexMode, and caughtSet.
 */
export function decodeShareState(shareStr, GAME_CONFIGS, getPokedexListFn) {
  if (!shareStr || typeof shareStr !== 'string') return null;

  const parts = shareStr.split(':');
  if (parts.length < 3) return null;

  const [gameKey, dexMode, b64] = parts;
  if (!GAME_CONFIGS[gameKey]) return null;

  try {
    const bytes = base64UrlToUint8(b64);
    const activeList = getPokedexListFn(gameKey, dexMode);
    const caughtSet = new Set();

    activeList.forEach((p, idx) => {
      const byteIdx = Math.floor(idx / 8);
      const bitIdx = idx % 8;
      if (byteIdx < bytes.length) {
        if ((bytes[byteIdx] & (1 << bitIdx)) !== 0) {
          caughtSet.add(p.nationalNum);
        }
      }
    });

    return {
      gameKey,
      dexMode,
      caughtSet,
      count: caughtSet.size,
      total: activeList.length
    };
  } catch (err) {
    console.error('Error decoding share string:', err);
    return null;
  }
}

/**
 * Generates the full shareable URL with hash.
 */
export function generateShareUrl(gameKey, dexMode, activeList, caughtSet) {
  const code = encodeShareState(gameKey, dexMode, activeList, caughtSet);
  const baseUrl = window.location.origin + window.location.pathname;
  return `${baseUrl}#share=${code}`;
}

/**
 * Invokes native Web Share API or falls back to Clipboard.
 */
export async function shareProgress(shareUrl, titleText, textSummary) {
  if (navigator.share) {
    try {
      await navigator.share({
        title: titleText || 'MyPokeLog - Progreso Pokédex',
        text: textSummary || '¡Mira mi progreso de captura en MyPokeLog!',
        url: shareUrl
      });
      return { success: true, method: 'native' };
    } catch (err) {
      if (err.name !== 'AbortError') {
        console.warn('Native share failed, falling back to clipboard:', err);
      } else {
        return { success: false, method: 'cancelled' };
      }
    }
  }

  // Fallback to Clipboard API
  try {
    await navigator.clipboard.writeText(shareUrl);
    return { success: true, method: 'clipboard' };
  } catch (err) {
    return { success: false, method: 'error' };
  }
}
