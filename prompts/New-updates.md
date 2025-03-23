Maintaining Character Height and Vertical Text Growth

Issue:
When generating lists in Arabic and English, the text does not grow vertically, and character height is inconsistent, disrupting the layout.

Objective:
Ensure lists in both Arabic and English:

Grow vertically (not horizontally) when text is added.
Maintain consistent character height for all list items.
Requirements:

Vertical Growth:
Text should wrap vertically within a fixed width (e.g., 650px).
Ensure lists expand downward as more items or text are added.
Character Height:
Use a uniform line height for all list items.
Avoid overlapping or uneven spacing between lines.
Language-Specific Adjustments:
For Arabic UI:
Ensure RTL alignment and proper number positioning (right-to-left).
For English UI:
Maintain LTR alignment and standard number positioning (left-to-right).
Canvas Integration:
Apply these rules to all lists generated in the plugin.
Ensure the text layers respect Framer’s layout constraints.
Testing Protocol:

Generate a list in Arabic and English.
Verify text grows vertically and does not exceed the fixed width.
Check for consistent character height and proper alignment.
This prompt ensures the cursor understands the requirements for both Arabic and English UI without technical jargon. Let me know if you need further refinements!