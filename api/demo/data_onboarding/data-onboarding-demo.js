/**
 * Demo 2: Daten Onboarding und Pflege
 * 
 * Demonstrates the comprehensive data onboarding and maintenance functionality
 * of the Open API Kundenbeziehung framework, including data quality management,
 * lifecycle control, and compliance monitoring.
 * 
 * This demo showcases:
 * - Customer data onboarding process
 * - Data quality validation and enrichment
 * - Data lifecycle management
 * - Compliance monitoring and reporting
 * - Cross-system data synchronization
 * 
 * Target audience: Financial industry professionals with theoretical and
 * professional background but not necessarily deep technical API knowledge.
 */

const axios = require('axios');
const chalk = require('chalk');

// Configuration
const API_BASE_URL = process.env.API_BASE_URL || 'http://localhost:3000';
const DEMO_SPEED = process.env.DEMO_SPEED || 'normal';
const DEBUG = process.env.DEBUG === 'true';

// Demo timing configuration
const TIMING = {
    fast: { step: 500, pause: 1000, long: 2000 },
    normal: { step: 1500, pause: 3000, long: 5000 },
    slow: { step: 3000, pause: 5000, long: 8000 }
}[DEMO_SPEED];

// Utility functions
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const log = {
    title: (text) => console.log(chalk.cyan.bold(`\n${text}`)),
    subtitle: (text) => console.log(chalk.blue.bold(`\n${text}`)),
    step: (text) => console.log(chalk.yellow(`→ ${text}`)),
    success: (text) => console.log(chalk.green(`✓ ${text}`)),
    warning: (text) => console.log(chalk.orange(`⚠ ${text}`)),
    error: (text) => console.log(chalk.red(`✗ ${text}`)),
    info: (text) => console.log(chalk.white(`  ${text}`)),
    metric: (label, value, unit = '') => console.log(chalk.cyan(`  ${label}: ${chalk.white.bold(value)}${unit}`)),
    separator: () => console.log(chalk.gray('─'.repeat(60)))
};

const debugLog = (message, data = null) => {
    if (DEBUG) {
        console.log(chalk.gray(`[DEBUG] ${message}`));
        if (data) console.log(chalk.gray(JSON.stringify(data, null, 2)));
    }
};

// API interaction functions
async function callAPI(endpoint, method = 'GET', data = null) {
    try {
        const config = {
            method,
            url: `${API_BASE_URL}${endpoint}`,
            headers: {
                'Content-Type': 'application/json',
                'User-Agent': 'Data-Onboarding-Demo/1.0'
            }
        };
        
        if (data) config.data = data;
        
        debugLog(`API Call: ${method} ${endpoint}`, data);
        const response = await axios(config);
        debugLog(`API Response:`, response.data);
        
        return response.data;
    } catch (error) {
        debugLog(`API Error:`, error.response?.data || error.message);
        return { 
            error: true, 
            message: error.response?.data?.message || error.message,
            status: error.response?.status 
        };
    }
}

// Demo scenario data
const CUSTOMER_DATA_SCENARIOS = {
    incomplete: {
        customerId: 'demo-customer-001',
        personalData: {
            firstName: 'Max',
            lastName: 'Mustermann',
            // Missing dateOfBirth, nationality
        },
        contactData: {
            email: 'max.mustermann@example.com'
            // Missing phone, address
        },
        dataQuality: 35,
        completeness: 40,
        status: 'incomplete'
    },
    enriched: {
        customerId: 'demo-customer-001',
        personalData: {
            firstName: 'Max',
            lastName: 'Mustermann',
            dateOfBirth: '1985-03-15',
            nationality: 'CH',
            placeOfBirth: 'Zurich'
        },
        contactData: {
            email: 'max.mustermann@example.com',
            phone: '+41 44 123 45 67',
            address: {
                street: 'Bahnhofstrasse 1',
                city: 'Zurich',
                postalCode: '8001',
                country: 'CH'
            }
        },
        identificationData: {
            documentType: 'passport',
            documentNumber: 'P1234567',
            issuingAuthority: 'Swiss Federal Government',
            expiryDate: '2028-03-15',
            verificationLevel: 'high'
        },
        dataQuality: 95,
        completeness: 98,
        status: 'verified'
    }
};

