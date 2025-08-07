const fs = require("fs");
const path = require("path");

const source = path.join(__dirname, "dist", "chartTestPage.html");
const destination = path.join(__dirname, "dist", "404.html");

fs.copyFileSync(source, destination);
console.log("404.html copied from chartTestPage.html");