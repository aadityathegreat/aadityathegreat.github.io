# aadityathegreat.github.io

Personal site. One job: be the link in a cold email to a professor and survive a
twenty-second phone skim.

## Running it

```bash
npm install
npm run dev     # localhost:4321
npm run build   # -> dist/
```

## How it is put together

Astro, static output, no framework and no CDN. The whole page renders without
JavaScript. One inline script drives the keyboard under the motor trace, and if it
never runs you still get a labelled diagram and readable caption.

- `src/pages/index.astro` — the page and all of its copy
- `src/components/MotorTrace.astro` — the force curve and the keyboard
- `src/styles/global.css` — palette tokens and layout
- `public/fonts/` — Literata and Atkinson Hyperlegible Next, self-hosted, both OFL

## Design constraints worth knowing before editing

The palette is a contract, not a suggestion. Every colour is a token in
`global.css`, and `--trace` is scoped to the motor-control graphic only. Adding a
hex literal to a component breaks the audit.

Dark only, on purpose. `color-scheme: dark` is declared so browser chrome matches.
There is no light variant and no toggle.

Motion is capped at five deliberate moves. The trace draws on scroll, the keyboard
highlights a stroke, the metadata rail brightens on hover and focus, the name
reveals once on load, and everything else is still. Adding a sixth means naming
what job it does.

**The trace is schematic and the caption says so.** No measured data from the study
was available when this was built. Every note under the keyboard describes the
method rather than a result, on purpose. If the real keystroke data turns up, swap
the path in `MotorTrace.astro` and the notes can carry actual values.

## Deploying

`.github/workflows/deploy.yml` is committed but inert. To go live, make the repo
public, then Settings > Pages > Source: GitHub Actions, then push to `main`.
