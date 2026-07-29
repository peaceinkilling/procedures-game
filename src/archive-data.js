(function attachVerifiedArchiveData(root){
  'use strict';
  const cite=(source,reference,pages)=>({source,reference,pages});
  const issue=(reference,pages)=>cite('DGOSTI-002 — Issue Procedure Normal',reference,pages);
  const receipt=(reference,pages)=>cite('DGOSTI-001 — Receipts Procedure Normal',reference,pages);
  const raos=(reference,pages)=>cite('RAOS Part II (Revised Edition 1986)',reference,pages);
  const action=(text,evidence)=>({text,evidence});
  const office=(officialName,classification,sequence,role,actions,boundary,source)=>({officialName,classification,sequence,role,actions,boundary,source});
  const flow=(officeId,label,text,evidence,status='verified')=>({officeId,label,text,evidence,status});
  const field=(name,text,evidence,side='front')=>({name,text,evidence,side});
  const document=(id,title,form,origin,purpose,contents,flowchart,disposal,sources,notes=[])=>({id,title,form,origin,purpose,contents,flowchart,disposal,sources,notes});

  const offices={
    Issue:{
      DemandingUnit:office('Demanding unit / indenter','External originator and consignee','Before DGOSTI Section II','Originates the demand. It is not a depot section named by DGOSTI-002.',[
        action('Sends the indent/demand, accompanying Schedule of Indents and supporting documents to the depot.',issue('paras 20–23, 51–56','PDF pp.9, 15–16')),
        action('Receives issue advice/stores through the applicable Traffic mode.',issue('paras 165–190','PDF pp.41–46'))
      ],'Do not describe the demanding unit as an internal depot branch.',issue('paras 20–23; 165–190','PDF pp.9, 41–46')),
      HQ:office('Headquarters Section','DGOSTI Section II','1','Depot entry point for demanding documents.',[
        action('Marks each indent, demand, issue order and covering document with time and date of receipt.',issue('para 20','PDF p.9')),
        action('Places normal issue documents, Schedule of Indents and covering documents in the ISS box; IIS documents go to the IIS box.',issue('paras 21–23','PDF p.9'))
      ],'HQ does not register these demands in HQ/CR and does not send them directly to Selection.',issue('paras 20–23','PDF p.9')),
      ISS:office('Indent Sorting Section','DGOSTI Section III; part of Indent Checking Section, Control Branch','2','Sorts demands and creates the two-copy IRPS control trail.',[
        action('Sorts demands Sub-Depot-wise and into static and non-static unit folders.',issue('paras 25–27','PDF p.10')),
        action('Prepares IRPS in duplicate Sub-Depot-wise, completes columns 1–4 and gives each indent an IRPS serial number.',issue('para 28','PDF p.10')),
        action('Routes non-static demands through ULC; sends static demands onward without that detour.',issue('para 29','PDF pp.10–11'))
      ],'“ISS” means Indent Sorting Section here, not a generic issue-services office.',issue('paras 25–29','PDF pp.10–11')),
      ULC:office('Unit Location Cell','DGOSTI Section IV; Control Branch','3 — conditional','Verifies location for non-static units.',[
        action('Checks and, where necessary, amends location and nearest railway station on non-static-unit indents.',issue('para 41','PDF p.13')),
        action('Returns the indent stamped “Location Confirmed” or “Not in area of supply” to Indent Checking Section.',issue('para 41','PDF p.13')),
        action('Checks non-static further-part vouchers and stamps No.6 copy with location confirmation and checker initials/date.',issue('para 42','PDF p.13'))
      ],'Static-unit demands do not pass through ULC. ULC does not allot control numbers.',issue('paras 40–45','PDF pp.13–14')),
      IndentChecking:office('Indent Checking Section','DGOSTI Section V','4','Checks admissibility and correctness before control.',[
        action('Checks authority, designation/part number, catalogue section, scale, demand classification, location evidence and supporting documents.',issue('paras 50–52','PDF pp.15–16')),
        action('Ticks the corresponding Schedule of Indents entry, initials/dates/stamps the demand and passes demand, schedule and IRPS to Control Registry.',issue('para 56','PDF p.16')),
        action('Records return or redirection on the IRPS rather than allowing the demand to continue.',issue('para 57','PDF p.16'))
      ],'This section checks; it does not type the Issue Voucher or select stores.',issue('paras 50–57','PDF pp.15–16')),
      ICR:office('Control Registry','DGOSTI Section VII','5','Allots issue control numbers and separates the two IRPS copies.',[
        action('Checks the demands, Schedule of Indents and both IRPS copies.',issue('para 67','PDF p.19')),
        action('Allots control numbers and completes IRPS columns 5–7.',issue('para 68','PDF p.19')),
        action('Sends original IRPS to CRS/R&PS and duplicate IRPS with controlled demands to Voucher Preparation Section.',issue('para 69','PDF p.19')),
        action('Completes control numbers on the Schedule of Indents and sends completed schedules to Central Registry.',issue('paras 70–71','PDF pp.19–20'))
      ],'The official heading is “Control Registry,” not “Issue Control Registry.”',issue('paras 66–74','PDF pp.19–20')),
      CentralRegistry:office('Central Registry','Supporting registry hand-off','After Control Registry','Dispatches completed Schedules of Indents to indenting units.',[
        action('Receives the completed schedules at the end of the day and dispatches them to the indenting unit.',issue('para 70','PDF pp.19–20'))
      ],'DGOSTI-002 does not make this a numbered Issue Procedure section; it is a cited onward registry action.',issue('para 70','PDF pp.19–20')),
      VoucherPrep:office('Voucher Preparation Section','DGOSTI Section VIII','6','Prepares and checks the Issue Voucher set from the controlled demand.',[
        action('Checks controlled indents against the duplicate IRPS and watches voucher preparation through that IRPS.',issue('paras 77–79','PDF p.21')),
        action('Types the prescribed voucher copies, consignee/location details, depot-receipt date and applicable symbols.',issue('paras 80–84','PDF pp.21–22')),
        action('Checker verifies every copy, initials/dates it and places the Issue Time Check stamp on the reverse of No.6.',issue('paras 85–87','PDF p.22')),
        action('Passes vouchers with duplicate IRPS to SDIC and demands to CRS/R&PS.',issue('paras 88–89','PDF p.23'))
      ],'The source prescribes IAFO-2672 and copy order 1,4,3,2,5,6; the Archive does not invent uncited boxes.',issue('paras 77–89','PDF pp.21–23')),
      SDIC:office('Sub Depot Issue Control','DGOSTI Section IX','7 and 13','Actively progresses each Sub-Depot issue using the duplicate IRPS.',[
        action('Stage I checks vouchers against duplicate IRPS, records receipt/movement and sends them to Dues Out Control.',issue('paras 91–92','PDF pp.24–25')),
        action('Receives No.3 and No.4 after selection, records selection date in IRPS column 8 and sends them to Central Account Branch.',issue('para 95','PDF p.26')),
        action('Receives No.5 after packing, records packing date in IRPS column 9 and sends No.5 to CRS/R&PS.',issue('para 96','PDF p.26'))
      ],'SDIC is a two-stage progress office; it does not itself select, pack or post stores.',issue('paras 91–96','PDF pp.24–26')),
      DOC:office('Dues Out Control','DGOSTI Section X','8','Reviews Part I Issue Vouchers against Dues Out Cards.',[
        action('Receives Part I vouchers under cover of duplicate IRPS and vets each item against Dues Out Cards.',issue('paras 100–103','PDF p.28')),
        action('Routes no-dues-out vouchers to MLRS; applies the prescribed NA/partial-NA action where dues out exists.',issue('paras 103–104','PDF pp.28–29')),
        action('Stamps the reverse of No.6 “DOC” as evidence of review.',issue('para 105','PDF p.29'))
      ],'DOC determines the dues-out position; it does not determine the physical shed location.',issue('paras 100–105','PDF pp.28–29')),
      MLRS:office('Master Location Record Section','DGOSTI Section XII','9','Marks the authorised store location before Selection.',[
        action('Checks the voucher/IRPS set and verifies the DOC stamp on No.6.',issue('para 114','PDF p.31')),
        action('Marks shed/area location against every item on No.4 in the Package No. column.',issue('para 115','PDF p.31')),
        action('Sends vouchers to the shed/area in a Selection Jacket and returns duplicate IRPS to SDIC.',issue('para 116','PDF p.31'))
      ],'MLRS is singular “Record” in the official Issue heading.',issue('paras 114–116','PDF p.31')),
      Selection:office('Selection of Stores','DGOSTI Section XIII','10','Selects stores, completes selection evidence and splits voucher copies.',[
        action('Chief Selector receives and distributes vouchers in the Selection Jacket.',issue('paras 120–121','PDF p.32')),
        action('Selector records quantities issued/to follow, selection status and date on the prescribed copies.',issue('para 128(a)–(e)','PDF p.33')),
        action('Sends stores with Nos.1,2,5,6 to Packing; obtains Packing receipt on reverse of No.4; sends Nos.3,4 through the SDIC route.',issue('para 128(f); para 95','PDF pp.33, 26')),
        action('Posts the relevant Bin Card.',issue('paras 129–131','PDF p.33'))
      ],'Selection does not send all six copies with the stores.',issue('paras 120–137','PDF pp.32–35')),
      Packing:office('Packing Section','DGOSTI Section XIV','11','Checks, packs, documents and hands packages to Traffic.',[
        action('Receives stores with Nos.1,2,5,6 and acknowledges on reverse of No.4.',issue('para 141','PDF p.36')),
        action('Checks actual designation/quantity, packs safely and places No.2 in Package No.1.',issue('paras 142–147','PDF p.36')),
        action('Prepares IAFZ-3031 Packing Note in duplicate for each package; original goes in/on that package and duplicate stays in bound record.',issue('para 148; para 153','PDF pp.36–37')),
        action('Endorses Packing Note serials on reverse of Nos.1,5,6, sends No.5 to SDIC and prepares Packing Completion Advice in duplicate.',issue('paras 151–155','PDF pp.37–38')),
        action('Hands packages and No.6 to Traffic against the retained Packing Completion Advice.',issue('para 156','PDF p.38'))
      ],'Packing does not send No.5 to the consignee.',issue('paras 141–156','PDF pp.36–38')),
      Traffic:office('Traffic Branch Issue Section','DGOSTI Section XV','12','Collects packages, controls despatch and prepares the mode-specific transit trail.',[
        action('Receives No.1 with original Packing Completion Advice; collects packages and No.6; records custody time/location.',issue('paras 157–161','PDF pp.39–40')),
        action('Maintains the Traffic Register of Issues and arranges rail, postal or local despatch as applicable.',issue('paras 162–164','PDF p.40')),
        action('Completes despatch details and sends No.6 to CRS/R&PS.',issue('paras 165–177','PDF pp.41–43'))
      ],'The official organisation contains Traffic Office Issue Section, Rail Transit Shed, Economy Packing and Postal Issue Section, and Local Issues Section. There is no single universal “road transit form.”',issue('paras 157–190','PDF pp.39–46')),
      CAB:office('Central Account Branch','DGOSTI Section XVI','14','Posts issues from No.4 and schedules No.3 to LAO.',[
        action('Receives No.4 through SDIC with a guard sheet and records receipt in the Account Register of Issues.',issue('paras 194–196','PDF p.48')),
        action('Posts the issue, enters account reference, initials/date and obtains checker initials/date.',issue('paras 197–199','PDF pp.48–49')),
        action('Files No.4 and schedules No.3 to LAO on skeleton/supplementary skeleton lists.',issue('paras 199–205','PDF pp.49–50'))
      ],'The Issue instruction’s official heading is singular “Central Account Branch.”',issue('paras 194–205','PDF pp.48–50')),
      RPS:office('Central Records Section / Records and Progress Section','DGOSTI Section XVII','15','Maintains unit pads and progresses outstanding issue evidence.',[
        action('Maintains Unit Pad Registry and Progress/Hastening subsection.',issue('paras 210–212','PDF p.51')),
        action('Receives original IRPS, indents, No.5 and No.6 at their prescribed stages and links them.',issue('para 213(a)–(g)','PDF pp.51–52')),
        action('Sends No.6 to S&M for time-check compilation, receives it back and files it with the demand in the unit pad.',issue('para 213(f)–(k)','PDF pp.51–52')),
        action('Actively hastens outstanding documents and queries using IRPS and unit pads.',issue('para 214','PDF p.53'))
      ],'DGOSTI-002 para 213(n) names No.5 as the returned receipted copy, conflicting with para 16 and RAOS para 190. The Archive flags this conflict and does not silently resolve it.',issue('paras 16, 210–214','PDF pp.8, 51–53')),
      SM:office('S&M Branch','Supporting time-check branch; DGOSTI Section XVIII','After No.6 reaches CRS/R&PS','Compiles Issue Time Check from No.6.',[
        action('Receives No.6 from CRS/R&PS, calculates Control/Sub-Depot/Traffic time, records it and returns No.6 for unit-pad filing.',issue('paras 219–224','PDF pp.54–55'))
      ],'S&M does not retain No.6 as its final file.',issue('paras 219–224','PDF pp.54–55')),
      LAO:office('Local Audit Officer','External audit destination','After Accounts / CRS-R&PS scheduling','Receives scheduled voucher copies under the cited skeleton-list process.',[
        action('Receives No.3 from Central Account Branch and No.5 from CRS/R&PS on the prescribed schedules.',issue('paras 204 and 213(j)','PDF pp.50, 52'))
      ],'LAO is not a depot section in DGOSTI-002.',issue('paras 204, 213(j)','PDF pp.50, 52'))
    },
    Receipt:{
      Consignor:office('Consignor','External originator','Before Appendix A','Sends transit/issue documents and later receives receipt or discrepancy evidence.',[
        action('Originates the advance issue document and the copies accompanying stores.',receipt('broad principles para 2(a)–(d)','PDF pp.7–8')),
        action('Receives cleared RV No.2/CTC or the original Discrepancy Report with RV No.2.',receipt('Appendix Q para 5; Appendix P para 4','PDF pp.57, 54'))
      ],'The consignor is not a receiving-depot branch.',receipt('broad principles para 2; Appendices P–Q','PDF pp.7–10, 54–58')),
      CentralRegistry:office('Central Registry','DGOSTI Appendix A','1','Date-stamps and separates transit papers from advance issue documents.',[
        action('Sends RR/PWB and Convoy Notes to Traffic Branch (Receipts) on a forwarding book.',receipt('Appendix A para 2(a)','PDF p.11')),
        action('Sends advance/post copies of issue documents to Provision Branch.',receipt('Appendix A para 2(b)','PDF p.11'))
      ],'Transit papers and advance issue documents do not travel together after this split.',receipt('Appendix A','PDF p.11')),
      Provision:office('Provision Branch','DGOSTI Appendix B','2','Maintains the dues-in watch and later clears it from RV No.2.',[
        action('Posts dues in pencil from applicable advance copies; stamps reverse “Dues In Posted”; sends them to Receipts Progress.',receipt('Appendix B paras 1–2','PDF p.12')),
        action('Receives RV No.2 after checking/RN&DOR preparation, inks the dues-in entry and sends RV No.2 to CRS/R&PS.',receipt('Appendix B paras 3–5','PDF pp.12–13'))
      ],'Provision does not receive the physical consignment or post the stock ledger.',receipt('Appendix B','PDF pp.12–13')),
      TrafficReceipts:office('Traffic Branch (Receipts)','DGOSTI Appendix C','3','Registers transit papers, receives consignments and prepares DRS.',[
        action('Registers and links transit documents and takes over rail, road or postal consignments.',receipt('Appendix C paras 1–7','PDF pp.14–20')),
        action('Prepares a separate DRS for each consignment/Sub-Depot grouping and enters only the prescribed consignment data.',receipt('Appendix C para 8','PDF pp.20–22')),
        action('Delivers stores with DRS copies, retains receipted DRS No.1 and hands DRS No.3 to Receipts Progress.',receipt('Appendix C para 9','PDF pp.22–23'))
      ],'Traffic checks package number/condition; item-by-item store checking belongs to Receipts Area.',receipt('Appendix C','PDF pp.14–24')),
      ReceiptProgress:office('Sub Depot/Group Receipts Progress Section','DGOSTI Appendix D','4','Links advance and stores documents and progresses clearance.',[
        action('Holds advance RV No.1 consignor-wise and watches linkage with the stores copy.',receipt('Appendix D paras 1–3','PDF pp.25–27')),
        action('Receives DRS No.3 and maintains the Sub-Depot/Group DRS Register.',receipt('Appendix D para 4','PDF p.27')),
        action('Marries RV No.2 with advance RV No.1 and sends RV1/RV2/DRS2 through Receipt Control via the Liaison Clerk.',receipt('Appendix D para 5','PDF pp.27–28')),
        action('After checking/RN&DOR clearance, sends RV1 to Accounts, RV2 to Provision and DRS3 to CRS/R&PS.',receipt('Appendix D para 7','PDF pp.29–30'))
      ],'The official name includes “Sub Depot/Group.” This section is not the same as CRS/R&PS.',receipt('Appendix D','PDF pp.25–30')),
      ReceiptArea:office('Sub Depot/Group Receipts Area','DGOSTI Appendix E','5','Receives packages, extracts voucher copy, checks stores and distributes them.',[
        action('Receives packages with DRS copies, receipts Nos.1 and 3 and holds No.2 pending checking.',receipt('Appendix E paras 1–3','PDF p.31')),
        action('Extracts RV No.2 from Package No.1; uses CTC/CRV procedure if prescribed copies are missing.',receipt('Appendix E paras 4–6','PDF pp.31–32')),
        action('Checks designation, quantity and condition against the receipt voucher.',receipt('Appendix E paras 7–9','PDF pp.32–34')),
        action('Distributes stores to Dues Out Suspense, Bulk or Detail against RN&DOR slips.',receipt('Appendix E paras 10–11','PDF pp.34–35'))
      ],'Discrepant stores are not merged into the normal route; Appendix E para 12 sends their documents to the Discrepancy Section.',receipt('Appendix E','PDF pp.31–35')),
      ReceiptLiaison:office('Receipts Liaison Section','DGOSTI Appendix F','6 — liaison across stages','Carries documents between receipt offices and prepares RN&DOR slips.',[
        action('Takes RV No.2 with DRS No.2 to Receipts Progress for marriage with RV No.1, then to Receipt Control for control.',receipt('Appendix F para 2','PDF p.36')),
        action('Sends RV No.1 to Master Location Records and DOC after store checking.',receipt('Appendix F para 3','PDF p.36')),
        action('Prepares, checks and distributes RN&DOR slips in the exact copy count required by destination(s).',receipt('Appendix F paras 4–5','PDF pp.36–37')),
        action('Progresses receipted RN&DOR copies and clears RV1/RV2/DRS2 to Receipts Progress.',receipt('Appendix F paras 6–7','PDF pp.37–38'))
      ],'The official heading is plural “Receipts Liaison Section.”',receipt('Appendix F','PDF pp.36–38')),
      ReceiptControl:office('Receipts Control Registry','DGOSTI Appendix G','7','Allots receipt control numbers and creates the triplicate RCRS watch.',[
        action('Receives DRS No.2 with RV Nos.1 and 2, or three CRV copies.',receipt('Appendix G para 1','PDF p.39')),
        action('Allots control number, marks RVs and DRS, and completes RCRS columns 1–6.',receipt('Appendix G para 2','PDF p.39')),
        action('Sends RCRS No.1 to Receipts Progress, No.2 to R&PS/CRS and No.3 to Central Accounts Branch.',receipt('Appendix G para 3','PDF pp.39–40'))
      ],'The official name is plural “Receipts Control Registry.”',receipt('Appendix G','PDF pp.39–40')),
      MLRS:office('Master Location Records Section','DGOSTI Appendix H','8','Checks identity and records intended binning location on RV No.1.',[
        action('Checks section, catalogue/part number and designation against the location record.',receipt('Appendix H para 1','PDF p.41')),
        action('Marks shed/area location on RV No.1 and creates/updates location records only under the prescribed cases.',receipt('Appendix H paras 1–7','PDF pp.41–43')),
        action('Sends RV No.1 to Dues Out Control.',receipt('Appendix H para 8','PDF p.43'))
      ],'Receipt uses the official plural “Records.”',receipt('Appendix H','PDF pp.41–43')),
      DOC:office('Dues Out Review Cell (DOC)','DGOSTI Appendix J','9','Reviews RV No.1/CRV against Dues Out Cards.',[
        action('Marks quantities required for dues-out release, prefixed “DOC,” on RV No.1.',receipt('Appendix J para 2','PDF p.44')),
        action('Sends dues-out cases to FPV Release; stamps and returns no-dues-out cases to Liaison.',receipt('Appendix J para 3','PDF p.44'))
      ],'This is specifically the Receipt-side Dues Out Review Cell.',receipt('Appendix J','PDF p.44')),
      FPVRelease:office('Further Part Voucher Release Cell (DOC)','DGOSTI Appendix K','10 — conditional','Extracts and releases further-part vouchers for recorded dues out.',[
        action('Extracts relevant further-part vouchers up to the quantity marked on RV No.1 and holds them pending RN&DOR.',receipt('Appendix K para 2','PDF p.45')),
        action('On RN&DOR receipt, records FPV serials/date, sends FPVs to Dues Out Suspense and retains acknowledged evidence.',receipt('Appendix K paras 3–4','PDF p.45'))
      ],'RV No.1 itself returns to Liaison; the extracted further-part vouchers move to suspense.',receipt('Appendix K','PDF p.45')),
      DuesOutSuspense:office('Dues Out Suspense Area','DGOSTI Appendix L','11 — conditional','Temporarily holds dues-out stores and releases them against further-part vouchers.',[
        action('Checks stores against RN&DOR, records temporary location and waits for further-part vouchers.',receipt('Appendix L paras 1–4','PDF p.46')),
        action('Selects/records issued quantity on FPVs; sends stores with Nos.1,2,5,6 to Packing and Nos.3,4 to SDIC.',receipt('Appendix L paras 5–6','PDF p.46')),
        action('Returns signed RN&DOR to Receipts Liaison.',receipt('Appendix L para 7','PDF p.46'))
      ],'This is not normal bulk stock; it is a controlled temporary holding area.',receipt('Appendix L','PDF p.46')),
      BulkStore:office('Bulk/Detail Store House / Area','DGOSTI Appendix M','11 — normal stock branch','Bins/stacks cleared stores and posts Bin Cards.',[
        action('Checks the stores against RN&DOR and the identification label, then records detail location.',receipt('Appendix M para 2(a)–(f)','PDF pp.47–48')),
        action('Posts received quantity on Bin Card, records Bin Card serial on RN&DOR and returns signed RN&DOR to Liaison.',receipt('Appendix M para 2(g)','PDF p.48'))
      ],'The official heading is Bulk/Detail Store House; the text also uses Shed/Area.',receipt('Appendix M','PDF pp.47–48')),
      ReceiptDiscrepancy:office('Sub Depot/Group Receipts Office Discrepancy Section','DGOSTI Appendix N','Exception branch','Prepares and controls the documents for receipt discrepancies.',[
        action('Receives DRS2 and RV documents after discrepancy details are noted on RV2 and stamps the documents.',receipt('Appendix N para 2(a)–(c)','PDF p.49')),
        action('Prepares IAFZ-3045 Discrepancy Report in duplicate and IAFO-2715 adjustment documents in quadruplicate.',receipt('Appendix N para 2(d)','PDF p.49')),
        action('Obtains DR and adjustment control numbers from DAO, returns documents for store clearance and later forwards the case to DAO.',receipt('Appendix N paras 2–4','PDF pp.49–50'))
      ],'Do not shorten this official name to a generic “Receipt Discrepancy” in the Archive.',receipt('Appendix N','PDF pp.49–50')),
      CAB:office('Central Accounts Branch','DGOSTI Appendix O','12','Posts RV No.1/CRV and uses RCRS No.3 as an active watch.',[
        action('Receives RCRS No.3 and RV No.1/CRV under guard sheet.',receipt('Appendix O paras 1–2','PDF p.51')),
        action('Posts the receipt, records account reference/date and obtains poster/checker initials.',receipt('Appendix O paras 3–5','PDF pp.51–52')),
        action('Files the voucher and actively progresses lagging RV No.1 using RCRS.',receipt('Appendix O paras 5–8','PDF pp.52–53'))
      ],'Posting date belongs in RCRS column 8; column 7 contains earlier movement milestones.',receipt('Appendix O paras 2–5; Annexure 12','PDF pp.51–52, 67')),
      DAO:office('Depot Accounts Officer — Central Discrepancy Section','DGOSTI Appendix P','Exception control','Controls, progresses and settles receipt discrepancies.',[
        action('Scrutinises the DR/adjustment set and allots DR and adjustment control numbers.',receipt('Appendix P paras 1–3','PDF p.54')),
        action('After store disposal, sends original DR with RV No.2 to consignor and schedules adjustment evidence.',receipt('Appendix P para 4','PDF pp.54–55')),
        action('Progresses admission, loss statement or carrier claim to final settlement.',receipt('Appendix P paras 5–6','PDF p.55'))
      ],'The official Appendix P heading is not merely “DAO Discrepancy.”',receipt('Appendix P','PDF pp.54–55')),
      RPS:office('Records and Progress Section / Central Record Section','DGOSTI Appendix Q','13','Progresses receipt clearance and returns receipted evidence to consignors.',[
        action('Uses DRS No.3 and RCRS No.2 to progress Sub-Depot/Group clearance.',receipt('Appendix Q paras 1–4','PDF pp.56–57')),
        action('Receives RV No.2/CTC from Provision, completes the applicable RCRS column-7 milestone and sends it to the consignor/registry route.',receipt('Appendix Q para 5','PDF p.57')),
        action('Controls CRV/CTC linking and destruction only when the prescribed linkage/authority exists.',receipt('Appendix Q para 5; Appendix D paras 3–5','PDF pp.57–58, 25–29'))
      ],'This is distinct from the Sub-Depot/Group Receipts Progress Section.',receipt('Appendix Q','PDF pp.56–58')),
      Packing:office('Packing Section — Issue Procedure hand-off','External to DGOSTI-001 Receipt appendices','After dues-out release only','Receives released dues-out stores under the Issue Procedure.',[
        action('Receives stores with further-part voucher copies Nos.1,2,5,6; receipt is recorded on reverse of No.4.',receipt('Appendix L para 6','PDF p.46'))
      ],'Packing is not one of the Receipt Procedure appendices; it is the hand-off into the Issue Procedure.',receipt('Appendix L para 6','PDF p.46'))
    }
  };

  const commonIvContents=[
    field('Source form','IAFO-2672; large/medium/small versions hold a maximum of 12/6/1 items.',issue('paras 80–81','PDF p.21')),
    field('Consignee and station','Complete consignee address, exact location, full postal address and nearest railway station.',issue('para 83(a)–(b)','PDF p.22')),
    field('Control and demand markings','Control number plus applicable WET/A-in-U and static-unit “S” markings; depot receipt date.',issue('paras 82–84','PDF pp.21–22')),
    field('Preparation check','Typist initials/date and checker initials/date on every copy.',issue('paras 84–86','PDF p.22'))
  ];
  const issueVoucherFlow=(id,afterSelection)=>[
    flow('VoucherPrep','Voucher Preparation Section','Prepares and checks the copy from the controlled demand.',issue('paras 77–89','PDF pp.21–23')),
    flow('SDIC','Sub Depot Issue Control','Receives the voucher set under duplicate IRPS and passes it to DOC.',issue('paras 91–92','PDF p.24')),
    flow('DOC','Dues Out Control','Reviews the Part I voucher; No.6 receives DOC evidence.',issue('paras 101–105','PDF pp.28–29')),
    flow('MLRS','Master Location Record Section','Marks the selection location on No.4 and sends the set in a Selection Jacket.',issue('paras 114–116','PDF p.31')),
    flow('Selection','Selection of Stores','Records selection and splits the copies.',issue('para 128','PDF p.33')),
    ...afterSelection
  ];
  const issueDocuments=[
    document('demand','Indent / demanding document','Source form varies with the authorised demand. DGOSTI-002 does not reproduce one universal blank form.','Demanding unit or competent originating authority; exact form-dependent creator is not specified in DGOSTI-002.','Carries the authorised requirement into depot control.',[
      field('Receipt evidence','HQ time/date stamp.',issue('para 20','PDF p.9')),
      field('Location evidence','“Location Confirmed” or “Not in area of supply” for applicable non-static demands.',issue('para 41','PDF p.13')),
      field('Checking evidence','Section initials/date/stamp; redirection/return is recorded on IRPS.',issue('paras 52–57','PDF pp.15–16')),
      field('Control evidence','Allotted depot control number.',issue('paras 67–70','PDF pp.19–20'))
    ],[
      flow('DemandingUnit','Demanding unit','Sends demand, schedule and supporting documents. The source does not prescribe a universal demand layout here.',issue('paras 20–22, 51–56','PDF pp.9, 15–16')),
      flow('HQ','Headquarters Section','Time/date stamps and routes to ISS.',issue('paras 20–23','PDF p.9')),
      flow('ISS','Indent Sorting Section','Sorts, gives IRPS serial and separates static/non-static route.',issue('paras 25–29','PDF pp.10–11')),
      flow('ULC','Unit Location Cell','Conditional: verifies non-static-unit location.',issue('para 41','PDF p.13'),'conditional'),
      flow('IndentChecking','Indent Checking Section','Checks admissibility and completeness.',issue('paras 50–57','PDF pp.15–16')),
      flow('ICR','Control Registry','Allots control number.',issue('paras 66–70','PDF pp.19–20')),
      flow('VoucherPrep','Voucher Preparation Section','Uses the demand to prepare vouchers; sends the demand to CRS/R&PS.',issue('paras 77–89','PDF pp.21–23')),
      flow('RPS','CRS/R&PS','Files the demand in the unit pad and progresses completion.',issue('paras 210–214','PDF pp.51–53'))
    ],'Filed in the relevant unit pad by CRS/R&PS.',[issue('paras 20–89, 210–214','PDF pp.9–23, 51–53')]),
    document('irpsOriginal','Issue Registration and Progress Sheet — original','DGOSTI-002 Appendix A; prepared in duplicate.','Indent Sorting Section prepares both copies.','Central progress copy held by CRS/R&PS.',[
      field('Columns 1–4','Completed by Indent Sorting Section when the IRPS is prepared.',issue('para 28; Appendix A','PDF pp.10, 56')),
      field('Columns 5–7','Control Registry enters catalogue section/control number/date.',issue('para 68; Appendix A','PDF pp.19, 56')),
      field('Progress entries','CRS/R&PS records receipt of No.5, No.6, the receipted-copy milestone stated by the source, cancellations and remarks.',issue('para 213; Appendix A','PDF pp.51–52, 56'))
    ],[
      flow('ISS','Indent Sorting Section','Creates duplicate set and completes columns 1–4.',issue('para 28','PDF p.10')),
      flow('ICR','Control Registry','Completes columns 5–7 and sends original to CRS/R&PS.',issue('paras 68–69','PDF p.19')),
      flow('RPS','CRS/R&PS','Files and updates the original as progress evidence arrives.',issue('paras 210–214','PDF pp.51–53'))
    ],'Filed by Sub-Depot/Group and control-number series in CRS/R&PS.',[issue('para 28; paras 66–70; paras 210–214; Appendix A','PDF pp.10, 19–20, 51–56')]),
    document('irpsDuplicate','Issue Registration and Progress Sheet — duplicate','DGOSTI-002 Appendix A; prepared in duplicate.','Indent Sorting Section prepares both copies.','Sub-Depot execution and progress copy.',[
      field('Columns 1–4','Completed by Indent Sorting Section.',issue('para 28','PDF p.10')),
      field('Columns 5–7','Completed by Control Registry.',issue('para 68','PDF p.19')),
      field('Movement stamp','SDIC records SDIC→DOC, DOC→MLRS and MLRS→SDIC dates/times on reverse.',issue('para 92(a)','PDF p.24')),
      field('Selection and packing milestones','SDIC records selection in column 8 and packing in column 9.',issue('paras 95–96','PDF p.26'))
    ],[
      flow('ISS','Indent Sorting Section','Creates the duplicate set and completes columns 1–4.',issue('para 28','PDF p.10')),
      flow('ICR','Control Registry','Completes columns 5–7 and sends duplicate with demand to Voucher Preparation.',issue('paras 68–69','PDF p.19')),
      flow('VoucherPrep','Voucher Preparation Section','Uses it to watch voucher preparation and sends it with vouchers to SDIC.',issue('paras 77, 88','PDF pp.21, 23')),
      flow('SDIC','Sub Depot Issue Control','Records movement, selection and packing progress; files it in monthly order.',issue('paras 91–96','PDF pp.24–26'))
    ],'Filed by SDIC in the monthly serial-order pad.',[issue('paras 28, 68–69, 77–96; Appendix A','PDF pp.10, 19, 21–26, 56')]),
    document('scheduleOfIndents','Schedule of Indents','Accompanying schedule; its exact printed layout is not reproduced in DGOSTI-002.','Not stated in DGOSTI-002. It is already accompanying the demands when HQ/ISS receives it.','Returns allotted control-number information to the indenting unit.',[
      field('Demand references','Accompanies the demanding documents and is checked against demands/IRPS.',issue('paras 22, 51, 67','PDF pp.9, 15, 19')),
      field('Depot control number','Control Registry completes the allotted control number against each listed indent.',issue('para 70','PDF pp.19–20'))
    ],[
      flow('DemandingUnit','Originating side','Schedule accompanies the demand; creator is not asserted by DGOSTI-002.',issue('paras 22, 51','PDF pp.9, 15')),
      flow('HQ','Headquarters Section','Routes it with normal issue documents to ISS.',issue('para 22(b)','PDF p.9')),
      flow('ISS','Indent Sorting Section','Keeps it with the sorted demands and IRPS.',issue('para 3; para 51','PDF pp.6, 15')),
      flow('IndentChecking','Indent Checking Section','Checks/ticks the corresponding indent entry.',issue('para 56','PDF p.16')),
      flow('ICR','Control Registry','Enters the allotted control number and detaches the completed schedule.',issue('para 70','PDF pp.19–20')),
      flow('CentralRegistry','Central Registry','Dispatches it to the indenting unit.',issue('para 70','PDF p.20'))
    ],'Dispatched to the indenting unit through Central Registry.',[issue('paras 22, 51, 56, 67–70','PDF pp.9, 15–16, 19–20')],['No separate “Issues Control Sheet” is asserted: DGOSTI-002 names the IRPS prepared in duplicate.']),
    document('iv1','Issue Voucher No.1','IAFO-2672 Issue Voucher — Copy No.1.','Voucher Preparation Section.','Traffic/consignee advice copy.',[...commonIvContents,
      field('Packing reference','Packing Note serial block on reverse.',issue('para 152','PDF p.37'),'reverse'),
      field('Despatch evidence','Traffic enters despatch details where No.1 is held.',issue('paras 165–176','PDF pp.41–43'))
    ],issueVoucherFlow('iv1',[
      flow('Packing','Packing Section','Travels with stores; receives packing-note references.',issue('paras 141–155','PDF pp.36–38')),
      flow('Traffic','Traffic Branch Issue Section','Controls the advice/despatch route according to issue type.',issue('paras 157–177','PDF pp.39–43')),
      flow('DemandingUnit','Consignee','Receives No.1 in advance or with RR/PWB according to the cited cases.',issue('paras 165–176','PDF pp.41–43'))
    ]),'Sent to the consignee; timing depends on the applicable Traffic case.',[issue('paras 77–177','PDF pp.21–43')]),
    document('iv2','Issue Voucher No.2','IAFO-2672 Issue Voucher — Copy No.2.','Voucher Preparation Section.','Package No.1 copy and receipt evidence; returned-copy identity is source-conflicted.',[...commonIvContents,
      field('Package placement','Packing places No.2 inside Package No.1 or in the external metal cover of an unopened standard package.',issue('para 147','PDF p.36')),
      field('Returned receipt','RAOS II para 190 identifies No.2; DGOSTI-002 para 213(n) says No.5. This is not shown as an uncontested fact.',raos('para 190(m),(q)','PDF pp.84–85'))
    ],issueVoucherFlow('iv2',[
      flow('Packing','Packing Section','Places No.2 in/on Package No.1.',issue('para 147','PDF p.36')),
      flow('Traffic','Traffic / physical consignment','No.2 travels inside Package No.1 rather than as the Traffic office copy.',issue('paras 147, 157–177','PDF pp.36, 39–43')),
      flow('DemandingUnit','Consignee','Receives No.2 with Package No.1.',issue('paras 12–13','PDF pp.7–8')),
      flow(null,'Returned acknowledgement identity','Domain review required: RAOS identifies No.2; DGOSTI-002 para 213(n) says No.5.',issue('para 213(n)','PDF p.52'),'conflict')
    ]),'Verified through delivery in Package No.1. The identity of the returned receipted copy remains explicitly source-conflicted.',[issue('paras 12, 141–148, 213(n)','PDF pp.7, 36, 52'),raos('para 190(m),(q)','PDF pp.84–85')]),
    document('iv3','Issue Voucher No.3','IAFO-2672 Issue Voucher — Copy No.3.','Voucher Preparation Section.','LAO schedule copy.',[...commonIvContents,
      field('Selection evidence','Selection status/date completed on No.3.',issue('para 128(e)','PDF p.33')),
      field('Part-issue evidence','Guard-sheet linkage and “Further Part Vouchers Prepared” where applicable.',issue('para 95(b)–(d); paras 109–110','PDF pp.26, 30'))
    ],issueVoucherFlow('iv3',[
      flow('SDIC','Sub Depot Issue Control','Receives No.3 after selection and sends it with No.4 to Accounts; part issues visit FPV Preparation.',issue('para 95','PDF p.26')),
      flow('CAB','Central Account Branch','Records receipt of No.3 and schedules it to LAO.',issue('paras 200–205','PDF pp.49–50')),
      flow('LAO','Local Audit Officer','Receives it on skeleton/supplementary skeleton list.',issue('para 204','PDF p.50'))
    ]),'Scheduled to LAO; complete-NA No.3 copies are excepted by para 205.',[issue('paras 95, 200–205','PDF pp.26, 49–50')]),
    document('iv4','Issue Voucher No.4','IAFO-2672 Issue Voucher — Copy No.4.','Voucher Preparation Section.','Central Account Branch posting and file copy.',[...commonIvContents,
      field('Location and selection','MLRS location plus Selection status/date.',issue('paras 115 and 128(e)','PDF pp.31, 33')),
      field('Packing custody','Packing receipt on reverse.',issue('paras 128(f), 141','PDF pp.33, 36'),'reverse'),
      field('Account posting','Account reference, poster initials/date and checker initials/date.',issue('paras 197–199','PDF pp.48–49'))
    ],issueVoucherFlow('iv4',[
      flow('SDIC','Sub Depot Issue Control','Receives No.4 after selection and sends it to Accounts under guard sheet.',issue('para 95','PDF p.26')),
      flow('CAB','Central Account Branch','Posts, checks and files No.4.',issue('paras 194–199','PDF pp.48–49'))
    ]),'Filed by Central Account Branch in control/Sub-Depot serial order.',[issue('paras 95, 114–141, 194–199','PDF pp.26, 31–36, 48–49')]),
    document('iv5','Issue Voucher No.5','IAFO-2672 Issue Voucher — Copy No.5.','Voucher Preparation Section.','Packing-completion progress and LAO schedule copy.',[...commonIvContents,
      field('Packing evidence','Gross weight and Packing Note serial block.',issue('paras 151–154','PDF p.37'),'reverse'),
      field('Progress evidence','CRS/R&PS records receipt, waits for No.6, transcribes despatch details and schedules No.5 to LAO.',issue('para 213(d)–(j)','PDF pp.51–52'))
    ],issueVoucherFlow('iv5',[
      flow('Packing','Packing Section','Adds packing details and sends No.5 to SDIC.',issue('paras 151–154','PDF p.37')),
      flow('SDIC','Sub Depot Issue Control','Records packing date and sends No.5 to CRS/R&PS.',issue('para 96','PDF p.26')),
      flow('RPS','CRS/R&PS','Links No.5 with No.6, adds despatch details and schedules it.',issue('para 213(d)–(j)','PDF pp.51–52')),
      flow('LAO','Local Audit Officer','Receives No.5 on the prescribed schedule.',issue('para 213(j)','PDF p.52'))
    ]),'Scheduled to LAO by CRS/R&PS.',[issue('paras 96, 141–155, 210–214','PDF pp.26, 36–38, 51–53')],['DGOSTI-002 para 213(n) separately calls No.5 the receipted return copy; that conflicts with this same instruction’s No.5-to-LAO flow and is flagged, not reconciled by invention.']),
    document('iv6','Issue Voucher No.6','IAFO-2672 Issue Voucher — Copy No.6.','Voucher Preparation Section.','Despatch and Issue Time Check copy filed with the unit demand.',[...commonIvContents,
      field('Issue Time Check stamp','Demand received; voucher received in Sub-Depot; No.1 to Traffic; stores dispatched.',issue('para 87; Section XVIII','PDF pp.22, 54–55'),'reverse'),
      field('DOC, packing and custody evidence','DOC stamp, packing marking/weight/location and Traffic collection/transit location.',issue('paras 105, 141, 151–152, 161','PDF pp.29, 36–37, 40'),'reverse'),
      field('Despatch details','Mode-specific despatch particulars and date.',issue('paras 174–190','PDF pp.43–46'),'reverse')
    ],issueVoucherFlow('iv6',[
      flow('Packing','Packing Section','Adds packing evidence and passes No.6 with packages to Traffic.',issue('paras 141–156','PDF pp.36–38')),
      flow('Traffic','Traffic Branch Issue Section','Records custody/despatch and sends No.6 to CRS/R&PS.',issue('paras 157–177','PDF pp.39–43')),
      flow('RPS','CRS/R&PS','Marks IRPS and sends No.6 to S&M.',issue('para 213(e)–(f)','PDF p.51')),
      flow('SM','S&M Branch','Calculates Issue Time Check and returns No.6.',issue('paras 219–224','PDF pp.54–55')),
      flow('RPS','CRS/R&PS','Files No.6 beside the corresponding demand in the unit pad.',issue('para 213(g),(k)','PDF p.52'))
    ]),'Filed in the relevant unit pad by CRS/R&PS.',[issue('paras 87, 105, 141–177, 210–224','PDF pp.22, 29, 36–55')]),
    document('packingNoteOriginal','Packing Note IAFZ-3031 — original','One IAFZ-3031 Packing Note per package, prepared in duplicate. Exact blank field layout is not reproduced in DGOSTI-002.','Packing Section packer; witnessed.','Identifies the contents of its specific package.',[
      field('Package contents','Designation/quantity actually packed; registered numbers for small arms where applicable.',issue('paras 142, 144(a), 148','PDF p.36')),
      field('Authentication','Signed by packer and witnessed.',issue('para 148','PDF p.36'))
    ],[
      flow('Packing','Packing Section','Prepares and signs/witnesses one original for each package.',issue('para 148','PDF p.36')),
      flow('Traffic','Physical package route','Original remains inside the corresponding package or in its external metal cover.',issue('para 148','PDF p.36')),
      flow('DemandingUnit','Consignee','Receives the original with that package.',issue('para 148','PDF p.36'))
    ],'Remains with its package for the consignee.',[issue('paras 142–153','PDF pp.36–37')]),
    document('packingNoteDuplicate','Packing Note IAFZ-3031 — duplicate','Duplicate of each package-specific Packing Note.','Packing Section packer; witnessed.','Packing Section record copy.',[
      field('Same package contents and authentication','Duplicate corresponds to the original for that package.',issue('paras 148, 153','PDF pp.36–37'))
    ],[
      flow('Packing','Packing Section','Prepared with the original, retained in bound-book form and filed in numerical sequence.',issue('paras 148, 153','PDF pp.36–37'))
    ],'Retained by Packing in the bound record.',[issue('paras 148, 153','PDF pp.36–37')]),
    document('packingCompletionOriginal','Packing Completion Advice — original','Appendix H.','Packing Section.','Advises Traffic that listed packages are ready and carries No.1 copies.',[
      field('Header','Sub-Depot/Group, group serial number, date and time.',issue('Appendix H','PDF p.63')),
      field('Rows','Voucher number, number of packages and weight.',issue('Appendix H','PDF p.63')),
      field('Totals','Total vouchers, packages and weight.',issue('Appendix H','PDF p.63'))
    ],[
      flow('Packing','Packing Section','Lists control/Sub-Depot serials in strict numerical sequence and attaches relevant No.1 copies.',issue('para 155','PDF pp.37–38')),
      flow('Traffic','Traffic Branch Issue Section','Checks the listed vouchers and uses them to collect packages.',issue('paras 156, 159–161','PDF pp.38–40'))
    ],'Traffic working/custody document after hand-over.',[issue('paras 155–161; Appendix H','PDF pp.37–40, 63')]),
    document('packingCompletionDuplicate','Packing Completion Advice — duplicate','Appendix H retained copy.','Packing Section.','Packing custody receipt for Traffic collection.',[
      field('Same advice data','Mirrors the original advice.',issue('para 155; Appendix H','PDF pp.37–38, 63')),
      field('Traffic receipt','Traffic representative signs, dates and records collection time.',issue('paras 156, 161','PDF pp.38, 40'))
    ],[
      flow('Packing','Packing Section','Retains the duplicate pending collection.',issue('para 155','PDF pp.37–38')),
      flow('Traffic','Traffic representative','Signs/dates/times the duplicate when taking packages and No.6.',issue('paras 156, 161','PDF pp.38, 40')),
      flow('Packing','Packing Section','Files it in serial order in pads of 100.',issue('para 156','PDF p.38'))
    ],'Filed by Packing in serial-number order.',[issue('paras 155–161; Appendix H','PDF pp.37–40, 63')]),
    document('convoyDocument','Convoy Note','IAFO-2442 for distribution wagons; IAFO-2648 for other full-wagon despatches.','Traffic Branch Issue Section.','Records wagon/package despatch and supports consignee receipt.',[
      field('Form and copy count','Five IAFO-2442 copies for distribution wagons; four IAFO-2648 copies for other full wagons.',issue('para 170','PDF p.42')),
      field('Despatch particulars','Completed according to the form; serial comes from Convoy Note Register.',issue('paras 171–174','PDF pp.42–43'))
    ],[
      flow('Traffic','Traffic Branch Issue Section','Prepares and serialises the applicable Convoy Note; places/sends copies as prescribed.',issue('paras 170–175','PDF pp.42–43')),
      flow('DemandingUnit','Consignee / OC station','Returns one receipted copy.',issue('para 180','PDF p.44')),
      flow('Traffic','Traffic Branch Issue Section','Records return in Convoy Note Register and files it.',issue('para 180','PDF p.44'))
    ],'Office and returned copies filed by Traffic in serial order.',[issue('paras 170–180','PDF pp.42–44')]),
    document('railwayReceipt','Railway Receipt / Parcel Way Bill','Carrier-issued RR or PWB; not a depot-designed form.','Railway representative after exchange of Military Credit Note.','Carrier evidence for rail despatch.',[
      field('Verified evidence only','RR/PWB number/date and wagon/despatch linkage. The source does not reproduce the carrier form fields.',issue('paras 173–176','PDF p.43'))
    ],[
      flow('Traffic','Traffic / Railway representative','Traffic prepares IAFT-1711 and exchanges it for RR/PWB.',issue('para 173','PDF p.43')),
      flow('DemandingUnit','Consignee / OC station','RR/PWB travels with the prescribed No.1/Convoy Note set.',issue('para 175','PDF p.43'))
    ],'Sent on the applicable consignee/station route.',[issue('paras 173–176','PDF p.43')]),
    document('trafficRegister','Traffic Register of Issues','DGOSTI-002 Appendix B; separate register for each control/Sub-Depot serial series.','Traffic Branch Issue Section.','Active despatch-progress register.',[
      field('Column 1','Control number.',issue('Appendix B','PDF p.57')),
      field('Column 2','Date stores collected.',issue('para 164; Appendix B','PDF pp.40, 57')),
      field('Column 3','Date No.1 copy sent to consignee.',issue('paras 165, 176; Appendix B','PDF pp.41, 43, 57')),
      field('Column 4','Date stores despatched.',issue('para 176; Appendix B','PDF pp.43, 57')),
      field('Column 5','Wagon/RR number or applicable postal reference.',issue('para 176; Appendix B','PDF pp.43, 57')),
      field('Column 6','Remarks.',issue('Appendix B','PDF p.57'))
    ],[
      flow('Traffic','Traffic Branch Issue Section','Opens/pre-controls the entry and records collection.',issue('para 164','PDF p.40')),
      flow('Traffic','Traffic Branch Issue Section','Updates No.1 dispatch, stores dispatch, carrier/post reference and exceptions.',issue('paras 165–178','PDF pp.41–44')),
      flow('Traffic','Traffic Branch Issue Section','Keeps register current for progress and cancellation/NA evidence.',issue('para 178','PDF p.44'))
    ],'Retained as the Traffic progress record.',[issue('paras 164–178; Appendix B','PDF pp.40–44, 57')]),
    document('localIssueRegister','Register of Local Issues','DGOSTI-002 Appendix C.','Traffic Local Issues Section.','Controls local collection and consignee-representative acknowledgement.',[
      field('Printed columns','Control number; consignee; date stores collected; date No.1 sent; date stores collected/returned; consignee representative signature; remarks.',issue('Appendix C','PDF p.58'))
    ],[
      flow('Traffic','Local Issues Section','Completes initial columns when stores/vouchers arrive and sends No.1 as collection authority.',issue('paras 187–188','PDF p.45')),
      flow('DemandingUnit','Authorised consignee representative','Produces No.1 and authority; signs the register and reverse of No.6.',issue('para 189','PDF p.46')),
      flow('Traffic','Local Issues Section','Watches 14-day collection and records cancellation/return-to-stock where applicable.',issue('paras 190–192','PDF p.46'))
    ],'Retained in Traffic Local Issues Section.',[issue('paras 187–192; Appendix C','PDF pp.45–46, 58')]),
    document('postalIssueRegister','Register of Postal Issues','DGOSTI-002 Appendix E.','Economy Packing and Postal Issue Section.','Records postal package and postage/despatch evidence.',[
      field('Printed columns','Postal receipt, postage, control number, date stores collected, address, number/date, rupees/naye paise and remarks.',issue('Appendix E','PDF p.60'))
    ],[
      flow('Traffic','Economy Packing and Postal Issue Section','Lists parcels on receipt and maintains the postal register.',issue('paras 182–184','PDF pp.44–45')),
      flow('Traffic','Economy Packing and Postal Issue Section','Checks/postes postal receipt evidence and completes No.1/No.6 despatch details.',issue('paras 184–185','PDF p.45')),
      flow('RPS','CRS/R&PS','Receives No.6 after postal despatch.',issue('para 185','PDF p.45'))
    ],'Retained by the Postal Issue Section.',[issue('paras 182–185; Appendix E','PDF pp.44–45, 60')]),
    document('accountCardPosting','Issue Account Card entry','Account Card; exact card layout is outside the reproduced DGOSTI appendix.','Central Account Branch ledger poster; checked by ledger checker.','Posts the issue to the stock ledger.',[
      field('Verified posting evidence','Selection date as posting date, issue quantity, account reference, poster initials/date and checker initials/date.',issue('paras 197–199','PDF pp.48–49'))
    ],[
      flow('CAB','Central Account Branch','Posts from No.4, checks and files the voucher.',issue('paras 194–199','PDF pp.48–49'))
    ],'Account Card retained in Accounts; No.4 filed separately.',[issue('paras 194–199','PDF pp.48–49')]),
    document('binCardSelection','Issue Bin Card entry','Bin Card; exact blank layout is not reproduced in DGOSTI-002.','Selector.','Records stock removed during selection.',[
      field('Verified evidence','Selected issue quantity and resulting stock position; replenishment action when stock reaches the prescribed point.',issue('paras 128–131','PDF p.33'))
    ],[
      flow('Selection','Selection of Stores','Posts selected items on the relevant Bin Cards.',issue('paras 128–131','PDF p.33'))
    ],'Bin Card remains at the store location.',[issue('paras 128–131','PDF p.33')])
  ];

  const drsFields=[
    field('Sub-Depot/Group and DRS identity','Sub-Depot/Group, serial number and date.',receipt('Appendix C para 8(b)(i)–(ii)','PDF pp.20–21')),
    field('Transit evidence','RR/PWB, Indemnity Bond or postal receipt number/date; consignor/station; Convoy Note/consignor IV; wagon/vehicle.',receipt('Appendix C para 8(b)(iii)–(ix)','PDF p.21')),
    field('Packages','Number of packages and description; escort/representative particulars where applicable.',receipt('Appendix C para 8(b)','PDF p.21'))
  ];
  const receiptDocuments=[
    document('advanceIssueVoucher','Advance copy of consignor’s Issue Voucher','Consignor’s Issue Voucher; exact source-form layout is not reproduced in DGOSTI-001.','Consignor.','Advance dues-in and linkage watch before the stores copy arrives.',[
      field('Consignor issue identity','Consignor issue voucher number/date and the consignor’s issued item/quantity particulars.',receipt('broad principles para 2; Appendices A–B','PDF pp.7–8, 11–13')),
      field('Reverse endorsement','Provision initials/dates and stamps “Dues In Posted.”',receipt('Appendix B para 2(a)','PDF p.12'),'reverse')
    ],[
      flow('Consignor','Consignor','Sends the advance issue document.',receipt('broad principles para 2(a)–(b)','PDF p.7')),
      flow('CentralRegistry','Central Registry','Date-stamps and sends it to Provision.',receipt('Appendix A para 2(b)','PDF p.11')),
      flow('Provision','Provision Branch','Posts dues in pencil and stamps the reverse.',receipt('Appendix B para 2','PDF p.12')),
      flow('ReceiptProgress','Sub Depot/Group Receipts Progress Section','Files it consignor-wise and links it with the stores copy.',receipt('Appendix D paras 2–5','PDF pp.25–28'))
    ],'Used for linkage; not separately posted again where the normal stores copy governs posting.',[receipt('broad principles para 2; Appendices A–D','PDF pp.7–8, 11–13, 25–28')]),
    document('receiptVoucher1','Receipt Voucher No.1','Consignor’s Issue Voucher used as receiving depot RV No.1.','Consignor.','Location/dues-out review and Accounts posting copy.',[
      field('Receipt Time Check','DRS number/date; stores-in-Sub-Depot date; voucher-in-Accounts date; voucher-posted date.',receipt('Appendix D para 5(a)','PDF p.27'),'reverse'),
      field('Receipt control','Receipt control number/date and DRS number/date.',receipt('Appendix G para 2(a)–(b)','PDF p.39')),
      field('RN&DOR evidence','Stamp/date that RN&DOR slips were prepared.',receipt('Appendix F para 5(a)','PDF p.37')),
      field('Location/dues out','Shed/area location and DOC quantity/stamp.',receipt('Appendices H and J','PDF pp.41–44')),
      field('Posting','Account reference, poster/checker initials/date and actual posting date.',receipt('Appendix O paras 3–5','PDF pp.51–52'))
    ],[
      flow('ReceiptProgress','Receipts Progress','Marries advance RV1 with RV2/DRS2 and adds Receipt Time Check stamp.',receipt('Appendix D para 5','PDF pp.27–28')),
      flow('ReceiptControl','Receipts Control Registry','Allots receipt control number and marks DRS linkage.',receipt('Appendix G para 2','PDF p.39')),
      flow('ReceiptArea','Receipts Area','Uses it for item check.',receipt('Appendix E paras 7–9','PDF pp.32–34')),
      flow('ReceiptLiaison','Receipts Liaison','Sends it to MLRS/DOC and later stamps RN&DOR preparation.',receipt('Appendix F paras 3–5','PDF pp.36–37')),
      flow('MLRS','Master Location Records Section','Checks identity and marks location.',receipt('Appendix H paras 1–8','PDF pp.41–43')),
      flow('DOC','Dues Out Review Cell','Marks dues-out quantity or DOC clearance.',receipt('Appendix J','PDF p.44')),
      flow('FPVRelease','FPV Release Cell','Conditional: extracts FPVs, then returns stamped RV1 to Liaison.',receipt('Appendix K para 2','PDF p.45'),'conditional'),
      flow('ReceiptProgress','Receipts Progress','Signs and sends RV1 to Accounts.',receipt('Appendix D para 7(a)','PDF pp.29–30')),
      flow('CAB','Central Accounts Branch','Posts, checks and files RV1.',receipt('Appendix O paras 2–5','PDF pp.51–52'))
    ],'Filed by Central Accounts Branch in receipt-control-number order.',[receipt('Appendices D–O','PDF pp.25–53')]),
    document('receiptVoucher2','Receipt Voucher No.2','Consignor’s Issue Voucher copy enclosed with the consignment.','Consignor.','Receiving acknowledgement returned to the consignor.',[
      field('Receipt control and RN&DOR evidence','Control number/date and RN&DOR-prepared stamp/date.',receipt('Appendices F–G','PDF pp.36–40')),
      field('Receiving officer signature','All receipt-voucher copies are signed by the authorised Sub-Depot/Group officer after checking.',receipt('Appendix D para 7(a)(ii)','PDF p.29')),
      field('Dues-in clearance','Provision inks the dues-in record before forwarding.',receipt('Appendix B paras 3–5','PDF pp.12–13'))
    ],[
      flow('ReceiptArea','Receipts Area','Extracts RV2 from Package No.1 and sends it with DRS2 via Liaison.',receipt('Appendix E para 4','PDF p.31')),
      flow('ReceiptProgress','Receipts Progress','Marries RV2 with advance RV1.',receipt('Appendix D para 5','PDF p.27')),
      flow('ReceiptControl','Receipts Control Registry','Allots receipt control number.',receipt('Appendix G para 2','PDF p.39')),
      flow('ReceiptArea','Receipts Area','Uses RV2 during store check; discrepancy details are noted here when applicable.',receipt('Appendix E paras 7–12','PDF pp.32–35')),
      flow('ReceiptLiaison','Receipts Liaison','Stamps RN&DOR preparation and clears it to Receipts Progress.',receipt('Appendix F paras 5–7','PDF pp.37–38')),
      flow('ReceiptProgress','Receipts Progress','Obtains authorised officer signature and sends RV2 to Provision.',receipt('Appendix D para 7(a)','PDF pp.29–30')),
      flow('Provision','Provision Branch','Inks dues in and sends RV2 to CRS/R&PS.',receipt('Appendix B paras 3–5','PDF pp.12–13')),
      flow('RPS','R&PS/CRS','Controls return and sends it to the consignor/registry route.',receipt('Appendix Q para 5','PDF p.57')),
      flow('Consignor','Consignor','Receives the cleared acknowledgement.',receipt('broad principles para 2(q); Appendix Q para 5','PDF pp.9–10, 57'))
    ],'Returned to consignor (directly or through Central Registry/skeleton-list route according to consignor type).',[receipt('Appendices B, D–G, Q','PDF pp.12–13, 25–40, 56–58')]),
    ...['drs1','drs2','drs3'].map((id,index)=>document(id,`Daily Receipt Sheet IAFO-2717 — Copy No.${index+1}`,'IAFO-2717; triplicate for stock Sub-Depot/Group receipts.','Traffic Branch (Receipts).',[
      'Traffic receipted/file copy.',
      'Working copy accompanying stores through checking/control.',
      'Receipt-progress and CRS/R&PS clearance copy.'
    ][index],drsFields,[
      ...(index===0?[
        flow('TrafficReceipts','Traffic Branch (Receipts)','Prepares DRS and sends copies with stores.',receipt('Appendix C paras 8–9','PDF pp.20–23')),
        flow('ReceiptArea','Receipts Area','Receipts Copy No.1.',receipt('Appendix C para 9(b)','PDF p.22')),
        flow('TrafficReceipts','Traffic Branch (Receipts)','Files No.1 with applicable Convoy Note after updating DRS Register.',receipt('Appendix C para 9(c)','PDF p.23'))
      ]:index===1?[
        flow('TrafficReceipts','Traffic Branch (Receipts)','Sends No.2 with the stores.',receipt('Appendix C para 9','PDF pp.22–23')),
        flow('ReceiptArea','Receipts Area','Holds No.2 pending checking; marks floor location and voucher links.',receipt('Appendix E paras 3–4','PDF p.31')),
        flow('ReceiptLiaison','Receipts Liaison','Carries No.2 through marriage/control and clears it after RN&DOR preparation.',receipt('Appendix F paras 2–7','PDF pp.36–38')),
        flow('ReceiptProgress','Receipts Progress','Records clearance and files No.2.',receipt('Appendix D para 7(b)','PDF p.30'))
      ]:[
        flow('TrafficReceipts','Traffic Branch (Receipts)','Sends No.3 with stores for Receipts Area signature.',receipt('Appendix C para 9','PDF pp.22–23')),
        flow('ReceiptArea','Receipts Area','Receipts and returns No.3 to Traffic representative.',receipt('Appendix E paras 1–2','PDF p.31')),
        flow('ReceiptProgress','Receipts Progress','Receives No.3, updates the Sub-Depot/Group DRS Register and later sends it to R&PS/CRS.',receipt('Appendix D paras 4, 7(b)','PDF pp.27, 30')),
        flow('RPS','R&PS/CRS','Checks clearance/linkage and files No.3 with applicable Convoy Note.',receipt('Appendix Q para 4','PDF pp.56–57'))
      ])
    ],[
      'Filed by Traffic with transit evidence.',
      'Filed by Sub-Depot/Group Receipts Progress Section.',
      'Filed by R&PS/CRS with applicable Convoy Note.'
    ][index],[receipt('Appendix C paras 8–11; Appendices D–F and Q','PDF pp.20–38, 56–58')])),
    ...['rcrs1','rcrs2','rcrs3'].map((id,index)=>document(id,`Receipts Control Registration Sheet — Copy No.${index+1}`,'DGOSTI-001 Annexure 12; prepared in triplicate.','Receipts Control Registry.',['Sub-Depot/Group Receipts Progress watch.','R&PS/CRS acknowledgement and return watch.','Central Accounts posting watch.'][index],[
      field('Columns 1–6','Receipt control number; consignor; consignor issue voucher number/date; DRS number/date.',receipt('Appendix G para 2(d); Annexure 12','PDF pp.39, 67')),
      field('Column 7','Three printed milestones: No.1 to Accounts & No.2 to Provision; No.1 in Accounts; No.2 to consignor.',receipt('Annexure 12; Appendices D, O and Q','PDF pp.67, 30, 51, 57')),
      field('Column 8','Date RV No.1 posted.',receipt('Appendix O para 5; Annexure 12','PDF pp.52, 67')),
      field('Column 9','Remarks, including CRV/CTC where applicable.',receipt('Appendix G para 2(d); Annexure 12','PDF pp.39, 67'))
    ],[
      flow('ReceiptControl','Receipts Control Registry','Completes columns 1–6 and splits the three copies.',receipt('Appendix G paras 2–3','PDF pp.39–40')),
      flow(['ReceiptProgress','RPS','CAB'][index],['Receipts Progress','R&PS/CRS','Central Accounts Branch'][index],[
        'Uses No.1 to progress return of receipt documents and records movement milestones.',
        'Uses No.2 to progress RV2/DRS3 clearance and return to consignor.',
        'Uses No.3 to progress receipt and posting of RV1.'
      ][index],receipt(['Appendix D paras 6–7','Appendix Q paras 1–5','Appendix O paras 1–8'][index],['PDF pp.29–30','PDF pp.56–58','PDF pp.51–53'][index]))
    ],'Filed in serial order by its receiving progress office.',[receipt('Appendix G; Annexure 12; Appendices D, O, Q','PDF pp.39–40, 67, 25–30, 51–58')])),
    document('rndorBulk','Receipt Notification & Dues Out Release Slip — Bulk/Detail route','RN&DOR Slip; exact blank layout is not reproduced in DGOSTI-001.','Receipts Liaison Section.','Directs cleared stores to Bulk/Detail location(s) and returns binning evidence.',[
      field('Serial and item linkage','Receipt control number suffixed by item position(s); total RV items.',receipt('Appendix F para 4(c)','PDF p.37')),
      field('Location and authentication','Shed/area location, preparer signature, number of copies and checker initials.',receipt('Appendix F paras 4(c)–5','PDF p.37')),
      field('Store receipt','Representative signature; detail location; Bin Card serial where applicable.',receipt('Appendices E and M','PDF pp.35, 47–48'))
    ],[
      flow('ReceiptLiaison','Receipts Liaison Section','Prepares duplicate/triplicate or extra-location copies according to destinations.',receipt('Appendix F paras 4–5','PDF pp.36–37')),
      flow('ReceiptArea','Receipts Area','Marries copies with stores and obtains delivery/collection signature.',receipt('Appendix E paras 10–11','PDF pp.34–35')),
      flow('BulkStore','Bulk/Detail Store House / Area','Records location, bins/stacks, posts Bin Card and returns receipted copy.',receipt('Appendix M paras 1–3','PDF pp.47–48')),
      flow('ReceiptLiaison','Receipts Liaison Section','Marries returned copies and files the complete set.',receipt('Appendix F para 6','PDF pp.37–38'))
    ],'Complete receipted set filed by Receipts Liaison in receipt-control-number order.',[receipt('Appendices E, F and M','PDF pp.34–38, 47–48')]),
    document('rndorDuesOut','Receipt Notification & Dues Out Release Slip — dues-out route','RN&DOR Slip; copy count varies by the actual destinations.','Receipts Liaison Section.','Controls movement into Dues Out Suspense and links further-part voucher release.',[
      field('Same core fields','Receipt-control/item suffix, total items, preparer/copy count/checker.',receipt('Appendix F paras 4–5','PDF pp.36–37')),
      field('FPV release evidence','Sub-Depot/Group serial numbers and extraction date on reverse; suspense acknowledgement.',receipt('Appendix K para 4','PDF p.45'),'reverse'),
      field('Suspense evidence','Temporary location and signed return after FPV selection.',receipt('Appendix L paras 2–7','PDF p.46'))
    ],[
      flow('ReceiptLiaison','Receipts Liaison Section','Prepares and sends one copy to FPV Release and remaining copies to Receipts Area.',receipt('Appendix F para 5(b)','PDF p.37')),
      flow('FPVRelease','FPV Release Cell','Links extracted FPV serials/date and sends vouchers to suspense.',receipt('Appendix K paras 3–4','PDF p.45')),
      flow('ReceiptArea','Receipts Area','Parallel distribution branch from Liaison—not a hand-off from FPV Release. Sends dues-out stores with its RN&DOR copy to suspense.',receipt('Appendix E para 11; Appendix F para 5(b)','PDF pp.35, 37'),'conditional'),
      flow('DuesOutSuspense','Dues Out Suspense Area','Records temporary location, selects against FPVs and returns signed RN&DOR.',receipt('Appendix L','PDF p.46')),
      flow('ReceiptLiaison','Receipts Liaison Section','Marries and files the returned evidence.',receipt('Appendix F para 6','PDF pp.37–38'))
    ],'Complete receipted set filed by Receipts Liaison; FPV Release retains its acknowledged record copy.',[receipt('Appendices E, F, K and L','PDF pp.34–38, 45–46')]),
    document('discrepancyReport','Discrepancy Report IAFZ-3045','IAFZ-3045, prepared in duplicate. Exact blank layout is not reproduced in DGOSTI-001.','Sub Depot/Group Receipts Office Discrepancy clerk, at Receipts Area.','Records non-trivial receipt discrepancy and supports settlement with consignor.',[
      field('Verified case linkage','Receipt/DR references and discrepancy details already noted on RV No.2.',receipt('Appendix E para 12; Appendix N para 2','PDF pp.35, 49')),
      field('Reverse custody evidence','Receipts Area location and signature of In-charge Receipts Area.',receipt('Appendix N para 2(d)(i)','PDF p.49'),'reverse'),
      field('DAO control','DR number/date cross-referenced with adjustment voucher and RV No.2.',receipt('Appendices N–P','PDF pp.49–55'))
    ],[
      flow('ReceiptArea','Receipts Area','Identifies discrepancy and sends DRS2/RV documents to the Discrepancy Section.',receipt('Appendix E para 12','PDF p.35')),
      flow('ReceiptDiscrepancy','Receipts Office Discrepancy Section','Prepares IAFZ-3045 in duplicate and records store location/signature.',receipt('Appendix N para 2','PDF p.49')),
      flow('DAO','DAO Central Discrepancy Section','Allots DR number, cross-links the case and returns it for store clearance.',receipt('Appendix P paras 1–3','PDF p.54')),
      flow('ReceiptDiscrepancy','Receipts Office Discrepancy Section','After clearance, sends the retained DR case back to DAO.',receipt('Appendix N paras 3–4','PDF p.50')),
      flow('DAO','DAO Central Discrepancy Section','Sends original DR with RV2 to consignor and retains/progresses settlement evidence.',receipt('Appendix P paras 4–6','PDF pp.54–55')),
      flow('Consignor','Consignor','Receives original DR with RV2.',receipt('Appendix P para 4(b)','PDF p.54'))
    ],'Original goes to consignor; one copy remains in the DAO discrepancy case through finalisation.',[receipt('Appendices E, N and P','PDF pp.35, 49–55')]),
    document('adjustmentVoucher','Adjustment Voucher IAFO-2715','IAFO-2715, prepared in quadruplicate. Exact blank layout is not reproduced in DGOSTI-001.','Sub Depot/Group Receipts Office Discrepancy Section.','Adjusts the accounting result of a receipt discrepancy.',[
      field('Case cross-reference','Cross-referenced to DR, RV1/RV2 and allotted adjustment control number.',receipt('Appendix N para 2(d)','PDF pp.49–50')),
      field('Posting/scheduling','Posted after the connected receipt voucher; one copy scheduled to LAO.',receipt('Appendix O para 3(f); Appendix P para 4(c)','PDF pp.52, 55'))
    ],[
      flow('ReceiptDiscrepancy','Receipts Office Discrepancy Section','Prepares IAFO-2715 in quadruplicate.',receipt('Appendix N para 2(d)(ii)','PDF p.49')),
      flow('DAO','DAO Central Discrepancy Section','Allots adjustment control number and cross-links it with DR/RVs.',receipt('Appendix P para 2','PDF p.54')),
      flow('ReceiptArea','Receipts Area','One copy accompanies RV documents for clearance of discrepant stores.',receipt('Appendix N para 4','PDF p.50')),
      flow('CAB','Central Accounts Branch','Posts the adjustment immediately after the connected receipt voucher.',receipt('Appendix O para 3(f)','PDF p.52')),
      flow('DAO','DAO / Adjustment Control Registry','Schedules one copy to LAO and retains the settlement copies.',receipt('Appendix P para 4(c)–(d)','PDF p.55'))
    ],'One copy to LAO; remaining copies retained/linked in Accounts and the DR case as prescribed.',[receipt('Appendices N–P','PDF pp.49–55')]),
    document('crvException','Credit Receipt Voucher (CRV)','Prepared in triplicate only when both normal RV copies are unavailable.','Receipts Area, with packages opened in the presence of an officer.','Self-contained provisional receipt document pending regular-voucher linkage.',[
      field('Consignor and transit','Consignor/address; RR/PWB/Convoy Note/Indemnity Bond/post receipt; wagon/vehicle; DRS.',receipt('Appendix E para 6(a)–(e)','PDF pp.31–32')),
      field('Linking evidence','Consignor IV if available; package/railway markings; marked and received weights; packing materials; Packing Note; escort signature.',receipt('Appendix E para 6(f)–(k)','PDF p.32')),
      field('Progress stamp','Regular-voucher demand reference/date; expeditor; date RV received; date RV passed to Accounts/CRS.',receipt('Appendix D para 5(c)','PDF p.28'),'reverse')
    ],[
      flow('ReceiptArea','Receipts Area','Opens in officer presence, checks stores and prepares CRV in triplicate.',receipt('Appendix E paras 5–6','PDF pp.31–32')),
      flow('ReceiptControl','Receipts Control Registry','Allots receipt control; marks CRV on DRS/RCRS.',receipt('Appendix G para 2','PDF p.39')),
      flow('ReceiptProgress','Receipts Progress','Retains No.3 as a trap and hastens the regular voucher.',receipt('Appendix D para 5(c)','PDF pp.28–29')),
      flow('CAB','Central Accounts Branch','Posts CRV once and later links—not reposts—the regular voucher.',receipt('Appendix O para 6','PDF p.52')),
      flow('RPS','R&PS/CRS','Holds/clears the receipt copy under the prescribed linking or authority path.',receipt('Appendix Q para 5','PDF pp.57–58'))
    ],'Destroyed or converted/linked only under the stated regular-voucher or authorised non-linking condition; six-month failures escalate through BAOC to Army HQ.',[receipt('Appendices D–G, O and Q','PDF pp.25–40, 51–58')]),
    document('ctcException','Certified True Copy for a missing Receipt Voucher copy','CTC of the available Receipt Voucher; copy identity must be boldly marked.','Sub Depot/Group Receipts Progress Section.','Temporarily replaces one missing RV copy without creating a second receipt.',[
      field('Missing RV1 case','RV2 is converted to RV1; two CTCs are made, one retained as trap and one travels with RV1/DRS2.',receipt('Appendix D para 5(b)','PDF p.28')),
      field('Missing RV2 case','One CTC of traced RV1 is prepared and marked “Copy 2.”',receipt('Appendix D para 5(b)','PDF p.28')),
      field('Control/linking','Receipt control links the CTC; regular-copy arrival clears the trap.',receipt('Appendices D and G','PDF pp.26–28, 39'))
    ],[
      flow('ReceiptProgress','Receipts Progress','Creates the exact CTC copy/copies required by which RV copy is missing.',receipt('Appendix D para 5(b)','PDF p.28')),
      flow('ReceiptControl','Receipts Control Registry','Allots receipt control and marks CTC in RCRS remarks.',receipt('Appendix G para 2(d)','PDF p.39')),
      flow('ReceiptArea','Receipts Area','Uses the controlled substitute in the normal checking route.',receipt('Appendix E para 5','PDF p.31')),
      flow('RPS','R&PS/CRS','Returns the receipted CTC where it substitutes for RV2.',receipt('Appendix Q para 5','PDF p.57')),
      flow('ReceiptProgress','Receipts Progress','Destroys the trap CTC on prescribed regular-copy linkage; the source states a two-month trap rule for the cited case.',receipt('Appendix D paras 3(b), 5(b)','PDF pp.26, 28'))
    ],'Destroyed on prescribed linkage/retention condition; never posted as an additional receipt.',[receipt('Appendices D–G and Q','PDF pp.25–40, 56–58')]),
    document('binCardReceipt','Receipt Bin Card entry','Bin Card; blank layout is not reproduced in DGOSTI-001.','Bulk/Detail Store House / Area.','Records the received stock at its storage location.',[
      field('Verified evidence','Quantity received, detail/new location, RN&DOR linkage and Bin Card serial; initial entry signed by an officer for a new card.',receipt('Appendix M paras 2(g), 3','PDF p.48'))
    ],[
      flow('BulkStore','Bulk/Detail Store House / Area','Posts receipt, records Bin Card serial on RN&DOR and returns signed evidence.',receipt('Appendix M paras 2–3','PDF pp.47–48'))
    ],'Retained at the store location.',[receipt('Appendix M','PDF pp.47–48')]),
    document('receiptAccountPosting','Receipt Account Card entry','Account Card; blank layout is not reproduced in DGOSTI-001.','Central Accounts Branch ledger poster; checked by ledger checker.','Brings the receipt on ledger charge.',[
      field('Verified posting evidence','RN&DOR-prepared date as Account Card date; quantity; account reference; poster/checker initials/date.',receipt('Appendix O paras 3–5','PDF pp.51–52'))
    ],[
      flow('CAB','Central Accounts Branch','Posts from RV1/CRV, checks the entry and records RCRS posting date.',receipt('Appendix O paras 2–5','PDF pp.51–52'))
    ],'Account Card remains in Accounts; RV1/CRV is filed in receipt-control-number order.',[receipt('Appendix O','PDF pp.51–53')])
  ];

  root.DepotArchiveData={
    offices,
    documents:{Issue:issueDocuments,Receipt:receiptDocuments},
    excluded:{
      Issue:[
        'No separate “Issues Control Sheet equivalent” page: DGOSTI-002 identifies the IRPS prepared in duplicate.',
        'Physical stores, packages, returned-copy states and unit-pad bundles are gameplay entities, not separate documents.',
        'Road/rail/postal “document sets” are not presented as invented universal forms; only specifically named forms/registers are indexed.'
      ],
      Receipt:[
        'Physical stores and a “receipted RV2” state are not duplicated as separate documents.',
        'Bulk and dues-out RN&DOR are route variants of the same source document and are shown separately only to explain their distinct flow.'
      ]
    }
  };
})(globalThis);
