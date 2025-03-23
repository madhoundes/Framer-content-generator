# Toast Notifications Requirements

This document outlines the requirements for implementing **toast notifications** for success, warning, and error messages. The toasts should be user-friendly, accessible, and consistent across the application.

---

---

## Types of Toasts
1. **Success Toast**  
   - Purpose: Indicate a successful operation.  
   - Content: "Text pasted successfully" (English), "تم لصق المحتوى بنجاح" (Arabic).  
   - Visual Style: background:#14532D with 70% opacity. 
 

2. **Warning Toast**  
   - Purpose: Warn users about potential issues.  
   - Content: "Please select a text layer first!" (English), "الرجاء تحديد طبقة نص أولا" (Arabic).  
   - Visual Style: background:#B88700 with 70% opacity. 

3. **Error Toast**  
   - Purpose: Notify users of errors or failures.  
   - Content: "Generated content was not added to canvas" (English), "لم يتم إضافة المحتوى الذي تم إنشاؤه إلى الواجهة" (Arabic).  
   - Visual Style: background:#7F1D1D with 70% opacity.  

---

## Functionality
1. **Display Behavior**  
   - Toasts should appear at the **top-right corner** of the screen.  
   - Multiple toasts should stack vertically without overlapping.  

2. **Duration**  
   - Toasts should auto-dismiss after **5 seconds**.  
   - Users can manually dismiss toasts by clicking a close button (`×`).  

3. **Close Button**  
   - Use the `icon/x` from Feather Icons.  
   - Size: 20px width and height.  

4. **Animation**  
   - Toasts should slide in smoothly and fade out when dismissed.  

---

## Design Requirements
1. **Icons**  
   - Success: Checkmark (`✓`)  
   - Warning: Exclamation (`!`)  
   - Error: Cross (`×`)  

2. **Colors**  
   - Success: Green (`#14532D`)  
   - Warning: Yellow/Orange (`#B88700`)  
   - Error: Red (`#7F1D1D`)  

3. **Text**  
   - Use clear, concise messaging (max 1-2 lines).  
   - Font size: 14px (body), 16px (heading if needed).  

4. **Close Button**  
   - Position: Top-right corner of the toast.  
   - Style: Simple `×` symbol with hover feedback.  

---

## Accessibility
1. **Screen Readers**  
   - Toasts should be announced by screen readers when they appear.  
   - Use ARIA roles: `role="alert"` for error/warning toasts, `role="status"` for success toasts.  

2. **Keyboard Navigation**  
   - Users should be able to dismiss toasts using the `Esc` key.  
   - Focus should be trapped within the toast if it includes action buttons.  

3. **Color Contrast**  
   - Ensure text and icons meet WCAG contrast ratios (minimum 4.5:1).  

---


Implementation Notes

Use a reusable toast component to maintain consistency.
Ensure toasts are lightweight and do not block UI interactions.
Test across devices and screen sizes for responsiveness.
