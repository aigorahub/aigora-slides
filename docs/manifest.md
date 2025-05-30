# Aigora Slides Template Manifest

## Project Structure Overview

```
.
├── src/
│   ├── slides/
│   │   ├── example-deck.md    # Comprehensive example presentation
│   │   └── template.md        # Clean template for new presentations
│   ├── index.njk              # Homepage listing all slide decks
│   ├── about.njk              # About page showcasing template
│   └── css/
│       ├── style.css          # Tailwind CSS with custom utilities & dark mode
│       └── reveal-aigora.css  # Custom reveal.js theme with Aigora design
├── _includes/
│   ├── layout.njk             # Base HTML layout with dark mode toggle
│   └── reveal-layout.njk      # Reveal.js slide deck layout with plugins
├── assets/
│   ├── aigora-icon.png        # Aigora logo/favicon (properly sized)
│   └── reveal.js/             # Reveal.js assets (copied from node_modules)
├── docs/
│   ├── manifest.md            # This file
│   ├── deployment.md          # Netlify deployment guide
│   └── quick-start.md         # Quick start guide for users
├── _site/                     # Build output (git ignored)
├── netlify.toml               # Netlify deployment configuration
├── package.json               # Dependencies configured for Netlify
├── package-lock.json          # Dependency lock file
├── tailwind.config.js         # Tailwind + Aigora theme + dark mode
├── postcss.config.js          # PostCSS configuration
├── .eleventy.js               # Eleventy + reveal.js configuration
├── .gitignore                 # Git ignore patterns
├── CHANGELOG.md               # Version history and features
└── README.md                  # Comprehensive documentation
```

## Key Features Implemented

### 🎨 Design System
- **Logo Integration**: Properly sized Aigora logo without cropping
- **Dark Mode Toggle**: Visual toggle button with localStorage persistence
- **Consistent Theming**: Sage for structure, lavender for highlights
- **Responsive Design**: Mobile-friendly layouts

### 🖥️ Presentation Features
- **Markdown-based Slides**: Simple `---` and `--` separators
- **Speaker Notes**: Press 'S' for presenter view
- **PDF Export**: Add `?print-pdf` to URL
- **Keyboard Navigation**: Full reveal.js shortcuts + custom 'T' for theme toggle
- **Syntax Highlighting**: Code blocks with proper styling

### 🚀 Production Ready
- **Netlify Optimized**: All dependencies moved to production
- **Build Scripts**: Using `npx` for reliable deployments
- **Configuration**: Complete `netlify.toml` with security headers
- **Error Handling**: Graceful fallbacks and proper asset copying

## Build Process

1. **CSS Build**: 
   - `npx postcss src/css/style.css` → `_site/assets/css/style.css`
   - `npx postcss src/css/reveal-aigora.css` → `_site/assets/css/reveal-aigora.css`
2. **HTML Build**: Eleventy processes `.njk` and `.md` files → `_site/`
3. **Asset Copy**: 
   - Static assets → `_site/assets/`
   - Reveal.js files → `_site/assets/reveal.js/`

## Scripts

- `npm start` - Build and serve with live reload
- `npm run build` - Production build (Netlify compatible)
- `npm run build:css` - Build CSS only (with npx)
- `npm run build:11ty` - Build HTML only
- `npm run serve` - Serve without initial build

## Slide Creation Workflow

### Basic Structure
```markdown
---
layout: reveal-layout.njk
title: My Presentation
---

# Title Slide

---

## Content Slide

Content here

--

### Vertical Slide

Use for detailed content
```

### Advanced Features
- **Speaker Notes**: Add `Note:` sections
- **Slide Attributes**: Use `<!-- .slide: class="center" -->`
- **Backgrounds**: `data-background="color"` or `data-background-image="url"`
- **Fragments**: `class="fragment"` for animations

## Design Implementation

### Theme System
- **Light Theme**: Fog background, sage/lavender accents
- **Dark Theme**: Charcoal background, maintained accent colors
- **Toggle Persistence**: localStorage saves user preference

### Typography Hierarchy
- **Headers**: Cormorant SC (serif, premium feel)
- **Body**: Roboto (clean, readable)
- **Meta**: Roboto Condensed (compact display)

### Color Strategy
- **Sage (#5FB96A)**: Primary structure, navigation, headers
- **Lavender (#A986C4)**: Special emphasis only
- **Consistent Application**: Same logic across all components

## Deployment Configuration

### Dependencies
All build tools in `dependencies` (not `devDependencies`) for Netlify compatibility:
- @11ty/eleventy
- postcss, postcss-cli, autoprefixer
- tailwindcss, daisyui
- reveal.js, markdown-it

### Netlify Settings
- **Build Command**: `npm install && npm run build`
- **Publish Directory**: `_site`
- **Node Version**: 18
- **Environment**: Production ready

## Quality Assurance

### Performance
- Static site generation for fast loading
- Optimized CSS with only used utilities
- Efficient asset copying and organization

### Accessibility
- Proper keyboard navigation
- Focus states with custom glow
- Screen reader friendly markup
- Semantic HTML structure

### Cross-Platform
- Windows development environment tested
- Git Bash compatibility
- Netlify deployment verified
- Multiple browser support

This template successfully transforms Eleventy into a sophisticated presentation platform while maintaining the premium Aigora aesthetic.