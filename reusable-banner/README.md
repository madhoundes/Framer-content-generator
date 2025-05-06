# Reusable Banner Component

This folder contains a reusable React Banner component.

## Prerequisites

- React
- `i18next` and `react-i18next` (if not already in your project, a minimal setup is provided in `locales/i18n.js`. You might need to install these: `npm install i18next react-i18next i18next-browser-languagedetector`)

## SVG Asset

This component uses the SVG icon `btn-buymecoffe-CnCS_ovA.svg` for the "Buy Me a Coffee" button, which is already included in `src/assets/icons/`.

## Installation

1.  Copy the `reusable-banner` folder into your project (e.g., into your `src/components` directory or a dedicated `packages` directory).
2.  Ensure you have the necessary dependencies installed (React, i18next, react-i18next).

## Usage

```jsx
import React from 'react';
import Banner from './path/to/reusable-banner/src/Banner'; // Adjust path accordingly
// If your main project doesn't initialize i18next,
// you might need to import the local setup for the banner:
// import './path/to/reusable-banner/locales/i18n'; // This will initialize i18n if not already done

function App() {
  const [showBanner, setShowBanner] = React.useState(true);

  if (!showBanner) {
    return <button onClick={() => setShowBanner(true)}>Show Banner</button>;
  }

  return (
    <div>
      {/* Other app content */}
      <Banner 
        onClose={() => setShowBanner(false)} 
        initialLocale="en" // Optional: "en" or "ar"
      />
      {/* Other app content */}
    </div>
  );
}

export default App;
```

### Props

-   `onClose`: (Function) Required. A callback function that will be called when the banner's close button is clicked.
-   `initialLocale`: (string) Optional. Sets the initial language for the banner ('en' or 'ar'). If not provided, it will try to detect the language or use the existing i18next configuration.

## Styling

The component includes its own CSS (`Banner.css`). You can customize it further if needed.
The main classes are:
- `.banner`
- `.banner-content`
- `.banner-header`
- `.banner-title`
- `.banner-close-button`
- `.banner-description`
- `.banner-actions`
- `.banner-action-button`
- `.get-template`
- `.buy-coffee`
- `.coffee-icon`
- `.banner-footer`
- `.banner-action-label`

## Internationalization (i18n)

The banner uses `react-i18next` for translations.
-   Translations are provided in `locales/en.json` and `locales/ar.json`.
-   A minimal i18n setup is included in `locales/i18n.js`. If your project already uses i18next, the banner should integrate with your existing setup. Otherwise, importing `locales/i18n.js` once in your application (e.g., in your main `App.js` or `index.js`) will configure i18next for the banner.
-   The `initialLocale` prop can be used to suggest a starting language ('en' or 'ar').

## Zipping the Folder

To distribute this component, you can zip the `reusable-banner` folder:

-   **macOS/Linux:** Navigate to the parent directory of `reusable-banner` in your terminal and run:
    `zip -r reusable-banner.zip reusable-banner`
-   **Windows:** Right-click on the `reusable-banner` folder, select "Send to", then "Compressed (zipped) folder".

---

# دليل تثبيت واستخدام البانر (Banner) (Arabic Guide)

## المتطلبات الأساسية

- React
- المكتبات `i18next` و `react-i18next` (إذا لم تكن موجودة بالفعل في مشروعك، فهناك إعداد مصغر متوفر في `locales/i18n.js`. قد تحتاج إلى تثبيتها: `npm install i18next react-i18next i18next-browser-languagedetector`)

## طريقة التثبيت

1. انسخ مجلد `reusable-banner` بالكامل إلى مشروعك (مثلاً في دليل `src/components` أو في دليل مخصص للمكونات).
2. تأكد من تثبيت جميع المكتبات اللازمة (React، i18next، react-i18next).

## طريقة الاستخدام

```jsx
import React from 'react';
// قم بتعديل المسار حسب موقع الملف في مشروعك
import Banner from './المسار/إلى/reusable-banner/src/Banner'; 
// إذا كان مشروعك لا يقوم بتهيئة i18next، قد تحتاج إلى استيراد الإعداد المحلي للبانر:
// import './المسار/إلى/reusable-banner/locales/i18n';

function App() {
  const [showBanner, setShowBanner] = React.useState(true);

  if (!showBanner) {
    return <button onClick={() => setShowBanner(true)}>إظهار البانر</button>;
  }

  return (
    <div>
      {/* محتوى التطبيق الآخر */}
      <Banner 
        onClose={() => setShowBanner(false)} 
        initialLocale="ar" // اختياري: "en" للإنجليزية أو "ar" للعربية
      />
      {/* محتوى التطبيق الآخر */}
    </div>
  );
}

export default App;
```

### الخصائص (Props)

- `onClose`: (دالة) مطلوبة. دالة يتم استدعاؤها عند النقر على زر الإغلاق.
- `initialLocale`: (نص) اختياري. يحدد اللغة الأولية للبانر ('en' للإنجليزية أو 'ar' للعربية). إذا لم يتم تحديدها، سيحاول النظام اكتشاف اللغة أو استخدام إعدادات i18next الحالية.

## دعم اللغة العربية

يدعم البانر اللغة العربية بشكل كامل مع دعم الاتجاه من اليمين إلى اليسار (RTL):

1. لاستخدام البانر باللغة العربية، قم بتعيين خاصية `initialLocale` إلى "ar":
   ```jsx
   <Banner onClose={() => setShowBanner(false)} initialLocale="ar" />
   ```

2. سيتم تحميل ترجمات اللغة العربية تلقائياً من ملف `locales/ar.json`.

3. سيقوم المكون تلقائياً بتعيين الاتجاه إلى RTL عندما تكون اللغة العربية هي اللغة النشطة.

4. يمكنك تخصيص الترجمات العربية عن طريق تعديل ملف `locales/ar.json`. 