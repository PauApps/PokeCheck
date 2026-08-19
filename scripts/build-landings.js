import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { LANDINGS_DATA } from '../src/data/landingsData.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

console.log('🚀 Building 10 SEO Pre-rendered Landing Pages...');

function renderHTML(landing) {
  const canonicalUrl = `https://mypokelog.app/${landing.slug}`;
  const ctaHref = `../index.html?game=${landing.gameKey || 'gen9_paldea'}&mode=${landing.dexMode || 'regional'}${landing.isShiny ? '&shiny=true' : ''}`;

  const relatedLinksHTML = (landing.relatedSlugs || []).map(rSlug => {
    const rItem = LANDINGS_DATA.find(l => l.slug === rSlug);
    if (!rItem) return '';
    return `<li><a href="../${rItem.slug}/" style="color: var(--accent); text-decoration: none; font-weight: 600;">⚡ ${rItem.h1}</a></li>`;
  }).filter(Boolean).join('\n            ');

  const featuresHTML = (landing.features || []).map(f => `
    <div style="background: var(--surface-card); border: 1px solid var(--border); padding: 20px; border-radius: 14px; display: flex; flex-direction: column; gap: 8px;">
      <div style="font-size: 28px;">${f.icon}</div>
      <h3 style="font-size: 15px; font-weight: 700; color: var(--text); margin: 0;">${f.title}</h3>
      <p style="font-size: 13px; color: var(--text-muted); margin: 0; line-height: 1.5;">${f.text}</p>
    </div>
  `).join('');

  const faqHTML = (landing.faq || []).map(q => `
    <div style="background: var(--surface); border: 1px solid var(--border); padding: 18px; border-radius: 12px; margin-bottom: 12px;">
      <h3 style="font-size: 14px; font-weight: 700; color: var(--text); margin: 0 0 6px 0;">❓ ${q.q}</h3>
      <p style="font-size: 13px; color: var(--text-muted); margin: 0; line-height: 1.5;">${q.a}</p>
    </div>
  `).join('');

  const paragraphsHTML = (landing.contentBlocks || []).map(p => `
    <p style="font-size: 14px; color: var(--text-muted); line-height: 1.7; margin-bottom: 14px;">${p}</p>
  `).join('');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${landing.title}</title>
  <meta name="title" content="${landing.title}">
  <meta name="description" content="${landing.description}">
  <meta name="keywords" content="${landing.primaryKeyword}, pokédex tracker, pokemon checklist, living dex, mypokelog">
  <meta name="author" content="PauApps / MyPokeLog">
  <meta name="robots" content="index, follow">
  <meta name="theme-color" content="#090d16">

  <link rel="canonical" href="${canonicalUrl}">
  <link rel="alternate" hreflang="en" href="${canonicalUrl}" />
  <link rel="alternate" hreflang="x-default" href="${canonicalUrl}" />

  <link rel="icon" type="image/svg+xml" href="../icon.svg">
  <link rel="alternate icon" type="image/png" href="../icon-192.png">
  <link rel="apple-touch-icon" sizes="180x180" href="../apple-touch-icon.png">
  <link rel="manifest" href="../site.webmanifest">

  <link rel="stylesheet" href="../css/main.css">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@500;700&display=swap" rel="stylesheet">

  <!-- Open Graph -->
  <meta property="og:type" content="website">
  <meta property="og:url" content="${canonicalUrl}">
  <meta property="og:title" content="${landing.title}">
  <meta property="og:description" content="${landing.description}">
  <meta property="og:image" content="https://mypokelog.app/icon-512.png">
  <meta property="og:image:width" content="512">
  <meta property="og:image:height" content="512">
  <meta property="og:image:alt" content="MyPokeLog Icon">
  <meta property="og:site_name" content="MyPokeLog">

  <!-- Twitter -->
  <meta property="twitter:card" content="summary">
  <meta property="twitter:url" content="${canonicalUrl}">
  <meta property="twitter:title" content="${landing.title}">
  <meta property="twitter:description" content="${landing.description}">
  <meta property="twitter:image" content="https://mypokelog.app/icon-512.png">

  <!-- Structured Data -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "MyPokeLog - ${landing.h1}",
    "url": "${canonicalUrl}",
    "description": "${landing.description}",
    "applicationCategory": "GameApplication",
    "operatingSystem": "All",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "EUR"
    }
  }
  </script>
