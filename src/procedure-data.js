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
    ReceiptArea:'Receipts Area opens and checks packages against receipt vouchers, then distributes stores using RN&DOR slips.',
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

  const mapLayouts={Receipt:{
    Provision:{x:20,y:35,w:165,h:90},TrafficReceipts:{x:215,y:35,w:165,h:90},ReceiptProgress:{x:410,y:35,w:165,h:90},ReceiptArea:{x:605,y:35,w:165,h:90},ReceiptLiaison:{x:800,y:35,w:165,h:90},ReceiptControl:{x:995,y:35,w:165,h:90},
    DAO:{x:20,y:205,w:165,h:95},ReceiptDiscrepancy:{x:215,y:205,w:165,h:95},Packing:{x:410,y:205,w:165,h:95},BulkStore:{x:605,y:205,w:165,h:95},DuesOutSuspense:{x:800,y:205,w:165,h:95},FPVRelease:{x:995,y:205,w:165,h:95},
    Consignor:{x:20,y:525,w:165,h:100},CentralRegistry:{x:215,y:525,w:165,h:100},MLRS:{x:410,y:525,w:165,h:100},DOC:{x:605,y:525,w:165,h:100},CAB:{x:800,y:525,w:165,h:100},RPS:{x:995,y:525,w:165,h:100}
  }};

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
    companion:extra.companion||'As specified at each cited transition.',waitingElsewhere:extra.waitingElsewhere||'Recorded in the cited control medium.',
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
    companion:extra.companion||'As specified by DGOSTI-001 at each transition.',waitingElsewhere:extra.waitingElsewhere||'Tracked by DRS Register and RCRS.',
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
    rndorDuesOut:['ReceiptLiaison','ReceiptArea','DuesOutSuspense','ReceiptLiaison'],
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
    receiptApproved('crvException','Credit Receipt Voucher (CRV) exception','Accounting and exception entities','🧾',receiptRoutes.crvException,'CRV destroyed after regular-voucher linking, or retained and escalated under the six-month exception','RCRS and DRS carry linking or government-sanction evidence',[raosReceipt,'DGOSTI-001 Appendix D paras 3, 5(c) and 7; Appendix Q para 5 (PDF pp.25–30, 57–58)'],{companion:'CRV copies split to Accounts, R&PS/CRS and Receipts Progress; the mission teaches the normal-link and six-month escalation branches.',waitingElsewhere:'Triplicate CRV and packing notes remain in the consignor pad while the regular voucher is hastened.'}),
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
    campaignStage('ReceiptArea','Packages + DRS2','Packages taken over for checking','Acknowledge DRS delivery, open packages as prescribed and present RV2/DRS2 for Liaison linking.','Physical condition and quantity evidence must be preserved before distribution.','Packages, stores, RV2 and DRS2.','Advance RV1 remains in Receipts Progress.'),
    campaignStage('ReceiptLiaison','RV2 + DRS2','Package copy extracted and linked','Extract RV2 from Package No.1, link it with DRS2 and take the set to Receipts Progress.','Liaison joins the arriving stores papers with the waiting advance copy.','RV2 and DRS2.','Stores remain under Receipts Area custody.'),
    campaignStage('ReceiptProgress','RV1 + RV2 + DRS2','Advance and stores copies married','Marry RV2/DRS2 with the waiting RV1 and hand the linked set back to Liaison for control.','All subsequent control must refer to the same receipt transaction.','Linked RV1/RV2/DRS2 set.','DRS3 separately watches progress.'),
    campaignStage('ReceiptLiaison','Linked receipt set','Carried to Receipt Control','Present the linked documents to Receipt Control Registry and preserve copy identity.','Liaison is the courier/coordinator between progress, control and the physical area.','RV1, RV2 and DRS2.','Stores wait in Receipts Area.'),
    campaignStage('ReceiptControl','RV1 + RV2 + DRS2 + RCRS1–3','Receipt control number allotted','Allot the receipt control number; split RCRS1 to Receipts Progress, RCRS2 to R&PS/CRS and RCRS3 to CAB; return the controlled receipt set to Receipts Area.','Three independent watchers now track clearance, acknowledgement and posting.','Controlled RV1/RV2/DRS2 return to Receipts Area.','RCRS copies simultaneously move to their three holders.'),
    campaignStage('ReceiptArea','Controlled receipt set + stores','Designation, quantity and condition checked','Check stores against the controlled receipt vouchers and identify normal-stock, dues-out or discrepancy outcomes.','This is the physical acceptance gate.','Checked stores and receipt documents.','Any discrepancy must branch to the dedicated discrepancy procedure.'),
    campaignStage('ReceiptLiaison','RV1 + checked receipt evidence','Location/dues-out review initiated','Send RV1 for MLRS location marking and DOC review while coordinating RN&DOR preparation.','Receipt documents now direct the physical distribution.','RV1.','RV2 and DRS2 remain linked for later progress clearance.'),
    campaignStage('MLRS','RV1','Section, identity and shed/area location checked','Check section, part/catalogue number and designation; mark the storage location on RV1.','Correct location prevents mis-binning and wrong stock records.','RV1.','Stores remain in Receipts Area.'),
    campaignStage('DOC','RV1','Dues-out quantities reviewed','Review each item against Dues Out Cards and mark quantities requiring release.','A receipt may split between normal stock and dues-out suspense.','RV1.','Normal stock and dues-out quantities remain physically distinguishable.'),
    campaignStage('FPVRelease','RV1 + Further Part Vouchers','Dues-out authority extracted','Extract and control the relevant Further Part Vouchers, then return RV1 to Liaison; hold vouchers until RN&DOR evidence arrives.','Dues-out stock cannot be released merely because it is available.','RV1 returns to Liaison.','Further Part Vouchers wait in the release pad.'),
    campaignStage('ReceiptLiaison','RV1 + RN&DOR slips','Distribution authority prepared','Prepare separate RN&DOR evidence for Bulk/Detail and Dues-out destinations and send it to Receipts Area.','RN&DOR preserves destination and return evidence for each branch.','RN&DOR slips and checked receipt set.','RCRS copies continue to watch clearance.'),
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
    characterId,from,to:route[index+1],support:supported?'primary-supported':'prototype-unverified',primarySourceRef:supported?character.primarySourceRefs.join('; '):null,domainReview:!supported
  });}));
  const campaignTransitions=Object.entries(campaigns).flatMap(([campaignId,campaign])=>campaign.route.slice(0,-1).map((from,index)=>({id:`${campaignId}:${index}:${from}->${campaign.route[index+1]}`,characterId:campaignId,from,to:campaign.route[index+1],support:'primary-supported',handoffType:campaign.stages[index].handoffToNext,primarySourceRef:campaign.primarySourceRefs.join('; '),domainReview:false})));
  const variantTransitions=receiptRouteVariants.receiptVoucher1NoDuesOut.slice(0,-1).map((from,index)=>({id:`receiptVoucher1:no-dues:${index}:${from}->${receiptRouteVariants.receiptVoucher1NoDuesOut[index+1]}`,characterId:'receiptVoucher1',from,to:receiptRouteVariants.receiptVoucher1NoDuesOut[index+1],support:'primary-supported',primarySourceRef:'DGOSTI-001 Appendices F, G, J, K and O (PDF pp.36–53)',domainReview:false}));
  const transitions=[...routeTransitions,...campaignTransitions,...variantTransitions];
  const formSchemas={
    irps:{
      procedure:'Issue',title:'Issue Registration Progress Sheet (IRPS)',format:'Two copies: Original is the R&PS/CRS progress medium; Duplicate supports SDIC execution progress.',copy:'ORIGINAL / DUPLICATE',
      source:'DGOSTI-002 Appendix A (PDF p.56); paras 28, 51, 66–70, 210–214',
      columns:[['1','Serial No.'],['2','Unit'],['3','Unit demand No. and date'],['4','No. of items'],['5','Control No.—Section'],['6','Control No.—Number'],['7','Control No.—Date'],['8','Date No. 5 received'],['9','Date No. 6 received'],['10','Date No. 2 received'],['11','Remarks']],
      events:{
        ISS:{fields:['1','2','3','4'],note:'ISS opens the two-copy progress medium with demand identity and item count.'},
        ICR:{fields:['5','6','7'],note:'Issue Control allots and dates the depot control number; Original and Duplicate then split.'},
        SDIC:{fields:[],note:'The Duplicate IRPS watches Sub-Depot execution. The printed form distinguishes SDIC from R&PS responsibility.'},
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

  return {
    procedure:'Issue and Receipt',
    receiptImplemented:true,
    offices,officeWhy,officeIntel,mapLayouts,routes,branchRoutes,receiptRouteVariants,fullIssueRoute,fullReceiptRoute,campaigns,characters,transitions,formSchemas,formByRole,
    roleInfo:legacy,
    mapOfficeIds:{Issue:['DemandingUnit','HQ','ISS','ULC','IndentChecking','ICR','VoucherPrep','SDIC','DOC','MLRS','Selection','Packing','Traffic','CentralRegistry','CAB','SM','RPS','LAO'],Receipt:['Consignor','CentralRegistry','Provision','TrafficReceipts','ReceiptProgress','ReceiptArea','ReceiptLiaison','ReceiptControl','MLRS','DOC','FPVRelease','DuesOutSuspense','BulkStore','Packing','ReceiptDiscrepancy','DAO','CAB','RPS']},
    sourcePolicy:{primary:['RAOS Part II','DGOSTI-002','DGOSTI-001'],providedPrimaryExtracts:true,sourceMap:'docs/PROCEDURE_SOURCE_MAP.md'}
  };
});
