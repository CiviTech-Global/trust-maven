# Style Guide and Design Approach

## Reference

The detailed visual style guide, including color palettes, typography scales, component specifications, and design tokens, is maintained in the `StyleGuide/` directory at the project root.

```
trust-maven/
└── StyleGuide/          # Detailed visual specifications
    ├── colors
    ├── typography
    ├── components
    └── patterns
```

---

## Design Philosophy

TrustMaven's design is guided by three core principles:

### 1. Simplicity
Risk management is inherently complex. The interface must reduce cognitive load, not add to it. Every element should earn its place on screen. Information hierarchy is paramount: the most critical data (risk scores, overdue items, status) should be immediately visible without interaction.

### 2. Beauty
Enterprise software does not need to be ugly. TrustMaven adopts a refined, modern aesthetic that professionals enjoy using daily. Clean spacing, thoughtful color usage, and subtle polish create an experience that feels premium without being decorative.

### 3. Convenient UX for Risk Professionals
The interface is designed for people who work with risk data all day. This means: fast navigation between related entities, bulk operations, keyboard shortcuts for power users, persistent filters, and workflows that minimize clicks for common tasks.

---

## Modern Design Trends (2025-2026)

The visual design incorporates current best practices from leading product design:

### Minimal Chrome
- Reduced visual noise: fewer borders, less contrast between sections
- Content takes center stage with generous whitespace
- Navigation is compact and stays out of the way
- Actions appear contextually rather than cluttering the interface permanently

### Data Density
- Enterprise users need to see more data at once compared to consumer apps
- Compact table rows with readable but efficient spacing
- Collapsible panels and progressive disclosure for secondary information
- Summary cards that convey key metrics at a glance

### Subtle Animations
- Micro-interactions provide feedback (button presses, state transitions)
- Page transitions use gentle fades rather than jarring cuts
- Loading states use skeleton screens instead of spinners where possible
- Animations serve function (directing attention) rather than decoration

### Glassmorphism Accents
- Frosted-glass effects on floating elements (modals, dropdowns, sidebar)
- Subtle background blur for layered interfaces
- Used sparingly as accent rather than primary design language
- Maintains readability and accessibility standards

### Additional Trends
- Soft shadows over hard borders for depth
- Rounded corners (8px standard, 12px for cards)
- Monochromatic color schemes with strategic accent colors
- Dark mode support (secondary priority for MVP)

---

## Design Inspiration

The visual identity draws from three best-in-class product designs:

### Linear
- Ultra-clean interface with minimal chrome
- Keyboard-first workflow design
- Subtle animations and transitions
- Command palette for power users
- Compact, efficient use of space

### Notion
- Flexible, content-first layout approach
- Clean typography hierarchy
- Intuitive drag-and-drop interactions
- Sidebar navigation patterns
- Pleasant empty states and onboarding

### Vercel Dashboard
- Data-rich dashboards that remain clean
- Monochromatic with strategic color use
- Status indicators and real-time data presentation
- Professional, developer-focused aesthetic
- Excellent table and list designs

---

## Platform Approach

### Desktop-First

TrustMaven is designed as a **desktop-first, enterprise B2B tool**. The primary usage context is:

- Risk professionals at their workstations (large screens, keyboard + mouse)
- Conference room displays for risk review meetings
- Audit sessions with side-by-side document comparison

**Minimum supported width:** 1280px
**Optimal experience:** 1440px - 1920px

**Responsive considerations:**
- Tablet (1024px+): Supported with adapted layouts
- Mobile (< 768px): Not a priority for MVP; basic read-only access at most
- The sidebar collapses to icons on smaller screens
- Tables adapt with horizontal scrolling rather than stacking

### Enterprise B2B Considerations
- Accessibility: WCAG 2.1 AA compliance
- Print-friendly styles for reports and audit exports
- High contrast mode support
- Keyboard navigation for all interactive elements
- Screen reader compatibility for data tables

---

## Risk-Specific Visualization

### Severity Color Coding

Risk scores map to a consistent, intuitive color system used throughout the application:

