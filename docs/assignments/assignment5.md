---
title: "Assignment 5: Frontend Design and Implementation"
layout: doc
---
# Assignment 4: Backend Design and Implementation

### Table of Contents
1. [Heuristic Evaluation](#heuristic-evaluation)

## Concept States
**Usability Criteria**
1. Discoverability
Strengths:
- The layout is simple, and users familiar with social media platforms should be able to quickly understand how to navigate. The content snippets are centered, which draws attention to the main interactive area.
- The mode buttons at the top (Work, Life, For You) are clear and suggest that users can toggle between different content types or sections, enhancing discoverability.
- The settings button in the top right follows a standard convention, making it discoverable.


Weaknesses:
- The "+" button in the bottom bar could be confusing for first-time users, as it lacks a label or tooltip to indicate its function. This could be improved with either a guide for new users or by adding labels or visual cues.

2. Accessibility
Strengths:
- The snippets are the central focus, which is good for users with visual or cognitive impairments who benefit from simple, uncluttered interfaces.
- The familiar top-right placement of the settings button is good for accessibility, as this is where users expect to find it.


Weaknesses:
- The arrow for navigating to the next media in the snippet could be larger, especially for users with motor disabilities. Allowing swipe gestures on snippets could improve accessibility.
- The quiz component could benefit from more spacing between elements to ensure readability and easy interaction for users with visual impairments. 
- In addition, the radio buttons for the quiz options could be made larger for easier interaction.  

**Physical Heuristics**
1. Fitt's Law
Strengths:
- The large, easily reachable snippet cards allow for quick interactions. 
- The mode buttons and the plus with border to create a new snippet are large enough in size where it should be easy to navigate to.

Weaknesses:
- The "+" button in the bottom center could be slightly more challenging to tap because it's smaller and not accompanied by a label or explanation.

2. Mapping
Strengths:
- The mode buttons (Work, Life, For You) are clear and it is easy for users to understand that clicking a mode would change the content. 
- The color shift to be darker helps emphasize the current mode selected. 
- The spacing between the buttons are smaller, which groups the mode buttons together as part of a group of modes. 

Weaknesses:
- The app can benefit from the use of gestural mapping, as mentioned before to navigate to the next media in the snippet. 
- Clear labelling to some of the features displayed would improve the usability and mapping of the application. 

**Linguistic Level**
1. Consistency
Strengths:
- The layout of each snippet is consistent whenever the user changes modes. In addition, the snippets layout is the same when the user goes to the profile to check out the snippets. 
- The plus icon with border used in the bottom bar of the page is consistent with other social media platforms such as tiktok and instagram. 

2. Information Scent
Strengths:
- Without the need to label the mode buttons, it is quite intuitive to the users based on the "Work" and "Life" button labels that already exists. 
- The use of the arrow on the snippet hints at further actions for the user to anticipate swiping or clicking on the arrow to see more media. 

Weaknesses:
- The quiz interaction in the current design doesn't specify how the user would be informed that they answered the quiz correctly. I would need to add a submit button and have the radio button color change to green if correct, or fill in the correct radio button with red. 

## Frontend Links
[Vercel](https://frontend-starter-seven.vercel.app/)

[Codebase](https://github.com/EveSilf/frontend-starter)