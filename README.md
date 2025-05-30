# Aigora Eleventy Template

A sophisticated Eleventy starter template implementing the Aigora design system with Tailwind CSS and DaisyUI.

## Features

- 🎨 Complete Aigora design system implementation
- 🌈 Light theme with sage and lavender accents
- 📱 Fully responsive design
- ⚡ Optimized performance with Eleventy
- 🎯 Tailwind CSS with custom utilities
- 💅 DaisyUI components with Aigora theme
- 🖋️ Premium typography with Cormorant SC headers
- 🌠 Advanced shadow system and animations
- ♿ Accessibility-focused with proper focus states

## Quick Start

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/aigora/aigora-eleventy-site.git
cd aigora-eleventy-site

# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm run build
```

## Available Scripts

- `npm start` - Start development server with live reload
- `npm run build` - Build for production
- `npm run build:css` - Build CSS only
- `npm run build:11ty` - Build Eleventy only

## Design System

### Colors

- **Primary**: Sage (#5FB96A)
- **Secondary**: Lavender (#A986C4)
- **Background**: Fog (#EDEDED)
- **Text**: Dark Charcoal (#1E1E1E)
- **Error**: Red (#DB2955)

### Typography

- **Headers**: Cormorant SC (serif)
- **Body**: Roboto (sans-serif)
- **Meta**: Roboto Condensed

### Components

The template includes pre-styled components:
- Buttons (primary, secondary, outline, danger)
- Cards with hover effects
- Form elements with focus states
- Navigation header
- Footer

### Custom Utilities

- `.shadow-aigora` - Standard layered shadow
- `.hover-lift` - Lift effect on hover
- `.animate-fadeInUp` - Fade in animation
- `.focus-glow-sage` - Sage focus glow
- `.squircle` - Squircle shape utility

## Project Structure

```
├── _includes/          # Layout templates
├── src/               # Source files
│   ├── css/           # Tailwind CSS input
│   └── index.njk      # Main page
├── assets/            # Static assets
├── _site/             # Build output (git ignored)
└── .eleventy.js       # Eleventy configuration
```

## Customization

### Adding Pages

Create new `.njk` files in the `src` directory:

```njk
---
layout: layout.njk
title: Your Page Title
---

<h1 class="text-4xl font-header text-darkText">Your Content</h1>
```

### Extending Styles

Add custom styles in `src/css/style.css`:

```css
@layer utilities {
  .your-custom-class {
    /* Your styles */
  }
}
```

### Modifying Theme

Update colors and fonts in `tailwind.config.js`.

## Deployment

### Netlify (Recommended)

1. Push to GitHub
2. Connect repository to Netlify
3. Build command: `npm run build`
4. Publish directory: `_site`

### Build Output

The production build creates optimized files in `_site/`:
- Minified CSS with only used utilities
- Optimized HTML
- Copied assets

## Browser Support

- Chrome (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)
- Edge (last 2 versions)

## License

MIT License - feel free to use for any project.

## Support

For questions or issues, please contact the Aigora team.