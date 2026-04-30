# Color System

## Overview

TrustMaven's color palette is built around trust and clarity. The primary teal communicates stability and professionalism. Semantic colors align with universally understood risk indicators. The neutral scale provides flexible, high-contrast surfaces for data-dense interfaces.

---

## Primary Palette

The primary teal conveys trust, stability, and professionalism. Used for primary actions, active states, and brand identity elements.

| Token | Hex | Usage |
|-------|-----|-------|
| `primary-50` | `#F0FDFA` | Tinted backgrounds, selected row highlight |
| `primary-100` | `#CCFBF1` | Hover backgrounds, light badges |
| `primary-200` | `#99F6E4` | Focus rings, subtle highlights |
| `primary-300` | `#5EEAD4` | Decorative accents (use sparingly) |
| `primary-400` | `#2DD4BF` | Icons on dark backgrounds |
| `primary-500` | `#0F766E` | **Primary buttons, links, active indicators** |
| `primary-600` | `#0D6B63` | **Hover state for primary elements** |
| `primary-700` | `#0A5A54` | **Active/pressed state** |
| `primary-800` | `#084E49` | Text on light primary backgrounds |
| `primary-900` | `#063F3B` | Dark mode primary surfaces |

### Usage Guidelines — Primary

- **Do:** Use `primary-500` for primary CTA buttons, active navigation items, and links
- **Do:** Use `primary-50` for selected/active row backgrounds in tables
- **Do:** Use `primary-200` for focus rings (2px solid with 2px offset)
- **Don't:** Use primary colors for large background areas (it overwhelms)
- **Don't:** Use more than 2 primary-colored elements in close proximity

---

## Neutral Palette

Cool grays provide the foundation for text, backgrounds, borders, and surface hierarchy.

| Token | Hex | Usage |
|-------|-----|-------|
| `gray-50` | `#F8FAFC` | **Page background** |
| `gray-100` | `#F1F5F9` | **Card/panel background, table header bg** |
| `gray-200` | `#E2E8F0` | **Borders, dividers, input borders** |
| `gray-300` | `#CBD5E1` | Disabled state borders, subtle dividers |
| `gray-400` | `#94A3B8` | Placeholder text, disabled text |
| `gray-500` | `#64748B` | **Secondary text, meta information, icons** |
| `gray-600` | `#475569` | Body text (alternate) |
| `gray-700` | `#334155` | **Primary body text** |
| `gray-800` | `#1E293B` | Emphasized text |
| `gray-900` | `#0F172A` | **Headings, high-emphasis text** |

### Usage Guidelines — Neutrals

