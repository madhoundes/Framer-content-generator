# Feature Request: YouTube Video Widget for First-Time Users

## Description
Implement a YouTube video widget that displays only the first time a user opens the plugin. The widget should include:
- Video name
- Thumbnail
- A small text description below the video

## Content for Widget
- **Video Name**: "How This Plugin Works"
- **Thumbnail**: Use the plugin's logo or a relevant visual from the plugin's branding.
- **Description**: "This quick guide will show you how to use the plugin to generate content, support your customers, and explore features like Visual Recognition and LogoView."

## Behavior
1. The widget should appear only once when the user opens the plugin for the first time.
2. It should be dismissible (e.g., with a "Close" button).
3. Clicking the thumbnail or video name should open the YouTube video in a new tab.

## Benefits
1. Provides a quick and engaging onboarding experience for new users.
2. Highlights key features like content generation and customer support tools.
3. Encourages users to explore the plugin’s capabilities through a visual guide.

## Additional Context
- Reference the "How This Plugin Works" section from the plugin's welcome screen for content inspiration.
- Ensure the widget design aligns with the plugin’s UI (e.g., clean, modern, and user-friendly).

===============================================================================================

# Feature Request: Dismissible YouTube Widget

## Description
Add a checkbox under the YouTube video widget with the label: **"Don’t show this again next time."** If checked, the widget should not reappear on future plugin launches.

## Behavior
1. Display the widget only on the first launch.
2. Include a checkbox to opt out of future displays.
3. Save the user’s preference locally to persist across sessions.

## Benefits
1. Enhances user control and experience.
2. Reduces unnecessary clutter for returning users.

==============================================================================================

# Feature Request: Embedded YouTube Player
## Description
Add functionality to open and play YouTube videos directly within the plugin interface.

## Requirements
1. Video should play in-place when triggered
2. No external browser redirection
3. Maintain current UI layout while playing
4. Include standard player controls (play/pause, volume, etc.)

## Technical Notes
- Use YouTube's embed API
- Responsive design to maintain plugin layout
- Auto-pause when user interacts with other plugin elements

## Benefits
- Seamless user experience
- No workflow interruption
- Consistent interface design
