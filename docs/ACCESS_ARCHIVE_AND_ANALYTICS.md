# Archive and Access Design

## Archive

The in-game Archive has two DGOSTI-audited indexes:

1. **Verified Sections / Branches** — every mapped point classified as an official DGOSTI section/appendix, a supporting branch, an external actor or a cross-procedure hand-off. Each action has a paragraph/appendix and PDF-page citation.
2. **Verified Documents** — only independently supportable documents and records. Each page shows verified contents/endorsements, a cited lifecycle flowchart and final disposal.

Speculative blank learning forms have been removed. When DGOSTI does not reproduce a blank form, the Archive explicitly says so and lists only the fields or endorsements stated in the cited paragraphs. Physical stores, packages and lifecycle states are not mislabelled as documents.

See `ARCHIVE_DGOSTI_AUDIT.md` for the exact naming, inclusion and uncertainty rules.

## Course access

- BOM 105 and BOM 106 use their supplied course passwords.
- Entering `FOLS` as the name activates the authorised no-password bypass.
- The former `admin` name bypass has been removed.
- Course passwords are compared against distinct SHA-256 digests and are not stored.

This remains a client-side access gate on a public static website. It discourages casual access but is not strong authentication because browser-side verification logic is downloadable with the public game.

## Analytics decision

Analytics have been removed entirely from the static edition:

- no player name is persisted;
- no score, timing, route or mistake event is persisted;
- no IP address or device detail is collected;
- no browser-local analytics table or export file remains;
- no administrator credential is included in public source code.

The GitHub Pages deployment cannot accept private writes. A centralized owner-only analytics system requires a separately authorized backend account.

## Suitable future backend

The assessed design is a Cloudflare Worker with a D1 SQL database:

- the Worker verifies course and administrator credentials using encrypted Worker secrets;
- D1 stores the approved analytics schema;
- the Worker can obtain the request IP and limited request metadata server-side;
- CORS can be restricted to the Procedures Game origin;
- the administrator receives an authenticated, expiring session before any analytics query;
- retention and deletion controls can be enforced centrally.

No Cloudflare account, API token, Worker project or D1 database is available in the current workspace. Therefore the backend was not provisioned and the supplied administrator password was not written to the repository.

If a backend is authorized later, collection should be disclosed to learners and limited to necessary fields. Exact device fingerprinting should not be introduced merely to make a device more identifiable.

Official implementation references:

- [Cloudflare Worker secrets](https://developers.cloudflare.com/workers/configuration/secrets/)
- [Cloudflare D1 getting started](https://developers.cloudflare.com/d1/get-started/)
- [Worker request metadata](https://developers.cloudflare.com/workers/runtime-apis/request/)
- [Binding Workers to databases](https://developers.cloudflare.com/workers/databases/connecting-to-databases/)
