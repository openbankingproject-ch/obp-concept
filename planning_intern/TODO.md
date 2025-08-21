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
  - decrease margins on the left and right side of the demo to give more space to the content
  - add a button to run the entire demo (go through all steps at a reasonable speed), a pause button and a reset button to reset the demo to the initial state. 
  - decrease font size of titles and subtitles:
    - 'Open API Kundenbeziehung Demo Alpha Version 1.0' a lot smaller and aligned to the left
    - 'Interaktive Visualisierung der Basisimplementation: Referenzprozess, Daten Onboarding und Consent Flow' a bit smaller and next to the title 'Open API Kundenbeziehung Demo Alpha Version 1.0' 
    - '10-Stufen Referenzprozess' a lot smaller, but bold
    - 'Generischer Consent Flow' a lot smaller, but bold
    - 'Daten Onboarding Prozess' keep same font size, but bold
  
[] Referenzprozess:
  - Numbering of the 10 main steps: Add the numbering to the Step names (like "1. Initialisierung") instead of the current numbering in the boxes
  - with the new numbering, the icons (pictograms) can be sized up a little bit to make them more visible
  - 4 Phases: Instead of creating "background" boxes, add a bracket above the steps to indicate the 4 phases of the Referenzprozess like this:
    |---Phase 1: Setup und Produktauswahl---|
    [1. Initialisierung]  [2. Identifikation]
  - boxes of the 10 main steps need to be the same size: try to make them smaller so that they fit on one screen, change text to "Selbst- deklaration" so that it can be displayed on two lines and the box is smaller
  - colors of the boxes: 
    - Not started: keep as is
    - In progress: 
      - border: #F85F3D and make border thicker
      - fill: #FA9F8A
    - Completed: 
      - border: #0070C0
      - fill: #73c3fcff

[] Consent Flow:
  - **IMPORTANT**: verify that the sequence diagram of the demo matches the sequence diagram in the documentation **exactly** ('Dokumentation Fachliche Perspektive/Fachliche Conclusions Open API Kundenbeziehung/Resources/graphics/06-consent-security/generic-consent-flow.mmd') and that each step is exactly as in the sequence diagram generic-consent-flow.mmd!!!!!
  - map the appearance of the steps in the Consent Flow to the 10 main steps of the Referenzprozess not the 4 phases of the Referenzprozess
  - do not start the entire flow again with each step of the Referenzprozess, but rather continue from the last step and leave elements that are already completed in the previous steps
  - add more vertical space between the steps to make it more readable (and more space between the participants and the animated sequence diagram, the text of the first arrow cannot be read)
  - like in the sequece diagram generic-consent-flow.mmd, the boxes defining start of one of the 4 phases should be in front of the sequence diagram, and divide the steps of the Consent Flow (arrows for steps shouldn't overlap with the boxes)
  - add the information box about granular consent options, just like in the sequence diagram generic-consent-flow.mmd, but make it smaller and place it on the right side of the Consent Flow
  - phase box colors: (fill, no border)
    - not started: #E5CAFF
    - in progress: #f3765aff
    - completed: #73c3fcff
  - arrow colors:
    - not started: do not display arrows for steps that are not started yet
    - in progress: #F85F3D
    - completed: #73c3fcff
  - information boxes above arrows:
    - not started: do not display information boxes for steps that are not started yet
    - in progress: 
      - border: #F85F3D
      - fill: #f3c9c1ff
      - text: #F85F3D
    - completed:
      - border: #0070C0
      - fill: #73c3fcff
      - text: #0070C0

  
[] Data Onboarding Process:
  - implement a categorized data onboarding process with step-by-step appearance of data fields: categorize data according to the content of the conclusions, not the Referenzprozess
  - make sure that for each step of the demo the correct data fields are updated (also consider the individual steps of the consent flow within the Referenzprozess step and match accordingly)
  - Data Category Box Color: #253165 (text white)
  - Individual Data Field Colors: 
    - not received: 
      - left border: #E5CAFF
      - fill: white
      - text: #E5CAFF
    - moment of receiving: 
      - left border: #F85F3D
      - fill: #FA9F8A  
      - text: #F85F3D
    - received, but not confirmed: 
      - left border: #F85F3D
      - fill: white
      - text: #F85F3D
    - confirmed: 
      - left border: #4cb867ff
      - fill: white
      - text: #1e293b 
