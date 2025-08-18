# Overview Market Analysis - Open Banking Standards Comparison

## Executive Summary

This comprehensive market analysis compares nine major open banking and financial data exchange initiatives worldwide, evaluating their scope, technical implementation, governance models, and feature support. The analysis serves as a foundational reference for developing national Swiss Open Banking standards.

## Analyzed Initiatives

| Initiative | Owner | Approach | Primary Scope |
|------------|-------|----------|---------------|
| **UK Open Banking Standard** | Open Banking Limited | Regulated | Open Banking |
| **Open Finance Brasil** | Brazilian Central Bank | Regulated | Open Banking |
| **NextGenPSD2** | The Berlin Group | Regulated | Open Banking |
| **Open Wealth API** | Open Wealth Association | Market Driven | Open Banking |
| **SFTI Mortgage API** | Swiss Fintech Innovations | Market Driven | Open Banking |
| **Consumer Data Standards (CDS) Australia** | Commonwealth Scientific and Industrial Research Organisation | Regulated | Open Banking |
| **Singapore Financial Data Exchange** | Monetary Authority of Singapore (MAS) and the Smart Nation and Digital Government Group | Regulated | Open Banking |
| **Open API Framework for Hong Kong** | Hong Kong Monetary Authority | Hybrid | Open Banking |
| **BankID** | Swedish Initiative | Open Banking | Open Banking |

## BankID Special Analysis

BankID is an important element of the Swedish payment system and helps banks to maintain a high level of security. Although the BankID online identification and signature service was developed for banks, it is also used to log in to several public service portals and for online purchases from non-financial firms.

BankID uses a combination of hardware-based authentication (key fobs) and one-time-password generation for authentication. In the mobile environment, Mobile BankID is stored on a smartphone. BankID on card requires a card reader with a card connected to a PC. Users can set up a personal password linked to their BankID and use the same password every time to authenticate for a service. The mobile version is more frequently used. In addition, it is required for Swish.

Nordic banks are pushing a regional approach with the intent of creating a pan-Nordic cross-border infrastructure, P27, and a Nordic KYC utility.

In each case, the KYC information request is initiated by one of Invidem's clients. The request is "dressed" in data by Invidem using its KYC expertise and innovative technology solutions in cooperation with third-party data vendors. The client then reviews the case, which is then sent to the client's end customer for review, possible amendments and submission. Finally, the file is validated against Invidem's standards and sent to the client.

## Core Banking Services

### Payment Initiation Support

| Initiative | Supported | Additional Notes |
|------------|-----------|------------------|
| UK Open Banking Standard | ✓ | Full payment initiation capabilities |
| Open Finance Brasil | ✓ | Comprehensive payment services |
| NextGenPSD2 | ✓ | PSD2 compliant payment initiation |
| Open Wealth API | ✓ | Wealth-focused payment services |
| SFTI Mortgage API | ✓ | Mortgage-specific payments |
| Consumer Data Standards (CDS) Australia | ✓ | Government-mandated framework |
| Singapore Financial Data Exchange | ✗ | Not supported |
| Open API Framework for Hong Kong | ✓ | Hong Kong market specific |
| BankID | ✗ | Authentication-focused |

### Account Information Access

| Initiative | Supported | Additional Notes |
|------------|-----------|------------------|
| UK Open Banking Standard | ✓ | Comprehensive account data |
| Open Finance Brasil | ✓ | Full account information access |
| NextGenPSD2 | ✓ | PSD2 standard compliance |
| Open Wealth API | ✓ | Wealth account information |
| SFTI Mortgage API | ✓ | Mortgage account data |
| Consumer Data Standards (CDS) Australia | ✓ | Consumer Data Right framework |
| Singapore Financial Data Exchange | ✓ | Singapore-specific implementation |
| Open API Framework for Hong Kong | ✓ | Hong Kong regulatory framework |
| BankID | ✗ | Authentication service only |

