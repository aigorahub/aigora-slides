module.exports = function (eleventyConfig) {
    // Passthrough copy for static assets
    eleventyConfig.addPassthroughCopy("public");
    eleventyConfig.addPassthroughCopy("assets"); // Keep original assets passthrough if needed

    // Watch our main CSS file for changes
    eleventyConfig.addWatchTarget("src/css/style.css");

    return {
        dir: {
            input: "src",
            includes: "../_includes",
            output: "_site" // Explicitly set output to _site
        }
    };
};