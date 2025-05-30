# Changelog

All notable changes to the Aigora Slides template are documented here.

## [1.0.0] - 2024-01-15

### 🎉 Initial Release - Transformed from Eleventy Template to Slides Template

#### Added
- **Reveal.js Integration**
  - Full reveal.js 5.2.1 support with all plugins (markdown, highlight, notes, math, zoom, search)
  - Custom reveal.js layout template (`_includes/reveal-layout.njk`)
  - Aigora-themed reveal.js CSS (`src/css/reveal-aigora.css`)
  
- **Slide Management**
  - Markdown-based slide creation in `src/slides/` directory
  - Example slide deck showcasing all features (`src/slides/example-deck.md`)
  - Slide deck template for quick starts (`src/slides/template.md`)
  - Custom Eleventy filter for processing slide separators (`---` and `--`)
  
- **Enhanced Homepage**
  - New index page listing all available presentations
  - Quick start guide with keyboard shortcuts
  - Feature showcase
  
- **Documentation**
  - Comprehensive README with reveal.js specific instructions
  - Quick start guide (`docs/quick-start.md`)
  - Updated manifest documenting new structure
  
- **Design Features**
  - Light/dark theme toggle (press 'T')
  - Custom classes for text highlighting (`.highlight-sage`, `.highlight-lavender`)
  - Responsive design optimized for presentations
  - Speaker notes support
  - PDF export capability

#### Changed
- **Project Metadata**
  - Renamed from `aigora-eleventy-template` to `aigora-slides`
  - Updated description to reflect reveal.js focus
  - Updated repository URL
  
- **Build Process**
  - Added reveal.js asset copying from node_modules
  - Updated CSS build to include reveal-aigora.css
  - Added markdown file support to Tailwind content paths
  
- **Dependencies**
  - Added `reveal.js` as production dependency
  - Added `markdown-it` and `markdown-it-attrs` for enhanced markdown processing
  - Removed DaisyUI from keywords (still used but not primary focus)

#### Technical Details
- Eleventy configuration enhanced with markdown processing
- PostCSS now builds multiple CSS files
- Tailwind config updated to scan markdown files
- Custom reveal.js initialization with Aigora-specific settings

### Migration from Original Template
If migrating from the original Aigora Eleventy template:
1. Update package.json dependencies
2. Add reveal-layout.njk to _includes
3. Create src/slides directory
4. Add reveal-aigora.css
5. Update .eleventy.js configuration

---

Built with ❤️ by Aigora 