# 07 Rechtliche Rahmenbedingungen - Inhaltsverzeichnis

## **Executive Summary**
- FINMA-Stellungnahme als kritischer Erfolgsfaktor identifiziert
- Compliance-Framework für rechtskonforme API-Implementation
- Praktische Checklisten und Entscheidungsbäume für Legal Compliance

---

## **1. Regulatorische Ausgangslage**

### **1.1 Schweizer Rechtsquellen-Hierarchie**

#### **Primäre Rechtsquellen**
- **Bundesgesetze:** Bankgesetz (BankG), Geldwäschereigesetz (GwG), Datenschutzgesetz (DSG)
- **Verordnungen:** Bankverordnung (BankV), GwG-Verordnung, DSG-Verordnung
- **FINMA-Rundschreiben:** RS 2008/7 (Outsourcing), RS 2016/7 (Video-/Online-Identifikation)
- **FINMA-Guidance:** Interpretative Guidance, FAQ Documents, Industry Communications

#### **Internationale Rechtsquellen (Swiss Context)**
- **EU-Acquis:** PSD2, GDPR soweit für CH relevant
- **Basel-Standards:** Basel III/IV Operational Risk Guidelines
- **International Standards:** FATF Recommendations, OECD Standards
- **Bilateral Agreements:** EU-CH Financial Services Agreements

### **1.2 Rechtliche Rahmenbedingungen-Matrix**

| Rechtsbereich | Primäre Quelle | FINMA-Guidance | Anwendung auf APIs |
|---------------|----------------|----------------|-------------------|
| **Bankkundengeheimnis** | BankG Art. 47 | RS 2008/7 | Data sharing consent required |
| **Geldwäschereirecht** | GwG Art. 3, 4 | RS 2016/7 | Identity verification standards |
| **Datenschutz** | DSG, DSGVO | FAQ DSG/GDPR | Consent management, data minimization |
| **Outsourcing** | BankV Art. 25 | RS 2008/7 | Third-party service integration |
| **Operational Risk** | Basel III | FINMA-Guidance | API reliability, security requirements |

---

## **2. GwG-Compliance Framework**

### **2.1 Artikel 3: Identifizierung der Vertragspartei**

#### **Rechtliche Anforderungen**
- **Eindeutige Identifikation:** Natürliche und juristische Personen
- **Verification Standards:** Government-issued ID documents
- **Documentation Requirements:** Audit trail für identification process
- **Timing Requirements:** Before establishing business relationship

#### **API-Implementation Checklist**
```json
{
  "identification_requirements": {
    "natural_persons": {
      "required_documents": ["passport", "id_card", "driving_license"],
      "verification_method": "video_ident|in_person|qualified_electronic_signature",
      "data_retention": "10_years_post_relationship",
      "audit_trail": "mandatory"
    },
    "legal_entities": {
      "required_documents": ["commercial_register_extract", "articles_of_incorporation"],
      "beneficial_ownership": "required_if_ownership_>25%",
      "verification_depth": "ultimate_beneficial_owner"
    }
  }
}
```

#### **Vereinfachte Verfahren (GwG Art. 3 Abs. 2)**
- **Bestehende Geschäftsbeziehung:** Reduzierte Prüfanforderungen
- **Risikobasierter Ansatz:** Lower risk customers, streamlined process
- **Digital Verification:** Electronic ID verification under specific conditions
- **Cross-Reference:** Internal customer database checks

### **2.2 Artikel 4: Wirtschaftlich berechtigte Person**

#### **Beneficial Ownership Requirements**
- **25% Threshold:** Ownership oder control über 25% triggers disclosure
- **Ultimate Beneficial Owner:** Natural person behind legal structures
- **Control Definition:** Voting rights, board control, other influence
- **Trust Structures:** Special rules für trusts, foundations, other entities

#### **API Data Model für UBO**
```json
{
  "beneficial_ownership": {
    "direct_ownership": [
      {
        "person_id": "natural-person-uuid",
        "ownership_percentage": 35.5,
        "ownership_type": "direct_shares",
        "verification_date": "2024-01-15",
        "source_documents": ["shareholder_agreement", "commercial_register"]
      }
    ],
    "control_mechanisms": [
      {
        "control_type": "voting_agreement",
        "control_percentage": 51.0,
        "controlling_person": "natural-person-uuid",
        "documentation": "voting_agreement_2024.pdf"
      }
    ]
  }
}
```

