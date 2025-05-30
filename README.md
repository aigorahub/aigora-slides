# Aigora Slides Template

A sophisticated **reveal.js** slide deck template built with **Eleventy** and **Tailwind CSS**, implementing the complete **Aigora design system**. Perfect for creating beautiful presentations with markdown simplicity and professional styling.

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/aigora/aigora-slides)

## ✨ Features

### 🎨 Design Excellence
- **Premium Aigora Design System** - Sage green & lavender accent colors
- **Typography Hierarchy** - Cormorant SC headers, Roboto body, professional balance
- **Dark/Light Mode Toggle** - Seamless theme switching with localStorage persistence
- **Responsive Design** - Mobile-friendly layouts that work everywhere

### 🖥️ Presentation Power
- **Markdown-Based Slides** - Simple `---` and `--` separators for horizontal/vertical slides
- **Speaker Notes** - Press `S` for presenter view with notes
- **PDF Export** - Add `?print-pdf` to URL for printing
- **Syntax Highlighting** - Beautiful code blocks with proper theming
- **Live Reload** - Instant preview during development

### 🚀 Production Ready
- **Netlify Optimized** - Deployment configuration included and tested
- **Fast Loading** - Static site generation with optimized assets
- **SEO Friendly** - Proper meta tags and semantic HTML
- **Cross-Platform** - Works on Windows, macOS, and Linux

## 🚀 Quick Start

### 1. Clone & Install
```bash
git clone https://github.com/aigora/aigora-slides.git
cd aigora-slides
npm install
```

### 2. Start Development
```bash
npm start
```
This builds CSS, generates HTML, and serves at `http://localhost:8080` with live reload.

### 3. Create Your First Presentation
Create a new file in `src/slides/my-presentation.md`:

```markdown
---
layout: reveal-layout.njk
title: My Amazing Presentation
---

# Welcome to Aigora

## A Professional Slide Template

---

## Key Features

- Beautiful Aigora design
- Markdown simplicity
- Dark mode support
- Mobile responsive

--

### Speaker Notes

Note: 
Press 'S' to open speaker view.
This note is only visible to you!

---

## Thank You

Questions?
```

Visit `http://localhost:8080/slides/my-presentation/` to see your slides!

## 📖 Complete Guide

### Slide Creation Syntax

#### Horizontal Slides (---) 
```markdown
# Slide 1
---
# Slide 2
---
# Slide 3
```

#### Vertical Slides (--)
```markdown
## Main Topic
--
### Detail 1
--
### Detail 2
```

#### Speaker Notes
```markdown
## Public Slide Content

Note:
These are private speaker notes.
Only visible in presenter mode (press 'S').
```

#### Slide Attributes
```markdown
<!-- .slide: data-background="linear-gradient(45deg, #5FB96A, #A986C4)" -->
## Custom Background Slide
```

### Styling Classes

#### Aigora Highlights
- `.highlight-sage` - Sage green emphasis
- `.highlight-lavender` - Lavender emphasis
- `.text-sage` - Sage text color
- `.text-lavender` - Lavender text color

#### Layout & Animation
- `.center` - Center slide content
- `.fragment` - Reveal animation on click
- `.card` - Aigora card styling
- `.animate-fadeInUp` - Fade in animation

#### Example Usage
```markdown
## Important Point {.highlight-sage}

<div class="fragment card">
This content appears with animation
</div>
```

### Keyboard Shortcuts

| Key | Action |
|-----|--------|
| **Arrow Keys** | Navigate slides |
| **Space** | Next slide |
| **S** | Speaker view |
| **F** | Fullscreen |
| **Esc** | Slide overview |
| **T** | Toggle light/dark theme |
| **?** | Help menu |

## 🎨 Customization

### Colors
The Aigora design system is configured in `tailwind.config.js`:

```javascript
theme: {
  extend: {
    colors: {
      sage: '#5FB96A',      // Primary brand color
      lavender: '#A986C4',  // Secondary accent
      fog: '#EDEDED',       // Light background
      charcoal: '#1A1A1A'   // Dark theme
    }
  }
}
```

### Typography
- **Headers**: Cormorant SC (premium serif)
- **Body**: Roboto (clean sans-serif)  
- **Meta**: Roboto Condensed (compact display)

