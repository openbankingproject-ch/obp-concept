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
  - python script serve_demo.py is buggy - browser freezes and sometimes does not load the demo at all
  - ensure that cleanup of the demo is done properly after each run
[] Referenzprozess:
  - Icons (pictograms) are not displayed at all
  - Numbering of the 10 main steps: Add the numbering to the Step names (like "1. Initialisierung") instead of the current numbering in the boxes
  - 4 Phases: 

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