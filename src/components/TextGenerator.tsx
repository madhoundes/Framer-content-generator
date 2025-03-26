import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { framer, CanvasNode } from 'framer-plugin';
import TextPreview from './TextPreview';
import TextTypeSelector, { TextType } from './TextTypeSelector';
import LengthControl, { LengthControlType, LabelType } from './LengthControl';
import Icon from './ui/icon';
import { useToast } from '../context/ToastContext';
import { detectTextDirection, getTextAlignment } from '../utils/detectTextDirection';

// Sample text for each category
type ContentCategory = 'technology' | 'business' | 'health' | 'environment' | 'entertainment' | 'finance' | 'gaming' | 'social';

// Multiple text variations for each category to enable real-time generation of different content
const englishCategoryTexts: Record<ContentCategory, string[]> = {
  technology: [
    'Many startups today are interested in e-commerce and mobile application development. Innovation in these areas opens new horizons for businesses.',
    'Artificial intelligence and machine learning are revolutionizing how we approach problem-solving in technology. These tools enable more efficient data analysis.',
    'Cloud computing has transformed how businesses store and process data. Scalability and flexibility are key advantages of cloud-based solutions.',
    'Cybersecurity remains a critical concern for organizations of all sizes. Protecting sensitive data requires a comprehensive approach to security.',
    'The Internet of Things connects everyday devices to the web, creating smart homes and efficient workplaces. This technology continues to evolve rapidly.',
  ],
  business: [
    'Effective leadership requires strategic thinking and adaptability. Successful businesses focus on customer satisfaction and continuous improvement.',
    'Market research provides valuable insights into consumer preferences and behavior. Companies use this data to refine their product offerings.',
    'Supply chain management has become increasingly complex in the global economy. Efficiency in this area can significantly impact profitability.',
    'Corporate social responsibility initiatives demonstrate a company\'s commitment to ethical practices. These programs can enhance brand reputation.',
    'Remote work has changed how businesses operate and collaborate. Many organizations are adopting hybrid models to accommodate employee preferences.',
  ],
  health: [
    'Regular exercise and balanced nutrition contribute to overall wellbeing. Mental health awareness has increased significantly in recent years.',
    'Preventive healthcare focuses on maintaining wellness rather than treating illness. Regular screenings and checkups are essential components.',
    'Telemedicine has expanded access to healthcare services, particularly in rural areas. This technology continues to evolve and improve.',
    'Stress management techniques such as meditation and mindfulness can improve both mental and physical health outcomes.',
    'Sleep quality significantly impacts overall health and cognitive function. Establishing consistent sleep patterns is crucial for wellbeing.',
  ],
  environment: [
    'Climate change presents significant challenges for our planet. Sustainable practices and renewable energy sources are essential for our future.',
    'Conservation efforts aim to protect biodiversity and preserve natural habitats. These initiatives require both local and global cooperation.',
    'Reducing plastic waste is a priority for environmental protection. Many communities are implementing recycling programs and bans on single-use plastics.',
    'Sustainable agriculture practices focus on minimizing environmental impact while maintaining productivity. These methods can help preserve soil health.',
    'Water conservation is becoming increasingly important as many regions face shortages. Simple changes in daily habits can make a significant difference.',
  ],
  entertainment: [
    'The entertainment industry continues to evolve with streaming platforms. Digital content creation has transformed how we consume media.',
    'Virtual reality offers immersive experiences for gaming and entertainment. This technology continues to advance and become more accessible.',
    'Independent filmmakers now have more platforms to showcase their work. Streaming services have created opportunities for diverse storytelling.',
    'Music streaming has changed how artists release and promote their work. The industry continues to adapt to these technological changes.',
    'Interactive entertainment blurs the line between passive viewing and active participation. This trend is likely to continue with advancing technology.',
  ],
  finance: [
    'Financial literacy is crucial for personal and business success. Investment strategies should be tailored to individual goals and risk tolerance.',
    'Cryptocurrency and blockchain technology are changing traditional financial systems. Understanding these innovations is becoming increasingly important.',
    'Retirement planning requires long-term strategy and consistent saving. Starting early provides significant advantages through compound growth.',
    'Diversification helps manage investment risk by spreading assets across different categories. This strategy can provide more stable returns over time.',
    'Personal budgeting is the foundation of financial health. Tracking expenses and setting realistic goals can lead to greater financial security.',
  ],
  gaming: [
    'The gaming industry has seen tremendous growth in recent years. Esports competitions now attract millions of viewers worldwide.',
    'Mobile gaming has expanded the market to casual players. These accessible games have broad appeal across different demographics.',
    'Game development tools have become more accessible to independent creators. This has led to an increase in unique and innovative games.',
    'Virtual reality gaming creates immersive experiences that were previously impossible. This technology continues to evolve and improve.',
    'Gaming communities provide social connections and shared experiences. Many players value these interactions as much as the games themselves.',
  ],
  social: [
    'Social media platforms have transformed how we communicate. Digital marketing strategies must adapt to changing user behaviors and preferences.',
    'Online communities bring together people with shared interests regardless of geographic location. These connections can be valuable sources of support.',
    'Digital communication tools have enabled remote collaboration and relationship maintenance. These technologies became essential during global lockdowns.',
    'Content creation has become more accessible with smartphone technology. Many individuals now share their perspectives and creativity online.',
    'Social networking has changed how we maintain relationships and share information. Understanding these platforms is increasingly important in modern society.',
  ],
};