## Open Finance Coverage

### Products and Services

| Product Type | UK | Brasil | PSD2 | Wealth | SFTI | Australia | Singapore | Hong Kong | BankID |
|--------------|----| -------|------|--------|------|-----------|-----------|-----------|--------|
| **Credit Cards** | ✓ | ✓ | ✓ | ✗ | ✗ | ✓ | ✗ | ✓ | ✗ |
| **Current Accounts** | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✗ | ✓ | ✗ |
| **Investments** | ✗ | ✗ | ✓ | ✓ | ✓ | ✗ | ✗ | ✓ | ✗ |
| **Lending** | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✗ | ✓ | ✗ |
| **Savings** | ✓ | ✗ | ✓ | ✗ | ✗ | ✓ | ✗ | ✓ | ✗ |
| **Wallets or Prepaid** | ✓ | ✗ | ✓ | ✗ | ✗ | ✗ | ✗ | ✓ | ✗ |
| **Insurance** | ✗ | ✓ | ✗ | ✗ | ✗ | ✗ | ✗ | ✓ | ✗ |
| **Pension** | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ | ✓ | ✗ |

### Extended Financial Services

| Service Type | UK | Brasil | PSD2 | Wealth | SFTI | Australia | Singapore | Hong Kong | BankID |
|--------------|----| -------|------|--------|------|-----------|-----------|-----------|--------|
| **Service Channels** | ✗ | ✓ | ✓ | ✓ | ✗ | ✗ | ✓ | ✗ | ✗ |
| **Capitalisation Bonds** | ✗ | ✓ | ✗ | ✓ | ✗ | ✗ | ✓ | ✗ | ✗ |
| **Exchange** | ✗ | ✓ | ✗ | ✗ | ✗ | ✗ | ✓ | ✗ | ✗ |
| **Accreditation** | ✗ | ✓ | ✓ | ✗ | ✗ | ✗ | ✓ | ✗ | ✗ |
| **Social Security** | ✗ | ✓ | ✗ | ✗ | ✗ | ✗ | ✓ | ✗ | ✗ |
| **Energy** | ✗ | ✗ | ✗ | ✗ | ✗ | ✓ | ✓ | ✗ | ✗ |
| **Utilities** | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ | ✓ | ✗ | ✗ |
| **Commercial Data** | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ | ✓ | ✗ |
| **Telecommunication** | ✗ | ✗ | ✗ | ✗ | ✗ | ✓ | ✗ | ✗ | ✗ |

## Open Data Coverage

| Initiative | Open Data Support | Specific Coverage |
|------------|-------------------|-------------------|
| UK Open Banking Standard | Open Data | Not applicable |
| Open Finance Brasil | Open Data | Not applicable |
| NextGenPSD2 | Not Specified | Not applicable |
| Open Wealth API | Open Data | Not applicable |
| SFTI Mortgage API | Open Data | Not applicable |
| Consumer Data Standards (CDS) Australia | Open Data | Energy & Teleco |
| Singapore Financial Data Exchange | Open Data | Energy & Utility data |
| Open API Framework for Hong Kong | Open Data | Commercial data |
| BankID | Open Data | Not applicable |

## Technical Implementation

### Consent Mechanisms

| Consent Type | UK | Brasil | PSD2 | Wealth | SFTI | Australia | Singapore | Hong Kong | BankID |
|--------------|----| -------|------|--------|------|-----------|-----------|-----------|--------|
| **App To App Redirect** | ✓ | ✓ | ✓ | ✗ | ✗ | ✓ | ✗ | ✗ | ✗ |
| **Browser Redirect** | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✗ |
| **Decoupled** | ✓ | ✓ | ✓ | ✗ | ✗ | ✓ | ✗ | ✗ | ✗ |
| **Embedded** | ✗ | ✗ | ✓ | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ |

### Security Models

