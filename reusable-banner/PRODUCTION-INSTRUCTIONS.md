# Production Instructions for Framer Marketplace

This document provides instructions for preparing and submitting the Banner component to the Framer marketplace.

## Preparing the Production Version

1. **Build the project**:
   ```
   cd reusable-banner
   npm run build
   ```
   This will create a `dist` folder with all the necessary files.

2. **Create the ZIP file**:
   ```
   cd dist
   zip -r ../banner-component-production.zip .
   ```
   This will create a `banner-component-production.zip` file in the parent directory.

## Submission Checklist

Before submitting to the Framer marketplace, ensure:

- [x] All code is properly formatted and optimized
- [x] The component works in both English and Arabic
- [x] The component includes proper documentation (FRAMER-README.md)
- [x] The package.json includes all necessary Framer metadata
- [x] All dependencies are properly listed as peerDependencies
- [x] The SVG asset is included and correctly referenced

## Submission Process

1. Go to the Framer Developer Dashboard
2. Choose "Create New" > "Component"
3. Upload the `banner-component-production.zip` file
4. Fill in the requested metadata:
   - Title: "Banner Component"
   - Description: Use content from FRAMER-README.md
   - Category: UI Components
   - Tags: banner, notification, multilingual, rtl
5. Add screenshots showing the component in action
6. Submit for review

## Testing

Before submission, test the component by:

1. Installing the ZIP in a new Framer project
2. Checking that all features work correctly
3. Verifying English and Arabic language support
4. Ensuring the component is responsive

## Support Contact

For any issues with the submission process:
- Framer Support: support@framer.com
- Developer Documentation: https://www.framer.com/developers/ 