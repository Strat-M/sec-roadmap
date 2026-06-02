import { useState, useEffect, useMemo, useCallback } from "react";

const RAW = `CREST CRTSA|CREST Registered Technical Security Architect|$2,300 two exams|e|e|5|a|https://www.crest-approved.org/examination/technical-security-architecture/index.html|
RHCA|Red Hat Certified Architect|~$3,745 exam|e|e|5|a|https://www.redhat.com/en/services/certification/rhca|Red Hat Certified Architect. Requires 5+ individual exams. Expert level.
SABSA SCM|SABSA Chartered Security Architect - Master Certificate|$3,750 exam & thesis|e|e|5|a|https://sabsa.org/certification/|SABSA Chartered Master. Thesis-based. Security architecture leadership.
VCDX DCV|VMware Certified Design Expert in Datacenter Virtualization|$3,995 exams|e|e|5|a|https://www.vmware.com/education-services/certification/vcdx-dcv.html|VMware Certified Design Expert. Defense-based exam. Extremely rare.
CISSP Concentrations|(ISC)2 Certified Information Systems Security Professional Concentrati|$599 exam|g|m|5|a|https://www.isc2.org/certifications#Specialized|CISSP specializations: ISSAP (Architecture), ISSEP (Engineering), ISSMP (Management).
GSE|GIAC Security Expert|~$7475 for 10 exams|g|m|5|a|https://www.giac.org/get-certified/giac-portfolio-certifications/#GSE|GIAC's capstone. Requires multiple GIAC certs plus hands-on lab exam. Extremely selective.
ITIL Master|ITIL Master|$4,000 Interview|g|m|5|a|https://www.axelos.com/certifications/itil-certifications/itil-master|ITIL Master. Capstone. Proposal + interview-based assessment.
NCSC CCPLP|NCSC Certified Cybersecurity Professional - Lead Practitioner|$1388 interview|g|m|5|a|https://www.ncsc.gov.uk/information/about-certified-professional-scheme|
PgMP|PMI Program Management Professional|$1,000 exam|g|m|5|a|https://www.pmi.org/certifications/types/program-management-pgmp|
CCIE Ent|Cisco Certified Internetwork Expert - Enterprise Infrastructure|~$2,050 hands-on lab|n|e|5|a|https://www.cisco.com/c/en/us/training-events/training-certifications/certifications/expert/ccie-security-v2.html|Cisco expert-level enterprise. One of the hardest networking certs in existence.
CCIE Sec|Cisco Certified Implementation Expert - Security|$2,050 Hands-on Lab|n|e|5|a|https://www.cisco.com/c/en/us/training-events/training-certifications/certifications/expert/ccie-security.html|Cisco's expert-level security. 8-hour hands-on lab exam. ~3% pass rate.
CFCE|IACIS Certified Forensic Computer Examiner|$750 4 peer reviewed exams|b|b|5|a|https://www.iacis.com/certification/|Certified Forensic Computer Examiner. IACIS law enforcement forensics.
GREM|GIAC Reverse Engineering Malware|$979 exam|b|b|5|a|https://www.giac.org/certifications/reverse-engineering-malware-grem/|GIAC Reverse Engineering Malware. Static and dynamic analysis.
GXPN|GIAC Exploit Researcher and Advanced Penetration Tester|$979 exam|r|r|5|a|https://www.giac.org/certification/gxpn|GIAC Exploit Researcher and Advanced Penetration Tester. Expert-level.
OSCE3|Offensive Security Certified Expert 3|$4,649 3 labs|r|r|5|a|https://help.offensive-security.com/hc/en-us/articles/4403282452628-What-is-OSCE3-|OffSec Certified Expert 3. Requires OSEP + OSWE + OSED. Triple crown.
OSED|Offensive Security Exploit Developer|$1,499 lab|r|r|5|a|https://www.offensive-security.com/exp301-osed/|OffSec Exploit Developer. Windows exploit development and ROP chains.
OSEE|Offensive Security Exploitation Expert|$5,000 lab|r|r|5|a|https://www.offensive-security.com/awe-osee/|OffSec Exploitation Expert. Advanced Windows exploitation. AWE course.
OSEP|Offensive Security Experienced Penetration Tester|$1,499 lab|r|r|5|a|https://www.offensive-security.com/pen300-osep/|OffSec Experienced Penetration Tester. Evasion and advanced exploitation.
OSWE|Offensive Security Web Expert|~$1649 lab|r|r|5|a|https://www.offensive-security.com/awae-oswe/|OffSec Web Expert. White-box web application exploitation.
GSNA|GIAC Systems and Network Auditor|$979 exam|t|m|4|a|https://www.giac.org/certification/gsna|GIAC Systems and Network Auditor. Technical audit methodology.
ASIS CPP|ASIS Certified Protection Professional|$485 exam|a|m|4|a|https://www.asisonline.org/certification/certified-protection-professional-cpp/|
AWS SAP|Amazon Web Services Certified Solutions Architect - Professional|$300 exam|e|e|4|a|https://aws.amazon.com/certification/certified-solutions-architect-professional/|AWS Solutions Architect Professional. Advanced multi-tier architectures.
AZ-305|Microsoft Azure Solutions Architect Expert|$330 exam|e|e|4|a|https://docs.microsoft.com/en-us/learn/certifications/azure-solutions-architect?wt.mc_id=learningredirect_certs-web-wwl|Azure Solutions Architect Expert. Design patterns and best practices.
GDAT|GIAC Defending Advanced Threats|$979 exam|e|e|4|a|https://www.giac.org/certification/defending-advanced-threats-gdat|
LPIC-3|Linux Professional Institute Certified: 303 Security|$200 exam|e|e|4|a|https://www.lpi.org/our-certifications/lpic-3-303-overview|Linux Professional Institute Level 3. Enterprise-level specialization.
RHCE|Red Hat Certified Engineer|$400 exam|e|e|4|a|https://www.redhat.com/en/services/certification/rhce|Red Hat Certified Engineer. Advanced RHEL automation with Ansible.
SABSA SCP|SABSA Chartered Security Architect - Practitioner Certificate|$3,750 written exam|e|e|4|a|https://sabsa.org/certification/|SABSA Chartered Security Architect Practitioner. Enterprise architecture.
SC-100|Microsoft Cybersecurity Architect|$165 exam|e|e|4|a|https://docs.microsoft.com/en-us/certifications/exams/sc-100|Microsoft Cybersecurity Architect. Top-level Microsoft security cert.
VCIX DCV|VMware Certified Implementation Expert in Datacenter Virtualization|$900 two exams|e|e|4|a|https://www.vmware.com/education-services/certification/vcap-dcv-design.html|
VCIX NV|VMware Certified Implementation Expert in Network Virtualization|$900 two exams|e|e|4|a|https://www.vmware.com/education-services/certification/vcap-nv-deploy.html|
CCISO|EC Council Certified Information Security Officer|$3,150 course exam|g|m|4|a|https://ciso.eccouncil.org/cciso-certification/|EC-Council Chief Information Security Officer. Executive-level security leadership.
CISM|ISACA Certified Information Security Manager|$760 exam|g|m|4|a|https://www.isaca.org/credentialing/cism|ISACA Certified Information Security Manager. 5yr experience required.
CISSP|(ISC)2 Certified Information Systems Security Professional|$749 exam|g|m|4|a|https://www.isc2.org/Certifications/CISSP|The gold standard. 8 domains, 5yr experience required, 125-175 adaptive questions.
EEXIN ISM|EXIN Information Security Management Expert|EST $799 oral exam|g|m|4|a|https://www.exin.com/certifications/information-security-management-expert-based-isoiec-27001-exam|
GISP|GIAC Information Security Professional|$979 exam|g|m|4|a|https://www.giac.org/certification/gisp|
GSP|GIAC Security Professional|~$3735 for 5 exams|g|m|4|a|https://www.giac.org/get-certified/giac-portfolio-certifications/#gsp|
GSTRT|GIAC Strategic Planning, Policy and Leadership|$979 exam|g|m|4|a|https://www.giac.org/certification/gstrt|GIAC Strategic Planning, Policy, and Leadership.
NCSC CCPP|NCSC Certified Cybersecurity Professional - Practitioner|$225 interview|g|m|4|a|https://www.ncsc.gov.uk/information/about-certified-professional-scheme|
NCSC CCPSP|NCSC Certified Cybersecurity Professional - Senior Practitioner|$907 interview|g|m|4|a|https://www.ncsc.gov.uk/information/about-certified-professional-scheme|
PMP|PMI Project Management Professional|$555 exam|g|m|4|a|https://www.pmi.org/certifications/project-management-pmp|Project Management Professional. PMI's flagship. 35hrs education + exam.
PSM III|Scrum.org Professional Scrum Master III|$500 exam|g|m|4|a|https://www.scrum.org/assessments/professional-scrum-master-iii-certification|
S-ISME|SECO Information Security Management Expert|$850 exam|g|m|4|a|https://www.seco-institute.org/certifications/information-security-certification-track/|
TOGAF|OpenGroup TOGAF Certified|$360 exam|g|m|4|a|https://www.opengroup.org/certifications/togaf|The Open Group Architecture Framework. Enterprise architecture standard.
Zach EAPro|Zachman Enterprise Architect Professional (Level 3)|$2,999 exam & case study|g|m|4|a|https://www.zachman.com/certification/what-we-certify/enterprise-architect|
CCDE|Cisco Certified Design Expert|~$1,600 written exam|n|e|4|a|https://www.cisco.com/c/en/us/training-events/training-certifications/certifications/expert/ccde.html|
FCX|Fortinet Certified Expert|$400 written exam|n|e|4|a|https://training.fortinet.com/local/staticpage/view.php?page=fcx_cybersecurity|
JNCIE Sec|Juniper Networks Certified Internet Expert, Security|$1,400 Hands-on Lab|n|e|4|a|https://www.juniper.net/us/en/training/certification/certification-tracks/junos-security-track/?tab=jnciesec|
BTL2|Security Blue Team Level 2|$2,190 course|b|b|4|a|https://securityblue.team/btl2/|Blue Team Level 2. Advanced detection engineering and threat hunting.
CAWFE|IACIS Certified Advanced Windows Forensic Examiner|$750 written exam & lab|b|b|4|a|https://www.iacis.com/certification/cawfe/|
CCD|Certified CyberDefender|$800 course|b|b|4|a|https://cyberdefenders.org/blue-team-training/courses/certified-cyberdefender-certification/|
CFSR|OpenText Certified Forensic Security Responder|$250 written exam & lab|b|b|4|a|https://www.opentext.com/products-and-solutions/services/training-and-learning-services/encase-training/forensic-security-responder-certification|
CSFA|CSIAC CyberSecurity Forensic Analyst|$750 exam & lab|b|b|4|a|https://www.csiac.org/certification/cybersecurity-forensic-analyst-csfa-certification/|
GCFA|GIAC Certified Forensic Analyst|$979 exam|b|b|4|a|https://www.giac.org/certification/gcfa|GIAC Certified Forensic Analyst. Advanced digital forensics. Windows/Linux.
GCFR|GIAC Cloud Forensics Responder|$979 exam|b|b|4|a|https://www.giac.org/certifications/cloud-forensics-responder-gcfr/|GIAC Cloud Forensics Responder. Cloud-native IR and evidence collection.
GCTI|GIAC Cyber Threat Intelligence|$979 exam|b|b|4|a|https://www.giac.org/certification/gcti|GIAC Cyber Threat Intelligence. CTI lifecycle and analysis.
GIME|GIAC iOS and MacOS Examiner|$979 exam|b|b|4|a|https://www.giac.org/certifications/ios-macos-examiner-gime/|GIAC Incident Management and Escalation.
GNFA|GIAC Network Forensic Analyst|$979 exam|b|b|4|a|https://www.giac.org/certification/network-forensic-analyst-gnfa|GIAC Network Forensic Analyst. Full packet capture analysis.
MTIA|Mosse Institute Certified Threat Intelligence Analyst Certification|$450 certification programme|b|b|4|a|https://www.mosse-institute.com/certifications/mtia-certified-threat-intelligence-analyst.html|
CREST CCSAS|CREST Certified Simulated Attack Specialist|$2,520 2 exams & lab|r|r|4|a|https://www.crest-approved.org/certification-careers/crest-certifications/crest-certified-simulated-attack-specialist|
CREST CCTINF|CREST Certified Infrastructure Tester|$2,520 exam & lab|r|r|4|a|https://www.crest-approved.org/|
CREST CSAM|CREST Certified Simulated Attack Manager|$2,499 2 exams|r|r|4|a|https://www.crest-approved.org/certification-careers/crest-certifications/crest-certified-simulated-attack-manager|
GAWN|GIAC Assessing Wireless Networks|$979 exam|r|r|4|a|https://www.giac.org/certification/gawn|
HTB CWEE|Hack the Box Certified Web Exploitation Expert|$1260 Subscription available|r|r|4|a|https://academy.hackthebox.com/preview/certifications/htb-certified-web-exploitation-expert|Hack The Box Certified Web Exploitation Expert.
MRT|Mosse Institute Certified Red Teamer Certification|$450 certification programme|r|r|4|a|https://www.mosse-institute.com/certifications/mrt-certified-red-teamer.html|
eWPTX|eLearnSecurity Web Application Penetration Tester eXtreme|$400 exam|r|r|4|a|https://elearnsecurity.com/product/ewptxv2-certification/|INE Web Application Penetration Tester eXtreme.
APMG 27001A|APMG ISO/IEC 27001 Auditor|$400 exam|t|m|3|a|https://apmg-international.com/product/isoiec-27001|
C)ISSA|Mile2 Certified Information Systems Security Auditor|$550 exam|t|m|3|a|https://www.mile2.com/information_systems_security_auditor_outline/|
CIS LA|IBITGQ Certified ISO 27001 Information Security Management Specialist|$2,008 course exam|t|m|3|a|https://www.itgovernance.co.uk/shop/product/certified-iso-27001-isms-lead-auditor-training-course|
CISA|ISACA Certified Information Systems Auditor|$760 exam|t|m|3|a|https://www.isaca.org/credentialing/cisa|ISACA Certified Information Systems Auditor. IS audit, control, assurance.
CTPRA|Shared Assessment Certified Third-Party Risk Assessor|$1295 course|t|m|3|a|https://sharedassessments.org/ctpra/|
GCCC|GIAC Critical Controls Certification|$979 exam|t|m|3|a|https://www.giac.org/certification/critical-controls-certification-gccc|
GCIA|GIAC Certified Intrusion Analyst|$979 exam|t|m|3|a|https://www.giac.org/certification/certified-intrusion-analyst-gcia|
GMON|GIAC Continuous Monitoring|$979 exam|t|m|3|a|https://www.giac.org/certification/continuous-monitoring-certification-gmon|GIAC Continuous Monitoring. Network security monitoring and detection.
IS20|Mile2 IS20 Controls|$550 exam|t|m|3|a|https://www.mile2.com/is20_outline/|
PCI QSA|PCI Qualified Security Assessor|$3000 req'd course|t|m|3|a|https://www.pcisecuritystandards.org/assessors_and_solutions/become_qsa/|
PECB 27001LA|PECB ISO/IEC 27001 Lead Auditor|$930 exam|t|m|3|a|https://pecb.com/en/education-and-certification-for-individuals/iso-iec-27001/iso-iec-27001-lead-auditor|
CDPSE|ISACA Certified Data Privacy Solutions Engineer|$880 Application|a|m|3|a|https://www.isaca.org/credentialing/certified-data-privacy-solutions-engineer|ISACA Certified Data Privacy Solutions Engineer. Technical privacy implementation.
CIPA|IMI Certified Identity Protection comptia-advanced-security-practition|$295 Exam|a|m|3|a|https://www.identitymanagementinstitute.org/cipa/|
CIPT|IAPP Certified Information Privacy Technologist|$550 exam|a|m|3|a|https://iapp.org/certify/cipt/|IAPP Certified Information Privacy Technologist. Technical privacy controls.
DCPP|DSCI Certified Privacy Professional|$205 Exam|a|m|3|a|https://www.dsci.in/content/dsci-certified-privacy-professional-dcpp|
EPDPP|EXIN Privacy and Data Protection Practitioner|$243 Exam|a|m|3|a|https://embed.exin.totalservices.io/certifications/exin-privacy-and-data-protection-practitioner-exam|
AWS CSS|Amazon Web Services Certified Security - Specialty|$150 exam|e|e|3|a|https://aws.amazon.com/certification/certified-security-specialty/|AWS Certified Security Specialty. IAM, logging, data protection, incident response.
CACE|Excida IEC 62443 Certified Automation Cybersecurity Expert|$700 exam|e|e|3|a|https://www.exidacace.com/Apply/CACE|
CCSP|(ISC)2 Certified Cloud Security Professional|$599 exam|e|e|3|a|https://www.isc2.org/Certifications/CCSP|ISC2 cloud security cert. 6 domains. 4-hour exam. Growing demand.
CIS LI|IBITGQ Certified ISO 27001 Information Security Management Specialist|$2,008 course exam|e|e|3|a|https://www.itgovernance.co.uk/shop/product/certified-iso-27001-isms-lead-implementer-training-course|
CKA|Cloud Native Computing Foundation Certified Kubernetes Administrator|$375 lab|e|e|3|a|https://www.cncf.io/certification/cka/|Certified Kubernetes Administrator. Performance-based lab exam.
CKS|Cloud Native Computing Foundation Certified Kubernetes Security Specia|$375 lab|e|e|3|a|https://www.cncf.io/certification/cks/|Certified Kubernetes Security Specialist. CNCF hands-on exam.
CSSA|Infosec Institute Certified SCADA Security Architect|$4,599 exam|e|e|3|a|https://app.infosecinstitute.com/portal/courses/a0tC0000000Fp4JIAS|
EXIN PCSA|EXIN Professional Cloud Solution Architect|$315 exam|e|e|3|a|https://www.exin.com/certifications/ccc-professional-cloud-solution-architect-exam|
FCP PCS|Fortinet Certified Professional - Public Cloud Security|$400 for 2 exams|e|e|3|a|https://training.fortinet.com/local/staticpage/view.php?page=fcp_public_cloud_security|
FCP SO|Fortinet Certified Professional - Security Operations|$400 for 2 exams|e|e|3|a|https://training.fortinet.com/local/staticpage/view.php?page=fcp_security_operations|
FCSS OT|Fortinet Certified Solution Specialist - OT Security|$400 exam|e|e|3|a|https://training.fortinet.com/local/staticpage/view.php?page=fcss_ot_security|
FCSS PCS|Fortinet Certified Solution Specialist - Public Cloud Security|$400 exam|e|e|3|a|https://training.fortinet.com/local/staticpage/view.php?page=fcss_public_cloud_security|
FCSS SO|Fortinet Certified Solution Specialist - Security Operations|$400 exam|e|e|3|a|https://training.fortinet.com/local/staticpage/view.php?page=fcss_security_operations|
GCSA|GIAC Cloud Security Automation|$979 exam|e|e|3|a|https://www.giac.org/certification/cloud-security-automation-gcsa|
GCTD|GIAC Cloud Threat Detection|$979 exam|e|e|3|a|https://www.giac.org/certifications/cloud-threat-detection-gctd/|
GCWN|GIAC Certified Windows Security Administrator|$979 exam|e|e|3|a|https://www.giac.org/certifications/certified-windows-security-administrator-gcwn/|
GDSA|GIAC Defensible Security Architecture|$979 exam|e|e|3|a|https://www.giac.org/certification/defensible-security-architecture-gdsa|
GPCS|GIAC Public Cloud Security|$979 exam|e|e|3|a|https://www.giac.org/certifications/public-cloud-security-gpcs/|
GRID|GIAC Response and Industrial Defense|$979 exam|e|e|3|a|https://www.giac.org/certification/response-industrial-defense-grid|GIAC Response and Industrial Defense. ICS incident response.
Google PCSA|Google Professional Cloud Architect|$200 exam|e|e|3|a|https://cloud.google.com/certification/cloud-architect|
ISA CDS|ISA Certified Design Specialist|$2,700 course + exam|e|e|3|a|https://www.isa.org/training-and-certifications/isa-certification/isa99iec-62443/isa99iec-62443-cybersecurity-certificate-programs/|
ISA CE|ISA Cybersecurity Expert|$2,700 course + exam|e|e|3|a|https://www.isa.org/training-and-certifications/isa-certification/isa99iec-62443/isa99iec-62443-cybersecurity-certificate-programs/|
LFCS|Linux Foundation Certified System Administrator|$300 exam|e|e|3|a|https://training.linuxfoundation.org/certification/linux-foundation-certified-sysadmin-lfcs/|
MS-100|Microsoft 365 Certified Enterprise Administrator Expert|$165 exam|e|e|3|a|https://docs.microsoft.com/en-us/learn/certifications/m365-enterprise-administrator|Microsoft 365 Identity and Services. Being retired — replaced by MS-102.
PDSO CDE|PDSO Certified DevSecOps Expert|$1199|e|e|3|a|https://www.practical-devsecops.com/certified-devsecops-expert|
RHCSA|Red Hat Certified System Administrator|$400 exam|e|e|3|a|https://www.redhat.com/en/services/certification/rhcsa|Red Hat Certified System Administrator. Performance-based exam on RHEL.
SABSA SCF|SABSA Chartered Security Architect - Foundation Certificate|$3,750 exam|e|e|3|a|https://sabsa.org/certification/|SABSA Chartered Fellow. Highest SABSA credential. Invitation-based.
SCE|SUSE Certified Engineer|$195 practical exam|e|e|3|a|https://www.suse.com/training/exam/sce-sles-15/|
SFCCCC|SalesForce Certified Community Cloud Consultant|$200 exam|e|e|3|a|https://trailhead.salesforce.com/help?article=Salesforce-Certified-Community-Cloud-Consultant-Exam-Guide|
SFCTA|Salesforce Certified Technical Architect|$6000|e|e|3|a|https://trailhead.salesforce.com/help?article=Salesforce-Certified-Technical-Architect-Exam-Guide|
TUV COTCP|TUV Rheinland Certified Operational Technology Cybersecurity Professio|$415 exam|e|e|3|a|https://www.tuv.com/landingpage/en/lp-certified-operational-technology-cybersecurity-professional-program/|
VCP DCV|VMware Certified Professional in Datacenter Virtualization|$375 exam|e|e|3|a|https://www.vmware.com/education-services/certification/vcp-dcv.html|VMware Certified Professional Data Center Virtualization.
APMG 20000P|APMG ISO/IEC 20000 Practitioner|$308 Exam|g|m|3|a|https://apmg-international.com/product/iso-iec-20000|
APMG 27001P|APMG ISO/IEC 27001 Practitioner|$400 exam|g|m|3|a|https://apmg-international.com/product/isoiec-27001|
BCS PCIRM|BCS Practitioner Certificate in Information Risk Management|$287 exam|g|m|3|a|https://www.bcs.org/get-qualified/certifications-for-professionals/information-security-and-ccp-scheme-certifications/bcs-practitioner-certificate-in-information-risk-management/|
C)ISRM|Mile2 Certified Information Systems Risk Manager|$550 exam|g|m|3|a|https://www.mile2.com/information-systems-risk-mangager-outline/|
CAPM|PMI Certified Associate in Project Management|$300 exam|g|m|3|a|https://www.pmi.org/certifications/types/certified-associate-capm|Certified Associate in Project Management. PMI entry-level.
CASM|GAQM Certified Agile Scrum Master|$128 exam|g|m|3|a|https://gaqm.org/certifications/scrum_agile/casm|
CASP+|CompTIA Advanced Security Practitioner+|$509 exam|g|m|3|a|https://www.comptia.org/certifications/comptia-advanced-security-practitioner|CompTIA's advanced practitioner cert. Enterprise security architecture and engineering.
CGEIT|ISACA Certified in the Governance of Enterprise IT|$760 exam|g|m|3|a|https://www.isaca.org/credentialing/cgeit|ISACA Certified in Governance of Enterprise IT. Board-level IT governance.
CGRC|(ISC)2 Certified in Governance, Risk and Compliance|$599 exam|g|m|3|a|https://www.isc2.org/Certifications/CGRC|ISC2 Certified in Governance Risk and Compliance. Formerly CAP.
CISSM|GAQM Certified Information Systems Security Manager|$170 exam|g|m|3|a|https://gaqm.org/certifications/information_systems_security/cissm|
CM)ISSO|Mile2 Certified Master Information Systems Security Officer|Complete C)SP, C)ISSO, C)ISSM|g|m|3|a|https://www.mile2.com/master-certifications/|
CPD|GAQM Certified Project Director|$210 exam|g|m|3|a|https://gaqm.org/certifications/project_management/cpd|
CRISC|ISACA Certified in Risk and Information Systems Control|$760 exam|g|m|3|a|https://www.isaca.org/credentialing/crisc|ISACA Certified in Risk and Information Systems Control. IT risk management.
CSM|GAQM Certified Scrum Master|$128 exam|g|m|3|a|https://gaqm.org/certifications/scrum_agile/csm|
DCCRP|DRI Certified Cyber Resilience Professional|$400 Exam|g|m|3|a|https://drii.org/certification/ccrp|
EISM|EC Council Information Security Manager|$3,499|g|m|3|a|https://ciso.eccouncil.org/cciso-certification/eism-program/|
EXIN 27001E|EXIN ISO/IEC 27001 Expert|~$379 Oral Presentation|g|m|3|a|https://www.exin.com/certifications/information-security-management-expert-based-isoiec-27001-exam?language_content_entity=en|
GCPM|GIAC Certified Project Manager|$979 exam|g|m|3|a|https://www.giac.org/certification/gcpm|
GLEG|GIAC Law of Data Security & Investigations|$979 exam|g|m|3|a|https://www.giac.org/certification/law-data-security-investigations-gleg|
GSLC|GIAC Security Leadership Certification|$979 exam|g|m|3|a|https://www.giac.org/certification/gslc|GIAC Security Leadership. Management and leadership for security professionals.
ITIL MP|ITIL Managing Professional|$9,600 4 course exams|g|m|3|a|https://www.axelos.com/certifications/itil-certifications/itil-managing-professional-itil-4|ITIL Managing Professional. Four modules, strategic IT practices.
ITIL SL|ITIL Strategic Leader|$4,800 two course exams|g|m|3|a|https://www.axelos.com/certifications/itil-certifications/itil-strategic-leader-itil-4|
MGRC|Mosse Institute Certified GRC Expert Certification|$450 certification programme|g|m|3|a|https://www.mosse-institute.com/certifications/mgrc-certified-grc-practitioner.html|
M_o_R P|Axelos M_o_R Practitioner Risk Management|$560 exam|g|m|3|a|https://www.axelos.com/certifications/propath/mor-risk-management/mor-4-practitioner|
PECB 27001LI|PECB ISO/IEC 27001 Lead Implementer|$930 exam|g|m|3|a|https://pecb.com/en/education-and-certification-for-individuals/iso-iec-27001/iso-iec-27001-lead-implementer|
PECB 27005LM|PECB ISO/IEC 27005 Lead Risk Manager|~$1,595 exam|g|m|3|a|https://pecb.com/en/education-and-certification-for-individuals/iso-iec-27005/iso-27005-lead-risk-manager|
PEXIN ISM|EXIN Information Security Management Professional|$268 exam|g|m|3|a|https://www.exin.com/certifications/information-security-management-professional-based-isoiec-27001-exam|
PMI ACP|PMI Agile Certified Practitioner|$495 exam|g|m|3|a|https://www.pmi.org/certifications/types/agile-acp|
PSM II|Scrum.org Professional Scrum Master II|$250 exam|g|m|3|a|https://www.scrum.org/assessments/professional-scrum-master-ii-certification|
S-CISO|SECO Certified Information Security Officer|Resume review|g|m|3|a|https://www.seco-institute.org/certifications/information-security-certification-track/|
S-ISP|SECO Information Security Practitioner|$550|g|m|3|a|https://www.seco-institute.org/certifications/information-security-certification-track/|
Scrum PAL|Scrum  Professional Agile Leadership|$200 exam|g|m|3|a|https://www.scrum.org/professional-agile-leadership-certification|
Scrum PSD|Scrum Professional Scrum Developer|$200 exam|g|m|3|a|https://www.scrum.org/professional-scrum-developer-certification|
Scrum SPS|Scrum Scaled Professional Scrum|$250 exam|g|m|3|a|https://www.scrum.org/scaled-professional-scrum-certification|
Zach EAP|Zachman Enterprise Architect Practitioner (Level 2)|$2,999 exam & case study|g|m|3|a|https://www.zachman.com/certification/what-we-certify/enterprise-architect|
CIAM|Identify Management Institute Certified Identify and Access Manager|$390 Exam|i|m|3|a|https://www.identitymanagementinstitute.org/ciam/|Certified Identity and Access Manager. Vendor-neutral IAM.
CIDPRO|IDPro Certified Identity Professional|$700 exam|i|m|3|a|https://idpro.org/cidpro/|Certified Identity Professional. IDPro's vendor-neutral identity cert.
CIMP|Identify Management Institute Certified Identity Management Profession|$295 + Membership|i|m|3|a|https://www.identitymanagementinstitute.org/cimp/|
FCSS SASE|Fortinet Certified Solution Specialist - Secure Access Service Edge|$800 two exams|i|m|3|a|https://training.fortinet.com/local/staticpage/view.php?page=fcss_SASE|
CCNP Ent|Cisco Certified Network Professional - Enterprise|~$600 exam|n|e|3|a|https://www.cisco.com/c/en/us/training-events/training-certifications/certifications/professional/ccnp-enterprise.html|Cisco professional-level enterprise networking. Core + concentration.
CCNP Sec|Cisco Certified Network Professional - Security|~$1,200 exam|n|e|3|a|https://www.cisco.com/c/en/us/training-events/training-certifications/certifications/professional/ccnp-security-v2.html|Cisco professional-level security. Core exam + concentration exam.
CCSE|Checkpoint Certified Security Expert|$250 exam|n|e|3|a|https://cert.eccouncil.org/certified-cloud-security-engineer.html|
CCSM|Checkpoint Certified Security Master|$350 exam|n|e|3|a|https://training-certifications.checkpoint.com/#/courses/Check%20Point%20Certified%20Master%20(CCSM)%20R80.x|
F5 CSE Sec|F5 Big-IP Certified Solution Expert - Security|$135 exam|n|e|3|a|https://view.ceros.com/f5/certification-roadmap/p/9?heightOverride=740|
FCSS NS|Fortinet Certificed Solution Specialist - Network Security|$800 two exams|n|e|3|a|https://training.fortinet.com/local/staticpage/view.php?page=fcss_network_security|
FCSS ZTA|Fortinet Certified Solution Specialist - Zero Trust Access|$800 two exams|n|e|3|a|https://training.fortinet.com/local/staticpage/view.php?page=fcss_zta|
JNCIP Sec|Juniper Networks Certified Internet Professional, Security|$400 exam|n|e|3|a|https://www.juniper.net/us/en/training/certification/certification-tracks/junos-security-track/?tab=jncip-sec|
PCCSE|Prisma Certified Cloud Security Engineer|$350 exam|n|e|3|a|https://www.paloaltonetworks.com/services/education/certification|
PCNSE|Palo Alto Networks Certified Network Security Engineer|$175 exam|n|e|3|a|https://www.paloaltonetworks.com/services/education/certification#pcnse|Palo Alto Network Security Engineer. Being retired — replaced by NSE.
PCSAE|Palo Alto Certified Cloud Security Automation Engineer|$350 exam|n|e|3|a|https://www.paloaltonetworks.com/services/education/certification|Palo Alto Certified Security Automation Engineer.
BTL1|Security Blue Team Level 1|$660 course|b|b|3|a|https://www.securityblue.team/why-btl1/|Blue Team Level 1. Hands-on defensive security. 24-hour practical exam.
C)DRE|Mile2 Certified Disaster Recovery Engineer|$550 exam|b|b|3|a|https://www.mile2.com/cdre_outline/|
CCE|ISFCE Certified Computer Examiner|$485 written exam|b|b|3|a|https://www.isfce.com/certification.htm|Certified Computer Examiner. ISFCE vendor-neutral forensics.
CCFE|Infosec Institute Certified Computer Forensics Examiner|$4,599 exam|b|b|3|a|https://app.infosecinstitute.com/portal/courses/a0t1A000009H5RcQAK|
CDRP|Infosec Institute Certified Data Recovery Professional|$4,599 exam|b|b|3|a|https://app.infosecinstitute.com/portal/courses/a0tC0000000FovhIAC|
CM)DFI|Mile2 Certified Master Digital Forensic Investigator|Complete C)SP, C)DFE, C)NFE an|b|b|3|a|https://www.mile2.com/master-certifications/|
CMFE|Infosec Institute Certified Mobile Forensics Examiner|$1,699 exam|b|b|3|a|https://app.infosecinstitute.com/portal/courses/a0t1A000009H6juQAC|
CREST CRIA|CREST Registered Intrusion Analyst|$612 exam & lab|b|b|3|a|https://www.crest-approved.org/certification-careers/crest-certifications/crest-registered-intrusion-analyst|
CREST CRTIA|CREST Registered Threat Intelligence Analyst|$615 2 exams|b|b|3|a|https://www.crest-approved.org/certification-careers/crest-certifications/crest-registered-threat-intelligence-analyst|
Cisco COP|Cisco Certified CyberOps Professional|$700 two exams|b|b|3|a|https://www.cisco.com/c/en/us/training-events/training-certifications/certifications/professional/cyberops-professional.html|
GASF|GIAC Advanced Smartphone Forensics|$979 exam|b|b|3|a|https://www.giac.org/certification/advanced-smartphone-forensics-gasf|GIAC Advanced Smartphone Forensics. Mobile device evidence.
GBFA|GIAC Battlefield Forensics and Acquisition|$979 exam|b|b|3|a|https://www.giac.org/certification/gbfa|
GCDA|GIAC Certified Detection Analyst|$979 exam|b|b|3|a|https://www.giac.org/certification/certified-detection-analyst-gcda|GIAC Certified Detection Analyst. Detection engineering.
GCED|GIAC Certified Enterprise Defender|$979 exam|b|b|3|a|https://www.giac.org/certification/certified-enterprise-defender-gced|GIAC Certified Enterprise Defender. Defensive operations and architecture.
GCFE|GIAC Cerified Forensics Examiner|$979 exam|b|b|3|a|https://www.giac.org/certification/gcfe|GIAC Certified Forensic Examiner. Windows forensics focus.
GCIH|GIAC Certified Forensics Analystr|$979 exam|b|b|3|a|https://www.giac.org/certification/gcih|GIAC Certified Incident Handler. IR methodology and attack techniques.
GEIR|GIAC Enterprise Incident Response|$979 exam|b|b|3|a|https://www.giac.org/certifications/enterprise-incident-responder-geir/|GIAC Enterprise Incident Responder. Large-scale IR operations.
GPYC|GIAC Python Coder|$979 exam|b|b|3|a|https://www.giac.org/certification/python-coder-gpyc|
GSOC|GIAC Security Operations Certified|$979 exam|b|b|3|a|https://www.giac.org/certifications/security-operations-certified-gsoc/|GIAC Security Operations Certified. SOC operations and monitoring.
GX-FA|GIAC Experienced Forensics Analyst|$1299 exam|b|b|3|a|https://www.giac.org/certifications/experienced-forensics-analyst-gxfa/|GIAC Experienced Forensic Analyst. Expert-level forensics.
MBT|Mosse Institute Certified Blue Teamer Certification|$450 certification programme|b|b|3|a|https://www.mosse-institute.com/certifications/mbt-certified-blue-teamer.html|
MCPE|Mosse Institute Certified Cyber Protection Expert|$800 exam|b|b|3|a|https://www.mosse-institute.com/certifications/mcpe-certified-cyber-protection-expert.html|
MDFIR|Mosse Institute Certified DFIR Specialist|$450 certification programme|b|b|3|a|https://www.mosse-institute.com/certifications/mdfir-certified-dfir-specialist.html|
MTH|Mosse Institute Certified Threat Hunter Certification|$450 certification programme|b|b|3|a|https://www.mosse-institute.com/certifications/mth-certified-threat-hunter.html|
SC-400|Microsoft Certified Information Protection Administrator Associate|$165 exam|b|b|3|a|https://docs.microsoft.com/en-us/learn/certifications/information-protection-administrator/|Microsoft Information Protection Administrator. Purview DLP and sensitivity labels.
eCDFP|eLearnSecurity Certified Digital Forensics Professional|$400 exam|b|b|3|a|https://security.ine.com/certifications/ecdfp-certification/|
eCTHP|eLearnSecurity Certified Threat Hunting Professional|$400 lab|b|b|3|a|https://security.ine.com/certifications/ecthp-certification/|
CCPenX-AWS|The SecurityOps Group Certified Cloud Pentesting eXpert-AWS|$800 exam|r|r|3|a|https://secops.group/product/certified-cloud-pentesting-expert/|
CPENT|EC Council Certified Penetration Testing Professional|$999 exam|r|r|3|a|https://www.eccouncil.org/programs/certified-penetration-testing-professional-cpent/|EC-Council Certified Penetration Testing Professional.
CREST CCTAPP|CREST Certified Web Application Tester|$2,520 exam & lab|r|r|3|a|https://www.crest-approved.org/certification-careers/crest-certifications/crest-certified-web-application-tester/|
CREST CCTIM|CREST Certified Threat Intelligence Manager|$2,480 3 exams|r|r|3|a|https://www.crest-approved.org/certification-careers/crest-certifications/crest-certified-threat-intelligence-manager|
CREST CRT|CREST Registered Penetration Tester|$612 exam|r|r|3|a|https://www.crest-approved.org/certification-careers/crest-certifications/crest-registered-penetration-tester|
CRTO|Zero Point Security Certified Red Team Operator|$121 lab|r|r|3|a|https://courses.zeropointsecurity.co.uk/courses/red-team-ops|Certified Red Team Operator. Cobalt Strike and C2 frameworks.
CRTO II|Zero Point Security Red Team Operator II|$121 lab|r|r|3|a|https://training.zeropointsecurity.co.uk/courses/red-team-ops-ii|Certified Red Team Operator II. Advanced adversary simulation.
GCPN|GIAC Cloud Penetration Tester|$2,499 exam|r|r|3|a|https://www.giac.org/certification/gcpn|
GCPT|GAQM Certified Penetration Tester|$128 exam|r|r|3|a|https://gaqm.org/certifications/information_systems_security/certified_penetration_tester_cpt|
GMOB|GIAC Mobile Device Security Analyst|$399 exam|r|r|3|a|https://www.giac.org/certification/mobile-device-security-analyst-gmob|
GPEN|GIAC Certified Penetration Tester|$979 exam|r|r|3|a|https://www.giac.org/certification/gpen|GIAC Penetration Tester. Methodology-focused pentest cert.
GRTP|GIAC Red Team Professional|$979 exam|r|r|3|a|https://www.giac.org/certifications/red-team-professional-grtp/|
GWAPT|GIAC Web Application Penetration Tester|$979 exam|r|r|3|a|https://www.giac.org/certification/gwapt|GIAC Web Application Penetration Tester.
GX-PT|GIAC Experienced Penetration Tester|$1299 exam|r|r|3|a|https://www.giac.org/certifications/experienced-penetration-tester-gxpt/|
HTB CPTS|Hack the Box Certified Penetration Testing Specialist|$200 modules + $210 exam|r|r|3|a|https://academy.hackthebox.com/preview/certifications/htb-certified-penetration-testing-specialist/|Hack The Box Certified Penetration Testing Specialist.
LPT|EC Council Licensed Penetration Tester|$899 exam|r|r|3|a|https://www.eccouncil.org/programs/licensed-penetration-tester-lpt-master/|EC-Council Licensed Penetration Tester. Master-level EC-Council.
MCD|Mosse Institute Certified Code Deobfuscation Specialist Certification|$450 certification programme|r|r|3|a|https://www.mosse-institute.com/certifications/mcd-certified-code-deobfuscation-specialist.html|
MPT|Mosse Institute Certified Penetration Tester Certification|$450 certification programme|r|r|3|a|https://www.mosse-institute.com/certifications/mpt-certified-penetration-tester.html|
MRE|Mosse Institute Certified Reverse Engineer Certification|$450 certification programme|r|r|3|a|https://www.mosse-institute.com/certifications/mre-certified-reverse-engineer.html|
OSCP|Offensive Security Certified Professional|$1,499 labs|r|r|3|a|https://www.offensive-security.com/pwk-oscp/|OffSec Certified Professional. 24-hour hands-on exam. Industry gold standard for pentest.
OSMR|Offensive Security MacOS Researcher|$2,499 exam|r|r|3|a|https://www.offensive-security.com/exp312-osmr/|OffSec macOS Researcher. macOS exploitation and reversing.
OSWP|Offensive Security Wireless Professional|$450 labs|r|r|3|a|https://www.offensive-security.com/wifu-oswp/|OffSec Wireless Professional. Wi-Fi penetration testing.
PACES|Pentester Academy Certified Enterprise Security Specialist|$339-749 Lab access|r|r|3|a|https://www.pentesteracademy.com/gcb|OffSec Certified Expert Specialist. Renamed from PACES.
PNPT|TCM Security Practical Network Penetration Tester|$299 exam|r|r|3|a|https://certifications.tcm-sec.com/pnpt/|TCM Security Practical Network Penetration Tester. 5-day hands-on exam.
S-CEHL|SECO Certified Ethical Hacker Leader|Application|r|r|3|a|https://www.seco-institute.org/certifications/ethical-hacking-track/leader/|
S-EHE|SECO Ethical Hacker Expert|TBD (still)|r|r|3|a|https://www.seco-institute.org/certifications/ethical-hacking-certification-track/|
SOG CAPenX|The SecurityOps Group Certified AppSec Pentesting eXpert|$800 exam|r|r|3|a|https://secops.group/product/certified-appsec-pentesting-expert-capenx/|
CASE|EC Council Certified Application Security Engineer (.NET or Java)|$550 exam|s|e|3|a|https://www.eccouncil.org/programs/certified-application-security-engineer-case/|EC-Council Certified Application Security Engineer. .NET and Java tracks.
CSSLP|(ISC)2 Certified Secure Software Lifecycle Professional|$599 exam|s|e|3|a|https://www.isc2.org/Certifications/CSSLP|ISC2 Certified Secure Software Lifecycle Professional. Secure SDLC.
DevNet Pro|Cisco DevNet Professional|$1200 two exams|s|e|3|a|https://www.cisco.com/site/us/en/learn/training-certifications/certifications/devnet/professional/index.html|Cisco DevNet Professional. Advanced automation and APIs.
GWEB|GIAC Certified Web Application Defender|$979 exam|s|e|3|a|https://www.giac.org/certification/certified-web-application-defender-gweb|GIAC Web Application Penetration Tester. Web app security testing.
S-CSPL|SECO Secure Programming Certified Leader|$460 exam|s|e|3|a|https://www.seco-institute.org/certifications/certified-secure-software-developer/|
APMG 20000A|APMG ISO/IEC 20000 Auditor|$308 Exam|t|m|2|a|https://apmg-international.com/product/iso-iec-20000|
C)ISMS-LA|Mile2 Certified Information security Management Systems Lead Auditor|$550 exam|t|m|2|a|https://www.mile2.com/cisms-la-li-outline/|
CIS IA|IBITGQ Certified ISO 27001 Information Security Management Specialist|$1543 course exam|t|m|2|a|https://www.itgovernance.co.uk/shop/product/iso27001-certified-isms-internal-auditor-training-course|
CISST|GAQM Certified Information systems Security Tester|$170 exam|t|m|2|a|https://gaqm.org/certifications/information_systems_security/cisst|
CTPRP|Shared Assessment Certified Third-Party Risk Professional|$1295 course|t|m|2|a|https://sharedassessments.org/ctprp/|
DCBCA|DRI Certified Business Continuity Auditor|$400 exam|t|m|2|a|https://drii.org/certification/cbca|
DCBCLA|DRI Certified Business Continuity Lead Auditor|$400 exam|t|m|2|a|https://drii.org/certification/cbcla|
GRCA|OCEG Governance, Risk, and Compliance Auditor|$399 12 month license|t|m|2|a|https://www.oceg.org/certifications/grc-audit-certification/|
IIA CIA|The Institute of Internal Auditors Certified Internal Auditor|$1315 3 exams|t|m|2|a|https://na.theiia.org/certification/CIA-Certification/Pages/CIA-Certification.aspx|
TUV Auditor|TUV Rheinland IT Security Auditor (GERMAN)|$415 exam|t|m|2|a|https://www.certipedia.com/quality_marks/0000063484?locale=en|
TUV MSA|TUV Rheinland Mobile Security Analyst (GERMAN)|$415 exam|t|m|2|a|https://www.certipedia.com/quality_marks/0000046324?locale=en|
ASIS APP|ASIS Associate Protection Professional|$350 exam|a|m|2|a|https://www.asisonline.org/certification/associate-protection-professional-app/|
CDP|IMI Certified in Data Protection|$395 Exam|a|m|2|a|https://www.identitymanagementinstitute.org/cdp/|
AWS SAA|Amazon Web Services Certified Solutions Architect - Associate|$150 exam|e|e|2|a|https://aws.amazon.com/certification/certified-solutions-architect-associate/|AWS Solutions Architect Associate. Core AWS design and deployment.
AZ-104|Microsoft Azure Administrator Associate|$165 exam|e|e|2|a|https://docs.microsoft.com/en-us/learn/certifications/azure-administrator?wt.mc_id=learningredirect_certs-web-wwl|Azure Administrator Associate. VM, networking, storage, identity management.
AZ-500|Microsoft Azure Security Engineer Associate|$165 exam|e|e|2|a|https://docs.microsoft.com/en-us/learn/certifications/azure-security-engineer?wt.mc_id=learningredirect_certs-web-wwl|Azure Security Engineer Associate. Defender, Sentinel, Key Vault, NSGs.
C)CSO|Mile2 Certified Cloud Security Officer|$550 exam|e|e|2|a|https://mile2.com/ccso_outline/|
CKAD|Cloud Native Computing Foundation Certified Kubernetes Application Dev|$375 lab|e|e|2|a|https://www.cncf.io/certification/ckad/|Certified Kubernetes App Developer. Container and pod security.
CLCSM|PECB Lead Cloud Security Manager|~$930 exam|e|e|2|a|https://pecb.com/en/education-and-certification-for-individuals/cloud-security/lead-cloud-security-manager|
CSA CCSK|Cloud Security Alliance Certificate of Cloud Security Knowledge|$395 exam|e|e|2|a|https://cloudsecurityalliance.org/education/ccsk/|Cloud Security Alliance Certificate of Cloud Security Knowledge. Vendor-neutral.
CSA CGC|Cloud Security Alliance Cloud Governance & Compliance|$315 exam|e|e|2|a|https://cloudsecurityalliance.org/education/cloud-governance-and-compliance/|
DCA|Docker Certified Associate|$195 exam|e|e|2|a|https://training.mirantis.com/dca-certification-exam/|Docker Certified Associate. Container security and orchestration.
EXIN PCSM|EXIN Professional Cloud Security Manager|$315 exam|e|e|2|a|https://www.exin.com/certifications/ccc-professional-cloud-security-manager-exam|
EXIN PCSerM|EXIN Professional Cloud Service Manager|$315 exam|e|e|2|a|https://www.exin.com/certifications/ccc-professional-cloud-service-manager-exam|
GCIP|GIAC Critical Infrastructure Protection|$979 exam|e|e|2|a|https://www.giac.org/certification/critical-infrastructure-protection-gcip|
GCLD|GIAC Cloud Security Essentials|$979 exam SANS course recommen|e|e|2|a|https://www.giac.org/certifications/cloud-security-essentials-gcld/|
GICSP|GIAC Global Industrial Security Professional|$979 exam|e|e|2|a|https://www.giac.org/certification/global-industrial-cyber-security-professional-gicsp|GIAC Global Industrial Cyber Security Professional. ICS/SCADA security.
Google PCSE|Google Professional Cloud Security Engineer|$200 exam|e|e|2|a|https://cloud.google.com/certification/cloud-security-engineer|Google Professional Cloud Security Engineer. GCP security design and operations.
ISA CAP|ISA Certified Automation Specialist|$467 exam|e|e|2|a|https://www.isa.org/training-and-certifications/isa-certification/isa99iec-62443/isa99iec-62443-cybersecurity-certificate-programs/|
ISA CRAS|ISA Certified Risk Assesment Specialist|$2,700 course + exam|e|e|2|a|https://www.isa.org/training-and-certifications/isa-certification/isa99iec-62443/isa99iec-62443-cybersecurity-certificate-programs/|
LPIC-1|Linux Professional Institute Certified: Linux Administrator|$400 2 exams|e|e|2|a|https://www.lpi.org/our-certifications/lpic-1-overview|Linux Professional Institute Level 1. System administration basics.
LPIC-2|Linux Professional Institute Certified: Linux Engineer|$400 2 exams|e|e|2|a|https://www.lpi.org/our-certifications/lpic-2-overview|Linux Professional Institute Level 2. Advanced administration.
MCSE|Mosse Institute Cloud Security Engineer|$600 exam|e|e|2|a|https://www.mosse-institute.com/certifications/mcse-certified-cloud-security-engineer.html|
MDSO|Mosse Institute Certified DevSecOps Engineer|$450 exam|e|e|2|a|https://www.mosse-institute.com/certifications/mdso-certified-devsecops-engineer.html|
SCA|SUSE Certified Administrator|$149 exam|e|e|2|a|https://www.suse.com/training/exam/sca-sles-15/|
TUV COSM|TUV Certified OT Security Manager|$3,070 Course|e|e|2|a|https://limessecurity.com/en/academy/ics-211/|
VCP NV|VMware Certified Professional in Network Virtualization|$375 exam|e|e|2|a|https://www.vmware.com/education-services/certification/vcp-nv-tracks.html|
APMG 27001F|APMG ISO/IEC 27001 Foundation|$400 exam|g|m|2|a|https://apmg-international.com/product/isoiec-27001|
BCS PCIAA|BCS Practitioner Certificate in Information Assurance Architecture|$290 exam|g|m|2|a|https://www.bcs.org/get-qualified/certifications-for-professionals/information-security-and-ccp-scheme-certifications/bcs-practitioner-certificate-in-information-assurance-architecture/|
C)HISSP|Mile2 Certified Healthcare Information Systems Security Practitioner|$550 exam|g|m|2|a|https://www.mile2.com/chissp_outline/|
C)ISSM|Mile2 Certified Information Systems Security Manager|$550 exam|g|m|2|a|https://mile2.com/cissm_outline/|
C)ISSO|Mile2 Certified Information Systems Security Officer|$550 exam|g|m|2|a|https://www.mile2.com/cisso_outline/|
C)SLO|Mile2 Certified Security Leadership Officer|$550 exam|g|m|2|a|https://www.mile2.com/cslo_outline/|
CAC|GAQM Certified Agile Coach|$170|g|m|2|a|https://gaqm.org/certifications/scrum_agile/cac|
CAD|GAQM Certified Agile Developer|$128 exam|g|m|2|a|https://gaqm.org/certifications/scrum_agile/cad|
CCP|EC First Certified CCMC Professional|$2,995 exam|g|m|2|a|https://ecfirst.biz/index.php?route=product/product&path=59_83&product_id=281|
CCRMP|IBITGQ Certified in Managing Cyber Security Risk|$2,629 course exam|g|m|2|a|https://www.itgovernance.co.uk/shop/product/managing-cyber-security-risk-training-course|
CCSA|EC First Certified Cyber Security Architect|$695 exam|g|m|2|a|https://training-certifications.checkpoint.com/#/courses/Check%20Point%20Certified%20Admin%20(CCSA)%20R80.x|
CIS RM|IBITGQ Certified ISO 27005 Information Security Management Specialist|$2,783 course exam|g|m|2|a|https://www.itgovernance.co.uk/shop/product/iso-27005-certified-isms-risk-management|
CISP|GAQM Certified Information Security Professional|$170 exam|g|m|2|a|https://gaqm.org/certifications/information_systems_security/cisp|
CISRM|IBITGQ Certified ISO 27005 Information Security Management Specialist|$2,783 course exam|g|m|2|a|https://www.itgovernance.co.uk/shop/product/iso-27005-certified-isms-risk-management|
CNDA|EC Council Certified Network Defense Architect|$200 application|g|m|2|a|https://www.eccouncil.org/programs/certified-network-defense-architect-cnda/|
CSBA|QAI Certified Software Business Analyst|$350 exam + written essay|g|m|2|a|https://www.softwarecertifications.org/csba/|
CSCS|EC First Certified Security Compliance Specialist|$695 exam|g|m|2|a|https://ecfirst.biz/index.php?route=product/product&path=59_61&product_id=89|
DACRP|DRI Associate Cyber Resilience Professional|$200 exam|g|m|2|a|https://drii.org/certification/acrp|
DCRMP|DRI Certified Risk Management Professional|$400 exam|g|m|2|a|https://drii.org/certification/crmp|
EXIN 27001P|EXIN ISO/IEC 27001 Professional|$279 exam|g|m|2|a|https://www.exin.com/certifications/information-security-management-professional-based-isoiec-27001-exam|
GRCP|OCEG Governance, Risk, and Compliance Professional|$399 12 month license|g|m|2|a|https://www.oceg.org/certifications/grc-professional-certification/|
GSEC|GIAC Security Essentials Certification|$979 exam|g|m|2|a|https://www.giac.org/certification/security-essentials-gsec|GIAC foundational cert covering essential security concepts. Open-book proctored exam.
ISMI CSMP|ISMI Certified Security Management Professional|$1159|g|m|2|a|https://www.ismi.org.uk/csmp/csmp%C2%AE-overview.aspx|
PECB 27001F|PECB ISO/IEC 27001 Foundation|$500-749 exam|g|m|2|a|https://pecb.com/en/education-and-certification-for-individuals/iso-iec-27001/iso-iec-27001-foundation|
PECB 27005RM|PECB ISO/IEC 27005 Risk Manager|~$995 exam|g|m|2|a|https://pecb.com/en/education-and-certification-for-individuals/iso-iec-27005/iso-iec-27005-risk-manager|
PECB 27032CM|PECB ISO/IEC 27032 Lead Cybersecurity Manager|$899-$2,999 course exam|g|m|2|a|https://pecb.com/en/education-and-certification-for-individuals/iso-iec-27032/iso-iec-27032-lead-cyber-security-manager|
PPM|GAQM Professional in Project Management|$210 exam|g|m|2|a|https://gaqm.org/certifications/project_management/ppm|
Programming Language|Learning a programming language is valuable to any IT professionals ca|Recommendations: Python, Ruby,|g|m|2|a|https://www.learnpython.org/|
SACP|The H Layer Security Awareness and Culture Professional|$369 Exam|g|m|2|a|https://www.thehlayer.com/about-exam/|
SSAP|SANS Security Awareness Professional|$1219 Exam|g|m|2|a|https://www.sans.org/security-awareness-training/career-development/credential/|
TUV ITSM|TUV IT Security Manager (GERMAN)|$415 exam|g|m|2|a|https://www.certipedia.com/quality_marks/0000063483?locale=en|
Zach EAA|Zachman Enterprise Architect Associate (Level 1)|$2,999 course exam|g|m|2|a|https://www.zachman.com/certification/what-we-certify/enterprise-architect|
CIGE|IMI Certified Identity Governance Expert|$395 exam|i|m|2|a|https://www.identitymanagementinstitute.org/cige/|
CIST|IMI Certfied Identity and Security Technologist|$295 exam|i|m|2|a|https://www.identitymanagementinstitute.org/cist/|
SC-300|Microsoft Certfied: Identity and Access Administrator Associate|$165 exam|i|m|2|a|https://docs.microsoft.com/en-us/learn/certifications/identity-and-access-administrator/|Microsoft Identity and Access Administrator Associate.
SF CIAMD|SalesForce Certified Identity and Access Management Designer|$400 exam|i|m|2|a|https://trailhead.salesforce.com/help?article=Salesforce-Certified-Identity-and-Access-Management-Designer-Exam-Guide|
CCNA|Cisco Certified Network Associate|~$330 exam|n|e|2|a|https://www.cisco.com/c/en/us/training-events/training-certifications/certifications/associate/ccna.html|Cisco networking fundamentals. 200-301 exam covers routing, switching, wireless, security.
CREST CCNIA|CREST Certified Network Intrusion Analyst|$2,481 exam & essay|n|e|2|a|https://www.crest-approved.org/certification-careers/crest-certifications/crest-certified-network-intrusion-analyst|
CWSP|CWNP Certified Wireless Security Professional|$325 exam|n|e|2|a|https://www.cwnp.com/certifications/cwsp|Certified Wireless Security Professional. Wi-Fi security deep dive.
F5 CA|F5 Big-IP Certified Administrator|$135 exam|n|e|2|a|https://view.ceros.com/f5/certification-roadmap/p/9?heightOverride=740|
F5 CTS APM|F5 Big-IP Certified Technical Specialist - Access Policy Manager|$135 exam|n|e|2|a|https://view.ceros.com/f5/certification-roadmap/p/9?heightOverride=740|
F5 CTS DNS|F5 Big-IP Certified Technical Specialist - Domain Name Services|$135 exam|n|e|2|a|https://view.ceros.com/f5/certification-roadmap/p/9?heightOverride=740|
FCP NS|Fortinet Certified Professional - Network Security|$400 for 2 exams|n|e|2|a|https://training.fortinet.com/local/staticpage/view.php?page=fcp_network_security|
JNCIS Sec|Juniper Networks Certified Internet Specialist, Security|$300 exam|n|e|2|a|https://www.juniper.net/us/en/training/certification/certification-tracks/junos-security-track/?tab=jncisec|
MNSE|Mosse Institute Network Security Essentials|$450 certification programme|n|e|2|a|https://www.mosse-institute.com/certifications/mnse-network-security-essentials.html|
OWSE|ISECOM OSSTMM Wireless Security Expert|$100 annual sub|n|e|2|a|https://www.isecom.org/certification.html|
PCDRA|Palo Alto Networks Certified Detection and Remediation Analyst|$155 exam|n|e|2|a|https://www.paloaltonetworks.com/services/education/certification|
PCNSA|Palo Alto Networks Certified Network Security Administrator|$155 exam|n|e|2|a|https://www.paloaltonetworks.com/services/education/certification|Palo Alto Network Security Administrator. Being retired — replaced by NSA.
eNDP|eLearnSecurity Network Defense Professional|$400 exam|n|e|2|a|https://www.elearnsecurity.com/certification/endp/|
ACE|AccessData Certified Examiner|$100 + software|b|b|2|a|https://accessdata.com/training/computer-forensics-certification|
ASIS PCI|ASIS Professional Certified Investigator|$485 exam|b|b|2|a|https://www.asisonline.org/certification/professional-certified-investigator-pci|
C)CSA|Mile2 Certified Cybersecurity Analyst|$550 exam|b|b|2|a|https://www.mile2.com/ccsa_outline/|
C)IHE|Mile2 Certified Incident Handling Engineer|$550 exam|b|b|2|a|https://www.mile2.com/cihe_outline/|
C)NFE|Mile2 Certified Network Forensics Examiner|$550 exam|b|b|2|a|https://www.mile2.com/network-forensics-examiner-outline/|
C)TIA|Mile2 Certified Threat Intelligence Analyst|$550 exam|b|b|2|a|https://www.mile2.com/threat-analyst/|
CFA|GAQM Certified Forensic Analyst|$128 exam|b|b|2|a|https://gaqm.org/certifications/information_systems_security/cfa|
CFR|CertNexus CyberSec First Responder|$250 exam|b|b|2|a|https://certnexus.com/certification/cybersec-first-responder/|
CHFI|EC Council Computer Hacking Forensics Investigator|$650 exam|b|b|2|a|https://www.eccouncil.org/programs/computer-hacking-forensic-investigator-chfi/|EC-Council Computer Hacking Forensic Investigator.
CREST CCHIA|CREST Certified Host intrustion Analyst|$2,481 exam & essay|b|b|2|a|https://www.crest-approved.org/certification-careers/crest-certifications/crest-certified-host-intrusion-analyst|
CSA|EC Council Certified SOC Analyst|$550 exam|b|b|2|a|https://www.eccouncil.org/programs/certified-soc-analyst-csa/|
CSAE|Cyber Struggle AEGIS|$1,700 course exam|b|b|2|a|https://cyberstruggle.org/aegis-certification/|
CSX-P|ISACA Cybersecurity Practitioner|$549 lab|b|b|2|a|https://cybersecurity.isaca.org/csx-certifications/csx-practitioner-certification|
CTIA|EC Council Certified Threat intelligence Analyst|$450 exam|b|b|2|a|https://www.eccouncil.org/programs/certified-threat-intelligence-analyst-ctia/|
Cisco COA|Cisco Certified CyberOps Associate Cyber Operations|~$325 exam|b|b|2|a|https://www.cisco.com/c/en/us/training-events/training-certifications/certifications/associate/cyberops-associate.html|
CySA+|CompTIA Cybersecurity Analyst+|$404 exam|b|b|2|a|https://www.comptia.org/certifications/cybersecurity-analyst|CompTIA Cybersecurity Analyst+. Threat detection and analysis. DoD 8140.
ECIH|EC Council Certified Incident Handler|$300 exam|b|b|2|a|https://www.eccouncil.org/programs/ec-council-certified-incident-handler-ecih/|EC-Council Certified Incident Handler. IR procedures and techniques.
EDRP|EC Council Disaster Recovery Professional|$450 exam|b|b|2|a|https://www.eccouncil.org/programs/disaster-recovery-professional-edrp/|
EnCE|OpenText EnCase Certified Examiner|$200 two exams|b|b|2|a|https://www.opentext.com/products-and-solutions/services/training-and-learning-services/encase-training/examiner-certification|OpenText EnCase Certified Examiner. EnCase forensic tool proficiency.
GFACT|GIAC Foundational Cybersecurity Technologies|$979 exam|b|b|2|a|https://www.giac.org/certifications/foundational-cybersecurity-technologies-gfact/|GIAC Foundational Cybersecurity Technologies. Entry-level GIAC.
GOSI|GIAC Open Source Intelligence|$979 exam|b|b|2|a|https://www.giac.org/certification/open-source-intelligence-gosi|
HTB CDSA|Hack the Box Certified Defensive Security Analyst|$145 modules + $210 exam|b|b|2|a|https://academy.hackthebox.com/preview/certifications/htb-certified-defensive-security-analyst|Hack The Box Certified Defensive Security Analyst.
MAD CTI|Mitre Att&ck Defender Cyber Threat intelligence|$299 annual subscription|b|b|2|a|https://mitre-engenuity.org/mad/|
MAD SOCA|Mitre Att&ck Defender Security Operations Center Assessment|$299 annual subscription|b|b|2|a|https://mitre-engenuity.org/mad/|
MOIS|MOIS Certified OSINT Expert Certification|$450 certification programme|b|b|2|a|https://www.mosse-institute.com/certifications/mois-certified-osint-expert.html|
MRCI|Mosse Institute Remote Cybersecurity Internship Programme|$49 certification programme|b|b|2|a|https://www.mosse-institute.com/certifications/mrci-remote-cybersecurity-internship.html|
OPSA|ISECOM OSSTMM Professional Security Analyst|$100 annual sub|b|b|2|a|https://www.isecom.org/certification.html|
OSDA|Offensive Security Defense Analyst|$2,499 exam|b|b|2|a|https://www.offensive-security.com/soc200-osda/|OffSec Defense Analyst. SOC and detection-focused.
OSIP|IntelTechniques Open Source Intelligence Professional|$300 practical exam|b|b|2|a|https://inteltechniques.com/training-osip.html|
S-TA|SECO Certified Threat Analyst|$550 exam|b|b|2|a|https://www.seco-institute.org/get-trained/cyber-defense-track/threat-analyst-certification/|
SC-200|Microsoft Certified: Security Operations Analyst Associate|~$165 exam|b|b|2|a|https://docs.microsoft.com/en-us/learn/certifications/security-operations-analyst/|Microsoft Security Operations Analyst. Sentinel, Defender XDR, KQL.
eCIR|eLearnSecurity Certified Incident Responder|$400 lab|b|b|2|a|https://security.ine.com/certifications/ecir-certification/|
BSCP|Portswigger Burp Suite Certified Practioner|$99 exam|r|r|2|a|https://portswigger.net/web-security/certification|PortSwigger Burp Suite Certified Practitioner. Web vuln exploitation.
C)PSH|Mile2 Certified Powershell Hacker|$550 exam|r|r|2|a|https://www.mile2.com/cpSH_outline/|
C)PTC|Mile2 Certified Penetration Testing Consultant|$550 exam|r|r|2|a|https://mile2.com/cptc_outline/|
C)PTE|Mile2 Certified Penetration Testing Engineer|$550 exam|r|r|2|a|https://www.mile2.com/penetration-testing-engineer-outline/|
CEH|EC Council Certified Ethical Hacker|$1,199 exam|r|r|2|a|https://www.eccouncil.org/programs/certified-ethical-hacker-ceh/|EC-Council Certified Ethical Hacker. Widely recognized but controversial.
CHAT|ISECOM Certified Hacker Analyst Trainer|$100 annual sub|r|r|2|a|https://www.isecom.org/certification.html|
CM)IPS|Mile2 Certified Master Intrusion Prevention Specialist|Complete C)VA, C)PEH, C)PTE an|r|r|2|a|https://www.mile2.com/master-certifications/|
CMWAPT|Infosec Institute Certified Mobile and Web App Penetration Tester|$4,599 exam|r|r|2|a|https://app.infosecinstitute.com/portal/courses/a0tC0000000Fow6IAC|
CREA|Infosec Institute Certified Reverse Engineering Analyst|$4,599 exam|r|r|2|a|https://app.infosecinstitute.com/portal/courses/a0tC0000000Fp4IIAS|
CREST CPSA|CREST Practitioner Security Analyst|$425 exam|r|r|2|a|https://www.crest-approved.org/certification-careers/crest-certifications/crest-practitioner-security-analyst|
CREST CSAS|CREST Certified Simulated Attack Specialist|$2,520 2 exams & lab|r|r|2|a|https://www.crest-approved.org/certification-careers/crest-certifications/crest-certified-simulated-attack-specialist|
CRTOP|Infosec Institute Certified Red Team Operations Professional|$4,599 exam|r|r|2|a|https://app.infosecinstitute.com/portal/courses/a0t0y00000BK8IcAAL|
CSR|Cyber Struggle Ranger|Location Based Cost|r|r|2|a|https://cyberstruggle.org/ranger-certification/|
CSTL|Cyber Scheme Team Leader|$1945 exam|r|r|2|a|https://thecyberscheme.org/cyber-scheme-team-leader-cstl-exam/|
CSTM|Cyber Scheme Team Member|$610 exam|r|r|2|a|https://thecyberscheme.org/cyber-scheme-team-member-cstm-exam/|
DV MoS|Dark Vortex Malware on Steroids|$2000 exam|r|r|2|a|https://0xdarkvortex.dev/training-programs/malware-on-steroids/#certification|
DV OTD|Dark Vortex Offensive Tool Development|$2000 exam|r|r|2|a|https://0xdarkvortex.dev/training-programs/offensive-tool-development/|
DV RTOS|Dark Vortex Red Team & Operational Security|$2500 exam|r|r|2|a|https://0xdarkvortex.dev/training-programs/red-team-and-operational-security/|
ECES|EC Council Certified Encryption Specialist|$249 exam|r|r|2|a|https://www.eccouncil.org/programs/ec-council-certified-encryption-specialist-eces/|
HTB CBBH|Hack the Box Certified Bug Bounty Hunter|$145 modules + $210 exam|r|r|2|a|https://academy.hackthebox.com/preview/certifications/htb-certified-bug-bounty-hunter/|Hack The Box Certified Bug Bounty Hunter.
MVRE|Mosse Institute Vulnerability Researcher and Exploitation Specialist|$450 Exam|r|r|2|a|https://www.mosse-institute.com/certifications/mvre-vulnerability-researcher-and-exploitation-specialist.html|
OPST|ISECOM OSSTMM Professional Security Tester|Unknown|r|r|2|a|https://www.isecom.org/certification.html|
OSWA|Offensive Security Web Assessor|$2,499 Exam|r|r|2|a|https://www.offensive-security.com/web200-oswa/|OffSec Web Assessor. Black-box web app testing.
PJMR|Practical Junior Malware Researcher|$399 lab|r|r|2|a|https://certifications.tcm-sec.com/pjmr/|TCM Security Practical Junior Malware Researcher.
S-EHP|SECO Ethical Hacking Practitioner|$550 exam|r|r|2|a|https://www.seco-institute.org/|
SOG CAPen|The SecOps Group Certified AppSec Pentester|$500 exam|r|r|2|a|https://secops.group/product/certified-appsec-pentester/|
SOG CMPen And|The SecOps Group Certified Mobile Pentester - Android|$400 exam|r|r|2|a|https://secops.group/product/certified-mobile-pentester-cmpen-android/|
SOG CMPen iOS|The SecOps Group Certified Mobile Pentester - iOS|$400 exam|r|r|2|a|https://secops.group/product/certified-mobile-pentester-cmpen-ios/|
SOG CNPen|The SecOps Group Certified Network Pentester|$500 exam|r|r|2|a|https://secops.group/product/certified-network-pentester/|
eCPPT|eLearnSecurity Certified Professional Penetration Tester|$400 lab|r|r|2|a|https://security.ine.com/certifications/ecppt-certification/|INE Certified Professional Penetration Tester.
eJPT|eLearnSecurity Junior Penetration Tester|$249 lab|r|r|2|a|https://ine.com/learning/certifications/internal/elearnsecurity-junior-penetration-tester-v2|INE Junior Penetration Tester. Affordable entry-level pentest cert. Hands-on.
eMAPT|eLearnSecurity Mobile Application Penetration Tester|$400|r|r|2|a|https://security.ine.com/certifications/emapt-certification/|INE Mobile Application Penetration Tester.
eWPT|eLearnSecurity Web Application Penetration Tester|$400 lab|r|r|2|a|https://security.ine.com/certifications/ewpt-certification/|INE Web Application Penetration Tester.
C)SWAE|Mile2 Secure Web Application Engineer|$550 exam|s|e|2|a|https://www.mile2.com/cswae_outline/|
CASST|GAQM Certified Advanced Software Security Tester|$210 exam|s|e|2|a|https://gaqm.org/certifications/software_security_testing/casst|
CCSC|CertNexus Cyber Secure Coder|$300 exam|s|e|2|a|https://certnexus.com/certification/cyber-secure-coder/|
DevNet A|Cisco DevNet Associate|$300 Exam|s|e|2|a|https://www.cisco.com/site/us/en/learn/training-certifications/certifications/devnet/associate/index.html|Cisco DevNet Associate. Network automation and programmability.
GMLE|GIAC Machine Learning Engineer|$979 exam|s|e|2|a|https://www.giac.org/certifications/machine-learning-engineer-gmle/|GIAC Machine Learning Engineer. ML security and adversarial ML.
EXIN CIT|EXIN Cyber & IT Security|$225 exam|t|m|1|a|https://www.exin.com/qualification-program/exin-cyber-and-it-security|
TUV CySec|TUV Rheinland Cybersecurity Specialist (GERMAN)|$415 exam|t|m|1|a|https://www.tuv.com/landingpage/en/training-functional-safety-cyber-security/detail-pages/zertifikate/cs-specialist.html|
CIPP|IAPP Certified Information Privacy Professional|$550 exam|a|m|1|a|https://iapp.org/certify/cipp|IAPP Certified Information Privacy Professional. Regional variants (US/E/C/A).
CRFS|IMI Certified Red Flag Specialist|$295 exam|a|m|1|a|https://www.identitymanagementinstitute.org/crfs/|
EPDPE|EXIN Privacy and Data Protection Essentials|$145 exam|a|m|1|a|https://www.exin.com/certifications/exin-privacy-and-data-protection-essentials-exam|
EPDPF|EXIN Privacy and Data Protection Foundation|$207 exam|a|m|1|a|https://www.exin.com/certifications/exin-privacy-and-data-protection-foundation-exam|
A+|CompTIA A+|$253 exam|e|e|1|a|https://www.comptia.org/certifications/a|
AWS CP|Amazon Web Services Certified Cloud Practitioner|$100 exam|e|e|1|a|https://aws.amazon.com/certification/certified-cloud-practitioner/|AWS Cloud Practitioner. Entry-level cloud literacy. 90-min exam.
AZ-220|Azure IoT Developer Specialty|$165 exam|e|e|1|a|https://docs.microsoft.com/en-us/learn/certifications/azure-iot-developer-specialty?wt.mc_id=learningredirect_certs-web-wwl|
AZ-900|Microsoft Azure Fundamentals|$165 exam|e|e|1|a|https://docs.microsoft.com/en-us/learn/certifications/azure-fundamentals|Azure Fundamentals. Free with Microsoft Learn challenges. Good cloud starting point.
Apple ACSP|Apple Certified Support Professional|$250 exam|e|e|1|a|https://training.apple.com/us/en/recognition|
CACS|Excida IEC 62443 Certified Automation Cybersecurity Specialist|$700 exam|e|e|1|a|https://www.exidacace.com/Apply/CACS|
CIOTSP|CertNexus Certified Internet of Things Security Practitioner|$250 exam|e|e|1|a|https://certnexus.com/certification/ciotsp/|
Cloud Essnt|CompTIA Cloud Essentials|$138 exam|e|e|1|a|https://www.comptia.org/certifications/cloud-essentials|
Cloud+|CompTIA Cloud+|$369 exam|e|e|1|a|https://www.comptia.org/certifications/cloud|CompTIA Cloud+. Vendor-neutral cloud infrastructure and security.
EXIN PCA|EXIN Professional Cloud Administrator|$315 exam|e|e|1|a|https://www.exin.com/certifications/ccc-professional-cloud-administrator-exam|
EXIN PCD|EXIN Professional Cloud Developer|$315 exam|e|e|1|a|https://www.exin.com/certifications/ccc-professional-cloud-developer-exam|
Google ACE|Google Associate Cloud Engineer|$125 exam|e|e|1|a|https://cloud.google.com/certification/cloud-engineer|Google Associate Cloud Engineer. GCP fundamentals and deployment.
ISA CFS|ISA Certified Fundamentals Specialist|$2,700 course + exam|e|e|1|a|https://www.isa.org/training-and-certifications/isa-certification/isa99iec-62443/isa99iec-62443-cybersecurity-certificate-programs/|
KCNA|Cloud Native Computing Foundation Kubernetes and Cloud Native Associat|$250 exam|e|e|1|a|https://www.cncf.io/certification/kcna/|Kubernetes and Cloud Native Associate. Entry-level CNCF cert.
LFCA|Linux Foundation Certified IT Associate|$200 exam|e|e|1|a|https://training.linuxfoundation.org/certification/certified-it-associate/|
Linux+|CompTIA Linux+|$369 exam|e|e|1|a|https://www.comptia.org/certifications/linux|CompTIA Linux+. System administration and security on Linux.
MCSF|Mosse Institute Cloud Services Fundamentals|$450 exam|e|e|1|a|https://www.mosse-institute.com/certifications/mcsf-cloud-services-fundamentals.html|
MSAF|Mosse Institute System Administration Fundamentals|$450 exam|e|e|1|a|https://www.mosse-institute.com/certifications/msaf-system-administration-fundamentals.html|
PDSO CDP|PDSO Certified DevSecOps Professional|$799|e|e|1|a|https://www.practical-devsecops.com/certified-devsecops-professional/|
SOG CCSP-AWS|SecOps Group Certified Cloud Security Practitioner - AWS|$249 exam|e|e|1|a|https://secops.group/product/certified-cloud-security-practitioner-aws-ccsp-aws/|
Server+|CompTIA Server+|$319 exam|e|e|1|a|https://www.comptia.org/certifications/server|CompTIA Server+. Server hardware, software, storage, security.
TUV COSP|TUV Certified OT Security Practitioner|$2725 course|e|e|1|a|https://limessecurity.com/en/academy/ics-201/|
TUV COSTE|TUV Certified OT Security Technical Expert|$3,070 course|e|e|1|a|https://limessecurity.com/en/academy/ics-211/|
APMG 20000F|APMG ISO/IEC 20000 Foundation|$308 exam|g|m|1|a|https://apmg-international.com/product/iso-20000|
BCS FISMP|BCS Foundation Certifiate in Information Security Management Principle|$249 exam|g|m|1|a|https://www.bcs.org/get-qualified/certifications-for-professionals/information-security-and-ccp-scheme-certifications/bcs-foundation-certificate-in-information-security-management-principles/|
C CS F|IBITGQ Certified Cyber Security Foundation|$725 course exam|g|m|1|a|https://www.itgovernance.co.uk/shop/product/certified-cyber-security-foundation-training-course|
C)ISCAP|Mile2 Information Systems Certification and Accredidation Professional|$550 exam|g|m|1|a|https://www.mile2.com/iscap_outline/|
CC|ISC2 Certified in Cybersecurity|Free exam|g|m|1|a|https://www.isc2.org/Certifications/CC|ISC2's entry cert. Free exam voucher. No experience required. Good starting point.
CIISec ICSF|CIISec Information and Cybersecurity Fundamentals|$450 exam|g|m|1|a|https://www.ciisec.org/ICSF_Exam|
CIS F|IBITGQ Certified ISO 27001 Information Security Management Specialist|$853 course exam|g|m|1|a|https://www.itgovernance.co.uk/shop/product/certified-iso-27001-isms-foundation-training-course|
CITGP|IBITGQ Certified in Implementing IT Governance - Foundation & Principl|~$2,499 course exam|g|m|1|a|https://www.itgovernance.co.uk/shop/product/implementing-it-governance-foundation-principles-training-course|
CSAP|Infosec Institute Certified Security Awareness Practitioner|$2,599 exam|g|m|1|a|https://app.infosecinstitute.com/portal/courses/a0t0y000009lTzjAAE|
CSP|GAQM Certified SAFe Practitioner|$170 exam|g|m|1|a|https://gaqm.org/certifications/scrum_agile/csp-410|
EXIN 27001F|EXIN ISO/IEC 27001 Foundation|$232 exam|g|m|1|a|https://www.exin.com/certifications/information-security-foundation-based-iso-iec-27001-exam|
FEXIN|EXIN Information Security Foundation|$232 exam|g|m|1|a|https://www.exin.com/certifications/information-security-foundation-based-iso-iec-27001-exam?language_content_entity=en|
Fair Fdn|Fair Institute Analysis Fundamentals|$1499 exam|g|m|1|a|https://risklens-academy.myshopify.com/collections/popular-courses/products/fair-analysis-fundamentals-2|
GISF|GIAC Information Security Fundamentals|$979 exam|g|m|1|a|https://www.giac.org/certification/information-security-fundamentals-gisf|
IIBA CCA|IIBA Certification in Cybersecurity Analysis|$475 exam|g|m|1|a|https://www.iiba.org/certification/iiba-certifications/specialized-business-analysis-certifications/certificate-in-cybersecurity-analysis/|
ISMI CSM|ISMI Certified Security Manager|$TBD|g|m|1|a|https://www.ismi.org.uk/csmp/certified-security-manager%C2%AE|
ITIL Fdn|ITIL Foundation|$383 exam|g|m|1|a|https://www.axelos.com/certifications/itil-certifications/itil-foundation|ITIL Foundation. IT service management basics. Widely required.
ITS-C|Certiport IT Specialist - Cybersecurity|$127 exam|g|m|1|a|https://certiport.filecamp.com/s/JTIy1sX0ci0ZI3ss/fi|
MCL|Mosse Institute Cybersecurity Leadership|$450 exam|g|m|1|a|https://www.mosse-institute.com/certifications/mcl-cybersecurity-leadership.html|
M_o_R Fdn|Axelos M_o_R Framework Foundation|$495 exam|g|m|1|a|https://www.axelos.com/certifications/propath/mor-risk-management/mor-foundation|
PECB 27005F|PECB ISO/IEC 27005 Foundation|$500-749 exam|g|m|1|a|https://pecb.com/en/education-and-certification-for-individuals/iso-iec-27005/iso-iec-27005-foundation|
PECB 27032F|PECB ISO/IEC 27032 Foundation|$500-749 exam|g|m|1|a|https://pecb.com/en/education-and-certification-for-individuals/iso-iec-27032/iso-iec-27032-foundation|
PSM I|Scrum.org Professional Scrum Master I|$150 exam|g|m|1|a|https://www.scrum.org/assessments/professional-scrum-master-i-certification|Professional Scrum Master I. Scrum.org agile framework.
Project+|CompTIA Project+|$369 exam|g|m|1|a|https://www.comptia.org/certifications/project|
S-ISF|SECO Information Security Foundation|$460 exam|g|m|1|a|https://www.seco-institute.org/certifications/information-security-certification-track/|
SSCP|(ISC)2 Systems Security Certified Practitioner|$249 exam|g|m|1|a|https://www.isc2.org/Certifications/SSCP|ISC2 associate-level. Seven domains of security administration. 1yr experience required.
Security+|CompTIA Security+|$404 exam|g|m|1|a|https://www.comptia.org/certifications/security|Industry baseline for entry-level security. DoD 8140 approved. 90-min exam, 750/900 to pass.
TOGAF Fdn|OpenGroup TOGAF Certified|$360 exam|g|m|1|a|https://www.opengroup.org/certifications/togaf|
CAMS|IMI Certfied Access Management Specialist|$195 exam|i|m|1|a|https://www.identitymanagementinstitute.org/cams/|
SC-900|Microsoft Certified: Security, Compliance, and Identity Fundamentals|$99 exam|i|m|1|a|https://docs.microsoft.com/en-us/learn/certifications/security-compliance-and-identity-fundamentals/|Microsoft Security, Compliance and Identity Fundamentals. Free practice assessments.
CCT|Cisco Certified Technician|$165 exam|n|e|1|a|https://www.cisco.com/c/en/us/training-events/training-certifications/certifications/entry/technician-cct.html|Cisco entry-level technician. Support and device maintenance.
FCA|Fortinet Certificed Associate|Free course and exam required|n|e|1|a|https://training.fortinet.com/local/staticpage/view.php?page=fca_cybersecurity|Fortinet Certified Associate. Entry-level network security.
FCF|Fortinet Certified Fundamentals Cybersecurity|Free 3 courses with exams req|n|e|1|a|https://training.fortinet.com/local/staticpage/view.php?page=fcf_cybersecurity|Fortinet Certified Fundamentals. Free beginner certification.
ITS-NS|Certiport IT Specialist - Network Security|$127 exam|n|e|1|a|https://certiport.filecamp.com/s/ITS_OD_102_Network_Security/fi|
JNCIA Sec|Juniper Networks Certified Internet Associate, Security|$200 exam|n|e|1|a|https://www.juniper.net/us/en/training/certification/certification-tracks/junos-security-track/?tab=jnciasec|
Net+|CompTIA Network+|$369 exam|n|e|1|a|https://www.comptia.org/certifications/network|CompTIA networking fundamentals. Prerequisite knowledge for Security+.
PCCET|Palo Alto Networks Certified Cybersecurity Entry-level Technician|$110 exam|n|e|1|a|https://www.paloaltonetworks.com/services/education/certification|Palo Alto entry-level. Being retired — replaced by FCA.
SOG NSP|SecOps Group Certified Network Security Practitioner|$249 exam|n|e|1|a|https://secops.group/product/certified-network-security-practitioner/|
WCNA|Protocol Analysis Institute Wireshark Certified Network Analyst|$299 exam|n|e|1|a|https://www.wcnacertification.com/exam-information-1|Wireshark Certified Network Analyst. Packet analysis expertise.
C)DFE|Mile2 Certified Digital Forensics Examiner|$550 exam|b|b|1|a|https://www.mile2.com/cdfe_outline/|
C)SP|Mile2 Certified Security Principles|$550 exam|b|b|1|a|https://www.mile2.com/csp_outline/|
CCOA|ISACA Certified Cybersecurity Operations Analyst|$760 exam|b|b|1|a|https://www.isaca.org/credentialing/ccoa|
CIRM Fdn|IBITGQ Cyber Incident Response Management Foundation|$768 course exam|b|b|1|a|https://www.itgovernance.co.uk/shop/product/cyber-incident-response-management-foundation-training-course|
CND|EC Council Certified Network Defender|$550 exam|b|b|1|a|https://www.eccouncil.org/programs/certified-network-defender-cnd/|EC-Council Certified Network Defender. Network defense strategies.
CREST CPIA|CREST Practitioner Intrusion Analyst|$425 exam|b|b|1|a|https://www.crest-approved.org/certification-careers/crest-certifications/crest-practitioner-intrusion-analyst|
CREST CPTIA|CREST Practitioner Threat Intelligence Analyst|$425 exam|b|b|1|a|https://www.crest-approved.org/certification-careers/crest-certifications/crest-practitioner-threat-intelligence-analyst/|
CSCU|EC Council Certified Secure Computer User|$125 exam|b|b|1|a|https://www.eccouncil.org/Certification/certified-secure-computer-user|
CSX-F|IBITGQ Cyber Incident Response Management Foundation|$768 course exam|b|b|1|a|https://www.itgovernance.co.uk/shop/product/cyber-incident-response-management-foundation-training-course|
DV AOPH|Dark Vortex Adversary Operations and Proactive Hunting|$2500 exam|b|b|1|a|https://0xdarkvortex.dev/training-programs/adversary-operations-and-proactive-hunting/|
DV MILF|Dark Vortex Malware Incident and Log Foensics|$2000 exam|b|b|1|a|https://0xdarkvortex.dev/training-programs/malware-incident-and-log-forensics/|
ECSS|EC Council Certified Security Specialist|$249 exam|b|b|1|a|https://www.eccouncil.org/programs/certified-security-specialist-ecss/|
MESE|Mosse Institute Enterprise Security Engineer|$450 exam|b|b|1|a|https://www.mosse-institute.com/certifications/mese-certified-enterprise-security-engineer.html|
MICS|Mosse Institute Introductions to Cyber Security|Free exam|b|b|1|a|https://www.mosse-institute.com/certifications/mics-introduction-to-cyber-security.html|
OPSE|ISECOM OSSTMM Professional Security Expert|$100 annual sub|b|b|1|a|https://www.isecom.org/certification.html|
S-SA|SECO Associate SOC Analyst|$480 exam|b|b|1|a|https://www.seco-institute.org/get-trained/cyber-defense-track/associate-soc-analyst-certification/|
C)PEH|Mile2 Certified Professional Ethical Hacker|$550 exam|r|r|1|a|https://mile2.com/professional-ethical-hacker/|
C)VA|Mile2 Certified Vulnerability Assessor|$550 exam|r|r|1|a|https://www.mile2.com/vulnerability-assessor-outline/|
CHA|ISECOM Certified Hacker Analyst|$100 annual sub|r|r|1|a|https://www.isecom.org/certification.html|
EEHF|EXIN Ethical Hacking Foundation|$232 exam|r|r|1|a|https://www.exin.com/certifications/exin-ethical-hacking-foundation-exam|
GCPEH|GAQM Certified Professional Ethical Hacker|$170 exam|r|r|1|a|https://gaqm.org/certifications/information_systems_security/cpeh|
KLCP|Kali Linux Certified Professional|$299 exam|r|r|1|a|https://kali.training/klcp/|Kali Linux Certified Professional. Kali administration and tools.
MCPT|Mosse Institute Cloud Penetration Tester|$450 exam|r|r|1|a|https://www.mosse-institute.com/certifications/mcpt-cloud-penetration-tester.html|
S-EHF|SECO Ethical Hacking Foundation|$460 exam|r|r|1|a|https://www.seco-institute.org/certifications/ethical-hacking-certification-track/ethical-hacking-foundation/|
CSST|GAQM Certified Software Security Tester|$170 exam|s|e|1|a|https://gaqm.org/certifications/software_security_testing/csst|
MASE|Mosse Institute Certified Application Security Engineer|$450 exam|s|e|1|a|https://www.mosse-institute.com/certifications/mase-certified-application-security-engineer.html|
S-SPF|SECO Secure Programming Foundation|$460 exam|s|e|1|a|https://www.seco-institute.org/certifications/secure-software-certification-track/secure-programming-foundation/|
SOG CAP|SecOps Group Certified AppSec Practitioner|$249 exam|s|e|1|a|https://secops.group/product/certified-application-security-practitioner/|
NSE 3|Fortinet NSE 3|Retired|n|e|1|x|https://www.fortinet.com/training/certification|
NSE 4|Fortinet NSE 4|Retired|n|e|2|x|https://www.fortinet.com/training/certification|
NSE 5|Fortinet NSE 5|Retired|n|e|2|x|https://www.fortinet.com/training/certification|
NSE 6|Fortinet NSE 6|Retired|n|e|3|x|https://www.fortinet.com/training/certification|
NSE 7|Fortinet NSE 7|Retired|n|e|3|x|https://www.fortinet.com/training/certification|
NSE 8|Fortinet NSE 8|Retired|n|e|4|x|https://www.fortinet.com/training/certification|
OSCE|Offensive Security Certified Expert (Legacy)|Retired|r|r|4|x|https://www.offsec.com/|Retired. Replaced by OSCE3 triple certification.
ECSA|EC-Council Certified Security Analyst|Retired|r|r|3|x|https://www.eccouncil.org/|Retired EC-Council cert. Replaced by CPENT.
CCNA CyberOps|Cisco CCNA CyberOps|Retired - see CBROPS|b|b|2|x|https://www.cisco.com/|Retired Cisco cert. Replaced by CyberOps Associate (CBROPS 200-201).
HCISPP|ISC2 HealthCare Info Security & Privacy Practitioner|Retired|g|m|3|x|https://www.isc2.org/|Retired ISC2 healthcare privacy cert.
LFCE|Linux Foundation Certified Engineer|Retired|e|e|3|x|https://training.linuxfoundation.org/|
GSSP|GIAC Secure Software Programmer|Retired|s|e|3|x|https://www.giac.org/|
GCUX|GIAC Certified UNIX Security Administrator|Retired|e|e|3|x|https://www.giac.org/|
CCAr|Cisco Certified Architect|Retired|e|e|5|x|https://www.cisco.com/|
MTA|Microsoft Technology Associate|Retired|e|e|1|x|https://learn.microsoft.com/en-us/credentials/|Retired Microsoft Technology Associate. Replaced by fundamentals exams.
eCRE|INE Certified Reverse Engineer|Retired|b|b|3|x|https://ine.com/|
eCPTX|INE Certified Penetration Tester eXtreme|Retired|r|r|4|x|https://ine.com/|
eCMAP|INE Certified Malware Analysis Professional|Retired|b|b|3|x|https://ine.com/|
eWDP|INE Web Defense Professional|Retired|s|e|3|x|https://ine.com/|
eCXD|INE Certified Exploit Developer|Retired|r|r|4|x|https://ine.com/|
PCCSA|Palo Alto Cybersecurity Academy|Retired|n|e|1|x|https://www.paloaltonetworks.com/|
GPPA|GIAC Physical Penetration Analyst|Retired|r|r|3|x|https://www.giac.org/|
GEVA|GIAC Enterprise Vulnerability Assessor|Retired|b|b|2|x|https://www.giac.org/|
MCSA|Microsoft Certified Solutions Associate|Retired|e|e|2|x|https://learn.microsoft.com/en-us/credentials/|Retired Microsoft Certified Solutions Associate. Replaced by role-based certs.
CMMC RP|CMMC Registered Practitioner|~$500/yr|g|m|1|a|https://cyberab.org/catalog#702702702702702702702702702-702702702702702702702702|CMMC Registered Practitioner. Entry-level advisory for DIB contractors.
CMMC ARP|CMMC Advanced Registered Practitioner|~$500/yr + exam|g|m|2|a|https://cyberab.org/catalog|CMMC Advanced Registered Practitioner. Expanded L2 advisory.
CMMC CCP|CMMC Certified Professional (ISACA/CAICO)|~$1,500|t|m|2|a|https://cyberab.org/catalog|CMMC Certified Professional. Assessment foundation. Now managed by ISACA.
CMMC CCA|CMMC Certified Assessor|~$2,000|t|m|3|a|https://cyberab.org/catalog|CMMC Certified Assessor. Conducts formal L2 assessments for C3PAOs.
CMMC CCI|CMMC Certified Instructor|~$2,000|g|m|3|a|https://cyberab.org/catalog|CMMC Certified Instructor. Trains CCP/CCA candidates.SecAI+|CompTIA SecAI+ (CY0-001)|$359 exam|s|e|2|a|https://www.comptia.org/certifications/secai|CompTIA's vendor-neutral AI security cert. Launched Feb 2026. AI threat modeling, adversarial ML, governance.
CAISP|Certified AI Security Professional|$999 inc. training|s|e|3|a|https://www.youracclaim.com/|Hands-on practical exam: attack and defend real AI systems in production.
AIGP|IAPP Certified AI Governance Professional|~$400 exam|g|m|2|a|https://iapp.org/certify/aigp/|IAPP's AI governance cert. Accountability, transparency, bias, EU AI Act compliance.
GASAE|GIAC AI Security Automation Engineer|~$979 exam|b|b|3|a|https://www.giac.org/certifications/ai-security-automation-engineer-gasae|AI-powered detection systems, automated response, SOC efficiency. Technically intensive.
GOAA|GIAC Offensive AI Analyst|~$979 exam|r|r|3|a|https://www.giac.org/certifications/offensive-ai-analyst-goaa|Adversarial ML, model exploitation, automated attack generation.
GAIPS|GIAC AI Platform Security|~$979 exam|s|e|3|a|https://www.giac.org/certifications/ai-security-platform-security-gaips|LLM and GenAI application security. Audit AI pipelines. Available July 2026.
AAISM|ISACA AI Audit for Security Managers|~$395 exam|g|m|4|a|https://www.isaca.org/credentialing/ai-audit|Requires active CISM or CISSP. AI governance audit for security leaders.
AAIA|ISACA AI Audit for Internal Auditors|~$395 exam|t|m|3|a|https://www.isaca.org/credentialing/ai-audit|Requires active CISA, CIA, or CPA. AI systems audit methodology.
TAISE|CSA Trusted AI Security Engineer|$795 inc. training|e|e|2|a|https://www.cloudsecurityalliance.org/education/certificate-of-competence-in-trusted-ai-security-engineering|Cloud Security Alliance AI security cert. Secure AI in cloud environments.
AWS AIP|AWS AI Practitioner|$75 exam|e|e|1|a|https://aws.amazon.com/certification/certified-ai-practitioner/|AWS entry-level AI cert. ML concepts, responsible AI, AWS AI services.
AI-102|Microsoft Azure AI Engineer Associate|$165 exam|e|e|2|a|https://learn.microsoft.com/en-us/credentials/certifications/azure-ai-engineer/|Azure Cognitive Services, OpenAI Service, document intelligence, AI solutions.
Google MLE|Google Professional ML Engineer|$200 exam|e|e|3|a|https://cloud.google.com/learn/certification/machine-learning-engineer|GCP ML pipelines, model training, serving, monitoring. Vertex AI.
`;