| Security Standard | UK | Brasil | PSD2 | Wealth | SFTI | Australia | Singapore | Hong Kong | BankID |
|------------------|----| -------|------|--------|------|-----------|-----------|-----------|--------|
| **FAPI** | ✗ | ✓ | ✗ | ✓ | ✓ | ✓ | ✗ | ✗ | ✗ |
| **OAuth** | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✗ |
| **OIDC** | ✗ | ✓ | ✗ | ✗ | ✗ | ✓ | ✗ | ✓ | ✗ |
| **OpenID Connect** | ✓ | ✗ | ✓ | ✗ | ✗ | ✗ | ✓ | ✗ | ✗ |
| **QWACS & QSEALS** | ✗ | ✗ | ✓ | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ |
| **E-ID** | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ | ✓ | ✗ | ✗ |

## Account Information Services Detail

### Core Account Data

| Data Type | UK | Brasil | PSD2 | Wealth | SFTI | Australia | Singapore | Hong Kong | BankID |
|-----------|----| -------|------|--------|------|-----------|-----------|-----------|--------|
| **Accounts** | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✗ |
| **Balances** | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✗ |
| **Transactions** | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✗ | ✓ | ✗ |
| **Statements** | ✓ | ✗ | ✓ | ✓ | ✓ | ✓ | ✗ | ✓ | ✗ |

### Extended Account Information

| Data Type | UK | Brasil | PSD2 | Wealth | SFTI | Australia | Singapore | Hong Kong | BankID |
|-----------|----| -------|------|--------|------|-----------|-----------|-----------|--------|
| **Beneficiaries** | ✓ | ✓ | ✓ | ✗ | ✗ | ✗ | ✗ | ✓ | ✗ |
| **Cards** | ✗ | ✓ | ✓ | ✗ | ✗ | ✗ | ✓ | ✓ | ✗ |
| **Confirmation Of Funds** | ✓ | ✗ | ✓ | ✓ | ✗ | ✗ | ✗ | ✗ | ✗ |
| **Direct Debits** | ✓ | ✗ | ✓ | ✗ | ✗ | ✓ | ✗ | ✓ | ✗ |
| **Parties Or Contacts** | ✓ | ✓ | ✓ | ✗ | ✗ | ✓ | ✗ | ✓ | ✗ |
| **Standing Orders** | ✓ | ✗ | ✓ | ✓ | ✗ | ✗ | ✗ | ✗ | ✗ |

## Payment Initiation Services Detail

### Payment Types

| Payment Type | UK | Brasil | PSD2 | Wealth | SFTI | Australia | Singapore | Hong Kong | BankID |
|--------------|----| -------|------|--------|------|-----------|-----------|-----------|--------|
| **Bulk Payments** | ✓ | ✗ | ✓ | ✗ | ✓ | ✓ | ✗ | ✓ | ✗ |
| **Domestic Payments** | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✗ | ✓ | ✗ |
| **Domestic Scheduled Payments** | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✗ | ✓ | ✗ |
| **Domestic Standing Orders** | ✓ | ✗ | ✓ | ✓ | ✓ | ✓ | ✗ | ✓ | ✗ |
| **International Payments** | ✓ | ✗ | ✓ | ✗ | ✗ | ✓ | ✗ | ✓ | ✗ |
| **International Scheduled Payments** | ✓ | ✗ | ✓ | ✗ | ✗ | ✓ | ✗ | ✓ | ✗ |
| **International Standing Orders** | ✓ | ✗ | ✓ | ✗ | ✗ | ✓ | ✗ | ✓ | ✗ |
| **File Payments** | ✓ | ✗ | ✓ | ✗ | ✗ | ✓ | ✗ | ✓ | ✗ |

## Governance Models

### Regulatory Framework

