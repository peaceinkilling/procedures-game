# AGENTS.md — Ordnance Depot Learning Game

## Mission
Build a genuinely playable, memorable game that teaches the complete Army Ordnance Issue and Receipt procedures without omitting any office, document copy, control record, physical store movement, exception branch, or final disposal.

## Non-negotiable rules
1. Procedure accuracy comes before visual simplification. Never invent or remove a procedural leg merely to make the game shorter.
2. Every playable entity must have a source-backed route, lifecycle states, office actions, copy-specific purpose, and final disposal.
3. Keep the playfield unobstructed. HUD, mission instructions, compass, tutorials, and menus must not cover buildings, routes, characters, or interactive objects.
4. The full map must remain visible at common desktop resolutions. Provide responsive camera or zoom only when necessary.
5. A wrong answer must explain why it is wrong and show the correct procedural reason.
6. Separate procedure data from game code. Office routes and document states belong in data files, not hard-coded across gameplay functions.
7. Add automated tests for every document route and every office transition.
8. Do not start Receipt Procedure implementation until the complete Issue Procedure roster and its tests are approved.

## Source discipline
- Primary basis: RAOS Part II and DGOSTI-002 for Issue Procedure.
- Training summaries may clarify, but must not override the primary procedure.
- Record source paragraph/page beside each route in the source-map document.
- Flag uncertainty rather than guessing.

## Development order
1. Fix layout and viewport.
2. Refactor current monolithic file into modules.
3. Build the complete Issue document roster.
4. Add individual-character campaigns.
5. Add route reconstruction and exam modes.
6. Validate Issue Procedure end to end.
7. Add Receipt Procedure using the same engine.

## Test command target
Create a lightweight local test command that validates route completeness and prevents unreachable offices, duplicate IDs, missing end states, and unsupported transitions.
