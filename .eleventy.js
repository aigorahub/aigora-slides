const markdownIt = require("markdown-it");
const markdownItAttrs = require("markdown-it-attrs");

module.exports = function (eleventyConfig) {
    // Configure markdown-it
    const md = markdownIt({
        html: true,
        breaks: true,
        linkify: true
    }).use(markdownItAttrs);

    eleventyConfig.setLibrary("md", md);

    // Nunjucks filter for Markdown
    eleventyConfig.addNunjucksFilter("markdown", function (markdownString) {
        if (typeof markdownString === 'string') {
            return md.render(markdownString);
        }
        return ''; // Return empty string for non-string inputs
    });


    // Custom filter to split content into slides and wrap them for Reveal.js Markdown
    eleventyConfig.addFilter("slides", function (content) {
        // Trim leading/trailing whitespace from the whole content first
        const trimmedContent = content.trim();

        // Split by horizontal rule (---) on its own line
        const slides = trimmedContent.split(/\n---\n/);

        return slides.map(slideContent => {
            // Each slide chunk is wrapped for Reveal.js Markdown plugin
            // HTML comments like <!-- .slide: class="center" --> should be processed by Reveal.js
            return `<section data-markdown><textarea data-template>${slideContent.trim()}</textarea></section>`;
        }).join('\n');
    });

    // Passthrough copy for static assets
    eleventyConfig.addPassthroughCopy("public");
    eleventyConfig.addPassthroughCopy("assets"); // Keep original assets passthrough if needed
    eleventyConfig.addPassthroughCopy("src/assets/js/legacy-components");
    eleventyConfig.addPassthroughCopy("src/assets/img/legacy-images");


    // Watch our main CSS file for changes
    eleventyConfig.addWatchTarget("src/css/style.css");
    eleventyConfig.addWatchTarget("src/css/legacy-components.css");
    eleventyConfig.addWatchTarget("src/**/*.md");

    // Add collection for slide decks
    eleventyConfig.addCollection("slides", function (collectionApi) {
        return collectionApi.getFilteredByGlob("src/slides/*.md");
    });

    return {
        dir: {
            input: "src",
            includes: "../_includes",
            output: "_site" // Explicitly set output to _site
        },
        markdownTemplateEngine: "njk",
        htmlTemplateEngine: "njk",
        dataTemplateEngine: "njk"
    };
};