const DATA_SOURCES = [
    { name: 'Government Identity Service', type: 'official', reliability: 98 },
    { name: 'Credit Bureau', type: 'financial', reliability: 94 },
    { name: 'Address Validation Service', type: 'utility', reliability: 92 },
    { name: 'Phone Verification Service', type: 'communication', reliability: 89 }
];

// Main demo functions
async function showDemoIntroduction() {
    log.title('══════════════════════════════════════════════════════════════');
    log.title('  Demo 2: Daten Onboarding und Pflege');
    log.title('  Open API Kundenbeziehung - Data Lifecycle Management');
    log.title('══════════════════════════════════════════════════════════════');
    
    await sleep(TIMING.pause);
    
    log.info('This demonstration showcases the comprehensive data onboarding');
    log.info('and maintenance capabilities of the Open API Kundenbeziehung framework.');
    log.info('');
    log.info('Key aspects covered:');
    log.info('• Customer data onboarding with quality assessment');
    log.info('• Automated data enrichment from trusted sources');
    log.info('• Real-time data quality monitoring');
    log.info('• Compliance validation and reporting');
    log.info('• Cross-system synchronization');
    log.info('• Data lifecycle management');
    
    await sleep(TIMING.long);
}

async function demonstrateDataOnboarding() {
    log.subtitle('Phase 1: Initial Data Onboarding');
    log.separator();
    
    await sleep(TIMING.step);
    
    // Simulate receiving incomplete customer data
    log.step('Receiving initial customer data from registration form...');
    await sleep(TIMING.step);
    
    const initialData = CUSTOMER_DATA_SCENARIOS.incomplete;
    log.info(`Customer ID: ${initialData.customerId}`);
    log.info(`Name: ${initialData.personalData.firstName} ${initialData.personalData.lastName}`);
    log.info(`Email: ${initialData.contactData.email}`);
    
    await sleep(TIMING.step);
    
    // Data quality assessment
    log.step('Performing initial data quality assessment...');
    const qualityResult = await callAPI('/v1/customer/data-quality', 'POST', {
        customerId: initialData.customerId,
        data: initialData
    });
    
    await sleep(TIMING.step);
    
    if (!qualityResult.error) {
        log.warning(`Data Quality Score: ${initialData.dataQuality}%`);
        log.warning(`Data Completeness: ${initialData.completeness}%`);
        log.info('Issues identified:');
        log.info('  - Missing date of birth');
        log.info('  - Missing nationality');
        log.info('  - Missing phone number');
        log.info('  - Missing address information');
        log.info('  - No identity verification documents');
    }
    
    await sleep(TIMING.pause);
    
    // Show data gaps
    log.warning('Data quality below acceptable threshold (>80%)');
    log.step('Initiating automated data enrichment process...');
    
    await sleep(TIMING.step);
}

async function demonstrateDataEnrichment() {
    log.subtitle('Phase 2: Automated Data Enrichment');
    log.separator();
    
    await sleep(TIMING.step);
    
    // Query available data sources
    log.step('Querying available data sources...');
    await sleep(TIMING.step);
    
    DATA_SOURCES.forEach(source => {
        log.info(`  Found: ${source.name} (${source.type}) - Reliability: ${source.reliability}%`);
    });
    
    await sleep(TIMING.step);
    
    // Simulate data enrichment from multiple sources
    log.step('Enriching customer data from trusted sources...');
    
    for (const source of DATA_SOURCES) {
        await sleep(TIMING.step);
        log.step(`Querying ${source.name}...`);
        
        // Simulate API calls to external data sources
        const enrichmentResult = await callAPI('/v1/customer/enrich', 'POST', {
            customerId: 'demo-customer-001',
            source: source.name,
            type: source.type
        });
        
        await sleep(TIMING.step * 0.5);
        
        if (!enrichmentResult.error) {
            log.success(`Data retrieved from ${source.name}`);
            
            // Show specific enrichment based on source type
            switch (source.type) {
                case 'official':
                    log.info('  → Date of birth: 1985-03-15');
                    log.info('  → Nationality: Swiss (CH)');
                    log.info('  → Place of birth: Zurich');
                    break;
                case 'financial':
                    log.info('  → Credit score: 720 (Good)');
                    log.info('  → Financial history: 8 years');
                    break;
                case 'utility':
                    log.info('  → Address: Bahnhofstrasse 1, 8001 Zurich');
                    log.info('  → Address validation: Confirmed');
                    break;
                case 'communication':
                    log.info('  → Phone: +41 44 123 45 67');
                    log.info('  → Phone validation: Active');
                    break;
            }
        } else {
            log.warning(`Could not retrieve data from ${source.name}`);
        }
        
        await sleep(TIMING.step * 0.3);
    }
    
    await sleep(TIMING.pause);
    
    // Show improved data quality
    log.step('Recalculating data quality metrics...');
    await sleep(TIMING.step);
    
    const enrichedData = CUSTOMER_DATA_SCENARIOS.enriched;
    log.success('Data enrichment completed successfully!');
    log.metric('Data Quality Score', `${enrichedData.dataQuality}%`, ' (↑ +60%)');
    log.metric('Data Completeness', `${enrichedData.completeness}%`, ' (↑ +58%)');
    log.metric('Verification Level', enrichedData.identificationData.verificationLevel);
    
    await sleep(TIMING.pause);
}