| Initiative | Governance Model | Regulatory Authority |
|------------|------------------|---------------------|
| **UK Open Banking Standard** | Regulator-mandated via OBIE | Open Banking Implementation Entity |
| **Open Finance Brasil** | Central Bank-regulated framework | Brazilian Central Bank |
| **NextGenPSD2** | Collaborative industry-led model | European Banking Authority (EBA) |
| **Open Wealth API** | Collaborative industry-led model | Open Wealth Association |
| **SFTI Mortgage API** | Collaborative industry-led model | Swiss Fintech Innovations |
| **Consumer Data Standards (CDS) Australia** | Government-legislated Consumer Data Right | Australian Competition and Consumer Commission |
| **Singapore Financial Data Exchange** | Regulator-led collaboration with industry | Monetary Authority of Singapore |
| **Open API Framework for Hong Kong** | Regulatory guidelines by HKMA | Hong Kong Monetary Authority |
| **BankID** | Industry-led consortium | Swedish banking industry |

## Technical Architecture

### Architectural Style

| Style | UK | Brasil | PSD2 | Wealth | SFTI | Australia | Singapore | Hong Kong | BankID |
|-------|----| -------|------|--------|------|-----------|-----------|-----------|--------|
| **REST** | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| **SOAP** | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ |

### Data Standards

| Standard | UK | Brasil | PSD2 | Wealth | SFTI | Australia | Singapore | Hong Kong | BankID |
|----------|----| -------|------|--------|------|-----------|-----------|-----------|--------|
| **ISO 20022** | ✗ | ✓ | ✓ | ✗ | ✗ | ✓ | ✗ | ✗ | ✗ |
| **Proprietary** | ✓ | ✗ | ✗ | ✓ | ✓ | ✗ | ✓ | ✓ | ✓ |

### Data Format

| Format | UK | Brasil | PSD2 | Wealth | SFTI | Australia | Singapore | Hong Kong | BankID |
|--------|----| -------|------|--------|------|-----------|-----------|-----------|--------|
| **JSON** | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✗ |
| **XML** | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ | ✓ |

## KYC Data Sharing

### KYC Capabilities

| Initiative | KYC Support | Implementation Details |
|------------|-------------|----------------------|
| **UK Open Banking Standard** | ✗ | Out of scope |
| **Open Finance Brasil** | ✓ | Möglichkeit sollte bestehen |
| **NextGenPSD2** | ✗ | Out of scope |
| **Open Wealth API** | ✓ | Über Customer Management API |
| **SFTI Mortgage API** | Not specified | No information available |
| **Consumer Data Standards (CDS) Australia** | ✗ | Nicht vorgesehen |
| **Singapore Financial Data Exchange** | ✗ | Nicht vorgesehen |
| **Open API Framework for Hong Kong** | ✓ | Möglichkeit sollte bestehen |
| **BankID** | ✗ | Authentication service only |

### KYC Data Types

| Initiative | KYC Data Type | Additional Notes |
|------------|---------------|------------------|
| **UK Open Banking Standard** | Not applicable | Outside current scope |
| **Open Finance Brasil** | Nicht verifizierbar | Verification status unclear |
| **NextGenPSD2** | Not applicable | PSD2 focus on payments |
| **Open Wealth API** | Siehe Powerpoint | Detailed in presentation materials |
| **SFTI Mortgage API** | Not specified | No current implementation |
| **Consumer Data Standards (CDS) Australia** | Not applicable | Consumer data focus |
| **Singapore Financial Data Exchange** | Not applicable | Financial data exchange only |
| **Open API Framework for Hong Kong** | Ab 2019/2020 als KYC-/Authentication-as-a-Service vorgesehen – verliert jedoch an Dynamik. Nicht weiter verifizierbar. | Originally planned for 2019/2020 as KYC/Authentication-as-a-Service but losing momentum, not further verifiable |
| **BankID** | Not applicable | Authentication service |

## Market Maturity Analysis

### Implementation Status

