# UI Patterns

## Overview

This document defines the repeatable layout patterns and interaction flows used throughout TrustMaven. Following these patterns ensures consistency, reduces cognitive load for users, and accelerates development.

---

## Dashboard Layout

The primary dashboard is the landing page after login. It provides an at-a-glance view of organizational risk posture.

### Structure

```
+----------------------------------------------------------------+
|  [Logo]  Search (Cmd+K)              [Notifications] [Avatar]  |
+----------+-----------------------------------------------------+
|          |  Dashboard                          [Date range ▼]  |
| Nav      +-----------------------------------------------------+
|          |  [KPI] [KPI] [KPI] [KPI]  (4-column row)           |
| - Dash   +-----------------------------------------------------+
| - Risks  |                          |                          |
| - Matrix |   Chart (6 col)          |   Chart (6 col)         |
| - Reports|                          |                          |
| - Settings+-------------------------+---------------------------+
|          |                          |                          |
|          |   Chart or Table (6 col) |   Chart or List (6 col) |
|          |                          |                          |
+----------+--------------------------+--------------------------+
```

### Specifications

| Element | Details |
|---------|---------|
| KPI row | 4 cards in equal columns, 24px gap |
| Chart grid | 2-column grid (6+6), 24px gap |
| Page title | H1, left-aligned |
| Date range filter | Top-right, dropdown select |
| Refresh indicator | Subtle "Last updated: X min ago" text below title |
| Auto-refresh | Optional, every 5 minutes, subtle pulse on update |

### KPI Cards Content (Default Dashboard)

1. Total Open Risks (count + trend)
2. Critical/High Risks (count + change)
3. Average Risk Score (number + trend)
4. Risks Due for Review (count + overdue highlight)

---

## List/Detail Pattern

Used for risk registers, action items, audit logs, and any entity list.

### Option A: Full-Page Table + Detail Page

```
List Page:
+----------------------------------------------------------------+
| Risk Register                        [+ New Risk] [Filters ▼]  |
+----------------------------------------------------------------+
| [Filter chips: Status: Open | Domain: All | Severity: High+]  |
+----------------------------------------------------------------+
| □ | ID    | Title        | Severity | Owner  | Due    | Status |
|---|-------|-------------- |----------|--------|--------|--------|
| □ | R-042 | Data breach..| Critical | J.Doe  | Mar 15 | Open   |
| □ | R-041 | Vendor risk..| High     | A.Smith| Mar 20 | Review |
+----------------------------------------------------------------+
| Showing 1-25 of 142 risks            [< 1 2 3 4 5 ... 6 >]   |
+----------------------------------------------------------------+

Click row -> Navigate to full detail page
```

### Option B: Table + Side Panel

```
+--------------------------------------------+-------------------+
| Risk Register                              | Risk Detail       |
+--------------------------------------------+                   |
| □ | ID    | Title      | Severity | Owner  | R-042             |
|---|-------|------------|----------|--------| Data breach risk  |
| □ | R-042 | Data bre.. | Critical | J.Doe  |                   |
| □ | R-041 | Vendor r.. | High     | A.Smit | [Full details     |
| □ | R-040 | Complian.. | Medium   | B.Lee  |  in slide-over    |
|   |       |            |          |        |  panel, 480px     |
|   |       |            |          |        |  width]           |
+--------------------------------------------+-------------------+
```

### When to Use Each

| Pattern | Use When |
|---------|----------|
| Full page detail | Complex entities with many fields, tabs, sub-sections |
| Side panel | Quick preview, simple edits, maintaining list context |

### Side Panel Specifications

| Property | Value |
|----------|-------|
| Width | 480px |
| Animation | Slide in from right, 200ms ease-out |
| Backdrop | Optional light overlay on main content |
| Close | X button (top-right) + Escape key + click outside |
| Scroll | Independent scroll within panel |

---

## Form Patterns

### Single-Column Form Layout

