updated changes for arabic UI . الواجهة العربية 

1) typgogeraphy 
- make sure that font family used only when select arabic ui switch is 
'system-ui', -apple-system, BlinkMacSystemFont, sans-serif

2) button arrange and reorder buttons and tabs 
- some thing wrong with direction order buttons it's supposed to make button العربية instead of English button as an active btn . 
- ensure that tabs moved correctly on wright buttons/tabs . 

================================================================================================
02  Fix Arabic Text Direction in Framer

## Problem  
Arabic text appears **left-aligned** and **inverted** when inserted into the Framer canvas.

## Objective  
Ensure Arabic text is displayed correctly with **RTL alignment** and proper formatting.

## Requirements  
1. **Text Alignment**  
   - Arabic text must be **right-aligned**.  
   - Numbering must start from the **right**.  

2. **Consistency**  
   - Ensure the preview and Framer canvas display text with the same alignment.  

3. **Edge Cases**  
   - Handle mixed Arabic/English content.  
   - Ensure numbers and punctuation follow RTL rules.  

4. **Testing**  
   - Test with various Arabic text samples (lists, paragraphs, mixed content).  