async function demonstrateDataValidation() {
    log.subtitle('Phase 3: Data Validation and Compliance');
    log.separator();
    
    await sleep(TIMING.step);
    
    // Compliance validation
    log.step('Performing comprehensive compliance validation...');
    
    const complianceChecks = [
        { rule: 'GDPR Data Minimization', status: 'passed', details: 'Only necessary data collected' },
        { rule: 'Swiss Data Protection Act', status: 'passed', details: 'Consent properly documented' },
        { rule: 'AML/KYC Requirements', status: 'passed', details: 'Identity verification completed' },
        { rule: 'MiFID II Customer Assessment', status: 'passed', details: 'Financial profile adequate' },
        { rule: 'Basel III Data Quality', status: 'passed', details: 'Data quality >95%' }
    ];
    
    for (const check of complianceChecks) {
        await sleep(TIMING.step * 0.7);
        
        const complianceResult = await callAPI('/v1/compliance/validate', 'POST', {
            customerId: 'demo-customer-001',
            rule: check.rule,
            data: CUSTOMER_DATA_SCENARIOS.enriched
        });
        
        if (!complianceResult.error && check.status === 'passed') {
            log.success(`${check.rule}: ${check.status.toUpperCase()}`);
            log.info(`  Details: ${check.details}`);
        } else {
            log.warning(`${check.rule}: REVIEW REQUIRED`);
        }
    }
    
    await sleep(TIMING.pause);
    
    // Data consistency validation
    log.step('Validating data consistency across systems...');
    await sleep(TIMING.step);
    
    const consistencyResult = await callAPI('/v1/customer/consistency-check', 'POST', {
        customerId: 'demo-customer-001'
    });
    
    if (!consistencyResult.error) {
        log.success('Cross-system consistency validated');
        log.info('  - Core Banking System: ✓ Synchronized');
        log.info('  - Risk Management System: ✓ Synchronized'); 
        log.info('  - Compliance Database: ✓ Synchronized');
        log.info('  - Customer Portal: ✓ Synchronized');
    }
    
    await sleep(TIMING.pause);
}

