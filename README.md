# Procedures:GO — Issue & Receipt

Play online: **https://peaceinkilling.github.io/procedures-go/**

A responsive top-down learning game for the complete normal Army Ordnance Issue and Receipt procedures. It runs directly in a modern browser on phones, tablets and computers—no installation or offline file sharing is required.

## Run locally

```powershell
npm start
```

Then open `http://127.0.0.1:8766/`.

## Validate

```powershell
npm test
```

The validator checks all 53 document/entity lifecycles, declared transitions, campaign stages, office layouts, source citations and explicit concurrent-branch focus switches.

## Flow model

- Character Campaign follows one document, copy, register or physical entity through its complete lifecycle.
- Full Operation follows the complete procedure across concurrent branches.
- A dashed `↻` route chip means the simulation changed operational focus to another simultaneous branch. It does **not** claim that the previous office handed that document directly to the next office.
- Issue covers the IV3/IV4 accounts branch, IV5 packing-progress/LAO branch, consignment/returned-IV2 branch and IV6 time-check/unit-pad branch.
- Receipt distinguishes the advance-RV1 watch, transit/DRS stream, RV/RCRS control, RN&DOR stock branches, CAB posting and returned-RV2 closure.

## Architecture

- `index.html` — semantic shell and Character Selection Hangar.
- `src/styles.css` — responsive structural layout and component foundation.
- `src/instrument-theme.css` — Procedures:GO precision-instrument visual theme.
- `src/procedure-data.js` — offices, characters, campaign stages, routes and citations.
- `src/map.js` — active-procedure map rendering and spatial interaction.
- `src/ui.js` — Hangar, office dossiers, HUD, feedback and challenges.
- `src/engine.js` — campaign state, movement, scoring and transitions.
- `tests/route-validator.js` — procedure and source-data invariants.
- `src/smoke-runner.js` — complete in-browser Issue/Receipt scenario matrix.

## Source-library policy

The primary RAOS/DGOSTI files remain in the local reference library and are intentionally excluded from this public repository. Human-readable citations and rulings are recorded under `docs/`; machine-readable route citations remain in `src/procedure-data.js`.
