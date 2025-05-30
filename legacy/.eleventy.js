const MarkdownIt = require("markdown-it");
const md = new MarkdownIt({ html: true });

module.exports = function (eleventyConfig) {
  eleventyConfig.addNunjucksFilter("markdown", (content) => {
    return md.render(content);
  });

  // Passthrough copy for static assets
  // Copy CSS files
  eleventyConfig.addPassthroughCopy("src/css");
  // Copy JS files
  eleventyConfig.addPassthroughCopy("src/js");
  // Copy images
  eleventyConfig.addPassthroughCopy("src/img");
  // Copy images or other assets if you have them, e.g., eleventyConfig.addPassthroughCopy("src/assets");

  return {
    dir: {
      input: "src",
      includes: "_includes", // Relative to input directory src/
      data: "_data",       // Relative to input directory src/
      output: "_site"      // Output directory relative to project root
    },
    templateFormats: ["md", "njk", "html"], // Common template formats
    markdownTemplateEngine: "njk", // Use Nunjucks for Markdown files
    htmlTemplateEngine: "njk",     // Use Nunjucks for HTML files
    dataTemplateEngine: "njk",     // Use Nunjucks for data files (if any)
  };
};
