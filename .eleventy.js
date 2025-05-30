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

    // Custom filter to split slides by horizontal rules
    eleventyConfig.addFilter("slides", function (content) {
        // Split by horizontal rules (---) and wrap each in section tags
        const slides = content.split(/\n---\n/);
        return slides.map(slide => {
            // Check for vertical slides (separated by --)
            if (slide.includes('\n--\n')) {
                const verticalSlides = slide.split(/\n--\n/);
                return '<section>' +
                    verticalSlides.map(vSlide =>
                        `<section data-markdown><textarea data-template>${vSlide.trim()}</textarea></section>`
                    ).join('\n') +
                    '</section>';
            }
            return `<section data-markdown><textarea data-template>${slide.trim()}</textarea></section>`;
        }).join('\n');
    });

    // Passthrough copy for static assets
    eleventyConfig.addPassthroughCopy("public");
    eleventyConfig.addPassthroughCopy("assets"); // Keep original assets passthrough if needed

    // Copy reveal.js assets from node_modules
    eleventyConfig.addPassthroughCopy({
        "node_modules/reveal.js/dist": "assets/reveal.js/dist",
        "node_modules/reveal.js/plugin": "assets/reveal.js/plugin"
    });

    // Watch our main CSS file for changes
    eleventyConfig.addWatchTarget("src/css/style.css");
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