// Arabic text variations for each category
const arabicCategoryTexts: Record<ContentCategory, string[]> = {
  technology: [
    'تهتم العديد من الشركات الناشئة اليوم بالتجارة الإلكترونية وتطوير تطبيقات الهاتف المحمول. يفتح الابتكار في هذه المجالات آفاقًا جديدة للأعمال.',
    'الذكاء الاصطناعي والتعلم الآلي يغيران طريقة تعاملنا مع حل المشكلات في مجال التكنولوجيا. تمكن هذه الأدوات من تحليل البيانات بكفاءة أكبر.',
    'غيرت الحوسبة السحابية طريقة تخزين الشركات للبيانات ومعالجتها. تعد قابلية التوسع والمرونة من المزايا الرئيسية للحلول السحابية.',
    'يظل الأمن السيبراني مصدر قلق بالغ للمؤسسات بجميع أحجامها. تتطلب حماية البيانات الحساسة نهجًا شاملاً للأمن.',
    'يربط الإنترنت للأشياء الأجهزة اليومية بالويب، مما يخلق منازل ذكية وأماكن عمل فعالة. تستمر هذه التقنية في التطور بسرعة.',
  ],
  business: [
    'تتطلب القيادة الفعالة التفكير الاستراتيجي والقدرة على التكيف. تركز الشركات الناجحة على رضا العملاء والتحسين المستمر.',
    'يوفر بحث السوق رؤى قيمة حول تفضيلات المستهلكين وسلوكهم. تستخدم الشركات هذه البيانات لتحسين عروض منتجاتها.',
    'أصبحت إدارة سلسلة التوريد أكثر تعقيدًا في الاقتصاد العالمي. يمكن أن تؤثر الكفاءة في هذا المجال بشكل كبير على الربحية.',
    'تُظهر مبادرات المسؤولية الاجتماعية للشركات التزام الشركة بالممارسات الأخلاقية. يمكن أن تعزز هذه البرامج سمعة العلامة التجارية.',
    'غير العمل عن بعد كيفية عمل الشركات وتعاونها. تتبنى العديد من المؤسسات نماذج هجينة لاستيعاب تفضيلات الموظفين.',
  ],
  health: [
    'تساهم التمارين المنتظمة والتغذية المتوازنة في الصحة العامة. زاد الوعي بالصحة النفسية بشكل كبير في السنوات الأخيرة.',
    'تركز الرعاية الصحية الوقائية على الحفاظ على الصحة بدلاً من علاج المرض. تعد الفحوصات والمتابعات المنتظمة مكونات أساسية.',
    'وسع الطب عن بعد إمكانية الوصول إلى الخدمات الصحية، خاصة في المناطق الريفية. تستمر هذه التكنولوجيا في التطور والتحسن.',
    'يمكن أن تحسن تقنيات إدارة التوتر مثل التأمل واليقظة الذهنية نتائج الصحة العقلية والجسدية.',
    'تؤثر جودة النوم بشكل كبير على الصحة العامة والوظائف المعرفية. يعد إنشاء أنماط نوم متسقة أمرًا بالغ الأهمية للرفاهية.',
  ],
  environment: [
    'يشكل تغير المناخ تحديات كبيرة لكوكبنا. الممارسات المستدامة ومصادر الطاقة المتجددة ضرورية لمستقبلنا.',
    'تهدف جهود الحفاظ على البيئة إلى حماية التنوع البيولوجي والحفاظ على الموائل الطبيعية. تتطلب هذه المبادرات تعاونًا محليًا وعالميًا.',
    'يعد تقليل النفايات البلاستيكية أولوية لحماية البيئة. تنفذ العديد من المجتمعات برامج إعادة التدوير وحظر البلاستيك ذي الاستخدام الواحد.',
    'تركز ممارسات الزراعة المستدامة على تقليل الأثر البيئي مع الحفاظ على الإنتاجية. يمكن أن تساعد هذه الأساليب في الحفاظ على صحة التربة.',
    'أصبح الحفاظ على المياه أكثر أهمية حيث تواجه العديد من المناطق نقصًا. يمكن أن تُحدث التغييرات البسيطة في العادات اليومية فرقًا كبيرًا.',
  ],
  entertainment: [
    'تستمر صناعة الترفيه في التطور مع منصات البث. غير إنشاء المحتوى الرقمي طريقة استهلاكنا للوسائط.',
    'يوفر الواقع الافتراضي تجارب غامرة للألعاب والترفيه. تستمر هذه التقنية في التقدم وتصبح أكثر سهولة في الوصول إليها.',
    'أصبح لدى صانعي الأفلام المستقلين الآن المزيد من المنصات لعرض أعمالهم. خلقت خدمات البث فرصًا لسرد القصص المتنوعة.',
    'غير بث الموسيقى طريقة إصدار الفنانين لأعمالهم والترويج لها. تستمر الصناعة في التكيف مع هذه التغيرات التقنية.',
    'يمحو الترفيه التفاعلي الخط الفاصل بين المشاهدة السلبية والمشاركة النشطة. من المرجح أن يستمر هذا الاتجاه مع تقدم التقنية.',
  ],
  finance: [
    'التثقيف المالي أمر بالغ الأهمية للنجاح الشخصي والتجاري. يجب تصميم استراتيجيات الاستثمار وفقًا للأهداف الفردية وتحمل المخاطر.',
    'تغير العملات الرقمية المشفرة وتقنية سلسلة الكتل الأنظمة المالية التقليدية. أصبح فهم هذه الابتكارات مهمًا بشكل متزايد.',
    'يتطلب التخطيط للتقاعد استراتيجية طويلة الأمد وادخار مستمر. يوفر البدء مبكرًا مزايا كبيرة من خلال النمو المركب.',
    'يساعد التنويع في إدارة مخاطر الاستثمار من خلال توزيع الأصول عبر فئات مختلفة. يمكن أن توفر هذه الاستراتيجية عوائد أكثر استقرارًا بمرور الوقت.',
    'الميزانية الشخصية هي أساس الصحة المالية. يمكن أن يؤدي تتبع النفقات ووضع أهداف واقعية إلى تحقيق أمان مالي أكبر.',
  ],
  gaming: [
    'شهدت صناعة الألعاب نموًا هائلاً في السنوات الأخيرة. تجذب مسابقات الرياضات الإلكترونية الآن ملايين المشاهدين حول العالم.',
    'وسعت ألعاب الهاتف المحمول السوق لتشمل اللاعبين العاديين. هذه الألعاب سهلة الوصول لها جاذبية واسعة عبر الفئات المختلفة.',
    'أصبحت أدوات تطوير الألعاب أكثر سهولة في الوصول إليها للمبدعين المستقلين. أدى ذلك إلى زيادة في الألعاب الفريدة والمبتكرة.',
    'تخلق ألعاب الواقع الافتراضي تجارب غامرة كانت مستحيلة سابقًا. تستمر هذه التقنية في التطور والتحسن.',
    'توفر مجتمعات الألعاب اتصالات اجتماعية وتجارب مشتركة. يقدر العديد من اللاعبين هذه التفاعلات بقدر ما يقدرون الألعاب نفسها.',
  ],
  social: [
    'غيرت منصات التواصل الاجتماعي طريقة تواصلنا. يجب أن تتكيف استراتيجيات التسويق الرقمي مع سلوكيات المستخدمين وتفضيلاتهم المتغيرة.',
    'تجمع المجتمعات عبر الإنترنت أشخاصًا ذوي اهتمامات مشتركة بغض النظر عن الموقع الجغرافي. يمكن أن تكون هذه الاتصالات مصادر قيمة للدعم.',
    'مكنت أدوات التواصل الرقمي من التعاون عن بعد والحفاظ على العلاقات. أصبحت هذه التقنيات ضرورية خلال فترات الإغلاق العالمية.',
    'أصبح إنشاء المحتوى أكثر سهولة في الوصول إليه مع تقنية الهواتف الذكية. يشارك العديد من الأفراد الآن وجهات نظرهم وإبداعهم عبر الإنترنت.',
    'غيرت الشبكات الاجتماعية كيفية الحفاظ على العلاقات ومشاركة المعلومات. يعد فهم هذه المنصات مهمًا بشكل متزايد في المجتمع الحديث.',
  ],
};

