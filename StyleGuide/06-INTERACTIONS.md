# Interactions and Animations

## Overview

TrustMaven interactions are designed to feel fast, responsive, and purposeful. Every animation serves a functional role: indicating state changes, providing feedback, or guiding attention. Nothing is purely decorative.

---

## Transition Defaults

### Timing

| Context | Duration | Easing | Usage |
|---------|----------|--------|-------|
| Hover states | 150ms | `ease-out` | Background, border, color, shadow changes |
| Expand/collapse | 200ms | `ease-in-out` | Accordions, panel reveals, dropdown open |
| Page transitions | 200ms | `ease-out` | Route changes, content swap |
| Modal enter | 200ms | `cubic-bezier(0.16, 1, 0.3, 1)` | Scale + fade in |
| Modal exit | 150ms | `ease-in` | Scale + fade out |
| Toast enter | 200ms | `cubic-bezier(0.16, 1, 0.3, 1)` | Slide up + fade |
| Toast exit | 150ms | `ease-in` | Slide right + fade |
| Drag operations | 0ms (real-time) | none | Follow cursor immediately |

### CSS Foundation

```css
/* Apply to all interactive elements by default */
.interactive {
  transition: background-color 150ms ease-out,
              border-color 150ms ease-out,
              color 150ms ease-out,
              box-shadow 150ms ease-out,
              transform 150ms ease-out;
}
```

---

## Micro-Animations

### Button Press

```css
.btn:active {
  transform: scale(0.98);
  transition: transform 50ms ease-out;
}
```

The button subtly compresses on click, providing tactile feedback that the action was registered.

### Card Hover

```css
.card--interactive:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
              0 2px 4px -2px rgba(0, 0, 0, 0.1);
  transition: transform 150ms ease-out, box-shadow 150ms ease-out;
}
```

Interactive cards lift slightly on hover, indicating they are clickable.

### Page Transitions

```css
/* Outgoing page */
.page-exit {
  opacity: 0;
  transition: opacity 100ms ease-in;
}

/* Incoming page */
.page-enter {
  opacity: 0;
  animation: fadeIn 200ms ease-out forwards;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
```

### Tab Indicator

```css
.tab-indicator {
  position: absolute;
  bottom: 0;
  height: 2px;
  background: var(--color-primary-500);
  transition: left 200ms ease-in-out, width 200ms ease-in-out;
}
```

The active tab indicator slides smoothly between tabs rather than jumping.

### Accordion Expand/Collapse

```css
.accordion-content {
  overflow: hidden;
  transition: height 200ms ease-in-out, opacity 200ms ease-in-out;
}

.accordion-icon {
  transition: transform 200ms ease-in-out;
}

.accordion--open .accordion-icon {
  transform: rotate(180deg);
}
```

---

## Loading States

### Skeleton Screens (Preferred)

Use skeleton screens instead of spinners for content areas. Skeletons preserve layout stability and give users a preview of the incoming content structure.

```css
.skeleton {
  background: var(--color-gray-200);
  border-radius: 4px;
  animation: skeleton-pulse 1.5s ease-in-out infinite;
}

@keyframes skeleton-pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.4; }
}
```

**Skeleton guidelines:**
- Match the dimensions and position of the actual content
- Use rounded rectangles for text lines, circles for avatars
- Stagger animation start times slightly for groups of skeletons
- Minimum display time: 300ms (avoid flash for fast loads)

### Inline Button Spinner

```css
.btn--loading .btn-text {
  visibility: hidden;
}

.btn--loading::after {
  content: '';
  position: absolute;
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top-color: white;
  border-radius: 50%;
  animation: spin 600ms linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}
```

**When to use spinners vs skeletons:**
- **Skeleton:** Page content loading, table data, card content, lists
- **Spinner:** Button submit, inline actions, small loading indicators within an existing layout
- **Progress bar:** File uploads, multi-step processes, bulk operations

### Loading Bar (Top of Page)

A thin progress bar at the top of the viewport for route transitions:

```css
.loading-bar {
  position: fixed;
  top: 0;
  left: 0;
  height: 2px;
  background: var(--color-primary-500);
  z-index: 9999;
  animation: loading-progress 2s ease-in-out;
}
```

---

## Empty States

When a list, table, or section has no data, display a helpful empty state:

