---
layout: reveal-layout.njk
title: Aigora Slide Deck Example
---

<!-- .slide: class="center" -->
# Welcome to Aigora Slides
## Beautiful Presentations with Eleventy + Reveal.js

<span class="highlight-sage">Modern</span> • <span class="highlight-lavender">Sophisticated</span> • <span class="highlight-sage">Accessible</span>

---

## The Aigora Design Philosophy

Creating sophisticated, premium digital experiences that balance modern aesthetics with functional clarity.

> "Every interface should feel intentional, refined, and subtly dynamic."

<div class="card animate-fadeInUp">
Use depth, layered shadows, and smooth transitions to bring the UI to life — without distraction.
</div>

---

## Typography System

### <span class="highlight-lavender">Headers use Cormorant SC</span>
Elegant, premium serif font perfect for titles

**Body text uses Roboto** — clean, readable, and modern

<small>Meta text uses Roboto Condensed for compact, efficient display</small>

---

## Color Palette

<div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px;">
  <div class="card">
    <h4 style="color: #5FB96A;">Sage Green</h4>
    <code>#5FB96A</code>
    <p>Primary accent for CTAs and highlights</p>
  </div>
  <div class="card">
    <h4 style="color: #A986C4;">Infra Lavender</h4>
    <code>#A986C4</code>
    <p>Secondary accent for subtle focus</p>
  </div>
</div>

---

## Code Examples
<!-- .slide: data-background="#f5f5f5" -->

```typescript
interface AigoraTheme {
  colors: {
    primary: '#5FB96A',    // Sage
    secondary: '#A986C4',  // Lavender
    background: '#EDEDED', // Fog
  };
  typography: {
    headers: 'Cormorant SC',
    body: 'Roboto',
  };
}
```

<small>Code blocks are styled with the Aigora shadow system</small>

---

## Lists and Structure

### Key Features
- 🎨 Complete design system implementation
- 🌈 Light and dark theme support
- 📱 Fully responsive design
- ⚡ Optimized performance
- ♿ Accessibility-focused

--

### Technical Stack
1. **Eleventy** - Static site generator
2. **Reveal.js** - Presentation framework
3. **Tailwind CSS** - Utility-first CSS
4. **PostCSS** - CSS processing

---

## Tables

| Feature | Description | Status |
|---------|-------------|---------|
| Themes | Light & Dark | ✅ Ready |
| Animations | Smooth transitions | ✅ Ready |
| Responsive | Mobile-friendly | ✅ Ready |
| A11y | WCAG compliant | 🚧 In Progress |

---

## Interactive Elements
<!-- .slide: class="center" -->

<div style="display: flex; gap: 20px; justify-content: center;">
  <button class="px-6 py-3 bg-sage text-white rounded-lg hover:shadow-aigora-hover transition-all">
    Primary Action
  </button>
  <button class="px-6 py-3 bg-lavender text-white rounded-lg hover:shadow-aigora-hover transition-all">
    Secondary Action
  </button>
</div>

<br>

Press `T` to toggle between light and dark themes!

---

## Images & Media
<!-- .slide: data-background="linear-gradient(135deg, #5FB96A 0%, #A986C4 100%)" data-background-opacity="0.2" -->

Images automatically receive the Aigora shadow system and hover effects

---

## Vertical Slides
<!-- .slide: class="center" -->

Use `--` to create vertical slide stacks

Navigate down to see more ↓

--

### Nested Content

Vertical slides are perfect for:
- Detailed explanations
- Step-by-step processes
- Related sub-topics

--

### Back to Top

Press `ESC` to see the slide overview

---

## Advanced Features

### Speaker Notes

Add speaker notes to your slides:

```markdown
Note:
These are speaker notes that won't be visible during presentation.
Press 'S' to open speaker view.
```

Note:
These are speaker notes that won't be visible during presentation.
Press 'S' to open speaker view.

---

## Fragments & Animations
<!-- .slide: class="center" -->

<p class="fragment">Elements can appear...</p>
<p class="fragment fade-in">...with different...</p>
<p class="fragment highlight-sage">...animation styles!</p>

---

## Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `→` / `Space` | Next slide |
| `←` | Previous slide |
| `↑` / `↓` | Navigate vertical |
| `ESC` | Overview mode |
| `S` | Speaker notes |
| `F` | Fullscreen |
| `T` | Toggle theme |

---

<!-- .slide: class="center" data-background="linear-gradient(135deg, #5FB96A 0%, #A986C4 100%)" data-background-opacity="0.3" -->

# Thank You!

<div class="card" style="margin-top: 40px;">
  <h3>Get Started</h3>
  <p>Visit <a href="https://github.com/aigora/aigora-slides">github.com/aigora/aigora-slides</a></p>
  <p>to create your own beautiful presentations</p>
</div>

<small>Made with �� by Aigora</small>