### **2.3 Regelset-Dokumentation und -Versionierung**

#### **Historical Compliance Requirements**
- **Point-in-Time Compliance:** Documentation of rules applicable at identification time
- **Regulatory Changes:** Tracking changes in GwG requirements over time
- **Grandfathering:** Rules für customers identified under previous regulations
- **Migration Requirements:** Process für upgrading historical identifications

#### **API Metadata Structure**
```json
{
  "compliance_metadata": {
    "identification_date": "2024-01-15T10:00:00Z",
    "applicable_regulations": {
      "gwg_version": "2020-01-01",
      "finma_guidance": "RS-2016-7-v2.1",
      "identification_standard": "video_ident_2024"
    },
    "assurance_level": "QEAA",
    "verification_method": "video_identification",
    "expiry_rules": {
      "identity_valid_until": "2029-01-15T00:00:00Z",
      "re_verification_required": false,
      "trigger_events": ["address_change", "suspicious_activity"]
    }
  }
}
```

---

## **3. Bankkundengeheimnis und Datenschutz**

### **3.1 Bankkundengeheimnis (BankG Art. 47)**

#### **Scope Definition**
- **Protected Information:** All customer-related data held by banks
- **Geographic Scope:** Swiss banks, Swiss customer data
- **Temporal Scope:** Applies during und after customer relationship
- **Criminal Law Protection:** Violation constitutes criminal offense

#### **Consent Requirements für Data Sharing**
```json
{
  "bankkundengeheimnis_consent": {
    "consent_type": "explicit_written_consent",
    "consent_scope": {
      "data_categories": ["identity", "financial_data", "transaction_history"],
      "recipients": ["integrator_bank_id"],
      "purposes": ["account_opening", "kyc_verification"],
      "geographic_scope": "switzerland"
    },
    "consent_evidence": {
      "consent_method": "digital_signature",
      "timestamp": "2024-01-15T10:00:00Z",
      "ip_address": "192.168.1.100",
      "consent_text": "consent_text_hash_sha256"
    },
    "revocation_rights": {
      "revocation_method": ["online_portal", "written_notice"],
      "effect_timing": "immediate",
      "data_deletion": "30_days_notice"
    }
  }
}
```

#### **Exceptions to Bank Secrecy**
- **Customer Consent:** Explicit, informed consent for data sharing
- **Legal Orders:** Court orders, administrative orders
- **Regulatory Requirements:** FINMA investigations, tax authorities
- **Criminal Proceedings:** Money laundering, terrorist financing investigations

### **3.2 DSGVO/DSG Konvergenz**

#### **Swiss DSG vs EU GDPR Alignment**
- **Material Scope:** Similar coverage für personal data processing
- **Territorial Scope:** DSG applies to Swiss entities, data subjects
- **Legal Bases:** Consent, legitimate interest, legal obligation alignment
- **Individual Rights:** Access, rectification, erasure, portability harmonization

#### **Data Subject Rights Implementation**
```json
{
  "data_subject_rights": {
    "right_of_access": {
      "response_time": "30_days",
      "data_format": "machine_readable",
      "authentication": "strong_authentication_required"
    },
    "right_to_rectification": {
      "correction_process": "api_endpoint_available",
      "verification_required": true,
      "downstream_notification": "automatic"
    },
    "right_to_erasure": {
      "erasure_conditions": ["consent_withdrawn", "purpose_fulfilled"],
      "retention_exceptions": ["legal_obligation", "public_interest"],
      "technical_implementation": "cryptographic_deletion"
    },
    "right_to_portability": {
      "data_format": "json_structured_format",
      "export_method": "secure_api_endpoint",
      "authentication": "qualified_electronic_signature"
    }
  }
}
```

#### **Purpose Limitation Implementation**
- **Purpose Specification:** Clear, specific purposes in API requests
- **Purpose Binding:** Technical enforcement of purpose limitations
- **Compatibility Assessment:** Secondary use compatibility evaluation
- **Documentation Requirements:** Audit trail für all purpose determinations

---

## **4. Zentrale Rechtliche Fragestellungen**

### **4.1 Datenherausgabe-Standards**

#### **Kernfrage: Mindestanforderungen**
**Legal Question:** "Welche Mindestanforderungen gelten für Datensatz-Herausgabe bezüglich Aktualität, Qualität und Risikoprofilen?"

