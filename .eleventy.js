const { DateTime } = require("luxon");

module.exports = function (eleventyConfig) {
  // ⏳ Add a 'readableDate' filter using Luxon
  eleventyConfig.addFilter("readableDate", (dateObj) => {
    return DateTime.fromJSDate(dateObj).toFormat("LLLL d, yyyy"); // "July 20, 2025"
  });

  eleventyConfig.addPassthroughCopy("site.css");
  eleventyConfig.addPassthroughCopy("greeting.mp3");
  eleventyConfig.addPassthroughCopy("resume");
  eleventyConfig.addPassthroughCopy(
    "SandeepSharma_SoftwareDeveloper_Resume.pdf"
  );

  eleventyConfig.addCollection("logs", (collectionApi) => {
    return collectionApi
      .getFilteredByGlob("./logs/*.md")
      .sort((a, b) => b.date - a.date);
  });

  return {
    dir: {
      input: ".",
      includes: "_includes",
      output: "docs",
    },
  };
};
