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
  - less spacing between the demo components, so that the entire demo fits on one screen
  - less spacing overall - the white boxes for each component can be way closer together
  
[] Referenzprozess:
  - remove animation of current step where the box of the current step moves up and down, also remove additional blue border around the current step
  - make everything more compact and less spaced out, the phase boxes don't need to be wider than the step boxes they contain


[] Consent Flow:
  - less spacing in the white box surrounding the Consent Flow, less padding aroung title
  - phase box needs to be aligned to the left side of the white box surrounding the Consent Flow with padding of 10px to the left side
  - participant boxes need to be uniform in size. also decrease the height to make them more compact. place pictogram on the left side of the participant name.
  - box containing the sequence diagram: remove rounded corners and less padding on top and bottom. 
  - sequence diagram:
    - align the vertical lines to the middle of the corresponding participant boxes
    - align arrows and text boxes in a way that they are also centered vertically to each other (text box on top of the arrow, right in the middle of the arrow)
    - minimal spacing between each step that it is still readable and keep spacing consistent between all steps
    - align the box "granular consent options" vertically centered to the same height as step 6

  
[] Data Onboarding Process:
  - reduce font size of the title "Data Onboarding Process" to match the other titles
  - display the data sections in two columns instead of one column