const DN={n:"Network",i:"IAM",e:"Engineering",a:"Asset & Privacy",g:"Governance",t:"Assessment",s:"Software",b:"Blue Ops",r:"Red Ops"};
const DC={n:"#22c55e",i:"#ec4899",e:"#f97316",a:"#84cc16",g:"#f59e0b",t:"#a855f7",s:"#06b6d4",b:"#3b82f6",r:"#ef4444"};
// Optimal column order: max adjacent overlap for spanning
const DO=["n","e","s","r","b","t","g","i","a"];
const WN={e:"Engineering",m:"Management/GRC",b:"Defensive (Blue)",r:"Offensive (Red)"};
const WC={e:"#ea8c2a",m:"#6b7280",b:"#1d4ed8",r:"#dc2626"};
const TN={5:"Master",4:"Expert",3:"Pro",2:"Assoc",1:"Found"};
const TF={5:"Master",4:"Expert",3:"Professional",2:"Associate",1:"Foundational"};
const TC={5:"#a855f7",4:"#ef4444",3:"#f59e0b",2:"#84cc16",1:"#22c55e"};
const TY={5:"8+ yr",4:"5-8 yr",3:"2-5 yr",2:"0-2 yr",1:"0 yr"};

// Cross-domain cert mapping: abbr -> array of ALL domains it belongs to
const XD={"CISSP":["g","e","b","n","a","s","i","t"],"Security+":["g","b","n","e","r"],"SSCP":["g","b","e","n"],"CASP+":["g","e","b","r"],"GSE":["g","b","e","r"],"GSEC":["g","b","e"],"CISSP Concentrations":["g","e","b"],"CCSP":["e","g","a"],"CCISO":["g","t","b"],"OSCP":["r","t","n"],"PCSAE":["n","e","s"],"FCSS SASE":["n","i","e"],"CDPSE":["a","s","e"],"SecAI+":["s","b","g"],"CAISP":["s","r","b"],"CC":["g","b"],"CCNA":["n","e"],"CCNP Sec":["n","e"],"CCNP Ent":["n","e"],"CCIE Sec":["n","e"],"CCIE Ent":["n","e"],"PCCET":["n","e"],"PCNSA":["n","e"],"PCNSE":["n","e"],"FCA":["n","e"],"FCF":["n","e"],"FCP NS":["n","e"],"FCSS NS":["n","e"],"FCSS ZTA":["n","i"],"FCSS OT":["n","e"],"F5 CA":["n","e"],"F5 CTS APM":["n","i"],"CSA CCSK":["e","g"],"CSA CGC":["e","g"],"AZ-500":["e","b"],"SC-100":["e","g"],"SC-200":["b","e"],"SC-300":["i","e"],"SC-400":["a","e"],"AWS CSS":["e","g"],"Google PCSE":["e","g"],"CKS":["e","s"],"CKA":["e","s"],"CKAD":["e","s"],"CISA":["t","g"],"CRISC":["g","t"],"CISM":["g","t"],"CGRC":["g","t"],"CGEIT":["g","t"],"ISO 27001 LA":["t","g"],"PECB 27001LA":["t","g"],"APMG 27001A":["t","g"],"GSNA":["t","b"],"GMON":["t","b"],"PCI QSA":["t","g"],"IIA CIA":["t","g"],"CySA+":["b","t"],"GCIH":["b","r"],"GCIA":["b","t"],"GCED":["b","e"],"GCFA":["b","t"],"GREM":["b","r"],"GCTI":["b","t"],"CEH":["b","r"],"CHFI":["b","t"],"EnCE":["b","t"],"CCE":["b","t"],"CFCE":["b","t"],"GPEN":["r","t"],"GWAPT":["r","s"],"GXPN":["r","s"],"OSWE":["r","s"],"OSWA":["r","s"],"BSCP":["r","s"],"CPENT":["r","t"],"Pentest+":["r","t"],"HTB CPTS":["r","t"],"HTB CBBH":["r","s"],"CSSLP":["s","g"],"GWEB":["s","r"],"GMLE":["s","e"],"DevNet A":["s","n"],"DevNet Pro":["s","n"],"CIAM":["i","g"],"CIDPRO":["i","g"],"SC-900":["i","g"],"CIPP":["a","g"],"CIPT":["a","s"],"CMMC RP":["g","t"],"CMMC CCP":["g","t"],"CMMC CCA":["t","g"],"CMMC CCI":["g","t"],"AIGP":["g","s"],"GASAE":["b","s"],"GOAA":["r","s"],"GAIPS":["s","e"],"AAISM":["g","t"],"AAIA":["t","g"],"TAISE":["e","s"],"AI-102":["e","s"],"Google MLE":["e","s"],"GICSP":["e","n"],"GRID":["e","b"],"GCIP":["e","n"],"ISA CFS":["e","n"],"ISA CDS":["e","n"],"ISA CE":["e","g"],"ISA CRAS":["e","t"],"CSSA":["e","n"],"CIOTSP":["e","n"]};

