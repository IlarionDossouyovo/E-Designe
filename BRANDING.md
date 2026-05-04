# 🎨 E-DÉSIGNE - BRAND IDENTITY GUIDE
## AI-Powered Design Platform by ELECTRON

---

## 🏷️ BRAND OVERVIEW

**Brand Name:** E-Designe  
**Parent Brand:** ELECTRON  
**Tagline:** AI-Powered Design Platform  
**Tone:** Powerful, Intelligent, Innovative, Premium, Global

---

## 🎯 LOGO VARIANTS

### 1. Monogram (Default)
- **File:** `logo-e-monogram.svg`
- **Use:** Favicon, mobile app, social icons
- **Size:** 120x120px
- **Description:** Minimal "E" with subtle gold neural dots

### 2. Square Icon
- **File:** `logo-e-designe-icon.svg`
- **Use:** App icon, PWA icon, splash screen
- **Size:** 200x200px
- **Description:** Full "E" with animated electron orbit effect

### 3. Horizontal
- **File:** `logo-e-designe-horizontal-dark.svg`
- **Use:** Website header, email signatures, documents
- **Size:** 400x80px
- **Description:** Logo + "E-Designe" + "BY ELECTRON" with accent line

### 4. Main Brand
- **File:** `logo-e-designe-main.svg`
- **Use:** Marketing materials, presentations
- **Size:** 120x120px
- **Description:** Full logo with animated glow effects

### 5. Favicon
- **File:** `public/favicon.svg`
- **Use:** Browser tab, bookmark icon
- **Size:** 32x32px (scaled)

---

## 🎨 COLOR PALETTE

| Color | Hex | Usage |
|-------|-----|-------|
| **Deep Navy** | `#0a0a0f` | Primary background |
| **Electric Blue** | `#4B6CB7` | Primary accent |
| **Neon Blue** | `#6B8DD6` | Secondary accent |
| **Gold** | `#FFD700` | Premium highlights |
| **Dark Slate** | `#19232D` | Secondary background |
| **White** | `#FFFFFF` | Text on dark |

---

## ✨ VISUAL EFFECTS

### Electron Orbit Animation
- 3 orbiting dots with pulse animation
- Orbital ring with 50% opacity
- Creates sense of energy/motion

### Neural Lines
- Minimal stroke paths inside the "E"
- Represents AI processing
- Subtle positioning

### Gold Accents
- Neural dots on strategic points
- Premium feel
- Intelligence indicator

### Glow Effects
- Soft neon edges
- Creates futuristic vibe
- Energy/power indication

---

## 📱 RESPONSIVE LOGOS

### Implementation (React Component)
```jsx
import Logo from './components/Logo'

// Different sizes and variants
<Logo variant="monogram" size="xs" />  // 24px - mobile nav
<Logo variant="monogram" size="sm" />   // 32px - footer
<Logo variant="monogram" size="md" />   // 48px - default header
<Logo variant="monogram" size="lg" />  // 64px - hero section
<Logo variant="monogram" size="xl" />  // 96px - splash

// Full horizontal
<Logo variant="horizontal" size="lg" />

// Square app icon
<Logo variant="square" size="lg" />
```

---

## 📐 USAGE GUIDELINES

### DO ✅
- Use the correct logo for each context
- Maintain aspect ratio
- Leave clear space (minimum 10% of width)
- Use on approved backgrounds only

### DON'T ❌
- Don't alter colors
- Don't stretch or compress
- Don't add effects not in brand
- Don't use on busy backgrounds
- Don't mix with other logos

---

## 🔗 FILE STRUCTURE

```
frontend/src/assets/
├── logo-e-monogram.svg          # Monogram (default) - 120x120
├── logo-e-designe-icon.svg      # Square icon - 200x200
├── logo-e-designe-horizontal-dark.svg  # Horizontal - 400x80
├── logo-e-designe-main.svg     # Main with text - 120x120
├── logo-e-designe-dark.svg  # Legacy dark
├── logo-e-designe-light.svg  # Legacy light
├── logo-app-icon.svg       # Legacy app icon
├── logo-icon.svg          # Legacy icon
└── logo.svg               # Legacy logo

frontend/public/
└── favicon.svg            # Favicon - 32x32
```

---

## 🎬 ANIMATED VS STATIC

### Animated (Web)
- Electron orbit pulse
- Neural dot glow
- Energy ripple effect

### Static (Print/Export)
- All animations disabled
- Clean vector shapes
- Print-ready

---

*Brand created: 2026 | ELECTRON Ecosystem*