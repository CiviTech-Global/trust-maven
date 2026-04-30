# Components

## Overview

All TrustMaven components follow consistent patterns for sizing, spacing, color, and interaction states. Components are designed to be composable and predictable.

---

## Buttons

### Variants

| Variant | Background | Text | Border | Usage |
|---------|-----------|------|--------|-------|
| **Primary** | `primary-500` | `white` | none | Main CTA, form submit, primary actions |
| **Secondary** | `transparent` | `gray-700` | 1px `gray-200` | Secondary actions, cancel buttons |
| **Ghost** | `transparent` | `gray-700` | none | Tertiary actions, toolbar buttons |
| **Danger** | `critical` | `white` | none | Destructive actions (delete, remove) |

### Sizes

| Size | Height | Padding (horizontal) | Font Size | Icon Size |
|------|--------|---------------------|-----------|-----------|
| `sm` | 32px | 12px | 12px | 14px |
| `md` | 36px | 16px | 14px | 16px |
| `lg` | 40px | 20px | 14px | 18px |

### States

| State | Primary | Secondary | Ghost |
|-------|---------|-----------|-------|
| Default | bg `primary-500` | border `gray-200` | transparent |
| Hover | bg `primary-600` | bg `gray-50`, border `gray-300` | bg `gray-100` |
| Active | bg `primary-700`, scale(0.98) | bg `gray-100` | bg `gray-200` |
| Disabled | bg `gray-200`, text `gray-400` | border `gray-200`, text `gray-400` | text `gray-400` |
| Loading | bg `primary-500`, spinner replaces text | same bg + spinner | same + spinner |

### Button Specs

```css
.btn {
  border-radius: 4px;
  font-weight: 500;
  cursor: pointer;
  transition: all 150ms ease-out;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  white-space: nowrap;
}

.btn:active {
  transform: scale(0.98);
}

.btn:disabled {
  cursor: not-allowed;
  opacity: 1; /* Use explicit disabled colors, not opacity */
}
```

### Icon Buttons

- Square dimensions matching height (32x32, 36x36, 40x40)
- Border-radius: 4px
- Icon centered, no text label (use tooltip for accessibility)
- Must have `aria-label`

---

## Cards

### Standard Card

```css
.card {
  background: #FFFFFF;
  border: 1px solid var(--color-gray-200);
  border-radius: 8px;
  padding: 24px;
}

.card:hover {
  /* Only for clickable/interactive cards */
  transform: translateY(-1px);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  transition: all 150ms ease-out;
}
```

### Card Anatomy

```
+--------------------------------------+
|  Card Header (optional)              |
|  Title (h3) + action button/menu     |
+--------------------------------------+
|                                      |
|  Card Body                           |
|  Main content area                   |
|                                      |
+--------------------------------------+
|  Card Footer (optional)              |
|  Secondary actions, metadata         |
+--------------------------------------+
```

| Property | Value |
|----------|-------|
| Background | `#FFFFFF` |
| Border | 1px solid `gray-200` |
| Border radius | 8px |
| Padding | 24px |
| Header-to-body gap | 16px |
| Body-to-footer gap | 16px |
| Hover elevation | `shadow-md` + translateY(-1px) |

### Card Variants

- **Static card:** No hover effect, purely informational
- **Interactive card:** Hover elevation, cursor pointer, acts as navigation target
- **Selected card:** Primary-50 background, primary-500 left border (3px)
- **KPI card:** Large number prominent, subtitle below, trend indicator, optional sparkline

---

## Forms

### Input Fields

```css
.input {
  height: 36px;
  padding: 0 12px;
  border: 1px solid var(--color-gray-200);
  border-radius: 8px;
  font-size: 14px;
  color: var(--color-gray-700);
  background: #FFFFFF;
  transition: border-color 150ms ease-out, box-shadow 150ms ease-out;
}

.input:hover {
  border-color: var(--color-gray-300);
}

.input:focus {
  outline: none;
  border-color: var(--color-primary-500);
  box-shadow: 0 0 0 3px var(--color-primary-200);
}

.input--error {
  border-color: var(--color-critical);
}

.input--error:focus {
  box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.15);
}
```

### Form Field Anatomy

