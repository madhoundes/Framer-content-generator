I need to update the light theme version of a Framer project to match the design in the provided reference image. 

Specifically, I want to ensure that the CSS styles are dynamically updated when the Framer light/dark theme switcher is toggled. Below are the details and requirements:

Reference Design:
The design reference is available in this Figma file: Figma Link.
Focus on the light theme styles in the Figma design and ensure the Framer implementation matches these visuals.
CSS Updates for Light Theme:

When the Framer light/dark switcher activates the light mode, update the CSS styles to reflect the light theme.

Ensure the changes include typography, colors, spacing, and any other relevant design elements.
Dynamic Theme Switching:

Use Framer’s built-in light/dark theme switcher to apply the updated CSS styles dynamically.
Ensure the transition between themes is smooth and consistent.
Figma JSON Code:

Below is the Figma JSON code for reference. Use this to extract specific design tokens (e.g., colors, fonts, spacing) and apply them to the CSS:

here is figma JSON code 
https://www.figma.com/design/BCcx49A0Z5w9wLOiI7M1MD/%40shadcn_ui---Design-System-(Community)?node-id=214-602&t=OUoaZTCfmuOf7ckK-11


## fixed request 
  - remove theme switcher btn from plugin itself . and make siwtch color theme from native light/dark btn framer . 
  - at .language-switcher remove border-radius :999px and keep it like original 9px 
  - at .language-switcher div also fix btn background hover it's feel like uncomplete. 
  - at .copy-button remove gray background . 
  - at .text-preview-header remove max-width:273px;
  - at .category-dropdown-button:hover remove border change leave it with changing anything in border .
  - at light version theme in .category-dropdown-menu.open .category-item the active focus option list will . 
   and here is code json from figma for this update option list in light version 
   https://www.figma.com/design/BCcx49A0Z5w9wLOiI7M1MD/%40shadcn_ui---Design-System-(Community)?node-id=218-866&t=OUoaZTCfmuOf7ckK-11
  - at light version theme in .text-type-button label text will be #737373. 
   