const PW={
  soc:{l:"SOC Analyst",i:"Tier 1 alert triage through SOC manager",t:{1:[45,65],2:[65,90],3:[90,130],4:[130,160],5:[160,200]},c:["CC","Security+","CySA+","BTL1","SC-200","GCIH","GCIA","GCED","BTL2","GCFR","CISSP","GSE","GFACT","GSOC","ECIH","CND","CSX-F","OSDA","CCOA","CCD","HTB CDSA","SC-400","GIME","GCDA"]},
  pen:{l:"Penetration Tester",i:"Junior pentester through red team lead",t:{1:[50,66],2:[66,90],3:[90,130],4:[130,170],5:[170,220]},c:["eJPT","Security+","Net+","PNPT","OSCP","GPEN","CRTO","GWAPT","BSCP","OSEP","OSWE","OSED","GXPN","OSCE3","OSEE","Pentest+","HTB CPTS","HTB CBBH","eCPPT","eMAPT","eWPT","eWPTX","PJMR","GCPN","CPENT","LPT","CRTO II","GRTP","GX-PT","PACES","HTB CWEE","OSWP","OSMR","OSWA"]},
  arch:{l:"Security Architect",i:"Engineer to principal architect",t:{1:[60,75],2:[80,105],3:[110,155],4:[155,200],5:[195,260]},c:["AZ-900","AWS CP","Security+","CCNA","AZ-500","CCSP","CCNP Sec","SC-100","TOGAF","CISSP","SABSA SCM","CCIE Sec","SABSA SCF","SABSA SCP","AZ-305","Cloud+","RHCA","VCDX DCV","GSE","CSA CCSK","Google PCSE"]},
  grc:{l:"GRC / Compliance",i:"Compliance analyst to GRC director",t:{1:[48,63],2:[65,88],3:[88,135],4:[135,170],5:[170,220]},c:["CC","Security+","CGRC","SSCP","CISA","CRISC","CISM","CISSP","CCISO","CGEIT","ITIL Master","ITIL Fdn","ITIL MP","PMP","CAPM","Project+","GSEC","GSLC","GSTRT","GISP","CASP+","PSM I","PECB 27001F","PECB 27001LI","PECB 27001LA","APMG 27001F","CCOA","CSX-P","CMMC RP","CMMC CCP","CMMC CCA"]},
  cloud:{l:"Cloud Security",i:"Cloud associate to cloud architect",t:{1:[58,75],2:[78,105],3:[105,155],4:[150,200],5:[190,240]},c:["AZ-900","AWS CP","Google ACE","Security+","AZ-104","AWS SAA","Cloud+","CSA CCSK","AZ-500","AWS CSS","Google PCSE","CCSP","CKS","SC-100","AZ-305","AWS SAP","CISSP","GCLD","GCSA","CKA","CKAD","KCNA","DCA"]},
  dfir:{l:"DFIR",i:"Junior analyst to DFIR lead",t:{1:[50,68],2:[68,92],3:[92,135],4:[135,170],5:[170,210]},c:["Security+","CySA+","GCFE","ECIH","GCIH","GCFA","GASF","EnCE","CHFI","GCFR","GREM","GEIR","GX-FA","GSE","eCDFP","eCIR","GBFA","GNFA","CCE","CFCE","MDFIR"]},
  appsec:{l:"AppSec / DevSecOps",i:"Developer to AppSec principal",t:{1:[60,78],2:[78,108],3:[108,150],4:[148,190],5:[185,230]},c:["Security+","CASE","DevNet A","CSSLP","GWEB","OSWA","BSCP","OSWE","DevNet Pro","CCSC","SOG CAP","PDSO CDP","PDSO CDE","MASE","GMLE"]},
  mgr:{l:"Security Manager / CISO",i:"Junior manager to CISO",t:{1:[52,68],2:[70,100],3:[105,155],4:[155,240],5:[240,420]},c:["CC","Security+","SSCP","CISSP","CISM","PMP","CGRC","CCISO","CGEIT","CRISC","ITIL MP","ITIL Master","GSLC","GSTRT","S-CISO","GSE","CASP+","GSEC","PgMP","CMMC CCA"]},
  dod:{l:"DoD 8140 / CMMC",i:"IAT-I through IAM-III + CMMC",t:{1:[50,72],2:[75,108],3:[105,145],4:[140,175],5:[170,210]},c:["CC","Security+","CCNA","CySA+","GSEC","SSCP","CASP+","CISSP","GCIH","GCED","CISM","CGRC","GSLC","CCISO","CMMC RP","CMMC CCP","CMMC CCA"]},
  ti:{l:"Threat Intelligence",i:"CTI analyst to intel program lead",t:{1:[48,65],2:[65,88],3:[88,130],4:[128,165],5:[160,200]},c:["CC","Security+","CySA+","GCTI","GCIH","GCIA","GOSI","CTIA","GCDA","CISSP","GSE","GFACT","MAD CTI","MAD SOCA","eCTHP"]},
  deteng:{l:"Detection / Security Engineer",i:"SOC engineer to staff detection eng",t:{1:[55,72],2:[72,100],3:[100,145],4:[142,185],5:[180,230]},c:["Security+","CySA+","SC-200","GCIH","GCED","GMON","GCDA","GSOC","BTL1","BTL2","GCIA","GNFA","CISSP","GSE","GIME","OSDA","CCD"]},
  mal:{l:"Malware / Reverse Engineering",i:"Junior analyst to principal RE",t:{1:[52,68],2:[68,95],3:[95,140],4:[138,180],5:[175,225]},c:["Security+","CySA+","GCFE","GREM","GCFA","GCFR","GX-FA","GCIH","GNFA","GSE","CHFI","eCDFP","PJMR","GBFA"]},
  ot:{l:"OT / ICS Security",i:"ICS analyst to OT security architect",t:{1:[55,72],2:[72,100],3:[100,145],4:[140,180],5:[175,220]},c:["Security+","GICSP","GRID","GCIP","ISA CFS","ISA CDS","ISA CE","ISA CRAS","FCSS OT","CSSA","CISSP","GSE","GFACT","CySA+"]},
  iam:{l:"Identity & Access Mgmt",i:"IAM analyst to IAM architect",t:{1:[52,70],2:[70,98],3:[98,140],4:[138,178],5:[175,215]},c:["SC-900","SC-300","CIAM","CIDPRO","CIGE","CIST","FCSS SASE","FCSS ZTA","SF CIAMD","CAMS","CISSP","CCSP","Security+"]},
  ai:{l:"AI Security",i:"AI/ML engineer to AI security architect",t:{1:[58,78],2:[78,110],3:[108,158],4:[155,210],5:[200,280]},c:["AWS AIP","SecAI+","GMLE","AIGP","TAISE","AI-102","CAISP","GASAE","GOAA","GAIPS","AAIA","Google MLE","AAISM","CISSP","GSE","Security+","CySA+"]},
};

