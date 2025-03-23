# Framer Text Generator Plugin

A Framer plugin for generating text content with support for English and Arabic languages.

## Features

- Generate different types of text (paragraphs, headings, lists)
- Choose from various content categories (technology, business, marketing, etc.)
- Bilingual support (English and Arabic)
- RTL/LTR layout switching
- Adjustable paragraph length
- Copy text to clipboard
- Add text directly to Framer canvas

## Setup

1. Install dependencies:
```bash
npm install
```

2. Download required fonts:
- Inter (English): https://fonts.google.com/specimen/Inter
- Noto Sans Arabic: https://fonts.google.com/noto/specimen/Noto+Sans+Arabic

Place the font files in the `public/fonts` directory.

3. Start the development server:
```bash
npm run dev
```

4. Build for production:
```bash
npm run build
```

5. Package the plugin:
```bash
npm run pack
```

## Project Structure

- `src/components`: Reusable UI components
- `src/styles`: Global styles and variables
- `src/locales`: Language files (EN, AR)
- `public/fonts`: Font files

## Dependencies

- React
- Tailwind CSS
- i18next for localization
- Feather Icons
