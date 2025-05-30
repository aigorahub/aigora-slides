# Aigora Eleventy Template Manifest

## Project Structure Overview

```
.
├── src/
│   ├── index.njk          # Design system showcase page
│   ├── about.njk          # Example secondary page
│   └── css/
│       └── style.css      # Tailwind CSS with custom utilities
├── _includes/
│   └── layout.njk         # Base HTML layout template
├── assets/
│   ├── aigora-icon.png    # Aigora logo/favicon
│   └── .placeholder       # Placeholder file
├── _site/                 # Build output (git ignored)
├── node_modules/          # Dependencies (git ignored)
├── docs/
│   ├── manifest.md        # This file
│   ├── plans.md           # Project plans
│   └── todo.md            # Todo list
├── package.json           # Node.js dependencies and scripts
├── package-lock.json      # Dependency lock file
├── tailwind.config.js     # Tailwind + DaisyUI + Aigora theme
├── postcss.config.js      # PostCSS configuration
├── .eleventy.js           # Eleventy configuration
├── .gitignore             # Git ignore patterns
└── README.md              # Comprehensive documentation
```

## Key Files Description

### Source Files
- **`src/index.njk`** - Complete design system showcase with typography, colors, components
- **`src/about.njk`** - Example page demonstrating template usage
- **`src/css/style.css`** - Tailwind directives + custom utilities (shadows, animations, squircle)

### Configuration
- **`tailwind.config.js`** - Complete Aigora design system colors, fonts, spacing, and DaisyUI theme
- **`postcss.config.js`** - PostCSS plugins for Tailwind and Autoprefixer
- **`.eleventy.js`** - Eleventy config with passthrough copy and watch targets
- **`package.json`** - Project metadata, scripts, and dependencies

### Templates
- **`_includes/layout.njk`** - Base HTML structure with Aigora theme, fonts, and favicon

### Assets
- **`assets/aigora-icon.png`** - Aigora brand icon used as favicon and in headers

### Documentation
- **`README.md`** - Complete setup guide, design system docs, and deployment instructions
- **`docs/manifest.md`** - Project structure documentation
- **`.gitignore`** - Excludes build artifacts, dependencies, OS files, and editor files

## Build Process

1. **CSS Build**: PostCSS processes `src/css/style.css` → `_site/assets/css/style.css`
2. **HTML Build**: Eleventy processes `.njk` files → `_site/` HTML files
3. **Asset Copy**: Static assets are copied to `_site/`

## Scripts

- `npm start` - Build and serve with live reload
- `npm run build` - Production build
- `npm run build:css` - Build CSS only
- `npm run build:11ty` - Build HTML only