# RetinaVision AI — Frontend (boilerplate)

A plain React + Vite skeleton for the DR Screening app, structured to match the
6 wireframe pages from the sketch/HTML reference. **No CSS/styling is included
on purpose** — this is meant to be a clean, editable base to design on top of
later. All data is hardcoded JSON for now, shaped to be a drop-in replacement
target for the real MATLAB pipeline output (see `../webapp/app.py` and
`../test_output/result.json` in the DR-Screening repo).

## Run it

```bash
npm install
npm run dev
```

Vite dev server proxies `/analyze` and `/uploads` to `http://localhost:5000`
(the Flask app in `webapp/app.py`), so once you wire up real uploads it should
talk to the existing backend with no extra config. Change the proxy target in
`vite.config.js` if your backend runs elsewhere.

## Folder structure

```
src/
  data/                     hardcoded JSON "database" (swap for real API calls later)
    patients.json           patient registry
    analysisResults.json    AI results per patient, keyed by patient id
    specialists.json        referral network list

  context/
    AppContext.jsx          single source of truth: patients, active patient,
                             analysis results, addPatient(), runAnalysis()

  components/
    Header.jsx              top nav bar (matches the wireframe's top links)
    PatientTable.jsx         table + row for the Database page
    GradeBadge.jsx           renders a DR grade (0-4) as text
    ReportTabs.jsx           the [Analysis] [Result/Grading] [Report] tab bar
    SpecialistCard.jsx       single specialist row + "Send" button
    tabs/
      AnalysisTab.jsx        upload + quality-check block
      ResultsTab.jsx         grade badge + image viewer + lesion summary
      ReportTab.jsx          executive summary + referral CTA
    modals/
      Modal.jsx              generic modal shell
      AddPatientModal.jsx    "Add New Patient" form
      AuthModal.jsx          "Login / Register" form (not wired to real auth)

  pages/
    LandingPage.jsx          hero + stats + 4 flow cards -> matches sketch page 1
    DatabasePage.jsx         sidebar grade filters + search + patient table -> page 2
    UserReportPage.jsx       hosts the 3 report tabs for the active patient -> page 3
    GradingDetailPage.jsx    Grade / Confidence / Grad-CAM detail -> page 4 (middle sketch)
    PdfReportPage.jsx        printable report layout -> page 5 (lower sketch)
    SpecialistsPage.jsx      referral list with Send buttons -> page 6 (bottom sketch)

  App.jsx                    routes, wraps app in AppProvider
  main.jsx                   entry point
```

## Routes

| Path            | Page                        |
|-----------------|------------------------------|
| `/`             | Landing                     |
| `/database`     | Patient database/registry   |
| `/report`       | User report (3 tabs)        |
| `/grading`      | Diagnostic/Grad-CAM detail  |
| `/pdf-report`   | Printable report preview    |
| `/specialists`  | Referral network            |

## Notes for whoever builds on this

- There is intentionally **no CSS anywhere** and no design system — add your
  own stylesheet/Tailwind/CSS modules/etc. Class names like `report-tabs`,
  `modal-overlay`, `db-sidebar` are already sprinkled on some elements (kept
  from the original HTML reference) purely as CSS hooks, not for styling.
- `AppContext.jsx` is the only place holding state — swap `addPatient`,
  `runAnalysis`, and the JSON imports for real API calls (fetch/axios) without
  touching the pages/components.
- `analysisResults.json` mirrors the shape returned by the Flask endpoint in
  `webapp/app.py` (`status`, `grade`, `confidence`, `maCount`, `hemCount`,
  `exudateCount`, `gradcam_url`, `enhanced_url`) plus a few extra UI-only
  fields (`quality`, `recommendation`, `gradeText`).
