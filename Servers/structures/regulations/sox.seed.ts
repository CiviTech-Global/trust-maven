import { RegulationSeed } from "./types";

export const SOX_SEED: RegulationSeed = {
  code: "SOX",
  name: "Sarbanes-Oxley Act",
  type: "regulation",
  category: "financial_audit",
  jurisdiction: "US",
  issuer: "US Congress",
  version: "2002",
  description:
    "US federal law mandating reforms to enhance corporate responsibility, financial disclosures, and combat corporate and accounting fraud.",
  effectiveDate: "2002-07-30",
  requirements: [
    // ─── Title I: PCAOB ───────────────────────────────────────────────
    {
      code: "SOX-I",
      title: "Title I: Public Company Accounting Oversight Board",
      level: 0,
      orderNo: 1,
      description:
        "Establishes the Public Company Accounting Oversight Board (PCAOB) to oversee the audits of public companies and protect the interests of investors by ensuring accurate and independent audit reports.",
      keyQuestions: [
        "Is the external audit firm registered with and subject to PCAOB oversight?",
        "Are PCAOB inspection findings reviewed and remediated by the audit committee?",
      ],
      evidenceExamples: [
        "PCAOB registration confirmation for the external audit firm",
        "Audit committee minutes documenting review of PCAOB inspection reports",
      ],
      children: [
        {
          code: "SOX-101",
          title: "Sec. 101 - Establishment and Administrative Provisions",
          level: 1,
          orderNo: 1,
          description:
            "Establishes the PCAOB as a nonprofit corporation to oversee the audit of public companies, including the appointment of board members with defined qualifications and terms.",
          keyQuestions: [
            "Has the organization confirmed that its external auditor is subject to PCAOB jurisdiction?",
            "Does the audit committee understand the PCAOB's role and authority over the external auditor?",
          ],
          evidenceExamples: [
            "External auditor engagement letter referencing PCAOB oversight",
            "Audit committee charter acknowledging PCAOB authority",
          ],
        },
        {
          code: "SOX-102",
          title: "Sec. 102 - Registration with the Board",
          level: 1,
          orderNo: 2,
          description:
            "Requires public accounting firms that prepare or issue audit reports for public companies to register with the PCAOB, providing information about the firm, its audit clients, and quality control policies.",
          keyQuestions: [
            "Is the external auditor currently registered in good standing with the PCAOB?",
            "Has the audit committee verified the registration status of any secondary or component auditors?",
          ],
          evidenceExamples: [
            "PCAOB registration status lookup confirmation for the audit firm",
            "Due diligence checklist verifying component auditor registrations",
          ],
        },
        {
          code: "SOX-103",
          title: "Sec. 103 - Auditing, Quality Control, and Independence Standards",
          level: 1,
          orderNo: 3,
          description:
            "Authorizes the PCAOB to establish auditing and related attestation standards, quality control standards, and ethics standards for registered public accounting firms to follow in audit engagements.",
          keyQuestions: [
            "Are audit engagements conducted in accordance with current PCAOB auditing standards?",
            "Does the external auditor maintain documented quality control policies aligned with PCAOB requirements?",
          ],
          evidenceExamples: [
            "Audit engagement letter referencing applicable PCAOB standards",
            "External auditor's quality control system documentation",
          ],
        },
        {
          code: "SOX-104",
          title: "Sec. 104 - Inspections of Registered Public Accounting Firms",
          level: 1,
          orderNo: 4,
          description:
            "Mandates regular PCAOB inspections of registered accounting firms to assess compliance with SOX, PCAOB rules, SEC rules, and professional standards in connection with audit engagements.",
          keyQuestions: [
            "Has the audit committee reviewed the most recent PCAOB inspection report for the external auditor?",
            "Were any deficiencies identified in the PCAOB inspection, and how were they addressed?",
          ],
          evidenceExamples: [
            "Most recent PCAOB inspection report for the external audit firm",
            "Audit committee meeting minutes discussing inspection findings and remediation plans",
          ],
        },
        {
          code: "SOX-105",
          title: "Sec. 105 - Investigations and Disciplinary Proceedings",
          level: 1,
          orderNo: 5,
          description:
            "Grants the PCAOB authority to investigate potential violations of SOX, PCAOB rules, and professional standards, and to impose disciplinary sanctions including censure, suspension, or revocation of registration.",
          keyQuestions: [
            "Is the external auditor currently subject to any PCAOB disciplinary proceedings?",
            "Does the organization have a contingency plan if the external auditor is sanctioned by the PCAOB?",
          ],
          evidenceExamples: [
            "PCAOB enforcement action database search results for the audit firm",
            "Audit firm transition contingency plan",
          ],
        },
        {
          code: "SOX-109",
          title: "Sec. 109 - Funding",
          level: 1,
          orderNo: 6,
          description:
            "Establishes the funding mechanism for the PCAOB through annual accounting support fees assessed on public company issuers, based on their relative market capitalizations.",
          keyQuestions: [
            "Is the organization aware of its share of the annual PCAOB accounting support fee?",
            "Are PCAOB support fees properly accounted for in financial statements?",
          ],
          evidenceExamples: [
            "PCAOB fee allocation notice or invoice",
            "General ledger entries for PCAOB accounting support fees",
          ],
        },
      ],
    },

    // ─── Title II: Auditor Independence ───────────────────────────────
    {
      code: "SOX-II",
      title: "Title II: Auditor Independence",
      level: 0,
      orderNo: 2,
      description:
        "Strengthens auditor independence by restricting the types of non-audit services that external auditors may provide to their audit clients and establishing requirements for audit partner rotation and audit committee oversight.",
      keyQuestions: [
        "Does the organization maintain a policy governing the use of the external auditor for non-audit services?",
        "Is auditor independence evaluated and documented at least annually?",
      ],
      evidenceExamples: [
        "Auditor independence policy document",
        "Annual auditor independence assessment report",
      ],
      children: [
        {
          code: "SOX-201",
          title: "Sec. 201 - Services Outside the Scope of Practice of Auditors",
          level: 1,
          orderNo: 1,
          description:
            "Prohibits registered public accounting firms from providing certain non-audit services contemporaneously with an audit engagement, including bookkeeping, financial information systems design, appraisal services, actuarial services, internal audit outsourcing, management or human resources functions, broker-dealer services, and legal and expert services unrelated to the audit.",
          keyQuestions: [
            "Has the organization cataloged all services provided by the external auditor to ensure none are prohibited?",
            "Is there a pre-engagement review process to screen proposed non-audit services against the prohibited list?",
          ],
          evidenceExamples: [
            "Register of all services provided by the external audit firm and independence classification",
            "Pre-engagement approval form for non-audit services with independence review",
          ],
        },
        {
          code: "SOX-202",
          title: "Sec. 202 - Pre-approval Requirements",
          level: 1,
          orderNo: 2,
          description:
            "Requires that the audit committee pre-approve all audit and permissible non-audit services provided by the external auditor, with limited de minimis exceptions, ensuring that the committee maintains oversight of the auditor relationship.",
          keyQuestions: [
            "Does the audit committee pre-approve all audit and permissible non-audit services before engagement?",
            "Is there a documented policy for de minimis exceptions to pre-approval, and are they tracked?",
          ],
          evidenceExamples: [
            "Audit committee pre-approval policy and delegation framework",
            "Log of pre-approved services with dates, amounts, and approving committee members",
          ],
        },
        {
          code: "SOX-203",
          title: "Sec. 203 - Audit Partner Rotation",
          level: 1,
          orderNo: 3,
          description:
            "Requires the lead audit partner and the concurring review partner to rotate off the audit engagement after five consecutive fiscal years, with a five-year cooling-off period before they may return.",
          keyQuestions: [
            "Does the organization track the tenure of the lead audit partner and reviewing partner?",
            "Is a partner rotation schedule maintained and reviewed by the audit committee?",
          ],
          evidenceExamples: [
            "Audit partner tenure tracking log with rotation dates",
            "Audit committee minutes documenting review and approval of partner rotation plan",
          ],
        },
        {
          code: "SOX-204",
          title: "Sec. 204 - Auditor Reports to Audit Committees",
          level: 1,
          orderNo: 4,
          description:
            "Requires the external auditor to report timely to the audit committee all critical accounting policies and practices used, alternative accounting treatments discussed with management, and other material written communications between the auditor and management.",
          keyQuestions: [
            "Does the external auditor provide required communications to the audit committee in a timely manner?",
            "Are alternative accounting treatments and their implications discussed with the audit committee?",
          ],
          evidenceExamples: [
            "External auditor's required communications letter to the audit committee",
            "Audit committee meeting minutes documenting discussion of critical accounting policies and alternatives",
          ],
        },
        {
          code: "SOX-206",
          title: "Sec. 206 - Conflicts of Interest",
          level: 1,
          orderNo: 5,
          description:
            "Prohibits a registered public accounting firm from performing an audit if the CEO, CFO, controller, chief accounting officer, or equivalent at the issuer was employed by the audit firm and participated in the audit within the one-year period preceding the audit initiation date.",
          keyQuestions: [
            "Does the organization screen senior financial officers for prior employment with the external audit firm?",
            "Is there a cooling-off period tracking process for former audit firm employees joining the company in financial oversight roles?",
          ],
          evidenceExamples: [
            "Conflict of interest screening questionnaire for senior financial officer candidates",
            "HR records documenting cooling-off period compliance for former auditor employees",
          ],
        },
      ],
    },

    // ─── Title III: Corporate Responsibility ──────────────────────────
    {
      code: "SOX-III",
      title: "Title III: Corporate Responsibility",
      level: 0,
      orderNo: 3,
      description:
        "Defines responsibilities of corporate officers and audit committees for the accuracy and completeness of financial reports, and establishes consequences for non-compliance including forfeiture of compensation and bars from serving as officers or directors.",
      keyQuestions: [
        "Are corporate responsibility requirements clearly assigned to specific officers and committees?",
        "Does the organization have mechanisms to enforce accountability for financial reporting integrity?",
      ],
      evidenceExamples: [
        "Corporate governance framework document outlining SOX responsibilities",
        "Board resolution defining accountability for financial reporting",
      ],
      children: [
        {
          code: "SOX-301",
          title: "Sec. 301 - Public Company Audit Committees",
          level: 1,
          orderNo: 1,
          description:
            "Requires each member of the audit committee to be an independent member of the board of directors. The audit committee is directly responsible for the appointment, compensation, and oversight of the external auditor. Establishes procedures for handling complaints regarding accounting, internal controls, or auditing matters, including confidential and anonymous submission by employees.",
          keyQuestions: [
            "Are all audit committee members independent directors as defined under applicable listing standards?",
            "Has the audit committee established procedures for receiving and handling complaints about accounting and auditing matters, including anonymous submissions?",
          ],
          evidenceExamples: [
            "Audit committee charter specifying independence requirements and oversight responsibilities",
            "Whistleblower and complaint handling procedures for accounting and audit matters",
            "Independence certifications from each audit committee member",
          ],
        },
        {
          code: "SOX-302",
          title: "Sec. 302 - Corporate Responsibility for Financial Reports",
          level: 1,
          orderNo: 2,
          description:
            "Requires the CEO and CFO to personally certify each annual and quarterly report filed with the SEC. The signing officers must certify that they have reviewed the report, that it does not contain any untrue statement of material fact or omit material facts, that the financial statements fairly present the financial condition and results of operations, and that they are responsible for establishing and maintaining internal controls. They must also disclose any significant deficiencies or material weaknesses in internal controls and any fraud involving management or employees with a significant role in internal controls.",
          keyQuestions: [
            "Do the CEO and CFO sign Section 302 certifications for each quarterly (10-Q) and annual (10-K) filing?",
            "Is there a structured sub-certification process that cascades down through the organization to support officer certifications?",
            "Are significant deficiencies and material weaknesses in internal controls formally evaluated and disclosed as part of the certification process?",
          ],
          evidenceExamples: [
            "Signed Section 302 CEO and CFO certification forms for recent 10-Q and 10-K filings",
            "Sub-certification process documentation and completed sub-certifications from division and functional leaders",
            "Internal control deficiency evaluation and tracking log with materiality assessments",
          ],
        },
        {
          code: "SOX-303",
          title: "Sec. 303 - Improper Influence on Conduct of Audits",
          level: 1,
          orderNo: 3,
          description:
            "Prohibits any officer or director of an issuer, or any person acting under their direction, from taking any action to fraudulently influence, coerce, manipulate, or mislead any independent public or certified accountant engaged in the audit for the purpose of rendering the financial statements materially misleading.",
          keyQuestions: [
            "Are policies in place to prevent improper influence on the external audit process?",
            "Do employees understand the prohibition against interfering with or misleading auditors?",
          ],
          evidenceExamples: [
            "Code of conduct provisions addressing interaction with external auditors",
            "Training materials and acknowledgments regarding prohibition of auditor interference",
          ],
        },
        {
          code: "SOX-304",
          title: "Sec. 304 - Forfeiture of Certain Bonuses and Profits",
          level: 1,
          orderNo: 4,
          description:
            "Requires the CEO and CFO to reimburse the issuer for any bonus, incentive-based or equity-based compensation, and profits from the sale of issuer securities received during the 12 months following the filing of a financial document that the issuer is required to restate due to material non-compliance resulting from misconduct.",
          keyQuestions: [
            "Does the organization have a clawback policy covering bonuses and equity-based compensation in the event of a restatement?",
            "Are executive compensation agreements drafted to comply with forfeiture requirements?",
          ],
          evidenceExamples: [
            "Executive compensation clawback policy",
            "Employment agreements with forfeiture and clawback provisions",
          ],
        },
        {
          code: "SOX-305",
          title: "Sec. 305 - Officer and Director Bars and Penalties",
          level: 1,
          orderNo: 5,
          description:
            "Authorizes federal courts to bar individuals from serving as officers or directors of public companies if the person's conduct demonstrates unfitness, based on violations of securities fraud provisions.",
          keyQuestions: [
            "Does the organization screen prospective officers and directors for prior SEC bars or securities fraud violations?",
            "Are existing officers and directors subject to ongoing compliance monitoring?",
          ],
          evidenceExamples: [
            "Background check and screening policy for officers and directors",
            "SEC enforcement action database search results for board candidates",
          ],
        },
        {
          code: "SOX-306",
          title: "Sec. 306 - Insider Trades During Pension Fund Blackout Periods",
          level: 1,
          orderNo: 6,
          description:
            "Prohibits directors and executive officers from trading equity securities of the issuer during pension plan blackout periods when plan participants are restricted from conducting transactions. Requires timely notice to participants of blackout periods.",
          keyQuestions: [
            "Does the organization track pension plan blackout periods and notify insiders of trading restrictions?",
            "Are insider trading compliance procedures integrated with pension plan administration?",
          ],
          evidenceExamples: [
            "Blackout period notification letters to directors and executive officers",
            "Insider trading compliance policy addressing pension blackout restrictions",
          ],
        },
      ],
    },

    // ─── Title IV: Enhanced Financial Disclosures ─────────────────────
    {
      code: "SOX-IV",
      title: "Title IV: Enhanced Financial Disclosures",
      level: 0,
      orderNo: 4,
      description:
        "Requires enhanced financial disclosures including off-balance-sheet transactions, pro forma figures, management assessment of internal controls, codes of ethics, and real-time disclosure of material changes in financial condition.",
      keyQuestions: [
        "Does the organization have processes to identify and disclose all required enhanced financial information?",
        "Are internal controls over financial reporting formally assessed and reported on?",
      ],
      evidenceExamples: [
        "Enhanced disclosure checklist for periodic reports",
        "Internal control over financial reporting (ICFR) program documentation",
      ],
      children: [
        {
          code: "SOX-401",
          title: "Sec. 401 - Disclosures in Periodic Reports",
          level: 1,
          orderNo: 1,
          description:
            "Requires that periodic financial reports filed with the SEC accurately reflect all material correcting adjustments identified by the external auditor, disclose all material off-balance-sheet transactions and relationships, and present pro forma financial information in a manner that does not contain untrue statements or omit material facts.",
          keyQuestions: [
            "Are all material off-balance-sheet arrangements identified and disclosed in periodic reports?",
            "Do pro forma financial presentations comply with SEC reconciliation requirements?",
          ],
          evidenceExamples: [
            "Off-balance-sheet transaction inventory and disclosure review documentation",
            "Pro forma financial information reconciliation schedules",
          ],
        },
        {
          code: "SOX-402",
          title: "Sec. 402 - Enhanced Conflict of Interest Provisions",
          level: 1,
          orderNo: 2,
          description:
            "Generally prohibits public companies from making personal loans to directors and executive officers, with limited exceptions for certain types of consumer credit, home improvement loans, and extensions of credit made in the ordinary course of business on market terms.",
          keyQuestions: [
            "Does the organization have a policy prohibiting personal loans to directors and executive officers?",
            "Are any existing arrangements reviewed to ensure they fall within permitted exceptions?",
          ],
          evidenceExamples: [
            "Policy on prohibition of personal loans to insiders",
            "Legal review of any pre-existing loan arrangements with officers or directors",
          ],
        },
        {
          code: "SOX-404",
          title: "Sec. 404 - Management Assessment of Internal Controls",
          level: 1,
          orderNo: 3,
          description:
            "Requires management to include in each annual report a statement of responsibility for establishing and maintaining an adequate internal control structure and procedures for financial reporting, together with an assessment of the effectiveness of those controls as of the end of the fiscal year. The external auditor must attest to and report on management's assessment. This section is widely considered the most operationally significant provision of SOX, requiring companies to document, test, and evaluate their internal controls using a recognized framework such as COSO.",
          keyQuestions: [
            "Has management adopted a recognized internal control framework (e.g., COSO 2013) and documented all significant processes, risks, and controls?",
            "Is there a formal annual testing program to evaluate the design and operating effectiveness of key internal controls over financial reporting?",
            "Does the external auditor's attestation report on internal controls identify any material weaknesses, and if so, are remediation plans in place?",
          ],
          evidenceExamples: [
            "Internal control documentation including process narratives, risk-control matrices, and flowcharts mapped to the COSO framework",
            "Annual testing plan and completed test workpapers with conclusions on design and operating effectiveness",
            "Management's report on internal control over financial reporting and the external auditor's attestation report",
          ],
        },
        {
          code: "SOX-406",
          title: "Sec. 406 - Code of Ethics for Senior Financial Officers",
          level: 1,
          orderNo: 4,
          description:
            "Requires issuers to disclose whether they have adopted a code of ethics for senior financial officers, including the principal financial officer and principal accounting officer. If no code has been adopted, the issuer must explain why. Any changes to or waivers of the code must be promptly disclosed.",
          keyQuestions: [
            "Has the organization adopted a code of ethics applicable to the CEO, CFO, and principal accounting officer?",
            "Are waivers to the code of ethics for senior financial officers tracked and publicly disclosed?",
          ],
          evidenceExamples: [
            "Code of ethics for senior financial officers filed as an exhibit or posted on the company website",
            "Form 8-K or website disclosure of any amendments to or waivers of the code of ethics",
          ],
        },
        {
          code: "SOX-407",
          title: "Sec. 407 - Disclosure of Audit Committee Financial Expert",
          level: 1,
          orderNo: 5,
          description:
            "Requires issuers to disclose whether at least one member of the audit committee is a financial expert, as defined by the SEC, and if so, the name and independence status of that member. If no financial expert serves on the committee, the issuer must explain why.",
          keyQuestions: [
            "Has the organization identified and disclosed whether an audit committee financial expert serves on the committee?",
            "Does the designated financial expert meet the SEC's definition including experience with GAAP, financial statements, internal controls, and audit committee functions?",
          ],
          evidenceExamples: [
            "Proxy statement disclosure identifying the audit committee financial expert",
            "Qualifications assessment for the designated audit committee financial expert",
          ],
        },
        {
          code: "SOX-409",
          title: "Sec. 409 - Real-Time Issuer Disclosures",
          level: 1,
          orderNo: 6,
          description:
            "Requires issuers to disclose to the public on a rapid and current basis such additional information concerning material changes in the financial condition or operations of the issuer as the SEC determines is necessary or useful for the protection of investors, in plain English.",
          keyQuestions: [
            "Does the organization have a process to identify and rapidly disclose material changes in financial condition?",
            "Are disclosure controls designed to ensure timely escalation and reporting of material events?",
          ],
          evidenceExamples: [
            "Disclosure committee charter and escalation procedures for material events",
            "Form 8-K filing log demonstrating timely disclosure of triggering events",
          ],
        },
      ],
    },

    // ─── Title VIII: Corporate and Criminal Fraud Accountability ──────
    {
      code: "SOX-VIII",
      title: "Title VIII: Corporate and Criminal Fraud Accountability",
      level: 0,
      orderNo: 5,
      description:
        "Establishes criminal penalties for the destruction, alteration, or falsification of records in federal investigations and bankruptcy proceedings, and provides protections for employees who report fraudulent activity.",
      keyQuestions: [
        "Does the organization have document retention and preservation policies that address litigation hold obligations?",
        "Are whistleblower protection mechanisms in place and communicated to employees?",
      ],
      evidenceExamples: [
        "Document retention and destruction policy",
        "Whistleblower protection program documentation",
      ],
      children: [
        {
          code: "SOX-802",
          title: "Sec. 802 - Criminal Penalties for Altering Documents",
          level: 1,
          orderNo: 1,
          description:
            "Imposes criminal penalties including fines and imprisonment of up to 20 years for anyone who knowingly alters, destroys, mutilates, conceals, or falsifies records, documents, or tangible objects with the intent to obstruct or influence a federal investigation. Also requires auditors to maintain audit workpapers for at least seven years.",
          keyQuestions: [
            "Does the organization have a records management policy that prohibits the unauthorized destruction or alteration of documents?",
            "Are audit workpapers and supporting documentation retained for at least seven years?",
          ],
          evidenceExamples: [
            "Records management and litigation hold policy with defined retention periods",
            "Audit workpaper retention schedule and evidence of compliance",
          ],
        },
        {
          code: "SOX-806",
          title: "Sec. 806 - Protection for Employees Who Provide Evidence of Fraud",
          level: 1,
          orderNo: 2,
          description:
            "Prohibits publicly traded companies from retaliating against employees who lawfully provide information or assist in investigations regarding conduct the employee reasonably believes constitutes mail fraud, wire fraud, bank fraud, securities fraud, or any violation of SEC rules or federal law relating to fraud against shareholders. Protected activities include filing complaints, testifying, or participating in proceedings.",
          keyQuestions: [
            "Does the organization have a formal anti-retaliation policy protecting employees who report suspected fraud?",
            "Are whistleblower complaints tracked, investigated, and resolved with documented protections for the reporting individual?",
          ],
          evidenceExamples: [
            "Anti-retaliation and whistleblower protection policy",
            "Whistleblower case tracking log with status, investigation outcomes, and non-retaliation confirmations",
          ],
        },
      ],
    },

    // ─── Title IX: White-Collar Crime Penalty Enhancements ────────────
    {
      code: "SOX-IX",
      title: "Title IX: White-Collar Crime Penalty Enhancements",
      level: 0,
      orderNo: 6,
      description:
        "Enhances criminal penalties for white-collar crimes, including increased maximum sentences for mail fraud and wire fraud, and establishes criminal liability for CEOs and CFOs who certify financial statements knowing they do not comply with requirements.",
      keyQuestions: [
        "Are senior officers aware of the criminal penalties associated with false certifications?",
        "Does the organization provide training to certifying officers on their legal obligations?",
      ],
      evidenceExamples: [
        "Officer training materials covering criminal certification requirements",
        "Acknowledgment forms signed by certifying officers",
      ],
      children: [
        {
          code: "SOX-906",
          title: "Sec. 906 - Corporate Responsibility for Financial Reports (Criminal Certification)",
          level: 1,
          orderNo: 1,
          description:
            "Requires the CEO and CFO to certify that each periodic report containing financial statements fully complies with SEC periodic reporting requirements and that the financial statements fairly present, in all material respects, the financial condition and results of operations of the issuer. Unlike Section 302, violations of Section 906 carry criminal penalties: fines up to $1 million and imprisonment up to 10 years for knowing violations, and fines up to $5 million and imprisonment up to 20 years for willful violations.",
          keyQuestions: [
            "Do the CEO and CFO execute Section 906 criminal certifications for each periodic report filed with the SEC?",
            "Is there a formal process ensuring that certifying officers have access to all material information needed to support their certifications?",
            "Are certifying officers briefed by legal counsel on the distinction between Section 302 (civil) and Section 906 (criminal) certification obligations?",
          ],
          evidenceExamples: [
            "Signed Section 906 certifications accompanying recent 10-K and 10-Q filings",
            "Certification support memorandum from legal counsel outlining the basis for each certification",
            "Certification readiness checklist used by the CEO and CFO prior to signing, including confirmation of completeness and accuracy of underlying information",
          ],
        },
      ],
    },

    // ─── Title XI: Corporate Fraud Accountability ─────────────────────
    {
      code: "SOX-XI",
      title: "Title XI: Corporate Fraud Accountability",
      level: 0,
      orderNo: 7,
      description:
        "Addresses corporate fraud by establishing criminal penalties for tampering with records or impeding official proceedings and granting the SEC authority to prohibit individuals from serving as officers or directors of public companies.",
      keyQuestions: [
        "Does the organization have policies addressing the preservation of records relevant to regulatory proceedings?",
        "Are officers and directors aware of the SEC's authority to bar individuals for securities law violations?",
      ],
      evidenceExamples: [
        "Regulatory proceedings response and document preservation policy",
        "Director and officer compliance training records",
      ],
      children: [
        {
          code: "SOX-1102",
          title: "Sec. 1102 - Tampering with a Record or Otherwise Impeding an Official Proceeding",
          level: 1,
          orderNo: 1,
          description:
            "Imposes criminal penalties for corruptly altering, destroying, mutilating, or concealing any document, record, or other object, or attempting to do so, with the intent to impair the object's integrity or availability for use in an official proceeding.",
          keyQuestions: [
            "Are employees trained on obligations to preserve records when an official proceeding is anticipated or underway?",
            "Does the organization have a litigation hold process that is activated promptly when proceedings are reasonably anticipated?",
          ],
          evidenceExamples: [
            "Litigation hold policy and notification templates",
            "Training records for employees on document preservation obligations during investigations",
          ],
        },
        {
          code: "SOX-1105",
          title: "Sec. 1105 - Authority of the SEC to Prohibit Persons from Serving as Officers or Directors",
          level: 1,
          orderNo: 2,
          description:
            "Grants the SEC authority to prohibit any person who has violated Section 10(b) of the Securities Exchange Act or Section 17(a)(1) of the Securities Act from serving as an officer or director of any public company if the person's conduct demonstrates unfitness to serve.",
          keyQuestions: [
            "Does the organization's director and officer vetting process include verification against SEC enforcement actions and officer/director bars?",
            "Are current officers and directors subject to periodic compliance certifications regarding ongoing fitness to serve?",
          ],
          evidenceExamples: [
            "Officer and director vetting procedure including SEC enforcement database checks",
            "Annual compliance certification from officers and directors confirming no pending or past bars",
          ],
        },
      ],
    },
  ],
};
