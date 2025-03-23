// Handle adding to canvas (works for all text types)
const handleAddToCanvas = () => {
  // Get selected layers to check if we're updating existing text
  const selectedTextLayers = selection.filter(node => {
    // Check if the node is a text node (has a text property)
    return node && typeof node === 'object' && 'text' in node;
  });
  
  // Enforce maximum width of 650px for all text types
  const MAX_WIDTH = 650;
  
  // Regular text generation process (no selection)
  if (selectedTextLayers.length === 0) {
    // Create basic style options for all text types
    const styledText: any = {
      text: generatedText,
      width: MAX_WIDTH,
      // Set fixed width mode - don't auto-fit
      textAutoResize: 'HEIGHT',
      // Ensure max width is enforced
      maxWidth: MAX_WIDTH,
      // Set consistent line height for all text types
      lineHeight: 1.5,
      // Include text type for conditional formatting
      textType: textType
    };
    
    // Add RTL direction and text alignment for Arabic
    if (isRtl) {
      styledText.direction = 'rtl';
      styledText.textAlign = 'right';
      // Set the writing direction to RTL for proper text rendering
      styledText.textDirection = 'RTL';
      
      // Additional properties to force right alignment in Framer UI
      styledText.textAlignHorizontal = 'right';
      styledText.horizontalAlignment = 'right';
      styledText.alignment = 'right';
      styledText.paragraphAlignment = 'right';
      styledText.paragraphAlignHorizontal = 'right';
      styledText.paragraphDirection = 'rtl';
      
      // Special handling for lists in RTL
      if (textType === 'list') {
        styledText.listFormat = 'rtl';
        // Ensure proper list formatting for Arabic
        styledText.paragraphIndent = 20;
        styledText.paragraphSpacing = 10;
        styledText.listStyle = 'rtl';
        // Fix for inverted numbering in RTL lists
        styledText.listReversed = false;
        styledText.listStylePosition = 'outside';
      }
    } else {
      // For English lists, ensure proper formatting
      if (textType === 'list') {
        styledText.paragraphIndent = 20;
        styledText.paragraphSpacing = 10;
      }
    }
    
    // Log what we're sending to the canvas
    console.log("Adding to canvas with options:", styledText);
    
    // Use any to bypass TypeScript errors
    (onAddToCanvas as any)(generatedText, styledText);
  } else {
    // If text layers are selected, update them with new content
    selectedTextLayers.forEach(textLayer => {
      try {
        // Use the Framer API to update the text content with the new text
        const attributes: any = {
          text: generatedText,
          width: MAX_WIDTH,
          // Set fixed width mode - don't auto-fit
          textAutoResize: 'HEIGHT',
          // Ensure max width is enforced
          maxWidth: MAX_WIDTH,
          // Set consistent line height for all text types
          lineHeight: 1.5,
          // Include text type for conditional formatting
          textType: textType
        };
        
        // Add RTL direction for Arabic
        if (isRtl) {
          attributes.direction = 'rtl';
          attributes.textAlign = 'right';
          // Set the writing direction to RTL for proper text rendering
          attributes.textDirection = 'RTL';
          
          // Additional properties to force right alignment in Framer UI
          attributes.textAlignHorizontal = 'right';
          attributes.horizontalAlignment = 'right';
          attributes.alignment = 'right';
          attributes.paragraphAlignment = 'right';
          attributes.paragraphAlignHorizontal = 'right';
          attributes.paragraphDirection = 'rtl';
          
          // Special handling for lists in RTL
          if (textType === 'list') {
            attributes.listFormat = 'rtl';
            // Ensure proper list formatting for Arabic
            attributes.paragraphIndent = 20;
            attributes.paragraphSpacing = 10;
            attributes.listStyle = 'rtl';
            // Fix for inverted numbering in RTL lists
            attributes.listReversed = false;
            attributes.listStylePosition = 'outside';
          }
        } else {
          // For English lists, ensure proper formatting
          if (textType === 'list') {
            attributes.paragraphIndent = 20;
            attributes.paragraphSpacing = 10;
          }
        }
        
        // Log what we're updating
        console.log("Updating text layer with attributes:", attributes);
        
        (framer as any).setAttributes(textLayer.id, attributes);
      } catch (error) {
        console.error('Error updating text layer:', error);
      }
    });
  }
}; 