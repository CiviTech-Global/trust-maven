# Accessibility

## Overview

TrustMaven targets WCAG 2.1 Level AA compliance as a minimum standard. Accessibility is integrated into every design and development decision, not treated as a separate concern or afterthought.

---

## Compliance Target

**WCAG 2.1 Level AA** across all features and pages.

Key requirements:
- Perceivable: All content available to all users regardless of sensory ability
- Operable: All functionality accessible via keyboard and assistive technology
- Understandable: Interface behavior is predictable and content is readable
- Robust: Compatible with current and future assistive technologies

---

## Color Contrast

### Minimum Ratios

| Element Type | Minimum Ratio | Standard |
|-------------|--------------|----------|
| Normal text (< 18px or < 14px bold) | 4.5:1 | AA |
| Large text (>= 18px or >= 14px bold) | 3:1 | AA |
| UI components and graphical objects | 3:1 | AA |
| Focus indicators | 3:1 against adjacent colors | AA |

### Verified Combinations

| Foreground | Background | Ratio | Status |
|-----------|-----------|-------|--------|
| `gray-900` (#0F172A) | White (#FFFFFF) | 15.4:1 | Pass AAA |
| `gray-700` (#334155) | White (#FFFFFF) | 9.2:1 | Pass AAA |
| `gray-500` (#64748B) | White (#FFFFFF) | 4.6:1 | Pass AA |
| `gray-400` (#94A3B8) | White (#FFFFFF) | 3.2:1 | **Fail for body text** |
| `primary-500` (#0F766E) | White (#FFFFFF) | 5.1:1 | Pass AA |
| White (#FFFFFF) | `primary-500` (#0F766E) | 5.1:1 | Pass AA |
| `critical` (#DC2626) | `critical-bg` (#FEF2F2) | 5.5:1 | Pass AA |

### Rules

- **Never use `gray-400` for readable body text.** Only for placeholder text or decorative elements.
- **Always verify new color combinations** with a contrast checker before implementation.
- **Semantic badge colors** must maintain 4.5:1 ratio between text and background.
- **Chart colors** must maintain 3:1 ratio against adjacent chart elements and background.

---

## Color Independence

**Never use color alone to convey information.** Always provide a secondary indicator.

| Information | Color Alone (Bad) | Color + Additional Cue (Good) |
|------------|-------------------|-------------------------------|
| Risk severity | Red/yellow/green dot | Colored dot + text label ("Critical") |
| Form errors | Red border | Red border + error icon + error message text |
| Status | Green/red badge | Colored badge with text + icon (checkmark/x) |
| Chart data | Different colored lines | Colors + different line patterns + legend with labels |
| Success/failure | Green/red background | Background + icon + descriptive text |

---

## Keyboard Navigation

### General Principles

- All interactive elements must be reachable via Tab key
- Tab order follows visual reading order (top-left to bottom-right)
- No keyboard traps (user can always Tab away from any element)
- Focus is never lost or sent to unexpected locations

### Key Bindings

| Key | Action |
|-----|--------|
| `Tab` | Move focus to next interactive element |
| `Shift + Tab` | Move focus to previous interactive element |
| `Enter` | Activate focused button/link |
| `Space` | Activate focused button, toggle checkbox, open select |
| `Escape` | Close modal/popover/dropdown, cancel operation |
| `Arrow Up/Down` | Navigate within lists, menus, select options |
| `Arrow Left/Right` | Navigate between tabs, tree items |
| `Home/End` | Jump to first/last item in list |

### Component-Specific Keyboard Behavior

**Modal:**
- Focus moves to first focusable element inside modal on open
- Tab cycles only within modal content (focus trap)
- Escape closes the modal
- Focus returns to the trigger element on close

**Dropdown/Select:**
- Enter or Space opens the dropdown
- Arrow keys navigate options
- Enter selects the focused option
- Escape closes without selection
- Type-ahead: typing characters jumps to matching option

**Tabs:**
- Arrow Left/Right moves between tab triggers
- Tab moves focus out of the tab list into the tab panel content
- Home/End go to first/last tab

**Table:**
- Tab moves between interactive elements within cells
- Arrow keys for cell-to-cell navigation (when applicable)
- Enter activates row action or link

---

## Focus Indicators

### Specifications

```css
:focus-visible {
  outline: 2px solid var(--color-primary-500);
  outline-offset: 2px;
}
```

| Property | Value |
|----------|-------|
| Style | 2px solid |
| Color | `primary-500` (#0F766E) |
| Offset | 2px from element edge |
| Border radius | Follows element border-radius |

### Rules

- **Never remove outline on focus.** Use `:focus-visible` to limit visibility to keyboard users.
- Focus rings must have 3:1 contrast ratio against surrounding backgrounds.
- Focus rings on dark backgrounds: use `primary-200` or white outline.
- Custom focus styles are acceptable as long as they meet visibility requirements.

---

## Screen Reader Support

### Semantic HTML

Always use proper semantic elements:

```html
<!-- Good: Semantic structure -->
<nav aria-label="Main navigation">
  <ul>
    <li><a href="/dashboard">Dashboard</a></li>
    <li><a href="/risks" aria-current="page">Risk Register</a></li>
  </ul>
</nav>

<main>
  <h1>Risk Register</h1>
  <section aria-label="Risk filters">...</section>
  <table aria-label="Risk items">...</table>
</main>

<!-- Bad: Div soup -->
<div class="nav">
  <div class="nav-item" onclick="...">Dashboard</div>
</div>
```

### ARIA Usage

| Pattern | ARIA Attributes |
|---------|----------------|
| Icon-only buttons | `aria-label="Delete risk"` |
| Loading states | `aria-busy="true"`, `aria-live="polite"` |
| Dynamic content updates | `aria-live="polite"` (status), `aria-live="assertive"` (errors) |
| Modals | `role="dialog"`, `aria-modal="true"`, `aria-labelledby` |
| Tabs | `role="tablist"`, `role="tab"`, `role="tabpanel"`, `aria-selected` |
| Expandable sections | `aria-expanded="true/false"`, `aria-controls` |
| Sort columns | `aria-sort="ascending/descending/none"` |
| Required fields | `aria-required="true"` (in addition to HTML `required`) |
| Error messages | `aria-describedby` pointing to error element, `aria-invalid="true"` |
| Progress | `role="progressbar"`, `aria-valuenow`, `aria-valuemin`, `aria-valuemax` |

### Live Regions

```html
<!-- For status messages (non-urgent) -->
<div aria-live="polite" aria-atomic="true">
  3 risks updated successfully.
</div>

<!-- For error messages (urgent) -->
<div role="alert" aria-live="assertive">
  Failed to save changes. Please try again.
</div>

<!-- For loading states -->
<div aria-live="polite">
  <span aria-busy="true">Loading risk data...</span>
</div>
```

---

## Motion and Animation

### Respecting User Preferences

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

### Guidelines

- All animations must be non-essential (content accessible without them)
- No auto-playing videos or rapidly flashing content
- Provide pause/stop controls for any continuous animations
- Carousel or auto-advancing content must have pause controls
- No content that flashes more than 3 times per second

---

## Touch Targets

| Context | Minimum Size | Notes |
|---------|-------------|-------|
| Desktop interactive elements | 32px x 32px | Buttons, links, checkboxes |
| Mobile interactive elements | 44px x 44px | All tappable areas |
| Spacing between targets | 8px minimum | Prevent accidental activation |

Even on desktop, ensure small icons/buttons have adequate click/tap area via padding:

```css
/* Icon button with adequate target size */
.icon-btn {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  /* Icon itself might be 16px but clickable area is 32px */
}
```

---

## Form Accessibility

### Required Patterns

```html
<!-- Proper form field structure -->
<div class="form-field">
  <label for="risk-title" class="label">
    Risk Title <span aria-hidden="true" class="required">*</span>
    <span class="sr-only">(required)</span>
  </label>
  <input
    id="risk-title"
    type="text"
    aria-required="true"
    aria-describedby="risk-title-help risk-title-error"
  />
  <p id="risk-title-help" class="helper-text">
    Enter a concise title describing the risk
  </p>
  <p id="risk-title-error" class="error-text" role="alert" hidden>
    Risk title is required
  </p>
</div>

<!-- Grouped fields -->
<fieldset>
  <legend>Risk Severity Assessment</legend>
  <!-- Related radio buttons or fields -->
</fieldset>
```

### Form Checklist

- [ ] Every input has a visible, associated `<label>` (via `for`/`id`)
- [ ] Required fields are indicated visually AND to screen readers
- [ ] Error messages are associated via `aria-describedby`
- [ ] Errors are announced via `role="alert"` or `aria-live="assertive"`
- [ ] Form field groups use `<fieldset>` and `<legend>`
- [ ] Autocomplete attributes are set for common fields (name, email, etc.)
- [ ] Focus moves to first error field on failed submission
- [ ] Submit buttons are disabled with `aria-disabled` during submission

---

## Accessible Patterns

### Skip Links

```html
<a href="#main-content" class="skip-link">
  Skip to main content
</a>
```

```css
.skip-link {
  position: absolute;
  top: -100%;
  left: 16px;
  padding: 8px 16px;
  background: var(--color-primary-500);
  color: white;
  border-radius: 4px;
  z-index: 9999;
}

.skip-link:focus {
  top: 16px;
}
```

### Screen Reader Only Text

```css
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
```

---

## Testing Checklist

### Automated Testing

- [ ] Run axe-core on every page/component
- [ ] ESLint with eslint-plugin-jsx-a11y (for React projects)
- [ ] Lighthouse accessibility audit score >= 95
- [ ] Validate HTML with W3C validator (catch semantic issues)

### Manual Testing

- [ ] **Keyboard-only navigation:** Complete all workflows using only keyboard
- [ ] **Screen reader testing:** Test with NVDA (Windows) and VoiceOver (macOS)
- [ ] **Zoom testing:** Content usable at 200% zoom
- [ ] **High contrast mode:** UI visible in Windows High Contrast Mode
- [ ] **Reduced motion:** Verify all content accessible with `prefers-reduced-motion`
- [ ] **Color blind simulation:** Check all semantic indicators with color blindness filters

### Per-Component Checklist

- [ ] Proper heading hierarchy (no skipped levels)
- [ ] Images have alt text (or `alt=""` for decorative)
- [ ] Links have descriptive text (not "click here")
- [ ] Tables have proper headers (`<th>` with `scope`)
- [ ] Dynamic content changes are announced to screen readers
- [ ] Custom controls have appropriate ARIA roles
- [ ] Disabled elements are properly indicated (`aria-disabled`)

---

## Tools and Resources

| Tool | Purpose |
|------|---------|
| axe-core / axe DevTools | Automated accessibility testing |
| NVDA | Free screen reader for Windows |
| VoiceOver | Built-in screen reader for macOS/iOS |
| Stark (Figma plugin) | Contrast checking in design |
| WebAIM Contrast Checker | Web-based contrast ratio tool |
| Accessibility Insights | Microsoft's comprehensive testing tool |
| pa11y | CI/CD automated accessibility testing |
