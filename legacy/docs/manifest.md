# Project Manifest: Eleventy Sensory Data Presentation

This document outlines the folder structure and key files for the Aigora Sensory Presentation Eleventy application.

## Folder Structure

- **`/` (Root)**
  - Contains project configuration files, main README, and the Eleventy output directory (`_site` - generated).
- **`/src`**
  - The main source directory for the Eleventy site.
  - **`/src/_data`**: Contains global data files.
    - `slides.json`: The core data for all presentation slides.
  - **`/src/_includes`**: Contains Nunjucks templates used for layouts and partials.
    - `layout.njk`: The main HTML layout wrapper for all pages.
    - `slide.njk`: The template for rendering individual slides based on their type.
  - **`/src/css`**: Contains stylesheets.
    - `styles.css`: Custom CSS rules and brand-specific styles.
  - **`/src/js`**: Contains client-side JavaScript files.
    - `main.js`: Core script for slide navigation, transitions (GSAP), and initialization of interactive components.
    - **`/src/js/components`**: Modules for specific interactive slide components.
      - `predictive-tool.js`: Logic for the TensorFlow.js based predictive tool.
      - `radar-chart.js`: Logic for the Chart.js based radar chart.
      - `word-cloud.js`: Logic for the WordCloud based word cloud generator.
    - `registerServiceWorker.js`: Script to register the service worker.
    - `sw.js`: The service worker script for caching and offline capabilities.
  - `index.njk`: The Eleventy template for the main page, which iterates through slides.
- **`/docs`**: Contains project documentation.
  - `manifest.md`: This file.
- **`/_site` (Generated)**
  - The output directory where Eleventy generates the static site. This directory is not typically version-controlled.

## Important Files

- **`.eleventy.js` (or `eleventy.config.js`)**: (If it existed, it would be here) Eleventy configuration file. Currently, the project uses default Eleventy configurations.
- **`package.json`**: Defines project metadata, dependencies (like TensorFlow.js, Chart.js, GSAP, WordCloud, and Eleventy itself), and scripts (`start`, `build`).
- **`src/_data/slides.json`**: The JSON file containing all content and metadata for each slide in the presentation. This is the primary data source.
- **`src/_includes/layout.njk`**: The main Nunjucks layout. It defines the overall HTML structure, links to CSS/JS, and includes CDN libraries.
- **`src/_includes/slide.njk`**: The Nunjucks template responsible for rendering individual slides. It uses conditional logic based on `slide.type` to display different content and interactive elements.
- **`src/index.njk`**: The entry point for Eleventy to generate the main HTML page. It uses `layout.njk` and iterates through `slides.json` data, including `slide.njk` for each slide.
- **`src/js/main.js`**: Handles all client-side interactivity: slide navigation, animations, and calls initialization functions for interactive components (radar chart, word cloud, predictive tool) on the relevant slides.
- **`src/sw.js`**: The service worker, enabling offline access by caching site assets.
- **`src/css/styles.css`**: Contains all custom CSS, including brand styles and utility classes not covered by Tailwind.