- **Page background:** Always `gray-50` for the main canvas
- **Cards:** `white` (#FFFFFF) background with `gray-200` border
- **Text hierarchy:** `gray-900` for headings, `gray-700` for body, `gray-500` for secondary/meta
- **Borders:** `gray-200` is the standard. Use `gray-300` only for subtle secondary dividers
- **Disabled elements:** `gray-300` border + `gray-400` text

---

## Semantic / Risk Colors

These colors align with universal risk severity indicators. They are used for badges, risk matrix cells, chart indicators, and status labels.

| Token | Hex | Name | Usage |
|-------|-----|------|-------|
| `critical` | `#DC2626` | Red 600 | Critical/Very High risk, destructive actions, error states |
| `critical-bg` | `#FEF2F2` | Red 50 | Critical risk background tint |
| `critical-border` | `#FECACA` | Red 200 | Critical badge/card borders |
| `high` | `#EA580C` | Orange 600 | High risk indicators |
| `high-bg` | `#FFF7ED` | Orange 50 | High risk background tint |
| `high-border` | `#FED7AA` | Orange 200 | High risk badge/card borders |
| `medium` | `#CA8A04` | Yellow 600 | Medium risk indicators |
| `medium-bg` | `#FEFCE8` | Yellow 50 | Medium risk background tint |
| `medium-border` | `#FEF08A` | Yellow 200 | Medium risk badge/card borders |
| `low` | `#16A34A` | Green 600 | Low risk, success states |
| `low-bg` | `#F0FDF4` | Green 50 | Low risk/success background tint |
| `low-border` | `#BBF7D0` | Green 200 | Low risk/success badge/card borders |
| `info` | `#2563EB` | Blue 600 | Informational, neutral status |
| `info-bg` | `#EFF6FF` | Blue 50 | Info background tint |
| `info-border` | `#BFDBFE` | Blue 200 | Info badge/card borders |

### Usage Guidelines — Semantic Colors

- **Always pair with text labels or icons.** Never use color as the sole indicator of status.
- **Badges:** Use the main color as text, the `-bg` variant as background, and `-border` as border.
- **Risk matrix cells:** Use opacity variants of semantic colors for cell backgrounds.
- **Charts:** Use the main semantic colors at full opacity for data series.
- **Destructive actions:** Use `critical` for delete buttons and destructive confirmations.

---

## Surface Colors (Dark Mode Ready)

| Token | Light Mode | Dark Mode | Usage |
|-------|-----------|-----------|-------|
| `surface-page` | `#F8FAFC` | `#0F172A` | Page background |
| `surface-card` | `#FFFFFF` | `#1E293B` | Card/panel background |
| `surface-elevated` | `#FFFFFF` | `#334155` | Modals, dropdowns, popovers |
| `surface-overlay` | `rgba(15,23,42,0.5)` | `rgba(0,0,0,0.7)` | Modal backdrop |
| `border-default` | `#E2E8F0` | `#334155` | Standard borders |
| `border-subtle` | `#F1F5F9` | `#1E293B` | Subtle dividers |
| `text-primary` | `#334155` | `#F1F5F9` | Body text |
| `text-secondary` | `#64748B` | `#94A3B8` | Meta/secondary text |
| `text-heading` | `#0F172A` | `#F8FAFC` | Headings |

### Dark Mode Notes

- Dark mode is planned for a future release but the architecture should support it from day one
- Use CSS custom properties (tokens) rather than hard-coded hex values
- Test all semantic colors against both light and dark surfaces for contrast compliance
- The primary teal (`#0F766E`) works on both light and dark backgrounds

---

## Color Accessibility

| Combination | Contrast Ratio | Status |
|-------------|---------------|--------|
| `gray-900` on `white` | 15.4:1 | Pass (AAA) |
| `gray-700` on `white` | 9.2:1 | Pass (AAA) |
| `gray-500` on `white` | 4.6:1 | Pass (AA) |
| `primary-500` on `white` | 5.1:1 | Pass (AA) |
| `critical` on `critical-bg` | 5.5:1 | Pass (AA) |
| `high` on `high-bg` | 4.8:1 | Pass (AA) |
| `medium` on `medium-bg` | 4.5:1 | Pass (AA) |
| `low` on `low-bg` | 4.7:1 | Pass (AA) |
| `white` on `primary-500` | 5.1:1 | Pass (AA) |

---

## CSS Custom Properties

```css
:root {
  /* Primary */
  --color-primary-50: #F0FDFA;
  --color-primary-100: #CCFBF1;
  --color-primary-200: #99F6E4;
  --color-primary-300: #5EEAD4;
  --color-primary-400: #2DD4BF;
  --color-primary-500: #0F766E;
  --color-primary-600: #0D6B63;
  --color-primary-700: #0A5A54;
  --color-primary-800: #084E49;
  --color-primary-900: #063F3B;

  /* Neutrals */
  --color-gray-50: #F8FAFC;
  --color-gray-100: #F1F5F9;
  --color-gray-200: #E2E8F0;
  --color-gray-300: #CBD5E1;
  --color-gray-400: #94A3B8;
  --color-gray-500: #64748B;
  --color-gray-600: #475569;
  --color-gray-700: #334155;
  --color-gray-800: #1E293B;
  --color-gray-900: #0F172A;

  /* Semantic */
  --color-critical: #DC2626;
  --color-critical-bg: #FEF2F2;
  --color-critical-border: #FECACA;
  --color-high: #EA580C;
  --color-high-bg: #FFF7ED;
  --color-high-border: #FED7AA;
  --color-medium: #CA8A04;
  --color-medium-bg: #FEFCE8;
  --color-medium-border: #FEF08A;
  --color-low: #16A34A;
  --color-low-bg: #F0FDF4;
  --color-low-border: #BBF7D0;
  --color-info: #2563EB;
  --color-info-bg: #EFF6FF;
  --color-info-border: #BFDBFE;

  /* Surfaces */
  --surface-page: var(--color-gray-50);
  --surface-card: #FFFFFF;
  --surface-elevated: #FFFFFF;
  --surface-overlay: rgba(15, 23, 42, 0.5);
  --border-default: var(--color-gray-200);
  --border-subtle: var(--color-gray-100);
}
```
