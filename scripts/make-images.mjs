/**
 * Generates the raster images that live in public/: the Open Graph card and the
 * PNG icons.
 *
 * Run it by hand with `npm run images` when the text or the mark changes. It is
 * deliberately NOT part of `npm run build`, so a deploy never depends on sharp
 * or on a font being installed.
 *
 * A note on type: the card is rendered by librsvg, which reads system fonts and
 * cannot load the self-hosted WOFF2 files. So it renders in Georgia, which is
 * the declared fallback for --display in global.css and is the same serif
 * lineage as Literata. The output is a static PNG, so this only affects the
 * link preview, never the page.
 *
 * Everything on the card is drawn from library/resume/master.md. No claim goes
 * on it that the site itself does not make.
 */

import sharp from "sharp";

const PAGE = "#121110";
const INK = "#E8E1D5";
const MUTED = "#AAA196";
const ACCENT = "#B98D5B";
const BORDER = "#312C26";

// Two keystrokes on a baseline, the same mark as the favicon and the home page
// trace rule. Drawn at the card's scale.
const mark = (x, y, s) => `
  <g transform="translate(${x} ${y}) scale(${s})">
    <line x1="0" y1="0" x2="240" y2="0" stroke="${BORDER}" stroke-width="1.5" />
    <!-- Asymmetric on purpose, the same as the trace on /research: the finger
         goes down fast and comes off slowly. -->
    <path d="M0 0 H36 C44 0 48 -52 60 -52 C74 -52 82 -6 100 0 H124
             C132 0 136 -34 146 -34 C160 -34 168 -4 182 0 H240"
          fill="none" stroke="${ACCENT}" stroke-width="3"
          stroke-linecap="round" stroke-linejoin="round" />
  </g>`;

const og = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
  <rect width="1200" height="630" fill="${PAGE}" />
  <rect x="0" y="0" width="1200" height="630" fill="none" stroke="${BORDER}" stroke-width="2" />

  <text x="96" y="270" font-family="Georgia, serif" font-size="82" font-weight="600" fill="${INK}">
    Aaditya Ananth
  </text>

  <text x="96" y="330" font-family="Helvetica, Arial, sans-serif" font-size="30" fill="${MUTED}">
    Biomedical engineering, UT Austin, class of 2030
  </text>

  ${mark(96, 420, 1)}

  <text x="96" y="500" font-family="Helvetica, Arial, sans-serif" font-size="28" fill="${MUTED}">
    Stroke recovery, and how you measure whether someone is getting better
  </text>
</svg>`;

const icon = `<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512">
  <rect width="512" height="512" rx="64" fill="${PAGE}" />
  <g transform="translate(96 340) scale(1.33)">
    <path d="M0 0 H36 C46 0 51 -110 65 -110 C79 -110 84 0 94 0 H120
             C130 0 135 -70 149 -70 C163 -70 168 0 178 0 H240"
          fill="none" stroke="${ACCENT}" stroke-width="24"
          stroke-linecap="round" stroke-linejoin="round" />
  </g>
</svg>`;

const out = new URL("../public/", import.meta.url);

await sharp(Buffer.from(og)).png().toFile(new URL("og-image.png", out).pathname);
await sharp(Buffer.from(icon)).resize(180, 180).png().toFile(new URL("apple-touch-icon.png", out).pathname);
await sharp(Buffer.from(icon)).resize(32, 32).png().toFile(new URL("icon-32.png", out).pathname);

const { width, height } = await sharp(new URL("og-image.png", out).pathname).metadata();
console.log(`og-image.png ${width}x${height}, apple-touch-icon.png 180x180, icon-32.png 32x32`);
