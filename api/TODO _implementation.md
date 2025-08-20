# TODOs for the Implementation of the Open API Kundenbeziehung

------------

## Guidelines and Context
reference for all tasks in the following sections!!

**General guidelines for the content:**
- Generic and modular design of an Open API Kundenbeziehung that can be extended and adapted to different use cases and requirements in all Ecosystems
- Alpha version that can be evolved into a swiss standard for Open API Kundenbeziehung to manage customer data in and between all Ecosystems
- Implementation must be coherent with the content of the Conclusions in the directory `documentation/Fachliche Conclusions Open API Kundenbeziehung`
- professional and coherent implementation of the Open API Kundenbeziehung that can be used in real-world applications
- no unnecessary complexity, keep it simple and coherent with the conclusions
- simple and concise documenation within the code files
- absolutely no emojis!!!

**Requirements:**
- Reference files: 
    - `documentation/Fachliche Conclusions Open API Kundenbeziehung/02 Anforderungen.md`
    - `documentation/Fachliche Conclusions Open API Kundenbeziehung/06 Consent und Security Flow.md`
- The implementation must meet the requirements defined 

**Standards and Technologies:**
- Reference files: 
    - `documentation/Fachliche Conclusions Open API Kundenbeziehung/01 Marktanalyse.md`
    - `documentation/Fachliche Conclusions Open API Kundenbeziehung/06 Consent und Security Flow.md`
- Implementation must use the standards and technologies that we chose 

**Core Functionality: Process, Modular Design and Data:**
- Reference files: 
    - `documentation/Fachliche Conclusions Open API Kundenbeziehung/03 Referenzprozess.md` 
    - `documentation/Fachliche Conclusions Open API Kundenbeziehung/04 API Endpoint Design.md`
- Modular design coherent with the 10 step Referenzprozess
- Data model and endpoints coherent with the content of the files (In doubt verify with me whether the implementation or the conclusion should be adapted)
- As described in the conclusions 03 and 04, create a generic "core" API using only the "Basisdaten" that can be extended with "Erweiterte Daten" depending on the use case or Ecosystem
- Ensure that the API design is flexible enough to accommodate future changes and enhancements without significant overhauls 

**Roles and Architecture:**
- Reference files: 
    - `documentation/Fachliche Conclusions Open API Kundenbeziehung/02 Anforderungen.md`
    - `documentation/Fachliche Conclusions Open API Kundenbeziehung/05 Vertrauensnetzwerk.md`
- The implementation must support the roles defined in the conclusions
- The generic core implementation must support the architecture and logic of Zielbilder 1-4 (not Zielbild 5) 
    - for MVP and other specific implementations of the Alpha Version: "Zielbild 1: Direkt"
- The generic core implementation must support the architecture and logic of the different "Vertrauensnetzwerke" (not centralized)
    - for MVP and other specific implementations of the Alpha Version: "Vertrauensnetzwerk 1: Dezenttrale Architektur(Peer-to-Peer)"

**Consent and Security:**
- Reference files: 
    - `documentation/Fachliche Conclusions Open API Kundenbeziehung/06 Consent und Security Flow.md`
- The implementation must be coherent with the consent and security flows defined in the conclusions

**Testing and Verification:**
- Reference files: 
    - `documentation/Fachliche Conclusions Open API Kundenbeziehung/08 Testing und Verifikation.md`
- Base the testing framework on the requirements and scenarios defined in the conclusion

----------

## Implementation

**Generic Core Implementation:**
- Create a generic core implementation of the Open API Kundenbeziehung that can be extended and adapted
- The generic core implementation must be coherent with the content of the conclusions and the requirements (follow Guidelines and Context)
- Verify that all of the current core implementation is coherent with the conclusions and the requirements, if not adapt the implementation accordingly

**Specific Implementations:**
- Reference files: 
    - `documentation/Fachliche Conclusions Open API Kundenbeziehung/02 Anforderungen.md`
    - `documentation/Fachliche Conclusions Open API Kundenbeziehung/03 Referenzprozess.md`
    - `documentation/Fachliche Conclusions Open API Kundenbeziehung/04 API Endpoint Design.md`
    - `documentation/Fachliche Conclusions Open API Kundenbeziehung/05 Vertrauensnetzwerk.md`
    - `documentation/Fachliche Conclusions Open API Kundenbeziehung/06 Consent und Security Flow.md`
    - `documentation/Fachliche Conclusions Open API Kundenbeziehung/08 Testing und Verifikation.md`
