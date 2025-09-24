const fs = require("fs");
const http = require("http");
const url = require("url");

const slugify = require("slugify");

const replaceTemplate = require("./modules/replaceTemplate");

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

const slugs = dataObj.map((el) => slugify(el.productName, { lower: true }));
console.log(slugs);

console.log(slugify("Fresh Avocados", { lower: true }));

const server = http.createServer((req, res) => {
  const { query, pathname } = url.parse(req.url, true);

  switch (pathname) {
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
    case "/product": {
      res.writeHead(200, { "content-type": "text/html" });
      const product = dataObj[query.id];

      const output = replaceTemplate(tempProduct, product);

      res.end(output);
      break;
    }
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

const PORT = 8000;

server.listen(PORT, () => {
  console.log(`Listening to request on port ${PORT}`);
});