async function demonstrateDataMaintenance() {
    log.subtitle('Phase 4: Ongoing Data Maintenance');
    log.separator();
    
    await sleep(TIMING.step);
    
    // Show data lifecycle management
    log.step('Implementing automated data maintenance policies...');
    await sleep(TIMING.step);
    
    const maintenancePolicies = [
        { 
            name: 'Periodic Data Refresh',
            frequency: 'Monthly',
            description: 'Automatic refresh from authoritative sources',
            nextExecution: '2024-01-15'
        },
        {
            name: 'Data Quality Monitoring',
            frequency: 'Real-time',
            description: 'Continuous monitoring of data degradation',
            threshold: '80%'
        },
        {
            name: 'Compliance Review',
            frequency: 'Quarterly',
            description: 'Regulatory compliance validation',
            nextExecution: '2024-03-31'
        },
        {
            name: 'Data Retention Management',
            frequency: 'Annual',
            description: 'Automated data archival and deletion',
            retentionPeriod: '10 years'
        }
    ];
    
    maintenancePolicies.forEach(policy => {
        log.info(`Policy: ${policy.name}`);
        log.info(`  Frequency: ${policy.frequency}`);
        log.info(`  Description: ${policy.description}`);
        if (policy.nextExecution) {
            log.info(`  Next Execution: ${policy.nextExecution}`);
        }
        if (policy.threshold) {
            log.info(`  Threshold: ${policy.threshold}`);
        }
        if (policy.retentionPeriod) {
            log.info(`  Retention: ${policy.retentionPeriod}`);
        }
        log.info('');
    });
    
    await sleep(TIMING.pause);
    
    // Simulate data change detection
    log.step('Simulating real-time data change detection...');
    await sleep(TIMING.step);
    
    log.warning('Change detected: Customer address update from external source');
    log.info('  Previous: Bahnhofstrasse 1, 8001 Zurich');
    log.info('  New: Paradeplatz 8, 8001 Zurich');
    log.info('  Source: Swiss Post Address Service');
    log.info('  Confidence: 96%');
    
    await sleep(TIMING.step);
    
    const changeResult = await callAPI('/v1/customer/process-change', 'POST', {
        customerId: 'demo-customer-001',
        changeType: 'address_update',
        oldValue: 'Bahnhofstrasse 1, 8001 Zurich',
        newValue: 'Paradeplatz 8, 8001 Zurich',
        source: 'Swiss Post Address Service',
        confidence: 96
    });
    
    if (!changeResult.error) {
        log.success('Address change validated and applied');
        log.info('  - Customer notification sent');
        log.info('  - All connected systems updated');
        log.info('  - Audit trail recorded');
    }
    
    await sleep(TIMING.pause);
}

async function demonstrateReporting() {
    log.subtitle('Phase 5: Data Quality Reporting and Analytics');
    log.separator();
    
    await sleep(TIMING.step);
    
    log.step('Generating data quality dashboard...');
    await sleep(TIMING.step);
    
    // Simulate dashboard metrics
    const dashboardMetrics = {
        totalCustomers: 12847,
        dataQualityAverage: 92.3,
        completenessAverage: 89.7,
        complianceRate: 98.9,
        enrichmentSources: 7,
        dailyUpdates: 234,
        maintenanceTasks: 12
    };
    
    log.success('Data Quality Dashboard Generated');
    log.separator();
    
    log.metric('Total Customer Records', dashboardMetrics.totalCustomers.toLocaleString());
    log.metric('Average Data Quality', `${dashboardMetrics.dataQualityAverage}%`);
    log.metric('Average Completeness', `${dashboardMetrics.completenessAverage}%`);
    log.metric('Compliance Rate', `${dashboardMetrics.complianceRate}%`);
    log.metric('Active Data Sources', dashboardMetrics.enrichmentSources);
    log.metric('Daily Updates Processed', dashboardMetrics.dailyUpdates);
    log.metric('Maintenance Tasks', dashboardMetrics.maintenanceTasks);
    
    await sleep(TIMING.pause);
    
    // Show trend analysis
    log.step('Analyzing data quality trends...');
    await sleep(TIMING.step);
    
    log.info('Data Quality Trends (Last 6 Months):');
    log.success('  → Overall quality improved by 8.4%');
    log.success('  → Compliance violations reduced by 67%');
    log.success('  → Data completeness increased by 12.1%');
    log.success('  → Automated enrichment success rate: 94.2%');
    
    await sleep(TIMING.pause);
    
    // Regulatory reporting
    log.step('Preparing regulatory compliance reports...');
    await sleep(TIMING.step);
    
    const reportingResult = await callAPI('/v1/reporting/compliance', 'GET', {
        period: 'monthly',
        regulations: ['GDPR', 'Swiss DPA', 'Basel III']
    });
    
    if (!reportingResult.error) {
        log.success('Regulatory reports generated');
        log.info('  - GDPR Compliance Report: Ready');
        log.info('  - Swiss Data Protection Act Report: Ready');
        log.info('  - Basel III Data Governance Report: Ready');
        log.info('  - All reports automatically submitted to authorities');
    }
    
    await sleep(TIMING.pause);
}

