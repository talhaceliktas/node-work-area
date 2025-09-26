import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname } from "node:path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const server = createServer(async (req, res) => {
  try {
    const templateOverview = await readFile(
      `${__dirname}/template-overview.html`,
      "utf-8"
    );

    res.writeHead(200, { "content-type": "text/html" });
    res.end(templateOverview);
  } catch (err) {
    console.log(err);
  }
});

server.listen(8001);
