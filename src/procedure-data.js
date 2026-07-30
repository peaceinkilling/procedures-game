(function attachProcedureData(root, factory) {
  const data = factory();
  if (typeof module === 'object' && module.exports) module.exports = data;
  else root.DepotData = data;
})(typeof globalThis !== 'undefined' ? globalThis : this, function buildProcedureData() {
  'use strict';

  const offices = [
    {id:'DemandingUnit',label:'DEMANDING UNIT',icon:'🪖',x:25,y:500,w:165,h:105,color:'#5a6d39'},
    {id:'HQ',label:'HQ SECTION',icon:'📨',x:35,y:55,w:145,h:92,color:'#3c5e7c'},
    {id:'ISS',label:'ISS',icon:'🧩',x:225,y:45,w:135,h:92,color:'#526a88'},
    {id:'ULC',label:'ULC',icon:'📍',x:410,y:45,w:135,h:92,color:'#526a88'},
    {id:'IndentChecking',label:'INDENT CHECKING',icon:'🔎',x:595,y:45,w:165,h:92,color:'#526a88'},
    {id:'ICR',label:'ISSUE CONTROL',icon:'🔢',x:810,y:45,w:155,h:92,color:'#62577d'},
    {id:'VoucherPrep',label:'VOUCHER PREP',icon:'🧾',x:1010,y:45,w:160,h:92,color:'#62577d'},
    {id:'SDIC',label:'SDIC',icon:'⏱️',x:1015,y:205,w:155,h:100,color:'#6b5c38'},
    {id:'DOC',label:'DOC',icon:'🎯',x:820,y:210,w:145,h:95,color:'#6b5c38'},
    {id:'MLRS',label:'MLRS',icon:'🗺️',x:620,y:210,w:145,h:95,color:'#6b5c38'},
    {id:'Selection',label:'SELECTION SHED',icon:'🧤',x:405,y:205,w:165,h:105,color:'#496d51'},
    {id:'Packing',label:'PACKING',icon:'📦',x:215,y:210,w:145,h:95,color:'#496d51'},
    {id:'Traffic',label:'TRAFFIC',icon:'🚚',x:35,y:220,w:140,h:95,color:'#496d51'},
    {id:'CentralRegistry',label:'CENTRAL REGISTRY',icon:'📨',x:230,y:510,w:150,h:95,color:'#3f5c73'},
    {id:'CAB',label:'CAB / ACCOUNTS',icon:'📚',x:620,y:500,w:165,h:105,color:'#4f4d77'},
    {id:'SM',label:'S&M BRANCH',icon:'⏱️',x:805,y:520,w:85,h:85,color:'#4f4d77'},
    {id:'RPS',label:'R&PS / CRS',icon:'🗃️',x:905,y:500,w:170,h:105,color:'#4f4d77'},
    {id:'LAO',label:'LAO SCHEDULE',icon:'📑',x:1090,y:500,w:90,h:105,color:'#4f4d77',domainReviewOnly:true},
    {id:'Consignor',label:'CONSIGNOR',icon:'🏭',x:25,y:500,w:150,h:100,color:'#5a6d39'},
    {id:'Provision',label:'PROVISION',icon:'📈',x:35,y:45,w:140,h:90,color:'#3c5e7c'},
    {id:'TrafficReceipts',label:'TRAFFIC RECEIPTS',icon:'🚉',x:215,y:45,w:155,h:90,color:'#496d51'},
    {id:'ReceiptProgress',label:'RECEIPTS PROGRESS',icon:'📊',x:410,y:45,w:160,h:90,color:'#62577d'},
    {id:'ReceiptArea',label:'RECEIPTS AREA',icon:'🔍',x:610,y:45,w:150,h:90,color:'#496d51'},
    {id:'ReceiptLiaison',label:'RECEIPT LIAISON',icon:'🔗',x:800,y:45,w:150,h:90,color:'#526a88'},
    {id:'ReceiptControl',label:'RECEIPT CONTROL',icon:'🔢',x:990,y:45,w:165,h:90,color:'#62577d'},
    {id:'FPVRelease',label:'FPV RELEASE',icon:'📤',x:990,y:210,w:150,h:95,color:'#6b5c38'},
    {id:'DuesOutSuspense',label:'DUES-OUT SUSPENSE',icon:'⏳',x:780,y:210,w:170,h:95,color:'#6b5c38'},
    {id:'BulkStore',label:'BULK / DETAIL STORE',icon:'🏬',x:550,y:210,w:180,h:95,color:'#496d51'},
    {id:'ReceiptDiscrepancy',label:'RECEIPT DISCREPANCY',icon:'⚠️',x:310,y:210,w:185,h:95,color:'#774653'},
    {id:'DAO',label:'DAO DISCREPANCY',icon:'⚖️',x:75,y:210,w:175,h:95,color:'#774653'}
  ];

  const officeNames={
    Issue:{
      DemandingUnit:'Demanding unit / indenter',HQ:'Headquarters Section',ISS:'Indent Sorting Section',ULC:'Unit Location Cell',IndentChecking:'Indent Checking Section',ICR:'Control Registry',VoucherPrep:'Voucher Preparation Section',SDIC:'Sub Depot Issue Control',DOC:'Dues Out Control',MLRS:'Master Location Record Section',Selection:'Selection of Stores',Packing:'Packing Section',Traffic:'Traffic Branch Issue Section',CentralRegistry:'Central Registry',CAB:'Central Account Branch',SM:'S&M Branch',RPS:'Central Records Section / Records and Progress Section',LAO:'Local Audit Officer'
    },
    Receipt:{
      Consignor:'Consignor',CentralRegistry:'Central Registry',Provision:'Provision Branch',TrafficReceipts:'Traffic Branch (Receipts)',ReceiptProgress:'Sub Depot/Group Receipts Progress Section',ReceiptArea:'Sub Depot/Group Receipts Area',ReceiptLiaison:'Receipts Liaison Section',ReceiptControl:'Receipts Control Registry',MLRS:'Master Location Records Section',DOC:'Dues Out Review Cell (DOC)',FPVRelease:'Further Part Voucher Release Cell (DOC)',DuesOutSuspense:'Dues Out Suspense Area',BulkStore:'Bulk/Detail Store House / Area',Packing:'Packing Section — Issue Procedure hand-off',ReceiptDiscrepancy:'Sub Depot/Group Receipts Office Discrepancy Section',DAO:'Depot Accounts Officer — Central Discrepancy Section',CAB:'Central Accounts Branch',RPS:'Records and Progress Section / Central Record Section'
    }
  };

  const officeWhy = {
    DemandingUnit:'The user unit originates the authorised requirement and, at the end, receives or acknowledges the issue.',
    HQ:'HQ Section date-stamps the demanding document and introduces it into the depot system.',
    ISS:'ISS separates static and non-static demands, sorts them sub-depot-wise and catalogue-wise, and initiates progress.',
    ULC:'ULC confirms the location of a non-static unit before the demand proceeds.',
    IndentChecking:'Indent Checking removes incorrect or inadmissible demands before issue control.',
    ICR:'Issue Control Registry allots the depot control number and splits the IRPS original and duplicate.',
    VoucherPrep:'Voucher Preparation converts the approved demand into the required issue-voucher copies.',
    SDIC:'SDIC is the nerve centre for watching progress in the Sub Depot and actively hastening delay.',
    DOC:'DOC reviews the issue-side position before execution continues.',
    MLRS:'MLRS marks the exact shed/location so Selection can find the item quickly.',
    Selection:'Selection physically picks the authorised stores and causes the crucial copy split.',
    Packing:'Packing identifies the consignment, places IV2 in Package No.1 and returns IV5 to SDIC.',
    Traffic:'Traffic prepares transit documents, despatches stores and sends despatch details on IV6 to records.',
    CentralRegistry:'Central Registry despatches the completed Schedule of Indents back to the indenting unit.',
    CAB:'CAB posts the issue on the ledger using IV4, files IV4, and schedules IV3 to LAO.',
    SM:'S&M Branch records Issue Time Check from IV6 and returns it to R&PS/CRS.',
    RPS:'R&PS/CRS links Demand, IV2, IV5 and IV6 on the original IRPS and files each copy correctly.',
    LAO:'The scheduled accounts copy is forwarded through the prescribed monthly list.'
    ,Consignor:'The consignor sends the advance issue voucher and ultimately receives the receipted RV2 or discrepancy case.',
    Provision:'Provision Branch marks dues-in on the advance voucher, later inks the entry from RV2, and sends it toward return.',
    TrafficReceipts:'Traffic Receipts registers transit papers, receives packages and prepares the Daily Receipt Sheet.',
    ReceiptProgress:'Receipts Progress links documents and actively watches clearance through the DRS register and RCRS.',
    ReceiptArea:'Receipts Area first receives packages with DRS1–3 and extracts RV2. After RV1/RV2/DRS2 are married and controlled, it checks the stores; only later, after Liaison prepares RN&DOR slips following MLRS/DOC review, does it distribute the stores.',
    ReceiptLiaison:'Receipt Liaison marries RV2, DRS2 and the advance RV1, obtains control, gathers location/dues-out data and prepares RN&DOR slips.',
    ReceiptControl:'Receipt Control allots the receipt control number using three RCRS copies.',
    FPVRelease:'The Further Part Voucher Release Cell extracts dues-out vouchers and releases them when RN&DOR evidence arrives.',
    DuesOutSuspense:'Dues-out stores wait in suspense bins until further-part vouchers authorise release.',
    BulkStore:'Bulk/Detail Store bins or stacks stores, posts the bin card and returns receipted RN&DOR evidence.',
    ReceiptDiscrepancy:'The Sub-Depot discrepancy section prepares the discrepancy report and adjustment vouchers.',
    DAO:'DAO controls, progresses and settles discrepancy cases and carrier claims.'
  };

  const issueOfficeSource='RAOS Part II para 190; DGOSTI-002 office procedures (supplied local editions)';
  const receiptOfficeSource='RAOS Part II paras 134–146; DGOSTI-001 Appendices A–Q (supplied local editions)';
  const intel=(role,actions,situations,deviations,memory,source)=>({role,actions,situations,deviations,memory,source});
  const officeIntel={
    Issue:{
      DemandingUnit:intel('Originating user unit and final consignee',['Raise an authorised demand with correct identity, entitlement and stores requirement.','On receipt, check the consignment and sign/date the prescribed acknowledgement.'],['The route begins here as a requirement and may return here as stores plus IV2.'],['Never replace an authorised demand with a verbal request.','A discrepancy at receipt must be reported; acceptance must not erase the evidence.'],'AUTHORISE → RECEIVE → ACKNOWLEDGE',issueOfficeSource),
      HQ:intel('Depot entry and date-stamping point',['Receive and date-stamp the demanding document.','Introduce it into the formal depot control stream.'],['Applies before ISS sorting and technical/control processing.'],['Do not send an unregistered demand directly to Selection or Packing.'],'STAMP BEFORE SORT',issueOfficeSource),
      ISS:intel('Issue Services sorting and progress initiation',['Separate static and non-static unit demands.','Sort by Sub-Depot and catalogue sequence; establish the IRPS control medium.'],['Non-static demand requires ULC verification; static demand bypasses that detour.'],['Do not treat the Issues Control Sheet as an invented third form: the supplied material identifies the two-copy IRPS.'],'SORT → STATIC? → IRPS',issueOfficeSource),
      ULC:intel('Unit-location verification for non-static units',['Confirm the current unit location.','Stamp/return the verified demand to Indent Checking.'],['Used only for non-static units in the normal route.'],['Static-unit demands do not need this detour.','ULC verifies location; it neither selects nor accounts for stores.'],'NON-STATIC = LOCATION CHECK',issueOfficeSource),
      IndentChecking:intel('Admissibility and correctness gate',['Check authority, nomenclature, unit identity, entitlement and completeness.','Pass correct demands to Issue Control.'],['Incorrect or inadmissible demands are returned/corrected before control.'],['Never allot control or begin physical selection while essential demand particulars are defective.'],'CHECK BEFORE CONTROL',issueOfficeSource),
      ICR:intel('Depot issue-control registry',['Allot the depot control number.','Split IRPS original to R&PS/CRS and duplicate with the demand toward execution.'],['The Schedule of Indents carries control-number intimation back to the demanding unit.'],['Both IRPS copies must not travel together; their separate progress purposes are essential.'],'NUMBER → SPLIT → WATCH',issueOfficeSource),
      VoucherPrep:intel('Issue Voucher preparation',['Convert the controlled demand into the prescribed Issue Voucher set.','Preserve copy identity so later Selection, Packing, Accounts and acknowledgement actions remain distinct.'],['The normal teaching route uses IV1–IV6, each with its own lifecycle.'],['Never merge copies merely because they contain similar entries.'],'ONE DEMAND → SIX PURPOSES',issueOfficeSource),
      SDIC:intel('Sub-Depot progress-control nerve centre',['Receive and progress the execution papers.','Watch delays and hasten outstanding action.','Receive the IV3/IV4 return from Selection and IV5 from Packing.'],['Coordinates normal execution and copy-specific returns.'],['SDIC watches progress; it does not replace physical selection, packing or account posting.'],'WATCH EVERY SPLIT',issueOfficeSource),
      DOC:intel('Dues-out/issue-position review',['Review the issue-side position before execution continues.','Mark the quantities/position that affect issue action.'],['A dues-out or restricted position changes what can continue to execution.'],['Do not bypass the review merely because MLRS already knows the location.'],'POSITION BEFORE LOCATION',issueOfficeSource),
      MLRS:intel('Material-location reference service',['Confirm section, catalogue/part details and designation.','Mark the exact shed/rack location for Selection.'],['Location must correspond to the authorised item, not a similar description.'],['MLRS locates; it does not physically pick or post stock.'],'MAP IT BEFORE MOVING IT',issueOfficeSource),
      Selection:intel('Physical picking and stock-location control',['Pick the authorised item and quantity from the marked location.','Post the relevant bin card and initiate replenishment action when prescribed.','Split IV3/IV4 back to SDIC; send IV1/IV2/IV5/IV6 with stores to Packing.'],['Not-available or partial availability must remain visible in the records.'],['Never send all six IV copies with the stores.','A wrong item/location breaks both custody and accounting.'],'PICK → POST → 3/4 BACK',issueOfficeSource),
      Packing:intel('Package formation and packing evidence',['Check stores against issue papers and form packages.','Place IV2 in Package No. 1.','Create Packing Note original per package, retain duplicate, return IV5 to SDIC and hand packages with IV1/IV6 to Traffic.'],['Multiple packages each need their own original Packing Note and cross-reference.'],['IV5 does not travel to the consignee in the approved route.','Packing Note duplicate remains in the bound Packing record.'],'IV2 IN ONE; IV5 BACK',issueOfficeSource),
      Traffic:intel('Despatch and transit custody',['Take over packages against Packing Completion Advice.','Prepare the applicable road, rail, postal, convoy or local-collection evidence.','Record despatch particulars on IV6 and control return acknowledgements where prescribed.'],['Transit document set depends on transport mode.','Local issue/convoy routes require acknowledgement-return control.'],['Do not invent one universal transit form.','Never despatch without custody and register evidence.'],'MODE DECIDES PAPER TRAIL',issueOfficeSource),
      CentralRegistry:intel('Outgoing registry for control-number intimation',['Despatch the completed Schedule of Indents to the demanding unit.','Preserve registry evidence of outward transmission.'],['Used when the controlled schedule/intimation leaves the depot.'],['This return is information/control closure; it must not restart store selection.'],'CONTROL NUMBER GOES HOME',issueOfficeSource),
      CAB:intel('Central Accounts Branch',['Post the issue from IV4 to the account card, record reference, initial/date and check.','File IV4 and schedule IV3 to LAO.'],['IV3 and IV4 arrive together from the SDIC/Selection return split.'],['Post from IV4, not IV3.','IV3 leaves through the LAO schedule; IV4 is the CAB evidence.'],'4 POSTS; 3 TO AUDIT',issueOfficeSource),
      SM:intel('Stocktaking and Monitoring time-check point',['Record Issue Time Check from IV6.','Return IV6 to R&PS/CRS for unit-pad closure.'],['Used after despatch details have been entered on IV6.'],['Do not retain IV6 permanently here; its final linkage is with the demand/unit pad.'],'TIME-CHECK, THEN RETURN',issueOfficeSource),
      RPS:intel('Records and Progress / Central Records control',['Maintain original IRPS central progress.','Link and file Demand, returned IV2, IV5 and IV6 according to their distinct purposes.','Hasten overdue acknowledgement and close completed unit pads.'],['IV2 is the consignee acknowledgement; IV5 is packing-progress/LAO; IV6 carries despatch/time-check evidence.'],['Do not interchange IV2 and IV5 despite the isolated DGOSTI-002 para 213(n) wording; the disclosed source-qualified ruling governs the game.'],'LINK, HASTEN, CLOSE',issueOfficeSource),
      LAO:intel('Scheduled audit destination',['Receive the prescribed accounts copy through the monthly skeleton/supplementary list.','Maintain the scheduled audit trail.'],['IV3 is the normal accounts/audit schedule copy; the approved IV5 route also carries its cited LAO scheduling action.'],['Never place an LAO-scheduled copy inside Package No. 1.'],'SCHEDULE, DON’T PACK',issueOfficeSource)
    },
    Receipt:{
      Consignor:intel('Originator of receipt papers and recipient of acknowledgement',['Send the advance issue voucher/receipt authority.','Receive the receipted RV2 or the progressed discrepancy case.'],['CRV/CTC exceptions arise when prescribed vouchers are absent and require their own evidence trail.'],['Do not treat silence from the consignor as clearance of a missing voucher or discrepancy.'],'SEND AUTHORITY; RECEIVE PROOF',receiptOfficeSource),
      CentralRegistry:intel('Receipt-paper entry and outward dispatch registry',['Date-stamp incoming receipt papers.','Send transit papers to Traffic Receipts and the advance voucher to Provision.','Dispatch cleared CTC/return papers when prescribed.'],['Normal advance papers and later CTC return use different directions through the registry.'],['Do not send every paper to one office; transit and voucher streams split here.'],'STAMP → SPLIT THE STREAMS',receiptOfficeSource),
      Provision:intel('Dues-in control',['Mark dues-in from the advance voucher.','Later ink/clear the entry from receipted RV2 and pass it toward R&PS/CRS return.'],['If the stores copy is delayed, the advance copy remains the dues-in watch.'],['Provision does not physically receive stores or post the account card.'],'PENCIL WATCH → INK CLEAR',receiptOfficeSource),
      TrafficReceipts:intel('Transit-paper and package reception',['Register RR/PWB or applicable transit papers.','Inspect package condition and take custody.','Prepare separate three-copy DRS sets by consignment/Sub-Depot grouping.'],['Damaged, short or suspect packages preserve carrier/discrepancy evidence.'],['Do not combine unrelated consignments on one DRS.','DRS1 must return to Traffic for filing with transit evidence.'],'REGISTER → INSPECT → 3 DRS',receiptOfficeSource),
      ReceiptProgress:intel('Central receipt-progress watch',['Link advance/stores documents.','Progress clearance through the DRS Register and RCRS.','File DRS2 and maintain exception traps/hastening.'],['CRV and CTC cases require linking, trap copies and escalation/destruction rules.'],['Never close progress merely because stores arrived; document and posting evidence must also clear.'],'LINK EVERY ARRIVAL',receiptOfficeSource),
      ReceiptArea:intel('Physical opening, checking and distribution',['Open/check packages against RV/DRS for designation, quantity and condition.','Distribute stores on RN&DOR evidence.'],['Shortage, damage, excess or wrong stores branch to discrepancy control.','Stores without vouchers branch to CRV procedure.'],['Do not merge discrepant stores into normal stock.','Physical check cannot be replaced by paperwork alone.'],'OPEN → CHECK → BRANCH',receiptOfficeSource),
      ReceiptLiaison:intel('Document-marriage and movement coordination',['Extract RV2 from Package No. 1 and link RV2, DRS2 and advance RV1.','Obtain control/location/dues-out decisions.','Prepare and clear RN&DOR evidence.'],['Bulk and dues-out stores take different RN&DOR routes.'],['Do not lose copy identity while linking.','Dues-out movement needs release evidence before Packing.'],'MARRY PAPERS; ROUTE STORES',receiptOfficeSource),
      ReceiptControl:intel('Receipt control-number registry',['Allot the receipt control number.','Prepare/split RCRS1 to Receipts Progress, RCRS2 to R&PS/CRS and RCRS3 to CAB.'],['CTC/CRV status must be marked in control remarks.'],['Never send all three RCRS copies to the same holder.'],'ONE NUMBER; THREE WATCHERS',receiptOfficeSource),
      MLRS:intel('Receipt-side location validation',['Check section, part/catalogue number and designation.','Mark the shed/area location on RV1.'],['Location data directs later Bulk/Detail Store movement.'],['MLRS does not decide dues-out quantities or post the receipt.'],'IDENTIFY → LOCATE',receiptOfficeSource),
      DOC:intel('Dues-out review on receipt',['Review RV1 against Dues Out Cards.','Mark quantities requiring further-part release.'],['A receipt may split between normal stock and dues-out suspense.'],['Do not send all received stores to bulk stock when dues-out liabilities exist.'],'CHECK LIABILITIES BEFORE BINNING',receiptOfficeSource),
      FPVRelease:intel('Further Part Voucher release cell',['Extract authorised further-part vouchers.','Release dues-out stores when RN&DOR evidence and authority agree.'],['Release occurs only for the authorised quantity/location.'],['Never release from suspense merely because the stores are physically available.'],'AUTHORITY UNLOCKS SUSPENSE',receiptOfficeSource),
      DuesOutSuspense:intel('Controlled temporary holding for dues-out stores',['Hold identified dues-out stores separately.','Release them to Packing only against authorised further-part vouchers.'],['Partial release leaves the balance under suspense control.'],['Suspense stock must not be mixed with normal available stock.'],'HOLD → AUTHORISE → RELEASE',receiptOfficeSource),
      BulkStore:intel('Normal stock binning and stock-record update',['Bin or stack cleared stores.','Post the bin card with receipt reference and quantity.','Return receipted RN&DOR evidence to Liaison.'],['Location and storage form depend on the material and marked shed/area.'],['Binning without bin-card/RN&DOR evidence leaves receipt unclosed.'],'BIN → POST → RETURN PROOF',receiptOfficeSource),
      Packing:intel('Issue-side handover point for released dues-out stores',['Accept released dues-out stores with the prescribed IV/further-part voucher set.','Continue them through the Issue packing stream.'],['This Receipt-map visit occurs only after dues-out authority releases the stores.'],['Do not send normal bulk-stock receipts to Packing.'],'DUES-OUT RELEASE REJOINS ISSUE',receiptOfficeSource),
      ReceiptDiscrepancy:intel('Sub-Depot discrepancy preparation',['Prepare the discrepancy report and adjustment vouchers.','Keep the physical and documentary discrepancy identifiable.'],['Shortage, excess, damage, wrong item and carrier cases require the applicable evidence.'],['Never “correct” records by silently absorbing a discrepancy into normal stock.'],'ISOLATE → DOCUMENT → ADJUST',receiptOfficeSource),
      DAO:intel('Discrepancy control and settlement',['Allot discrepancy/adjustment control numbers.','Progress the case, carrier claim or settlement and return sanctioned action.'],['Carrier liability and accounting adjustment may proceed on related but distinct evidence.'],['No adjustment posting without authorised control and settlement evidence.'],'CONTROL THE EXCEPTION',receiptOfficeSource),
      CAB:intel('Receipt account posting and accounting control',['Post RV1/approved adjustment to the account card.','Record reference, date and poster/checker evidence; file the posting voucher.','Use RCRS3 to watch outstanding posting.'],['CRV may be posted pending later regular-voucher linking; duplicate posting must be prevented.'],['Never post both CRV and later regular voucher as separate receipts.'],'POST ONCE; PROVE TWICE',receiptOfficeSource),
      RPS:intel('Receipt records, acknowledgement and exception progress',['Use RCRS2 to progress DRS3 and receipted RV2.','Forward cleared RV2 to the consignor.','Control CRV/CTC linking, destruction/conversion or escalation.'],['Unlinked CRV reaches the prescribed six-month escalation path; CTC trap closes on regular-copy linking.'],['Do not destroy exception evidence before the prescribed linking or escalation condition is met.'],'PROGRESS → RETURN → CLOSE',receiptOfficeSource)
    }
  };

  const mapLayouts={
    Issue:{
      HQ:{x:20,y:35,w:165,h:90},SDIC:{x:215,y:35,w:165,h:90},CAB:{x:410,y:35,w:165,h:90},ULC:{x:605,y:35,w:165,h:90},Traffic:{x:800,y:35,w:165,h:90},VoucherPrep:{x:995,y:35,w:165,h:90},
      Selection:{x:20,y:205,w:165,h:95},ICR:{x:215,y:205,w:165,h:95},LAO:{x:410,y:205,w:165,h:95},ISS:{x:605,y:205,w:165,h:95},MLRS:{x:800,y:205,w:165,h:95},CentralRegistry:{x:995,y:205,w:165,h:95},
      RPS:{x:20,y:525,w:165,h:100},Packing:{x:215,y:525,w:165,h:100},DemandingUnit:{x:410,y:525,w:165,h:100},SM:{x:605,y:525,w:165,h:100},IndentChecking:{x:800,y:525,w:165,h:100},DOC:{x:995,y:525,w:165,h:100}
    },
    Receipt:{
      ReceiptArea:{x:20,y:35,w:165,h:90},Provision:{x:215,y:35,w:165,h:90},RPS:{x:410,y:35,w:165,h:90},TrafficReceipts:{x:605,y:35,w:165,h:90},DuesOutSuspense:{x:800,y:35,w:165,h:90},ReceiptControl:{x:995,y:35,w:165,h:90},
      CAB:{x:20,y:205,w:165,h:95},ReceiptLiaison:{x:215,y:205,w:165,h:95},DAO:{x:410,y:205,w:165,h:95},MLRS:{x:605,y:205,w:165,h:95},Consignor:{x:800,y:205,w:165,h:95},FPVRelease:{x:995,y:205,w:165,h:95},
      ReceiptProgress:{x:20,y:525,w:165,h:100},Packing:{x:215,y:525,w:165,h:100},BulkStore:{x:410,y:525,w:165,h:100},CentralRegistry:{x:605,y:525,w:165,h:100},ReceiptDiscrepancy:{x:800,y:525,w:165,h:100},DOC:{x:995,y:525,w:165,h:100}
    }
  };

  const routes = {
    demand:['DemandingUnit','HQ','ISS','ULC','IndentChecking','ICR','VoucherPrep','RPS'],
    irpsOriginal:['ICR','RPS'],
    irpsDuplicate:['ISS','ULC','IndentChecking','ICR','VoucherPrep','SDIC','DOC','MLRS','SDIC'],
    scheduleOfIndents:['ISS','IndentChecking','ICR','CentralRegistry','DemandingUnit'],
    iv1:['VoucherPrep','SDIC','DOC','MLRS','Selection','Packing','Traffic','DemandingUnit'],
    iv2:['VoucherPrep','SDIC','DOC','MLRS','Selection','Packing','Traffic','DemandingUnit','RPS'],
    iv3:['VoucherPrep','SDIC','DOC','MLRS','Selection','SDIC','CAB','LAO'],
    iv4:['VoucherPrep','SDIC','DOC','MLRS','Selection','SDIC','CAB'],
    iv5:['VoucherPrep','SDIC','DOC','MLRS','Selection','Packing','SDIC','RPS','LAO'],
    iv6:['VoucherPrep','SDIC','DOC','MLRS','Selection','Packing','Traffic','RPS','SM','RPS'],
    packingNoteDuplicate:['Packing'],
    packingCompletionOriginal:['Packing','Traffic'],
    packingCompletionDuplicate:['Packing'],
    railwayReceipt:['Traffic','DemandingUnit'],
    parcelWayBill:['Traffic','DemandingUnit'],
    trafficRegister:['Traffic'],
    localIssueRegister:['Traffic'],
    postalIssueRegister:['Traffic'],
    stores:['Selection','Packing','Traffic','DemandingUnit'],
    eachPackage:['Packing','Traffic','DemandingUnit'],
    packageOneWithIv2:['Packing','Traffic','DemandingUnit'],
    accountCardPosting:['CAB'],
    binCardSelection:['Selection'],
    unitPadBundle:['RPS']
  };
  Object.assign(routes,{
    issuesControlSheet:['ISS','IndentChecking','ICR','RPS'],packingNoteOriginal:['Packing'],roadTransit:['Traffic','DemandingUnit','Traffic'],railTransit:['Traffic','DemandingUnit'],postalTransit:['Traffic','DemandingUnit'],localIssueTransit:['Traffic','DemandingUnit','Traffic'],convoyDocument:['Traffic','DemandingUnit','Traffic'],collectionDocument:['Packing','Traffic'],receiptedAcknowledgement:['DemandingUnit','RPS']
  });

  const branchRoutes = {
    iv1:['Packing','Traffic','DemandingUnit'],
    iv2:['Packing','Traffic','DemandingUnit','RPS'],
    iv3:['SDIC','CAB','LAO'],
    iv4:['SDIC','CAB'],
    iv5:['Packing','SDIC','RPS','LAO'],
    iv6:['Packing','Traffic','RPS','SM','RPS'],
    stores:['Packing','Traffic','DemandingUnit']
  };

  const legacy = {
    demand:{name:'Demanding document / indent',icon:'🪖',state:'Authorised requirement',finalDisposition:'Unit pad (prototype assertion)',closureProof:'Filed demanding document (primary citation required)'},
    irpsOriginal:{name:'IRPS Original',icon:'🗃️',state:'R&PS/CRS master progress copy',finalDisposition:'R&PS/CRS progress record (prototype assertion)',closureProof:'Central progress record (primary citation required)'},
    irpsDuplicate:{name:'IRPS Duplicate',icon:'📋',state:'Sub Depot progress copy',finalDisposition:'SDIC progress custody (prototype assertion)',closureProof:'End state not established in supplied primary material'},
    iv1:{name:'IV Copy No. 1',icon:'📄',state:'Consignee / despatch copy',finalDisposition:'Consignee custody (prototype assertion)',closureProof:'End disposal not established in supplied primary material'},
    iv2:{name:'IV Copy No. 2',icon:'📜',state:'Package and acknowledgement copy',finalDisposition:'R&PS/CRS control-number file (prototype assertion)',closureProof:'Receipted IV2 filed (primary citation required)'},
    iv3:{name:'IV Copy No. 3',icon:'📃',state:'LAO schedule copy',finalDisposition:'LAO on skeleton/supplementary skeleton list',closureProof:'CAB Accounts Register records receipt and scheduling'},
    iv4:{name:'IV Copy No. 4',icon:'📘',state:'CAB ledger-posting copy',finalDisposition:'CAB filing section in control/sub-depot serial order',closureProof:'Posting evidence and Accounts Register posting date'},
    iv5:{name:'IV Copy No. 5',icon:'🟨',state:'Packing-progress and LAO copy',finalDisposition:'LAO via R&PS/CRS (primary text has a receipted-copy conflict)',closureProof:'Skeleton-list scheduling; receipted-copy identity requires review'},
    iv6:{name:'IV Copy No. 6',icon:'🧭',state:'Despatch-detail and Issue Time Check copy',finalDisposition:'Unit pad with relevant indent after S&M time check',closureProof:'IRPS marked and IV6 filed in unit pad'},
    stores:{name:'Physical stores / consignment',icon:'📦',state:'Selected stores for the user unit',finalDisposition:'Demanding unit (prototype assertion)',closureProof:'Physical acceptance (primary citation required)'}
  };

  const rosterSource = 'docs/ISSUE_DOCUMENT_ROSTER.md';
  const raos190 = 'doc 2 main remove/RAOS Part II.pdf — Chapter 5, para 190 (PDF pp.83–85)';
  const dgosBroad = 'doc 2 main remove/DGOS/DGOS TI 002 ISSUE PROCEDURE NORMAL.pdf — paras 2–16 (PDF pp.6–8)';
  const review = (id, name, group, icon, note) => ({
    id,procedure:'Issue',name,group,icon,playable:false,reviewPlayable:true,routeStatus:'domain-review',route:null,spawnPoint:null,finalDisposition:null,closureProof:null,
    companion:null,waitingElsewhere:null,sourceRefs:[rosterSource],primarySourceRefs:[],reviewNote:note || 'Complete route, state changes, companions, final disposal and primary-source paragraph/page are not present in the supplied repository.'
  });
  const playable = (id, group) => ({
    id,procedure:'Issue',group,...legacy[id],playable:true,routeStatus:'legacy-domain-review',route:routes[id],spawnPoint:routes[id][0],
    companion:'Scenario-dependent; existing prototype behavior preserved.',waitingElsewhere:'Not completely established in supplied primary material.',
    sourceRefs:[rosterSource,'Legacy prototype index.html (pre-refactor behavior)'],primarySourceRefs:[],
    reviewNote:'Playable only to preserve current gameplay. Every route transition and disposal remains unapproved until RAOS Part II or DGOSTI-002 paragraph/page support is recorded.'
  });
  const approved = (id,name,group,icon,route,finalDisposition,closureProof,primarySourceRefs,extra={}) => ({
    id,procedure:'Issue',name,group,icon,playable:true,routeStatus:'approved',route,spawnPoint:route[0],finalDisposition,closureProof,
    companion:extra.companion||`${name} follows its declared copy-specific route.`,waitingElsewhere:extra.waitingElsewhere||'Concurrent copies remain at their separately declared lifecycle positions.',
    sourceRefs:[rosterSource,...primarySourceRefs],primarySourceRefs,reviewNote:extra.reviewNote||'Primary-source route approved from the supplied local editions.'
  });

  const characters = [
    approved('demand','Demanding document / indent','Demand and control documents','🪖',routes.demand,'R&PS/CRS unit pad','Indent linked to IV6/delay memo and pad marked complete',[raos190,'DGOSTI-002 paras 20–29, 50–57, 66–70, 77–89, 211–213 (PDF pp.9–23, 51–52)']),
    approved('irpsOriginal','IRPS Original','Demand and control documents','🗃️',routes.irpsOriginal,'R&PS/CRS monthly Sub-Depot/Group pad','Filed in numerical sequence and marked as documents arrive',[raos190,'DGOSTI-002 paras 28, 66–70, 210–214 (PDF pp.10, 19–20, 51–53)']),
    approved('irpsDuplicate','IRPS Duplicate','Demand and control documents','📋',routes.irpsDuplicate,'SDIC monthly folder','Receipt and return crossed on checklist; IRPS filed serially',[dgosBroad,'DGOSTI-002 paras 28, 41, 51, 67–69, 77, 88, 91–92, 101–116 (PDF pp.10–31)']),
    approved('scheduleOfIndents','Schedule of Indents / control-number intimation','Demand and control documents','🔢',routes.scheduleOfIndents,'Returned to indenting unit through Central Registry','Control numbers completed; Central Registry despatch',[dgosBroad,'DGOSTI-002 paras 51, 56, 67–70 (PDF pp.15–20)']),
    approved('issuesControlSheet','IRPS control medium (Issues Control Sheet equivalent)','Demand and control documents','📊',routes.issuesControlSheet,'R&PS/CRS monthly IRPS pad','Original IRPS carries central progress columns while the duplicate supports Sub-Depot progress',[raos190,'DGOSTI-002 paras 28, 51, 66–70 and 210–214 (PDF pp.10, 15, 19–20, 51–53)','Issue Procedure deck slides 43, 49–50 and 81 (secondary clarification)'],{companion:'The duplicate IRPS travels with the controlled demands to Voucher Preparation and SDIC.',waitingElsewhere:'The original IRPS remains the central R&PS/CRS progress medium.',reviewNote:'The roster label is treated as the IRPS equivalent shown in the supplied 2022 Issue Procedure deck, not as a separate invented third sheet.'}),
    approved('iv1','IV Copy No. 1','Issue Voucher characters','📄',routes.iv1,'Consignee','Traffic Register records date IV1 was sent and stores despatched',[raos190,'DGOSTI-002 paras 141–177 (PDF pp.36–43)']),
    approved('iv2','IV Copy No. 2','Issue Voucher characters','📜',routes.iv2,'R&PS/CRS control-number file after return from consignee','No. 2 return is progressed on the IRPS and filed in control-number order',[raos190,'RAOS Part II para 190(m),(q) (PDF pp.84–85)','DGOSTI-002 broad principles paras 12–16 and paras 147, 210–213(m) (PDF pp.7–8, 36, 51–52)','Issue Procedure deck slides 60 and 62–64 (secondary clarification)'],{companion:'IV2 travels inside Package No. 1 and returns receipted for R&PS/CRS control.',waitingElsewhere:'IV5 follows its independent packing-progress and LAO schedule route.',reviewNote:'Source-qualified ruling: RAOS para 190, DGOSTI-002 broad principles and the 2022 deck converge on returned IV2. DGOSTI-002 para 213(n) alone says IV5; that isolated internal inconsistency remains recorded in the source map.'}),
    approved('iv3','IV Copy No. 3','Issue Voucher characters','📃',routes.iv3,'LAO on skeleton/supplementary skeleton list','Accounts Register receipt and monthly scheduling',[raos190,'DGOSTI-002 paras 95, 200–205 (PDF pp.26, 49–50)']),
    approved('iv4','IV Copy No. 4','Issue Voucher characters','📘',routes.iv4,'CAB filing section','Posting evidence checked; filed in control/sub-depot serial order',[raos190,'DGOSTI-002 paras 95, 194–199 (PDF pp.26, 48–49)']),
    approved('iv5','IV Copy No. 5','Issue Voucher characters','🟨',routes.iv5,'LAO via the prescribed skeleton/supplementary list','Packing date is progressed on IRPS before monthly LAO scheduling',[raos190,'RAOS Part II para 190(o),(q) (PDF pp.84–85)','DGOSTI-002 paras 15–16, 96, 154, 204 and 213(d–j) (PDF pp.8, 26, 37, 50–52)','Issue Procedure deck slides 61–63 (secondary clarification)'],{companion:'IV5 returns from Packing to SDIC, then R&PS/CRS holds it for LAO scheduling.',waitingElsewhere:'IV2 remains with Package No. 1 and supplies the returned consignee acknowledgement.',reviewNote:'Source-qualified ruling: the independent IV5 route to LAO is consistent across RAOS, DGOSTI-002 and the 2022 deck. DGOSTI-002 para 213(n) is retained as an identified internal anomaly.'}),
    approved('iv6','IV Copy No. 6','Issue Voucher characters','🧭',routes.iv6,'R&PS/CRS unit pad with relevant indent','Issue Time Check recorded by S&M and IV6 returned for filing',[raos190,'DGOSTI-002 paras 141, 151–152, 156–177, 213(e–g), 219–224 (PDF pp.36–43, 51–55)']),
    approved('packingNoteOriginal','Packing Note — Original for each package','Packing and traffic documents','🏷️',routes.packingNoteOriginal,'Enclosed in its corresponding package','Packing Note number cross-referenced on IV1, IV5 and IV6',[raos190,'DGOSTI-002 paras 142, 148 and 152 (PDF pp.35–37)']),
    approved('packingNoteDuplicate','Packing Note — Duplicate retained in book form','Packing and traffic documents','📒',routes.packingNoteDuplicate,'Packing Section bound book in numerical sequence','Signed/witnessed duplicate retained and filed',[raos190,'DGOSTI-002 paras 148, 153 (PDF pp.36–37)']),
    approved('packingCompletionOriginal','Packing Completion Advice — Original','Packing and traffic documents','✅',routes.packingCompletionOriginal,'Traffic file, serial order in pads of 100','Traffic representative receipt and collection recorded',[raos190,'DGOSTI-002 paras 155–164 (PDF pp.37–40)']),
    approved('packingCompletionDuplicate','Packing Completion Advice — Duplicate','Packing and traffic documents','☑️',routes.packingCompletionDuplicate,'Packing Section, serial order in pads of 100','Traffic representative signature on duplicate',[raos190,'DGOSTI-002 paras 155–156 (PDF pp.37–38)']),
    approved('roadTransit','Road dispatch document set','Packing and traffic documents','🚚',routes.roadTransit,'Traffic serial file after consignee acknowledgement','Convoy-note issue and return recorded in Convoy Note Register',[raos190,'DGOSTI-002 paras 170–180 (PDF pp.42–44)']),
    approved('railTransit','Rail dispatch document set','Packing and traffic documents','🚆',routes.railTransit,'Consignee receives the applicable RR/PWB, IV1 and convoy advice','Military Credit Note exchanged and RR/PWB details recorded',[raos190,'DGOSTI-002 paras 163–174 (PDF pp.40–43)']),
    approved('postalTransit','Postal dispatch document set','Packing and traffic documents','📮',routes.postalTransit,'Consignee receives IV1 or dispatch memo; Traffic retains postal evidence','Postal receipt posted in Postal Issues Register',[raos190,'DGOSTI-002 paras 161(b), 176 and 182–185 (PDF pp.40, 43–45)']),
    approved('localIssueTransit','Local-issue authority and collection record','Packing and traffic documents','🤝',routes.localIssueTransit,'Traffic Local Issues Register after authorised collection','Consignee representative signature closes collection',[raos190,'DGOSTI-002 paras 161(b) and 187–192 (PDF pp.40, 45–46)']),
    approved('railwayReceipt','Railway Receipt','Packing and traffic documents','🎫',routes.railwayReceipt,'Consignee with applicable convoy note and IV1','Railway Receipt checked against credit note and sent to consignee',[raos190,'DGOSTI-002 paras 173–175 (PDF pp.43)']),
    approved('parcelWayBill','Parcel Way Bill','Packing and traffic documents','🧾',routes.parcelWayBill,'Consignee with applicable convoy note and IV1','PWB exchanged for military credit note and sent to consignee',[raos190,'DGOSTI-002 paras 173–175 (PDF pp.43)']),
    approved('convoyDocument','Receipted Convoy Note lifecycle','Packing and traffic documents','🚛',routes.convoyDocument,'Traffic serial file after return from consignee/OC Station','Convoy Note Register return date and serial filing',[raos190,'DGOSTI-002 paras 170–180 (PDF pp.42–44)']),
    approved('collectionDocument','Package-collection acknowledgement','Packing and traffic documents','📥',routes.collectionDocument,'Traffic file with connected Packing Completion Advice','Traffic representative receipt, date and collection time',[raos190,'DGOSTI-002 paras 155–161 (PDF pp.37–40)']),
    approved('trafficRegister','Traffic register entry/state','Packing and traffic documents','📕',routes.trafficRegister,'Traffic Branch bound register','Collection, IV1 despatch, stores despatch and applicable receipt columns completed',[raos190,'DGOSTI-002 paras 164, 176–180 (PDF pp.40, 43–44)']),
    approved('localIssueRegister','Local-issue register state','Packing and traffic documents','📗',routes.localIssueRegister,'Traffic Local Issues Section bound register','Authorised representative signature and collection recorded',[raos190,'DGOSTI-002 paras 187–192 (PDF pp.45–46)']),
    approved('postalIssueRegister','Postal-issue register state','Packing and traffic documents','📙',routes.postalIssueRegister,'Traffic Postal Issue Section register','Postal receipt checked and posted against entry',[raos190,'DGOSTI-002 paras 182–185 (PDF pp.44–45)']),
    approved('stores','Physical stores / consignment','Physical and accounting entities','📦',routes.stores,'Demanding unit/consignee','Traffic record of despatch or local collection',[raos190,'DGOSTI-002 paras 128, 141–162 (PDF pp.33, 36–40)']),
    approved('eachPackage','Each physical package','Physical and accounting entities','📦',routes.eachPackage,'Demanding unit/consignee','Transit/collection record and package markings',[raos190,'DGOSTI-002 paras 141–162 (PDF pp.36–40)']),
    approved('packageOneWithIv2','Package No. 1 carrying IV2','Physical and accounting entities','1️⃣',routes.packageOneWithIv2,'Demanding unit/consignee','Package No.1 contains IV2 and is included in first batch',[raos190,'DGOSTI-002 paras 147, 169 (PDF pp.36, 41–42)']),
    approved('accountCardPosting','Account-card posting event','Physical and accounting entities','🧮',routes.accountCardPosting,'CAB account card and Accounts Register','Poster and checker initial/date IV4; account reference recorded',[raos190,'DGOSTI-002 paras 194–199 (PDF pp.48–49)']),
    approved('binCardSelection','Bin-card / stock-selection event','Physical and accounting entities','🗂️',routes.binCardSelection,'Selection shed bin card','Selected quantity posted and replenishment action triggered if required',[raos190,'DGOSTI-002 paras 121, 128–131 (PDF pp.32–33)']),
    approved('receiptedAcknowledgement','Receipted IV2 acknowledgement returning from consignee','Physical and accounting entities','✍️',routes.receiptedAcknowledgement,'R&PS/CRS control-number file','Returned IV2 is marked on the IRPS, hastened when overdue and filed by control number',[raos190,'RAOS Part II para 190(q) (PDF p.85)','DGOSTI-002 broad principles para 16 and paras 210–213(m) (PDF pp.8, 51–52)','Issue Procedure deck slides 62–64 (secondary clarification)'],{companion:'The acknowledgement is IV2, which travelled with Package No. 1.',waitingElsewhere:'IV5 is separately held and scheduled to LAO.',reviewNote:'The game follows the convergent RAOS/broad-procedure/training route for IV2 and visibly documents the isolated IV5 wording in DGOSTI-002 para 213(n).'}),
    approved('unitPadBundle','Unit pad file bundle','Physical and accounting entities','📁',routes.unitPadBundle,'R&PS/CRS unit-pad registry','Indent and matching IV6/delay records linked; pad marked COMPLETED',[raos190,'DGOSTI-002 paras 210–214 (PDF pp.51–53)'])
  ];

  const raosReceipt = 'doc 2 main remove/RAOS Part II.pdf — Receipt Procedure, paras 134–146 (PDF pp.63–74)';
  const dgosReceipt = 'doc 2 main remove/DGOS/DGOS TI 001 RECEIPT PROCEDURE.pdf — broad principles para 2 (PDF pp.7–10)';
  const receiptApproved = (id,name,group,icon,route,finalDisposition,closureProof,refs,extra={}) => ({
    id,procedure:'Receipt',name,group,icon,playable:true,routeStatus:'approved',route,spawnPoint:route[0],finalDisposition,closureProof,
    companion:extra.companion||`${name} follows its declared copy-specific route.`,waitingElsewhere:extra.waitingElsewhere||'Concurrent receipt copies remain at their separately declared lifecycle positions.',
    sourceRefs:[...refs],primarySourceRefs:refs,reviewNote:extra.reviewNote||'Cross-checked in supplied RAOS Part II and DGOSTI-001 editions.'
  });
  const receiptReview = (id,name,group,icon,note) => ({id,procedure:'Receipt',name,group,icon,playable:false,reviewPlayable:true,routeStatus:'domain-review',route:null,spawnPoint:null,finalDisposition:null,closureProof:null,companion:null,waitingElsewhere:null,sourceRefs:[dgosReceipt],primarySourceRefs:[],reviewNote:note});

  const receiptRoutes={
    advanceIssueVoucher:['Consignor','CentralRegistry','Provision','ReceiptProgress'],
    receiptVoucher1:['Consignor','CentralRegistry','Provision','ReceiptProgress','ReceiptLiaison','ReceiptControl','ReceiptArea','ReceiptLiaison','MLRS','DOC','FPVRelease','ReceiptLiaison','ReceiptProgress','CAB'],
    receiptVoucher2:['ReceiptArea','ReceiptLiaison','ReceiptProgress','ReceiptLiaison','ReceiptControl','ReceiptArea','ReceiptLiaison','ReceiptProgress','Provision','RPS','Consignor'],
    drs1:['TrafficReceipts','ReceiptArea','TrafficReceipts'],
    drs2:['TrafficReceipts','ReceiptArea','ReceiptLiaison','ReceiptProgress','ReceiptLiaison','ReceiptControl','ReceiptArea','ReceiptLiaison','ReceiptProgress'],
    drs3:['TrafficReceipts','ReceiptArea','ReceiptProgress','RPS'],
    rcrs1:['ReceiptControl','ReceiptProgress'],
    rcrs2:['ReceiptControl','RPS'],
    rcrs3:['ReceiptControl','CAB'],
    rndorBulk:['ReceiptLiaison','ReceiptArea','BulkStore','ReceiptLiaison'],
    rndorDuesOut:['ReceiptLiaison','FPVRelease','ReceiptArea','DuesOutSuspense','ReceiptLiaison'],
    receiptStoresBulk:['TrafficReceipts','ReceiptArea','BulkStore'],
    receiptStoresDuesOut:['TrafficReceipts','ReceiptArea','DuesOutSuspense','Packing'],
    binCardReceipt:['BulkStore'],
    receiptAccountPosting:['CAB'],
    discrepancyReport:['ReceiptArea','ReceiptDiscrepancy','DAO','ReceiptDiscrepancy','DAO','Consignor'],
    adjustmentVoucher:['ReceiptDiscrepancy','DAO','ReceiptDiscrepancy','CAB'],
    receiptedRv2:['ReceiptProgress','Provision','RPS','Consignor'],
    crvException:['ReceiptArea','ReceiptControl','ReceiptProgress','CAB','RPS','ReceiptProgress','CAB','RPS'],
    ctcException:['ReceiptProgress','ReceiptControl','ReceiptArea','ReceiptLiaison','ReceiptProgress','Provision','RPS','CentralRegistry','Consignor']
  };
  const receiptRouteVariants={
    receiptVoucher1NoDuesOut:['Consignor','CentralRegistry','Provision','ReceiptProgress','ReceiptLiaison','ReceiptControl','ReceiptArea','ReceiptLiaison','MLRS','DOC','ReceiptLiaison','ReceiptProgress','CAB'],
    receiptVoucher1DuesOut:receiptRoutes.receiptVoucher1
  };
  const characterFocusSwitches={rndorDuesOut:[1]};
  const legacyFullReceiptRoute=['Consignor','CentralRegistry','Provision','ReceiptProgress','TrafficReceipts','ReceiptArea','ReceiptLiaison','ReceiptProgress','ReceiptControl','ReceiptArea','ReceiptLiaison','MLRS','DOC','FPVRelease','ReceiptLiaison','ReceiptArea','BulkStore','ReceiptLiaison','ReceiptProgress','CAB','Provision','RPS','Consignor'];
  Object.assign(routes,receiptRoutes);
  characters.push(
    receiptApproved('advanceIssueVoucher','Advance copy of consignor’s Issue Voucher','Receipt control documents','📨',receiptRoutes.advanceIssueVoucher,'Receipt Progress consignor pad awaiting stores copy','Advance and stores copies linked',[raosReceipt,dgosReceipt,'DGOSTI-001 Appendix A–B (PDF pp.11–13)']),
    receiptApproved('receiptVoucher1','Receipt Voucher No. 1','Receipt Voucher characters','🟦',receiptRoutes.receiptVoucher1,'CAB filing after account-card posting','RCRS posting date and account reference recorded',[raosReceipt,dgosReceipt,'DGOSTI-001 Appendices D–O (PDF pp.25–53)'],{reviewNote:'DGOSTI-001 conditionality preserved: the no-dues-out route bypasses FPV Release; a dues-out quantity visits FPV Release before RV1 returns to Liaison.'}),
    receiptApproved('receiptVoucher2','Receipt Voucher No. 2','Receipt Voucher characters','🟩',receiptRoutes.receiptVoucher2,'Returned receipted to consignor','Provision inks dues-in; R&PS/CRS forwards receipted RV2',[raosReceipt,dgosReceipt,'DGOSTI-001 Appendix Q (PDF pp.56–58)']),
    receiptApproved('drs1','DRS Copy No. 1','Daily Receipt Sheet characters','1️⃣',receiptRoutes.drs1,'Traffic file with convoy note, serial order in pads of 100','Receipts Area acknowledgement and Traffic DRS Register clearance',[raosReceipt,'DGOSTI-001 Appendix C paras 7–9 (PDF pp.20–24)']),
    receiptApproved('drs2','DRS Copy No. 2','Daily Receipt Sheet characters','2️⃣',receiptRoutes.drs2,'Receipts Progress serial-number file in pads of 100','DRS Register columns completed and DRS3 annotated before DRS2 filing',[raosReceipt,'DGOSTI-001 Appendix D paras 5 and 7(b) (PDF pp.27, 29–30)','DGOSTI-001 Appendix F para 7 (PDF p.38)']),
    receiptApproved('drs3','DRS Copy No. 3','Daily Receipt Sheet characters','3️⃣',receiptRoutes.drs3,'R&PS/CRS file','Sub-Depot DRS Register shows DRS3 passed to R&PS/CRS',[raosReceipt,'DGOSTI-001 Appendix C para 9 and Appendix D (PDF pp.23–30)']),
    receiptApproved('rcrs1','RCRS Copy No. 1','Receipt Control Registration Sheet','📄',receiptRoutes.rcrs1,'Receipts Progress active control record','Receipt clearance dates completed',[raosReceipt,'DGOSTI-001 Appendix G (PDF pp.39–40)']),
    receiptApproved('rcrs2','RCRS Copy No. 2','Receipt Control Registration Sheet','📋',receiptRoutes.rcrs2,'R&PS/CRS progress record','Used to progress receipted RV2 and DRS3',[raosReceipt,'DGOSTI-001 Appendix G and Q (PDF pp.39–40, 56–58)']),
    receiptApproved('rcrs3','RCRS Copy No. 3','Receipt Control Registration Sheet','📊',receiptRoutes.rcrs3,'CAB active receipt-posting control','RV1 posting date completed',[raosReceipt,'DGOSTI-001 Appendix G and O (PDF pp.39–40, 51–53)']),
    receiptApproved('rndorBulk','RN&DOR Slip — Bulk/Detail route','RN&DOR characters','🏷️',receiptRoutes.rndorBulk,'Receipt Liaison control-number file','Receipted slip bears bin-card serial and returns after binning',[raosReceipt,'DGOSTI-001 Appendices F and M (PDF pp.36–38, 47–48)']),
    receiptApproved('rndorDuesOut','RN&DOR Slip — Dues-out route','RN&DOR characters','⏳',receiptRoutes.rndorDuesOut,'Receipt Liaison control-number file','Dues-out receipt/release evidence returned',[raosReceipt,'DGOSTI-001 Appendices F, K and L (PDF pp.36–38, 45–46)']),
    receiptApproved('receiptStoresBulk','Physical stores — stock route','Physical Receipt entities','📦',receiptRoutes.receiptStoresBulk,'Binned/stacked in Bulk or Detail Store','Bin card posted and RN&DOR receipted',[raosReceipt,dgosReceipt]),
    receiptApproved('receiptStoresDuesOut','Physical stores — dues-out release route','Physical Receipt entities','📤',receiptRoutes.receiptStoresDuesOut,'Packing Section under released further-part vouchers','RN&DOR and further-part voucher release evidence',[raosReceipt,dgosReceipt]),
    receiptApproved('binCardReceipt','Receipt bin-card posting event','Physical Receipt entities','🗂️',receiptRoutes.binCardReceipt,'Bulk/Detail Store bin card','Quantity received and receipt reference posted',[raosReceipt,'DGOSTI-001 Appendix M (PDF pp.47–48)']),
    receiptApproved('receiptAccountPosting','Receipt account-card posting event','Accounting and exception entities','🧮',receiptRoutes.receiptAccountPosting,'CAB account card and RV1 file','Poster/checker initials, posting date and account reference',[raosReceipt,'DGOSTI-001 Appendix O (PDF pp.51–53)']),
    receiptApproved('discrepancyReport','Receipt Discrepancy Report','Accounting and exception entities','⚠️',receiptRoutes.discrepancyReport,'Consignor/DAO discrepancy case until settlement','DAO DR number and progressed settlement',[raosReceipt,'DGOSTI-001 Appendices N and P (PDF pp.49–55)']),
    receiptApproved('adjustmentVoucher','Receipt adjustment voucher','Accounting and exception entities','⚖️',receiptRoutes.adjustmentVoucher,'CAB file linked to RV1 and sanctioned loss statement','Adjustment control number and posting evidence',[raosReceipt,'DGOSTI-001 Appendices N–P (PDF pp.49–55)']),
    receiptApproved('receiptedRv2','Receipted acknowledgement (RV2)','Accounting and exception entities','✍️',receiptRoutes.receiptedRv2,'Consignor','Provision and R&PS/CRS clearance records',[raosReceipt,dgosReceipt]),
    receiptApproved('crvException','Certificate Receipt Voucher (CRV) exception','Accounting and exception entities','🧾',receiptRoutes.crvException,'CRV destroyed after regular-voucher linking, or retained and escalated under the six-month exception','RCRS and DRS carry linking or government-sanction evidence',['RAOS Part II abbreviations: CRV — Certificate Receipt Voucher (PDF p.4)',raosReceipt,'DGOSTI-001 Appendix D paras 3, 5(c) and 7; Appendix Q para 5 (PDF pp.25–30, 57–58)'],{companion:'CRV copies split to Accounts, R&PS/CRS and Receipts Progress; the mission teaches the normal-link and six-month escalation branches.',waitingElsewhere:'Triplicate CRV and packing notes remain in the consignor pad while the regular voucher is hastened.'}),
    receiptApproved('ctcException','Certified True Copy (CTC) for a missing receipt-voucher copy','Accounting and exception entities','📑',receiptRoutes.ctcException,'Consignor receives the CTC acting as RV2; retained trap copy is destroyed as prescribed','RCRS is marked CTC and later cleared when the regular copy is linked',[raosReceipt,'DGOSTI-001 Appendix D paras 3(b), 5(b) and 7; Appendix G para 2; Appendix Q para 5 (PDF pp.26, 28–30, 39, 57–58)'],{companion:'One CTC travels as the missing copy while the other is retained in the consignor-pad trap.',waitingElsewhere:'The retained CTC waits for the regular voucher and is destroyed on linking or after the prescribed trap period.'})
  );

  const campaignStage=(office,focus,state,action,reason,companion,waiting,handoffToNext='custody')=>({office,focus,state,action,reason,companion,waiting,handoffToNext});
  const issueCampaignStages=[
    campaignStage('DemandingUnit','Demand','Authorised requirement being raised','Raise the authorised demand with correct unit, entitlement and item particulars.','Issue starts from a valid authority, not a verbal request.','Demand and supporting authority.','No depot copy exists yet.'),
    campaignStage('HQ','Demand','Received and date-stamped','Date-stamp the demand and pass normal issue documents to ISS without delay.','The time-and-date mark establishes formal depot entry.','Demand in the controlled dak box.','The user unit retains its own originating records.'),
    campaignStage('ISS','Demand + IRPS duplicate','Sorted as a non-static-unit demand','Sort Sub-Depot/catalogue-wise, prepare the IRPS in duplicate and route the non-static demand through ULC.','ISS creates the progress identity before technical checking.','Demand, schedule and IRPS set.','IRPS original and duplicate remain together until Issue Control splits them.'),
    campaignStage('ULC','Demand + IRPS','Location verified','Confirm the non-static unit location, stamp the demand and return it to Indent Checking.','Only the unit location is verified here.','Demand and IRPS.','Static-unit demands bypass ULC.'),
    campaignStage('IndentChecking','Demand + IRPS','Correct and admissible','Check authority, nomenclature, entitlement and completeness; send the correct set to Issue Control Registry.','Defects must be removed before a control number is allotted.','Demand, schedule and IRPS.','Incorrect demands are returned or redirected with IRPS remarks.'),
    campaignStage('ICR','Controlled demand and two-copy IRPS','Control number allotted; copies split','Allot the control number, send IRPS original to R&PS/CRS and IRPS duplicate with the demand to Voucher Preparation; return the completed Schedule through Central Registry.','One IRPS watches centrally while the duplicate follows Sub-Depot execution.','IRPS original now moves to R&PS/CRS.','Duplicate IRPS and demand simultaneously move to Voucher Preparation.'),
    campaignStage('RPS','IRPS original','Central progress watch opened','Receive the original IRPS and open the central progress watch.','This copy must remain independent of the execution copy.','IRPS original.','Duplicate IRPS and demand are already travelling to Voucher Preparation.','focus-switch'),
    campaignStage('VoucherPrep','Demand + IV1–IV6 + duplicate IRPS','Issue vouchers prepared and checked','Prepare and check the normally six IV copies; send vouchers with duplicate IRPS to SDIC and the demand to R&PS/CRS.','Copy identity established here controls every later branch.','IV1–IV6 and duplicate IRPS move toward SDIC.','The demand moves separately to R&PS/CRS.'),
    campaignStage('RPS','Demand','Filed in the appropriate unit pad','Receive and file the demand while continuing progress on the original IRPS.','The originating authority must remain linked to the transaction.','Demand and original IRPS are now held in records.','IV1–IV6 and duplicate IRPS are being executed in the Sub-Depot.','focus-switch'),
    campaignStage('SDIC','IV1–IV6 + duplicate IRPS','Stage-I receipt recorded','Check the voucher control numbers against the duplicate IRPS and pass the controlled bundle to DOC.','SDIC is the Sub-Depot progress watcher, not the physical selector.','Voucher set under the duplicate IRPS.','Demand and original IRPS remain at R&PS/CRS.'),
    campaignStage('DOC','IV bundle','Dues-out position reviewed','Review Part-I vouchers against Dues Out Cards and pass the cleared set to MLRS.','Dues-out status must be known before location and selection.','IV bundle.','Duplicate IRPS returns to SDIC after MLRS records progress.'),
    campaignStage('MLRS','IV bundle','Shed location marked','Mark the correct shed/location, including NA items, on the prescribed voucher copy and send the Selection Jacket onward.','Selection must use an authenticated material location.','Vouchers in the Selection Jacket.','Duplicate IRPS returns to SDIC for progress watching.'),
    campaignStage('Selection','Stores + IV1–IV6','Stores selected; critical copy split made','Select and bin-card post the authorised stores; send IV3/IV4 to SDIC and IV1/IV2/IV5/IV6 with stores to Packing.','The transaction becomes concurrent after this split.','Operational focus follows IV3 and IV4 back to SDIC.','Stores with IV1/IV2/IV5/IV6 simultaneously move to Packing.'),
    campaignStage('SDIC','IV3 + IV4','Selection date recorded','Record selection progress and send IV3/IV4 to CAB.','These copies provide audit scheduling and ledger-posting evidence.','IV3 and IV4.','Packing is concurrently processing stores with IV1/IV2/IV5/IV6.'),
    campaignStage('CAB','IV3 + IV4','IV4 posted; IV3 prepared for schedule','Post the account card from IV4, check/file IV4 and send IV3 through the LAO schedule.','IV4 proves posting; IV3 is the scheduled audit copy.','IV3 proceeds to LAO.','IV4 remains filed in CAB.'),
    campaignStage('LAO','IV3','Scheduled audit copy received','Receive IV3 through the prescribed monthly skeleton/supplementary list.','The accounts branch is now closed for IV3/IV4.','IV3 in the audit schedule.','The stores branch has continued independently from Selection to Packing.','focus-switch'),
    campaignStage('Packing','Stores + IV1 + IV2 + IV5 + IV6','Packages formed and packing records created','Pack stores, enclose IV2 in Package No.1, prepare one original/duplicate Packing Note per package, return IV5 to SDIC and hand packages with IV1/IV6 to Traffic.','Packing creates three simultaneous trails: packages, progress copy and retained packing evidence.','Operational focus follows IV5 to SDIC.','Packages with IV1/IV2/IV6 simultaneously pass to Traffic; Packing Note duplicates stay at Packing.'),
    campaignStage('SDIC','IV5','Packing date recorded','Record packing completion on progress records and pass IV5 to R&PS/CRS.','IV5 proves packing progress and later LAO scheduling.','IV5.','Packages and IV1/IV6 are already with Traffic.'),
    campaignStage('RPS','IV5 + IV6 reference','Despatch details linked','Receive IV5, transcribe/link applicable despatch details from IV6 and schedule IV5 to LAO on the appropriate date.','IV5 is not the consignee acknowledgement copy.','IV5 proceeds to LAO.','IV6 and the consignment continue on their separate routes.'),
    campaignStage('LAO','IV5','Packing-progress copy scheduled','Receive the scheduled IV5 copy through the prescribed list.','This closes the IV5 audit branch.','IV5 on the LAO schedule.','Traffic has meanwhile arranged despatch of the physical consignment.','focus-switch'),
    campaignStage('Traffic','Packages + IV1 + IV2 + IV6','Transit papers prepared and consignment despatched','Take over packages, prepare mode-specific transit evidence, dispatch the consignment and complete despatch particulars on IV6.','Traffic custody and the applicable register prove physical despatch.','Packages carry IV2 in Package No.1; IV1 travels as prescribed.','IV6 is separately returned to R&PS/CRS after despatch.'),
    campaignStage('DemandingUnit','Stores + IV2','Consignment checked and IV2 receipted','Check the received stores, sign/date IV2 and return it to R&PS/CRS.','IV2 is the source-qualified consignee acknowledgement copy.','Returned receipted IV2.','IV6 is independently moving through records and time-check control.'),
    campaignStage('RPS','Returned IV2','IRPS acknowledgement marked and copy filed','Mark receipt on the original IRPS, hasten if overdue and file IV2 in control-number order.','This closes the consignee-acknowledgement branch without confusing IV2 with IV5.','Receipted IV2 is filed.','IV6 still requires Issue Time Check and unit-pad closure.','focus-switch'),
    campaignStage('RPS','IV6','Despatch evidence received','Link IV6 with the demand and send it to S&M for Issue Time Check.','IV6 carries despatch evidence into the final records check.','IV6.','Demand remains in the unit pad.'),
    campaignStage('SM','IV6','Issue Time Check recorded','Record Issue Time Check and return IV6 to R&PS/CRS.','The time check measures issue performance; S&M does not retain the voucher.','IV6 returns to R&PS/CRS.','Demand waits in the unit pad.'),
    campaignStage('RPS','Demand + IV6 unit-pad bundle','Issue lifecycle closed','Link IV6 with the relevant demand, complete the original IRPS and mark the unit pad completed.','The authority, despatch evidence, acknowledgement and audit trails are now distinguishable and closed.','Demand and IV6 remain linked in the unit pad.','IV2 is in control-number order; IV3/IV5 are scheduled; IV4 and packing records remain in their prescribed files.')
  ];
  const receiptCampaignStages=[
    campaignStage('Consignor','Advance RV1 + transit/consignment evidence','Receipt transaction initiated','Dispatch the advance issue document and the applicable transit/consignment papers.','Receipt begins as separate advance-document and physical/transit streams.','Advance voucher and transit evidence enter Central Registry.','The physical consignment follows its transit route.'),
    campaignStage('CentralRegistry','Advance voucher + transit papers','Date-stamped and split','Send the advance issue voucher to Provision and transit papers to Traffic Receipts.','The two streams must not be merged at registry.','Operational focus follows the advance voucher to Provision.','Transit papers simultaneously go to Traffic Receipts.'),
    campaignStage('Provision','Advance RV1','Dues-in marked in pencil','Mark dues-in from the advance voucher and pass it to Receipts Progress.','The advance copy creates the watch before stores documents arrive.','Advance RV1.','Transit papers and consignment continue through Traffic Receipts.'),
    campaignStage('ReceiptProgress','Advance RV1','Held in consignor pad awaiting stores copy','File the advance voucher in the consignor pad and actively await the stores copy for marriage.','It is a waiting control record, not yet a receipt-posting voucher.','Advance RV1 waits here.','The physical/transit stream is handled separately by Traffic Receipts.','focus-switch'),
    campaignStage('TrafficReceipts','Consignment + transit papers + DRS1–3','Transit registered and DRS prepared','Register the transit paper, inspect package condition, prepare a separate three-copy DRS and deliver stores with DRS2 while obtaining acknowledgement on DRS1/DRS3.','DRS1 stays with Traffic evidence; DRS3 goes to Receipts Progress.','Packages and DRS2 move to Receipts Area.','DRS1 is retained; DRS3 separately moves to Receipts Progress.'),
    campaignStage('ReceiptArea','Packages + DRS1–3','Packages taken over; RV2 extracted','Check the packages against DRS1–3, acknowledge DRS1/DRS3, extract RV2 from Package No.1 and send RV2 with DRS2 through Liaison for marriage and control.','The first Receipts Area visit is package takeover and document extraction; RN&DOR slips do not yet exist.','Packages, stores, RV2 and DRS2 remain the active arrival bundle.','DRS1 returns to Traffic, DRS3 goes to Receipts Progress, and advance RV1 waits there.'),
    campaignStage('ReceiptLiaison','RV2 + DRS2','Package copy extracted and linked','Extract RV2 from Package No.1, link it with DRS2 and take the set to Receipts Progress.','Liaison joins the arriving stores papers with the waiting advance copy.','RV2 and DRS2.','Stores remain under Receipts Area custody.'),
    campaignStage('ReceiptProgress','RV1 + RV2 + DRS2','Advance and stores copies married','Marry RV2/DRS2 with the waiting RV1 and hand the linked set back to Liaison for control.','All subsequent control must refer to the same receipt transaction.','Linked RV1/RV2/DRS2 set.','DRS3 separately watches progress.'),
    campaignStage('ReceiptLiaison','Linked receipt set','Carried to Receipt Control','Present the linked documents to Receipt Control Registry and preserve copy identity.','Liaison is the courier/coordinator between progress, control and the physical area.','RV1, RV2 and DRS2.','Stores wait in Receipts Area.'),
    campaignStage('ReceiptControl','RV1 + RV2 + DRS2 + RCRS1–3','Receipt control number allotted','Allot the receipt control number; split RCRS1 to Receipts Progress, RCRS2 to R&PS/CRS and RCRS3 to CAB; return the controlled receipt set to Receipts Area.','Three independent watchers now track clearance, acknowledgement and posting.','Controlled RV1/RV2/DRS2 return to Receipts Area.','RCRS copies simultaneously move to their three holders.'),
    campaignStage('ReceiptArea','Controlled receipt set + stores','Designation, quantity and condition checked','Check stores against the controlled receipt vouchers and identify normal-stock, dues-out or discrepancy outcomes.','This is the physical acceptance gate.','Checked stores and receipt documents.','Any discrepancy must branch to the dedicated discrepancy procedure.'),
    campaignStage('ReceiptLiaison','RV1 + checked receipt evidence','Location/dues-out review initiated','Hold RV2 and DRS2 in the “Awaiting RV1 from DOC” folder; send RV1 to MLRS and then DOC. Do not prepare RN&DOR yet.','DGOSTI requires location and dues-out decisions before Liaison can prepare the RN&DOR distribution set.','RV1 alone moves to MLRS.','RV2 and DRS2 wait together at Liaison; the stores remain in Receipts Area.'),
    campaignStage('MLRS','RV1','Section, identity and shed/area location checked','Check section, part/catalogue number and designation; mark the storage location on RV1.','Correct location prevents mis-binning and wrong stock records.','RV1.','Stores remain in Receipts Area.'),
    campaignStage('DOC','RV1','Dues-out quantities reviewed','Review each item against Dues Out Cards and mark quantities requiring release.','A receipt may split between normal stock and dues-out suspense.','RV1.','Normal stock and dues-out quantities remain physically distinguishable.'),
    campaignStage('FPVRelease','RV1 + Further Part Vouchers','Dues-out authority extracted','Extract the relevant Further Part Vouchers, stamp RV1 “DOC”, return RV1 to Liaison and hold the vouchers in the “Awaiting RN&DOR Slips” pad.','The vouchers are extracted before the RN&DOR exists; they are not released until the Liaison copy subsequently arrives.','RV1 returns to Liaison.','Further Part Vouchers wait here for the RN&DOR copy.'),
    campaignStage('ReceiptLiaison','RV1 + RV2 + DRS2; RN&DOR created now','RN&DOR distribution set prepared and split','Re-marry returned RV1 with RV2, prepare/check the required RN&DOR copies, stamp RV1/RV2 with the preparation date, send RV1/RV2/DRS2 to Receipts Progress, send one dues-out RN&DOR copy to FPV Release, and send the distribution copies to Receipts Area.','This is the first stage at which RN&DOR slips exist; their copies now divide by destination.','Distribution RN&DOR copies move to Receipts Area.','The FPV Release copy moves separately to DOC; RV1/RV2/DRS2 move to Receipts Progress.'),
    campaignStage('ReceiptArea','Stores + RN&DOR','Stores distributed by outcome','Send normal stock to Bulk/Detail Store and dues-out stock to Dues-out Suspense; do not mix discrepancy stock into either branch.','Physical custody now divides according to the authorised receipt outcome.','Operational focus follows the bulk-stock branch.','Dues-out stores simultaneously move to suspense.'),
    campaignStage('BulkStore','Normal stock + bulk RN&DOR','Binned/stacked and bin card posted','Bin or stack cleared stores, post the bin card and return the receipted RN&DOR to Liaison.','Stock is not fully received until both physical location and record posting agree.','Receipted bulk RN&DOR returns to Liaison.','Dues-out stock remains under suspense control.'),
    campaignStage('ReceiptLiaison','Receipted bulk RN&DOR','Bulk branch evidence closed','Check and file the returned bulk RN&DOR against the receipt control.','This proves normal stock reached its destination and record.','Bulk RN&DOR evidence.','Dues-out release continues independently.','focus-switch'),
    campaignStage('DuesOutSuspense','Dues-out stores + RN&DOR + Further Part Vouchers','Stores held, then authorised for release','Hold stores separately until Further Part Vouchers arrive; record released quantities and return RN&DOR to Liaison.','Suspense is a controlled wait, not available stock.','RN&DOR returns to Liaison; released stores move with IV1/IV2/IV5/IV6 to Packing.','Any unreleased balance remains in suspense.'),
    campaignStage('ReceiptLiaison','Receipted dues-out RN&DOR','Dues-out receipt evidence closed','Check and file the returned dues-out RN&DOR and its Further Part Voucher references.','This proves the suspense-to-Issue release was authorised.','Dues-out RN&DOR evidence.','Released stores have already moved into the Issue packing stream.','focus-switch'),
    campaignStage('Packing','Released dues-out stores + IV1/IV2/IV5/IV6','Receipt branch joins Issue procedure','Accept released stores and prescribed voucher copies into the normal Issue packing process.','Receipt ends for these stores where the authorised Issue stream begins.','Stores and Further Part Voucher copies continue under Issue procedure.','Receipt documents continue separately to progress and accounts.','focus-switch'),
    campaignStage('ReceiptProgress','RV1 + RV2 + DRS2/DRS3 progress evidence','Receipt documents cleared and split','After RN&DOR preparation, send RV1 to CAB, RV2 to Provision, DRS3 to R&PS/CRS and file DRS2 in the prescribed order.','Physical receipt, posting and acknowledgement now close on distinct branches.','Operational focus follows RV1 to CAB.','RV2 and DRS3 simultaneously move toward Provision/R&PS.'),
    campaignStage('CAB','RV1 + RCRS3','Receipt posted and RV1 filed','Post RV1 to the account card, complete checker/poster evidence, update RCRS3 and file RV1.','CAB closes the accounting branch exactly once.','RV1 remains filed in CAB.','RV2 is independently returning through Provision.','focus-switch'),
    campaignStage('Provision','Receipted RV2','Dues-in inked/cleared','Ink the dues-in entry from receipted RV2 and pass it to R&PS/CRS.','The provisional watch becomes a cleared receipt.','Receipted RV2.','RV1 is already posted and filed in CAB.'),
    campaignStage('RPS','RV2 + RCRS2 + DRS3','Acknowledgement progressed; DRS3 filed','Use RCRS2 to clear progress, file DRS3 and forward receipted RV2 to the consignor.','Records close the receipt without merging the posting, DRS and acknowledgement evidence.','Receipted RV2.','RCRS1/2/3 remain with their prescribed progress holders.'),
    campaignStage('Consignor','Receipted RV2','Receipt acknowledgement returned','Receive the cleared receipted RV2 as proof of completed receipt.','The normal Receipt lifecycle is now closed.','Receipted RV2 reaches its originator.','CAB retains RV1; R&PS/CRS retains DRS3; RN&DOR and bin-card evidence remain in their prescribed records.')
  ];
  const campaigns={
    issueNormal:{procedure:'Issue',stages:issueCampaignStages,route:issueCampaignStages.map(stage=>stage.office),primarySourceRefs:[raos190,dgosBroad]},
    receiptNormal:{procedure:'Receipt',stages:receiptCampaignStages,route:receiptCampaignStages.map(stage=>stage.office),primarySourceRefs:[raosReceipt,dgosReceipt]}
  };
  const fullIssueRoute=campaigns.issueNormal.route;
  const fullReceiptRoute=campaigns.receiptNormal.route;
  const routeTransitions = Object.entries(routes).flatMap(([characterId, route]) => route.slice(0,-1).map((from,index) => {
    const character=characters.find(item=>item.id===characterId);
    const supported=character&&character.routeStatus==='approved';
    return ({
    id:`${characterId}:${index}:${from}->${route[index+1]}`,
    characterId,from,to:route[index+1],support:supported?'primary-supported':'prototype-unverified',handoffType:characterFocusSwitches[characterId]?.includes(index)?'focus-switch':'custody',primarySourceRef:supported?character.primarySourceRefs.join('; '):null,domainReview:!supported
  });}));
  const campaignTransitions=Object.entries(campaigns).flatMap(([campaignId,campaign])=>campaign.route.slice(0,-1).map((from,index)=>({id:`${campaignId}:${index}:${from}->${campaign.route[index+1]}`,characterId:campaignId,from,to:campaign.route[index+1],support:'primary-supported',handoffType:campaign.stages[index].handoffToNext,primarySourceRef:campaign.primarySourceRefs.join('; '),domainReview:false})));
  const variantTransitions=receiptRouteVariants.receiptVoucher1NoDuesOut.slice(0,-1).map((from,index)=>({id:`receiptVoucher1:no-dues:${index}:${from}->${receiptRouteVariants.receiptVoucher1NoDuesOut[index+1]}`,characterId:'receiptVoucher1',from,to:receiptRouteVariants.receiptVoucher1NoDuesOut[index+1],support:'primary-supported',primarySourceRef:'DGOSTI-001 Appendices F, G, J, K and O (PDF pp.36–53)',domainReview:false}));
  const transitions=[...routeTransitions,...campaignTransitions,...variantTransitions];
  const officeSituations={
    Receipt:{
      ReceiptArea:{
        normal:{title:'Normal receipt checking',description:'Check designation, quantity and condition, then continue the currently active normal Receipt route.'},
        contingencies:[
          {role:'discrepancyReport',title:'Discrepancy discovered',description:'Shortage, surplus, damage, change in condition or change of designation requires the separate DR and adjustment-document trail.',source:'DGOSTI-001 Appendices N–P (PDF pp.49–55)'},
          {role:'crvException',title:'Stores received without vouchers',description:'Open the controlled CRV lifecycle in triplicate and progress the regular voucher without posting the stores twice.',source:'DGOSTI-001 Appendix D paras 3, 5(c), 7 and Appendix Q para 5 (PDF pp.25–30, 57–58)'}
        ]
      },
      ReceiptProgress:{
        normal:{title:'Normal document linkage',description:'Continue linking and progressing the normal RV, DRS and RCRS evidence.'},
        contingencies:[
          {role:'ctcException',title:'RV No.1 missing; RV No.2 available',description:'Convert RV2 to RV1, prepare the two CTC copies, retain the trap copy and continue the prescribed controlled route.',source:'DGOSTI-001 Appendix D paras 3(b), 5(b), 7; Appendix G para 2; Appendix Q para 5 (PDF pp.26, 28–30, 39, 57–58)'}
        ]
      }
    }
  };
  const formSchemas={
    irps:{
      procedure:'Issue',title:'Issue Registration Progress Sheet (IRPS)',format:'Two copies: Original is the R&PS/CRS progress medium; Duplicate supports SDIC execution progress.',copy:'ORIGINAL / DUPLICATE',
      source:'DGOSTI-002 Appendix A (PDF p.56); paras 28, 51, 66–70, 210–214',
      columns:[['1','Serial No.'],['2','Unit'],['3','Unit demand No. and date'],['4','No. of items'],['5','Control No.—Section'],['6','Control No.—Number'],['7','Control No.—Date'],['8','Date No. 5 received'],['9','Date No. 6 received'],['10','Date No. 2 received'],['11','Remarks']],
      events:{
        ISS:{fields:['1','2','3','4'],note:'ISS opens the two-copy progress medium with demand identity and item count.'},
        ICR:{fields:['5','6','7'],note:'Issue Control allots and dates the depot control number; Original and Duplicate then split.'},
        SDIC:{fields:['8','9'],note:'On the Duplicate IRPS, SDIC records the date of selection in column 8 and the date of packing in column 9.'},
        RPS:{fields:['8','9','10','11'],note:'R&PS marks receipt of No.5, No.6 and the returned acknowledgement copy; Remarks carries BY POST or N.A. when applicable.'}
      }
    },
    trafficIssue:{
      procedure:'Issue',title:'Traffic Register of Issues',format:'Bound Traffic control register; one line per controlled issue.',copy:'TRAFFIC REGISTER',
      source:'DGOSTI-002 Appendix B (PDF p.57); paras 164, 176–180',
      columns:[['1','Control number'],['2','Date stores collected'],['3','Date No.1 copy to consignee'],['4','Date stores despatched'],['5','Wagon No./RR No.'],['6','Remarks']],
      events:{Packing:{fields:['1','2'],note:'Traffic takeover establishes control-number and collection-date evidence.'},Traffic:{fields:['3','4','5','6'],note:'Traffic records No.1 despatch, stores despatch, and wagon/RR reference when applicable.'}}
    },
    rcrs:{
      procedure:'Receipt',title:'Receipts Control Registration Sheet (RCRS)',format:'Prepared in triplicate: No.1 to Receipts Progress, No.2 to R&PS/CRS, No.3 to Central Accounts.',copy:'COPIES 1 / 2 / 3',
      source:'DGOSTI-001 Appendix G paras 2(d)–3 (PDF pp.39–40), Annexure 12 (PDF p.67)',
      columns:[['1','Control No.'],['2','Consignor'],['3','Consignor’s I Vr No.'],['4','Consignor’s I Vr Date'],['5','DRS No.'],['6','DRS Date'],['7','Date: (1) No.1 to Accounts & No.2 to Provision; (2) No.1 in Accounts; (3) No.2 to Consignor'],['8','Date RV No.1 posted'],['9','Remarks']],
      events:{
        ReceiptControl:{fields:['1','2','3','4','5','6','9'],note:'Receipt Control completes columns 1–6. CRV or CTC is entered in Remarks when applicable; then the three copies split.'},
        ReceiptProgress:{fields:['7'],note:'The progress copies use printed column 7 to watch distribution and return milestones; discrepancy cases receive the prescribed dash.'},
        CAB:{fields:['7','8'],note:'CAB enters RV1 receipt in column 7, then column 8 with the actual posting date after checking.'},
        RPS:{fields:['7'],note:'R&PS/CRS completes column 7 when receipted RV2/CTC/CRV clears for return to the consignor.'}
      }
    },
    trafficDrs:{
      procedure:'Receipt',title:'Traffic DRS Register',format:'Traffic register controlling the return of Daily Receipt Sheet No.1.',copy:'DRS NO.1 WATCH',
      source:'DGOSTI-001 Appendix C, Annexure 9 (PDF p.64)',
      columns:[['1','Serial No.'],['2','Date'],['3','Date No.1 DRS received'],['4','Remarks']],
      events:{TrafficReceipts:{fields:['1','2'],note:'Traffic opens the DRS serial and date entry.'},ReceiptArea:{fields:['3','4'],note:'When DRS No.1 returns, Traffic records its receipt date and any necessary remark.'}}
    },
    subDepotDrs:{
      procedure:'Receipt',title:'Sub Depot / Group DRS Register',format:'Progress register distinguishing DRS No.3 and DRS No.2 movements.',copy:'DRS NO.2 / NO.3 WATCH',
      source:'DGOSTI-001 Appendix D, Annexure 10 (PDF p.65)',
      columns:[['1','Serial No.'],['2','Date No.3 DRS received from Traffic representative'],['3','Date No.2 DRS received from Receipts Area'],['4','Date No.3 DRS passed to R&PS/CRS'],['5','Remarks']],
      events:{ReceiptProgress:{fields:['1','2','3'],note:'Receipts Progress links the distinct No.3 and No.2 arrivals; the copies are not interchangeable.'},RPS:{fields:['4','5'],note:'The register shows the date No.3 was passed to R&PS/CRS and any necessary remark.'}}
    }
  };
  const formByRole={irpsOriginal:'irps',irpsDuplicate:'irps',issuesControlSheet:'irps',trafficRegister:'trafficIssue',drs1:'trafficDrs',drs2:'subDepotDrs',drs3:'subDepotDrs',rcrs1:'rcrs',rcrs2:'rcrs',rcrs3:'rcrs'};

  const reverseSideEntries={
    irpsOriginal:[
      {entry:'Movement record: SDIC → DOC, DOC → MLRS and MLRS → SDIC, with date and time.',filledBy:'SDIC / DOC / MLRS at the respective movement',source:'DGOSTI-002 para 91(a), PDF p.24'}
    ],
    irpsDuplicate:[
      {entry:'Movement/progress stamp records SDIC → DOC, DOC → MLRS and MLRS → SDIC with date and time.',filledBy:'SDIC / DOC / MLRS at the respective movement',source:'DGOSTI-002 paras 91(a), 103 and 116, PDF pp.24, 28, 31'}
    ],
    iv1:[
      {entry:'Packing Note serial number or serial-number block is endorsed.',filledBy:'Packing Section',source:'DGOSTI-002 para 152, PDF p.37'}
    ],
    iv4:[
      {entry:'Receipt for stores and IV1, IV2, IV5 and IV6 handed to Packing is obtained here.',filledBy:'I/C Packing Section',source:'DGOSTI-002 paras 127(f) and 141, PDF pp.33, 36'}
    ],
    iv5:[
      {entry:'Packing Note serial number or serial-number block is endorsed.',filledBy:'Packing Section',source:'DGOSTI-002 para 152, PDF p.37'}
    ],
    iv6:[
      {entry:'Issue Time Check: demand received in depot, voucher received in Sub Depot, IV1 to Traffic and stores dispatched.',filledBy:'Voucher checker initially; SDIC, Packing and Traffic complete the applicable dates',source:'DGOSTI-002 paras 87, 91, 155 and 174, PDF pp.22, 24, 38, 43'},
      {entry:'DOC stamp records that the voucher was reviewed against Dues Out Cards.',filledBy:'DOC',source:'DGOSTI-002 para 105, PDF p.29'},
      {entry:'Special case-marking instructions, Packing Note serial block and package shed/area location are recorded.',filledBy:'Packing Section',source:'DGOSTI-002 paras 141 and 152, PDF pp.36–37'},
      {entry:'Collection, traffic-shed hand-over, dispatch or local-collection acknowledgement details are signed, dated and timed as applicable.',filledBy:'Traffic representative / Traffic shed / authorised consignee representative',source:'DGOSTI-002 paras 161, 165, 174 and 189–190, PDF pp.40–46'}
    ],
    packingCompletionOriginal:[
      {entry:'Traffic representative acknowledges receipt of the IV1 copies/package collection evidence.',filledBy:'Traffic representative',source:'DGOSTI-002 paras 156 and 158, PDF pp.38–39'}
    ],
    receiptVoucher1:[
      {entry:'Receipt Time Check: DRS number/date, date stores received in Sub Depot, date voucher reached Accounts and date posted.',filledBy:'Receipt Liaison opens the stamp; Receipts Area, CAB receipt clerk and ledger poster complete their dates',source:'DGOSTI-001 Appendix D para 5 and Appendix O paras 2–3, PDF pp.27, 51–52'}
    ],
    drs1:[
      {entry:'Receipt of DRS3 is acknowledged before DRS1 returns to Traffic.',filledBy:'Receipts Progress / Sub-Depot representative',source:'DGOSTI-001 Appendix D para 5, PDF p.27'}
    ],
    drs3:[
      {entry:'Progress chart: stores received by Traffic; stores received in Sub Depot/Group; DRS2 received in Receipts Office; DRS3 passed to CRS/R&PS.',filledBy:'Traffic Receipts, Receipts Area, Receipts Progress and the forwarding clerk at their respective stages',source:'DGOSTI-001 Appendix C para 9(h), PDF p.22; RAOS Part II para 136(h), PDF p.69'}
    ],
    rndorBulk:[
      {entry:'Signature of the representative collecting/delivering stores acknowledges the movement.',filledBy:'Collecting/delivering representative',source:'DGOSTI-001 Appendix K para 10(b), PDF p.35'}
    ],
    rndorDuesOut:[
      {entry:'Further Part Voucher serial numbers and extraction date are endorsed; Dues Out Suspense acknowledges release.',filledBy:'Further Part Voucher Release Cell / Dues Out Suspense',source:'DGOSTI-001 Appendix L paras 4–5, PDF p.45'}
    ],
    discrepancyReport:[
      {entry:'Receipts Area location of the discrepant stores and the custody signature are recorded on DR No.2.',filledBy:'Discrepancy clerk; signed by I/C Receipts Area',source:'DGOSTI-001 Appendix N para 2(i), PDF p.49'}
    ],
    crvException:[
      {entry:'CRV progress stamp: regular voucher demand reference/date, expeditor issue, RV receipt date and RV-to-Accounts/CRS date.',filledBy:'Receipts Progress / R&PS at the prescribed milestones',source:'DGOSTI-001 Appendix D para 7(c), PDF p.28'}
    ],
    eachPackage:[
      {entry:'Movement markings include consignee/destination, weight, voucher number and the individual/total package number.',filledBy:'Packing Section',source:'RAOS Part II paras 247–248, PDF pp.106–107'}
    ]
  };
  const documentOrigins={};
  const assignOrigin=(ids,preparedBy,creationAction,source)=>ids.forEach(id=>documentOrigins[id]={preparedBy,creationAction,source});
  assignOrigin(['demand'],'Demanding Unit','Raises and signs the authorised demand/indent.','DGOSTI-002 paras 20–29 and 50–57, PDF pp.9–17');
  assignOrigin(['irpsOriginal','irpsDuplicate','issuesControlSheet'],'ISS','Prepares the IRPS in duplicate as the Issue progress medium.','DGOSTI-002 paras 28 and 66–70, PDF pp.10, 19–20');
  assignOrigin(['scheduleOfIndents'],'Origin not stated in DGOSTI-002; completed by Control Registry','The Schedule of Indents is already accompanying the demands when received. Control Registry enters the allotted control number against each listed indent.','DGOSTI-002 paras 22, 51, 56 and 67–70, PDF pp.9, 15–20');
  assignOrigin(['iv1','iv2','iv3','iv4','iv5','iv6'],'Voucher Preparation Section','Prepares and checks the six copy-specific Issue Vouchers from the controlled demand.','DGOSTI-002 paras 77–89, PDF pp.21–23');
  assignOrigin(['packingNoteOriginal','packingNoteDuplicate'],'Packing Section','Prepares one original/duplicate Packing Note set for each package.','DGOSTI-002 paras 142, 148 and 152–153, PDF pp.36–37');
  assignOrigin(['packingCompletionOriginal','packingCompletionDuplicate','collectionDocument'],'Packing Section','Prepares the Packing Completion Advice/collection evidence for hand-over to Traffic.','DGOSTI-002 paras 155–161, PDF pp.37–40');
  assignOrigin(['roadTransit','convoyDocument'],'Traffic Branch','Prepares and controls the applicable road/convoy dispatch documents.','DGOSTI-002 paras 170–180, PDF pp.42–44');
  assignOrigin(['railTransit'],'Traffic Branch; railway authority issues RR/PWB','Traffic assembles the rail dispatch set and exchanges/records the carrier-issued railway evidence.','DGOSTI-002 paras 163–175, PDF pp.40–43');
  assignOrigin(['postalTransit'],'Traffic Postal Issues Section','Prepares the postal dispatch set and records the postal receipt.','DGOSTI-002 paras 176 and 182–185, PDF pp.43–45');
  assignOrigin(['localIssueTransit'],'Traffic Local Issues Section','Prepares the local-collection authority and obtains the authorised representative’s receipt.','DGOSTI-002 paras 187–192, PDF pp.45–46');
  assignOrigin(['railwayReceipt','parcelWayBill'],'Railway/carrier authority; handled by Traffic Branch','The carrier issues the RR/PWB; Traffic checks, records and forwards it under the prescribed dispatch set.','DGOSTI-002 paras 173–175, PDF p.43');
  assignOrigin(['trafficRegister','localIssueRegister','postalIssueRegister'],'Traffic Branch / relevant Traffic section','Opens and maintains the applicable bound Traffic register entry.','DGOSTI-002 paras 164, 176–180 and 182–192, PDF pp.40–46');
  assignOrigin(['stores'],'Not created as a document','The authorised stores are selected from stock and transferred through physical custody.','DGOSTI-002 paras 121, 128 and 141–162, PDF pp.32–40');
  assignOrigin(['eachPackage','packageOneWithIv2'],'Packing Section','Forms, marks and numbers the physical package; Package No.1 receives IV2.','DGOSTI-002 paras 141–152 and 169, PDF pp.36–42');
  assignOrigin(['accountCardPosting'],'CAB ledger poster; checked by ledger checker','Makes the account-card entry from IV4 and records the account reference, initials and date.','DGOSTI-002 paras 194–199, PDF pp.48–49');
  assignOrigin(['binCardSelection'],'Selection Shed selector','Posts the selected quantity on the relevant Bin Card and initiates replenishment when prescribed.','DGOSTI-002 paras 128–131, PDF pp.33–34');
  assignOrigin(['receiptedAcknowledgement'],'Voucher Preparation Section; completed by consignee','Voucher Preparation creates IV2; the consignee signs/dates it as the returned receipt acknowledgement.','RAOS Part II para 190(q), PDF p.85; DGOSTI-002 paras 147 and 210–213, PDF pp.36, 51–52');
  assignOrigin(['unitPadBundle'],'R&PS/CRS','Assembles and closes the unit-pad bundle by linking the demand with returned control evidence.','DGOSTI-002 paras 210–214, PDF pp.51–53');
  assignOrigin(['advanceIssueVoucher','receiptVoucher1','receiptVoucher2'],'Consignor','Prepares the consignor’s Issue Voucher copies; the receiving depot treats them as advance RV1, RV1 and RV2 for receipt control.','DGOSTI-001 broad principles para 2 and Appendices A–D, PDF pp.7–13, 25–30');
  assignOrigin(['drs1','drs2','drs3'],'Traffic Receipts','Prepares the Daily Receipt Sheet in three copies for the consignment/Sub-Depot grouping.','DGOSTI-001 Appendix C paras 7–9, PDF pp.20–24');
  assignOrigin(['rcrs1','rcrs2','rcrs3'],'Receipt Control Registry','Prepares the RCRS in triplicate and allots the receipt control number before splitting its copies.','DGOSTI-001 Appendix G paras 2–3, PDF pp.39–40');
  assignOrigin(['rndorBulk','rndorDuesOut'],'Receipt Liaison Section','Prepares the RN&DOR Slip for the relevant Bulk/Detail or Dues-out destination.','DGOSTI-001 Appendix F para 1(c) and Appendices K–M, PDF pp.36–48');
  assignOrigin(['receiptStoresBulk','receiptStoresDuesOut'],'Not created as a document','The consignor supplies the physical stores; Receipts Area checks and distributes them by authorised outcome.','DGOSTI-001 Appendix E and RAOS Part II paras 134–146, PDF pp.31–35, 63–74');
  assignOrigin(['binCardReceipt'],'Bulk/Detail Store representative','Posts the received quantity on the Bin Card after binning/stacking the cleared stores.','DGOSTI-001 Appendix M, PDF pp.47–48');
  assignOrigin(['receiptAccountPosting'],'CAB ledger poster; checked by ledger checker','Posts RV1 to the account card and completes the posting evidence.','DGOSTI-001 Appendix O paras 2–5, PDF pp.51–53');
  assignOrigin(['discrepancyReport','adjustmentVoucher'],'Sub-Depot/Group Receipts Office Discrepancy Clerk','Prepares the Discrepancy Report in duplicate and the required IAFO-2715 adjustment documents in quadruplicate.','DGOSTI-001 Appendix N para 2(d), PDF p.49');
  assignOrigin(['receiptedRv2'],'Consignor; receipt completed by authorised Sub-Depot/Group officer','The consignor originates RV2; the authorised receiving officer signs the cleared receipt copy before its return.','DGOSTI-001 Appendix D para 7(a), PDF pp.29–30');
  assignOrigin(['crvException'],'Receipts Area, in the presence of an officer','Prepares the CRV in triplicate when both prescribed Receipt Voucher copies are unavailable.','DGOSTI-001 Appendix E paras 5–6, PDF pp.31–32');
  assignOrigin(['ctcException'],'Receipts Progress Section','Makes the prescribed CTC copy/copies from the available Receipt Voucher when its companion copy is missing.','DGOSTI-001 Appendix D para 5(b), PDF p.28');
  const frontEntrySets={};
  const recordEntry=(entry,filledBy,source)=>({entry,filledBy,source});
  const assignEntries=(ids,entries)=>ids.forEach(id=>frontEntrySets[id]=entries.map(item=>({...item})));
  assignEntries(['demand'],[
    recordEntry('Authorised demand identity, date, demanding unit, item particulars and quantities required.','Demanding Unit / competent signing authority','DGOSTI-002 paras 20–29 and 50–57, PDF pp.9–17'),
    recordEntry('Depot date-and-time receipt mark; location-confirmation stamp for non-static units where applicable; checking initials/date and discrepancy remarks.','HQ Section; ULC; Indent Checking Section at their respective stages','DGOSTI-002 paras 20, 41, 50–57, PDF pp.9, 12, 15–17')
  ]);
  assignEntries(['irpsOriginal','irpsDuplicate','issuesControlSheet'],[
    recordEntry('Columns 1–4: IRPS serial, unit, unit demand number/date and number of items.','Indent Sorting Section (ISS)','DGOSTI-002 para 28 and Appendix A, PDF pp.10, 56'),
    recordEntry('Columns 5–7: Section, allotted depot control number and date.','Issue Control Registry','DGOSTI-002 paras 66–70 and Appendix A, PDF pp.19–20, 56'),
    recordEntry('Progress columns: the Duplicate records selection in column 8 and packing in column 9; the Original is the R&PS progress/control copy for IV5, IV6, acknowledgement and remarks.','SDIC on the Duplicate; R&PS/CRS on the Original','DGOSTI-002 paras 95–96 and 210–214; Appendix A, PDF pp.25–26, 51–53, 56')
  ]);
  assignEntries(['scheduleOfIndents'],[
    recordEntry('Indent/demand references listed for the originating batch; the schedule travels with the demanding documents.','Originator not stated in DGOSTI-002','DGOSTI-002 paras 22, 51 and 56, PDF pp.9, 15–16'),
    recordEntry('Allotted depot control number entered against each corresponding indent before return through Central Registry.','Control Registry','DGOSTI-002 paras 67–70, PDF pp.19–20')
  ]);
  const issueVoucherFields=[
    recordEntry('Depot/control identity, consignee address and station, demand nature and depot-receipt date, plus applicable static-unit/WET markings.','Voucher Preparation typist','DGOSTI-002 paras 80–84, PDF pp.21–22'),
    recordEntry('Item particulars and quantities transcribed from the controlled demand; typist and checker initial/date evidence.','Voucher Preparation typist and checker','DGOSTI-002 paras 85–88, PDF pp.22–23')
  ];
  const issueCopyEntries={
    iv1:recordEntry('Copy 1 is the consignee/Traffic advice copy and later carries the Packing Note reference on its reverse.','Voucher Preparation; Packing and Traffic add later evidence','DGOSTI-002 paras 152, 159 and 165–176, PDF pp.37, 40–44'),
    iv2:recordEntry('Copy 2 is placed in Package No.1 and becomes the consignee-signed returned acknowledgement.','Packing Section; consignee completes receipt','DGOSTI-002 para 147, PDF p.36; RAOS Part II para 190(q), PDF p.85'),
    iv3:recordEntry('Copy 3 carries selection particulars and accompanies the accounting/LAO evidence path; part issues carry guard-sheet linkage.','Selection; SDIC adds guard-sheet evidence where applicable','DGOSTI-002 paras 95 and 121–127, PDF pp.25, 32–33'),
    iv4:recordEntry('Copy 4 carries selection particulars, Packing receipt evidence and CAB account-posting reference, initials and dates.','Selection; Packing; CAB ledger poster and checker','DGOSTI-002 paras 127, 141 and 194–199, PDF pp.33, 36, 48–49'),
    iv5:recordEntry('Copy 5 follows packing completion to R&PS; Packing endorses the Packing Note serial block.','Packing Section','DGOSTI-002 paras 152 and 154, PDF p.37'),
    iv6:recordEntry('Copy 6 is the time-check/control copy: issue-time, selection/packing, location, Traffic custody and despatch evidence accumulate on it.','Voucher Preparation, SDIC, DOC, Packing and Traffic at their respective stages','DGOSTI-002 paras 87, 91, 105, 141, 152, 155 and 161–190, PDF pp.22–46')
  };
  Object.keys(issueCopyEntries).forEach(id=>frontEntrySets[id]=[...issueVoucherFields,issueCopyEntries[id]]);
  assignEntries(['packingNoteOriginal','packingNoteDuplicate'],[
    recordEntry('One serially controlled IAFZ-3031 Packing Note is prepared in duplicate for each package; it records the package contents and is signed by the packer and witness.','Packing Section packer and witness','DGOSTI-002 paras 142, 148 and 152–153, PDF pp.36–37'),
    recordEntry('For small arms, registered numbers are also recorded on the Packing Note.','Packing Section','DGOSTI-002 para 144(a), PDF p.36')
  ]);
  assignEntries(['packingCompletionOriginal','packingCompletionDuplicate','collectionDocument'],[
    recordEntry('Serially numbered advice listing IV1 control/Sub-Depot serial numbers in strict numerical sequence and separated by series.','Packing Section','DGOSTI-002 para 155, PDF pp.37–38'),
    recordEntry('Traffic representative signs for IV1/document receipt and signs, dates and records collection time on the retained evidence.','Traffic representative','DGOSTI-002 paras 156, 159 and 161, PDF pp.38–40')
  ]);
  assignEntries(['roadTransit','railTransit','postalTransit','localIssueTransit','convoyDocument'],[
    recordEntry('Applicable despatch mode, carrier/vehicle or postal evidence, package custody and despatch reference are recorded for the route actually used.','Traffic Branch / relevant Traffic section','DGOSTI-002 paras 163–192, PDF pp.40–46'),
    recordEntry('This training profile does not invent a universal field layout: the exact carrier or convoy form governs its own entries.','Issuing Traffic clerk / carrier authority as applicable','DGOSTI-002 paras 170–190, PDF pp.42–46')
  ]);
  assignEntries(['railwayReceipt','parcelWayBill'],[
    recordEntry('Carrier-issued railway receipt/parcel waybill number and date, linked to the relevant voucher and wagon/package despatch.','Railway/carrier authority; Traffic records the reference','DGOSTI-002 paras 173–176, PDF p.43')
  ]);
  assignEntries(['trafficRegister'],[
    recordEntry('Columns 1–6: control number, stores-collection date, IV1-to-consignee date, stores-despatch date, wagon/RR or postal reference, and remarks.','Traffic Branch Issues Section','DGOSTI-002 paras 164 and 176–180; Appendix B, PDF pp.40, 43–44, 57')
  ]);
  assignEntries(['localIssueRegister'],[
    recordEntry('Columns 1–3 are opened on receipt of the stores/vouchers; column 4 records IV1 sent as collection authority; the authorised representative signs the receipt column.','Traffic Local Issues Section and authorised consignee representative','DGOSTI-002 paras 187–190; Appendix C, PDF pp.45–46, 58')
  ]);
  assignEntries(['postalIssueRegister'],[
    recordEntry('Postal/economy-package receipt and despatch evidence is maintained in the prescribed register; postal parcel number/date also updates the Traffic Register.','Economy Packing & Postal Issue Section','DGOSTI-002 paras 176 and 182–185; Appendix E, PDF pp.43–45, 60')
  ]);
  assignEntries(['stores','receiptStoresBulk','receiptStoresDuesOut'],[
    recordEntry('Physical stores are not a form: the game shows their designation, quantity, condition and current custody only when supported by the accompanying documents.','Selector / Receipts Area / receiving store representative at the current hand-off','DGOSTI-002 paras 121–162, PDF pp.32–40; DGOSTI-001 Appendix E, PDF pp.31–35')
  ]);
  assignEntries(['eachPackage','packageOneWithIv2'],[
    recordEntry('Physical package markings include consignee/destination, weight, voucher number and individual/total package number; Package No.1 contains IV2.','Packing Section','RAOS Part II paras 247–248, PDF pp.106–107; DGOSTI-002 para 147, PDF p.36')
  ]);
  assignEntries(['accountCardPosting','receiptAccountPosting'],[
    recordEntry('Account reference, ledger-poster initials/date and checker initials/date provide the posting trail against the governing voucher.','CAB ledger poster and ledger checker','DGOSTI-002 paras 197–199, PDF pp.48–49; DGOSTI-001 Appendix O paras 2–5, PDF pp.51–53')
  ]);
  assignEntries(['binCardSelection','binCardReceipt'],[
    recordEntry('Quantity issued or received, transaction reference and resulting balance are posted on the relevant Bin Card.','Selection Shed selector / receiving Store representative as applicable','DGOSTI-002 paras 128–131, PDF pp.33–34; DGOSTI-001 Appendix M, PDF pp.47–48')
  ]);
  assignEntries(['receiptedAcknowledgement'],[
    recordEntry('IV2 receipt acknowledgement: stores/package checked, then signed and dated by the consignee before return for R&PS control.','Consignee / authorised recipient','RAOS Part II para 190(q), PDF p.85; DGOSTI-002 paras 210–213, PDF pp.51–52')
  ]);
  assignEntries(['unitPadBundle'],[
    recordEntry('Demand, linked returned voucher copies and IRPS progress evidence are cross-linked and filed in the correct unit pad.','R&PS/CRS Unit Pad Registry','DGOSTI-002 paras 210–214, PDF pp.51–53')
  ]);
  assignEntries(['advanceIssueVoucher','receiptVoucher1','receiptVoucher2'],[
    recordEntry('Consignor issue-voucher identity, date, consignee, item particulars and despatch quantities originate at the consignor.','Consignor','DGOSTI-001 broad principles para 2 and Appendices A–D, PDF pp.7–13, 25–30'),
    recordEntry('Receiving depot adds DRS number/date, receipt control number/date and the RN&DOR-prepared stamp/date at their prescribed stages.','Receipts Progress/Control/Liaison sections at their respective stages','DGOSTI-001 Appendices D, F and G, PDF pp.27–30, 36–40')
  ]);
  assignEntries(['drs1','drs2','drs3'],[
    recordEntry('Sub-Depot/Group, DRS serial/date, RR/PWB/IB/post receipt number/date, consignor and station, convoy/consignor IV reference, wagon/vehicle, packages and description.','Traffic Receipts','DGOSTI-001 Appendix C paras 7–9, PDF pp.20–24'),
    recordEntry('Receipt control numbers and DIS/CRV linking remarks are added as the receipts are controlled and cleared.','Receipt Control / Receipts Progress at the prescribed stage','DGOSTI-001 Appendices C, D and G, PDF pp.20–30, 39–40')
  ]);
  assignEntries(['rcrs1','rcrs2','rcrs3'],[
    recordEntry('Columns 1–6: receipt control number, consignor, consignor IV number/date and DRS number/date; Remarks records CRV or CTC when applicable.','Receipt Control Registry','DGOSTI-001 Appendix G para 2(d), PDF pp.39–40'),
    recordEntry('Columns 7–8 are milestone dates completed by the office responsible for voucher distribution, receipt in Accounts, return to consignor and CAB posting.','Receipts Progress, CAB and R&PS/CRS at their respective milestones','DGOSTI-001 Appendices D, G and O, PDF pp.25–30, 39–40, 51–53')
  ]);
  assignEntries(['rndorBulk','rndorDuesOut'],[
    recordEntry('Receipt-control-derived serial with item-position suffix, total items, shed/area location, preparer signature, number of copies and checker initials.','Receipt Liaison preparer and checker','DGOSTI-001 Appendix F paras 4–5, PDF pp.36–38'),
    recordEntry('Copy count and distribution reflect the actual Bulk/Detail/Dues-out destinations; an extra copy is made for each additional location.','Receipt Liaison Section','DGOSTI-001 Appendix F para 4, PDF pp.36–37')
  ]);
  assignEntries(['discrepancyReport'],[
    recordEntry('DR number, receipt/control and voucher references, item discrepancy, Receipts Area location and custody evidence.','Receipts Discrepancy clerk; I/C Receipts Area signs custody evidence','DGOSTI-001 Appendix N para 2, PDF p.49')
  ]);
  assignEntries(['adjustmentVoucher'],[
    recordEntry('IAFO-2715 adjustment voucher in quadruplicate, cross-referenced to the DR and allotted DAO adjustment control number.','Receipts Discrepancy clerk; DAO allots the control number','DGOSTI-001 Appendix N para 2(d), PDF p.49')
  ]);
  assignEntries(['receiptedRv2'],[
    recordEntry('Receipt control and clearance evidence culminate in the authorised Sub-Depot/Group officer signature before RV2 returns to the consignor.','Receipt Control/Progress entries; authorised receiving officer signs receipt','DGOSTI-001 Appendix D para 7(a), PDF pp.29–30')
  ]);
  assignEntries(['crvException'],[
    recordEntry('Consignor and address; RR/PWB/convoy/IB/post receipt; wagon/vehicle; DRS; consignor IV if available; package markings and weights; Packing Notes; escort signature.','Receipts Area in the presence of an officer','DGOSTI-001 Appendix E paras 5–6, PDF pp.31–32'),
    recordEntry('Prepared in triplicate only when both normal Receipt Voucher copies are unavailable; later regular-voucher linking must prevent double posting.','Receipts Area / Receipts Progress / CAB at their prescribed stages','DGOSTI-001 Appendices D–E, PDF pp.25–32')
  ]);
  assignEntries(['ctcException'],[
    recordEntry('Certified True Copy reproduces the available Receipt Voucher and is boldly identified as Copy 1 or Copy 2 for the missing companion copy.','Receipts Progress Section','DGOSTI-001 Appendix D para 5(b), PDF p.28'),
    recordEntry('Receipt control number links the travelling and trap copies; the trap is destroyed on prescribed later-voucher linkage or after the stated retention period.','Receipt Control and Receipts Progress','DGOSTI-001 Appendix D para 5(b), PDF p.28')
  ]);
  const documentProfiles=Object.fromEntries(characters.map(character=>[character.id,{
    id:character.id,procedure:character.procedure,title:character.name,copyPurpose:character.finalDisposition,
    preparedBy:documentOrigins[character.id].preparedBy,creationAction:documentOrigins[character.id].creationAction,creatorSource:documentOrigins[character.id].source,
    route:character.route,frontEntries:frontEntrySets[character.id],
    reverseEntries:reverseSideEntries[character.id]||[],
    source:character.primarySourceRefs.join('; ')
  }]));
  const officeDocumentSets={
    Issue:{
      DemandingUnit:['demand','iv2'],HQ:['demand'],ISS:['demand','irpsOriginal','irpsDuplicate'],ULC:['demand','irpsDuplicate'],IndentChecking:['demand','irpsDuplicate'],
      ICR:['demand','irpsOriginal','irpsDuplicate','scheduleOfIndents'],VoucherPrep:['demand','irpsDuplicate','iv1','iv2','iv3','iv4','iv5','iv6'],
      SDIC:['irpsDuplicate','iv3','iv4','iv5','iv6'],DOC:['iv1','iv2','iv3','iv4','iv5','iv6'],MLRS:['iv1','iv2','iv3','iv4','iv5','iv6'],
      Selection:['stores','iv1','iv2','iv3','iv4','iv5','iv6','binCardSelection'],Packing:['stores','iv1','iv2','iv5','iv6','packingNoteOriginal','packingNoteDuplicate'],
      Traffic:['stores','iv1','iv2','iv6','trafficRegister'],CAB:['iv3','iv4','accountCardPosting'],LAO:['iv3','iv5'],SM:['iv6'],RPS:['demand','irpsOriginal','iv2','iv5','iv6']
    },
    Receipt:{
      Consignor:['advanceIssueVoucher','receiptVoucher2'],CentralRegistry:['advanceIssueVoucher'],Provision:['advanceIssueVoucher','receiptVoucher2'],TrafficReceipts:['drs1','drs2','drs3','receiptStoresBulk'],
      ReceiptProgress:['advanceIssueVoucher','receiptVoucher1','receiptVoucher2','drs2','drs3','rcrs1'],ReceiptArea:['receiptVoucher1','receiptVoucher2','drs1','drs2','drs3','rndorBulk','rndorDuesOut'],
      ReceiptLiaison:['receiptVoucher1','receiptVoucher2','drs2','rndorBulk','rndorDuesOut'],ReceiptControl:['receiptVoucher1','receiptVoucher2','drs2','rcrs1','rcrs2','rcrs3'],
      MLRS:['receiptVoucher1'],DOC:['receiptVoucher1'],FPVRelease:['receiptVoucher1','rndorDuesOut'],DuesOutSuspense:['rndorDuesOut','receiptStoresDuesOut'],
      BulkStore:['rndorBulk','receiptStoresBulk','binCardReceipt'],Packing:['receiptStoresDuesOut'],CAB:['receiptVoucher1','rcrs3','receiptAccountPosting'],
      RPS:['receiptVoucher2','drs3','rcrs2'],ReceiptDiscrepancy:['discrepancyReport','adjustmentVoucher'],DAO:['discrepancyReport','adjustmentVoucher']
    }
  };
  const campaignDocumentIds={
    Issue:[
      ['demand'],['demand'],['demand','irpsOriginal','irpsDuplicate'],['demand','irpsOriginal','irpsDuplicate'],
      ['demand','irpsOriginal','irpsDuplicate','scheduleOfIndents'],['demand','irpsOriginal','irpsDuplicate','scheduleOfIndents'],
      ['irpsOriginal'],['demand','irpsDuplicate','iv1','iv2','iv3','iv4','iv5','iv6'],['demand','irpsOriginal'],
      ['irpsDuplicate','iv1','iv2','iv3','iv4','iv5','iv6'],['iv1','iv2','iv3','iv4','iv5','iv6'],
      ['iv1','iv2','iv3','iv4','iv5','iv6'],['stores','iv1','iv2','iv3','iv4','iv5','iv6','binCardSelection'],
      ['irpsDuplicate','iv3','iv4'],['iv3','iv4','accountCardPosting'],['iv3'],
      ['stores','iv1','iv2','iv5','iv6','packingNoteOriginal','packingNoteDuplicate','packingCompletionOriginal','packingCompletionDuplicate'],
      ['irpsDuplicate','iv5'],['irpsOriginal','iv5'],['iv5'],['stores','iv1','iv2','iv6','trafficRegister'],
      ['stores','iv2'],['irpsOriginal','iv2'],['demand','irpsOriginal','iv6'],['iv6'],['demand','irpsOriginal','iv6','unitPadBundle']
    ],
    Receipt:[
      ['receiptVoucher1','receiptVoucher2'],['receiptVoucher1'],['receiptVoucher1'],['receiptVoucher1'],
      ['receiptVoucher2','drs1','drs2','drs3','receiptStoresBulk'],['receiptVoucher2','drs1','drs2','drs3','receiptStoresBulk'],
      ['receiptVoucher2','drs2'],['receiptVoucher1','receiptVoucher2','drs2','drs3'],['receiptVoucher1','receiptVoucher2','drs2'],
      ['receiptVoucher1','receiptVoucher2','drs2','rcrs1','rcrs2','rcrs3'],
      ['receiptVoucher1','receiptVoucher2','drs2','receiptStoresBulk'],['receiptVoucher1','receiptVoucher2','drs2'],
      ['receiptVoucher1'],['receiptVoucher1'],['receiptVoucher1'],
      ['receiptVoucher1','receiptVoucher2','drs2','rndorBulk','rndorDuesOut'],
      ['rndorBulk','rndorDuesOut','receiptStoresBulk','receiptStoresDuesOut'],
      ['rndorBulk','receiptStoresBulk','binCardReceipt'],['rndorBulk'],
      ['rndorDuesOut','receiptStoresDuesOut'],['rndorDuesOut'],['receiptStoresDuesOut','iv1','iv2','iv5','iv6'],
      ['receiptVoucher1','receiptVoucher2','drs2','drs3','rcrs1'],['receiptVoucher1','rcrs3','receiptAccountPosting'],
      ['receiptVoucher2'],['receiptVoucher2','drs3','rcrs2'],['receiptVoucher2']
    ]
  };
  issueCampaignStages.forEach((stage,index)=>stage.documentIds=campaignDocumentIds.Issue[index]);
  receiptCampaignStages.forEach((stage,index)=>stage.documentIds=campaignDocumentIds.Receipt[index]);

  const routeEvent=(action,reason,companion,waiting,documentIds,handoffToNext='custody',focus='')=>({action,reason,companion,waiting,documentIds,handoffToNext,focus});
  const characterStageEvents={
    receiptVoucher1:[
      routeEvent('Dispatch RV1 in advance to the receiving depot.','RV1 starts as the advance copy; it is not inside the consignment.','RV1.','RV2 travels inside Package No.1.',['receiptVoucher1']),
      routeEvent('Date-stamp RV1 and send it to Provision.','Central Registry separates the voucher and transit streams.','RV1.','Transit papers go separately to Traffic Receipts.',['receiptVoucher1']),
      routeEvent('Post the dues-in watch and send RV1 to Receipts Progress.','The advance copy opens control before stores arrive.','RV1.','The consignment continues independently.',['receiptVoucher1']),
      routeEvent('File RV1 in the consignor pad until RV2 and DRS2 arrive; then release it through Liaison.','RV1 waits here and is not yet posted.','RV1.','RV2 and DRS2 must arrive before marriage.',['receiptVoucher1']),
      routeEvent('Carry the married RV1/RV2/DRS2 set to Receipts Control.','Liaison preserves the linked transaction.','RV1, RV2 and DRS2.','Stores remain in Receipts Area.',['receiptVoucher1','receiptVoucher2','drs2']),
      routeEvent('Allot the receipt control number and return the set to Receipts Area.','Control precedes physical receipt checking.','RV1, RV2 and DRS2.','RCRS1–3 split to three prescribed holders.',['receiptVoucher1','receiptVoucher2','drs2','rcrs1','rcrs2','rcrs3']),
      routeEvent('Check stores against the controlled vouchers; send the checked papers to Liaison.','RN&DOR does not yet exist at this stage.','RV1, RV2 and DRS2.','Stores remain in Receipts Area.',['receiptVoucher1','receiptVoucher2','drs2']),
      routeEvent('Hold RV2/DRS2 and send RV1 alone to MLRS.','Location and dues-out decisions must precede RN&DOR preparation.','RV1.','RV2 and DRS2 wait in the “Awaiting RV1 from DOC” folder.',['receiptVoucher1','receiptVoucher2','drs2']),
      routeEvent('Verify identity and mark the shed/area location on RV1.','Location must be established before distribution.','RV1.','RV2/DRS2 wait at Liaison.',['receiptVoucher1']),
      routeEvent('Review RV1 against Dues Out Cards and mark any release quantity.','DOC decides whether FPV Release is required.','RV1.','RN&DOR has not been prepared.',['receiptVoucher1']),
      routeEvent('Extract Further Part Vouchers, stamp RV1 and return it to Liaison.','This visit occurs only where dues-out release is required.','RV1.','Further Part Vouchers wait for the later RN&DOR copy.',['receiptVoucher1']),
      routeEvent('Re-marry RV1/RV2, prepare RN&DOR, stamp the vouchers and send RV1/RV2/DRS2 to Receipts Progress.','RN&DOR is created only after RV1 returns from MLRS/DOC and conditional FPV extraction.','RV1, RV2 and DRS2.','RN&DOR copies split separately to FPV Release and Receipts Area.',['receiptVoucher1','receiptVoucher2','drs2','rndorBulk','rndorDuesOut']),
      routeEvent('Sign and split the cleared papers: RV1 to CAB, RV2 to Provision; file DRS2.','Posting and acknowledgement now close on separate branches.','RV1.','RV2 goes to Provision; DRS2 remains filed here.',['receiptVoucher1','receiptVoucher2','drs2']),
      routeEvent('Post, check and file RV1 by receipt-control number.','CAB is RV1’s final destination.','RV1 and posting evidence.','RV2 continues independently to the consignor.',['receiptVoucher1','rcrs3','receiptAccountPosting'])
    ],
    receiptVoucher2:[
      routeEvent('Extract RV2 from Package No.1 and send it with DRS2 through Liaison.','RV2 first becomes active at Receipts Area.','RV2 and DRS2.','RV1 waits in Receipts Progress; RN&DOR does not exist.',['receiptVoucher2','drs2']),
      routeEvent('Carry RV2/DRS2 to Receipts Progress.','The stores-side papers must meet advance RV1.','RV2 and DRS2.','Stores remain in Receipts Area.',['receiptVoucher2','drs2']),
      routeEvent('Marry RV2/DRS2 with RV1 and return the set through Liaison.','All three documents need one control identity.','RV1, RV2 and DRS2.','DRS3 watches separately.',['receiptVoucher1','receiptVoucher2','drs2','drs3']),
      routeEvent('Carry the linked set to Receipts Control.','Liaison is the controlled courier.','RV1, RV2 and DRS2.','Stores wait in Receipts Area.',['receiptVoucher1','receiptVoucher2','drs2']),
      routeEvent('Allot control and return the linked documents to Receipts Area.','The RCRS copies split here.','RV1, RV2 and DRS2.','RCRS1–3 move to separate holders.',['receiptVoucher1','receiptVoucher2','drs2','rcrs1','rcrs2','rcrs3']),
      routeEvent('Check stores against RV2 and note any discrepancy.','RN&DOR is still not present during controlled checking.','RV1, RV2 and DRS2.','Discrepant items take their separate route.',['receiptVoucher1','receiptVoucher2','drs2']),
      routeEvent('Hold RV2/DRS2 while RV1 visits MLRS/DOC; clear the papers only after RV1 returns and RN&DOR is prepared.','RV2 never travels to MLRS or DOC.','RV2 and DRS2.','RV1 travels alone.',['receiptVoucher1','receiptVoucher2','drs2','rndorBulk','rndorDuesOut']),
      routeEvent('Obtain the authorised receipt signature and send RV2 to Provision.','RV2 now begins its acknowledgement-return branch.','Receipted RV2.','RV1 moves separately to CAB.',['receiptVoucher2']),
      routeEvent('Ink/clear dues-in and send receipted RV2 to R&PS/CRS.','Provision closes its advance watch.','Receipted RV2.','RV1 remains in CAB.',['receiptVoucher2']),
      routeEvent('Record return progress and forward RV2 to the consignor.','R&PS/CRS controls acknowledgement return.','Receipted RV2.','RCRS2 remains as progress evidence.',['receiptVoucher2','rcrs2']),
      routeEvent('Receive the receipted RV2.','The acknowledgement returns to its originator.','Receipted RV2.','CAB retains RV1.',['receiptVoucher2'])
    ],
    drs2:[
      routeEvent('Prepare DRS2 with DRS1/DRS3 and deliver the packages to Receipts Area.','Traffic Receipts originates the DRS set.','DRS1, DRS2, DRS3 and packages.','RV1 waits in Receipts Progress.',['drs1','drs2','drs3','receiptVoucher2']),
      routeEvent('Take over packages, retain DRS2 and send it with extracted RV2 through Liaison.','This first visit is before control, full checking and RN&DOR.','DRS2 and RV2.','DRS1 returns to Traffic; DRS3 goes to Progress; RN&DOR does not exist.',['drs1','drs2','drs3','receiptVoucher2']),
      routeEvent('Carry DRS2/RV2 to Receipts Progress.','They must be married with advance RV1.','DRS2 and RV2.','Stores stay in Receipts Area.',['drs2','receiptVoucher2']),
      routeEvent('Marry DRS2/RV2 with RV1 and return the set through Liaison.','All three documents need one control identity.','RV1, RV2 and DRS2.','DRS3 remains separate.',['receiptVoucher1','receiptVoucher2','drs2','drs3']),
      routeEvent('Carry the linked set to Receipts Control.','Liaison preserves document custody.','RV1, RV2 and DRS2.','Stores remain in Receipts Area.',['receiptVoucher1','receiptVoucher2','drs2']),
      routeEvent('Enter the receipt control number on DRS2 and return it to Receipts Area.','Control precedes physical checking.','RV1, RV2 and DRS2.','RCRS1–3 split.',['receiptVoucher1','receiptVoucher2','drs2','rcrs1','rcrs2','rcrs3']),
      routeEvent('Use controlled DRS2 during checking; then pass DRS2/RV1/RV2 to Liaison.','RN&DOR has still not been prepared.','RV1, RV2 and DRS2.','Stores await distribution.',['receiptVoucher1','receiptVoucher2','drs2']),
      routeEvent('Hold DRS2/RV2 while RV1 visits MLRS/DOC; after its return, record RN&DOR completion and send DRS2 to Progress.','DRS2 never travels to MLRS/DOC.','DRS2 and RV2.','RV1 moves alone; RN&DOR is created only on its return.',['receiptVoucher1','receiptVoucher2','drs2','rndorBulk','rndorDuesOut']),
      routeEvent('Enter receipt in the Sub-Depot DRS register and file DRS2 serially.','DRS2 closes in Receipts Progress.','DRS2.','DRS3 separately proceeds to R&PS/CRS.',['drs2'])
    ],
    rndorBulk:[
      routeEvent('Prepare/check the Bulk/Detail RN&DOR copies and send distribution copies to Receipts Area.','The slip is created after RV1 returns from MLRS/DOC.','Bulk/Detail RN&DOR set.','RV1/RV2/DRS2 move to Receipts Progress.',['rndorBulk']),
      routeEvent('Marry RN&DOR with stores; return the signed original and send a destination copy with the stores.','Receipt Area divides immediate return evidence from the delivery copy.','Stores and the destination copy.','The signed original returns to Liaison.',['rndorBulk','receiptStoresBulk']),
      routeEvent('Check, locate and bin/stack stores; post the Bin Card and return the receipted copy.','The location, Bin Card serial and signature prove stock receipt.','Receipted RN&DOR.','Stores remain in stock.',['rndorBulk','receiptStoresBulk','binCardReceipt']),
      routeEvent('Marry all returned copies and file the complete set.','Liaison closes the evidence after every copy returns.','Complete RN&DOR set.','No copy remains in transit.',['rndorBulk'])
    ],
    rndorDuesOut:[
      routeEvent('Prepare/check the set; send one copy to FPV Release and remaining copies to Receipts Area.','The RN&DOR copies divide at Liaison.','Focus follows the FPV Release copy.','Distribution copies simultaneously go to Receipts Area.',['rndorDuesOut']),
      routeEvent('Match the copy to extracted Further Part Vouchers, endorse serials/date and send the vouchers to Suspense.','The next step switches to a distribution copy already at Receipts Area; it is not sent there by FPV Release.','FPV Release copy and extracted vouchers.','Distribution copies are already at Receipts Area.',['rndorDuesOut'],'focus-switch','Distribution copy'),
      routeEvent('Marry the distribution copy with dues-out stores and send both to Suspense.','This copy came directly from Liaison.','Dues-out stores and RN&DOR.','Further Part Vouchers arrive separately from FPV Release.',['rndorDuesOut','receiptStoresDuesOut']),
      routeEvent('Record location, select against Further Part Vouchers and return signed RN&DOR evidence.','Suspense releases only authorised quantities.','Receipted RN&DOR.','Released stores continue to Packing.',['rndorDuesOut','receiptStoresDuesOut']),
      routeEvent('Marry returned evidence and file the completed set.','Liaison closes the split trails.','Completed RN&DOR set.','Released stores are in the Issue stream.',['rndorDuesOut'])
    ],
    receiptStoresBulk:[
      routeEvent('Deliver the packages with DRS1–3 to Receipts Area.','Traffic starts physical receipt custody.','Packages and DRS1–3.','RV1 follows the advance route.',['receiptStoresBulk','drs1','drs2','drs3']),
      routeEvent('Hold stores through RV marriage/control and checking; wait for RN&DOR after MLRS/DOC.','Stores do not move directly to Bulk/Detail on initial arrival.','Checked stores remain here.','RV1 travels through MLRS/DOC; RN&DOR is not yet available.',['receiptStoresBulk','receiptVoucher1','receiptVoucher2','drs2']),
      routeEvent('Receive against RN&DOR, bin/stack and post the Bin Card.','This is the physical stock destination.','Stores and Bulk/Detail RN&DOR.','Receipted RN&DOR returns to Liaison.',['receiptStoresBulk','rndorBulk','binCardReceipt'])
    ],
    receiptStoresDuesOut:[
      routeEvent('Deliver the packages with DRS1–3 to Receipts Area.','Traffic starts physical receipt custody.','Packages and DRS1–3.','RV1 follows the advance route.',['receiptStoresDuesOut','drs1','drs2','drs3']),
      routeEvent('Hold/check stores through document control; move dues-out quantity only after RN&DOR exists.','Stores cannot enter Suspense on first arrival.','Checked dues-out quantity remains here.','RN&DOR and FPV trails are prepared separately.',['receiptStoresDuesOut','receiptVoucher1','receiptVoucher2','drs2']),
      routeEvent('Hold separately and select only against released Further Part Vouchers.','Suspense is controlled waiting, not normal stock.','Dues-out stores, RN&DOR and Further Part Vouchers.','Any unreleased balance remains.',['receiptStoresDuesOut','rndorDuesOut']),
      routeEvent('Pass released stores with IV1, IV2, IV5 and IV6 into Issue packing.','This is the Receipt-to-Issue hand-off.','Released stores and Issue Voucher copies.','IV3/IV4 go separately to SDIC/Accounts.',['receiptStoresDuesOut','iv1','iv2','iv5','iv6'])
    ]
  };

  const issueVoucherIds=new Set(['iv1','iv2','iv3','iv4','iv5','iv6']);
  const transitIds=new Set(['roadTransit','railTransit','postalTransit','localIssueTransit','railwayReceipt','parcelWayBill','convoyDocument']);
  const packageIds=new Set(['stores','eachPackage','packageOneWithIv2']);
  function issueBundle(character,office,index){
    const id=character.id;
    if(issueVoucherIds.has(id)){
      if(['VoucherPrep','SDIC','DOC','MLRS'].includes(office))return 'Controlled demand, IRPS Duplicate and the six-copy Issue Voucher set (IV1–IV6).';
      if(office==='Selection')return id==='iv3'||id==='iv4'?'IV3 and IV4, split back to SDIC after selection.':'Selected stores with IV1, IV2, IV5 and IV6; IV3/IV4 take the separate SDIC–Accounts branch.';
      if(office==='Packing')return id==='iv2'?'IV2 inside Package No. 1.':id==='iv5'?'IV5, returned from Packing to SDIC as packing-progress evidence.':`${character.name} with the packed consignment and the applicable packing evidence.`;
      if(office==='Traffic')return id==='iv2'?'Package No. 1 containing IV2, travelling with the consignment.':`${character.name}, the packages and the applicable despatch evidence.`;
      return character.name+'.';
    }
    if(id==='demand')return office==='DemandingUnit'?'Authorised demand/indent.':office==='RPS'?'Demand linked to the central IRPS and the issue-control papers.':'Demand/indent with the applicable IRPS and control evidence.';
    if(id==='irpsDuplicate')return office==='ISS'||office==='ULC'||office==='IndentChecking'?'IRPS Duplicate with the demands being sorted and checked.':office==='ICR'||office==='VoucherPrep'?'IRPS Duplicate with the controlled demand.':'IRPS Duplicate and the Sub-Depot execution papers.';
    if(id==='irpsOriginal'||id==='issuesControlSheet')return `${character.name}, the central Issue progress medium.`;
    if(id==='scheduleOfIndents')return 'Schedule of Indents carrying the listed demands and, after control, their allotted control numbers.';
    if(id.startsWith('packingNote'))return 'One original/duplicate Packing Note set for the corresponding package.';
    if(id.startsWith('packingCompletion')||id==='collectionDocument')return 'Packing Completion Advice/collection evidence linked to the listed packages.';
    if(transitIds.has(id))return `${character.name} with the applicable IV1/consignment or returned acknowledgement required by that transport mode.`;
    if(['trafficRegister','localIssueRegister','postalIssueRegister'].includes(id))return `${character.name}, retained as the applicable Traffic control record.`;
    if(packageIds.has(id))return office==='Selection'?'Selected stores with IV1, IV2, IV5 and IV6.':office==='Packing'?'Packed stores; Package No. 1 contains IV2, and each package contains its original Packing Note.':'Packages with the prescribed Issue and transit papers.';
    if(id==='receiptedAcknowledgement')return 'Receipted IV2, signed and dated by the consignee.';
    return character.name+'.';
  }
  function issueStageAction(character,office,index){
    const id=character.id,next=character.route[index+1],last=index===character.route.length-1,secondVisit=character.route.indexOf(office)!==index;
    if(office==='DemandingUnit'){
      if(id==='demand')return 'Raise and sign the authorised demand/indent, then send it to Depot Headquarters for receipt control.';
      if(id==='scheduleOfIndents')return 'Receive the returned Schedule of Indents carrying the allotted depot control numbers and retain it as the unit’s control-number intimation.';
      if(id==='receiptedAcknowledgement')return 'Check the received stores, sign and date IV2 as the receipt acknowledgement, and return that receipted IV2 to R&PS/CRS.';
      if(transitIds.has(id))return next==='Traffic'?'Acknowledge receipt on the prescribed convoy/local-collection copy and return that copy to Traffic.':'Accept the applicable carrier/dispatch paper with the consignment and retain it for the consignee’s receipt action.';
      return id==='iv2'?'Open Package No. 1, check the stores, sign/date IV2 and return the receipted copy to R&PS/CRS.':'Check the stores and packages against the issue papers and accept the consignment for the demanding unit.';
    }
    if(office==='HQ')return 'Date- and time-stamp the incoming demand, establish depot receipt, and send it to Indent Sorting Section.';
    if(office==='ISS'){
      if(id==='scheduleOfIndents')return 'Keep the accompanying Schedule of Indents with the sorted demand batch and send it to Indent Checking; do not invent or re-create the schedule here.';
      return 'Sort the demands by the prescribed grouping, prepare the IRPS in duplicate with columns 1–4, and send any non-static-unit case through ULC.';
    }
    if(office==='ULC')return `Verify the non-static unit’s location, annotate the ${id==='demand'?'demand':'IRPS Duplicate'}, and return the papers to Indent Checking.`;
    if(office==='IndentChecking')return `Check authority, unit identity, nomenclature, entitlement and completeness; initial/date the checked demand and send ${id==='scheduleOfIndents'?'the accompanying schedule with it':'the correct papers'} to Issue Control Registry.`;
    if(office==='ICR'){
      if(id==='scheduleOfIndents')return 'Allot the depot control number and enter it against each indent on the Schedule of Indents before sending the completed schedule to Central Registry.';
      if(id==='irpsOriginal'||id==='issuesControlSheet')return 'Complete IRPS control columns 5–7 and split the Original to R&PS/CRS as the central progress copy.';
      if(id==='irpsDuplicate')return 'Complete IRPS control columns 5–7 and send the Duplicate with the controlled demand to Voucher Preparation.';
      return 'Allot the depot control number, complete the IRPS control entries and send the controlled demand to Voucher Preparation.';
    }
    if(office==='CentralRegistry')return 'Register and despatch the completed Schedule of Indents to the demanding unit as control-number intimation.';
    if(office==='VoucherPrep'){
      if(id==='demand')return 'Use the controlled demand to prepare and check IV1–IV6, then forward the demand to R&PS/CRS for the central unit-pad watch.';
      if(id==='irpsDuplicate')return 'Link the IRPS Duplicate and controlled demand to the checked IV1–IV6 set, then send the execution bundle to SDIC.';
      return `Prepare and check ${character.name} as its distinct member of IV1–IV6, recording the prescribed depot, consignee, demand and item particulars before sending the voucher set to SDIC.`;
    }
    if(office==='SDIC'){
      if(id==='irpsDuplicate'&&last)return 'Record the returned selection and packing progress, cross the prescribed checklist entries, and file the IRPS Duplicate in the SDIC monthly folder.';
      if(id==='iv3'||id==='iv4')return secondVisit?`Receive ${character.name} back from Selection and send it with its paired accounts copy to CAB.`:`Register ${character.name} in the Sub-Depot progress watch and send the execution papers through DOC and MLRS.`;
      if(id==='iv5'&&secondVisit)return 'Receive IV5 back from Packing, record the packing-progress return, and send IV5 to R&PS/CRS for LAO scheduling.';
      return `Register ${character.name} in the Sub-Depot execution watch, preserve its copy identity, and send the papers to DOC for issue-position review.`;
    }
    if(office==='DOC')return `Review the issue/dues-out position affecting ${character.name}, mark the supported quantities or status, and send the papers to MLRS; do not treat this as location marking.`;
    if(office==='MLRS')return `Confirm the authorised item identity and mark the exact shed/rack location on the execution papers carrying ${character.name}, then release them for Selection.`;
    if(office==='Selection'){
      if(id==='binCardSelection')return 'Post the selected quantity and resulting balance on the relevant Bin Card, and initiate replenishment action when the prescribed point is reached.';
      if(packageIds.has(id))return 'Pick the authorised item and quantity from the MLRS-marked location, post the Bin Card, and send the stores with IV1, IV2, IV5 and IV6 to Packing.';
      if(id==='iv3'||id==='iv4')return `After selection, split ${character.name} with ${id==='iv3'?'IV4':'IV3'} back to SDIC for the Accounts/LAO branch.`;
      return `After selection, keep ${character.name} with the stores in the IV1/IV2/IV5/IV6 bundle and send that bundle to Packing.`;
    }
    if(office==='Packing'){
      if(id==='packingNoteOriginal')return 'Prepare, sign and witness the original Packing Note for this package, cross-reference its serial on IV1/IV5/IV6, and enclose the original in that package.';
      if(id==='packingNoteDuplicate')return 'Prepare, sign and witness the duplicate Packing Note and retain it in the bound Packing record in numerical sequence.';
      if(id==='packingCompletionOriginal')return 'List the IV1 control/Sub-Depot serials on the original Packing Completion Advice and hand it with the packages to Traffic for signed takeover.';
      if(id==='packingCompletionDuplicate')return 'Retain the duplicate Packing Completion Advice after obtaining Traffic’s takeover signature, and file it serially in Packing.';
      if(id==='collectionDocument')return 'Prepare the package-collection hand-over evidence, obtain Traffic’s acknowledgement for the listed packages, and pass the connected original to Traffic.';
      if(id==='iv2')return 'Place IV2 inside Package No. 1 so the consignee can receipt and return it after checking the stores.';
      if(id==='iv5')return 'Enter the packing references on IV5 and return IV5 to SDIC as packing-progress evidence; do not despatch it with the consignment.';
      if(packageIds.has(id))return 'Check and pack the stores, number/mark each package, enclose IV2 in Package No. 1 and an original Packing Note in each package, then hand the consignment to Traffic.';
      return `Record the package/Packing Note references on ${character.name} and send it with the packed consignment to Traffic.`;
    }
    if(office==='Traffic'){
      if(id==='packingCompletionOriginal'||id==='collectionDocument')return `Sign for the packages against ${character.name}, record the collection date/time, and file the connected Traffic copy in serial order.`;
      if(id==='trafficRegister')return 'Enter control number, collection, IV1 despatch, stores despatch, carrier reference and remarks in the Traffic Register, then retain the bound entry.';
      if(id==='localIssueRegister')return 'Record the authorised representative, IV1 authority, collection signature/date and return control in the Local Issues Register.';
      if(id==='postalIssueRegister')return 'Record the postal despatch and postal receipt/reference in the Postal Issue Register and retain the supporting postal evidence.';
      if(id==='roadTransit'||id==='convoyDocument')return secondVisit?'Enter the returned acknowledgement against the open convoy/road entry and file the closed copy in Traffic.':'Prepare and serially control the Convoy Note/road copies, distribute the prescribed copies and record despatch before releasing the load.';
      if(id==='localIssueTransit')return secondVisit?'Enter the returned local-collection acknowledgement and close the Local Issues Register watch.':'Verify the authorised representative and IV1 collection authority, obtain custody signature, and release the consignment for local collection.';
      if(id==='railTransit'||id==='railwayReceipt'||id==='parcelWayBill')return 'Check and record the carrier-issued RR/PWB reference, link it to IV1 and the despatch entry, and forward the prescribed carrier evidence with the rail consignment.';
      if(id==='postalTransit')return 'Register the postal issue, obtain and link the postal receipt/reference, and despatch the applicable IV1 or advice with the package.';
      if(id==='iv6')return 'Enter the actual despatch particulars on IV6 and send IV6 to R&PS/CRS for progress and Issue Time Check control.';
      if(id==='iv1')return 'Use IV1 as the despatch/consignee copy, record the applicable carrier details and send it with the consignment to the demanding unit.';
      return 'Take over the packages against signed Packing evidence, prepare the transport-mode records and despatch the consignment to the demanding unit.';
    }
    if(office==='CAB'){
      if(id==='iv4'||id==='accountCardPosting')return 'Post the issue from IV4 to the account card, enter the account reference, initial/date and check the posting, then file IV4.';
      return 'Receive IV3 with IV4, record the accounts receipt, and place IV3 on the prescribed skeleton/supplementary list for LAO.';
    }
    if(office==='LAO')return `Receive ${character.name} through the prescribed skeleton/supplementary list and retain the scheduled audit trail.`;
    if(office==='SM')return 'Read the despatch evidence on IV6, enter the Issue Time Check, and return IV6 to R&PS/CRS for unit-pad closure.';
    if(office==='RPS'){
      if(id==='irpsOriginal'||id==='issuesControlSheet')return 'Maintain the Original IRPS as the central progress record, mark the prescribed milestones and file it in the monthly Sub-Depot/Group pad.';
      if(id==='irpsDuplicate')return 'Progress the central watch while the IRPS Duplicate remains with Sub-Depot execution; do not merge the two copy purposes.';
      if(id==='iv2'||id==='receiptedAcknowledgement')return 'Record the returned acknowledgement on the progress control and file the receipted IV2 in control-number order.';
      if(id==='iv5')return 'Record IV5’s packing return and place it on the prescribed LAO skeleton/supplementary list.';
      if(id==='iv6')return secondVisit?'Link the time-checked IV6 with the relevant demand and close/file the unit pad.':'Record the despatch progress from IV6 and send it to S&M for Issue Time Check.';
      if(id==='demand')return 'Retain the demand in the central unit-pad watch and link it to the later returned/despatch evidence before closure.';
      if(id==='unitPadBundle')return 'Assemble the demand, time-checked IV6 and applicable returned control evidence, mark the pad complete and retain it in the unit-pad registry.';
    }
    return `${officeIntel.Issue[office].actions[0]} Apply that cited action specifically to ${character.name} before ${next?`handing it to ${offices.find(item=>item.id===next).label}`:'closing its declared lifecycle'}.`;
  }
  function receiptBundle(character,office){
    const id=character.id;
    if(id==='advanceIssueVoucher'||id==='receiptVoucher1')return office==='ReceiptLiaison'||office==='ReceiptControl'||office==='ReceiptArea'?'RV1, RV2 and DRS2 as the linked receipt-control set.':'RV1 advance/controlled copy at its declared holder.';
    if(id==='drs1')return office==='ReceiptArea'?'DRS1–3 with the packages at first takeover.':'DRS1 with the convoy/transit evidence.';
    if(id==='drs3')return 'DRS3, acknowledged and routed as the R&PS/CRS progress copy.';
    if(id.startsWith('rcrs'))return `${character.name}, split from the triplicate RCRS at Receipt Control.`;
    if(id==='discrepancyReport')return 'Discrepancy Report with the receipt reference, physical discrepancy evidence and controlled adjustment papers.';
    if(id==='adjustmentVoucher')return 'IAFO-2715 adjustment set linked to the Discrepancy Report and authorised control.';
    if(id==='receiptedRv2')return 'Receipted RV2 with the receipt-control and return-progress evidence.';
    if(id==='crvException')return 'Triplicate CRV set with DRS, package markings/weights, Packing Notes and available transit/voucher evidence.';
    if(id==='ctcException')return 'Reconstructed RV1 plus the travelling CTC and the separately retained trap copy.';
    return character.name+'.';
  }
  function receiptStageAction(character,office,index){
    const id=character.id,next=character.route[index+1],secondVisit=character.route.indexOf(office)!==index;
    if(id==='advanceIssueVoucher'){
      return {Consignor:'Send the advance RV1 to the receiving depot before the physical consignment.',CentralRegistry:'Date-stamp the advance RV1 and send it to Provision; send transit papers separately to Traffic Receipts.',Provision:'Open the dues-in watch from the advance RV1 and send it to Receipts Progress.',ReceiptProgress:'File the advance RV1 in the consignor pad until RV2 and DRS2 arrive for marriage.'}[office];
    }
    if(id==='drs1'){
      return {TrafficReceipts:index===0?'Prepare DRS1–3 for the consignment/Sub-Depot grouping and send all three with the packages to Receipts Area.':'Receive acknowledged DRS1 back, clear the Traffic DRS Register and file DRS1 with the convoy note in serial order.',ReceiptArea:'Take over the packages, acknowledge DRS1 and return DRS1 to Traffic; retain DRS2 and send DRS3 to Progress.'}[office];
    }
    if(id==='drs3'){
      return {TrafficReceipts:'Prepare DRS3 as part of the three-copy DRS set and send it with the packages to Receipts Area.',ReceiptArea:'Acknowledge DRS3 at package takeover and send it to Receipts Progress; DRS1 returns to Traffic and DRS2 stays with the stores-side papers.',ReceiptProgress:'Enter/track the DRS3 movement in the Sub-Depot DRS control and send DRS3 to R&PS/CRS.',RPS:'Receive and file DRS3 as the central receipt-progress copy.'}[office];
    }
    if(id.startsWith('rcrs')){
      if(office==='ReceiptControl')return `Prepare the triplicate RCRS, open columns 1–6 and split ${character.name} to ${id==='rcrs1'?'Receipts Progress':id==='rcrs2'?'R&PS/CRS':'CAB'}.`;
      if(id==='rcrs1')return 'Use RCRS1 as the Receipts Progress control copy and enter the supported distribution/return clearance milestones.';
      if(id==='rcrs2')return 'Use RCRS2 to progress DRS3 and the receipted RV2 return, preserving it as the R&PS/CRS control copy.';
      return 'Use RCRS3 to watch RV1 account posting in CAB and enter the supported posting date in column 8.';
    }
    if(id==='binCardReceipt')return 'After cleared stores are binned/stacked, post the received quantity, reference and resulting balance on the Bulk/Detail Store Bin Card.';
    if(id==='receiptAccountPosting')return 'Post RV1 to the account card, record the receipt-control/account reference, initial/date and check the entry, then retain the posting evidence.';
    if(id==='receiptedRv2')return {ReceiptProgress:'Obtain/verify the authorised receipt on RV2 and send the receipted copy to Provision.',Provision:'Ink/clear the dues-in watch from receipted RV2 and send it to R&PS/CRS.',RPS:'Record acknowledgement-return progress and forward receipted RV2 to the consignor.',Consignor:'Receive receipted RV2 as proof that the receiving depot accepted the stores.'}[office];
    if(id==='discrepancyReport'){
      if(office==='ReceiptArea')return 'Segregate the discrepant stores and send the discrepancy facts and receipt evidence to the Sub-Depot Receipts Discrepancy Section.';
      if(office==='ReceiptDiscrepancy')return secondVisit?'Apply the DAO-controlled decision, prepare the final clearance/settlement evidence and return the completed case to DAO.':'Prepare the Discrepancy Report in duplicate and the required adjustment papers, linking DRS/RV, quantity, condition and custody evidence.';
      if(office==='DAO')return secondVisit?'Check the completed controlled action and forward the progressed discrepancy case to the consignor.':'Allot the discrepancy/adjustment control, decide the applicable claim or accounting action, and return the sanctioned direction to the Sub-Depot discrepancy section.';
      return 'Receive the progressed discrepancy case and continue settlement against the controlled report; do not treat it as normal-stock closure.';
    }
    if(id==='adjustmentVoucher'){
      return {ReceiptDiscrepancy:index===0?'Prepare the IAFO-2715 adjustment set in the prescribed copies and link it to the Discrepancy Report.':'Complete the DAO-authorised adjustment details and send the posting copy to CAB.',DAO:'Allot the adjustment control and authorise the accounting treatment supported by the discrepancy evidence.',CAB:'Post the authorised adjustment once, link it to RV1/loss evidence and file the controlled posting copy.'}[office];
    }
    if(id==='crvException'){
      if(office==='ReceiptArea')return 'In an officer’s presence, prepare the CRV in triplicate from the available DRS, package markings/weights, Packing Notes, transit evidence and escort signature.';
      if(office==='ReceiptControl')return 'Allot receipt control, mark CRV on DRS/RCRS and split the controlled CRV copies to their prescribed Accounts, R&PS/CRS and Progress holders.';
      if(office==='ReceiptProgress')return secondVisit?'On receipt of the regular voucher, link it to the CRV, mark it NOT TO BE POSTED — FOR LINKING ONLY, and update the DRS/RCRS trap evidence.':'Retain the triplicate/trap evidence, demand the regular voucher and begin the prescribed hastening record.';
      if(office==='CAB')return secondVisit?'Link the endorsed regular voucher to the already-posted CRV and prevent duplicate receipt posting.':'Post the original CRV once and record the account-card reference.';
      return secondVisit?'Close by prescribed destruction/conversion after linking; if still unlinked at six months, escalate through BAOC/Army HQ with audit remarks.':'Hold the return/control copy while the regular voucher is being progressed.';
    }
    if(id==='ctcException'){
      if(office==='ReceiptProgress')return secondVisit?'Clear the reconstructed RV1/CTC set after normal receipt action while preserving the retained trap-copy linkage.':'Convert the available RV2 to RV1, prepare two CTCs, mark the travelling copy identity boldly and retain the second CTC as the trap.';
      return {ReceiptControl:'Allot receipt control and mark CTC in RCRS remarks, then return the reconstructed set through its prescribed route.',ReceiptArea:'Check the stores using the reconstructed RV1 and the travelling CTC acting as RV2.',ReceiptLiaison:'Carry and clear the reconstructed copies without treating the CTC as an original voucher.',Provision:'Complete dues-in clearance on the CTC acting as RV2.',RPS:'Verify the receipt/control evidence and forward the cleared travelling CTC.',CentralRegistry:'Register and despatch the cleared CTC to the consignor.',Consignor:'Accept the travelling CTC as the prescribed substitute receipt copy; the trap copy remains subject to later linkage/destruction.'}[office];
    }
    return `${officeIntel.Receipt[office].actions[0]} Apply that cited action specifically to ${character.name} before ${next?`the declared next holder receives it`:'its final evidence is retained'}.`;
  }
  function completeCharacterEvents(character){
    return character.route.map((office,index)=>{
      const action=character.procedure==='Issue'?issueStageAction(character,office,index):receiptStageAction(character,office,index);
      const next=character.route[index+1],companion=character.procedure==='Issue'?issueBundle(character,office,index):receiptBundle(character,office);
      const waiting=next?`After this action, ${character.name} continues to ${offices.find(item=>item.id===next).label}; other copies remain on their separately declared branches.`:`Final disposition: ${character.finalDisposition}. Closure proof: ${character.closureProof}.`;
      return routeEvent(action,`This is the copy-specific ${offices.find(item=>item.id===office).label} action required to preserve ${character.closureProof}.`,companion,waiting,[character.id]);
    });
  }
  characters.filter(character=>character.playable&&!characterStageEvents[character.id]).forEach(character=>{characterStageEvents[character.id]=completeCharacterEvents(character)});

  const mainCharacterIds={
    Issue:['demand','irpsOriginal','irpsDuplicate','iv1','iv2','iv3','iv4','iv5','iv6','stores','packingNoteOriginal','packingCompletionOriginal','trafficRegister','receiptedAcknowledgement','unitPadBundle'],
    Receipt:['receiptVoucher1','receiptVoucher2','drs1','drs2','drs3','rcrs1','rcrs2','rcrs3','rndorBulk','rndorDuesOut','receiptStoresBulk','receiptStoresDuesOut','receiptAccountPosting','discrepancyReport','receiptedRv2']
  };

  return {
    procedure:'Issue and Receipt',
    receiptImplemented:true,
    offices,officeNames,officeWhy,officeIntel,mapLayouts,routes,branchRoutes,receiptRouteVariants,characterFocusSwitches,fullIssueRoute,fullReceiptRoute,campaigns,characters,transitions,officeSituations,formSchemas,formByRole,documentProfiles,officeDocumentSets,characterStageEvents,mainCharacterIds,
    roleInfo:legacy,
    mapOfficeIds:{Issue:['DemandingUnit','HQ','ISS','ULC','IndentChecking','ICR','VoucherPrep','SDIC','DOC','MLRS','Selection','Packing','Traffic','CentralRegistry','CAB','SM','RPS','LAO'],Receipt:['Consignor','CentralRegistry','Provision','TrafficReceipts','ReceiptProgress','ReceiptArea','ReceiptLiaison','ReceiptControl','MLRS','DOC','FPVRelease','DuesOutSuspense','BulkStore','Packing','ReceiptDiscrepancy','DAO','CAB','RPS']},
    sourcePolicy:{primary:['RAOS Part II','DGOSTI-002','DGOSTI-001'],providedPrimaryExtracts:true,sourceMap:'docs/PROCEDURE_SOURCE_MAP.md'}
  };
});