- Specific implementation of the Alpha Version: MVP
    - follow specifications of MVP in the conclusions
    - must extend the generic core implementation of the Open API Kundenbeziehung
    - must be coherent with the content of the conclusions

**Additional Files for Implementation:**
- update the file api/openapi.yaml
    - add the necessary API endpoints and data models for the Open API Kundenbeziehung
    - ensure that the API endpoints are coherent with the conclusions and the requirements
- update the file api/docker-compose.yaml
    - add the necessary services and configurations for the Open API Kundenbeziehung
- update the file api/env-config.sh
    - add the necessary environment variables for the Open API Kundenbeziehung
- update the file api/package.json
    - add the necessary dependencies for the Open API Kundenbeziehung
    - ensure that the dependencies are coherent with the conclusions and the requirements
- update the file api/jest.config.js
    - add the necessary configurations for the testing framework of the Open API Kundenbeziehung
- if necessary, create additional files in the api directory for the implementation of the Open API Kundenbeziehung
    - ensure that the files are coherent with the conclusions and the requirements

----------

## Demos

**Demos:**
- Reference files: 
    - `documentation/Fachliche Conclusions Open API Kundenbeziehung/02 Anforderungen.md`
    - `documentation/Fachliche Conclusions Open API Kundenbeziehung/03 Referenzprozess.md`
    - `documentation/Fachliche Conclusions Open API Kundenbeziehung/04 API Endpoint Design.md`
    - `documentation/Fachliche Conclusions Open API Kundenbeziehung/05 Vertrauensnetzwerk.md`
    - `documentation/Fachliche Conclusions Open API Kundenbeziehung/06 Consent und Security Flow.md`
    - `documentation/Fachliche Conclusions Open API Kundenbeziehung/08 Testing und Verifikation.md`
- Demos must be coherent with the content of the conclusions!!
- Demos should visualize the functionality of the Open API Kundenbeziehung, not be a full implementation
- Demos should appeal to an audience mostly from the financial industry, with an extensive theoretical and professional background, but not necessarily with a deep technical understanding of APIs or software development
- Use visually appealing graphics and animations for the demos
- Demos to be created: (or adapted from existing ones)
    - **Demo 1: Referenzprozess**: basic functionality of the Open API Kundenbeziehung shown through the 10 step Referenzprozess
        - **Demo 1.1: Use Case Kundenbeziehungseröffnung**: Show the 10 step Referenzprozess for the use case of Kundenbeziehungseröffnung
        - **Demo 1.2: Use Case Re-Identifikation**: Show the 10 step Referenzprozess for the use case of Re-Identifikation
        - **Demo 1.3: Use Case Altersverifikation**: Show the 10 step Referenzprozess for the use case of Altersverifikation
        - **Demo 1.4: Use Case CLM von EVV-Endkunden**: Show the 10 step Referenzprozess for the use case of CLM von EVV-Endkunden
    - **Demo 2: Daten Onboarding und Pflege**: Show the functionality of the Open API Kundenbeziehung for Daten Onboarding und Pflege
    - **Demo 3: Consent and Security Flow**: Show the Consent and Security Flow of the Open API Kundenbeziehung
    - **Demo 4: Verification Process**: Show the Verification Process of the Open API Kundenbeziehung
    - **Demo 5: MVP Implementation**: Show the MVP implementation of the Open API Kundenbeziehung
- For each demo, create a script that describes the flow and functionality to be shown
- For each demo, create a file "Demo X: *name* description.md" in the same directory as the demo file that describes the demo and its functionality snd provides instructions on how to run it
- Update the DEMO-INSTRUCTIONS.md file with the new demos and their descriptions and links to the demo files as well as the demo description files
- Update the run-all-demos.sh script to include the new demos and their descriptions

----------

## Documentation and Instructions

**Documentation:**
- create a new README.md file in the api directory that briefly introduces the Open API Kundenbeziehung and provides links to the relevant documentation files
- update the implementation-details.md file with the implementation details of the Open API Kundenbeziehung
    - split into sections analogue to the conclusion files and create a file for each section, add implementation details of the section to the respective file
    - in each section file add a link to the respective conclusion file for further details and background information
    - adapt the file implementation-details.md to just outline the content of the sections and provide links to the respective files
    - link file-structure.txt in the implementation-details.md file
- update the file-structure.txt file with the new files and their descriptions
- create a file api-instructions.md in the api directory that provides instructions on how to use the Open API Kundenbeziehung
    - include instructions on how to run the demos and the implementation details
    - include instructions on how to run the tests and the verification process
    - include instructions on how to utilize the API endpoints and the data model for real-world applications


