const http = require("http");
const url = require("url");
const fs = require("fs");

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const dataObject = JSON.parse(data);

const server = http.createServer((req, res) => {
  const pathName = req.url;

  if (pathName === "/" || pathName === "/overview")
    res.end("THIS IS THE OVERVIEW");
  else if (pathName === "/product") res.end("THIS IS THE PRODUCT");
  else if (pathName === "/api") {
    // fs.readFile(`${__dirname}/dev-data/data.json`, "utf-8", (err, data) => {
    //   const productData = JSON.parse(data);
    //   res.writeHead(200, {
    //     "content-type": "application/json",
    //   });
    //   res.end(data);
    // });
    res.writeHead(200, {
      "content-type": "application/json",
    });
    res.end(data);
  } else {
    res.writeHead(404, {
      "content-type": "text/html",
      "my-own-header": "hello-world",
    });
    res.end("<h1>Page not found<h1/>");
  }
});

server.listen(8000, () => {
  console.log("Listening to request on port 8000");
});
