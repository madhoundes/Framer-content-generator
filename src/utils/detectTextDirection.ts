/**
 * Utility functions for detecting text language and direction
 */

/**
 * Checks if text contains Arabic characters
 * Uses Unicode character ranges for Arabic scripts
 * @param text The text to check
 * @returns true if the text contains Arabic characters, false otherwise
 */
export function containsArabic(text: string): boolean {
  if (!text) return false;
  
  // Unicode ranges for Arabic characters
  const arabicRanges = [
    [0x0600, 0x06FF], // Arabic
    [0x0750, 0x077F], // Arabic Supplement
    [0x08A0, 0x08FF], // Arabic Extended-A
    [0xFB50, 0xFDFF], // Arabic Presentation Forms-A
    [0xFE70, 0xFEFF]  // Arabic Presentation Forms-B
  ];
  
  // Check if any character in the text falls within Arabic ranges
  return Array.from(text).some(char => {
    const code = char.charCodeAt(0);
    return arabicRanges.some(([start, end]) => code >= start && code <= end);
  });
}

/**
 * Determines if text is predominantly Arabic
 * @param text The text to analyze
 * @param threshold Percentage threshold for Arabic characters (0.0 to 1.0)
 * @returns true if the text is predominantly Arabic, false otherwise
 */
export function isPredominantlyArabic(text: string, threshold: number = 0.3): boolean {
  if (!text) return false;
  
  // Remove whitespace and punctuation
  const cleanText = text.replace(/[\s.,;:!?"'()[\]{}\\\/\-_+=<>|~`@#$%^&*]/g, '');
  if (cleanText.length === 0) return false;
  
  // Count Arabic characters
  let arabicCount = 0;
  const chars = Array.from(cleanText);
  
  for (const char of chars) {
    if (containsArabic(char)) {
      arabicCount++;
    }
  }
  
  // Calculate percentage of Arabic characters
  const arabicPercentage = arabicCount / chars.length;
  
  // Return true if percentage exceeds threshold
  return arabicPercentage >= threshold;
}

/**
 * Automatically detect text direction based on content
 * @param text The text to analyze
 * @returns 'rtl' for right-to-left text (Arabic), 'ltr' for left-to-right text
 */
export function detectTextDirection(text: string): 'rtl' | 'ltr' {
  return isPredominantlyArabic(text) ? 'rtl' : 'ltr';
}

/**
 * Get text alignment based on detected direction
 * @param text The text to analyze
 * @returns 'right' for RTL text, 'left' for LTR text
 */
export function getTextAlignment(text: string): 'right' | 'left' {
  return detectTextDirection(text) === 'rtl' ? 'right' : 'left';
} 