const CL=[
  {id:"none",l:"None (Commercial)",m:1.00,c:"#64748b"},
  {id:"pt",l:"Public Trust",m:1.04,c:"#94a3b8"},
  {id:"conf",l:"Confidential",m:1.06,c:"#a3e635"},
  {id:"sec",l:"Secret",m:1.12,c:"#facc15"},
  {id:"ts",l:"Top Secret",m:1.20,c:"#fb923c"},
  {id:"sci",l:"TS/SCI",m:1.30,c:"#f87171"},
  {id:"ci",l:"TS/SCI + CI Poly",m:1.35,c:"#e879f9"},
  {id:"fsp",l:"TS/SCI + Full Scope Poly",m:1.47,c:"#c084fc"},
];
const DG=[
  {id:"none",l:"No Degree",m:0.90},{id:"as",l:"Associate's",m:0.95},
  {id:"bao",l:"Bachelor's (unrelated)",m:0.97},{id:"ba",l:"Bachelor's (CS/IT/Cyber)",m:1.00},
  {id:"ms",l:"Master's (Cyber/CS)",m:1.12},{id:"mba",l:"MBA + Cyber",m:1.14},{id:"phd",l:"PhD",m:1.17},
];
const EX=[
  {id:"0",l:"< 1 year",m:0.80},{id:"1",l:"1-3 years",m:0.92},{id:"3",l:"3-5 years",m:1.00},
  {id:"5",l:"5-8 years",m:1.10},{id:"8",l:"8-12 years",m:1.22},{id:"12",l:"12-15 years",m:1.32},
  {id:"15",l:"15-20 years",m:1.40},{id:"20",l:"20+ years",m:1.50},
];

