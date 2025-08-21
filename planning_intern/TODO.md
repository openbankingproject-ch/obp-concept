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
  - logo in loading page needs to be waaay bigger
  - increase maximum width of the demo to 1800px
  - header: divide text into two columns.
    - left column: 'Open API Kundenbeziehung Demo Alpha Version 1.0' (left aligned)
    - right column: 'Interaktive Visualisierung der Basisimplementation: Referenzprozess, Daten Onboarding und Consent Flow' (center aligned)
  - change font to Verdana and make text bold for the following section titles:
    - '10-Stufen Referenzprozess' a lot smaller, but bold
    - 'Generischer Consent Flow' a lot smaller, but bold
    - 'Daten Onboarding Prozess' keep same font size, but bold
  - background: mute graphic and overlay with a 50% opacity light grey color
  
[] Referenzprozess:
  - Numbering of the 10 main steps: Add the numbering to the Step names (like "1. Initialisierung") instead of the current numbering in the boxes
  - size up icons (pictograms) a little bit to make them more visible
  - 4 Phases: the brackets look terrible, replace with just simple boxes containing the phase names (not rounded corners) and span them to the same width as the corresponding steps for that phase
  - boxes of the 10 main steps need to be the same width and height!! all uniform!
  - add a small margin at the bottom of each step box to make it more readable
  - colors of the boxes: 
    - Not started: keep as is
    - In progress: 
      - border: #F85F3D and make border thicker
      - fill: #FA9F8A
    - Completed: 
      - border: #4cb867ff
      - fill: white

[] Consent Flow:
  - remove dark blue header box around the participants
  - no rounded cordners please, all boxes should have sharp corners
  - map the appearance of the steps in the Consent Flow to the 10 main steps of the Referenzprozess not the 4 phases of the Referenzprozess
  - do not start the entire flow again when moving on to the next step of the Referenzprozess: the sequence diagram should slowly become complete as the steps of the Consent Flow are completed and never be reset in between!
  - fix spacing between steps so that the entire diagram is readable and visible (just a little bit more space between the steps)
  - add the information box about granular consent options, just like in the sequence diagram generic-consent-flow.mmd, but make it smaller and place it on the left side of the Consent Flow centered to the same height as the step "grant specific consents"
  - arrow colors:
    - not started: do not display arrows for steps that are not started yet
    - in progress: #F85F3D
    - completed: choose color from colors.txt in the section "extra colors for code elements" that match the step it is connected to
  - information boxes above arrows:
    - not started: do not display information boxes for steps that are not started yet
    - in progress: 
      - border: #F85F3D
      - fill: #f3c9c1ff
      - text: #F85F3D
    - completed:
      - border: same color as the arrow it is connected to
      - fill: white
      - text: #1e293b

  
[] Data Onboarding Process:
  - make sure that for each step of the demo the correct data fields are updated (also consider the individual steps of the consent flow within the Referenzprozess step and match accordingly)
  - do not start the entire process of adding data fields again when moving on to the next step of the Referenzprozess: the data list should slowly become complete as the steps of the demo are completed and never be reset in between!
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