```
+--------------------------------------+
| Section Title                        |
| Section description text             |
+--------------------------------------+
|                                      |
| Label                                |
| [Input field                      ]  |
| Helper text                          |
|                                      |
| Label *                              |
| [Input field                      ]  |
|                                      |
| Label                                |
| [Textarea                         ]  |
| [                                 ]  |
|                                      |
+--------------------------------------+
| Section Title                        |
+--------------------------------------+
|                                      |
| Label                                |
| [Select dropdown               ▼ ]  |
|                                      |
+--------------------------------------+

+--------------------------------------+
| [Cancel]              [Save Changes] |  <- Sticky footer
+--------------------------------------+
```

### Form Guidelines

| Aspect | Rule |
|--------|------|
| Layout | Single column, max-width 640px |
| Sections | Group related fields under h4 headers with 32px spacing between sections |
| Field spacing | 16px between fields within a section |
| Labels | Always above the field, never floating/inline |
| Required fields | Red asterisk (*) after label, `aria-required` on input |
| Helper text | Below input, gray-500, 12px, before error text |
| Validation | Inline on blur; red border + error message below field |
| Submit | Primary button, right-aligned in sticky footer |
| Cancel | Secondary button, left of submit |
| Unsaved changes | Warn before navigation with confirmation dialog |
| Long forms | Use stepper/wizard pattern (split into pages with progress indicator) |

---

## Navigation

### Sidebar Navigation (Primary)

```
+---------------------------+
| [Logo] TrustMaven         |
+---------------------------+
| 🔍 Search (Cmd+K)        |
+---------------------------+
|                           |
| MAIN                      |
|   Dashboard               |
|   Risk Register           |
|   Risk Matrix             |
|   Actions                 |
|                           |
| ANALYSIS                  |
|   Reports                 |
|   Trends                  |
|   Heatmaps                |
|                           |
| MANAGE                    |
|   Settings                |
|   Users                   |
|   Integrations            |
|                           |
+---------------------------+
| [Avatar] John Doe     ⚙  |
+---------------------------+
```

### Breadcrumbs

Used on detail and nested pages to show hierarchy:

```
Dashboard > Risk Register > R-042: Data Breach Risk
```

| Property | Value |
|----------|-------|
| Font size | 12px |
| Color | `gray-500`, last item `gray-700` |
| Separator | `/` or `>` in `gray-400` |
| Links | All items except current (last) are clickable |
| Truncation | Collapse middle items to "..." if more than 4 levels |

### Tab Navigation (Within Pages)

Used to organize content within a single page/entity:

```
[ Overview ]  [ Details ]  [ History ]  [ Attachments ]
─────────────────────────────────────────────────────────
Content for active tab
```

- Maximum 6 tabs visible (overflow into "More" dropdown)
- Underline style active indicator
- Tab content loads without full page reload

---

## Search and Filter

### Global Search (Cmd+K)

```
+------------------------------------------------------+
| 🔍 Search risks, actions, reports...                 |
+------------------------------------------------------+
| RECENT                                               |
|   R-042 Data breach risk assessment                  |
|   R-038 Third-party vendor compliance                |
|                                                      |
| RESULTS                                              |
|   [Risk] R-042 Data breach risk assessment           |
|   [Action] A-015 Update firewall rules               |
|   [Report] Q1 Risk Summary                           |
+------------------------------------------------------+
```

| Property | Value |
|----------|-------|
| Trigger | Cmd+K / Ctrl+K, or click search in header |
| Style | Centered modal, 560px width, auto-height |
| Search input | Auto-focused, large (18px font) |
| Results | Grouped by type, 8 max per group, keyboard navigable |
| Dismiss | Escape, click outside, select a result |

### Table Filters

```
+----------------------------------------------------------------+
| [Status ▼] [Severity ▼] [Domain ▼] [Owner ▼]  [Clear filters] |
+----------------------------------------------------------------+
| Active: Status: Open, Severity: High, Critical       [x] [x]  |
+----------------------------------------------------------------+
```

