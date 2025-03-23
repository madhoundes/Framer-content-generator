Plugin Setup Instructions 
first of all don't start designing/developing plugin just installed these below requreimtents 

1. Language Support

The plugin UI supports two languages:
English (EN)
Arabic (AR)
Ensure the UI dynamically switches between LTR (English) and RTL (Arabic) layouts.

2. Fonts
English Font: Use Inter for all English text.
Arabic Font: Use Noto Arabic Sans for all Arabic text.
Ensure proper font fallbacks for cross-browser compatibility.

3. Icons
Use Feather Icons for all icons in the plugin.

4. Design System

The plugin design is based on Shadcn components.
Use Shadcn’s color variables and style guide for consistency.

5. File Structure 
Organize the project files as follows:
- compoments : # Reusable UI components
- styles     :  # Global styles and variables
- /locales   :  # Language files (EN, AR)
- assets     : #fonts , icons , and images if exsists . 

6. Naming and customization
Make sure you've add unique ID's and class names to all elemnts in the code 

 - Each major section has a descriptive ID (app-container, app-header, main-content, etc.)
 - Each button has a unique ID (dev-notification-bell-btn, image-upload-btn, etc.)
 - Each component have IDs with the ID included (tweet-1, avatar-1, etc.) 
 - Added semantic class names to help with styling and selection (notification-item, etc.)

 - This should make it much easier to inspect and target specific elements in your code.
