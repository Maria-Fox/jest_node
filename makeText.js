/** Command-line tool to generate Markov text. */

// let fs = require("fs");
const fs = require("fs");
const markov = require("./markov");
const axios = require("axios");
const process = require("process");

/** Make Markov machine from text and generate text from it. */

function generateText(text) {
  let sample = new markov.MarkovMachine(text);
  console.log(sample.makeText());
}

/** read file and generate text from it. */

function makeText(path) {
  console.log("makeTest ran");
  fs.readFile(path, "utf8", function callback(err, data) {
    if (err) {
      console.error(`Cannot read file: ${path}: ${err}`);
      process.exit(1);
    } else {
      generateText(data);
    }
  });
}

/** read URL and make text from it. */

async function makeURLText(url) {
  console.log("makeURLTEXT ran");

  let resp;

  try {
    resp = await axios.get(url);
  } catch (err) {
    console.error(`Cannot read URL: ${url}: ${err}`);
    process.exit(1);
  }
  generateText(resp.data);
}

// route based off CLI input
// User MUST add file or url in order for this to work
// regular argsv path node location -> file -> commands w/in file -> BUT we added a method to route the commands. New node path:
// node -> file running -> method -> command to run

let method = process.argv[2];
let path = process.argv[3];

if (method === "file") {
  makeText(path);
} else if (method === "url") {
  makeURLText(path);
} else {
  console.error(`Unknown method: ${method}`);
  process.exit(1);
}
