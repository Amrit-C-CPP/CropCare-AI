---
name: Agri-Tech Precision
colors:
  surface: '#f7fbe8'
  surface-dim: '#d7dcca'
  surface-bright: '#f7fbe8'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f1f6e3'
  surface-container: '#ebf0dd'
  surface-container-high: '#e6ead8'
  surface-container-highest: '#e0e5d2'
  on-surface: '#181d12'
  on-surface-variant: '#424936'
  inverse-surface: '#2d3226'
  inverse-on-surface: '#eef3e0'
  outline: '#727a64'
  outline-variant: '#c1cab0'
  surface-tint: '#416900'
  primary: '#416900'
  on-primary: '#ffffff'
  primary-container: '#84cc16'
  on-primary-container: '#315200'
  inverse-primary: '#91db2a'
  secondary: '#2e6a41'
  on-secondary: '#ffffff'
  secondary-container: '#b1f2be'
  on-secondary-container: '#347047'
  tertiary: '#97339a'
  on-tertiary: '#ffffff'
  tertiary-container: '#ff90fd'
  on-tertiary-container: '#7d1883'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#acf847'
  primary-fixed-dim: '#91db2a'
  on-primary-fixed: '#102000'
  on-primary-fixed-variant: '#304f00'
  secondary-fixed: '#b1f2be'
  secondary-fixed-dim: '#96d5a3'
  on-secondary-fixed: '#00210d'
  on-secondary-fixed-variant: '#12512c'
  tertiary-fixed: '#ffd6f8'
  tertiary-fixed-dim: '#ffa9fa'
  on-tertiary-fixed: '#37003b'
  on-tertiary-fixed-variant: '#7b1480'
  background: '#f7fbe8'
  on-background: '#181d12'
  surface-variant: '#e0e5d2'
typography:
  display-lg:
    fontFamily: Outfit
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Outfit
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Outfit
    fontSize: 28px
    fontWeight: '600'
    lineHeight: 36px
  headline-md:
    fontFamily: Outfit
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.05em
rounded:
  sm: 0.5rem
  DEFAULT: 1rem
  md: 1.5rem
  lg: 2rem
  xl: 3rem
  full: 9999px
spacing:
  base: 8px
  container-padding: 32px
  gutter: 24px
  section-gap: 64px
---

## Brand & Style
The design system is engineered to bridge the gap between advanced artificial intelligence and the organic nature of agriculture. It evokes a sense of "High-Tech Vitality"—feeling both clinical in its precision and vibrant in its connection to growth. The target audience includes modern farm managers and agronomists who require data-heavy tools that don't feel encumbered by traditional enterprise stiffness.

The aesthetic follows a **Modern Glassmorphic** style. It prioritizes clarity through generous whitespace, high-contrast typography, and depth through layered translucency. The UI should feel airy, optimistic, and premium, avoiding the "muddy" greens often found in legacy agricultural software in favor of luminous, bio-luminescent tones.

## Colors
The palette is rooted in the "Stone and Lime" concept. The primary **Lime Green** serves as the functional driver—used for calls to action, success states, and data highlights. This is contrasted against a **Deep Forest Green** used exclusively for text and structural iconography to ensure AA/AAA accessibility.

Backgrounds utilize a **Stone 50 (#fafaf9)** base to reduce eye strain compared to pure white, while pure white is reserved for the topmost "Glass" card layers. Accents of soft sky blues or earthen teals may be used sparingly for secondary data visualization, but the core brand identity remains strictly biophilic and high-contrast.

## Typography
This design system employs a dual-font strategy. **Outfit** is used for all display and headline roles; its geometric construction mirrors modern architectural and tech influences. **Inter** is used for all functional body text and data sets, providing maximum legibility in high-density dashboards.

Headlines should utilize "Deep Forest Green" to maintain a strong visual anchor against the vibrant lime accents. Tracking is slightly tightened on larger display type to maintain a cohesive, "locked-in" premium feel.

## Layout & Spacing
The layout follows a **Fluid Grid** model with strict adherence to an 8px spatial rhythm. On desktop, a 12-column grid is used with generous 32px outer margins to create a "contained" feel that mimics a physical dashboard.

Spacing is used aggressively to create hierarchy; sections are separated by large gaps (64px+) to prevent the Agri-Tech data from feeling overwhelming. Components should utilize "internal breathing room"—padding inside cards should rarely drop below 24px, ensuring that even complex data sets feel approachable and clean.

## Elevation & Depth
Depth is achieved through **Glassmorphism** and soft tonal layering rather than traditional heavy shadows.

1.  **Base Layer:** The Stone-colored background.
2.  **Mid Layer:** Cards with a subtle 1px border (#e7e5e4) and no shadow.
3.  **Top Layer (Glass):** Navigation bars, modal overlays, and floating action panels use a backdrop-blur (minimum 12px) with a semi-transparent white fill (70-80% opacity).

Shadows, when used for active states (like a hovering card), should be "Ambient Shadows"—extremely diffused, using a hint of the Deep Forest Green in the shadow color to maintain a natural, earthy depth.

## Shapes
The shape language is defined by "Organic Geometry." Large corner radii (Pill-shaped/Level 3) are applied to all primary containers and buttons. This softness counteracts the "coldness" of AI technology, making the platform feel friendly and easy to use.

Small elements like checkboxes use a slightly reduced radius (8px) to maintain functional clarity, but the overarching theme remains heavily rounded. Buttons and input fields should always use fully rounded (stadium) ends when height permits.

## Components
### Buttons
Primary buttons are solid Lime Green with Deep Forest Green text for maximum "pop." Hover states should involve a subtle scale-up (1.02x) and a slight shift to the darker green.

### Cards
Cards are the primary container. They feature a 24px or 32px border radius, a white background, and a very thin "Stone" border. On-hover, cards should transition to a Glassmorphic state with a backdrop-blur effect.

### Input Fields
Inputs are tall (48px-56px) with stadium ends. The background is a slightly darker shade of Stone (#f5f5f4) to provide a clear target area. The focus state uses a 2px Lime Green ring.

### Chips & Badges
Used for crop status (e.g., "Healthy," "Harvest Ready"). These should use low-opacity versions of the status color (e.g., light lime background with dark green text) to keep the UI light.

### Data Visualization
Charts should use "Glow Lines"—thick strokes with a soft outer glow in the Primary Lime Green color. Background grids within charts should be kept to a minimum or removed entirely to maintain the clean aesthetic.