</head>
<body style="background: var(--bg); color: var(--text); font-family: 'Plus Jakarta Sans', sans-serif; margin: 0; padding: 0; line-height: 1.6;">

  <!-- Header Navigation -->
  <header style="border-bottom: 1px solid var(--border); background: var(--surface); padding: 14px 20px; position: sticky; top: 0; z-index: 100;">
    <div style="max-width: 1100px; margin: 0 auto; display: flex; justify-content: space-between; align-items: center;">
      <a href="../index.html" style="display: flex; align-items: center; gap: 10px; text-decoration: none; color: var(--text);">
        <span style="font-size: 22px;">⚡</span>
        <span style="font-weight: 800; font-size: 18px; letter-spacing: -0.5px;">MyPokeLog</span>
      </a>
      <a href="${ctaHref}" class="btn btn-accent" style="padding: 9px 18px; font-weight: 700; font-size: 13px; border-radius: 10px;">
        🎮 ${landing.ctaText}
      </a>
    </div>
  </header>

  <!-- Hero Section -->
  <main style="max-width: 1000px; margin: 0 auto; padding: 40px 20px;">
    <section style="text-align: center; padding: 40px 20px; background: linear-gradient(180deg, rgba(239,68,68,0.06) 0%, rgba(9,13,22,0) 100%); border-radius: 24px; border: 1px solid var(--border); margin-bottom: 40px;">
      <span style="display: inline-block; padding: 6px 14px; background: var(--accent-glow); color: var(--accent); border-radius: 20px; font-size: 12px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 16px;">
        ${landing.badge}
      </span>
      <h1 style="font-size: 34px; font-weight: 800; color: var(--text); margin: 0 0 14px 0; letter-spacing: -0.5px;">
        ${landing.h1}
      </h1>
      <p style="font-size: 16px; color: var(--text-muted); max-width: 680px; margin: 0 auto 28px auto; line-height: 1.6;">
        ${landing.subtitle}
      </p>

      <div style="display: flex; justify-content: center; gap: 14px; flex-wrap: wrap;">
        <a href="${ctaHref}" class="btn btn-accent" style="padding: 14px 30px; font-size: 15px; font-weight: 800; border-radius: 12px; box-shadow: 0 8px 20px var(--accent-glow);">
          🚀 ${landing.ctaText}
        </a>
      </div>

      <div style="margin-top: 24px; font-size: 12px; color: var(--text-dim); font-weight: 600;">
        ✨ ${landing.heroHighlight}
      </div>
    </section>

    <!-- Overview Prose -->
    <section style="margin-bottom: 40px;">
      <h2 style="font-size: 20px; font-weight: 700; color: var(--text); margin-bottom: 16px; border-bottom: 1px solid var(--border); padding-bottom: 8px;">
        Overview & How it Works
      </h2>
      ${paragraphsHTML}
    </section>

    <!-- Key Features Grid -->
    <section style="margin-bottom: 40px;">
      <h2 style="font-size: 20px; font-weight: 700; color: var(--text); margin-bottom: 16px; border-bottom: 1px solid var(--border); padding-bottom: 8px;">
        Key Features for Trainers
      </h2>
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 16px;">
        ${featuresHTML}
      </div>
    </section>

    <!-- FAQ Section -->
    ${landing.faq && landing.faq.length > 0 ? `
    <section style="margin-bottom: 40px;">
      <h2 style="font-size: 20px; font-weight: 700; color: var(--text); margin-bottom: 16px; border-bottom: 1px solid var(--border); padding-bottom: 8px;">
        Frequently Asked Questions
      </h2>
      ${faqHTML}
    </section>
    ` : ''}

    <!-- Internal Linking Mesh -->
    <section style="background: var(--surface); border: 1px solid var(--border); padding: 24px; border-radius: 16px; margin-bottom: 40px;">
      <h3 style="font-size: 16px; font-weight: 700; color: var(--text); margin: 0 0 12px 0;">
        Explore Related Pokédex Trackers
      </h3>
      <ul style="list-style: none; padding: 0; margin: 0; display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 10px; font-size: 13px;">
        ${relatedLinksHTML}
      </ul>
    </section>

    <!-- Call to Action Banner -->
    <section style="text-align: center; background: var(--surface-card); border: 1px solid var(--border); padding: 32px 20px; border-radius: 20px;">
      <h2 style="font-size: 22px; font-weight: 800; margin: 0 0 10px 0; color: var(--text);">Ready to track your Pokédex?</h2>
      <p style="font-size: 14px; color: var(--text-muted); margin: 0 0 20px 0;">No account required. Start tracking caught and missing Pokémon immediately in your browser.</p>
      <a href="${ctaHref}" class="btn btn-accent" style="padding: 12px 28px; font-size: 14px; font-weight: 800; border-radius: 10px;">
        🎮 Launch Interactive App
      </a>
    </section>
  </main>

  <!-- Footer -->
  <footer style="border-top: 1px solid var(--border); background: var(--surface); padding: 24px 20px; text-align: center; font-size: 12px; color: var(--text-dim); margin-top: 60px;">
    <div style="max-width: 1000px; margin: 0 auto;">
      <p style="margin: 0 0 8px 0;">&copy; 2026 PauApps (mypokelog.app). Free & Open Source Pokédex Checklist Tool.</p>
      <p style="margin: 0;">Pokémon and all respective names are trademarks of Nintendo, Creatures Inc., and GAME FREAK.</p>
    </div>
  </footer>

</body>
</html>`;
}

// Generate files
LANDINGS_DATA.forEach(landing => {
  const dirPath = path.join(rootDir, landing.slug);
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
  const filePath = path.join(dirPath, 'index.html');
  const htmlContent = renderHTML(landing);
  fs.writeFileSync(filePath, htmlContent, 'utf-8');
  console.log(`  ✓ Generated: /${landing.slug}/index.html`);
});

// Build updated sitemap.xml
const sitemapUrls = [
  'https://mypokelog.app/',
  ...LANDINGS_DATA.map(l => `https://mypokelog.app/${l.slug}`)
];

const sitemapXML = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapUrls.map(url => `  <url>
    <loc>${url}</loc>
    <changefreq>weekly</changefreq>
    <priority>${url === 'https://mypokelog.app/' ? '1.0' : '0.8'}</priority>
  </url>`).join('\n')}
</urlset>`;

fs.writeFileSync(path.join(rootDir, 'sitemap.xml'), sitemapXML, 'utf-8');
console.log('  ✓ Updated: sitemap.xml with 11 total URLs (root + 10 landing pages)');

console.log('✨ All 10 SEO pre-rendered landing pages generated successfully!');