| Initiative | Current Status | Market Adoption |
|------------|----------------|-----------------|
| **UK Open Banking Standard** | Fully operational | High adoption, mandatory for major banks |
| **Open Finance Brasil** | Operational | Regulated rollout in progress |
| **NextGenPSD2** | Widely implemented | EU-wide implementation |
| **Open Wealth API** | Industry standard | Growing adoption in wealth management |
| **SFTI Mortgage API** | Development phase | Swiss market specific |
| **Consumer Data Standards (CDS) Australia** | Operational | Government-mandated implementation |
| **Singapore Financial Data Exchange** | Early implementation | Regulator-led pilot programs |
| **Open API Framework for Hong Kong** | Guidelines published | Voluntary adoption |
| **BankID** | Mature system | Dominant in Nordic markets |

## Regional Considerations

### European Union (NextGenPSD2)
- Compliance with PSD2 directive requirements
- Strong focus on payment services
- QWACS and QSEALS certificate requirements
- Mature regulatory framework

### United Kingdom (Open Banking)
- Post-Brexit independent framework
- Comprehensive open banking implementation
- Strong regulatory oversight through OBIE
- Focus on competition and innovation

### Americas (Open Finance Brasil)
- Central bank-driven initiative
- Comprehensive financial services coverage
- Strong security requirements (FAPI)
- Phased implementation approach

### Asia-Pacific Region
#### Australia (Consumer Data Standards)
- Government-legislated Consumer Data Right
- Broad sectoral approach beyond banking
- Strong privacy and security framework
- Energy and telecommunications inclusion

#### Singapore (Financial Data Exchange)
- MAS-led regulatory approach
- Focus on innovation and fintech
- Smart nation digital government integration
- Pilot-based implementation

#### Hong Kong (Open API Framework)
- HKMA regulatory guidelines
- Hybrid approach (regulatory + market-driven)
- Focus on international financial hub status
- Voluntary but encouraged adoption

### Nordic Region (BankID)
- Regional pan-Nordic approach
- Strong authentication focus
- Mobile-first implementation
- Integration with payment systems (Swish)

## Key Findings and Recommendations

### Regulatory Approaches
1. **Regulated frameworks** (UK, Brasil, Australia, Singapore) show faster adoption
2. **Market-driven approaches** (Open Wealth, SFTI) allow more flexibility but slower uptake
3. **Hybrid models** (Hong Kong) balance innovation with regulatory oversight

### Technical Standards
1. **OAuth 2.0** is universally adopted across all initiatives
2. **FAPI** adoption varies, with Brasil, Australia, and wealth management leading
3. **JSON** format dominates over XML for API responses
4. **ISO 20022** gaining traction for payment messaging

### Service Coverage
1. **Core banking services** (accounts, payments) are universally covered
2. **Open Finance** expansion varies significantly by jurisdiction
3. **KYC data sharing** remains limited and jurisdiction-specific
4. **Cross-border interoperability** is not yet standardized

### Success Factors
1. Clear regulatory mandate accelerates adoption
2. Industry collaboration essential for technical standards
3. Security frameworks must balance innovation with protection
4. Phased implementation reduces complexity and risk

## Implications for Swiss Open Banking Standard

Based on this analysis, the Swiss national standard should consider:

1. **Hybrid governance model** combining regulatory framework with industry collaboration
2. **FAPI security standards** for enhanced protection
3. **ISO 20022 messaging** for payment services alignment
4. **Comprehensive service scope** including wealth management capabilities
5. **KYC data sharing provisions** for enhanced customer experience
6. **Cross-border interoperability** with EU and UK frameworks
7. **Mobile-first authentication** following Nordic best practices

## Data Sources and Methodology

This analysis is based on:
- Official documentation from each initiative
- Regulatory publications and guidelines
- Industry implementation reports
- Technical specification documents
- Market adoption statistics
- Cross-reference verification across multiple sources

**Analysis Date**: March 24, 2025
**Document Version**: 1.0
**Classification**: Professional Working Document