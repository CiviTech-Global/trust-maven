# Typography

## Overview

Typography is the primary tool for creating visual hierarchy in TrustMaven. We use Inter as our primary typeface for its excellent legibility at small sizes, clear numerals for data display, and comprehensive weight range.

---

## Font Family

### Primary: Inter

```css
font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
```

**Why Inter:**
- Optimized for screen reading at all sizes
- Tabular numerals for aligned data columns
- Variable font support for precise weight control
- Excellent x-height for legibility at 12-14px body sizes
- Open source and widely available

### Monospace (for code, IDs, technical values)

```css
font-family: 'JetBrains Mono', 'Fira Code', 'SF Mono', 'Cascadia Code', Consolas, monospace;
```

**Used for:** Risk IDs, timestamps, API references, code snippets, hash values.

---

## Type Scale

| Token | Size (rem) | Size (px) | Weight | Line Height | Letter Spacing | Usage |
|-------|-----------|-----------|--------|-------------|----------------|-------|
| `display` | 2.25rem | 36px | 700 | 1.2 | -0.02em | Page titles on landing/marketing pages |
| `h1` | 1.875rem | 30px | 700 | 1.25 | -0.015em | Main page headings |
| `h2` | 1.5rem | 24px | 600 | 1.3 | -0.01em | Section headings |
| `h3` | 1.25rem | 20px | 600 | 1.35 | 0 | Card titles, subsection headings |
| `h4` | 1.125rem | 18px | 600 | 1.4 | 0 | Widget titles, group labels |
| `body-lg` | 1rem | 16px | 400 | 1.6 | 0 | Prominent body text, descriptions |
| `body` | 0.875rem | 14px | 400 | 1.5 | 0 | **Default body text** |
| `body-sm` | 0.75rem | 12px | 400 | 1.4 | 0 | Secondary text, table cells, metadata |
| `caption` | 0.6875rem | 11px | 500 | 1.3 | 0.05em | Uppercase labels, chart axis labels |

---

## Font Weights

| Weight | Value | Token | Usage |
|--------|-------|-------|-------|
| Regular | 400 | `font-regular` | Body text, descriptions, table cells |
| Medium | 500 | `font-medium` | Captions, emphasized body text, button labels, nav items |
| Semibold | 600 | `font-semibold` | Headings (h2-h4), card titles, form labels |
| Bold | 700 | `font-bold` | Display, h1, KPI values, strong emphasis |

---

## Usage Rules

### Headings

```css
/* H1 - One per page, describes primary context */
.heading-1 {
  font-size: 1.875rem;
  font-weight: 700;
  line-height: 1.25;
  letter-spacing: -0.015em;
  color: var(--color-gray-900);
}

/* H2 - Section dividers within a page */
.heading-2 {
  font-size: 1.5rem;
  font-weight: 600;
  line-height: 1.3;
  letter-spacing: -0.01em;
  color: var(--color-gray-900);
}

/* H3 - Card or panel titles */
.heading-3 {
  font-size: 1.25rem;
  font-weight: 600;
  line-height: 1.35;
  color: var(--color-gray-900);
}
```

### Body Text

```css
/* Default body - used for most content */
.body {
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.5;
  color: var(--color-gray-700);
}

/* Secondary/meta text */
.body-secondary {
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.5;
  color: var(--color-gray-500);
}

/* Small text - tables, metadata */
.body-small {
  font-size: 0.75rem;
  font-weight: 400;
  line-height: 1.4;
  color: var(--color-gray-500);
}
```

### Special Text Styles

```css
/* KPI large number */
.kpi-value {
  font-size: 1.875rem;
  font-weight: 700;
  line-height: 1;
  letter-spacing: -0.015em;
  color: var(--color-gray-900);
  font-variant-numeric: tabular-nums;
}

/* Uppercase caption/label */
.caption {
  font-size: 0.6875rem;
  font-weight: 500;
  line-height: 1.3;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: var(--color-gray-500);
}

/* Monospace for IDs and technical values */
.mono {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.75rem;
  color: var(--color-gray-600);
}
```

---

## Color Pairing Guidelines

| Text Style | Color Token | When to Use |
|-----------|-------------|-------------|
| Headings | `gray-900` | All headings and high-emphasis text |
| Body text | `gray-700` | Standard readable content |
| Secondary text | `gray-500` | Metadata, timestamps, helper text |
| Placeholder | `gray-400` | Input placeholders, disabled text |
| Links | `primary-500` | Clickable text links |
| Error text | `critical` | Validation errors, error messages |
| Success text | `low` | Success confirmations |

---

## Typographic Rules

### Do

- Use `body` (14px) as the default text size throughout the application
- Use `font-variant-numeric: tabular-nums` for numbers in tables and KPIs
- Limit heading levels to h1-h4 within a single view
- Use `medium` (500) weight for interactive elements like buttons and navigation
- Pair `caption` style with `gray-500` for axis labels and metadata labels
- Ensure minimum 14px for any text that users need to read (not just glance at)

### Don't

- Don't use `display` size inside the application (reserved for marketing/landing)
- Don't use more than 3 different text sizes in a single card or component
- Don't use bold weight for body text paragraphs
- Don't center-align body text (left-align always, except single-line labels in specific contexts)
- Don't use italic for emphasis in the UI (use weight or color instead)
- Don't go below 11px for any readable text

---

## Responsive Adjustments

| Breakpoint | Adjustment |
|-----------|------------|
| < 768px | H1 scales down to 1.5rem, H2 to 1.25rem |
| < 640px | Body stays at 14px (never reduce default body size) |
| > 1536px | No scaling up (max sizes are the sizes defined above) |

---

## Loading Font

```html
<!-- Preload for performance -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
```

Use `font-display: swap` to prevent invisible text during font loading. The system font stack fallback ensures the layout remains stable during load.
