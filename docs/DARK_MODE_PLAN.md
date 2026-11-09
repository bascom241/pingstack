# PingStack landing page: dark mode plan

Status: implemented. System/Light/Dark selection, persistent preferences, semantic colors, and live globe recoloring are enabled. Production build and browser checks passed.

## 1. Establish theme tokens

Replace hard-coded backgrounds, text, and borders with semantic CSS variables, then map them into Tailwind's theme. Keep the existing light theme as the initial reference.

| Token | Light | Proposed dark |
| --- | --- | --- |
| Page background | `#ffffff` | `#0c0c0c` |
| Alternate section | `#f5f5f5` | `#111111` |
| Card surface | `#fafafa` / `#ffffff` | `#191919` |
| Elevated surface | `#f5f7fa` | `#141414` |
| Primary text | `#171717` | `#f0eeea` |
| Secondary text | `#777777` | `#aaa7a2` |
| Border | Neutral black at low opacity | `#303030` |
| Primary button | `#004aad` | `#004aad` |
| Link / small blue icon | `#004aad` | `#83aff2` |

These are design candidates, not contrast-certified final values. Verify every actual text/background pairing, particularly orange/green labels and disabled controls. Keep white text on primary buttons. Preserve the Showcase's blue, orange, and green artwork; use lighter accessible accent tokens for small text where needed. Do not introduce gradients.

## 2. Add a three-way theme preference

- Offer System, Light, and Dark in an accessible navbar control using Hugeicons.
- Save the choice locally and apply it to the root element before first paint, avoiding a bright flash on dark-theme visits.
- Follow system changes only when the saved choice is System.
- Set the CSS `color-scheme` property so native controls match the selected theme.
- Keep the same server-rendered structure to avoid hydration differences; ensure the control works on mobile and by keyboard.

## 3. Convert the page section by section

1. Navbar, mobile navigation, footer, focus outlines, links, and shared buttons.
2. Hero: preserve the background video, white typography, and brand-blue base. Adjust the solid overlay only if contrast needs it.
3. Showcase: dark surfaces, softer shadows, visible borders, existing colored icons and scroll stack.
4. Product previews and use cases: retain screenshots in their original colors inside clearly separated frames. Do not invert screenshots, photography, or video. Retain selected/unselected control contrast.
5. Globe: use theme-aware ocean/land colors and arc materials, with an equally legible static fallback. Update Three.js uniforms when the theme changes without rebuilding the scene or resetting rotation. Preserve pause and reduced-motion behavior.
6. Developer code panel, pricing, FAQs, and the final CTA: apply semantic tokens to text, borders, controls, and open/selected states. Keep the final CTA in brand blue.

## 4. Preserve motion and accessibility

- Keep Framer Motion entrance animations and the Showcase stack independent of theme.
- Avoid animating the entire page's colors during theme changes; respect reduced-motion preferences.
- Check focus rings, hover states, button labels, disclosure icons, and selected controls in both themes.
- Verify normal text contrast of at least 4.5:1 and large text at least 3:1; verify control boundaries and meaningful icons as well.

## 5. Validate before enabling

- Check desktop, mobile, and short viewports with System, Light, and Dark selected.
- Test first visit, refresh, saved preference, and operating-system theme changes.
- Check JavaScript-disabled content, unavailable local storage, reduced motion, WebGL unavailable, and context loss.
- Check the mobile menu, FAQs, copy buttons, preview tabs, globe controls, and Showcase overlap in both themes.
- Run TypeScript and the production build, then inspect browser screenshots for visual regressions.

Recommended sequence: theme tokens → preference control → shared UI → section conversion → globe materials → browser and accessibility checks.

## Implemented validation

Verified saved light and dark settings after reload, system color-scheme changes, mobile layouts from 320px through 1280px, native mobile navigation, FAQ expansion, API tab switching, and globe canvas preservation during theme changes. Verified switching when storage is blocked and system-dark CSS fallback with JavaScript disabled. No hydration or runtime errors were observed. Dark-theme foreground, secondary text, links, and code colors exceed 4.5:1 against the card surface.

## Visual revision

The dark theme uses neutral charcoal instead of navy. Its navbar is flat, Showcase panels have quieter typography and one faint ring, and the developer panel uses neutral tabs and a bounded scrollable code area. The globe has no enclosing card or promotional badge. Use-case cards use open layouts and dividing rules. Blue remains on actions and links; Showcase artwork retains blue, orange, and green. Light-theme shapes and decoration remain intact. Browser checks cover desktop/mobile layouts, sticky positioning, API tabs, globe rendering, text contrast, and light-theme preservation.
