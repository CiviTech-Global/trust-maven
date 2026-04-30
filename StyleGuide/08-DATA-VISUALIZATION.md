# Data Visualization

## Overview

Data visualization in TrustMaven serves one purpose: helping risk professionals understand their organization's risk posture at a glance and drill into specifics on demand. Charts and indicators should be clear, accessible, and actionable.

---

## Risk Matrix (5x5)

The risk matrix is the central visualization of TrustMaven. It maps **Likelihood** (y-axis, 1-5) against **Impact** (x-axis, 1-5) to produce a 25-cell grid with color-coded severity.

### Matrix Layout

```
Likelihood
    5  | Med  | High | High | Crit | Crit |
    4  | Med  | Med  | High | High | Crit |
    3  | Low  | Med  | Med  | High | High |
    2  | Low  | Low  | Med  | Med  | High |
    1  | Low  | Low  | Low  | Med  | Med  |
       +------+------+------+------+------+
         1      2      3      4      5
                    Impact
```

### Cell Color Mapping

| Score Range | Severity | Cell Background | Text |
|-------------|----------|----------------|------|
| 1-4 | Low | `#DCFCE7` (green-100) | `#16A34A` |
| 5-9 | Medium | `#FEF9C3` (yellow-100) | `#CA8A04` |
| 10-16 | High | `#FFEDD5` (orange-100) | `#EA580C` |
| 17-25 | Critical | `#FEE2E2` (red-100) | `#DC2626` |

### Interaction

- Each cell displays the count of risks at that position
- Hover: Cell darkens slightly, tooltip shows risk count and severity label
- Click: Filters the risk register to show only risks at that position
- Active cell (when filtering): Bold border (2px) in the severity color
- Cells with zero risks: Lighter opacity (0.5)
- Animated transition when risk counts update

### Accessibility

- Each cell has `aria-label`: "Likelihood [Y], Impact [X]: [count] risks, [severity] severity"
- Color is supplemented by the risk count number in each cell
- High-contrast mode: Use distinct patterns (diagonal lines, dots, crosshatch) in addition to color

---

## Chart Color Palette

### Primary Data Series (5 colors)

Use these colors for categorical data (risk domains, departments, etc.):

| Index | Color | Name | Usage |
|-------|-------|------|-------|
| 1 | `#0F766E` | Teal | Primary category / default |
| 2 | `#2563EB` | Blue | Secondary category |
| 3 | `#7C3AED` | Purple | Tertiary category |
| 4 | `#EA580C` | Orange | Fourth category |
| 5 | `#DC2626` | Red | Fifth category |

### Extended Palette (when > 5 categories)

| Index | Color | Name |
|-------|-------|------|
| 6 | `#0891B2` | Cyan |
| 7 | `#4F46E5` | Indigo |
| 8 | `#DB2777` | Pink |

### Sequential Palette (for gradients/heat maps)

For single-variable intensity (low to high):
- Light: `#CCFBF1` (primary-100)
- Medium: `#5EEAD4` (primary-300)
- Dark: `#0F766E` (primary-500)
- Darkest: `#063F3B` (primary-900)

---

## Chart Types and Usage

### Donut Chart

**When to use:** Showing composition/distribution (risk by domain, status breakdown, severity distribution).

| Property | Value |
|----------|-------|
| Outer radius | 120px (large), 80px (small) |
| Inner radius | 60% of outer radius |
| Gap between segments | 2px |
| Center text | Total count, large bold number |
| Legend | Right side, color dot + label + count |
| Hover | Segment expands slightly (2px), tooltip with label + value + percentage |
| Max segments | 6 (group remainder as "Other") |

### Bar Chart

**When to use:** Comparing quantities across categories (risks per department, monthly risk counts).

| Property | Value |
|----------|-------|
| Bar width | 32px (default), 24px (compact) |
| Bar gap | 8px between bars in a group |
| Group gap | 24px between groups |
| Bar radius | 4px (top corners only) |
| Gridlines | Horizontal only, `gray-200`, dashed |
| Y-axis labels | `gray-500`, 11px |
| X-axis labels | `gray-500`, 11px, truncate with tooltip if > 12 chars |
| Hover | Bar darkens slightly, tooltip shows exact value |
| Horizontal variant | For long category labels (department names) |

### Line Chart

**When to use:** Showing trends over time (risk score trend, open risk count over months).

| Property | Value |
|----------|-------|
| Line width | 2px |
| Data point dot | 4px radius, visible on hover |
| Area fill | Optional, 10% opacity of line color |
| Gridlines | Horizontal only, `gray-100` |
| X-axis | Time labels, `gray-500`, 11px |
| Y-axis | Value labels, `gray-500`, 11px |
| Hover | Vertical crosshair line, dot enlarges to 6px, tooltip shows date + value |
| Multiple lines | Use chart color palette, max 5 lines, include legend |
| Smooth vs straight | Use `curveMonotoneX` for smooth, aesthetically pleasing curves |

### Heat Map

**When to use:** The 5x5 risk matrix (see above), or any two-dimensional data comparison.

| Property | Value |
|----------|-------|
| Cell size | Square, responsive (minimum 48px) |
| Cell gap | 2px |
| Color scale | Sequential from low-color to high-color |
| Cell text | Value displayed centered in cell |
| Hover | Border highlight, tooltip with full details |
| Axis labels | Outside the grid, `gray-500`, 12px |

