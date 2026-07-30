# Issue and Receipt Procedure Source Map

This is the human-readable companion to the machine-readable routes, transitions and citations in `src/procedure-data.js`.

## Issue

See `ISSUE_SOURCE_MAP.md`. Approved Issue characters cite RAOS Part II Chapter 5 and the relevant DGOSTI-002 paragraph/page range. Primary-text conflicts remain visible in amber and are excluded from the verified route count.

## Receipt

Primary authority:

- `doc 2 main remove/RAOS Part II.pdf`, Receipt Procedure paras 134–146 (PDF pages 63–74).
- `doc 2 main remove/DGOS/DGOS TI 001 RECEIPT PROCEDURE.pdf`, broad principles para 2 and Appendices A–Q (PDF pages 7–58).

Verified normal flow:

1. Central Registry date-stamps receipt papers, sending transit documents to Traffic Receipts and the advance consignor issue voucher to Provision.
2. Traffic registers RR/PWB or other transit papers, takes over packages, and prepares a separate three-copy DRS for each consignment/Sub-Depot grouping.
3. DRS1 returns receipted to Traffic and is filed with the convoy note; DRS2 follows the stores/voucher checking and control cycle before Receipts Progress files it in serial-number order; DRS3 goes through Receipts Progress to R&PS/CRS. DGOSTI-001 Appendix D paras 5 and 7(b), PDF pages 27 and 29–30.
4. On the first Receipts Area visit, the office takes over the packages against DRS1–3, acknowledges DRS1/DRS3, retains DRS2 and extracts RV2 from Package No. 1. RV1 is not at Receipts Area at this point, and no RN&DOR exists. RV2 and DRS2 travel through Receipt Liaison to Receipts Progress, where they are married with the advance RV1; the linked RV1/RV2/DRS2 set then returns through Liaison to Receipt Control.
5. RCRS1 goes to Receipts Progress, RCRS2 to R&PS/CRS, and RCRS3 to CAB.
6. After control, Receipt Area checks designation, quantity and condition against the controlled papers. Liaison then holds RV2/DRS2, sends RV1 alone through MLRS and DOC, and, only where RV1 shows dues-out quantities, through FPV Release. RN&DOR is prepared by Receipt Liaison only after RV1 returns; its copies then split in parallel to FPV Release and/or Receipts Area according to the actual destinations.
7. Bulk/Detail Store bins/stacks stores, posts the bin card and returns receipted RN&DOR evidence. Dues-out stores wait for released further-part vouchers and then enter the Issue packing stream.
8. RV1 is posted and filed in CAB. Receipted RV2 returns through Receipts Progress, Provision and R&PS/CRS to the consignor.
9. Discrepancies use a separate report/adjustment trail through the Sub-Depot discrepancy section and DAO; they are not silently merged into normal stock.

Verified Receipt exceptions:

- CRV means Certificate Receipt Voucher (RAOS Part II abbreviations, PDF page 4). Its playable lifecycle models stores received without a voucher, three-copy control, account posting, regular-voucher hastening/linking, destruction or CTC conversion, and the six-month BAOC/Army HQ escalation. DGOSTI-001 Appendix D paras 3, 5(c), 7 and Appendix Q para 5, PDF pages 25–30 and 57–58.
- CTC: the playable lifecycle is specifically the missing-receipt-voucher-copy case. It models conversion of RV2 to RV1, two CTC copies, the retained trap copy, receipt control, normal clearance, consignor return and destruction on linking. It does not conflate the separate missing-convoy-note-copy case. DGOSTI-001 Appendix D paras 3(b), 5(b), 7; Appendix G para 2; Appendix Q para 5, PDF pages 26, 28–30, 39 and 57–58.

All 53 roster entities now have playable routes. The Issue source map records the source-qualified IV2/IV5 ruling and the IRPS-equivalent clarification. The isolated DGOSTI-002 para 213(n) wording remains disclosed beside every affected route and is guarded by automated tests.

## Full-operation campaign model

The full campaigns are operational-stage simulations, not a claim that one document travels through every displayed office.

- Issue follows the authorised demand through control and execution, then separately exercises the concurrent IV3/IV4 accounts branch, IV5 packing-progress/LAO branch, physical consignment and returned-IV2 branch, and IV6 time-check/unit-pad branch.
- Receipt separately exercises the advance-RV1 watch, transit/DRS and physical-consignment stream, RV1/RV2/DRS2 marriage and RCRS control, normal-stock and dues-out RN&DOR branches, CAB posting, and the returned-RV2/DRS3 records closure.
- A transition between simultaneous branches is stored and displayed as a `focus-switch`. It is not treated as document custody and is never described as an office-to-office hand-off.

The corrected Receipt character routes also preserve:

- RV1's advance route through Consignor, Central Registry, Provision and Receipts Progress before the stores documents are married.
- RV2's physical route beginning when Receipts Area extracts it from Package No. 1; DRS1–3 begin at Traffic Receipts; RCRS1–3 begin at Receipt Control; and RN&DOR begins at Receipt Liaison only after RV1 returns from MLRS/DOC and any conditional FPV extraction.
- Receipt Liaison's courier role between Receipts Progress, Receipt Control and Receipts Area for RV2 and DRS2.
- The dues-out RN&DOR's two simultaneous branches: one copy goes from Liaison to FPV Release while the distribution copies go directly from Liaison to Receipts Area. The game changes focus between those copies and does not claim that FPV Release hands RN&DOR to Receipts Area.
- The discrepancy report's return from DAO to the Sub-Depot discrepancy section for stores clearance before the completed case returns through DAO to the consignor.

## Office-entry situation gates

Normal questions remain the default path. At offices where the supplied primary procedure establishes a complete playable exception, the learner may deliberately switch to that full lifecycle:

- Receipt Area offers the Discrepancy Report route from DGOSTI-001 Appendices N–P and the stores-without-vouchers CRV route from Appendix D and Appendix Q.
- Receipts Progress offers the missing-RV1/available-RV2 CTC route from Appendix D, Appendix G and Appendix Q.

Each contingency begins at the office where it is offered and replaces the current exercise with the already validated character route. The selector does not splice an exception into an unrelated document route or create a shortcut back to normal receipt.

## Enforcement

`npm test` rejects duplicate IDs, unknown/unreachable offices, missing routes or endings, undeclared transitions, uncited approved transitions, incomplete campaign stages, unlabelled concurrent-branch switches, and guessed routes on locked characters.