#### **Stakeholder-Positionen Analyse**
```json
{
  "stakeholder_positions": {
    "hbl_position": {
      "requirement": "explicit_consent_required",
      "rationale": "bankkundengeheimnis_protection",
      "implementation": "dual_consent_mechanism"
    },
    "intrum_position": {
      "requirement": "clear_minimum_standards",
      "rationale": "legal_certainty_needed",
      "implementation": "finma_guidance_required"
    },
    "yuh_position": {
      "requirement": "individual_case_review",
      "rationale": "risk_based_approach",
      "implementation": "compliance_team_involvement"
    }
  }
}
```

#### **Legal Gap Analysis**
- **Data Quality Standards:** No specific legal requirements defined
- **Liability Distribution:** Unclear allocation zwischen producer und integrator
- **Verification Requirements:** Insufficient guidance für data validation
- **Temporal Aspects:** Unclear rules für data freshness requirements

### **4.2 FINMA-Stellungnahme Erforderlichkeit**

#### **Critical Regulatory Questions für FINMA**
1. **Due Diligence Standards:** "Welche Due Diligence-Standards gelten für übernommene Kundendaten?"
2. **Re-Verification Requirements:** "Kann auf erneute Vollprüfung bei vorheriger FINMA-konformer Identifikation verzichtet werden?"
3. **Temporal Validity:** "Wie sind zeitliche Aspekte bei Identifikations-Übertragung zu bewerten?"
4. **Risk Allocation:** "Wie wird Haftung zwischen Produzent und Integrator verteilt?"

#### **FINMA Engagement Strategy**
```json
{
  "finma_engagement_plan": {
    "phase_1_preparation": {
      "legal_analysis": "comprehensive_regulatory_gap_analysis",
      "industry_consultation": "stakeholder_position_papers",
      "international_benchmarking": "eu_psd2_comparison"
    },
    "phase_2_submission": {
      "formal_request": "finma_guidance_request",
      "technical_specification": "api_implementation_details",
      "compliance_framework": "proposed_compliance_procedures"
    },
    "phase_3_implementation": {
      "guidance_integration": "api_design_updates",
      "industry_communication": "market_participant_briefing",
      "monitoring_framework": "ongoing_compliance_assessment"
    }
  }
}
```

### **4.3 Outsourcing-Rechtliche Einordnung**

#### **Outsourcing-Richtlinien Anwendbarkeit**
- **FINMA RS 2008/7:** Application to API-based data sharing
- **Outsourcing Definition:** Whether API integration constitutes outsourcing
- **Control Requirements:** Oversight obligations für API providers
- **Service Level Requirements:** SLA and performance monitoring obligations

#### **Compliance Framework für API Outsourcing**
```json
{
  "outsourcing_compliance": {
    "risk_assessment": {
      "operational_risk": "api_availability_risk",
      "security_risk": "data_breach_risk", 
      "compliance_risk": "regulatory_violation_risk",
      "concentration_risk": "vendor_dependency_risk"
    },
    "control_framework": {
      "oversight_committee": "api_governance_committee",
      "monitoring_requirements": "real_time_sla_monitoring",
      "audit_rights": "third_party_audit_access",
      "termination_rights": "service_termination_procedures"
    },
    "documentation_requirements": {
      "service_agreements": "comprehensive_sla_definitions",
      "risk_assessments": "annual_risk_reviews",
      "incident_reporting": "regulatory_incident_notification",
      "business_continuity": "disaster_recovery_procedures"
    }
  }
}
```

---

## **5. Compliance-by-Design Framework**

### **5.1 Privacy-by-Design Implementation**

#### **Technical Safeguards**
```json
{
  "privacy_by_design": {
    "data_minimization": {
      "granular_apis": "field_level_data_selection",
      "purpose_binding": "api_scope_restrictions",
      "retention_limits": "automatic_data_expiry"
    },
    "transparency": {
      "audit_logs": "immutable_access_logs",
      "consent_tracking": "consent_lifecycle_management",
      "data_lineage": "complete_data_provenance"
    },
    "security": {
      "encryption": "end_to_end_encryption",
      "access_controls": "role_based_api_access",
      "authentication": "strong_customer_authentication"
    }
  }
}
```

