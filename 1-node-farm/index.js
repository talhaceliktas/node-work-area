const fs = require("fs");

const textIn = fs.readFileSync("./txt/input.txt", { encoding: "utf-8" });
console.log(textIn);

const textOut = `This is what we know about the avacado ${textIn}.\nCreated on ${new Date(
  Date.now()
).toLocaleString()}`;
fs.writeFileSync("./txt/new-file.txt", textOut);
console.log("File written!");