const SOURCES = [
  {n:"ISC2 2025 Workforce Study",u:"https://www.isc2.org/Insights/2025/12/2025-ISC2-Cybersecurity-Workforce-Study",d:"16,029 respondents. US median $150K."},
  {n:"BLS OOH Info Sec Analysts",u:"https://www.bls.gov/ooh/computer-and-information-technology/information-security-analysts.htm",d:"Median $120,360. 33% growth 2023-2033."},
  {n:"Glassdoor 2026",u:"https://www.glassdoor.com/Salaries/",d:"Pen tester: $154K. CISO: $262-289K avg."},
  {n:"ZipRecruiter May 2026",u:"https://www.ziprecruiter.com/Salaries/",d:"Sr pen tester: $120K. TS/SCI cyber: $132K avg."},
  {n:"ClearanceJobs 2025-2026",u:"https://news.clearancejobs.com/",d:"IC-supporting: $165K avg. Clearance compensation survey."},
  {n:"FullScope Staffing 2026",u:"https://finance.yahoo.com/news/ts-sci-salary-surge-expected-180600721.html",d:"FSP as defining salary multiplier."},
  {n:"KORE1 SOC Guide 2026",u:"https://www.kore1.com/soc-analyst-career-path-salary-guide/",d:"Tier 1: $50-80K. Tier 3: $90-140K+."},
  {n:"Cybersecurity Ventures CISO Report 2026",u:"https://cybersecurityventures.com/2026-ciso-salary-and-compensation-data/",d:"CISO median $321-385K. Enterprise $500K+."},
  {n:"StationX PenTest Guide 2026",u:"https://www.stationx.net/how-much-do-penetration-testers-make/",d:"Mid: $117K. Senior: $140K. $200K+ possible."},
  {n:"CyberSecJobs Cleared Guide 2026",u:"https://cybersecjobs.com/cybersecurity-salary-guide/",d:"Cleared 20-40% above commercial. FSP +$45-65K/yr."},
  {n:"PayScale 2026",u:"https://www.payscale.com/",d:"Jr SOC: $61K avg. Pen tester: $102K avg."},
  {n:"StationX AI Cert Rankings 2026",u:"https://app.stationx.net/articles/best-ai-security-certifications",d:"AI security jobs +412% since 2024. 68% orgs hiring AI security."},
];