| Feature | Implementation |
|---------|---------------|
| Filter dropdowns | Above table, horizontal row |
| Active filters | Show as removable chips/tags below dropdowns |
| Clear all | Text button to reset all filters |
| Saved views | Optional: save filter combinations as named views |
| Filter count | Badge on filter button showing active filter count |
| Persistence | Filters persist during session, saved views persist across sessions |

---

## CRUD Pattern

### Create

| Approach | When |
|----------|------|
| Modal form | Simple entities (< 6 fields) |
| Full page form | Complex entities (many fields, sections, file uploads) |
| Inline creation | Table rows, quick add (title only, edit details later) |

### Read

- List view (table) for browsing multiple entities
- Detail view for full entity information
- Card view as alternative to table for visual content

### Update

| Approach | When |
|----------|------|
| Inline editing | Single-field updates (click to edit, blur to save) |
| Side panel | Quick multi-field edits while maintaining context |
| Full page form | Complex edits matching the create form |
| Modal | Confirmation-required changes (ownership transfer, status change) |

### Delete

Always require confirmation:

```
+--------------------------------------+
| ⚠️  Delete Risk R-042?              |
|                                      |
| This action cannot be undone. The    |
| risk and all associated data will    |
| be permanently removed.              |
|                                      |
| Type "DELETE" to confirm:            |
| [                                 ]  |
|                                      |
| [Cancel]              [Delete Risk]  |
+--------------------------------------+
```

| Property | Value |
|----------|-------|
| Style | Danger modal (red warning icon) |
| Button | Danger variant (red), disabled until confirmed |
| Confirmation | For high-impact deletes, require typing confirmation text |
| Soft delete | Prefer soft delete with "undo" option in toast when possible |

---

## Bulk Actions

### Selection and Action Bar

```
Table with checkboxes:
+----------------------------------------------------------------+
| ☑ Select all (3 selected)                                      |
+----------------------------------------------------------------+
| ☑ | R-042 | Data breach...                                     |
| ☑ | R-041 | Vendor risk...                                     |
| ☑ | R-040 | Compliance...                                      |
| □ | R-039 | Market risk...                                      |
+----------------------------------------------------------------+

Floating action bar (appears at bottom):
+----------------------------------------------------------------+
| 3 items selected    [Assign ▼] [Change Status ▼] [Delete]  [×] |
+----------------------------------------------------------------+
```

| Property | Value |
|----------|-------|
| Floating bar position | Fixed bottom, centered, 48px height |
| Background | `gray-900` (dark) with white text |
| Border radius | 8px |
| Shadow | `shadow-lg` |
| Animation | Slide up from bottom on first selection |
| Dismiss | Deselect all or click X |
| Select all | Header checkbox, selects visible page or all (confirm if all) |

---

## Pagination

### Table Pagination

```
Showing 1-25 of 142 items        [< Previous]  1  2  3 ... 6  [Next >]
```

| Feature | Implementation |
|---------|---------------|
| Items per page | Dropdown: 25 (default), 50, 100 |
| Page numbers | Show first, last, current +/- 1, with ellipsis for gaps |
| Previous/Next | Always visible, disabled when at start/end |
| Item count | "Showing X-Y of Z items" text (left side) |
| Keyboard | Arrow keys to navigate pages when pagination is focused |

### List "Load More"

For infinite-scroll or progressive loading in non-tabular lists:

```
[Risk item]
[Risk item]
[Risk item]
        [ Load more (showing 25 of 142) ]
```

- Button centered below list
- Shows current count / total count
- Loading spinner replaces button text during load
- Consider virtual scrolling for very large lists (1000+ items)

---

## Responsive Behavior

### Breakpoint Adaptations

| Component | >= 1280px (xl) | 768-1279px (md/lg) | < 768px (sm) |
|-----------|---------------|-------------------|--------------|
| Sidebar | 240px, expanded | 64px, icons only | Hidden, hamburger drawer |
| KPI row | 4 columns | 2 columns (2x2 grid) | 1 column (stacked) |
| Chart grid | 2 columns | 1 column (stacked) | 1 column |
| Tables | Full table | Horizontal scroll | Convert to cards |
| Forms | 640px max-width | Full width with padding | Full width |
| Modals | Centered, 560px | Centered, 90% width | Full screen (bottom sheet) |
| Side panel | 480px overlay | Full screen overlay | Full screen |

