# Archive, Access and Analytics Design

## Archive

The in-game Archive has two source-backed indexes:

1. **Sections / Branches** — every mapped Issue and Receipt office, its role, ordered actions, situations, safeguards and every playable document route that passes through it.
2. **Documents** — every playable entity, its originator, purpose, closure evidence, chronological route, blank learning template and completed responsibility-attributed lifecycle.

The blank document view is explicitly described as a schematic learning template. It is not presented as an official printable facsimile unless the active source contains an exact reproduced form schema. The completed view distinguishes an attributed entry from a custody/control stage where no new writing is asserted.

## Course access

- BOM 105 uses the supplied BOM 105 course password.
- BOM 106 uses the supplied BOM 106 course password.
- Entering `admin` as the name activates the requested bypass, does not require a course password and is excluded from activity logging.
- Course passwords are compared against SHA-256 digests and are never stored in analytics records.

This is a client-side access gate on a public static website. It discourages casual access but is **not strong authentication**: all browser-side verification logic is downloadable with the public game. Strong access control requires a server-side identity provider.

## Current analytics scope

The GitHub Pages deployment is static and cannot accept private writes. The current build therefore:

- records player name, course, session start, archive use, mission selection, mode, role, control points, mistakes, completion, score and timing in that browser's `localStorage`;
- excludes administrator sessions;
- never records the course password;
- exposes the local analytics console only during an admin-bypass session;
- exports a CSV or JSON file for private retention by the administrator;
- clearly tells learners that the static edition does not transmit their name to a remote service.

Records created on one learner's phone do not appear on the administrator's device. GitHub Pages also cannot write a shared “other file” in the repository.

## Required next step for centralized private analytics

A cross-device system requires an authenticated write API and a private database. The storage adapter in `src/session.js` isolates record creation so it can later send the same event schema to such an endpoint. Before enabling remote collection, the owner must select the hosting/database provider and approve:

- who may read learner names;
- retention and deletion periods;
- learner notice/consent wording;
- administrator authentication stronger than the name-only bypass;
- encryption, access logs and backup policy.

No external analytics service or public write endpoint has been silently added.
