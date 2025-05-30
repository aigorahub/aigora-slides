# Aigora Slides Quick Start Guide

## 🚀 Getting Started in 5 Minutes

### 1. Clone and Install

```bash
git clone https://github.com/aigora/aigora-slides.git my-presentation
cd my-presentation
npm install
```

### 2. Start Development Server

```bash
npm start
```

Your slides will be available at `http://localhost:8080`

### 3. Create Your First Slide Deck

Copy the template to start:

```bash
cp src/slides/template.md src/slides/my-presentation.md
```

Edit `src/slides/my-presentation.md`:

```markdown
---
layout: reveal-layout.njk
title: My Amazing Presentation
---

# My Amazing Presentation
## Subtitle Here

John Doe | January 2024

---

## My First Slide

Content goes here!
```

### 4. View Your Presentation

Navigate to `http://localhost:8080` and click on your presentation.

## 📝 Essential Markdown Syntax

### Slide Separators
- `---` = New horizontal slide
- `--` = New vertical slide (down)

### Slide Attributes
```markdown
<!-- .slide: class="center" -->
## Centered Slide

<!-- .slide: data-background="#5FB96A" -->
## Green Background
```

### Speaker Notes
```markdown
## My Slide

Visible content

Note:
These notes are only visible in speaker view (press 'S')
```

## ⌨️ Essential Keyboard Shortcuts

- `→` or `Space` = Next slide
- `←` = Previous slide
- `S` = Speaker view
- `F` = Fullscreen
- `ESC` = Overview
- `T` = Toggle theme (custom)

## 🎨 Quick Styling

### Highlight Text
```html
<span class="highlight-sage">Green text</span>
<span class="highlight-lavender">Purple text</span>
```

### Cards
```html
<div class="card">
  <h3>Important Point</h3>
  <p>Details here</p>
</div>
```

### Animations
```html
<p class="fragment">Appears on click</p>
<p class="fragment fade-in">Fades in</p>
```

## 🚢 Deploy to Netlify

1. Push to GitHub
2. Import to Netlify
3. Build command: `npm run build`
4. Publish directory: `_site`
5. Deploy!

## 💡 Pro Tips

1. **Use Vertical Slides** for detailed explanations
2. **Add Background Images** with `data-background-image`
3. **Export to PDF** by adding `?print-pdf` to URL
4. **Preview Markdown** in VS Code with extensions
5. **Version Control** your presentations with Git

## 🆘 Need Help?

- Check the [full documentation](../README.md)
- View [example presentations](../src/slides/)
- Open an issue on [GitHub](https://github.com/aigora/aigora-slides)

---

Happy presenting! 🎉 