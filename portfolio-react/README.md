# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

---
name: Narnígena Portfolio System
colors:
  surface: '#fff8f4'
  surface-dim: '#dfd9d5'
  surface-bright: '#fff8f4'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f9f2ee'
  surface-container: '#f3ede8'
  surface-container-high: '#ede7e3'
  surface-container-highest: '#e8e1dd'
  on-surface: '#1d1b19'
  on-surface-variant: '#4d463d'
  inverse-surface: '#33302d'
  inverse-on-surface: '#f6efeb'
  outline: '#7f766b'
  outline-variant: '#d0c5b9'
  surface-tint: '#6e5b41'
  primary: '#6e5b41'
  on-primary: '#ffffff'
  primary-container: '#ffe4c2'
  on-primary-container: '#78654a'
  inverse-primary: '#dcc3a2'
  secondary: '#5c5f62'
  on-secondary: '#ffffff'
  secondary-container: '#dee0e4'
  on-secondary-container: '#606366'
  tertiary: '#a33e18'
  on-tertiary: '#ffffff'
  tertiary-container: '#ffe2d9'
  on-tertiary-container: '#af4721'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#f9debd'
  primary-fixed-dim: '#dcc3a2'
  on-primary-fixed: '#261905'
  on-primary-fixed-variant: '#55442b'
  secondary-fixed: '#e1e2e6'
  secondary-fixed-dim: '#c5c6ca'
  on-secondary-fixed: '#191c1f'
  on-secondary-fixed-variant: '#44474a'
  tertiary-fixed: '#ffdbd0'
  tertiary-fixed-dim: '#ffb59d'
  on-tertiary-fixed: '#390c00'
  on-tertiary-fixed-variant: '#832701'
  background: '#fff8f4'
  on-background: '#1d1b19'
  surface-variant: '#e8e1dd'
typography:
  display-lg:
    fontFamily: Space Grotesk
    fontSize: 80px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.04em
  display-lg-mobile:
    fontFamily: Space Grotesk
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  headline-editorial:
    fontFamily: Libre Caslon Text
    fontSize: 42px
    fontWeight: '400'
    lineHeight: '1.2'
  headline-md:
    fontFamily: Space Grotesk
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.3'
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-caps:
    fontFamily: Space Grotesk
    fontSize: 12px
    fontWeight: '700'
    lineHeight: '1.0'
    letterSpacing: 0.1em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  unit: 8px
  gutter: 24px
  margin-desktop: 64px
  margin-mobile: 20px
  max-width: 1440px
---

## Brand & Style

The design system is anchored in a high-end editorial aesthetic, blending the precision of Swiss modernism with a warm, organic color palette. It is designed for a professional creative portfolio that values clarity, spaciousness, and a sophisticated tension between technical typography and classical serif accents.

The style is **Minimalist-Editorial**. It utilizes generous whitespace (macro-typography) to let imagery breathe, while employing sharp structural lines to create a sense of architectural rigor. The emotional response is one of confidence, warmth, and curated excellence.

## Colors

The palette revolves around a "Paper and Ink" philosophy. The primary background (Cream) provides a softer, more premium feel than pure white, reducing eye strain and creating a canvas that feels like a physical publication.

- **Primary (Cream):** Used for all major background surfaces to establish the brand's warmth.
- **Secondary (Ink Black):** Used for primary text and high-contrast UI elements to ensure accessibility and authority.
- **Accent (Orange):** Used for interactive elements, primary buttons, and structural divider lines.
- **Dark Accent (Ochre):** Reserved for hover states and deep emphasis, providing a sophisticated transition from the primary orange.

## Typography

This design system employs a tri-font strategy to achieve its editorial character. 

1.  **Space Grotesk** is the primary display face, used for large headlines and navigational elements to provide a modern, technical edge.
2.  **Libre Caslon Text** (serving as a high-quality alternative to Made Mirage) is used sparingly for sub-headings or "pull-quote" style text to inject a classical, literary feel.
3.  **Inter** provides the functional backbone for body copy, ensuring maximum readability across all devices.

All uppercase labels should utilize increased letter spacing for a refined, "spaced-out" look characteristic of high-fashion layouts.

## Layout & Spacing

The layout follows a **Fixed Grid** philosophy on desktop to maintain the integrity of an editorial composition, while transitioning to a fluid model for mobile.

- **Desktop:** A 12-column grid with a maximum container width of 1440px. Large 64px margins ensure the content feels centered and precious.
- **Structural Lines:** Use 1px weight lines in the Accent Orange (#EA8A3A) to separate sections, specifically between the sidebar navigation and the main content.
- **Vertical Rhythm:** Utilize a 8px baseline grid. Section spacing should be generous (e.g., 120px or 160px) to emphasize the minimalist theme.
- **Mobile:** Elements reflow to a single column with 20px margins. The sidebar navigation collapses into a full-screen overlay menu.

## Elevation & Depth

This system avoids traditional drop shadows to maintain its clean, graphic look. Depth is conveyed through:

- **Tonal Layering:** Using subtle variations of the cream background or semi-transparent overlays for modals.
- **Low-Contrast Outlines:** Instead of shadows, use 1px solid borders in the Secondary color at a very low opacity (10-15%) or the Accent color for interactive cards.
- **Flat Overlays:** Navigation menus and drawers should appear as flat, solid sheets of color that slide over the main content, maintaining the 2D editorial feel.

## Shapes

To balance the "sharp" nature of the typography and structural lines, the design system uses **Soft** roundedness.

- **Standard Elements:** Buttons and input fields use a 0.25rem (4px) radius.
- **Cards & Large Format Images:** Use a 0.5rem (8px) radius to soften the visual impact of large media blocks without losing the architectural feel.
- **Iconography:** Use geometric, line-based icons with a consistent 2px stroke weight to match the structural lines of the UI.

## Components

### Buttons
- **Primary:** Solid Accent Orange (#EA8A3A) with Ink Black (#191C1F) text. Soft corners. Hover state transitions to Ochre (#802500).
- **Secondary/Ghost:** Ink Black 1px border, no fill. High-letter-spaced uppercase text.

### Cards
- Large-format image focus. Minimalist text footer inside the card or immediately below.
- Hover effect: Subtle scale-up of the image (1.02x) while the card container remains fixed.

### Forms
- Inputs are minimalist: bottom-border only (1px Ink Black) or a very light 4-sided stroke.
- Focus state: Border changes to Accent Orange.

### Navigation
- **Sidebar (Desktop):** Fixed to the left or right. Uses 1px Orange lines to delineate the menu from the work. 
- **Mobile Overlay:** Hamburger icon triggers a full-screen Cream (#FFE4C2) background with large-scale Space Grotesk links centered vertically.

### Lists
- Clean, unstyled lists with Orange bullet points or 1px Orange horizontal dividers between items.
