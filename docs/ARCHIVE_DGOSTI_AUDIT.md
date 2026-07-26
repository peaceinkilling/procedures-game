# Archive DGOSTI Audit

Audit date: 26 July 2026

## Scope

The Archive was rebuilt directly from:

- `doc 2 main remove/DGOS/DGOS TI 002 ISSUE PROCEDURE NORMAL.pdf`
- `doc 2 main remove/DGOS/DGOS TI 001 RECEIPT PROCEDURE.pdf`
- `doc 2 main remove/RAOS Part II.pdf` only where the Issue Voucher returned-copy conflict required disclosure

Gameplay entities remain available in the Hangar, but the Archive no longer presents every gameplay entity as a document or every map destination as an internal section.

## Corrected Issue names

The Archive now uses the DGOSTI-002 headings:

- Headquarters Section
- Indent Sorting Section
- Unit Location Cell
- Indent Checking Section
- Control Registry
- Voucher Preparation Section
- Sub Depot Issue Control
- Dues Out Control
- Master Location Record Section
- Selection of Stores
- Packing Section
- Traffic Branch Issue Section
- Central Account Branch
- Central Records Section / Records and Progress Section

Central Registry, S&M Branch, the demanding unit and LAO are classified as supporting or external points instead of being mislabelled as numbered Issue sections.

## Corrected Receipt names

The Archive now uses the DGOSTI-001 Appendix headings:

- Central Registry
- Provision Branch
- Traffic Branch (Receipts)
- Sub Depot/Group Receipts Progress Section
- Sub Depot/Group Receipts Area
- Receipts Liaison Section
- Receipts Control Registry
- Master Location Records Section
- Dues Out Review Cell (DOC)
- Further Part Voucher Release Cell (DOC)
- Dues Out Suspense Area
- Bulk/Detail Store House / Area
- Sub Depot/Group Receipts Office Discrepancy Section
- Central Accounts Branch
- Depot Accounts Officer — Central Discrepancy Section
- Records and Progress Section / Central Record Section

The consignor is classified as external. Packing is identified as the hand-off into the Issue Procedure for released dues-out stores, not as a Receipt Appendix.

## Document inclusion rule

The Archive indexes only independently supportable documents and records:

- 21 Issue documents/records
- 17 Receipt documents/records

It excludes physical stores, packages, unit-pad bundles and a “receipted copy” state as separate documents. It also rejects a separate “Issues Control Sheet equivalent”: DGOSTI-002 specifies the Issue Registration and Progress Sheet prepared in duplicate.

Where the primary instruction does not reproduce a blank form, the Archive says so. It lists only the fields, endorsements or evidence explicitly stated in the cited paragraph. It does not draw an invented facsimile.

## Source conflicts and unknowns

- DGOSTI-002 does not identify who originally prepares the Schedule of Indents. The Archive therefore states that its creator is not specified; it only asserts that the schedule accompanies the demands and that Control Registry adds control numbers.
- DGOSTI-002 paragraph 213(n) identifies No.5 as the receipted returned copy, while DGOSTI-002 broad principles and detailed No.5-to-LAO handling conflict with that statement, and RAOS Part II paragraph 190 identifies No.2. The IV2 and IV5 pages disclose this conflict. The Archive does not present the disputed return-copy identity as uncontested.
- Carrier forms such as RR/PWB are described only by the linkage and disposal supported by DGOSTI. Their proprietary field layouts are not invented.

## Automated enforcement

`npm test` now rejects:

- a mapped office without a verified Archive classification;
- an office action without source, paragraph/appendix and PDF page;
- a document without origin, purpose, cited contents, cited flowchart stages or final disposal;
- duplicate Archive document IDs;
- reintroduction of speculative blank-document facsimiles;
- omission of the IV2/IV5 conflict;
- reintroduction of a separate invented Issues Control Sheet.