#### **Consent Management System Requirements**
- **Granular Consent:** Field-level permission management
- **Dynamic Consent:** Real-time consent status checking
- **Consent Proof:** Cryptographic evidence of consent
- **Revocation Mechanisms:** Immediate consent withdrawal processing

### **5.2 Legal Documentation Framework**

#### **API Terms of Service Template**
```markdown
# API Terms of Service Template

## 1. Scope and Applicability
- **Service Definition:** Customer data sharing via standardized APIs
- **Regulatory Framework:** Swiss banking law, GwG, DSG compliance
- **Geographic Scope:** Switzerland and approved jurisdictions

## 2. Data Protection and Privacy
- **Legal Basis:** Customer consent, legitimate interest assessment
- **Data Categories:** Explicit enumeration of data types
- **Purpose Limitation:** Specific, explicit, legitimate purposes
- **Retention Period:** Maximum retention periods by data category

## 3. Security and Technical Requirements
- **API Security:** FAPI 2.0 compliance mandatory
- **Data Encryption:** AES-256 minimum encryption standards
- **Access Controls:** Multi-factor authentication requirements
- **Incident Response:** Security incident notification procedures

## 4. Liability and Risk Allocation
- **Data Quality:** Producer liability für data accuracy
- **Security Breaches:** Shared liability based on fault
- **Regulatory Compliance:** Each party responsible für own compliance
- **Indemnification:** Mutual indemnification clauses
```

### **5.3 Regulatory Compliance Automation**

#### **Automated Compliance Checking**
```json
{
  "compliance_automation": {
    "real_time_checks": {
      "consent_validation": "active_consent_verification",
      "purpose_compliance": "api_scope_purpose_matching", 
      "data_minimization": "requested_fields_necessity_check",
      "retention_compliance": "automatic_data_expiry_enforcement"
    },
    "periodic_assessments": {
      "data_inventory": "quarterly_data_mapping_updates",
      "risk_assessments": "annual_privacy_impact_assessments",
      "audit_preparation": "continuous_audit_readiness",
      "regulatory_updates": "automatic_regulation_change_monitoring"
    }
  }
}
```

---

## **6. Sektorspezifische Compliance**

### **6.1 Banking-spezifische Anforderungen**

#### **FINMA-Rundschreiben Compliance**
- **RS 2008/7 Outsourcing:** API provider oversight requirements
- **RS 2016/7 Video-/Online-Identifikation:** Digital identity verification standards
- **RS 2018/3 Operational Risks:** API operational risk management
- **RS 2021/1 Cyber Risks:** Cybersecurity requirements für APIs

#### **Basel III/IV Operational Risk**
```json
{
  "operational_risk_framework": {
    "risk_categories": {
      "technology_risk": {
        "api_availability": "99.9%_uptime_requirement",
        "performance": "sub_500ms_response_times",
        "scalability": "auto_scaling_capabilities"
      },
      "process_risk": {
        "data_quality": "automated_data_validation",
        "consent_management": "consent_lifecycle_automation",
        "incident_response": "24_7_incident_response_team"
      },
      "people_risk": {
        "access_management": "role_based_access_controls",
        "training_requirements": "regular_security_training",
        "segregation_of_duties": "multi_person_authorization"
      }
    }
  }
}
```

### **6.2 Insurance-spezifische Anforderungen**

#### **VAG (Versicherungsaufsichtsgesetz) Compliance**
- **Solvency II Requirements:** Operational risk capital allocation
- **Customer Data Protection:** Insurance-specific data protection rules
- **Cross-Border Services:** EU insurance passporting considerations
- **Intermediary Regulations:** Insurance broker API integration rules

### **6.3 FinTech Regulierung**

#### **FIDI (Financial Services Act) Application**
- **FinTech License:** Requirements für API service providers
- **Regulatory Sandbox:** Experimental framework für API innovation
- **Cross-Border Services:** International FinTech service provision
- **DLT-Integration:** Blockchain und distributed ledger considerations

---

## **7. International Compliance Harmonization**

### **7.1 EU/EEA Legal Framework Integration**

#### **PSD2 Compatibility Requirements**
```json
{
  "psd2_alignment": {
    "technical_standards": {
      "rts_sca": "strong_customer_authentication",
      "rts_csc": "common_secure_communication",
      "regulatory_technical_standards": "eba_compliance"
    },
    "legal_requirements": {
      "consent_management": "gdpr_compatible_consent",
      "data_portability": "psd2_data_access_rights",
      "liability_framework": "psd2_liability_allocation"
    },
    "cross_border": {
      "passporting": "eu_service_provision_rights",
      "equivalence": "third_country_equivalence_assessment",
      "data_transfers": "adequacy_decision_compliance"
    }
  }
}
```