### Gauge / Score Indicator

**When to use:** Single KPI risk score (0-100 scale), overall risk posture indicator.

| Property | Value |
|----------|-------|
| Diameter | 120px (large), 80px (small) |
| Arc width | 12px |
| Arc background | `gray-200` |
| Arc fill | Semantic color based on score (green/yellow/orange/red) |
| Center value | Bold, 24px (large) or 18px (small) |
| Label below | 12px, `gray-500` |
| Segments | Optional tick marks at thresholds (25, 50, 75) |

---

## Chart Styling Rules

### General Rules

1. **Minimal gridlines:** Use light horizontal gridlines only. Remove vertical gridlines unless essential.
2. **Clear labels:** Always label axes. Use `gray-500`, 11px, uppercase for axis titles.
3. **Responsive:** Charts should resize fluidly within their containers.
4. **Tooltips:** Show on hover with exact values. Use the standard tooltip style (dark bg, white text, 12px).
5. **Legends:** Position outside the chart (right or bottom). Color dot + label format. Clickable to toggle series visibility.
6. **No 3D effects.** All charts are flat/2D.
7. **No excessive decoration.** Remove chart borders, excessive tick marks, unnecessary gridlines.
8. **Animation on load:** Bars grow from baseline, lines draw from left, donut segments expand from 0. Duration 500ms, ease-out.
9. **Consistent number formatting:** Use locale-appropriate separators (1,234). Abbreviate large numbers (1.2K, 3.4M).

### Chart Container

```css
.chart-container {
  background: #FFFFFF;
  border: 1px solid var(--color-gray-200);
  border-radius: 8px;
  padding: 24px;
}

.chart-title {
  font-size: 14px;
  font-weight: 600;
  color: var(--color-gray-900);
  margin-bottom: 4px;
}

.chart-subtitle {
  font-size: 12px;
  color: var(--color-gray-500);
  margin-bottom: 16px;
}
```

---

## Severity Indicators

### Colored Dot + Label

Used inline in tables, lists, and detail views:

```html
<span class="severity-indicator severity--critical">
  <span class="severity-dot" aria-hidden="true"></span>
  Critical
</span>
```

```css
.severity-indicator {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  font-weight: 500;
}

.severity-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
}

.severity--critical .severity-dot { background: #DC2626; }
.severity--high .severity-dot { background: #EA580C; }
.severity--medium .severity-dot { background: #CA8A04; }
.severity--low .severity-dot { background: #16A34A; }
```

### Rules

- Always include the text label alongside the color dot
- In tables, the dot + label replaces raw severity text
- Screen readers get the full severity text via the label

---

## KPI Cards

### Anatomy

```
+--------------------------------------+
| Caption label (11px, uppercase)      |
|                                      |
| 142 (30px, bold)                     |
| +12% ↑ vs last month               |
| (12px, green for up, red for down)   |
|                                      |
| [Optional sparkline]                 |
+--------------------------------------+
```

### Specifications

| Element | Style |
|---------|-------|
| Container | Card style (white bg, gray-200 border, 8px radius, 24px padding) |
| Label | `caption` style (11px, medium, uppercase, gray-500) |
| Value | 30px, bold, gray-900, tabular-nums |
| Trend indicator | 12px, medium, green (positive) or red (negative) |
| Trend arrow | Inline SVG arrow, same color as text |
| Sparkline | 40px height, single-color area chart, no axes/labels |
| Sparkline color | primary-500 at 20% opacity (fill), primary-500 (line) |

### Trend Colors

| Direction | Color | Icon |
|-----------|-------|------|
| Positive (risk reduction) | `#16A34A` (green) | Arrow down-left |
| Negative (risk increase) | `#DC2626` (red) | Arrow up-right |
| Neutral | `#64748B` (gray) | Arrow right (flat) |

Note: In risk management, a "positive" trend means risk is decreasing (good). Ensure the visual cue matches the domain context.

---

## Table Data Formatting

### Number Formatting

| Type | Format | Example |
|------|--------|---------|
| Counts | Locale-separated integers | 1,234 |
| Percentages | One decimal place + % | 73.4% |
| Currency | Symbol + 2 decimals | $12,345.00 |
| Large numbers | Abbreviated with 1 decimal | 1.2K, 3.4M |
| Scores | Integer or 1 decimal | 85, 7.4 |

### Text Formatting

| Type | Style |
|------|-------|
| IDs | Monospace font, gray-600, 12px |
| Dates | Relative ("3 days ago") with full date in tooltip |
| Long text | Truncate with ellipsis at ~50 chars, full text in tooltip |
| URLs/links | Primary color, truncate domain only if needed |
| Empty values | Em-dash (--) in gray-400 |

### Number Alignment

- Right-align all numeric columns in tables
- Use `font-variant-numeric: tabular-nums` for vertical alignment
- Align decimal points (when mixing decimals)

---

## Responsive Charts

| Breakpoint | Behavior |
|-----------|----------|
| >= 1280px | Full-size charts, side-by-side layout |
| 768-1279px | Charts stack vertically, maintain aspect ratio |
| < 768px | Charts full-width, simplified (fewer data points, horizontal bar charts) |

### Mobile Simplifications

- Reduce donut chart segments to top 4 + "Other"
- Line charts show fewer time periods
- Tables become scrollable or convert to card lists
- Risk matrix cells increase in size for touch targets (48px minimum)