```
+--------------------------------------+
|                                      |
|          [Illustration]              |
|                                      |
|    No risks found in this view       |
|    (body-lg, gray-700)               |
|                                      |
|    Try adjusting your filters or     |
|    create a new risk entry.          |
|    (body, gray-500)                  |
|                                      |
|        [ + Create Risk ]             |
|        (primary button)              |
|                                      |
+--------------------------------------+
```

**Empty state guidelines:**
- Use a simple, minimal illustration (line art style, primary color tints)
- Headline explains what is empty
- Subtitle suggests next action or explains why it might be empty
- Include a CTA button when the user can take action to populate the area
- Center vertically and horizontally in the container

---

## Error States

### Form Validation

```css
/* Error field */
.input--error {
  border-color: var(--color-critical);
  animation: shake 300ms ease-out;
}

.error-message {
  font-size: 12px;
  color: var(--color-critical);
  margin-top: 4px;
  display: flex;
  align-items: center;
  gap: 4px;
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-4px); }
  50% { transform: translateX(4px); }
  75% { transform: translateX(-2px); }
}
```

**Error behavior:**
- Inline validation fires on blur (not on every keystroke)
- On form submit failure, shake animation on the first invalid field + scroll to it
- Error messages appear below the field with a small warning icon
- Field border turns `critical` red until corrected
- Error messages are associated via `aria-describedby`

### API Error States

- **Inline error banner:** Red-tinted banner at top of content area with retry button
- **Toast notification:** For transient errors that don't block the workflow
- **Full-page error:** Only for fatal/unrecoverable errors (500, network failure)

---

## Drag and Drop

### Visual Feedback

```css
/* Dragging element */
.dragging {
  opacity: 0.8;
  transform: rotate(1deg);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
  cursor: grabbing;
  z-index: 100;
}

/* Drop zone highlight */
.drop-zone--active {
  border: 2px dashed var(--color-primary-500);
  background: var(--color-primary-50);
  border-radius: 8px;
}

/* Drop target insertion line */
.drop-indicator {
  height: 2px;
  background: var(--color-primary-500);
  border-radius: 1px;
  margin: -1px 0;
}
```

**Drag and drop guidelines:**
- Show a ghost/preview element attached to cursor
- Highlight valid drop zones with dashed primary border
- Show insertion point with a horizontal line
- Smooth reorder animation (200ms) when items shift position
- Provide keyboard alternative (select + move up/down buttons)

---

## Focus Management

### Focus Ring

```css
/* Global focus style */
:focus-visible {
  outline: 2px solid var(--color-primary-500);
  outline-offset: 2px;
}

/* Remove outline for mouse users */
:focus:not(:focus-visible) {
  outline: none;
}
```

**Focus rules:**
- Never remove focus outlines entirely
- Use `:focus-visible` to show focus rings only for keyboard users
- Trap focus inside modals (tab cycling)
- Return focus to trigger element when modal/popover closes
- Focus the first interactive element when a modal opens
- Skip links available for keyboard users to bypass navigation

---

## Reduced Motion

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

When users prefer reduced motion:
- All animations are effectively disabled
- Content appears/disappears instantly instead of transitioning
- Skeleton loading uses static gray background (no pulse)
- Page transitions are instant cuts
- Focus rings still appear (they are not animations)

---

## Tooltip Behavior

| Property | Value |
|----------|-------|
| Delay before show | 500ms |
| Show animation | Fade in 150ms |
| Delay before hide | 0ms (immediate on mouse leave) |
| Position | Auto (prefer top, avoid viewport overflow) |
| Max width | 240px |
| Padding | 6px 10px |
| Background | `gray-900` |
| Text color | white |
| Font size | 12px |
| Border radius | 4px |
| Arrow | 6px centered on tooltip edge |

---

## Scroll Behavior

```css
html {
  scroll-behavior: smooth;
}

/* Smooth scroll for in-page navigation */
.scroll-container {
  overflow-y: auto;
  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;
}

/* Custom scrollbar (subtle) */
.scroll-container::-webkit-scrollbar {
  width: 6px;
}

.scroll-container::-webkit-scrollbar-track {
  background: transparent;
}

.scroll-container::-webkit-scrollbar-thumb {
  background: var(--color-gray-300);
  border-radius: 3px;
}

.scroll-container::-webkit-scrollbar-thumb:hover {
  background: var(--color-gray-400);
}
```
