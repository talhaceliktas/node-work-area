const fs = require("fs");

////// SYNC WAY
function syncWay() {
  const textIn = fs.readFileSync("./txt/input.txt", { encoding: "utf-8" });
  console.log(textIn);

  const textOut = `This is what we know about the avacado ${textIn}.\nCreated on ${new Date(
    Date.now()
  ).toLocaleString()}`;
  fs.writeFileSync("./txt/new-file.txt", textOut);
  console.log("File written!");
}

////// ASYNC WAY

// callback hell
function callbackHell() {
  fs.readFile("./txt/start.txt", "utf-8", (err, data1) => {
    fs.readFile(`./txt/${data1}.txt`, "utf-8", (err, data2) => {
      console.log(data2);
      fs.readFile("./txt/append.txt", "utf-8", (err, data3) => {
        console.log(data3);

        fs.writeFile(
          "./txt/final.txt",
          `${data2}\n${data3}`,
          "utf-8",
          (err) => {
            if (err) console.log(err);
            else console.log("File has been written");
          }
        );
      });
    });
  });
}

const fsPromises = require("fs/promises");
// clean async
async function cleanAsync() {
  const startData = await fsPromises.readFile("./txt/start.txt", "utf-8");
  const readThisData = await fsPromises.readFile(
    `./txt/${startData}.txt`,
    "utf-8"
  );
  console.log(readThisData);
  const appendData = await fsPromises.readFile("./txt/append.txt", "utf-8");
  console.log(appendData);
  await fsPromises.writeFile(
    "./txt/final.txt",
    `${readThisData}\n${appendData}`,
    "utf-8"
  );
}

cleanAsync();
