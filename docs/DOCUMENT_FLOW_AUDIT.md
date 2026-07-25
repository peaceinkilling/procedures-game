# DGOSTI document-flow audit

Audit date: 25 July 2026

Primary texts checked:

- DGOSTI-002, Issue Procedure Normal
- DGOSTI-001, Receipt Procedure
- RAOS Part II where DGOSTI cross-reference or internal wording required corroboration

## Result

All 53 Hangar entities have a declared source-backed lifecycle, transition set, closure proof and final disposition. Automated validation rejects unknown offices, missing transitions, duplicate IDs, missing end states and unsupported transitions.

One source conflict remains disclosed rather than silently “fixed”: DGOSTI-002 paragraph 213(n) names No.5 as the receipted consignee-return copy, while RAOS Part II paragraph 190, DGOSTI-002 broad principles and the supplied training material converge on No.2. The game continues to teach No.2 as the acknowledgement copy and No.5 as the Packing-progress/LAO copy, with the conflict displayed on all affected characters.

One game-flow correction was required during this audit: RV No.1 must not visit Further Part Voucher Release when no dues-out quantity exists. The engine now chooses separate DGOSTI-backed RV1 routes:

- no dues-out: DOC → Receipt Liaison;
- dues-out: DOC → FPV Release → Receipt Liaison.

The full Receipt operation deliberately exercises both normal-stock and dues-out branches, and labels changes of operational focus so they are not mistaken for custody hand-offs.

## Issue document families

| Family | Entities covered | Verified flow basis |
|---|---|---|
| Demand and progress control | Demand, IRPS Original, IRPS Duplicate, Schedule of Indents, IRPS control-medium equivalent | DGOSTI-002 paras 20–29, 50–70, 210–214 and Appendix A |
| Issue Voucher copies | IV1–IV6 | DGOSTI-002 paras 91–177, 194–205, 210–224; RAOS II para 190 |
| Packing records | Packing Note originals/duplicate, Packing Completion originals/duplicate | DGOSTI-002 paras 141–164 |
| Traffic and transit | Road, rail, post, local issue, RR, PWB, Convoy Note, collection record, three traffic registers | DGOSTI-002 paras 163–192 and Appendix B |
| Physical/accounting states | Stores, packages, Package No.1 with IV2, account card, bin card, returned acknowledgement, unit pad | DGOSTI-002 paras 121–162, 194–224 |

## Receipt document families

| Family | Entities covered | Verified flow basis |
|---|---|---|
| Advance and Receipt Vouchers | Advance Issue Voucher, RV1, RV2, receipted RV2 | DGOSTI-001 Appendices A–B, D–Q |
| Daily Receipt Sheets | DRS1, DRS2, DRS3 | DGOSTI-001 Appendices C–D and Annexures 9–10 |
| Receipt control | RCRS1, RCRS2, RCRS3 | DGOSTI-001 Appendix G and Annexure 12 |
| Distribution and stores | Bulk RN&DOR, dues-out RN&DOR, bulk stores, dues-out stores, receipt bin card | DGOSTI-001 Appendices F, J–M |
| Accounts and discrepancy | Receipt posting, Discrepancy Report, Adjustment Voucher | DGOSTI-001 Appendices N–P and Annexure 13 |
| Missing-document exceptions | CRV and CTC lifecycles | DGOSTI-001 Appendices E, G, O and Q |

## Exact register twins now represented

- IRPS: all 11 printed columns from DGOSTI-002 Appendix A.
- Traffic Register of Issues: all six printed columns from DGOSTI-002 Appendix B.
- Traffic DRS Register: all four printed columns from DGOSTI-001 Annexure 9.
- Sub Depot / Group DRS Register: all five printed columns from DGOSTI-001 Annexure 10.
- RCRS: all nine printed columns from DGOSTI-001 Annexure 12, including the three sub-actions printed within column 7 and the distinct posting date in column 8.

The simulator highlights a column only where the cited office action supports it. It uses “UPDATE NOW” and “ENTERED” states rather than invented example dates or document numbers.

