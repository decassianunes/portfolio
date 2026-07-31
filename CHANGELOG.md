# Changelog

All notable changes to cassianunes.de, newest first.

---

## 2026-07-31

### Robot + speech bubble sync fix
The speech bubble and robot now move as one unit during the desktop wander animation. Wrapped both in a shared `.hero-bot-unit` container and moved the wander animation onto the wrapper, so they travel together. The robot's 3D float continues independently inside the unit.

### Header name: removed + slide-in animation
Removed "Cássia Nunes" from the header on all pages. On the homepage the hero already carries the name. On inner pages (Cases, Playground, About), a red `Cássia Nunes` slides in from below on page load, as if it arrived from the hero. Clicking a nav link or "View work →" on the homepage triggers a fly animation: a clone of the big red name scales down and travels to the header position before the page navigates.

### Mobile burger menu
Added a hamburger toggle (☰) to the header on all pages. On mobile (≤700 px) the nav hides behind the toggle; tapping opens a full-width vertical dropdown with dividers. The bars animate to × when open and close on any link tap or outside click. Desktop nav is unchanged.

### Footer one-line fix (mobile)
Tightened footer font size to 13 px and link gap to 12 px on mobile, with `flex-wrap: nowrap`, so "LinkedIn · GitHub · Email" and "© 2026 Cássia Nunes" stay on a single line at 375 px.

### Robot animation — 3D float + desktop wander + mobile corner
- **3D float**: robot SVG bobs up/down while leaning left-right (`rotateY ±10°`) and tilting slightly (`rotateZ ±1°`) on a 4 s loop. `perspective: 500px` on the parent button makes the rotation look like real depth.
- **Desktop wander**: the bubble+robot unit drifts lazily through the hero's right column on a 22 s, 8-point organic path.
- **Mobile corner**: on mobile the robot stays in the chatbot div (not the hero) and is fixed at bottom-right (80 px, `position: fixed`). No wander on mobile.
- All motion is inside a `prefers-reduced-motion: no-preference` guard.

## 2026-07-30

### Homepage redesign — two-column hero layout
- Hero restructured into a CSS grid: name/keywords/description/CTA on the left, speech bubble + robot on the right.
- Robot button relocated from the chatbot widget into `.hero-bot-slot` in the right column via JS; all existing event listeners remain attached.
- Speech bubble (`.hero-bot-bubble`) added above the robot; clicking it opens the chatbot.
- On mobile, the right column is hidden; the fixed-corner robot acts as the chatbot trigger.
- Nav labels updated: "Work" → "Cases", "About Me" → "About".
- Language selector restyled as plain red text with no border or background (still a working dropdown).
- "View work →" link set to black bold.

### Accessibility improvements — chatbot
- `aria-modal="true"` added to the chat panel.
- Focus trap: Tab cycles only within the open panel; Shift+Tab wraps correctly.
- Background elements get `aria-hidden="true"` when the chat opens and are restored on close.
- `›` scroll arrow hidden from tab order and marked `aria-hidden` when all chips are visible.
- Chip touch targets increased to 44 px minimum (padding: 10px 16px on mobile).
- Chat input set to `font-size: 16px` on mobile to prevent iOS Safari auto-zoom on focus.

### iOS Safari keyboard overlap fix — mobile chat
Fixed the on-screen keyboard covering the chat input on iOS Safari. Two-part fix:
- `body { position: fixed; width: 100% }` when the chat is open on mobile (reliable iOS scroll freeze); scroll position saved and restored on close.
- `fitSheet()` switched from a `bottom`-offset approach to `top + height` mirroring the Visual Viewport API, so the panel always sits exactly above the keyboard.