### Custom Styling
Edit `src/css/reveal-aigora.css` to modify the reveal.js theme:

```css
.reveal h1 {
  color: var(--sage);
  text-shadow: 0 2px 4px rgba(0,0,0,0.1);
}
```

## 📱 Responsive Design

The template automatically adapts to different screen sizes:

- **Desktop**: Full navigation and features
- **Tablet**: Touch-friendly navigation
- **Mobile**: Optimized typography and spacing

## 🔧 Development

### Project Structure
```
src/
├── slides/           # Your presentations (.md files)
├── css/             # Stylesheets
│   ├── style.css    # Tailwind + utilities
│   └── reveal-aigora.css  # Reveal.js theme
├── index.njk        # Homepage listing
└── about.njk        # About page

_includes/
├── layout.njk       # Base layout
└── reveal-layout.njk # Slide layout
```

### Build Commands

```bash
# Development with live reload
npm start

# Production build
npm run build

# CSS only
npm run build:css

# HTML only  
npm run build:11ty

# Serve without rebuild
npm run serve
```

### Adding Plugins

To add reveal.js plugins, modify `_includes/reveal-layout.njk`:

```javascript
plugins: [
  RevealMarkdown,
  RevealHighlight,
  RevealNotes,
  RevealMath,
  RevealZoom,
  RevealSearch,
  // Add new plugins here
]
```

## 🌐 Deployment

### Netlify (Recommended)

1. **Quick Deploy**: Click the "Deploy to Netlify" button above
2. **Manual**: Connect your GitHub repo to Netlify

The included `netlify.toml` handles everything:
- Build command: `npm install && npm run build`
- Publish directory: `_site`
- Node version: 18

### Other Platforms

**GitHub Pages**, **Vercel**, **Surge**, or any static host:

```bash
npm run build
# Upload the _site/ folder
```

### PDF Export

For PDF versions of your slides:
1. Visit your presentation URL
2. Add `?print-pdf` (e.g., `https://yoursite.com/slides/deck/?print-pdf`)
3. Print using browser's print function

## 🎯 Examples

### Business Presentation
```markdown
---
layout: reveal-layout.njk
title: Q4 Results
---

# Q4 Results {.highlight-sage}

**Aigora Performance Review**

---

## Key Metrics

<div class="card">

- Revenue: **↗ 15%**
- Users: **↗ 23%**  
- Satisfaction: **94%**

</div>

--

### Regional Breakdown

<!-- .slide: data-background="#5FB96A" -->

Note:
Remember to mention the APAC growth
```

### Technical Workshop
```markdown
---
layout: reveal-layout.njk
title: API Best Practices  
---

# API Design

## Best Practices Workshop

---

## RESTful Principles

```python
# Clean endpoint design
GET /api/users/{id}
POST /api/users
PUT /api/users/{id}
DELETE /api/users/{id}
```

Note:
Emphasize consistency and predictability
```

## 🛠️ Troubleshooting

### Build Issues
- **CSS not updating**: Run `npm run build:css`
- **Slides not displaying**: Check markdown syntax and front matter
- **Images missing**: Ensure files are in `assets/` directory

### Windows-Specific
- Use Git Bash or PowerShell
- Forward slashes in paths: `src/slides/deck.md`
- If permissions errors, run as administrator

### Live Reload
- Clear browser cache if styles seem stuck
- Check terminal for build errors
- Restart development server: `Ctrl+C` then `npm start`

## 📚 Documentation

- **[Quick Start Guide](docs/quick-start.md)** - Get up and running fast
- **[Deployment Guide](docs/deployment.md)** - Netlify configuration details
- **[Project Manifest](docs/manifest.md)** - Complete technical overview
- **[Reveal.js Docs](https://revealjs.com/)** - Official reveal.js documentation

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

MIT License - feel free to use this template for your presentations!

## 🎉 Created with

- **[Eleventy](https://www.11ty.dev/)** - Static site generator
- **[Reveal.js](https://revealjs.com/)** - Presentation framework  
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS
- **[Aigora Design System](https://aigora.com/)** - Professional styling

---

**Ready to create amazing presentations?** Clone this repo and start building!

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/aigora/aigora-slides)