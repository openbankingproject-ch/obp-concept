### Specific Demos: (work in progress)
**!!ignore for now, the demos for each specific process/flow/use case will be completed later!!**

**!! DO NOT USE EXISTING DEMOS AS REFERENCE AS THEY ARE OUTDATED!!**
The current demos do not visualize the processes/flows at all. I have created a simplified version of the referenzprozess demo in HTML that visualizes the 10 step Referenzprozess. Analogue to that, create simplified demos for the other use cases and processes as listed below.  Use context listed under **Demos Context**.

[] delete all existing .js demo files in the api directory
[] leave the description files as basis for the new demos
[] complete collection of demos visualizing all processes/flows/use cases seperately in the api/demo directory (in corresponding subdirectories):
    - **Demo 1: Referenzprozess**: basic functionality of the Open API Kundenbeziehung shown through the 10 step Referenzprozess
        - **Demo 1.1: Use Case Kundenbeziehungseröffnung**: Show the 10 step Referenzprozess for the use case of Kundenbeziehungseröffnung
        - **Demo 1.2: Use Case Re-Identifikation**: Show the 10 step Referenzprozess for the use case of Re-Identifikation
        - **Demo 1.3: Use Case Altersverifikation**: Show the 10 step Referenzprozess for the use case of Altersverifikation
        - **Demo 1.4: Use Case CLM von EVV-Endkunden**: Show the 10 step Referenzprozess for the use case of CLM von EVV-Endkunden
    - **Demo 2: Daten Onboarding und Pflege**: Show the functionality of the Open API Kundenbeziehung for Daten Onboarding und Pflege
    - **Demo 3: Consent and Security Flow**: Show the Consent and Security Flow of the Open API Kundenbeziehung
    - **Demo 4: Verification Process**: Show the Verification Process of the Open API Kundenbeziehung
    - **Demo 5: MVP Implementation**: Show the MVP implementation of the Open API Kundenbeziehung
[] For each demo: HTML file that visualizes the flow and functionality to be shown 
[] main landing page (for when running on localhost): where all demos are listed with a short description and a link to the respective demo file (e.g. "api/demo/index.html")
    - The main landing page should be visually appealing and provide an overview of the demos
    - Each demo should have a link to the respective demo file and a short description of the demo
- Update the DEMO-INSTRUCTIONS.md file with the new demos and their descriptions and links to the demo files as well as the demo description files after each change in the demos