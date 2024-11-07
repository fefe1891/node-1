// Import built-in modules in Node
const fs = require("fs");
const axios = require("axios");

// Read file function
function cat(path) {
  fs.readFile(path, "utf-8", (err, data) => {
    if (err) {
      console.error(`Error reading ${path}: `, err);
      process.kill(1);
    }

    console.log(data);
  });
}

// Read URL function
async function webCat(url) {
  try {
    let res = await axios.get(url);
    console.log(res.data);
  } catch (err) {
    console.error(`Error fetching ${url}: `, err);
  }
}

let path = process.argv[2];

// Main
path.startsWith("http") ? webCat(path) : cat(path);