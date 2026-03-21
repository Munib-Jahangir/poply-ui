# poply-ui — Product Requirements Document (PRD)
> Version 1.0.0 · Zero to Hero · Complete Package Specification

---

## Table of Contents

1. [Package Overview](#1-package-overview)
2. [Tech Stack & Architecture](#2-tech-stack--architecture)
3. [Installation & Setup](#3-installation--setup)
4. [Core API & Syntax](#4-core-api--syntax)
5. [Configuration Options (Full Reference)](#5-configuration-options-full-reference)
6. [150 Popup Design Prompts](#6-150-popup-design-prompts)
7. [Framework Integration Examples](#7-framework-integration-examples)
8. [File & Folder Structure](#8-file--folder-structure)
9. [package.json Specification](#9-packagejson-specification)
10. [Build & Publish Pipeline](#10-build--publish-pipeline)
11. [Theming System](#11-theming-system)
12. [Accessibility (a11y)](#12-accessibility-a11y)
13. [Testing Requirements](#13-testing-requirements)
14. [Changelog & Versioning](#14-changelog--versioning)

---

## 1. Package Overview

**Name:** `poply-ui`
**Tagline:** _Beautiful, ready-made popups for every occasion._
**NPM:** `https://www.npmjs.com/package/poply-ui`
**GitHub:** `https://github.com/yourusername/poply-ui`
**License:** MIT

poply-ui is a zero-dependency (or minimal-dependency), framework-agnostic JavaScript library that provides 150+ beautifully designed popup components. Each design is ready to use out of the box — no design skills required. Themes range from iOS glass morphism to brutalist, neon, nature, and luxury styles.

### Goals

- One-liner popup calls with sane defaults
- 150+ distinct visual themes built in
- Works in Vanilla JS, React, Vue, Svelte, Next.js, Nuxt
- Fully accessible (WCAG 2.1 AA)
- TypeScript support with full types
- Tree-shakeable — only import what you use
- Dark mode support on all designs
- Animatable with built-in motion presets
- Customisable via props or CSS variables

---

## 2. Tech Stack & Architecture

| Layer | Choice | Reason |
|---|---|---|
| Language | TypeScript 5.x | Type safety, autocomplete |
| Bundler | Rollup + Vite | ESM + CJS + UMD outputs |
| Styling | Vanilla CSS + CSS Variables | Zero runtime overhead |
| Animations | Web Animations API | Native, no dep |
| Testing | Vitest + Playwright | Unit + E2E |
| Docs | VitePress | Fast static docs site |
| Linting | ESLint + Prettier | Consistent code |
| CI/CD | GitHub Actions | Auto publish to NPM |

### Output Formats

```
dist/
  poply-ui.esm.js       ← ES Module (tree-shakeable)
  poply-ui.cjs.js       ← CommonJS
  poply-ui.umd.js       ← Browser <script> tag
  poply-ui.min.js       ← Minified UMD
  poply-ui.css          ← All styles (optional import)
  types/
    index.d.ts          ← TypeScript declarations
```

---

## 3. Installation & Setup

### NPM

```bash
npm install poply-ui
```

### Yarn

```bash
yarn add poply-ui
```

### PNPM

```bash
pnpm add poply-ui
```

### Bun

```bash
bun add poply-ui
```

### CDN (Browser — no bundler)

```html
<!-- Latest version -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/poply-ui/dist/poply-ui.css">
<script src="https://cdn.jsdelivr.net/npm/poply-ui/dist/poply-ui.umd.min.js"></script>

<!-- Specific version -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/poply-ui@1.0.0/dist/poply-ui.css">
<script src="https://cdn.jsdelivr.net/npm/poply-ui@1.0.0/dist/poply-ui.umd.min.js"></script>

<!-- unpkg mirror -->
<script src="https://unpkg.com/poply-ui/dist/poply-ui.umd.min.js"></script>
```

### Basic Setup (Vanilla JS)

```javascript
import Poply from 'poply-ui';
import 'poply-ui/dist/poply-ui.css';

// That's it. Start firing popups.
Poply.alert({ theme: 'ios-glass', title: 'Hello!', message: 'Welcome to poply-ui' });
```

### React Setup

```jsx
import { usePoply, PoplyProvider } from 'poply-ui/react';
import 'poply-ui/dist/poply-ui.css';

// Wrap your app once
export default function App() {
  return (
    <PoplyProvider>
      <YourApp />
    </PoplyProvider>
  );
}

// Use anywhere
function MyComponent() {
  const poply = usePoply();
  return <button onClick={() => poply.alert({ theme: 'ios-glass', title: 'Hello!' })}>Open</button>;
}
```

### Vue Setup

```javascript
// main.js
import { createApp } from 'vue';
import PoplyUI from 'poply-ui/vue';
import 'poply-ui/dist/poply-ui.css';

const app = createApp(App);
app.use(PoplyUI);
app.mount('#app');

// In component
this.$poply.alert({ theme: 'neon-glow', title: 'Yo!' });
// or Composition API
import { usePoply } from 'poply-ui/vue';
const poply = usePoply();
```

---

## 4. Core API & Syntax

### Method Types

poply-ui exposes five popup types:

```
Poply.alert()     → Simple message popup (one button)
Poply.confirm()   → Yes/No decision popup (two buttons)
Poply.prompt()    → Input field popup (text entry)
Poply.toast()     → Non-blocking notification (auto-dismiss)
Poply.custom()    → Full custom HTML content popup
```

### Basic Syntax Pattern

```javascript
Poply.<type>({
  theme: 'theme-name',   // Required — see 150 themes below
  title: 'string',       // Optional heading
  message: 'string',     // Body text
  icon: 'emoji or url',  // Optional icon
  ...options             // See full options table
})
```

All methods return a **Promise**:

```javascript
// alert — resolves when closed
await Poply.alert({ theme: 'ios-glass', title: 'Done!' });
console.log('User dismissed the alert');

// confirm — resolves true (confirm) or false (cancel)
const result = await Poply.confirm({
  theme: 'material-elevated',
  title: 'Delete file?',
  message: 'This cannot be undone.',
  confirmText: 'Delete',
  cancelText: 'Keep'
});
if (result) deleteFile();

// prompt — resolves string (input value) or null (cancelled)
const name = await Poply.prompt({
  theme: 'soft-pastel',
  title: 'What is your name?',
  placeholder: 'Enter name...',
  defaultValue: ''
});
if (name) console.log(`Hello, ${name}`);

// toast — fire and forget
Poply.toast({
  theme: 'minimal-dark',
  message: 'Changes saved!',
  duration: 3000,
  position: 'top-right'
});

// custom — full control
Poply.custom({
  theme: 'brutalist-black',
  html: `<h2>Custom HTML</h2><p>Anything goes here.</p>`,
  width: '500px'
});
```

---

## 5. Configuration Options (Full Reference)

### Common Options (All Types)

| Option | Type | Default | Description |
|---|---|---|---|
| `theme` | `string` | `'default'` | Visual theme name (see 150 below) |
| `title` | `string` | `''` | Popup heading text |
| `message` | `string` | `''` | Body/description text |
| `icon` | `string` | `''` | Emoji, image URL, or SVG string |
| `animation` | `string` | `'fade'` | Entry animation: `fade`, `slide-up`, `slide-down`, `zoom`, `bounce`, `flip`, `rotate`, `shake`, `none` |
| `duration` | `number` | `300` | Animation duration in ms |
| `closeOnBackdrop` | `boolean` | `true` | Close when clicking outside |
| `closeOnEsc` | `boolean` | `true` | Close on Escape key |
| `showCloseButton` | `boolean` | `false` | Show × button in corner |
| `width` | `string` | `'auto'` | Popup width e.g. `'400px'`, `'90%'` |
| `maxWidth` | `string` | `'520px'` | Max popup width |
| `zIndex` | `number` | `9999` | CSS z-index |
| `backdropColor` | `string` | theme-based | Custom backdrop rgba |
| `backdropBlur` | `string` | theme-based | Backdrop blur e.g. `'10px'` |
| `borderRadius` | `string` | theme-based | Custom border radius |
| `customClass` | `string` | `''` | Extra CSS class on popup |
| `rtl` | `boolean` | `false` | Right-to-left layout |
| `position` | `string` | `'center'` | `center`, `top`, `bottom`, `top-left`, `top-right`, `bottom-left`, `bottom-right` |
| `html` | `string` | `''` | Custom inner HTML (custom type) |
| `onOpen` | `function` | `null` | Callback when popup opens |
| `onClose` | `function` | `null` | Callback when popup closes |

### Alert-Specific Options

| Option | Type | Default | Description |
|---|---|---|---|
| `buttonText` | `string` | `'OK'` | Label for dismiss button |
| `buttonColor` | `string` | theme-based | Button background color |
| `buttonTextColor` | `string` | theme-based | Button text color |

### Confirm-Specific Options

| Option | Type | Default | Description |
|---|---|---|---|
| `confirmText` | `string` | `'Confirm'` | Label for confirm button |
| `cancelText` | `string` | `'Cancel'` | Label for cancel button |
| `confirmColor` | `string` | theme-based | Confirm button bg color |
| `cancelColor` | `string` | theme-based | Cancel button bg color |
| `dangerMode` | `boolean` | `false` | Styles confirm button red |
| `swapButtons` | `boolean` | `false` | Swap button order |

### Prompt-Specific Options

| Option | Type | Default | Description |
|---|---|---|---|
| `placeholder` | `string` | `''` | Input placeholder text |
| `defaultValue` | `string` | `''` | Pre-filled input value |
| `inputType` | `string` | `'text'` | HTML input type: `text`, `email`, `password`, `number`, `tel`, `url` |
| `maxLength` | `number` | `null` | Max character limit |
| `validator` | `function` | `null` | `(val) => true or 'Error message'` |
| `confirmText` | `string` | `'Submit'` | Submit button label |
| `cancelText` | `string` | `'Cancel'` | Cancel button label |

### Toast-Specific Options

| Option | Type | Default | Description |
|---|---|---|---|
| `duration` | `number` | `3000` | Auto-dismiss time in ms (`0` = no auto-dismiss) |
| `position` | `string` | `'top-right'` | Where toast appears on screen |
| `progress` | `boolean` | `true` | Show progress bar |
| `pauseOnHover` | `boolean` | `true` | Pause timer on hover |
| `closeable` | `boolean` | `true` | Show × close icon |
| `stack` | `boolean` | `true` | Stack multiple toasts |

---

## 6. 150 Popup Design Prompts

Each entry shows the theme name and example usage. Pass the theme name in `theme:` option.

---

### 🍎 iOS & Apple-Inspired (1–15)

```javascript
// 1. iOS Glass — Frosted glass card, SF-style typography
Poply.alert({ theme: 'ios-glass', title: 'iCloud Backup', message: 'Backup completed successfully.', icon: '☁️' });

// 2. iOS Dark — Dark mode iOS system alert replica
Poply.confirm({ theme: 'ios-dark', title: 'Delete Message?', message: 'This action cannot be undone.', dangerMode: true });

// 3. iOS Light — Pure white iOS alert with rounded buttons
Poply.alert({ theme: 'ios-light', title: 'Location Access', message: 'Allow app to access your location?', icon: '📍' });

// 4. macOS Ventura — macOS dialog window with traffic lights
Poply.confirm({ theme: 'macos-ventura', title: 'Trash Item', message: 'Are you sure you want to move this to Trash?' });

// 5. macOS Dark — Dark macOS system dialog
Poply.alert({ theme: 'macos-dark', title: 'System Update', message: 'macOS 15 is ready to install.' });

// 6. Apple Watch — Rounded, compact, dark circular card
Poply.toast({ theme: 'apple-watch', message: 'Activity goal reached! 🎉', duration: 2500 });

// 7. iPadOS Split — Wide, two-panel iPadOS dialog
Poply.confirm({ theme: 'ipados-split', title: 'Sync Now?', message: 'Syncing will overwrite local changes.' });

// 8. iOS Action Sheet — Bottom sheet with stacked options
Poply.confirm({ theme: 'ios-action-sheet', title: 'Share Photo', confirmText: 'Save to Files', cancelText: 'Cancel' });

// 9. Apple Silicon — Premium dark card with subtle gradient border
Poply.alert({ theme: 'apple-silicon', title: 'Performance Mode', message: 'Your Mac is now in High Performance mode.', icon: '⚡' });

// 10. AirDrop — Blue radial glow card with icon
Poply.alert({ theme: 'airdrop', title: 'AirDrop', message: '"MacBook Pro" would like to share a file.', icon: '📡' });

// 11. iOS Springboard — App icon style popup with blur
Poply.alert({ theme: 'ios-springboard', title: 'New App', message: '"Poply" has been installed.', icon: '🎊' });

// 12. tvOS — Large, bold, TV-optimised dark popup
Poply.alert({ theme: 'tvos', title: 'Now Playing', message: 'Stranger Things S4 E1', icon: '📺' });

// 13. iOS Haptic — Subtle warm alert with vibration feel
Poply.confirm({ theme: 'ios-haptic', title: 'Remove Face ID?', dangerMode: true });

// 14. iOS Status Bar — Slim banner like iOS notification
Poply.toast({ theme: 'ios-status-bar', message: 'Message from Arham', position: 'top', duration: 4000 });

// 15. iOS Live Activity — Dynamic island inspired compact card
Poply.toast({ theme: 'ios-live-activity', message: '🏃 Run: 3.2 km · 18 min', position: 'top', duration: 5000 });
```

---

### 💎 Glass Morphism (16–28)

```javascript
// 16. Glass Clear — Ultra-transparent frosted card
Poply.alert({ theme: 'glass-clear', title: 'Notification', message: 'You have 3 new messages.' });

// 17. Glass Blue — Blue-tinted frosted glass card
Poply.confirm({ theme: 'glass-blue', title: 'Export Data?', message: 'All records will be exported as CSV.' });

// 18. Glass Purple — Purple hue frosted popup
Poply.alert({ theme: 'glass-purple', title: 'Premium Unlocked', message: 'Welcome to Poply Pro!', icon: '💜' });

// 19. Glass Dark — Dark frosted glass, barely-there background
Poply.prompt({ theme: 'glass-dark', title: 'Enter Code', placeholder: 'Access code...' });

// 20. Glass Sunset — Warm orange/pink frosted gradient glass
Poply.toast({ theme: 'glass-sunset', message: 'Good evening! 🌇', position: 'bottom-right' });

// 21. Glass Ocean — Deep teal glass with wave texture
Poply.alert({ theme: 'glass-ocean', title: 'Deep Dive', message: 'Explore 2,400+ components.' });

// 22. Glass Aurora — Multicolour aurora borealis frosted card
Poply.alert({ theme: 'glass-aurora', title: 'New Feature', message: 'Dark mode is now available!', icon: '🌌' });

// 23. Glass Mono — Black and white frosted glass, grayscale only
Poply.confirm({ theme: 'glass-mono', title: 'Archive Item?', message: 'Item will be moved to archive.' });

// 24. Glass Neon — Frosted glass with neon green border glow
Poply.alert({ theme: 'glass-neon', title: 'System Online', message: 'All services operational.', icon: '🟢' });

// 25. Glass Rose — Warm pink frosted glass card
Poply.prompt({ theme: 'glass-rose', title: "What's your name?", placeholder: 'Your beautiful name...' });

// 26. Glass Amber — Golden amber frosted card
Poply.toast({ theme: 'glass-amber', message: '⭐ 5-star review received!', duration: 4000 });

// 27. Glass Ink — Deep navy frosted glass with ink-drop feel
Poply.confirm({ theme: 'glass-ink', title: 'Publish Post?', confirmText: 'Publish', cancelText: 'Save Draft' });

// 28. Glass Holographic — Holographic rainbow shimmer glass card
Poply.alert({ theme: 'glass-holographic', title: '✨ Special Edition', message: 'You found a hidden theme!', icon: '🌈' });
```

---

### 🌑 Dark & Moody (29–42)

```javascript
// 29. Minimal Dark — Near-black card, white text, no fluff
Poply.alert({ theme: 'minimal-dark', title: 'Saved', message: 'Your changes have been saved.' });

// 30. Obsidian — Pure black, sharp corners, thin white border
Poply.confirm({ theme: 'obsidian', title: 'Delete Account?', dangerMode: true });

// 31. Charcoal — Soft dark grey card with ember-orange accent
Poply.prompt({ theme: 'charcoal', title: 'Rename File', placeholder: 'New file name...' });

// 32. Dracula — Dracula colour scheme: purple/pink/cyan on dark
Poply.alert({ theme: 'dracula', title: 'Terminal', message: 'Process completed with exit code 0.', icon: '🧛' });

// 33. Midnight — Deep blue-black card with starfield backdrop
Poply.alert({ theme: 'midnight', title: 'Night Mode On', message: 'Sweet dreams! 🌙', icon: '🌙' });

// 34. Ink Black — Newspaper-inspired dark ink card
Poply.confirm({ theme: 'ink-black', title: 'Publish Article?', message: 'This will be visible to all readers.' });

// 35. Raven — Matte black card with subtle feather texture border
Poply.alert({ theme: 'raven', title: 'Dark Theme', message: 'You switched to dark mode.', icon: '🦅' });

// 36. Deep Space — Deep purple-black with floating star particles
Poply.alert({ theme: 'deep-space', title: 'Mission Control', message: 'All systems go. 🚀', icon: '🌌' });

// 37. Void — True black, zero border-radius, minimal animation
Poply.toast({ theme: 'void', message: 'Deleted.', duration: 2000 });

// 38. Carbon — Carbon fibre texture dark card
Poply.confirm({ theme: 'carbon', title: 'Overwrite Build?', message: 'Current build will be replaced.' });

// 39. Shadow — Layered box-shadow dark card with depth
Poply.alert({ theme: 'shadow', title: 'Reminder', message: 'Meeting in 15 minutes.', icon: '🔔' });

// 40. Dark Gradient — Diagonal dark to darker gradient card
Poply.prompt({ theme: 'dark-gradient', title: 'Set Password', inputType: 'password', placeholder: '••••••••' });

// 41. Eclipse — Dark card with glowing orange/red eclipse ring
Poply.alert({ theme: 'eclipse', title: 'Critical Alert', message: 'Disk space is critically low.', icon: '⚠️' });

// 42. Phantom — Semi-transparent dark card, blends into page
Poply.toast({ theme: 'phantom', message: 'Auto-saved.', duration: 2500, position: 'bottom-right' });
```

---

### ☀️ Light & Clean (43–54)

```javascript
// 43. Minimal Light — Pure white card, barely-there shadow
Poply.alert({ theme: 'minimal-light', title: 'Success', message: 'Profile updated successfully.', icon: '✅' });

// 44. Paper — Slight off-white with paper texture, soft shadow
Poply.confirm({ theme: 'paper', title: 'Print Document?', message: 'Send to default printer.' });

// 45. Snow — Ice-white with very faint blue tint, sharp clean
Poply.alert({ theme: 'snow', title: 'All Clear', message: 'No issues found.', icon: '❄️' });

// 46. Chalk — Whiteboard chalk texture, handwritten-style font
Poply.prompt({ theme: 'chalk', title: 'Write a note', placeholder: 'Jot something down...' });

// 47. Linen — Linen/canvas texture warm white card
Poply.alert({ theme: 'linen', title: 'Welcome Back', message: 'Glad to see you again!', icon: '☕' });

// 48. Cloud — Pillowy white with soft cotton-cloud shadow
Poply.toast({ theme: 'cloud', message: 'Synced to cloud ☁️', duration: 3000, position: 'top-right' });

// 49. Clean Corporate — White card, blue accent, professional
Poply.confirm({ theme: 'clean-corporate', title: 'Submit Report?', confirmText: 'Submit', cancelText: 'Review' });

// 50. Origami — White card with subtle fold-crease texture
Poply.alert({ theme: 'origami', title: 'New Message', message: 'You have 1 unread message.', icon: '✉️' });

// 51. Frost White — White glass with heavy blur, barely visible border
Poply.prompt({ theme: 'frost-white', title: 'Search', placeholder: 'Type to search...' });

// 52. Eggshell — Warm slightly-yellow white, cosy and soft
Poply.alert({ theme: 'eggshell', title: 'Good Morning!', message: 'You have 2 events today.', icon: '🌤️' });

// 53. Gallery — Museum-white with thin black border, serif font
Poply.confirm({ theme: 'gallery', title: 'Purchase Artwork?', message: '"Sunset No.3" · $240', confirmText: 'Buy' });

// 54. Rice Paper — Japanese washi paper texture white card
Poply.alert({ theme: 'rice-paper', title: '和平', message: 'Inner peace achieved.', icon: '🍃' });
```

---

### 🌈 Gradient & Colourful (55–68)

```javascript
// 55. Gradient Sunset — Orange to pink diagonal gradient card
Poply.alert({ theme: 'gradient-sunset', title: 'Day Complete', message: 'You crushed it today! 🔥', icon: '🌅' });

// 56. Gradient Ocean — Teal to deep blue gradient
Poply.confirm({ theme: 'gradient-ocean', title: 'Dive In?', message: 'Start your 7-day free trial.' });

// 57. Gradient Aurora — Green to purple Northern Lights gradient
Poply.alert({ theme: 'gradient-aurora', title: 'Wow!', message: 'New record achieved.', icon: '🏆' });

// 58. Gradient Candy — Pink to yellow candy-coloured card
Poply.prompt({ theme: 'gradient-candy', title: 'Your Username?', placeholder: '@yourname' });

// 59. Gradient Midnight — Dark purple to dark blue gradient
Poply.alert({ theme: 'gradient-midnight', title: 'Good Night', message: 'See you tomorrow.', icon: '🌛' });

// 60. Gradient Forest — Dark green to lime gradient
Poply.toast({ theme: 'gradient-forest', message: '🌱 Tree planted! Carbon offset: 2kg', duration: 4000 });

// 61. Gradient Fire — Red to orange to yellow flame gradient
Poply.alert({ theme: 'gradient-fire', title: '🔥 Hot Deal!', message: '70% OFF — ends in 2 hours.' });

// 62. Gradient Lavender — Soft lilac to pale blue pastel gradient
Poply.confirm({ theme: 'gradient-lavender', title: 'Set Reminder?', confirmText: 'Remind Me', cancelText: 'Not Now' });

// 63. Gradient Rose Gold — Rose to gold metallic gradient
Poply.alert({ theme: 'gradient-rose-gold', title: '💎 Premium', message: 'You are a Pro member.', icon: '✨' });

// 64. Gradient Neon Rainbow — Full spectrum rainbow gradient border
Poply.alert({ theme: 'gradient-neon-rainbow', title: 'Achievement!', message: 'Unlocked: Rainbow Collector', icon: '🌈' });

// 65. Gradient Cotton Candy — Baby pink + sky blue soft pastel
Poply.prompt({ theme: 'gradient-cotton-candy', title: 'Nickname?', placeholder: 'Something cute...' });

// 66. Gradient Cyber — Cyan to magenta cyberpunk gradient
Poply.confirm({ theme: 'gradient-cyber', title: 'JACK IN?', message: 'Connect to the mainframe.', confirmText: 'EXECUTE' });

// 67. Gradient Vintage — Sepia to amber old-film gradient
Poply.alert({ theme: 'gradient-vintage', title: 'Throwback', message: 'On this day in 2019...', icon: '📷' });

// 68. Gradient Universe — Deep purple to black cosmic gradient
Poply.alert({ theme: 'gradient-universe', title: '🌌 Infinite', message: 'The possibilities are endless.' });
```

---

### ⚡ Neon & Cyberpunk (69–78)

```javascript
// 69. Neon Green — Pure neon green on black, CRT glow
Poply.alert({ theme: 'neon-green', title: '> CONNECTED', message: 'Signal acquired.', icon: '📡' });

// 70. Neon Pink — Hot pink neon glow, dark background
Poply.confirm({ theme: 'neon-pink', title: 'OVERRIDE?', message: 'This action is irreversible.', dangerMode: true });

// 71. Neon Blue — Electric blue neon borders on black
Poply.alert({ theme: 'neon-blue', title: 'SYSTEM', message: 'Scanning... 100% complete.', icon: '🔵' });

// 72. Neon Cyan — Teal/cyan neon sci-fi terminal style
Poply.prompt({ theme: 'neon-cyan', title: '> INPUT REQUIRED', placeholder: 'Enter command...' });

// 73. Neon Yellow — Bright yellow neon on near-black grey
Poply.toast({ theme: 'neon-yellow', message: '⚠ WARNING: Disk full!', duration: 0, position: 'top' });

// 74. Neon Red — Danger red neon alert, glitch animation
Poply.alert({ theme: 'neon-red', title: '🚨 BREACH DETECTED', message: 'Initiating lockdown protocol.' });

// 75. Cyber Grid — Dark card with cyan grid-line texture
Poply.confirm({ theme: 'cyber-grid', title: 'UPLOAD DATA?', message: '2.4 GB to Cloud Server 7', confirmText: 'TRANSFER' });

// 76. Hologram — Translucent blue hologram-screen effect
Poply.alert({ theme: 'hologram', title: 'HOLO ALERT', message: 'Transmission received.', icon: '👾' });

// 77. Glitch — Text glitch animation, RGB split effect
Poply.alert({ theme: 'glitch', title: 'ERROR 404', message: 'Reality not found.' });

// 78. Matrix Rain — Green falling code background, black card
Poply.alert({ theme: 'matrix-rain', title: 'TRUTH', message: 'There is no spoon.', icon: '💊' });
```

---

### 🎨 Flat & Material Design (79–88)

```javascript
// 79. Material Blue — Google Material Design 3, blue accent
Poply.alert({ theme: 'material-blue', title: 'Info', message: 'Your session will expire in 5 minutes.', icon: 'ℹ️' });

// 80. Material Elevated — Material card with dramatic elevation
Poply.confirm({ theme: 'material-elevated', title: 'Discard Changes?', message: 'Unsaved changes will be lost.' });

// 81. Material You — M3 dynamic colour system, coral accent
Poply.alert({ theme: 'material-you', title: 'Good Morning!', message: 'You have 3 tasks today.', icon: '☀️' });

// 82. Flat Red — Flat design, bright red, bold sans-serif
Poply.confirm({ theme: 'flat-red', title: 'Remove Item?', dangerMode: true, confirmText: 'Remove' });

// 83. Flat Green — Clean flat green success card
Poply.toast({ theme: 'flat-green', message: '✅ Order placed!', duration: 3500, position: 'bottom' });

// 84. Flat Yellow — Yellow flat warning card
Poply.alert({ theme: 'flat-yellow', title: 'Warning', message: 'Battery below 20%.', icon: '🔋' });

// 85. Flat Purple — Purple flat notification
Poply.alert({ theme: 'flat-purple', title: 'New Feature', message: 'Try our new AI assistant!', icon: '🤖' });

// 86. Flat Teal — Flat teal/mint success card
Poply.toast({ theme: 'flat-teal', message: 'Profile photo updated!', position: 'top-right', duration: 3000 });

// 87. Fluent UI — Microsoft Fluent Design with acrylic effect
Poply.confirm({ theme: 'fluent-ui', title: 'Sign out?', message: 'You will be signed out of all devices.' });

// 88. Bootstrap Alert — Bootstrap 5 style modal, familiar look
Poply.alert({ theme: 'bootstrap', title: 'Success!', message: 'Data submitted successfully.', icon: '✅' });
```

---

### 🌸 Soft & Pastel (89–98)

```javascript
// 89. Soft Pastel — Baby pink/blue/yellow pastel card, rounded
Poply.alert({ theme: 'soft-pastel', title: 'Hello, Sunshine! 🌸', message: 'Hope you have a great day!' });

// 90. Pastel Pink — All-pink soft bubble card
Poply.confirm({ theme: 'pastel-pink', title: 'Add to Wishlist?', confirmText: '💕 Yes!', cancelText: 'Maybe later' });

// 91. Pastel Blue — Sky blue soft card
Poply.prompt({ theme: 'pastel-blue', title: 'Write a wish 🌊', placeholder: 'I wish...' });

// 92. Pastel Mint — Fresh mint green pastel, rounded corners
Poply.toast({ theme: 'pastel-mint', message: '🌿 Reminder: Drink water!', duration: 4000 });

// 93. Pastel Lilac — Soft purple-lavender card, dreamy
Poply.alert({ theme: 'pastel-lilac', title: 'Sweet Dreams 💜', message: 'Your sleep goal is set for 10:30 PM.' });

// 94. Pastel Peach — Warm peach/salmon pastel card
Poply.alert({ theme: 'pastel-peach', title: 'Cozy Corner ☕', message: 'Your reading list: 3 books.' });

// 95. Pastel Lemon — Bright lemon yellow soft card
Poply.confirm({ theme: 'pastel-lemon', title: 'Start Quiz?', confirmText: "Let's Go! 🍋", cancelText: 'Later' });

// 96. Bubblegum — Bright pink/white round bubbly card
Poply.alert({ theme: 'bubblegum', title: 'Yay! 🎉', message: 'You completed 7 days in a row!' });

// 97. Cotton Candy — Pink and blue swirl pastel card
Poply.alert({ theme: 'cotton-candy', title: 'Sweet!', message: 'Subscription confirmed.', icon: '🍭' });

// 98. Kawaii — Japanese cute style: rounded, pastel, emoji-heavy
Poply.confirm({ theme: 'kawaii', title: '(◕ᴗ◕✿) Are you sure?', confirmText: 'Hai! ✨', cancelText: 'Iie 🙈' });
```

---

### 🏛️ Classic & Vintage (99–108)

```javascript
// 99. Classic — Timeless grey box, system-dialog feel
Poply.confirm({ theme: 'classic', title: 'Confirm Action', message: 'Are you sure you want to proceed?' });

// 100. Windows 98 — Win98 system dialog with pixel borders
Poply.alert({ theme: 'windows-98', title: '⚠ Critical Error', message: 'A fatal exception 0E has occurred at 0028:C00C04D7.' });

// 101. Windows XP — Luna blue XP style with close/min/max buttons
Poply.alert({ theme: 'windows-xp', title: '🛡 Windows Security Alert', message: 'Your computer may be at risk.' });

// 102. Terminal — Old-school green-on-black terminal prompt
Poply.prompt({ theme: 'terminal', title: '$ > prompt:', placeholder: 'Type command and press Enter...' });

// 103. DOS Prompt — DOS box, white on blue, pixel font
Poply.alert({ theme: 'dos-prompt', title: 'POPLY-UI v1.0', message: 'Copyright (C) 2025. All rights reserved.' });

// 104. Newspaper — Black/white newspaper print card, serif font
Poply.confirm({ theme: 'newspaper', title: 'BREAKING', message: 'Major update available. Install now?' });

// 105. Typewriter — Cream card with typewriter-font aesthetic
Poply.prompt({ theme: 'typewriter', title: 'Dear Diary...', placeholder: 'Begin writing...' });

// 106. Vintage Stamp — Stamp/seal style card with dotted border
Poply.alert({ theme: 'vintage-stamp', title: 'APPROVED ✉', message: 'Application accepted.' });

// 107. Film Noir — Black/white 1940s film poster style
Poply.confirm({ theme: 'film-noir', title: "It's a dangerous game.", message: 'Are you sure you want to delete?' });

// 108. Retro 80s — Neon on dark with 80s grid perspective
Poply.alert({ theme: 'retro-80s', title: '📼 SAVED TO VHS', message: 'Memory: 1.2MB used.', icon: '🕹️' });
```

---

### 🎮 Gaming & Fun (109–118)

```javascript
// 109. Achievement — Xbox-style achievement unlocked toast
Poply.toast({ theme: 'achievement', message: '🏆 Achievement: First Login!', duration: 5000, position: 'bottom-left' });

// 110. Game Over — Red on black "Game Over" screen style
Poply.confirm({ theme: 'game-over', title: 'GAME OVER', message: 'Try again?', confirmText: 'RETRY', cancelText: 'QUIT' });

// 111. RPG Quest — Fantasy RPG quest dialogue box style
Poply.confirm({ theme: 'rpg-quest', title: '⚔️ New Quest', message: 'The village elder needs your help!', confirmText: 'Accept', cancelText: 'Decline' });

// 112. Pixel Art — Chunky pixel border, pixelated font
Poply.alert({ theme: 'pixel-art', title: '🎮 PLAYER 1', message: 'HIGH SCORE: 99,999', icon: '👾' });

// 113. Pokemon — Pokémon battle dialogue box style
Poply.confirm({ theme: 'pokemon', title: 'Wild POPUP appeared!', confirmText: 'Battle!', cancelText: 'Run!' });

// 114. Loading Screen — Full-screen dark loading bar popup
Poply.alert({ theme: 'loading-screen', title: 'LOADING...', message: 'Please wait while we prepare your experience.' });

// 115. Loot Box — Glowing treasure box reveal animation
Poply.alert({ theme: 'loot-box', title: '🎁 Rare Drop!', message: 'You received: Diamond Sword', icon: '💎' });

// 116. Health Bar — Red health bar style warning popup
Poply.alert({ theme: 'health-bar', title: 'Low Battery', message: 'Warning: HP 15% remaining!', icon: '❤️' });

// 117. Arcade — Coin-op arcade screen style, scanline effect
Poply.confirm({ theme: 'arcade', title: 'INSERT COIN', message: 'Press to continue...', confirmText: '▶ PLAY', cancelText: '⏹ EXIT' });

// 118. Minecraft — Minecraft dirt-block and stone GUI style
Poply.alert({ theme: 'minecraft', title: 'New Achievement', message: 'Getting Wood — Collect some wood!', icon: '🪵' });
```

---

### 🌿 Nature & Organic (119–126)

```javascript
// 119. Forest — Dark green, moss texture, tree-ring border
Poply.alert({ theme: 'forest', title: '🌲 Carbon Neutral', message: 'Your order offset 3kg CO₂.' });

// 120. Ocean Wave — Wave animation at bottom, deep blue/teal
Poply.alert({ theme: 'ocean-wave', title: '🌊 Surf\'s Up', message: 'High tide at 4:30 PM today.' });

// 121. Sunset Sky — Warm orange/purple horizon gradient
Poply.toast({ theme: 'sunset-sky', message: '🌅 Daily goal achieved!', duration: 4000, position: 'bottom' });

// 122. Leaf Green — Fresh bright green, eco-friendly aesthetic
Poply.confirm({ theme: 'leaf-green', title: 'Go Paperless?', confirmText: '🌿 Yes!', cancelText: 'Maybe later' });

// 123. Stone — Grey stone texture, earthy and grounded
Poply.confirm({ theme: 'stone', title: 'Build Structure?', message: 'This will use 240 stone blocks.' });

// 124. Sakura — Japanese cherry blossom pink with petals
Poply.alert({ theme: 'sakura', title: '🌸 Spring Update', message: 'New themes available!', icon: '🌸' });

// 125. Desert Sand — Warm beige/tan earthy card
Poply.alert({ theme: 'desert-sand', title: '🏜️ Offline Mode', message: 'Working with cached data.' });

// 126. Aurora Borealis — Live animated aurora colours in backdrop
Poply.alert({ theme: 'aurora-borealis', title: '✨ Magical', message: 'You have unlocked a rare theme!', icon: '🎆' });
```

---

### 💼 Business & Professional (127–134)

```javascript
// 127. Executive — Midnight navy, gold trim, serif font, premium
Poply.confirm({ theme: 'executive', title: 'Authorise Payment?', message: '$12,500.00 to Acme Corp.', confirmText: 'Authorise' });

// 128. Corporate Grey — Neutral grey, professional, Times New Roman
Poply.alert({ theme: 'corporate-grey', title: 'Meeting Reminder', message: 'Quarterly Review in 10 minutes.', icon: '📅' });

// 129. Startup — Clean white, coral accent, friendly sans-serif
Poply.confirm({ theme: 'startup', title: 'Launch Feature?', message: 'Push to 12,400 users.', confirmText: '🚀 Ship It!' });

// 130. Legal — Ultra-formal dark-on-white, dense fine print style
Poply.confirm({ theme: 'legal', title: 'Terms & Conditions', message: 'By clicking Accept you agree to our Terms of Service.', confirmText: 'Accept', cancelText: 'Decline' });

// 131. Medical — Clinical white, blue cross, clean hospital style
Poply.alert({ theme: 'medical', title: '🏥 Prescription Ready', message: 'Collect from Pharmacy Counter 3.' });

// 132. Finance — Dark green, USD currency feel, numbers focused
Poply.alert({ theme: 'finance', title: '📈 Portfolio Update', message: 'Total value: $48,200 (+3.2%)' });

// 133. Dashboard Card — Looks like a metric card from a SaaS dashboard
Poply.toast({ theme: 'dashboard-card', message: '📊 Report generated', duration: 4000, position: 'bottom-right' });

// 134. Invoice — White card styled like an invoice/receipt
Poply.confirm({ theme: 'invoice', title: 'Invoice #1042', message: 'Amount due: $320.00', confirmText: 'Pay Now', cancelText: 'Later' });
```

---

### 🎭 Special & Experimental (135–150)

```javascript
// 135. Neumorphism — Soft 3D extruded card, single colour
Poply.alert({ theme: 'neumorphism', title: 'Soft UI', message: 'Neumorphism design applied.', icon: '⬜' });

// 136. Brutalist Black — Raw bold black, full borders, no softness
Poply.confirm({ theme: 'brutalist-black', title: 'DELETE EVERYTHING?', dangerMode: true, confirmText: 'YES. DELETE.' });

// 137. Brutalist White — White background, thick black borders, bold text
Poply.alert({ theme: 'brutalist-white', title: 'THIS IS AN ALERT', message: 'Read it. Now.' });

// 138. Sticker — Looks like a die-cut sticker with white stroke border
Poply.alert({ theme: 'sticker', title: '🎊 You did it!', message: 'New badge unlocked!', icon: '🏅' });

// 139. Comic — Comic book speech bubble style with halftone dots
Poply.confirm({ theme: 'comic', title: 'POW! Delete this?', confirmText: 'ZAP IT!', cancelText: 'NOPE!' });

// 140. Watercolour — Soft watercolour bleed edges, artistic
Poply.alert({ theme: 'watercolour', title: '🎨 Art Mode', message: 'Creative mode enabled.' });

// 141. Emoji Burst — Giant centred emoji with minimal text, animated burst
Poply.alert({ theme: 'emoji-burst', title: '🎉', message: 'Congratulations!', icon: '🎉' });

// 142. Flip Card — Card that flips to reveal content
Poply.alert({ theme: 'flip-card', title: 'Flip for Details', message: 'Order #4821 shipped via DHL.' });

// 143. Spotlight — Dark backdrop, only popup lit up
Poply.confirm({ theme: 'spotlight', title: 'Moment of Truth', message: 'Are you absolutely sure?' });

// 144. Ticket — Event ticket tear-away stub style
Poply.alert({ theme: 'ticket', title: '🎟 Booking Confirmed', message: 'Seat 14B · Gate 7 · 8:00 PM' });

// 145. Receipt — Thermal-print receipt style, monospace font
Poply.alert({ theme: 'receipt', title: 'ORDER RECEIPT', message: '1x Poply Pro — $9.99\nTotal: $9.99' });

// 146. Polaroid — Photo polaroid frame with bottom text field
Poply.alert({ theme: 'polaroid', title: 'Memory Saved 📸', message: 'Added to your album.', icon: '🖼️' });

// 147. Voice Note — Audio waveform visual, microphone icon
Poply.confirm({ theme: 'voice-note', title: '🎙 Record Message?', message: 'Tap to record a voice note.', confirmText: 'Start Recording' });

// 148. Countdown — Shows an animated countdown timer before action
Poply.confirm({ theme: 'countdown', title: 'Session Expiring', message: 'You will be logged out in 60 seconds.', confirmText: 'Stay Logged In' });

// 149. Skeleton — Loading skeleton shimmer card placeholder
Poply.alert({ theme: 'skeleton', title: 'Loading content...', message: '' });

// 150. Confetti Burst — White card with falling confetti background
Poply.alert({ theme: 'confetti-burst', title: '🎊 Milestone Reached!', message: '1,000 users — thank you! 🙏', icon: '🎉' });
```

---

## 7. Framework Integration Examples

### React — with Hooks

```jsx
import { usePoply } from 'poply-ui/react';

function DeleteButton({ id }) {
  const poply = usePoply();

  const handleDelete = async () => {
    const confirmed = await poply.confirm({
      theme: 'obsidian',
      title: 'Delete this item?',
      message: 'You cannot undo this action.',
      dangerMode: true,
      confirmText: 'Delete',
      cancelText: 'Keep it'
    });

    if (confirmed) {
      await deleteItem(id);
      poply.toast({ theme: 'flat-green', message: '✅ Item deleted.', duration: 2500 });
    }
  };

  return <button onClick={handleDelete}>Delete</button>;
}
```

### Vue 3 — Composition API

```vue
<script setup>
import { usePoply } from 'poply-ui/vue';
const poply = usePoply();

async function handleSave() {
  await poply.alert({
    theme: 'material-you',
    title: 'Saved!',
    message: 'Your changes were saved successfully.',
    icon: '💾'
  });
}
</script>
```

### Svelte

```svelte
<script>
  import { poply } from 'poply-ui/svelte';

  async function handleClick() {
    const name = await poply.prompt({
      theme: 'glass-aurora',
      title: 'Enter your name',
      placeholder: 'Name...'
    });
    if (name) alert(`Hello, ${name}!`);
  }
</script>

<button on:click={handleClick}>Open Prompt</button>
```

### Next.js (App Router)

```tsx
'use client';
import { usePoply } from 'poply-ui/react';

export default function Page() {
  const poply = usePoply();

  return (
    <button onClick={() =>
      poply.toast({ theme: 'gradient-sunset', message: 'Hello from Next.js! 🚀', position: 'top-right' })
    }>
      Show Toast
    </button>
  );
}
```

### Vanilla JS (CDN)

```html
<script src="https://cdn.jsdelivr.net/npm/poply-ui/dist/poply-ui.umd.min.js"></script>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/poply-ui/dist/poply-ui.css">

<button onclick="showPopup()">Click Me</button>

<script>
  async function showPopup() {
    const result = await Poply.confirm({
      theme: 'ios-glass',
      title: 'Confirm Purchase',
      message: 'Buy Pro Plan for $9.99/month?',
      confirmText: 'Buy Now',
      cancelText: 'Cancel'
    });
    if (result) console.log('User confirmed!');
  }
</script>
```

---

## 8. File & Folder Structure

```
poply-ui/
├── src/
│   ├── index.ts                  ← Main entry point
│   ├── core/
│   │   ├── Poply.ts              ← Core class
│   │   ├── PopupController.ts    ← DOM manager
│   │   ├── AnimationEngine.ts    ← WAAPI animations
│   │   └── ThemeLoader.ts        ← Theme system
│   ├── types/
│   │   ├── index.d.ts            ← All TypeScript types
│   │   ├── PoplyOptions.ts
│   │   └── ThemeNames.ts         ← Union type of all 150 themes
│   ├── themes/
│   │   ├── index.ts              ← Theme registry
│   │   ├── ios/
│   │   │   ├── ios-glass.css
│   │   │   ├── ios-dark.css
│   │   │   └── ...
│   │   ├── glass/
│   │   ├── dark/
│   │   ├── light/
│   │   ├── gradient/
│   │   ├── neon/
│   │   ├── material/
│   │   ├── pastel/
│   │   ├── classic/
│   │   ├── gaming/
│   │   ├── nature/
│   │   ├── business/
│   │   └── special/
│   ├── adapters/
│   │   ├── react/
│   │   │   ├── index.tsx         ← React adapter
│   │   │   ├── PoplyProvider.tsx
│   │   │   └── usePoply.ts
│   │   ├── vue/
│   │   │   ├── index.ts          ← Vue plugin
│   │   │   └── usePoply.ts
│   │   └── svelte/
│   │       └── index.ts
│   └── utils/
│       ├── domHelpers.ts
│       ├── focusTrap.ts          ← Accessibility
│       └── validateOptions.ts
├── dist/                         ← Build output (generated)
├── docs/                         ← VitePress documentation
├── tests/
│   ├── unit/
│   └── e2e/
├── .github/
│   └── workflows/
│       ├── ci.yml
│       └── publish.yml
├── package.json
├── tsconfig.json
├── vite.config.ts
├── rollup.config.ts
├── .eslintrc.js
├── .prettierrc
├── CHANGELOG.md
├── LICENSE
└── README.md
```

---

## 9. package.json Specification

```json
{
  "name": "poply-ui",
  "version": "1.0.0",
  "description": "Beautiful, ready-made popup components. 150+ themes. Zero friction.",
  "keywords": [
    "popup", "modal", "alert", "confirm", "prompt", "toast",
    "notification", "dialog", "ui", "components", "ios", "glass",
    "neon", "material", "theme", "poply", "poply-ui"
  ],
  "author": "Your Name <you@example.com>",
  "license": "MIT",
  "homepage": "https://poply-ui.dev",
  "repository": {
    "type": "git",
    "url": "https://github.com/yourusername/poply-ui.git"
  },
  "bugs": {
    "url": "https://github.com/yourusername/poply-ui/issues"
  },
  "main": "dist/poply-ui.cjs.js",
  "module": "dist/poply-ui.esm.js",
  "browser": "dist/poply-ui.umd.min.js",
  "types": "dist/types/index.d.ts",
  "exports": {
    ".": {
      "import": "./dist/poply-ui.esm.js",
      "require": "./dist/poply-ui.cjs.js",
      "types": "./dist/types/index.d.ts"
    },
    "./react": {
      "import": "./dist/adapters/react/index.esm.js",
      "require": "./dist/adapters/react/index.cjs.js",
      "types": "./dist/adapters/react/index.d.ts"
    },
    "./vue": {
      "import": "./dist/adapters/vue/index.esm.js",
      "require": "./dist/adapters/vue/index.cjs.js",
      "types": "./dist/adapters/vue/index.d.ts"
    },
    "./svelte": {
      "import": "./dist/adapters/svelte/index.esm.js",
      "types": "./dist/adapters/svelte/index.d.ts"
    },
    "./dist/poply-ui.css": "./dist/poply-ui.css"
  },
  "files": [
    "dist",
    "README.md",
    "LICENSE",
    "CHANGELOG.md"
  ],
  "sideEffects": ["**/*.css"],
  "scripts": {
    "dev": "vite",
    "build": "npm run build:lib && npm run build:types",
    "build:lib": "rollup -c rollup.config.ts",
    "build:types": "tsc --emitDeclarationOnly --outDir dist/types",
    "test": "vitest run",
    "test:watch": "vitest",
    "test:e2e": "playwright test",
    "test:coverage": "vitest run --coverage",
    "lint": "eslint src --ext .ts,.tsx",
    "format": "prettier --write src",
    "docs:dev": "vitepress dev docs",
    "docs:build": "vitepress build docs",
    "prepublishOnly": "npm run build && npm run test",
    "release": "npm run prepublishOnly && npm publish --access public",
    "changelog": "conventional-changelog -p angular -i CHANGELOG.md -s"
  },
  "peerDependencies": {
    "react": ">=17.0.0",
    "vue": ">=3.0.0"
  },
  "peerDependenciesMeta": {
    "react": { "optional": true },
    "vue": { "optional": true }
  },
  "devDependencies": {
    "@playwright/test": "^1.40.0",
    "@types/node": "^20.0.0",
    "@typescript-eslint/eslint-plugin": "^6.0.0",
    "@typescript-eslint/parser": "^6.0.0",
    "@vitejs/plugin-react": "^4.0.0",
    "eslint": "^8.0.0",
    "prettier": "^3.0.0",
    "rollup": "^4.0.0",
    "rollup-plugin-typescript2": "^0.36.0",
    "typescript": "^5.0.0",
    "vite": "^5.0.0",
    "vitepress": "^1.0.0",
    "vitest": "^1.0.0",
    "conventional-changelog-cli": "^4.0.0"
  }
}
```

---

## 10. Build & Publish Pipeline

### Local Development

```bash
# Clone the repo
git clone https://github.com/yourusername/poply-ui.git
cd poply-ui

# Install dependencies
npm install

# Start dev server (live preview)
npm run dev

# Run tests
npm test

# Build for production
npm run build
```

### Publishing to NPM

```bash
# Login to NPM
npm login

# Bump version (patch/minor/major)
npm version patch   # 1.0.0 → 1.0.1
npm version minor   # 1.0.0 → 1.1.0
npm version major   # 1.0.0 → 2.0.0

# Build + Test + Publish (all-in-one)
npm run release

# Or manually
npm publish --access public
```

### GitHub Actions CI/CD

```yaml
# .github/workflows/publish.yml
name: Publish to NPM

on:
  push:
    tags:
      - 'v*'

jobs:
  publish:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          registry-url: 'https://registry.npmjs.org'
      - run: npm ci
      - run: npm test
      - run: npm run build
      - run: npm publish --access public
        env:
          NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}
```

---

## 11. Theming System

### Using CSS Variables

Every theme exposes CSS variables for customisation:

```css
.poply-popup {
  --poply-bg: rgba(255, 255, 255, 0.15);
  --poply-border: rgba(255, 255, 255, 0.3);
  --poply-text: #ffffff;
  --poply-accent: #007AFF;
  --poply-blur: 20px;
  --poply-radius: 18px;
  --poply-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
}
```

Override any theme variable:

```javascript
Poply.alert({
  theme: 'ios-glass',
  title: 'Custom Colours',
  customCSS: {
    '--poply-accent': '#FF6B6B',
    '--poply-radius': '4px'
  }
});
```

### Creating a Custom Theme

```javascript
import { registerTheme } from 'poply-ui';

registerTheme('my-brand', {
  css: `
    .poply-popup.my-brand {
      background: linear-gradient(135deg, #667eea, #764ba2);
      border-radius: 12px;
      color: white;
      font-family: 'Inter', sans-serif;
    }
    .poply-popup.my-brand .poply-confirm-btn {
      background: white;
      color: #667eea;
    }
  `
});

// Now use it
Poply.alert({ theme: 'my-brand', title: 'My Brand!', message: 'Looking good.' });
```

### Dark Mode

All themes support automatic dark mode via `prefers-color-scheme`:

```javascript
Poply.alert({
  theme: 'minimal-light',   // Will auto-switch to dark variant
  title: 'Auto Dark Mode',
  respectSystemTheme: true  // default: true
});

// Force a specific mode
Poply.alert({ theme: 'ios-glass', title: 'Forced Dark', forceDark: true });
Poply.alert({ theme: 'ios-glass', title: 'Forced Light', forceLight: true });
```

---

## 12. Accessibility (a11y)

poply-ui is built with accessibility as a first-class feature:

- All popups render with `role="dialog"` and `aria-modal="true"`
- `aria-labelledby` links heading to the dialog
- `aria-describedby` links body text to the dialog
- Focus is trapped inside the popup when open
- Focus returns to the triggering element when closed
- Keyboard: `Tab`, `Shift+Tab` to navigate buttons, `Enter`/`Space` to activate, `Escape` to close
- Colour contrast meets WCAG 2.1 AA on all 150 themes
- Motion can be reduced: themes respect `prefers-reduced-motion`
- Screen reader announcements via `aria-live` for toasts

---

## 13. Testing Requirements

### Unit Tests (Vitest)

- All 5 popup types render correctly
- All options apply correctly to DOM
- Promise resolves with correct values
- Theme classes are applied
- Custom CSS variables are injected
- Callbacks (onOpen, onClose) fire
- Prompt validator runs and shows error

### E2E Tests (Playwright)

- Each popup type opens and closes via button click
- Confirm: clicking confirm resolves `true`, cancel resolves `false`
- Backdrop click closes popup when `closeOnBackdrop: true`
- Escape key closes popup when `closeOnEsc: true`
- Toast auto-dismisses after `duration` ms
- Focus trap works correctly
- Multiple toasts stack properly

### Coverage Target: 90%+

---

## 14. Changelog & Versioning

Follow [Semantic Versioning](https://semver.org/) and [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: add 'countdown' theme
fix: resolve backdrop click issue on iOS Safari
docs: update README with Vue 3 examples
chore: update dependencies
BREAKING CHANGE: renamed 'theme' option to 'design'
```

### CHANGELOG.md Format

```markdown
# Changelog

## [1.0.0] - 2025-01-01

### Added
- 150 built-in themes
- React, Vue, Svelte adapters
- TypeScript support
- Dark mode on all themes
- Accessibility (WCAG 2.1 AA)

### Fixed
- Focus trap on nested modals

### Breaking Changes
- None (initial release)
```

---

## Quick Reference Card

| Task | Code |
|---|---|
| Install | `npm install poply-ui` |
| Import CSS | `import 'poply-ui/dist/poply-ui.css'` |
| Simple alert | `Poply.alert({ theme: 'ios-glass', title: 'Hi!' })` |
| Confirm dialog | `const yes = await Poply.confirm({ theme: 'obsidian', title: 'Sure?' })` |
| Text prompt | `const val = await Poply.prompt({ theme: 'glass-blue', title: 'Name?' })` |
| Toast | `Poply.toast({ theme: 'flat-green', message: 'Done!', duration: 3000 })` |
| Custom HTML | `Poply.custom({ theme: 'brutalist-black', html: '<b>Hello</b>' })` |
| All themes | See Section 6 (150 themes) |
| React hook | `const poply = usePoply()` |
| Register theme | `registerTheme('my-theme', { css: '...' })` |

---

_PRD by poply-ui team · poply-ui v1.0.0 · MIT License_
