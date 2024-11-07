const fs = require('fs');
const axios = require('axios');

// Write to file function
function writeToFile(text, filename){
    fs.writeFile(filename, text, "utf8", function(err){
        if(err){
            console.error(`Couldn't write ${filename}:\n Error: ${err}`);
        }
    });
}

// Read file function
function cat(path, writeToFileFlag, filename){
    fs.readFile(path, 'utf8', function(err, data){
        if(err){
            console.error(`Error reading ${path}:\n  Error: ${err}`);
        } else {
            if(writeToFileFlag){
                writeToFile(data, filename);
            } else {
                console.log(data);
            }
        }
    });
}

// Read URL function
async function webCat(url, writeToFileFlag, filename){
    try {
        let resp = await axios.get(url);
        if(writeToFileFlag){
            writeToFile(resp.data, filename);
        } else {
            console.log(resp.data);
        }
    } catch(err){
        console.error(`Error fetching ${url}:\n Error: ${err}`);
    }
}

let path;
let writeToFileFlag = false;
let filename;

// Check if "--out" is provided
if(process.argv[2] === "--out"){
    writeToFileFlag = true;
    filename = process.argv[3];
    path = process.argv[4];
} else {
    path = process.argv[2];
}

// Main
(path.startsWith('http://') || path.startsWith('https://')) ? webCat(path, writeToFileFlag, filename) 
: cat(path, writeToFileFlag, filename);