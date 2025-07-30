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

  const getSortedBlogs = (collectionApi) => {
    return collectionApi
      .getFilteredByGlob("./blogs/*.md")
      .sort((a, b) => b.date - a.date);
  };

  eleventyConfig.addCollection("blogs", getSortedBlogs);
  eleventyConfig.addCollection("recentBlogs", (collectionApi) =>
    getSortedBlogs(collectionApi).slice(0, 3)
  );

  return {
    dir: {
      input: ".",
      includes: "_includes",
      output: "docs",
    },
  };
};
