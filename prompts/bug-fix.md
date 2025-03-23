Fixing Numbered List Direction in Arabic UI

Issue:
When implementing numbered lists in Arabic on the Framer canvas, the numbers appear in the wrong direction (left-to-right instead of right-to-left).

Objective:
Ensure numbered lists in Arabic:

Display numbers right-to-left (e.g., 1. should appear on the right side of the text).
Maintain proper RTL alignment for the entire list (text and numbers).
Requirements:

Number Positioning:
Numbers should align to the right of the text.
Example:
Copy
١. النص الأول  
٢. النص الثاني  

Text Alignment:
Ensure the entire list (numbers and text) follows RTL formatting.
Canvas Integration:
Apply these rules to all numbered lists generated in Arabic.
Ensure the fix works seamlessly with Framer’s text layer system.
Testing Protocol:

Generate a numbered list in Arabic.
Verify numbers appear on the right side of the text.
Check RTL alignment for the entire list.