01 Feature: Paragraph Length Controls

## Objective  
Add dynamic controls for adjusting paragraph length when the "Paragraph Length" toggle is enabled.

## Requirements  
1. **Toggle Activation**  
   - Enable controls when toggle is ON:  
     - **Radio Buttons:** Select adjustment type (e.g., by words or by lines).  
     - **Slider:** Adjust number of lines (range: 4–20).  

2. **Real-Time Updates**  
   - Changes to controls update the **preview text** instantly.  

3. **Defaults**  
   - Slider: Start at `4 lines`.  
   - Radio Button: Default to `"By Lines"`.  

4. **Edge Cases**  
   - Disable controls when toggle is OFF.  
   - Support RTL (Arabic) and LTR (English) alignment.  