const MOD_CAP = 2.2;

const ALL = RAW.trim().split("\n").map(ln => {
  const p = ln.split("|");
  return { a:p[0], n:p[1], p:p[2], d:p[3], w:p[4], t:Number(p[5]), s:p[6]==="x"?"retired":"active", u:p[7]||"", b:p[8]||"", xd:null };
});
// Attach cross-domain data
ALL.forEach(c => { if (XD[c.a]) c.xd = XD[c.a]; });
const SD={"AAIA":"Audit","AAISM":"Audit","ACE":"Forensics","AI-102":"AI/ML","AIGP":"Privacy","APMG 27001A":"Audit","APMG 27001F":"Compliance","APMG 27001P":"Compliance","ASIS APP":"Physical","ASIS CPP":"Physical","AWS AIP":"AI/ML","AWS CP":"Cloud","AWS CSS":"Cloud","AWS SAA":"Cloud","AWS SAP":"Cloud","AZ-104":"Cloud","AZ-220":"Cloud","AZ-305":"Cloud","AZ-500":"Cloud","AZ-900":"Cloud","Apple ACSP":"*nix","BCS FISMP":"GRC","BCS PCIAA":"GRC","BCS PCIRM":"GRC","BSCP":"AppSec","BTL1":"Detection/SOC","BTL2":"Detection/SOC","C)ISSM":"GRC","C)ISSO":"GRC","C)PEH":"Pen Testing","C)PTE":"Pen Testing","C)SWAE":"AppSec","C)VA":"Pen Testing","CAISP":"AI/ML","CAMS":"Access Mgmt","CAPM":"Project Mgmt","CASE":"AppSec","CASP+":"Foundations","CASST":"AppSec","CC":"Foundations","CCD":"Detection/SOC","CCE":"Forensics","CCFE":"Forensics","CCIE Ent":"Routing/Switching","CCIE Sec":"Firewall/VPN","CCISO":"GRC","CCNA":"Routing/Switching","CCNP Ent":"Routing/Switching","CCNP Sec":"Firewall/VPN","CCOA":"Frameworks","CCSC":"DevSecOps","CCSE":"Firewall/VPN","CCSP":"Cloud","CCT":"Routing/Switching","CDP":"Data Protection","CDPSE":"Privacy","CFA":"Forensics","CFCE":"Forensics","CFR":"Incident Response","CFSR":"Forensics","CGEIT":"GRC","CGRC":"GRC","CHFI":"Forensics","CIAM":"Identity","CIDPRO":"Identity","CIGE":"Identity","CIISec ICSF":"GRC","CIMP":"Access Mgmt","CIOTSP":"ICS/IoT","CIPA":"Data Protection","CIPP":"Privacy","CIPT":"Privacy","CISA":"Audit","CISM":"GRC","CISP":"GRC","CISRM":"GRC","CISSM":"GRC","CIST":"Identity","CITGP":"GRC","CKA":"Containers","CKAD":"Containers","CKS":"Containers","CLCSM":"Cloud","CM)ISSO":"GRC","CMMC ARP":"Frameworks","CMMC CCA":"Compliance","CMMC CCI":"Frameworks","CMMC CCP":"Compliance","CMMC RP":"Frameworks","CND":"Detection/SOC","CPENT":"Pen Testing","CREST CCSAS":"Red Team","CREST CPSA":"Pen Testing","CREST CRT":"Pen Testing","CREST CSAM":"Red Team","CRFS":"Data Protection","CRISC":"GRC","CRTO":"Red Team","CRTO II":"Red Team","CSA":"Detection/SOC","CSA CCSK":"Cloud","CSA CGC":"Cloud","CSFA":"Forensics","CSSA":"ICS/IoT","CSSLP":"AppSec","CSST":"AppSec","CSTL":"Red Team","CSTM":"Red Team","CSX-F":"Frameworks","CSX-P":"Frameworks","CTIA":"Threat Intel","CTPRA":"GRC","CTPRP":"GRC","CWAP":"Wireless","CWDP":"Wireless","CWNA":"Wireless","CWNE":"Wireless","CWSP":"Wireless","Cloud Essnt":"Cloud","Cloud+":"Cloud","CySA+":"Detection/SOC","DCA":"Containers","DCPP":"Data Protection","DevNet A":"DevSecOps","DevNet Pro":"DevSecOps","ECES":"Exploitation","ECIH":"Incident Response","ECSS":"Detection/SOC","EDRP":"Incident Response","EPDPE":"Privacy","EPDPF":"Privacy","EPDPP":"Privacy","EXIN 27001E":"Compliance","EXIN 27001F":"Compliance","EXIN 27001P":"Compliance","EnCE":"Forensics","F5 CA":"Firewall/VPN","F5 CTS APM":"Firewall/VPN","F5 CTS ASM":"Firewall/VPN","FCA":"Firewall/VPN","FCF":"Firewall/VPN","FCP NS":"Firewall/VPN","FCP PCS":"ICS/IoT","FCSS NS":"Firewall/VPN","FCSS OT":"ICS/IoT","FCSS PCS":"ICS/IoT","FCSS SASE":"Zero Trust","FCSS ZTA":"Zero Trust","Fair Fdn":"Risk","GAIPS":"AI/ML","GASAE":"AI/ML","GASF":"Forensics","GBFA":"Forensics","GCCC":"Compliance","GCDA":"Detection/SOC","GCED":"Detection/SOC","GCFA":"Forensics","GCFE":"Forensics","GCFR":"Forensics","GCIA":"Detection/SOC","GCIH":"Incident Response","GCIP":"ICS/IoT","GCLD":"Cloud","GCPEH":"Pen Testing","GCPN":"Pen Testing","GCPT":"Red Team","GCSA":"Cloud","GCTI":"Threat Intel","GCWN":"Windows","GDAT":"ICS/IoT","GEIR":"Incident Response","GFACT":"Foundations","GICSP":"ICS/IoT","GIME":"Incident Response","GISP":"GRC","GLEG":"GRC","GMLE":"AI/ML","GMOB":"Mobile","GMON":"Detection/SOC","GNFA":"Network Analysis","GOAA":"AI/ML","GOSI":"Threat Intel","GPCS":"Cloud","GPEN":"Pen Testing","GREM":"Malware/RE","GRID":"ICS/IoT","GRTP":"Exploitation","GSEC":"Foundations","GSLC":"GRC","GSNA":"Audit","GSOC":"Detection/SOC","GSTRT":"GRC","GWAPT":"Web App","GWEB":"AppSec","GX-FA":"Forensics","GX-PT":"Exploitation","GXPN":"Exploitation","Google ACE":"Cloud","Google MLE":"AI/ML","Google PCSA":"Cloud","Google PCSE":"Cloud","HTB CBBH":"Web App","HTB CDSA":"Detection/SOC","HTB CPTS":"Pen Testing","HTB CWEE":"Web App","IIA CIA":"Audit","ISA CAP":"ICS/IoT","ISA CDS":"ICS/IoT","ISA CE":"ICS/IoT","ISA CFS":"ICS/IoT","ISA CRAS":"ICS/IoT","ISMI CSM":"GRC","ISMI CSMP":"GRC","ISO 27001 LA":"Audit","ITIL Fdn":"Frameworks","ITIL MP":"Frameworks","ITIL Master":"Frameworks","ITIL SL":"Frameworks","JNCIA Sec":"Routing/Switching","JNCIE Sec":"Routing/Switching","JNCIP Sec":"Routing/Switching","JNCIS Sec":"Routing/Switching","KCNA":"Containers","KLCP":"Pen Testing","LFCA":"*nix","LFCS":"*nix","LPIC-1":"*nix","LPIC-2":"*nix","LPIC-3":"*nix","LPT":"Pen Testing","Linux+":"*nix","MAD CTI":"Threat Intel","MAD SOCA":"Detection/SOC","MASE":"AppSec","MCD":"Red Team","MCPT":"Pen Testing","MCSE":"Windows","MCSF":"Windows","MDFIR":"Forensics","MPT":"Pen Testing","MRCI":"Incident Response","MRE":"Exploitation","MRT":"Red Team","MS-100":"Windows","MVRE":"Exploitation","M_o_R Fdn":"Risk","M_o_R P":"Risk","NCSC CCPLP":"GRC","NCSC CCPP":"GRC","NCSC CCPSP":"GRC","OPST":"Pen Testing","OSCE3":"Exploitation","OSCP":"Pen Testing","OSDA":"Detection/SOC","OSED":"Exploitation","OSEE":"Exploitation","OSEP":"Exploitation","OSMR":"Mobile","OSWA":"Web App","OSWE":"Web App","OSWP":"Wireless","PACES":"Exploitation","PCCET":"Firewall/VPN","PCI QSA":"Audit","PCNSA":"Firewall/VPN","PCNSE":"Firewall/VPN","PCSAE":"Firewall/VPN","PDSO CDE":"DevSecOps","PDSO CDP":"DevSecOps","PECB 27001F":"Compliance","PECB 27001LA":"Audit","PECB 27001LI":"Compliance","PJMR":"Pen Testing","PMI ACP":"Project Mgmt","PMP":"Project Mgmt","PNPT":"Pen Testing","PSM I":"Project Mgmt","PSM II":"Project Mgmt","PSM III":"Project Mgmt","Pentest+":"Pen Testing","PgMP":"Project Mgmt","Project+":"Project Mgmt","RHCA":"*nix","RHCE":"*nix","RHCSA":"*nix","S-CEHL":"Red Team","S-CISO":"GRC","S-CSPL":"AppSec","S-EHE":"Red Team","S-EHF":"Red Team","S-EHP":"Red Team","S-ISF":"GRC","S-ISME":"GRC","S-ISP":"GRC","S-SPF":"AppSec","SABSA SCF":"Architecture","SABSA SCM":"Architecture","SABSA SCP":"Architecture","SC-100":"Cloud","SC-200":"Detection/SOC","SC-300":"Identity","SC-400":"Detection/SOC","SC-900":"Identity","SF CIAMD":"Identity","SOG CAP":"AppSec","SOG CAPen":"Pen Testing","SOG CAPenX":"Pen Testing","SOG CCSP-AWS":"Cloud","SOG CMPen And":"Mobile","SOG CMPen iOS":"Mobile","SOG CNPen":"Web App","SSCP":"Foundations","Scrum PAL":"Project Mgmt","Scrum PSD":"Project Mgmt","Scrum SPS":"Project Mgmt","SecAI+":"AI/ML","Security+":"Foundations","Server+":"Windows","TAISE":"AI/ML","TOGAF":"Architecture","TOGAF Fdn":"Architecture","TUV Auditor":"Audit","TUV COSM":"ICS/IoT","TUV COSP":"ICS/IoT","TUV COSTE":"ICS/IoT","TUV COTCP":"ICS/IoT","TUV CySec":"Audit","TUV MSA":"Audit","VCDX DCV":"Virtualization","VCIX DCV":"Virtualization","VCIX NV":"Virtualization","VCP DCV":"Virtualization","VCP NV":"Virtualization","WCNA":"Network Analysis","eCDFP":"Forensics","eCIR":"Incident Response","eCMAP":"Malware/RE","eCPPT":"Pen Testing","eCPTX":"Exploitation","eCRE":"Malware/RE","eCTHP":"Threat Intel","eCXD":"Exploitation","eJPT":"Pen Testing","eMAPT":"Mobile","eWPT":"Web App","eWPTX":"Web App"};
ALL.forEach(c => { c.sd = SD[c.a] || null; });

