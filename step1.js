// Import the built-in fs (file system) module in Node
const fs = require("fs");

function cat(path) {
  // Read the file and get the data
  fs.readFile(path, "utf-8", (err, data) => {
    if (err) {
      console.error(`Error reading ${path}: `, err);
      process.exit(1);
    }

    console.log(data);
  });
}

cat(process.argv[2]);