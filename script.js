const fs = require("fs");
const axios = require("axios");
const cheerio = require("cheerio");

const toolsFile = "./tools.json";
const outputFile = "./tools-with-icons.json";

const tools = JSON.parse(fs.readFileSync(toolsFile, "utf-8"));

async function fetchFavicon(url) {
  try {
    const { data } = await axios.get(url, { timeout: 5000 });
    const $ = cheerio.load(data);
    let favicon =
      $('link[rel="icon"]').attr("href") ||
      $('link[rel="shortcut icon"]').attr("href") ||
      "/favicon.ico";

    if (!favicon.startsWith("http")) {
      const u = new URL(url);
      favicon = u.origin + favicon;
    }

    return favicon;
  } catch (err) {
    return null;
  }
}

async function processTools(tools) {
  const results = [];

  const promises = tools.map(async (tool, index) => {
    const iconUrl = await fetchFavicon(tool.link);
    const updatedTool = { ...tool, iconUrl };
    results[index] = updatedTool;

    // Save live after each fetch
    fs.writeFileSync(outputFile, JSON.stringify(results.filter(Boolean), null, 2));
    console.log(`Fetched [${index + 1}/${tools.length}]: ${tool.name}`);
  });

  await Promise.allSettled(promises);
  console.log("All tools processed!");
}

processTools(tools);
