# Make finance & alert actions functional

The app is currently frontend-only with hardcoded dummy data. Buttons like **Create Alert**, the Transactions **+** FAB, **Add Bill**, **Add Goal**, the bill **✓ paid** button, and alert **toggle/delete** render but do nothing. This plan wires them up so they truly create/update items, and persists them so they survive page reloads — matching the existing frontend-only architecture (no backend needed).

## Approach

Introduce a small shared client store layered over the existing `src/lib/finance-data.ts` seed data, persisted to `localStorage`. Each screen reads from and writes to this store instead of importing the static arrays directly. New items appear instantly in their lists.

```text
finance-data.ts (seed)  ->  useFinanceStore (state + localStorage)  ->  screens
```

## Changes

### 1. New store: `src/hooks/use-finance-store.ts`
- A lightweight store (React context provider + hook, or a module-level store with `useSyncExternalStore`) holding: `alerts`, `transactions`, `bills`, `goals`, `notifications`.
- Initializes from the seed arrays in `finance-data.ts`, then hydrates/overwrites from `localStorage` (`nafaiq:finance:v1`) on load; writes back on every change.
- Exposes actions: `addAlert`, `toggleAlert`, `removeAlert`, `addTransaction`, `addBill`, `markBillPaid`, `addGoal`, `contributeToGoal`.
- Provider mounted once in `src/routes/__root.tsx` so all routes share state.

### 2. Alerts screen (`src/routes/alerts.tsx`)
- Replace local `useState(ALERTS)` with the store.
- **Create Alert**: build an alert object from the selected type, symbol/bill, condition, price/timing, and push/email checkboxes (now controlled inputs); call `addAlert`, then reset the form and show it at the top of Active Alerts. Also append a "Notification" entry to history confirming creation.
- Wire the existing toggle and trash buttons to `toggleAlert` / `removeAlert`.
- Basic validation (e.g. Stock Price requires a numeric price) with inline feedback.

### 3. Finance screen (`src/routes/finance.tsx`)
- Read `transactions`, `bills`, `goals` from the store instead of static imports.
- **Add Transaction** (the + FAB): opens a modal/sheet with merchant, amount (income/expense toggle), category, account, date; on submit calls `addTransaction` and the new row appears in the grouped list. Budgets "spent" totals recompute from transactions where applicable.
- **Add Bill**: opens a small form (name, amount, due date) -> `addBill`.
- Bill **✓** button: `markBillPaid` (updates status, optionally logs a transaction).
- **Add Goal**: form (name, target, optional date) -> `addGoal`; the goal card grid updates. Goal contribute "+" button -> `contributeToGoal`.

### 4. Shared form UI
- Reuse existing shadcn/styled primitives and the project's glass/dark tokens (no hardcoded colors). A single reusable modal/sheet component for the create forms to keep things consistent.

## Out of scope
- No backend / Lovable Cloud (data stays client-side + localStorage, consistent with the current dummy-data design). If you'd prefer real cross-device persistence with auth, say so and I'll add a Cloud-backed version instead.
- Landing page and unrelated screens untouched.

## Verification
- Typecheck/build.
- Drive the preview: create an alert and confirm it appears + persists after reload; add a transaction, bill, and goal and confirm each shows in its list; toggle/delete an alert; mark a bill paid.