### **7.2 Cross-Border Data Transfer Framework**

#### **Adequacy Decisions und Safeguards**
- **EU-Switzerland Adequacy:** Current status und future developments
- **Standard Contractual Clauses:** Backup mechanism für data transfers
- **Binding Corporate Rules:** Multinational corporation compliance
- **Transfer Impact Assessments:** Schrems II compliance procedures

---

## **8. Risk Management und Haftungsrahmen**

### **8.1 Liability Framework**

#### **Haftungsverteilung Matrix**
| Risikokategorie | Produzent | Integrator | Geteilte Haftung |
|-----------------|-----------|------------|------------------|
| **Datenqualität** | Primary | Validation | Documentation |
| **Consent Validity** | Verification | Purpose compliance | Audit trail |
| **Security Breach** | System security | Access controls | Incident response |
| **Regulatory Violation** | Source compliance | Use compliance | Joint liability |

#### **Risk Mitigation Strategies**
```json
{
  "risk_mitigation": {
    "contractual_protections": {
      "indemnification": "mutual_indemnification_clauses",
      "limitation_of_liability": "reasonable_liability_caps",
      "force_majeure": "regulatory_change_provisions"
    },
    "insurance_coverage": {
      "professional_liability": "e_and_o_insurance_required",
      "cyber_insurance": "data_breach_coverage_mandatory",
      "operational_insurance": "business_interruption_coverage"
    },
    "technical_safeguards": {
      "backup_systems": "redundant_infrastructure",
      "monitoring": "real_time_system_monitoring",
      "incident_response": "automated_incident_detection"
    }
  }
}
```

### **8.2 Regulatory Incident Management**

#### **Incident Classification and Response**
- **Level 1:** Minor incidents, internal resolution
- **Level 2:** Moderate incidents, customer notification
- **Level 3:** Serious incidents, regulatory notification required
- **Level 4:** Critical incidents, immediate regulator contact

#### **FINMA Notification Requirements**
```json
{
  "incident_notification": {
    "notification_triggers": {
      "data_breach": "immediate_notification_required",
      "system_outage": "4_hour_notification_window",
      "compliance_violation": "24_hour_notification_requirement",
      "fraud_detection": "immediate_notification_required"
    },
    "notification_content": {
      "incident_description": "factual_incident_summary",
      "impact_assessment": "customer_impact_quantification",
      "mitigation_actions": "immediate_response_measures",
      "root_cause_analysis": "preliminary_cause_assessment"
    }
  }
}
```

---

## **9. Implementation Roadmap**

### **9.1 Legal-by-Design Approach**

#### **Phase 1: Foundation (Months 1-3)**
- **Legal Framework Analysis:** Comprehensive regulatory gap analysis
- **FINMA Engagement:** Initial regulatory dialogue
- **Compliance Framework:** Basic compliance procedures development
- **Industry Consultation:** Stakeholder feedback collection

#### **Phase 2: Implementation (Months 4-9)**
- **API Legal Framework:** Terms of service, privacy policies
- **Technical Compliance:** Privacy-by-design implementation
- **Monitoring Systems:** Compliance monitoring automation
- **Training Programs:** Staff legal compliance training

#### **Phase 3: Operation (Months 10+)**
- **Ongoing Compliance:** Regular compliance assessments
- **Regulatory Updates:** Continuous legal framework updates
- **Industry Standards:** Contribution to industry best practices
- **International Expansion:** Cross-border legal framework extension

### **9.2 Success Metrics**

#### **Compliance KPIs**
- **Regulatory Incidents:** Zero regulatory violations target
- **Audit Results:** Clean audit results, no material findings
- **Customer Complaints:** <1% complaint rate for privacy issues
- **Response Times:** <24 hour regulatory inquiry response time

---

## **Cross-References**
- **Chapter 04:** API Specifications → Legal Compliance Implementation
- **Chapter 05:** Trust Network → Multi-Party Legal Relationships
- **Chapter 06:** Security Flow → Data Protection Technical Implementation
- **Chapter 08:** Testing → Compliance Testing and Validation