| Score Range | Severity | Color | Hex | Usage |
|-------------|----------|-------|-----|-------|
| 1-4 | Low | Green | #059669 | Badges, matrix cells, chart segments |
| 5-9 | Medium | Yellow/Amber | #F59E0B | Badges, matrix cells, chart segments |
| 10-14 | High | Orange | #EA580C | Badges, matrix cells, chart segments |
| 15-19 | Very High | Red | #DC2626 | Badges, matrix cells, chart segments |
| 20-25 | Critical | Dark Red | #991B1B | Badges, matrix cells, chart segments |

These colors are used consistently across:
- Risk score badges in tables and cards
- Risk matrix heat map cells
- Dashboard chart segments
- Notification severity indicators
- Sidebar risk count badges

### Risk Matrix Visualization

The 5x5 risk matrix is a central visualization requiring careful design:

```
        Impact →
   L    1    2    3    4    5
   i  ┌────┬────┬────┬────┬────┐
   k 5│ 5  │ 10 │ 15 │ 20 │ 25 │
   e  ├────┼────┼────┼────┼────┤
   l 4│ 4  │ 8  │ 12 │ 16 │ 20 │
   i  ├────┼────┼────┼────┼────┤
   h 3│ 3  │ 6  │ 9  │ 12 │ 15 │
   o  ├────┼────┼────┼────┼────┤
   o 2│ 2  │ 4  │ 6  │ 8  │ 10 │
   d  ├────┼────┼────┼────┼────┤
   ↑ 1│ 1  │ 2  │ 3  │ 4  │ 5  │
     └────┴────┴────┴────┴────┘
```

- Each cell shows the count of risks at that intersection
- Cell background uses the severity color (gradient from green to dark red)
- Clicking a cell opens a filtered view of those risks
- Hover tooltip shows risk titles in that cell
- The matrix appears on the dashboard and in assessment views

### Trend Charts

- **Line charts** for risk count over time (smooth curves, not jagged lines)
- **Area charts** for stacked domain distribution over time
- **Bar charts** for treatment progress and completion rates
- All charts use the application color palette consistently
- Responsive chart sizing with legible labels at all viewport widths

### Domain Icons

Each risk domain has a distinctive icon for quick visual identification:
- Financial: chart/dollar icon
- Cybersecurity: shield/lock icon
- AI Governance: brain/circuit icon
- Operational: gear/process icon
- Regulatory: document/gavel icon

---

## Typography

- **Primary font:** Inter (variable weight, excellent readability at all sizes)
- **Monospace font:** JetBrains Mono (code snippets, IDs, technical values)
- **Scale:** Based on a 1.25 modular scale starting from 14px base

| Level | Size | Weight | Usage |
|-------|------|--------|-------|
| H1 | 28px | 700 | Page titles |
| H2 | 22px | 600 | Section headers |
| H3 | 18px | 600 | Card titles |
| Body | 14px | 400 | Default text |
| Small | 12px | 400 | Captions, metadata |
| Tiny | 11px | 500 | Badges, labels |

---

## Spacing and Layout

- **Base unit:** 4px
- **Standard spacing scale:** 4, 8, 12, 16, 20, 24, 32, 40, 48, 64px
- **Page content max-width:** 1440px (centered with padding on ultra-wide)
- **Sidebar width:** 240px expanded, 64px collapsed
- **Card padding:** 24px
- **Table row height:** 48px (compact), 56px (comfortable)
- **Form field height:** 40px

---

## Component Style Standards

### Buttons
- Primary: Solid fill with primary color
- Secondary: Outlined with primary color border
- Tertiary/Ghost: Text only, no border or fill
- Destructive: Red fill for delete/remove actions
- Border radius: 6px
- Height: 36px (small), 40px (medium), 44px (large)

### Cards
- Background: White (light mode)
- Border: 1px solid #E2E8F0
- Border radius: 12px
- Shadow: 0 1px 3px rgba(0,0,0,0.08)
- Hover shadow (interactive cards): 0 4px 12px rgba(0,0,0,0.1)

### Tables
- Header: Semi-bold, slightly smaller text, light background
- Rows: Alternating background for readability (subtle)
- Hover: Row highlight on hover
- Actions: Icon buttons appear on row hover
- Pagination: Bottom-aligned with page size selector

### Forms
- Labels above inputs
- Clear validation messages below fields (red text)
- Required field indicators (asterisk)
- Helper text in muted color below fields
- Consistent input sizing across the application
