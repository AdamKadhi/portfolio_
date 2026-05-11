# Portfolio V2 — Claude Context

## Project
Personal portfolio website for Adam Kadhi (kadhiadam.dev). Built with Vite + React, pure CSS animations (no framer-motion), CSS Modules, zero TypeScript.

## Stack
- **Framework:** Vite + React 19 (JSX only, no TSX)
- **Styling:** CSS Modules — one `.module.css` per component
- **Animations:** Pure CSS (`@keyframes`, transitions, `data-*` attributes, CSS variables)
- **Email:** `@emailjs/browser` (no backend needed)
- **Deploy:** Vercel (`npm run build` → `dist/`)

## Color Palette
```
--color-bg:        #000000   (pure black background)
--color-text:      #ffffff   (pure white)
--color-accent:    #5AAF00   (green — used for sweeps, underlines, buttons)
--color-primary:   #5AAF00
--color-text-body: #aaaaaa   (gray for descriptions/secondary text)
```
Defined in `src/index.css` as CSS custom properties.

## File Structure
```
src/
  index.css          # Global reset + CSS tokens
  main.jsx           # React entry point
  App.jsx            # Root: Navbar + Intro + Profile + Projects + Contact
  utils.jsx          # Shared: DecoderText, useInViewport, Divider
  Divider.module.css
  Navbar.jsx + Navbar.module.css
  Intro.jsx + Intro.module.css
  Profile.jsx + Profile.module.css
  Projects.jsx + Projects.module.css
  Contact.jsx + Contact.module.css
public/
  bg.mp4             # Intro section background video
  screen1.mp4        # Laptop screen — Web Dev project
  screen2.png        # Phone screen 1 — Mobile Dev project
  screen3.png        # Phone screen 2 — Mobile Dev project
  screen4.mp4        # Laptop screen — Full-Stack project
  profile.jpg
  profile-large.jpg
  profile-placeholder.jpg
  icons.svg          # SVG sprite: #send, #error, #github, #linkedin, #facebook, #whatsapp
  katakana.svg       # SVG sprite: #katakana-project, #katakana-profile
  favicon.svg
```

## Key Patterns

### Scroll animations
All sections use `useInViewport` from `utils.jsx` (IntersectionObserver). Elements have `opacity: 0` + `transform` by default, then `data-visible="true"` triggers CSS transitions. Delay is controlled via `--delay` CSS variable on each element.

### CSS Module animation scoping
Vite scopes `@keyframes` names per CSS Module file. Any file that uses `animation-name: reveal` (or any other keyframe) **must define that keyframe locally** — it cannot be defined in `index.css` and referenced from a module.

### Device mockups
- **Laptop:** Pure CSS 3D (`preserve-3d`, `perspective`, `rotateX/Y`). Lid opens via `rotateX(-90deg) → rotateX(-18deg)` on scroll. Mouse hover adds tilt via `--tx`/`--ty` CSS vars set by JS.
- **Phones:** Two phones positioned with `--px`, `--py`, `--pr`, `--pd` CSS vars. Spring-up entrance animation from `y+80px`.

### DecoderText
Katakana scramble effect using `requestAnimationFrame` + `performance.now()`. No external library. Lives in `utils.jsx`.

### Contact form
EmailJS credentials (in `Contact.jsx`):
- SERVICE_ID: `service_2599sla`
- TEMPLATE_ID: `template_7xqo197`
- PUBLIC_KEY: `0dLxM8DPS89_eqr1g`
- EMAIL: `contact@kadhiadam.dev`

Form → success swap uses `.layer` CSS class with `.in`/`.out`/`.hiddenLayer` states.

## Commands
```bash
npm run dev      # Start dev server
npm run build    # Production build → dist/
npm run preview  # Preview production build locally
```

## Important Rules
- No TypeScript — all files are `.jsx`
- No framer-motion — animations are pure CSS only
- No new files unless strictly necessary — keep file count low
- `@keyframes` must be defined in the same CSS Module file that uses them
- `rgba(255,255,255,X)` for structural UI (borders, overlays) is fine; body text must use `var(--color-text-body)`