export default function App() {
  const [tab, setTab] = useState("browse");
  const [my, setMy] = useState(new Set());
  const [search, setSearch] = useState("");
  const [fDom, setFDom] = useState("all");
  const [fStat, setFStat] = useState("active");
  const [fPath, setFPath] = useState("none");
  const [sel, setSel] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [sPw, setSPw] = useState("soc");
  const [sTier, setSTier] = useState(3);
  const [sCl, setSCl] = useState("none");
  const [sDg, setSDg] = useState("ba");
  const [sEx, setSEx] = useState("3");
  const [viewMode, setViewMode] = useState("heat");

  useEffect(() => { (async () => { try { const r = await window.storage.get("my_certs_v6"); if (r && r.value) setMy(new Set(JSON.parse(r.value))); } catch(e){} setLoaded(true); })(); }, []);
  useEffect(() => { if (!loaded) return; (async () => { try { await window.storage.set("my_certs_v6", JSON.stringify([...my])); } catch(e){} })(); }, [my, loaded]);

  const tog = useCallback((a) => setMy(prev => { const n = new Set(prev); n.has(a)?n.delete(a):n.add(a); return n; }), []);
  const certPaths = useCallback((a) => Object.entries(PW).filter(([,v]) => v.c.includes(a)).map(([,v]) => v.l), []);
  const salRange = useCallback((a) => { const c = ALL.find(x => x.a === a); if (!c) return null; const ps = Object.entries(PW).filter(([,v]) => v.c.includes(a)); if (!ps.length) return null; const rs = ps.map(([,v]) => v.t[c.t]).filter(Boolean); if (!rs.length) return null; return [Math.min(...rs.map(r=>r[0])), Math.max(...rs.map(r=>r[1]))]; }, []);
  const pctColor = (p) => p > 70 ? "#22c55e" : p > 30 ? "#f59e0b" : "#ef4444";

  const filtered = useMemo(() => {
    let c = ALL.slice();
    if (fStat === "active") c = c.filter(x => x.s === "active");
    else if (fStat === "retired") c = c.filter(x => x.s === "retired");
    if (fDom !== "all") c = c.filter(x => x.d === fDom || (x.xd && x.xd.includes(fDom)));
    if (search) { const q = search.toLowerCase(); c = c.filter(x => x.a.toLowerCase().includes(q) || x.n.toLowerCase().includes(q)); }
    const ps = fPath !== "none" && PW[fPath] ? new Set(PW[fPath].c) : null;
    return c.map(x => ({ ...x, inP: !ps || ps.has(x.a) }));
  }, [fDom, fStat, search, fPath]);

  const pprog = useMemo(() => { if (fPath === "none" || !PW[fPath]) return null; const pc = PW[fPath].c; const ow = pc.filter(a => my.has(a)); return { total: pc.length, owned: ow.length, pct: Math.round(ow.length / pc.length * 100) }; }, [fPath, my]);
  const myList = useMemo(() => ALL.filter(c => my.has(c.a)).sort((a, b) => b.t - a.t || a.a.localeCompare(b.a)), [my]);

  const calc = useMemo(() => {
    const pw = PW[sPw]; const base = pw.t[sTier]; const cl = CL.find(c => c.id === sCl); const dg = DG.find(d => d.id === sDg); const ex = EX.find(e => e.id === sEx);
    const bm = Math.round((base[0]+base[1])/2); const rawMult = cl.m*dg.m*ex.m; const cappedMult = Math.min(rawMult,MOD_CAP);
    const lo = Math.round(base[0]*cappedMult); const hi = Math.round(base[1]*cappedMult);
    return { lo, hi, mid: Math.round((lo+hi)/2), base, bm, cl, dg, ex, rawMult, cappedMult, capped: rawMult > MOD_CAP };
  }, [sPw, sTier, sCl, sDg, sEx]);

  const Dd = ({v,onChange,opts}) => (<select value={v} onChange={e=>onChange(e.target.value)} style={ss.sel}>{opts.map(([k,l])=><option key={k} value={k}>{l}</option>)}</select>);



  const Tile = ({c}) => {
    const owned = my.has(c.a); const isSel = sel === c.a;
    const doms = c.xd || [c.d];
    const isMulti = doms.length > 1;
    const isCore = doms.length >= 4;
    return (<div onClick={() => setSel(isSel ? null : c.a)} style={{
      background: c.s==="retired" ? "#1f2937" : isCore ? "linear-gradient(135deg, " + DC[c.d] + ", #4338ca)" : (DC[c.d]||"#444"),
      opacity: c.inP===false ? 0.08 : c.s==="retired" ? 0.4 : 1,
      color:"#fff", padding:"4px 8px", borderRadius:4, cursor:"pointer",
      fontSize: 11, fontWeight:700,
      display:"inline-flex", alignItems:"center", gap: 3, position:"relative",
      border: owned ? "2px solid #fbbf24" : isSel ? "2px solid #fff" : isCore ? "1px solid rgba(255,255,255,0.25)" : "1px solid rgba(255,255,255,0.08)",
      borderStyle: c.s==="retired" ? "dashed" : "solid", transition:"opacity 0.15s",
      lineHeight:1.2,
    }}>
      {c.a}
      {isMulti && <span style={{display:"flex",gap:1,marginLeft:1}}>{doms.filter(d=>d!==c.d).slice(0,3).map(d=><span key={d} style={{width:6,height:6,borderRadius:6,background:DC[d],border:"1px solid rgba(0,0,0,0.3)"}} title={DN[d]}/>)}</span>}
      {owned && <span style={{position:"absolute",top:-5,right:-5,background:"#fbbf24",color:"#000",borderRadius:10,width:14,height:14,fontSize:8,display:"flex",alignItems:"center",justifyContent:"center",fontWeight:900}}>&#10003;</span>}
    </div>);
  };

  // Visible domains
  const visDom = fDom === "all" ? DO : [fDom];

  // Get sub-domains for a given domain from certs in that cell
  const getSubDomains = useCallback((domainCerts) => {
    const subs = {};
    const ungrouped = [];
    domainCerts.forEach(c => {
      if (c.sd) {
        if (!subs[c.sd]) subs[c.sd] = [];
        subs[c.sd].push(c);
      } else {
        ungrouped.push(c);
      }
    });
    return { subs, ungrouped, keys: Object.keys(subs).sort() };
  }, []);

  // Grid view - with sub-column expansion for single domain
  const renderTierGrid = (tier) => {
    const tierCerts = filtered.filter(c => c.t === tier);
    if (!tierCerts.length) return null;

    const cells = {};
    visDom.forEach(d => { cells[d] = []; });
    tierCerts.forEach(c => {
      const doms = c.xd || [c.d];
      if (visDom.includes(c.d)) { cells[c.d].push(c); }
      else { const alt = visDom.find(d => doms.includes(d)); if (alt) cells[alt].push(c); }
    });

    // Single domain mode: expand into sub-domain columns
    if (visDom.length === 1) {
      const d = visDom[0];
      const { subs, ungrouped, keys } = getSubDomains(cells[d]);
      const allKeys = ungrouped.length > 0 ? [...keys, "_other"] : keys;
      if (allKeys.length <= 1) {
        // Only one sub-domain, render flat
        return (
          <div key={tier} style={{ display: "flex", marginBottom: 1 }}>
            <div style={{ ...ss.tierLbl, borderRightColor: TC[tier] }}>
              <span style={{ color: TC[tier], fontWeight: 800, fontSize: 13 }}>{TN[tier]}</span>
              <span style={{ color: "#94a3b8", fontSize: 9 }}>{TY[tier]}</span>
            </div>
            <div style={{ flex: 1, padding: 4, borderBottom: "1px solid #1e293b", display: "flex", flexWrap: "wrap", gap: 3, alignContent: "flex-start" }}>
              {cells[d].map(c => <Tile key={c.a} c={c} />)}
            </div>
          </div>
        );
      }
      return (
        <div key={tier} style={{ display: "flex", marginBottom: 1 }}>
          <div style={{ ...ss.tierLbl, borderRightColor: TC[tier] }}>
            <span style={{ color: TC[tier], fontWeight: 800, fontSize: 13 }}>{TN[tier]}</span>
            <span style={{ color: "#94a3b8", fontSize: 9 }}>{TY[tier]}</span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: allKeys.map(() => "1fr").join(" "), gap: 0, flex: 1 }}>
            {allKeys.map(sk => {
              const subCerts = sk === "_other" ? ungrouped : (subs[sk] || []);
              return (
                <div key={sk} style={{ padding: 4, borderBottom: "1px solid #1e293b", borderRight: "1px solid #1e293b22", minHeight: 30, display: "flex", flexWrap: "wrap", gap: 3, alignContent: "flex-start" }}>
                  {subCerts.map(c => <Tile key={c.a} c={c} />)}
                </div>
              );
            })}
          </div>
        </div>
      );
    }

    // Multi-domain mode: sub-domain labels within cells
    return (
      <div key={tier} style={{ display: "flex", marginBottom: 1 }}>
        <div style={{ ...ss.tierLbl, borderRightColor: TC[tier] }}>
          <span style={{ color: TC[tier], fontWeight: 800, fontSize: 13 }}>{TN[tier]}</span>
          <span style={{ color: "#94a3b8", fontSize: 9 }}>{TY[tier]}</span>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: visDom.map(() => "1fr").join(" "), gap: 0, flex: 1 }}>
          {visDom.map(d => {
            const { subs, ungrouped, keys } = getSubDomains(cells[d]);
            const hasGroups = keys.length > 1 || (keys.length === 1 && ungrouped.length > 0);
            return (
              <div key={d} style={{ padding: 3, borderBottom: "1px solid #1e293b", borderRight: "1px solid #1e293b", minHeight: 32 }}>
                {hasGroups ? (
                  <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                    {keys.map(sd => (
                      <div key={sd}>
                        <div style={{ fontSize: 7, color: DC[d], opacity: 0.7, fontWeight: 700, letterSpacing: 0.3, textTransform: "uppercase", marginBottom: 1, paddingLeft: 1 }}>{sd}</div>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: 3 }}>{subs[sd].map(c => <Tile key={c.a} c={c} />)}</div>
                      </div>
                    ))}
                    {ungrouped.length > 0 && <div style={{ display: "flex", flexWrap: "wrap", gap: 3 }}>{ungrouped.map(c => <Tile key={c.a} c={c} />)}</div>}
                  </div>
                ) : (
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 3, alignContent: "flex-start" }}>{cells[d].map(c => <Tile key={c.a} c={c} />)}</div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  };


  // Heatmap / treemap view
  const renderHeatmap = () => {
    const certs = filtered;
    const singleDomain = visDom.length === 1 ? visDom[0] : null;

    // Group by domain, then sub-domain
    const tree = {};
    (singleDomain ? [singleDomain] : DO).forEach(d => { tree[d] = { total: 0, subs: {} }; });
    certs.forEach(c => {
      const d = singleDomain || c.d;
      if (!tree[d]) return;
      tree[d].total++;
      const sd = c.sd || "General";
      if (!tree[d].subs[sd]) tree[d].subs[sd] = [];
      tree[d].subs[sd].push(c);
    });

    const renderCertTile = (c, d) => {
      const owned = my.has(c.a);
      const isSel = sel === c.a;
      const paths = Object.values(PW).filter(p => p.c.includes(c.a)).length;
      const scale = singleDomain ? (paths >= 5 ? 1.5 : paths >= 3 ? 1.25 : 1.1) : (paths >= 5 ? 1.4 : paths >= 3 ? 1.15 : 1);
      const tierAlpha = [0, 0.35, 0.5, 0.7, 0.85, 1.0][c.t];
      const tierGlow = c.t >= 4 ? "0 0 8px " + DC[d] + "66" : "none";
      const fs = singleDomain ? Math.round(11 * scale) : Math.round(9 * scale);
      const pd = singleDomain ? Math.round(4 * scale) + "px " + Math.round(8 * scale) + "px" : Math.round(3 * scale) + "px " + Math.round(6 * scale) + "px";
      return (
        <div key={c.a} onClick={() => setSel(isSel ? null : c.a)} title={c.n + " (" + TF[c.t] + ")"} style={{
          background: DC[d], opacity: c.inP === false ? 0.05 : tierAlpha,
          color: "#fff", padding: pd, borderRadius: 4, cursor: "pointer",
          fontSize: fs, fontWeight: 700, lineHeight: 1.2,
          border: owned ? "2px solid #fbbf24" : isSel ? "2px solid #fff" : "1px solid " + DC[d] + "44",
          position: "relative", boxShadow: tierGlow, transition: "opacity 0.15s",
        }}>
          {c.a}
          {c.t >= 4 && <span style={{ position: "absolute", top: -1, left: 2, fontSize: 5, color: TC[c.t], fontWeight: 900 }}>{c.t === 5 ? "★" : "◆"}</span>}
          {owned && <span style={{ position: "absolute", top: -4, right: -4, background: "#fbbf24", color: "#000", borderRadius: 8, width: 12, height: 12, fontSize: 7, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900 }}>&#10003;</span>}
        </div>
      );
    };

    const renderSubBox = (d, sk, subCerts, expanded) => {
      const sorted = subCerts.sort((a, b) => b.t - a.t);
      return (
        <div key={sk} style={{
          flex: Math.max(subCerts.length, expanded ? 4 : 2) + " 1 0%",
          minWidth: expanded ? 140 : 60, background: DC[d] + "08", borderRadius: expanded ? 6 : 3,
          padding: expanded ? 6 : 2, border: "1px solid " + DC[d] + (expanded ? "33" : "15"),
        }}>
          <div style={{
            fontSize: expanded ? 10 : 6, color: DC[d], opacity: expanded ? 0.9 : 0.6,
            fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.3,
            paddingLeft: 2, marginBottom: expanded ? 4 : 1,
          }}>
            {sk} <span style={{ opacity: 0.5, fontWeight: 400 }}>({subCerts.length})</span>
          </div>
          {expanded && (
            <div style={{ display: "flex", gap: 2, marginBottom: 4, flexWrap: "wrap" }}>
              {[5,4,3,2,1].map(t => {
                const cnt = sorted.filter(c => c.t === t).length;
                if (!cnt) return null;
                return <span key={t} style={{ fontSize: 7, color: TC[t], opacity: 0.6 }}>{TF[t]}: {cnt}</span>;
              })}
            </div>
          )}
          <div style={{ display: "flex", flexWrap: "wrap", gap: expanded ? 3 : 2 }}>
            {sorted.map(c => renderCertTile(c, d))}
          </div>
        </div>
      );
    };

    // Single domain: expanded heatmap with large sub-domain boxes
    if (singleDomain) {
      const d = singleDomain;
      const dom = tree[d];
      if (!dom || dom.total === 0) return <div style={ss.empty}>No certs match filters</div>;
      const subKeys = Object.keys(dom.subs).sort((a, b) => dom.subs[b].length - dom.subs[a].length);
      return (
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8, padding: "6px 0" }}>
            <button onClick={() => setFDom("all")} style={{ padding: "4px 10px", borderRadius: 5, border: "1px solid #334155", background: "#1e293b", color: "#94a3b8", cursor: "pointer", fontSize: 11, fontWeight: 600 }}>&larr; All Domains</button>
            <span style={{ fontSize: 18, fontWeight: 900, color: DC[d] }}>{DN[d]}</span>
            <span style={{ fontSize: 12, color: "#94a3b8" }}>{dom.total} certs &middot; {subKeys.length} specializations</span>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
            {subKeys.map(sk => renderSubBox(d, sk, dom.subs[sk], true))}
          </div>
        </div>
      );
    }

    // All domains: compact heatmap
    const totalCerts = certs.length || 1;
    return (
      <div style={{ display: "flex", flexWrap: "wrap", gap: 2, minHeight: 400 }}>
        {DO.map(d => {
          const dom = tree[d];
          if (dom.total === 0) return null;
          const subKeys = Object.keys(dom.subs).sort((a, b) => dom.subs[b].length - dom.subs[a].length);
          return (
            <div key={d} style={{
              flex: Math.max(dom.total, 5) + " 1 0%",
              minWidth: 120, background: "#0f172a",
              border: "2px solid " + DC[d], borderRadius: 6, overflow: "hidden",
            }}>
              <div onClick={() => setFDom(d)} style={{ background: DC[d] + "22", padding: "6px 10px", borderBottom: "1px solid " + DC[d] + "44", display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer", transition: "background 0.15s" }}
                onMouseEnter={e => e.currentTarget.style.background = DC[d] + "44"}
                onMouseLeave={e => e.currentTarget.style.background = DC[d] + "22"}>
                <span style={{ fontSize: 12, fontWeight: 800, color: DC[d] }}>{DN[d]}</span>
                <span style={{ fontSize: 9, color: DC[d] }}>Drill in &rarr;</span>
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 1, padding: 3 }}>
                {subKeys.map(sk => renderSubBox(d, sk, dom.subs[sk], false))}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div style={ss.root}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 10, flexWrap: "wrap", gap: 6 }}>
        <div>
          <h1 style={ss.h1}>SecCert Roadmap</h1>
          <span style={ss.sub}>{ALL.length} certs &middot; {my.size} owned &middot; {Object.keys(PW).length} paths &middot; cross-domain spanning</span>
        </div>
        <div style={{ display: "flex", gap: 2 }}>
          {[["browse","Browse"],["portfolio","My Certs"],["pathways","Pathways"],["salary","Salary"],["sources","Sources"]].map(([k,l]) => (
            <button key={k} onClick={() => setTab(k)} style={{ ...ss.tab, background: tab === k ? "#2563eb" : "transparent", color: tab === k ? "#fff" : "#94a3b8", borderColor: tab === k ? "#2563eb" : "#334155" }}>
              {l}{k === "portfolio" && my.size > 0 ? ` (${my.size})` : ""}
            </button>
          ))}
        </div>
      </div>

      {/* ===== BROWSE ===== */}
      {tab === "browse" && (<div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 6 }}>
          <input placeholder="Search..." value={search} onChange={e => setSearch(e.target.value)} style={ss.input} />
          <Dd v={fDom} onChange={setFDom} opts={[["all", "All Domains"], ...DO.map(d => [d, DN[d]])]} />
          <Dd v={fStat} onChange={setFStat} opts={[["active", "Active"], ["all", "All (+ retired)"], ["retired", "Retired only"]]} />
          <Dd v={fPath} onChange={setFPath} opts={[["none", "No pathway highlight"], ...Object.entries(PW).map(([k, v]) => [k, v.l])]} />
          <div style={{ display: "flex", borderRadius: 5, overflow: "hidden", border: "1px solid #334155", marginLeft: 4 }}>
            {[["grid", "Grid"], ["heat", "Heatmap"]].map(([k, l]) => (
              <button key={k} onClick={() => setViewMode(k)} style={{ padding: "5px 10px", fontSize: 10, fontWeight: 700, border: "none", cursor: "pointer", background: viewMode === k ? "#2563eb" : "#0f172a", color: viewMode === k ? "#fff" : "#94a3b8" }}>{l}</button>
            ))}
          </div>
        </div>
        {fPath !== "none" && pprog && (
          <div style={ss.progBar}>
            <span style={{ fontWeight: 700, color: "#fbbf24", marginRight: 8 }}>{PW[fPath].l}</span>
            <div style={{ flex: 1, height: 5, background: "#0f172a", borderRadius: 3, overflow: "hidden" }}><div style={{ height: "100%", width: pprog.pct + "%", background: pctColor(pprog.pct), borderRadius: 3 }} /></div>
            <span style={{ fontSize: 12, fontWeight: 700, color: pctColor(pprog.pct), marginLeft: 8 }}>{pprog.pct}% ({pprog.owned}/{pprog.total})</span>
          </div>
        )}
        {/* Column headers */}
        {viewMode === "grid" && visDom.length > 1 && (
          <div style={{ display: "flex" }}>
            <div style={{ width: 64, minWidth: 64 }} />
            <div style={{ display: "grid", gridTemplateColumns: visDom.map(() => "1fr").join(" "), gap: 0, flex: 1 }}>
              {visDom.map(d => (
                <div key={d} style={{ padding: "5px 2px", textAlign: "center", borderBottom: "3px solid " + DC[d], fontSize: 11, fontWeight: 800, color: DC[d] }}>{DN[d]}</div>
              ))}
            </div>
          </div>
        )}
        {viewMode === "grid" && visDom.length === 1 && (() => {
          const d = visDom[0];
          const allCerts = filtered.filter(c => c.d === d || (c.xd && c.xd.includes(d)));
          const { keys } = getSubDomains(allCerts);
          const allKeys = keys.length > 1 ? keys : [];
          if (allKeys.length > 0) return (
            <div style={{ display: "flex" }}>
              <div style={{ width: 64, minWidth: 64 }}>
                <div style={{ padding: "5px 2px", textAlign: "center", borderBottom: "3px solid " + DC[d], fontSize: 11, fontWeight: 800, color: DC[d] }}>{DN[d]}</div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: allKeys.map(() => "1fr").join(" "), gap: 0, flex: 1 }}>
                {allKeys.map(sk => (
                  <div key={sk} style={{ padding: "4px 2px", textAlign: "center", borderBottom: "2px solid " + DC[d] + "66", fontSize: 9, fontWeight: 700, color: DC[d], opacity: 0.8 }}>{sk}</div>
                ))}
              </div>
            </div>
          );
          return null;
        })()}
        {/* Grid or Heatmap view */}
        {viewMode === "grid" ? (
          <div style={{ overflowX: "auto" }}>
            {[5, 4, 3, 2, 1].map(tier => renderTierGrid(tier))}
          </div>
        ) : (
          renderHeatmap()
        )}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 8, paddingTop: 8, borderTop: "1px solid #1e293b" }}>
          {DO.map(d => <span key={d} style={ss.leg}><span style={{ ...ss.dot, background: DC[d] }} />{DN[d]}</span>)}
          <span style={ss.leg}><span style={{ ...ss.dot, background: "#fbbf24", borderRadius: 8 }} /> Owned</span>
          {viewMode === "grid" && <span style={ss.leg}><span style={{ width: 6, height: 6, borderRadius: 6, background: "#70AD47", display: "inline-block", border: "1px solid rgba(0,0,0,0.3)" }} /> Cross-domain</span>}
          {viewMode === "heat" && <>
            <span style={{ fontSize: 10, color: "#64748b", marginLeft: 8 }}>Intensity = tier:</span>
            {[1,2,3,4,5].map(t => <span key={t} style={{ fontSize: 9, padding: "2px 6px", borderRadius: 3, background: "#3b82f6", opacity: [0,0.35,0.5,0.7,0.85,1.0][t], color: "#fff", fontWeight: 600 }}>{TF[t]}</span>)}
            <span style={ss.leg}>Size = pathway relevance</span>
            <span style={ss.leg}><span style={{ fontSize: 8, color: "#a855f7" }}>{"◆"}</span> Expert <span style={{ fontSize: 8, color: "#a855f7" }}>{"★"}</span> Master</span>
          </>}
        </div>
      </div>)}

      {/* ===== PORTFOLIO ===== */}
      {tab === "portfolio" && (<div>
        {my.size === 0 ? (<div style={ss.empty}><div style={{ fontSize: 16, fontWeight: 700, marginBottom: 8 }}>No certs tracked yet</div><div style={{ maxWidth: 400, margin: "0 auto", lineHeight: 1.6 }}>Click any cert in Browse or toggle them in Pathways. Persists across sessions.</div></div>
        ) : (<div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 12 }}>
            {DO.map(dk => { const cnt = myList.filter(c => c.d === dk || (c.xd && c.xd.includes(dk))).length; if (!cnt) return null; return <div key={dk} style={{ background: "#1e293b", borderRadius: 6, padding: "6px 10px", borderLeft: "3px solid " + DC[dk] }}><div style={{ fontSize: 9, color: DC[dk], fontWeight: 700 }}>{DN[dk]}</div><div style={{ fontSize: 22, fontWeight: 800, color: "#fff" }}>{cnt}</div></div>; })}
            <div style={{ background: "#1e293b", borderRadius: 6, padding: "6px 10px", borderLeft: "3px solid #fbbf24" }}><div style={{ fontSize: 9, color: "#fbbf24", fontWeight: 700 }}>TOTAL</div><div style={{ fontSize: 22, fontWeight: 800, color: "#fff" }}>{my.size}</div></div>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
            {myList.map(c => { const sal = salRange(c.a); return (
              <div key={c.a} onClick={() => setSel(c.a)} style={{ background: "#1e293b", borderRadius: 5, padding: "6px 10px", border: "1px solid " + DC[c.d] + "33", minWidth: 130, cursor: "pointer", display: "flex", flexDirection: "column", gap: 2 }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}><span style={{ fontSize: 13, fontWeight: 800, color: DC[c.d] }}>{c.a}</span><span style={{ fontSize: 9, color: TC[c.t], fontWeight: 700 }}>{TF[c.t]}</span></div>
                <span style={{ fontSize: 10, color: "#cbd5e1" }}>{c.n.slice(0, 45)}</span>
                {sal && <span style={{ fontSize: 11, color: "#22c55e", fontWeight: 600 }}>${sal[0]}K&ndash;${sal[1]}K</span>}
              </div>); })}
          </div>
          <div style={{ marginTop: 14, borderTop: "1px solid #1e293b", paddingTop: 10 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#94a3b8", marginBottom: 6 }}>PATHWAY COMPLETION</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(180px,1fr))", gap: 6 }}>
              {Object.entries(PW).map(([pk, pv]) => { const ow = pv.c.filter(a => my.has(a)).length; const pct = Math.round(ow / pv.c.length * 100); return (
                <div key={pk} style={{ background: "#0f172a", borderRadius: 5, padding: 6 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11 }}><span style={{ color: "#f1f5f9", fontWeight: 600 }}>{pv.l}</span><span style={{ color: pctColor(pct), fontWeight: 700 }}>{pct}%</span></div>
                  <div style={{ height: 4, background: "#1e293b", borderRadius: 2, marginTop: 3, overflow: "hidden" }}><div style={{ height: "100%", width: pct + "%", background: pctColor(pct), borderRadius: 2 }} /></div>
                </div>); })}
            </div>
          </div>
        </div>)}
      </div>)}

      {/* ===== PATHWAYS ===== */}
      {tab === "pathways" && (<div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {Object.entries(PW).map(([pk, pv]) => { const ow = pv.c.filter(a => my.has(a)); const pct = Math.round(ow.length / pv.c.length * 100); return (
          <div key={pk} style={{ background: "#1e293b", borderRadius: 8, padding: 14, border: "1px solid #3b4a5f" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div><span style={{ fontSize: 16, fontWeight: 800, color: "#f8fafc" }}>{pv.l}</span>{pv.i && <span style={{ fontSize: 10, color: "#94a3b8", marginLeft: 8 }}>{pv.i}</span>}</div>
              <span style={{ fontSize: 13, fontWeight: 800, color: pctColor(pct) }}>{pct}% ({ow.length}/{pv.c.length})</span>
            </div>
            <div style={{ height: 4, background: "#0f172a", borderRadius: 3, margin: "6px 0", overflow: "hidden" }}><div style={{ height: "100%", width: pct + "%", background: pctColor(pct), borderRadius: 3 }} /></div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 6 }}>
              {Object.entries(pv.t).sort((a, b) => Number(a[0]) - Number(b[0])).map(([t, r]) => (<span key={t} style={{ fontSize: 11 }}><span style={{ color: TC[t], fontWeight: 700 }}>{TF[t]}</span> <span style={{ color: "#94a3b8" }}>${r[0]}K&ndash;${r[1]}K</span></span>))}
            </div>
            {[1, 2, 3, 4, 5].map(t => { const tc = pv.c.filter(a => { const c = ALL.find(x => x.a === a); return c && c.t === t; }); if (!tc.length) return null; return (
              <div key={t} style={{ marginTop: 2 }}><span style={{ fontSize: 10, color: TC[t], fontWeight: 700 }}>{TF[t]}: </span>
                {tc.map(a => { const have = my.has(a); return <span key={a} onClick={() => tog(a)} style={{ fontSize: 10, padding: "3px 8px", borderRadius: 3, marginRight: 3, marginBottom: 2, display: "inline-block", cursor: "pointer", background: have ? "rgba(251,191,36,0.13)" : "#0f172a", color: have ? "#fbbf24" : "#94a3b8", border: have ? "1px solid #fbbf24" : "1px solid #1e293b", fontWeight: have ? 700 : 400 }}>{have ? "\u2713 " : ""}{a}</span>; })}
              </div>); })}
          </div>); })}
      </div>)}

      {/* ===== SALARY ===== */}
      {tab === "salary" && (<div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        <div>
          <div style={ss.card}><label style={ss.label}>Career Pathway</label><Dd v={sPw} onChange={setSPw} opts={Object.entries(PW).map(([k, v]) => [k, v.l])} /></div>
          <div style={ss.card}><label style={ss.label}>Certification Tier</label>
            <div style={{ display: "flex", gap: 3 }}>{[1, 2, 3, 4, 5].map(t => (<button key={t} onClick={() => setSTier(t)} style={{ flex: 1, padding: "6px 2px", borderRadius: 4, cursor: "pointer", fontSize: 9, fontWeight: 700, lineHeight: 1.3, border: sTier === t ? "2px solid " + TC[t] : "2px solid #334155", background: sTier === t ? TC[t] + "15" : "#0f172a", color: sTier === t ? TC[t] : "#94a3b8" }}>{TF[t]}<br /><span style={{ fontWeight: 400, fontSize: 8 }}>{TY[t]}</span></button>))}</div>
          </div>
          <div style={ss.card}><label style={ss.label}>DoD Security Clearance</label><Dd v={sCl} onChange={setSCl} opts={CL.map(c => [c.id, c.l + " (" + (c.m > 1 ? "+" : "") + Math.round((c.m - 1) * 100) + "%)"])} /></div>
          <div style={ss.card}><label style={ss.label}>Education</label><Dd v={sDg} onChange={setSDg} opts={DG.map(d => [d.id, d.l + " (" + (d.m >= 1 ? "+" : "") + Math.round((d.m - 1) * 100) + "%)"])} /></div>
          <div style={ss.card}><label style={ss.label}>Years of Experience</label><Dd v={sEx} onChange={setSEx} opts={EX.map(e => [e.id, e.l + " (" + (e.m >= 1 ? "+" : "") + Math.round((e.m - 1) * 100) + "%)"])} /></div>
        </div>
        <div>
          <div style={{ ...ss.card, textAlign: "center", padding: 24 }}>
            <div style={{ fontSize: 10, color: "#94a3b8", fontWeight: 700, letterSpacing: 1, textTransform: "uppercase" }}>Estimated Annual Salary</div>
            <div style={{ fontSize: 44, fontWeight: 900, color: "#22c55e", lineHeight: 1.1, marginTop: 4 }}>${calc.mid.toLocaleString()}K</div>
            <div style={{ fontSize: 14, color: "#cbd5e1", marginTop: 2 }}>${calc.lo}K &mdash; ${calc.hi}K</div>
            <div style={{ fontSize: 11, color: "#94a3b8", marginTop: 4 }}>{PW[sPw].l} &middot; {TF[sTier]}</div>
            {calc.capped && <div style={{ fontSize: 9, color: "#f59e0b", marginTop: 4, padding: "2px 6px", background: "#f59e0b11", borderRadius: 3 }}>Capped at {MOD_CAP}x (raw: {calc.rawMult.toFixed(2)}x)</div>}
            <div style={{ borderTop: "1px solid #334155", marginTop: 14, paddingTop: 10, textAlign: "left" }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: "#94a3b8", marginBottom: 4 }}>BREAKDOWN</div>
              {[{label:"Base (" + PW[sPw].l + ", " + TF[sTier] + ")",m:1,val:"$" + calc.bm + "K",color:"#f1f5f9"},
                {label:"Clearance: " + calc.cl.l,m:calc.cl.m,val:(calc.cl.m>=1?"+":"") + Math.round(calc.bm*(calc.cl.m-1)) + "K",color:calc.cl.c},
                {label:"Education: " + calc.dg.l,m:calc.dg.m,val:(calc.dg.m>=1?"+":"") + Math.round(calc.bm*(calc.dg.m-1)) + "K",color:calc.dg.m>=1?"#22c55e":"#f87171"},
                {label:"Experience: " + calc.ex.l,m:calc.ex.m,val:(calc.ex.m>=1?"+":"") + Math.round(calc.bm*(calc.ex.m-1)) + "K",color:calc.ex.m>=1?"#22c55e":"#f87171"},
              ].map((row,i) => (<div key={i} style={{ display:"flex",justifyContent:"space-between",alignItems:"center",padding:"5px 0",borderBottom:"1px solid #0f172a" }}>
                <span style={{ fontSize:11,color:"#f1f5f9",flex:1 }}>{row.label}</span>
                <span style={{ fontSize:11,fontWeight:700,color:row.color,width:50,textAlign:"right" }}>{row.val}</span>
                <span style={{ fontSize:10,color:"#94a3b8",width:40,textAlign:"right" }}>&times;{row.m.toFixed(2)}</span>
              </div>))}
            </div>
          </div>
          <div style={ss.card}>
            <div style={{ fontSize: 10, fontWeight: 700, color: "#94a3b8", marginBottom: 4 }}>CLEARANCE COMPARISON</div>
            {CL.map(cl => { const mid = Math.round(calc.bm * Math.min(cl.m * calc.dg.m * calc.ex.m, MOD_CAP)); const maxM = Math.round(calc.bm * Math.min(1.47 * calc.dg.m * calc.ex.m, MOD_CAP)); const cur = cl.id === sCl; return (
              <div key={cl.id} style={{ display: "flex", alignItems: "center", gap: 4, marginBottom: 3 }}>
                <span style={{ fontSize: 9, color: cur ? cl.c : "#94a3b8", fontWeight: cur ? 700 : 400, width: 95, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{cl.l}</span>
                <div style={{ flex: 1, height: 10, background: "#0f172a", borderRadius: 3, overflow: "hidden" }}><div style={{ width: (mid / maxM * 100) + "%", height: "100%", background: cur ? cl.c : cl.c + "33", borderRadius: 3 }} /></div>
                <span style={{ fontSize: 10, color: cur ? "#fff" : "#94a3b8", fontWeight: cur ? 700 : 400, width: 42, textAlign: "right" }}>${mid}K</span>
              </div>); })}
          </div>
        </div>
      </div>)}

      {/* ===== SOURCES ===== */}
      {tab === "sources" && (<div>
        <div style={{ ...ss.card, marginBottom: 12 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: "#f1f5f9", marginBottom: 6 }}>Methodology</div>
          <div style={{ fontSize: 11, color: "#cbd5e1", lineHeight: 1.7 }}>Base ranges are pathway+tier estimates reflecting US national base salary. Compound modifier capped at {MOD_CAP}x. Known gaps: geographic variation unmodeled, Glassdoor/PayScale skew high, degree premium from BLS not cyber-specific.</div>
        </div>
        <div style={{ fontSize: 11, fontWeight: 700, color: "#94a3b8", marginBottom: 6 }}>DATA SOURCES ({SOURCES.length})</div>
        {SOURCES.map((s, i) => (<div key={i} style={{ ...ss.card, padding: 12 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div><div style={{ fontSize: 12, fontWeight: 700, color: "#f1f5f9" }}>{s.n}</div><div style={{ fontSize: 10, color: "#cbd5e1", marginTop: 2 }}>{s.d}</div></div>
            <a href={s.u} target="_blank" rel="noopener noreferrer" style={{ fontSize: 10, color: "#60a5fa", textDecoration: "none", whiteSpace: "nowrap", marginLeft: 8 }}>Source &rarr;</a>
          </div>
        </div>))}
        <div style={{ ...ss.card, marginTop: 6 }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: "#f1f5f9", marginBottom: 2 }}>Certification Data</div>
          <div style={{ fontSize: 10, color: "#cbd5e1", lineHeight: 1.6 }}>514 certs from <a href="https://github.com/PaulJerimy/SecCertRoadmapHTML" target="_blank" rel="noopener noreferrer" style={{ color: "#60a5fa" }}>PaulJerimy/SecCertRoadmapHTML</a> v9 (Jul 2024) + changelog + CMMC (ISACA/CAICO 2026) + 12 AI security certs (2025-2026). 110 certs have cross-domain mappings.</div>
        </div>
      </div>)}

      {/* ===== DETAIL PANEL ===== */}
      {sel && (() => { const c = ALL.find(x => x.a === sel); if (!c) return null; const sal = salRange(c.a); const paths = certPaths(c.a); const owned = my.has(c.a); const doms = c.xd || [c.d];
        return (<div style={ss.detail}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8 }}>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: "flex", gap: 6, alignItems: "center", flexWrap: "wrap" }}>
                <span style={{ background: DC[c.d], color: "#fff", padding: "4px 12px", borderRadius: 4, fontWeight: 800, fontSize: 15 }}>{c.a}</span>
                {c.s === "retired" && <span style={{ fontSize: 10, color: "#f87171", background: "#f8717118", padding: "2px 6px", borderRadius: 3 }}>RETIRED</span>}
                <span style={{ fontSize: 10, color: TC[c.t], fontWeight: 700 }}>{TF[c.t]}</span>
              </div>
              <div style={{ fontSize: 17, fontWeight: 600, color: "#f8fafc", marginTop: 6 }}>{c.n}</div>
              {c.b && <div style={{ fontSize: 13, color: "#cbd5e1", marginTop: 6, lineHeight: 1.6 }}>{c.b}</div>}
            </div>
            <div style={{ display: "flex", gap: 4, flexShrink: 0 }}>
              <button onClick={() => tog(c.a)} style={{ padding: "8px 16px", borderRadius: 6, border: "none", cursor: "pointer", fontSize: 12, fontWeight: 700, background: owned ? "#fbbf24" : "#334155", color: owned ? "#000" : "#cbd5e1" }}>{owned ? "\u2713 Owned" : "+ Add"}</button>
              {c.u && <a href={c.u} target="_blank" rel="noopener noreferrer" style={{ padding: "8px 12px", borderRadius: 6, border: "1px solid #334155", fontSize: 11, color: "#60a5fa", textDecoration: "none", display: "flex", alignItems: "center" }}>Official Site &rarr;</a>}
              <button onClick={() => setSel(null)} style={{ padding: "6px 10px", borderRadius: 5, border: "1px solid #475569", background: "none", color: "#94a3b8", cursor: "pointer", fontSize: 11 }}>&#10005;</button>
            </div>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 16, marginTop: 12 }}>
            {c.p && <div><span style={ss.dl}>Price</span><span style={ss.dv}>{c.p}</span></div>}
            <div><span style={ss.dl}>Domains</span><div style={{ display: "flex", gap: 4, marginTop: 2 }}>{doms.map(d => <span key={d} style={{ fontSize: 11, padding: "3px 8px", borderRadius: 4, background: DC[d] + "22", color: DC[d], fontWeight: 600, border: "1px solid " + DC[d] + "44" }}>{DN[d]}</span>)}</div></div>
            {sal && <div><span style={ss.dl}>Salary Range</span><span style={{ ...ss.dv, color: "#22c55e", fontWeight: 700 }}>${sal[0]}K&ndash;${sal[1]}K</span></div>}
            {paths.length > 0 && <div><span style={ss.dl}>Career Pathways</span><span style={ss.dv}>{paths.join(", ")}</span></div>}
          </div>
        </div>);
      })()}
    </div>
  );
}

