# Spacing and Layout

## Overview

TrustMaven uses a consistent 4px base unit for all spacing decisions. This creates predictable rhythm and alignment across the interface, making it easier for developers to make decisions and for users to scan content.

---

## Base Unit

**Base: 4px**

All spacing values are multiples of 4px. This ensures consistent visual rhythm and pixel-perfect alignment across components.

---

## Spacing Scale

| Token | Value | Common Usage |
|-------|-------|-------------|
| `space-1` | 4px | Inline icon spacing, tight element gaps |
| `space-2` | 8px | Related element spacing, icon-to-text gap, input internal padding |
| `space-3` | 12px | Compact list item padding, badge padding |
| `space-4` | 16px | Component spacing (between related items), form field gaps |
| `space-5` | 20px | Medium separation within sections |
| `space-6` | 24px | Card padding, modal body padding, gutters |
| `space-8` | 32px | Section spacing, page padding, major separations |
| `space-10` | 40px | Large section breaks |
| `space-12` | 48px | Page section gaps |
| `space-16` | 64px | Major page divisions |
| `space-20` | 80px | Landmark spacing |
| `space-24` | 96px | Maximum separation (rare) |

---

## Layout Structure

### Application Shell

```
+------------------------------------------+
|            Top Header (56px)             |
+--------+---------------------------------+
|        |                                 |
| Side-  |        Main Content             |
| bar    |        (scrollable)             |
| (240px)|                                 |
|        |                                 |
+--------+---------------------------------+
```

| Element | Dimension | Notes |
|---------|-----------|-------|
| Top header bar | Height: 56px | Fixed, contains search, notifications, user menu |
| Sidebar (expanded) | Width: 240px | Fixed position, full viewport height |
| Sidebar (collapsed) | Width: 64px | Icons only, tooltip on hover |
| Main content area | Fluid (remaining width) | Scrollable, max-width constrained |
| Content max-width | 1200px | Centers content on large screens |
| Page padding | 32px | All sides of main content area |

### Content Widths

| Context | Max Width | Usage |
|---------|-----------|-------|
| Full-width tables | 100% of content area | Data tables, risk registers |
| Standard content | 1200px | Dashboard, forms, detail pages |
| Narrow content | 720px | Settings, single-column forms |
| Reading content | 640px | Long-form text, descriptions |

---

## Card Spacing

```
+--------------------------------+
|          24px padding          |
|  +--------+    +--------+     |
|  | 16px   |    | 16px   |     |
|  | between |    | between |    |
|  +--------+    +--------+     |
|                                |
+--------------------------------+
     32px between cards
```

| Property | Value |
|----------|-------|
| Card internal padding | 24px |
| Spacing between items inside card | 16px |
| Spacing between cards | 24px (horizontal), 24px (vertical) |
| Card header to body | 16px |
| Card body to footer | 16px |

---

## Section Spacing

| Context | Spacing | Token |
|---------|---------|-------|
| Between major page sections | 32px | `space-8` |
| Between sub-sections | 24px | `space-6` |
| Between related components | 16px | `space-4` |
| Between form fields | 16px | `space-4` |
| Between form field and label | 6px | custom |
| Between form field and helper/error text | 4px | `space-1` |
| Between heading and content | 12px | `space-3` |

---

## Responsive Breakpoints

| Token | Width | Behavior |
|-------|-------|----------|
| `sm` | 640px | Mobile landscape, small tablets |
| `md` | 768px | Tablets, sidebar collapses to icon-only |
| `lg` | 1024px | Small desktops, compact layouts |
| `xl` | 1280px | Standard desktop (primary target) |
| `2xl` | 1536px | Large monitors, ultra-wide |

### Responsive Layout Behavior

| Breakpoint | Sidebar | Content | Grid |
|-----------|---------|---------|------|
| >= 1280px (xl) | 240px expanded | Fluid, max 1200px | 12-column |
| 1024-1279px (lg) | 240px expanded | Fluid | 12-column |
| 768-1023px (md) | 64px collapsed (icons) | Fluid | 8-column |
| < 768px (sm) | Hidden (hamburger drawer) | Full width | 4-column |

---

## Grid System

### 12-Column Grid

- **Columns:** 12
- **Gutter:** 24px
- **Margin:** 32px (page edge to first column)
- **Minimum column width:** ~64px at 1280px viewport

### Common Grid Patterns

| Pattern | Columns | Usage |
|---------|---------|-------|
| Full width | 12 | Tables, full-width charts |
| Two-column equal | 6 + 6 | Dashboard chart pairs |
| Two-column asymmetric | 8 + 4 | Content + sidebar |
| Three-column | 4 + 4 + 4 | KPI card rows |
| Four-column | 3 + 3 + 3 + 3 | KPI cards (compact) |

---

## Border Radius

| Token | Value | Usage |
|-------|-------|-------|
| `radius-sm` | 4px | Buttons, badges, small interactive elements |
| `radius-md` | 8px | Cards, input fields, dropdowns |
| `radius-lg` | 12px | Modals, large panels, dialog boxes |
| `radius-xl` | 16px | Large feature panels, onboarding cards |
| `radius-full` | 9999px | Avatars, pill badges, toggle knobs |

---

## Elevation / Shadows

| Token | Value | Usage |
|-------|-------|-------|
| `shadow-sm` | `0 1px 2px rgba(0,0,0,0.05)` | Subtle card lift |
| `shadow-md` | `0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -2px rgba(0,0,0,0.1)` | Dropdowns, popovers |
| `shadow-lg` | `0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -4px rgba(0,0,0,0.1)` | Modals, floating panels |
| `shadow-xl` | `0 20px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.1)` | Modal overlays (rare) |

### Shadow Usage Rules

- Cards at rest: No shadow or `shadow-sm` only
- Cards on hover: `shadow-md` (transition 150ms)
- Dropdowns/popovers: `shadow-md`
- Modals: `shadow-lg`
- Never stack shadows; elevated elements use a single shadow level

---

## Z-Index Scale

| Token | Value | Usage |
|-------|-------|-------|
| `z-base` | 0 | Default content |
| `z-dropdown` | 10 | Dropdowns, popovers |
| `z-sticky` | 20 | Sticky headers, floating action bars |
| `z-overlay` | 30 | Sidebar overlays (mobile) |
| `z-modal` | 40 | Modals and dialogs |
| `z-toast` | 50 | Toast notifications |
| `z-tooltip` | 60 | Tooltips (always on top) |

---

## CSS Custom Properties

```css
:root {
  /* Spacing */
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-5: 20px;
  --space-6: 24px;
  --space-8: 32px;
  --space-10: 40px;
  --space-12: 48px;
  --space-16: 64px;
  --space-20: 80px;
  --space-24: 96px;

  /* Layout */
  --sidebar-width: 240px;
  --sidebar-collapsed: 64px;
  --header-height: 56px;
  --content-max-width: 1200px;
  --page-padding: 32px;
  --grid-gutter: 24px;

  /* Border Radius */
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-xl: 16px;
  --radius-full: 9999px;
}
```
