# NAC — Nutrition Assessment Calculator

A single place for the calculations dietitians and nutrition students use during
assessment — pick a calculation, enter the values, get a precise result.

## Status

**v1 — stateless.** No login, no database yet. Calculations run entirely in the
browser. Saved history/patient records can be added later (Supabase) once the
calculator set is solid.

Built calculators:
- ✅ Mifflin-St Jeor (energy)

Planned for v1:
- Harris-Benedict (energy)
- BMI
- Ideal Body Weight (Devine)
- % Weight Loss / Severity
- Protein Requirement (condition-based)
- Fluid Needs (30–35 mL/kg + Holliday-Segar)
- MUST Score

## Adding a new calculator

1. Create a component in `src/calculators/` following the pattern in
   `MifflinStJeor.jsx` (controlled inputs → `useMemo` result → `.calc-panel` markup).
2. Register it in `src/calculators/registry.js`, setting `component` to your
   new component (it currently shows as "Coming soon" while `component: null`).

## Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```
