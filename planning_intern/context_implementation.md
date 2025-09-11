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
- The current project state (Alpha Version 1.0) aims to implement a generic core implementation ("Basisimplementation") of the Open API Kundenbeziehung that can be extended to work with different architectures, use cases and Ecosystems, without changing the core implementation
- The generic core implementation must be coherent with the content of the conclusions and the requirements (follow Guidelines and Context in 'planning_intern/context_fachliche_dokumentation.md')
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
- **ensure that all required files are present in the api directory and that they are coherent with the conclusions and the requirements**

----------

## Code Documentation and Instructions
!!update after every change in the code!!

**Documentation:**
- README.md file in the api directory briefly introduces the Open API Kundenbeziehung and provides links to the relevant documentation files
- **implementation-details.md**: reflects the current state of the implementation details of the Open API Kundenbeziehung
    - split into sections analogue to the conclusion files, containing implementation details of the section to the respective file
    - in each section file: link to the respective conclusion file for further details and background information
    - the file implementation-details.md outlines the content of the sections briefly and provides links to the respective files
    - link to file-structure.txt in the implementation-details.md file
- **file-structure.txt**: contains an overview of all implementation files, their descriptions and their connections to other implementation files
    - the file-structure.txt should be updated after every change in the implementation files
    - the file-structure.txt should be coherent with the content of the implementation-details.md file
- **api-instructions.md**: provides instructions on how to use the Open API Kundenbeziehung
    - includes instructions on how to run the demos and the implementation details
    - includes instructions on how to run the tests and the verification process
    - includes instructions on how to utilize the API endpoints and the data model for real-world applications


