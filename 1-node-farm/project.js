const fs = require("fs");
const http = require("http");

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`);
const dataObj = JSON.parse(data);

const tempOverview = fs.readFileSync(
  `${__dirname}/templates/template-overview.html`,
  "utf-8"
);
const tempCard = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  "utf-8"
);
const tempProduct = fs.readFileSync(
  `${__dirname}/templates/template-product.html`,
  "utf-8"
);

const replaceTemplate = (template, product) => {
  let output = template
    .replaceAll(/{%PRODUCTNAME%}/g, product.productName)
    .replaceAll(/{%IMAGE%}/g, product.image)
    .replaceAll(/{%PRICE%}/g, product.price)
    .replaceAll(/{%FROM%}/g, product.from)
    .replaceAll(/{%NUTRIENTS%}/g, product.nutrients)
    .replaceAll(/{%QUANTITY%}/g, product.quantity)
    .replaceAll(/{%DESCRIPTION%}/g, product.description)
    .replaceAll(/{%ID%}/g, product.id);

  if (!product.organic)
    output = output.replaceAll(/{%NOT_ORGANIC%}/g, "not-organic");

  return output;
};

const server = http.createServer((req, res) => {
  const pathName = req.url;

  switch (pathName) {
    case "/":
    case "/overview": {
      res.writeHead(200, {
        "content-type": "text/html",
      });

      const cardsHtml = dataObj
        .map((el) => replaceTemplate(tempCard, el))
        .join("");
      const output = tempOverview.replace(/{%PRODUCT_CARDS%}/, cardsHtml);

      res.end(output);

      break;
    }
    case "/product":
      res.end("This is product");
      break;
    case "/api":
      res.writeHead(200, { "content-type": "application/json" });
      res.end(data);
      break;
    default:
      res.writeHead(404, {
        "content-type": "text/html",
      });
      res.end("<h1>Page not found!</h1>");
  }
});

const PORT = 8002;

server.listen(PORT, () => {
  console.log(`Listening to request on port ${PORT}`);
});