```
Label (12px semibold, gray-700)         [Required*]
+--------------------------------------+
| Input field (36px height)            |
+--------------------------------------+
Helper text or Error message (12px, gray-500 or critical)
```

| Property | Value |
|----------|-------|
| Input height | 36px |
| Textarea min-height | 80px |
| Border radius | 8px |
| Label font | 12px, semibold, `gray-700` |
| Label-to-input gap | 6px |
| Input-to-helper gap | 4px |
| Field-to-field gap | 16px |
| Error text color | `critical` |
| Required indicator | Red asterisk after label text |

### Form Layout

- Single-column layout by default
- Logical grouping with section headers (h4 style)
- Sticky footer bar with primary action (right) and cancel (left)
- Inline validation triggers on blur (not on every keystroke)
- Submit button shows loading state on submission

---

## Tables

### Standard Table

```css
.table {
  width: 100%;
  border-collapse: collapse;
}

.table th {
  height: 40px;
  padding: 0 16px;
  background: var(--color-gray-100);
  font-size: 11px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--color-gray-500);
  text-align: left;
  border-bottom: 1px solid var(--color-gray-200);
  position: sticky;
  top: 0;
}

.table td {
  height: 44px;
  padding: 0 16px;
  font-size: 14px;
  color: var(--color-gray-700);
  border-bottom: 1px solid var(--color-gray-100);
}

.table tr:hover td {
  background: var(--color-gray-50);
}
```

### Table Specifications

| Property | Value |
|----------|-------|
| Header row height | 40px |
| Data row height | 44px |
| Cell horizontal padding | 16px |
| Header font | 11px, medium, uppercase, `gray-500`, letter-spacing 0.05em |
| Header background | `gray-100` |
| Row border | 1px solid `gray-100` |
| Row hover | bg `gray-50` |
| Sticky header | `position: sticky; top: 0;` |
| Selected row | bg `primary-50`, left border 3px `primary-500` |
| Sortable column header | Sort icon (chevron), active column highlighted |

### Table Features

- **Sorting:** Chevron up/down icons in column headers, click to toggle
- **Row selection:** Checkbox in first column, selected count shown in floating bar
- **Alternating rows:** Optional (not default), use `gray-50` for even rows
- **Column resizing:** Drag handle on column borders (optional feature)
- **Truncation:** Long text truncates with ellipsis, full text shown in tooltip on hover

---

## Modals / Dialogs

### Standard Modal

```css
.modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.5);
  backdrop-filter: blur(4px);
  z-index: 40;
}

.modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #FFFFFF;
  border-radius: 12px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
  max-width: 560px;
  width: calc(100% - 48px);
  max-height: calc(100vh - 96px);
  overflow-y: auto;
  z-index: 40;
}
```

### Modal Anatomy

```
+--------------------------------------+
| Header: Title + Close button    [X]  |
| (padding: 24px 24px 0)              |
+--------------------------------------+
|                                      |
| Body content                         |
| (padding: 24px)                      |
|                                      |
+--------------------------------------+
| Footer: Cancel | Primary Action      |
| (padding: 0 24px 24px)              |
+--------------------------------------+
```

| Property | Value |
|----------|-------|
| Max width | 560px |
| Border radius | 12px |
| Backdrop | `rgba(15,23,42,0.5)` + blur(4px) |
| Shadow | `shadow-xl` |
| Header padding | 24px 24px 0 |
| Body padding | 24px |
| Footer padding | 0 24px 24px |
| Entry animation | scale(0.95) + fade -> scale(1) + visible, 200ms |
| Exit animation | scale(1) -> scale(0.95) + fade out, 150ms |

### Modal Variants

- **Confirmation dialog:** Title + message + two buttons (cancel/confirm)
- **Form modal:** Title + form fields + footer actions
- **Danger modal:** Red icon, warning text, danger button for confirmation
- **Large modal:** max-width 720px for complex content

---

## Toasts / Notifications

### Toast Specifications

```css
.toast {
  position: fixed;
  bottom: 24px;
  right: 24px;
  padding: 12px 16px;
  border-radius: 8px;
  background: #FFFFFF;
  border: 1px solid var(--color-gray-200);
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  gap: 12px;
  min-width: 320px;
  max-width: 420px;
  z-index: 50;
}
```

