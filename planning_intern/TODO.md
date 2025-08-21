# TODOs 

!!Read this file in detail to understand the tasks that need to be completed, the guidelines to follow and references to cosider, and the expected outcomes!!

## General Guidelines
- Analyze all relevant context thouroughly before starting any task.
- If you are even unsure about any task, ask for clarification.
- This project will serve as a core reference and is the foundation of developing a swiss open banking standard with the goal of creating a cross-industry standard for customer data sharing: the Open API Kundenbeziehung. Thus, it is crucial to ensure that all tasks are completed with the highest quality and attention to detail.

**Guidelines for professionalism:**
- this project represents the Open Banking Project Team as well as the Business Engineering Institute of the University of St. Gallen: work from a professional perspective keeping in mind that this is a research project and a core reference for the future of Open Banking in Switzerland
- everything should be written in a professional and coherent manner, avoiding any personal opinions or informal language
- ABSOLUTELY NO EMOJIS OR SLANG, use professional language only
- for german content: use "Ecosystem" instead of "Ökosystem" and "ss" instead of "ß" (we are swiss not german!!)
- differentiate between the documentation from a professional and theoretical perspective (especially Fachliche Conclusions) and the practical implementation and documentation from a practical and developer perspective

## Tasks
**Context Demo**: Fix the following issues in the context demo:
[] General Improvements:
  - directly open the demo in the browser without first showing the directory listing (update instructions in README.md)
  - graphics are not displayed at all (e.g. icons, background images, etc.) is there a way to fix this?
  - in the top banner use a color color gradient from primary to secondary color instead
[] Referenzprozess:
  - Icons (pictograms) are not displayed at all
  - Numbering of the steps: Just use 1. 2. 3. etc. instead of circle in top right corner
  - behind the main 10 blocks add the 4 sections of the Referenzprozess (just boxes encapsulating the corresponding steps like a background graphic with the name of the section centered at the top)
[] Consent Flow:
    - Icons (pictograms) are not displayed at all
  - actually implement the flow as visualized in the mermaid diagram ('api/demo/work-in-progress/consent_security/demo-3-consent-security-flow.html' has the right approach for the visualization, but the content is not correct - it will help you to understand my vision of how I want to visualize flows like this in general)
  - keep the 4 phases of the consent flow and add them to new visualization approach
  
[] Data Onboarding Process:
  - implement a categorized data onboarding process with step-by-step appearance of data fields
  - ensure that the data onboarding process is intuitive and user-friendly
[] API Console Output:
  - simulate API calls and system responses effectively
  - ensure that the console output is clear and informative