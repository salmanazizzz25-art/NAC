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

## Site settings (.env)

Owner name, contact email, site URL, the policy "last updated" date and the
AdSense IDs all live in `.env`. The production build stops with an error if
any required value is missing, so placeholder text can't go live.

- `VITE_ADSENSE_CLIENT` (ca-pub-…): set when applying to AdSense. Adds Google's
  script to the calculator page and generates `ads.txt`.
- `VITE_ADSENSE_SLOT`: set after approval, once an ad unit exists. The labelled
  ad box at the bottom only appears when both are set.

Pages: `/about`, `/privacy`, `/terms` (static HTML, built alongside the app).