| Property | Value |
|----------|-------|
| Position | Fixed, bottom-right (24px offset) |
| Width | 320-420px |
| Padding | 12px 16px |
| Border radius | 8px |
| Auto-dismiss | 5 seconds (configurable) |
| Enter animation | slide-up (16px) + fade-in, 200ms |
| Exit animation | fade-out + slide-right, 150ms |
| Stacking | Newest at bottom, 8px gap between toasts |

### Toast Types

| Type | Icon Color | Left Border |
|------|-----------|-------------|
| Success | `low` (green) | 3px `low` |
| Error | `critical` (red) | 3px `critical` |
| Warning | `high` (orange) | 3px `high` |
| Info | `info` (blue) | 3px `info` |

Each toast contains: colored icon (left), message text, optional action link, close button (right).

---

## Badges / Tags

### Badge Sizes

| Size | Height | Padding | Font Size |
|------|--------|---------|-----------|
| Small | 20px | 4px 8px | 11px |
| Default | 24px | 4px 10px | 12px |

### Badge Styles

```css
.badge {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  border-radius: 9999px; /* pill shape */
  font-weight: 500;
  white-space: nowrap;
}

/* Example: Critical badge */
.badge--critical {
  background: var(--color-critical-bg);
  color: var(--color-critical);
  border: 1px solid var(--color-critical-border);
}
```

### Badge Variants per Severity

| Severity | Background | Text | Border |
|----------|-----------|------|--------|
| Critical | `critical-bg` | `critical` | `critical-border` |
| High | `high-bg` | `high` | `high-border` |
| Medium | `medium-bg` | `medium` | `medium-border` |
| Low | `low-bg` | `low` | `low-border` |
| Info | `info-bg` | `info` | `info-border` |
| Neutral | `gray-100` | `gray-600` | `gray-200` |

---

## Dropdowns / Select

### Specifications

| Property | Value |
|----------|-------|
| Trigger height | 36px (matches input) |
| Border radius | 8px |
| Dropdown panel shadow | `shadow-md` |
| Dropdown panel border | 1px solid `gray-200` |
| Option height | 36px |
| Option padding | 8px 12px |
| Option hover | bg `gray-50` |
| Option selected | bg `primary-50`, text `primary-700` |
| Max dropdown height | 280px (scrollable) |
| Search input (if searchable) | Sticky at top, 36px height |

### Multi-Select

- Selected items shown as removable chips/tags inside the trigger
- Chip: 24px height, `gray-100` bg, `gray-700` text, x icon for removal
- Dropdown shows checkboxes next to options

---

## Tabs

### Underline Tab Style

```css
.tab {
  padding: 8px 16px;
  font-size: 14px;
  font-weight: 500;
  color: var(--color-gray-500);
  border-bottom: 2px solid transparent;
  transition: color 150ms ease-out, border-color 150ms ease-out;
}

.tab:hover {
  color: var(--color-gray-700);
}

.tab--active {
  color: var(--color-primary-500);
  border-bottom-color: var(--color-primary-500);
}
```

| Property | Value |
|----------|-------|
| Tab height | 40px |
| Tab padding | 8px 16px |
| Font | 14px, medium |
| Inactive color | `gray-500` |
| Active color | `primary-500` |
| Active indicator | 2px bottom border, `primary-500` |
| Indicator animation | Slide to active tab position, 200ms ease-in-out |
| Tab container border | 1px bottom border, `gray-200` |

---

## Sidebar Navigation

### Navigation Item

```css
.nav-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 12px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 400;
  color: var(--color-gray-600);
  transition: background 150ms ease-out, color 150ms ease-out;
}

.nav-item:hover {
  background: var(--color-gray-100);
  color: var(--color-gray-700);
}

.nav-item--active {
  background: var(--color-primary-50);
  color: var(--color-primary-700);
  font-weight: 500;
}
```

| Property | Value |
|----------|-------|
| Item height | 36px |
| Icon size | 18px |
| Icon-to-label gap | 12px |
| Item padding | 8px 12px |
| Active background | `primary-50` |
| Active text | `primary-700` |
| Group header | 11px, uppercase, `gray-500`, 24px top margin |
| Collapsed state | Icon only (centered), tooltip on hover shows label |
| Notification badge | Small red dot or count badge on right edge |
