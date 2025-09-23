const http = require("http");
const url = require("url");

const server = http.createServer((req, res) => {
  const pathName = req.url;

  if (pathName === "/" || pathName === "/overview")
    res.end("THIS IS THE OVERVIEW");
  else if (pathName === "/product") res.end("THIS IS THE PRODUCT");
  else {
    res.writeHead(404, {
      "content-type": "text/html",
      "my-own-header": "hello-world",
    });
    res.end("Page not found!");
  }
});

server.listen(8000, () => {
  console.log("Listening to request on port 8000");
});