### Table to Card Conversion (Mobile)

When tables convert to card format on small screens:

```
+--------------------------------------+
| R-042                                |
| Data breach risk assessment          |
|                                      |
| Severity: ● Critical                 |
| Owner: J. Doe                        |
| Due: March 15, 2026                  |
| Status: Open                         |
+--------------------------------------+
```

Each row becomes a card with key fields displayed as label/value pairs.

---

## Notification Center

### Header Icon

```
[🔔 3]  <- Bell icon with unread count badge
```

| Property | Value |
|----------|-------|
| Icon position | Top header bar, right section |
| Badge | Red dot or count (max "9+"), top-right of bell icon |
| Badge size | 16px diameter for count, 8px for dot-only |

### Dropdown Panel

```
+--------------------------------------+
| Notifications           [Mark all ✓] |
+--------------------------------------+
| ● Risk R-042 severity escalated     |
|   to Critical by system             |
|   2 minutes ago                      |
+--------------------------------------+
|   Action A-015 completed by         |
|   A. Smith                           |
|   1 hour ago                         |
+--------------------------------------+
|   Weekly risk report ready           |
|   3 hours ago                        |
+--------------------------------------+
| [View all notifications →]           |
+--------------------------------------+
```

| Property | Value |
|----------|-------|
| Panel width | 380px |
| Position | Below bell icon, right-aligned |
| Max height | 480px (scrollable) |
| Item height | Auto (min 64px) |
| Unread indicator | Blue dot (left of item) |
| Hover | Gray-50 background |
| Click | Navigate to related entity |
| Time format | Relative ("2 min ago", "1 hour ago") |
| Max visible | 8 items, "View all" link at bottom |
| Empty state | "No new notifications" + illustration |

### Notification Types

| Type | Icon | Color |
|------|------|-------|
| Risk escalation | Arrow up | `critical` or `high` |
| Assignment | User icon | `info` |
| Completion | Check circle | `low` |
| Due date reminder | Clock icon | `medium` |
| System update | Info circle | `info` |
| Comment/mention | Chat bubble | `primary` |

---

## Command Palette (Cmd+K)

A keyboard-first power-user feature for rapid navigation and actions:

### Behavior

| Feature | Details |
|---------|---------|
| Trigger | `Cmd+K` (Mac) / `Ctrl+K` (Windows) |
| Position | Centered modal, top-third of viewport |
| Width | 560px |
| Search | Instant fuzzy search across all entities and actions |
| Categories | Navigation, Recent, Risks, Actions, Commands |
| Keyboard nav | Arrow keys to select, Enter to activate |
| Dismiss | Escape or click outside |

### Command Types

- **Navigation:** "Go to Dashboard", "Go to Risk Register"
- **Entity search:** "R-042", "Data breach", entity titles
- **Actions:** "Create new risk", "Export report", "Toggle dark mode"
- **Filters:** "Show critical risks", "Risks assigned to me"

---

## Confirmation Patterns

### When to Confirm

| Action | Confirmation Needed |
|--------|-------------------|
| Delete (permanent) | Yes - modal with typed confirmation |
| Delete (soft/reversible) | Yes - simple modal or inline with undo toast |
| Status change | No - instant with undo toast |
| Bulk operations | Yes - modal with count summary |
| Leaving unsaved changes | Yes - modal "Discard changes?" |
| Irreversible exports | No - just proceed (data is not destructive) |

### Undo Pattern (Preferred for Reversible Actions)

Instead of blocking confirmation dialogs for reversible actions:

1. Perform action immediately
2. Show toast: "Risk archived. [Undo]"
3. Undo available for 8 seconds
4. After timeout, action is finalized

This pattern is faster and less disruptive than confirmation dialogs for non-destructive operations.