async function showBusinessImpact() {
    log.subtitle('Business Impact Analysis');
    log.separator();
    
    await sleep(TIMING.step);
    
    log.info('Traditional Manual Data Management vs API-Based Automated System:');
    log.separator();
    
    // Traditional approach simulation
    log.step('Traditional Approach (Manual Process):');
    await sleep(TIMING.step);
    log.warning('  Data Collection: 45 minutes per customer');
    log.warning('  Manual Validation: 30 minutes per customer');
    log.warning('  Compliance Check: 20 minutes per customer');
    log.warning('  Data Entry: 15 minutes per customer');
    log.warning('  Quality Assurance: 25 minutes per customer');
    log.warning('  Total Time: 135 minutes per customer');
    log.warning('  Error Rate: ~15%');
    log.warning('  Compliance Risk: High');
    
    await sleep(TIMING.pause);
    
    // API-based approach
    log.step('API-Based Automated System:');
    await sleep(TIMING.step);
    log.success('  Automated Data Collection: 2 minutes');
    log.success('  Automated Enrichment: 3 minutes');
    log.success('  Compliance Validation: 1 minute');
    log.success('  Quality Assessment: 1 minute');
    log.success('  System Integration: 1 minute');
    log.success('  Total Time: 8 minutes per customer');
    log.success('  Error Rate: ~2%');
    log.success('  Compliance Risk: Low');
    
    await sleep(TIMING.pause);
    
    // Calculate improvements
    log.success('Efficiency Improvements:');
    log.metric('Time Reduction', '94%', ' (127 minutes saved per customer)');
    log.metric('Error Reduction', '87%', ' (from 15% to 2%)');
    log.metric('Cost Savings', '€89', ' per customer onboarding');
    log.metric('Compliance Risk Reduction', '78%', ' (automated validation)');
    log.metric('Data Quality Improvement', '+47%', ' (through enrichment)');
    
    await sleep(TIMING.long);
}

async function showDemoConclusion() {
    log.title('Demo Conclusion - Data Onboarding and Maintenance');
    log.separator();
    
    await sleep(TIMING.step);
    
    log.success('Successfully demonstrated comprehensive data lifecycle management');
    log.info('');
    log.info('Key capabilities showcased:');
    log.success('  ✓ Automated data quality assessment');
    log.success('  ✓ Multi-source data enrichment');
    log.success('  ✓ Real-time compliance validation');
    log.success('  ✓ Cross-system synchronization');
    log.success('  ✓ Proactive maintenance policies');
    log.success('  ✓ Advanced analytics and reporting');
    
    await sleep(TIMING.pause);
    
    log.info('Business Value Delivered:');
    log.metric('Operational Efficiency', '+94%');
    log.metric('Data Quality', '+47%');
    log.metric('Compliance Assurance', 'Automated');
    log.metric('Cost Reduction', '€89/customer');
    
    await sleep(TIMING.pause);
    
    log.info('The Open API Kundenbeziehung framework provides a comprehensive');
    log.info('solution for modern data lifecycle management, ensuring high-quality,');
    log.info('compliant, and efficiently maintained customer data across all');
    log.info('financial service providers.');
    
    await sleep(TIMING.step);
}

// Main execution
async function runDemo() {
    try {
        // Check API connectivity
        log.step('Checking API server connectivity...');
        const healthCheck = await callAPI('/health');
        
        if (healthCheck.error) {
            log.error('Cannot connect to API server. Please ensure the server is running.');
            log.info(`Expected API URL: ${API_BASE_URL}`);
            log.info('Start server with: cd api && npm start');
            process.exit(1);
        }
        
        log.success('API server connected successfully');
        
        // Run demo phases
        await showDemoIntroduction();
        await demonstrateDataOnboarding();
        await demonstrateDataEnrichment();
        await demonstrateDataValidation();
        await demonstrateDataMaintenance();
        await demonstrateReporting();
        await showBusinessImpact();
        await showDemoConclusion();
        
    } catch (error) {
        log.error(`Demo execution failed: ${error.message}`);
        if (DEBUG) {
            console.error(error.stack);
        }
        process.exit(1);
    }
}

// Execute the demo
if (require.main === module) {
    runDemo();
}