interface TextGeneratorProps {
  onAddToCanvas: (text: string) => void;
}

function useSelection() {
  const [selection, setSelection] = useState<CanvasNode[]>([]);

  useEffect(() => {
    return framer.subscribeToSelection(setSelection);
  }, []);

  return selection;
}

const TextGenerator: React.FC<TextGeneratorProps> = ({ onAddToCanvas }) => {
  const { t, i18n } = useTranslation();
  const { showToast } = useToast();
  const [textType, setTextType] = useState<TextType>('paragraph');
  const [category, setCategory] = useState<ContentCategory>('technology');
  const [isLongParagraph, setIsLongParagraph] = useState(false);
  const [generatedText, setGeneratedText] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [lengthControlType, setLengthControlType] = useState<LengthControlType>('lineCount');
  const [lengthValue, setLengthValue] = useState(1);
  const [isRealTimeUpdating, setIsRealTimeUpdating] = useState(false);
  const [isValidating, setIsValidating] = useState(false);
  const [validationAttempts, setValidationAttempts] = useState(0);
  const [validationError, setValidationError] = useState<string | null>(null);
  const selection = useSelection(); // Get the current selection
  
  // Get the current language and select the appropriate texts
  const currentLanguage = i18n.language;
  const categoryTexts = currentLanguage === 'ar' ? arabicCategoryTexts : englishCategoryTexts;
  const isRtl = currentLanguage === 'ar';
  // State for automatically detected text direction
  const [detectedDirection, setDetectedDirection] = useState<'rtl' | 'ltr'>(isRtl ? 'rtl' : 'ltr');
  
  // Add debounce ref for handling rapid slider adjustments
  const generateTextTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const validationTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  // Helper function to count words in text
  const countWords = (text: string): number => {
    if (!text) return 0;
    // Split by whitespace and filter out empty strings
    return text.split(/\s+/).filter(word => word.trim().length > 0).length;
  };
  
  // Helper function to count list items
  const countListItems = (text: string): number => {
    if (!text) return 0;
    // Count the number of lines that start with a number followed by a period
    return text.split('\n').filter(line => /^\d+\./.test(line.trim())).length;
  };
  
  // Helper function to count sentences in paragraph
  const countSentences = (text: string): number => {
    if (!text) return 0;
    // Count the number of sentences (ending with ., !, or ?)
    const sentences = text.split(/[.!?]+/).filter(sentence => sentence.trim().length > 0);
    return sentences.length;
  };
  
  // Helper function to estimate number of lines in text
  const estimateLines = (text: string, width: number = 600): number => {
    // Average characters per line (estimate based on width)
    const charsPerLine = width / 8; // Rough estimate: 8px per character
    
    // Count newlines and add estimated wrapped lines
    const lines = text.split('\n');
    let totalLines = 0;
    
    lines.forEach(line => {
      // Add at least 1 line, plus any additional wrapped lines
      totalLines += 1 + Math.floor(line.length / charsPerLine);
    });
    
    return totalLines;
  };
  
  // Validate the generated content against the slider value
  const validateContent = useCallback(() => {
    if (!generatedText) return true;
    
    let isValid = false;
    let actualCount = 0;
    
    if (textType === 'heading') {
      // For headings, validate word count but don't show errors
      actualCount = countWords(generatedText);
      isValid = actualCount === lengthValue;
      
      // Always return true for headings to prevent error messages
      setValidationError(null);
      return true;
    } else if (textType === 'list') {
      // For lists, validate item count with improved counting
      actualCount = countListItems(generatedText);
      
      // Special handling for lists - allow for small variations
      // This makes the validation more forgiving for lists
      const tolerance = Math.max(1, Math.floor(lengthValue * 0.1)); // 10% tolerance or at least 1
      isValid = Math.abs(actualCount - lengthValue) <= tolerance;
      
      console.log(`List validation: expected=${lengthValue}, actual=${actualCount}, tolerance=${tolerance}, isValid=${isValid}`);
      
      // Only show validation errors for lists
      if (!isValid) {
        setValidationError(`Preview mismatch detected. Expected ${lengthValue} items but found ${actualCount}. Regenerating content...`);
        return false;
      } else {
        setValidationError(null);
        return true;
      }
    } else if (textType === 'paragraph') {
      // For paragraphs, validate sentence count but don't show errors
      actualCount = countSentences(generatedText);
      isValid = actualCount === lengthValue;
      
      // Always return true for paragraphs to prevent error messages
      setValidationError(null);
      return true;
    }
    
    // Default case - reset validation state
    setValidationError(null);
    return true;
  }, [generatedText, textType, lengthValue]);
  
  // Initialize with default text based on type
  useEffect(() => {
    generateNewText();
  }, []);

  // Update text when type or category changes
  useEffect(() => {
    // Set appropriate length value based on text type
    if (textType === 'list') {
      // For lists, default to 5 items with a reasonable range
      setLengthValue(5);
      // For lists, also set the type of length control to lineCount only
      setLengthControlType('lineCount');
    } else if (textType === 'heading') {
      // For headings, default to 5 words
      setLengthValue(5);
    } else {
      // For paragraphs, default to 1 line as required
      setLengthValue(1);
    }
    
    // Reset validation state when changing types
    setValidationError(null);
    setValidationAttempts(0);
    
    generateNewText();
  }, [textType, category, currentLanguage]);

  // Validate content after it's generated
  useEffect(() => {
    if (generatedText && !isRealTimeUpdating && !isGenerating) {
      setIsValidating(true);
      const isValid = validateContent();
      
      // Only proceed with validation logic for lists
      if (!isValid && textType === 'list') {
        // Handle invalid content outside the validateContent function to avoid circular dependencies
        // Increment validation attempts
        const newValidationAttempts = validationAttempts + 1;
        setValidationAttempts(newValidationAttempts);
        
        // If we've tried too many times, give up to prevent infinite loops
        if (newValidationAttempts >= 3) {
          const toastMessage = `Unable to generate exact item count after multiple attempts. Using best match.`;
          
          // Prevent duplicate toasts by checking if we're already showing this message
          if (validationError !== toastMessage) {
            showToast({
              message: toastMessage,
              type: 'warning',
              duration: 5000
            });
          }
          
          setValidationError(null);
          setValidationAttempts(0);
          setIsValidating(false);
          return;
        }
        
        // Try regenerating only for lists
        if (validationTimeoutRef.current) {
          clearTimeout(validationTimeoutRef.current);
        }
        
        validationTimeoutRef.current = setTimeout(() => {
          generateNewText(true);
        }, 500);
      } else {
        // Reset on success or for non-list types
        setValidationAttempts(0);
        setIsValidating(false);
      }
    }
  }, [generatedText, isRealTimeUpdating, isGenerating, validateContent, textType]);

  // Handle length value change with debouncing for real-time updates
  const handleLengthValueChange = (value: number) => {
    setLengthValue(value);
    // Update isLongParagraph based on the value for backward compatibility
    setIsLongParagraph(value > 10);
    
    // Show real-time updating indicator only for lists
    if (textType === 'list') {
      setIsRealTimeUpdating(true);
    } else {
      setIsRealTimeUpdating(false);
    }
    
    // Reset validation state
    setValidationError(null);
    setValidationAttempts(0);
    
    // Clear any existing timeout to prevent multiple rapid calls
    if (generateTextTimeoutRef.current) {
      clearTimeout(generateTextTimeoutRef.current);
    }
    
    // Set a short timeout to handle rapid slider adjustments
    generateTextTimeoutRef.current = setTimeout(() => {
      generateNewText();
      // Hide real-time updating indicator after text is generated
      setIsRealTimeUpdating(false);
    }, 50); // 50ms delay is short enough to feel real-time but allows for performance optimization
  };

  // Clean up timeout on unmount
  useEffect(() => {
    return () => {
      if (generateTextTimeoutRef.current) {
        clearTimeout(generateTextTimeoutRef.current);
      }
      if (validationTimeoutRef.current) {
        clearTimeout(validationTimeoutRef.current);
      }
    };
  }, []);

  const generateNewText = (isRegeneration = false) => {
    // Reset validation state if not regenerating
    if (!isRegeneration) {
      setValidationError(null);
      setValidationAttempts(0);
    }

    // Don't set isGenerating to true for slider adjustments to avoid UI flicker
    // Only set it for button-triggered generation or regeneration
    const isButtonTriggered = !generateTextTimeoutRef.current || isRegeneration;
    if (isButtonTriggered) {
      setIsGenerating(true);
    }
    
    try {
      // Get all texts from the category
      const textsForCategory = categoryTexts[category];
      
      // Modify text based on type - immediately without delay
      if (textType === 'heading') {
        generateHeading(textsForCategory);
      } 
      else if (textType === 'list') {
        generateList(textsForCategory);
      }
      else if (textType === 'paragraph') {
        generateParagraph(textsForCategory);
      }
    } catch (error) {
      console.error('Error generating text:', error);
      // Show error toast if available
      if (showToast) {
        showToast({ 
          message: 'Error generating text. Please try again.', 
          type: 'error' 
        });
      }
    } finally {
      if (isButtonTriggered) {
        setIsGenerating(false);
      }
    }
  };

  // Helper to generate heading with exact word count
  const generateHeading = (textsForCategory: string[]) => {
    // For headings, get multiple options and pick one randomly
    const allHeadingSentences = textsForCategory.map(text => text.split('.')[0]);
    // Shuffle the array to get random sentences
    const shuffled = [...allHeadingSentences].sort(() => 0.5 - Math.random());
    
    // Ensure we have enough sentences to work with
    if (shuffled.length === 0) {
      setGeneratedText('Sample Heading Text');
      return;
    }
    
    // Collect all words from all sentences
    const allWords = shuffled.join(' ').split(/\s+/).filter(word => word.trim().length > 0);
    
    // If we still don't have enough words, duplicate what we have
    if (allWords.length < lengthValue) {
      while (allWords.length < lengthValue) {
        allWords.push(...allWords);
      }
    }
    
    // Take exactly the number of words requested by lengthValue
    const headingWords = allWords.slice(0, lengthValue);
    let text = headingWords.join(' ');
    
    // Add punctuation if needed
    if (!text.endsWith('.') && !text.endsWith('!') && !text.endsWith('?')) {
      text += '.';
    }
    
    setGeneratedText(text);
  };

  // Helper to generate list with exact item count
  const generateList = (textsForCategory: string[]) => {
    // Shuffle the array to get random texts
    const shuffled = [...textsForCategory].sort(() => 0.5 - Math.random());
    
    // Get all sentences from all texts
    let allSentences: string[];
    
    // Use different separator for Arabic text to better handle sentence boundaries
    if (detectedDirection === 'rtl') {
      // For Arabic, we need to be more careful with sentence splitting
      allSentences = [];
      shuffled.forEach(text => {
        // Split on Arabic sentence endings (period, question mark, exclamation)
        const sentences = text.split(/[.؟!]/);
        allSentences.push(...sentences);
      });
    } else {
      allSentences = shuffled.join('. ').split('.');
    }
    
    const filteredSentences = allSentences
      .map(s => s.trim())
      .filter(s => s.length > 10);
    
    // Ensure we have enough sentences for the list
    if (filteredSentences.length < lengthValue) {
      // If we don't have enough sentences, duplicate what we have
      while (filteredSentences.length < lengthValue) {
        filteredSentences.push(...filteredSentences);
      }
    }
    
    // Take exactly the number of items requested
    const listItems = filteredSentences.slice(0, lengthValue);
    
    // Enhance list items to make them more list-like
    const enhancedListItems = listItems.map(item => {
      // Define action verbs based on language
      const actionVerbs = detectedDirection === 'rtl' 
        ? ['فكر في', 'استكشف', 'راجع', 'حلل', 'طبق', 'طور', 'ابتكر', 'قيّم', 'راقب', 'تابع'] 
        : ['Consider', 'Explore', 'Review', 'Analyze', 'Implement', 'Develop', 'Create', 'Assess', 'Monitor', 'Evaluate'];
      
      // 50% chance to add an action verb to the beginning
      if (Math.random() > 0.5) {
        const randomVerb = actionVerbs[Math.floor(Math.random() * actionVerbs.length)];
        // Ensure we don't repeat action verbs at the beginning
        if (!item.startsWith(randomVerb)) {
          if (detectedDirection === 'rtl') {
            // For Arabic, just concatenate the verb with the sentence
            return `${randomVerb} ${item}`;
          } else {
            // For English, lowercase the first letter of the sentence
            return `${randomVerb} ${item.charAt(0).toLowerCase()}${item.slice(1)}`;
          }
        }
      }
      
      return item;
    });
    
    // Create ordered list with numbers, handling RTL properly for Arabic
    let text;
    if (detectedDirection === 'rtl') {
      // For RTL (Arabic), include the numbers with correct RTL formatting
      text = enhancedListItems.map((s, index) => `${index + 1}. ${s}`).join('\n');
    } else {
      // Regular LTR format
      text = enhancedListItems.map((s, index) => `${index + 1}. ${s}`).join('\n');
    }
    
    if (enhancedListItems.length !== lengthValue) {
      console.warn(`Warning: Generated ${enhancedListItems.length} items instead of requested ${lengthValue}`);
      if (showToast) {
        showToast({
          message: t('listItemCountWarning', { count: enhancedListItems.length }),
          type: 'warning'
        });
      }
    }
    
    setGeneratedText(text);
  };

  // Helper to generate paragraph with exact sentence count
  const generateParagraph = (textsForCategory: string[]) => {
    // Shuffle the array to get random texts
    const shuffled = [...textsForCategory].sort(() => 0.5 - Math.random());
    
    // Get all sentences from all texts
    const allSentences = shuffled.join('. ').split('.');
    // Filter out empty sentences and very short ones
    const filteredSentences = allSentences
      .map(s => s.trim())
      .filter(s => s.length > 10);
    
    // Ensure we have enough sentences
    if (filteredSentences.length < lengthValue) {
      // If we don't have enough sentences, duplicate what we have
      while (filteredSentences.length < lengthValue) {
        filteredSentences.push(...filteredSentences);
      }
    }
    
    // Take exactly the number of sentences requested
    const paragraphSentences = filteredSentences.slice(0, lengthValue);
    
    // Join sentences into a paragraph with proper punctuation
    const paragraph = paragraphSentences
      .map(s => s.endsWith('.') ? s : s + '.')
      .join(' ');
    
    setGeneratedText(paragraph);
  };

  // Set initial text direction based on UI language
  useEffect(() => {
    setDetectedDirection(isRtl ? 'rtl' : 'ltr');
  }, [isRtl]);

  // Update detected direction whenever generated text changes
  useEffect(() => {
    if (generatedText) {
      // If UI is in Arabic, prioritize RTL alignment but still detect for mixed content
      if (isRtl) {
        setDetectedDirection('rtl');
        console.log(`Text direction set to RTL based on UI language: ${currentLanguage}`);
      } else {
        const direction = detectTextDirection(generatedText);
        setDetectedDirection(direction);
        console.log(`Text direction detected: ${direction}, UI language: ${currentLanguage}`);
      }
    }
  }, [generatedText, isRtl, currentLanguage]);

  // Update text direction when language changes
  useEffect(() => {
    // When language changes, prioritize the UI language setting
    setDetectedDirection(isRtl ? 'rtl' : 'ltr');
    
    // If there's already text, regenerate it with new language
    if (generatedText) {
      generateNewText();
    }
  }, [currentLanguage]);

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
      
      // Add RTL direction and text alignment for Arabic based on detected direction
      if (detectedDirection === 'rtl') {
        styledText.direction = 'rtl';
        styledText.textAlign = 'right';
        // Set the writing direction to RTL for proper text rendering
        styledText.textDirection = 'RTL';
        
        // Try all possible Framer properties that might control alignment
        // Some of these might not work, but we're trying everything to ensure
        // right alignment in the Framer Canvas UI
        styledText.textAlignHorizontal = 'right';
        styledText.horizontalAlignment = 'right';
        styledText.alignment = 'right';
        styledText.paragraphAlignment = 'right';
        styledText.paragraphAlignHorizontal = 'right';
        styledText.textAlignVertical = 'top'; // Ensure vertical alignment is top
        
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
          // Use HTML <ol> and <li> elements for proper RTL number rendering
          styledText.useHtmlLists = true;
          styledText.listDirection = 'rtl';
          styledText.listStyleType = 'decimal-rtl';
          styledText.textRtl = true;
          styledText.listMarginRight = 20;
          styledText.listNumberAlignment = 'right';
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
          if (detectedDirection === 'rtl') {
            attributes.direction = 'rtl';
            attributes.textAlign = 'right';
            // Set the writing direction to RTL for proper text rendering
            attributes.textDirection = 'RTL';
            
            // Try all possible Framer properties that might control alignment
            // Some of these might not work, but we're trying everything to ensure
            // right alignment in the Framer Canvas UI
            attributes.textAlignHorizontal = 'right';
            attributes.horizontalAlignment = 'right';
            attributes.alignment = 'right';
            attributes.paragraphAlignment = 'right';
            attributes.paragraphAlignHorizontal = 'right';
            attributes.textAlignVertical = 'top'; // Ensure vertical alignment is top
            
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
              // Use HTML <ol> and <li> elements for proper RTL number rendering
              attributes.useHtmlLists = true;
              attributes.listDirection = 'rtl';
              attributes.listStyleType = 'decimal-rtl';
              attributes.textRtl = true;
              attributes.listMarginRight = 20;
              attributes.listNumberAlignment = 'right';
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
          
          // Generate new text immediately after updating
          generateNewText();
        } catch (error) {
          console.error('Error updating text layer:', error);
        }
      });
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.category-dropdown')) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="text-generator">
      <div>
        <label className="text-type-label">{t('textType')}</label>
        <TextTypeSelector selectedType={textType} onChange={setTextType} />
      </div>
      
      <div>
        <label className="text-type-label">{t('category')}</label>
        <div className="category-dropdown">
          <button
            className="category-dropdown-button"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            aria-haspopup="listbox"
            aria-expanded={isDropdownOpen}
          >
            <span>{t(`categories.${category}`)}</span>
            <Icon name="chevron-down" className="icon" />
          </button>
          <div className={`category-dropdown-menu ${isDropdownOpen ? 'open' : ''}`} role="listbox">
            {Object.keys(categoryTexts).map((cat) => (
              <button
                key={cat}
                className={`category-item ${cat === category ? 'active' : ''}`}
                onClick={() => {
                  setCategory(cat as ContentCategory);
                  setIsDropdownOpen(false);
                }}
                role="option"
                aria-selected={cat === category}
              >
                <span className="check-icon"></span>
                <span className="category-item-text">{t(`categories.${cat}`)}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
      
      {/* Length Control - with appropriate label based on text type */}
      <LengthControl
        value={lengthValue}
        onChange={handleLengthValueChange}
        type={lengthControlType}
        onTypeChange={setLengthControlType}
        min={textType === 'list' ? 3 : 1}
        max={textType === 'list' ? 10 : textType === 'heading' ? 10 : 30}
        step={1}
        labelType={
          textType === 'heading' ? 'words' : 
          textType === 'list' ? 'items' : 
          'lines'
        }
      />
      
      {/* Only show validation error for lists */}
      {validationError && textType === 'list' && (
        <div className="validation-error" style={{
          color: '#ef4444',
          fontSize: '0.85rem',
          marginTop: '0.5rem',
          marginBottom: '0.5rem',
          padding: '0.5rem',
          backgroundColor: 'rgba(239, 68, 68, 0.1)',
          borderRadius: '0.25rem',
          textAlign: 'center'
        }}>
          {validationError}
        </div>
      )}
      
      <TextPreview 
        text={generatedText}
        textType={textType}
        isUpdating={isRealTimeUpdating}
        isRtl={detectedDirection === 'rtl'}
        isLoading={isGenerating || isValidating}
      />
      
      <div className="action-buttons">
        <div className="action-buttons-inner">
          <button
            className="generate-button"
            onClick={() => {
              setValidationError(null);
              setValidationAttempts(0);
              generateNewText();
            }}
            disabled={isGenerating || isValidating}
          >
            {t('generate')}
          </button>
          <button
            className="add-to-canvas-button"
            onClick={handleAddToCanvas}
            disabled={isValidating}
          >
            {t('addToCanvas')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TextGenerator; 