const ss = {
  root: { fontFamily: "'Segoe UI',system-ui,sans-serif", background: "#101827", color: "#e2e8f0", minHeight: "100vh", padding: 16 },
  h1: { fontSize: 22, fontWeight: 900, margin: 0, color: "#f8fafc", letterSpacing: -0.5 },
  sub: { fontSize: 11, color: "#94a3b8" },
  tab: { padding: "7px 16px", fontSize: 11, fontWeight: 700, border: "1px solid", cursor: "pointer", borderRadius: 6 },
  sel: { padding: "6px 8px", fontSize: 11, borderRadius: 5, border: "1px solid #334155", background: "#0f172a", color: "#f1f5f9", cursor: "pointer" },
  input: { padding: "6px 10px", fontSize: 11, borderRadius: 5, border: "1px solid #334155", background: "#0f172a", color: "#f1f5f9", width: 150 },
  progBar: { display: "flex", alignItems: "center", background: "#1e293b", borderRadius: 6, padding: "6px 12px", marginBottom: 6, fontSize: 12, border: "1px solid #334155" },
  tierLbl: { width: 64, minWidth: 64, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", borderRight: "3px solid", paddingRight: 5, marginRight: 0 },
  leg: { display: "flex", alignItems: "center", gap: 4, fontSize: 10, color: "#94a3b8" },
  dot: { width: 11, height: 11, borderRadius: 2, display: "inline-block" },
  card: { background: "#1e293b", borderRadius: 8, padding: 14, border: "1px solid #3b4a5f", marginBottom: 8 },
  label: { fontSize: 10, color: "#94a3b8", fontWeight: 700, marginBottom: 4, display: "block", textTransform: "uppercase", letterSpacing: 0.5 },
  detail: { position: "fixed", bottom: 0, left: 0, right: 0, background: "#1a2332", borderTop: "3px solid #2563eb", padding: "20px 24px", zIndex: 100, maxHeight: "52vh", overflow: "auto", boxShadow: "0 -8px 30px rgba(0,0,0,0.5)" },
  dl: { fontSize: 10, color: "#94a3b8", display: "block" },
  dv: { fontSize: 14, color: "#f1f5f9", display: "block", marginTop: 1 },
  empty: { textAlign: "center", padding: 40, color: "#cbd5e1", fontSize: 13, lineHeight: 1.6 },
};
