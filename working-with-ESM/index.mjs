import { createServer } from "node:http";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname } from "node:path";
import replaceCabinTemplate from "./modules/replaceCabinTemplate.js";
import supabase from "./supabase.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const templateOverview = readFileSync(
  `${__dirname}/template-overview.html`,
  "utf-8"
);

const templateCabin = readFileSync(`${__dirname}/template-cabin.html`, "utf-8");

let cachedCabins = null;
let lastFetch = 0;
const REVALIDATE_TIME = 30 * 1000;

const server = createServer(async (req, res) => {
  try {
    if (!cachedCabins || Date.now() - lastFetch > REVALIDATE_TIME) {
      let { data: cabins, error } = await supabase
        .from("cabins")
        .select("*")
        .order("name");

      cachedCabins = cabins
        .map((cabin) => replaceCabinTemplate(templateCabin, cabin))
        .join("");

      lastFetch = Date.now();
    }

    const output = templateOverview.replace(/{%CABINS%}/, cachedCabins);

    res.writeHead(200, { "content-type": "text/html" });
    res.end(output);
  } catch (err) {
    console.log(err);
  }
});

server.on("request", () => {
  console.log("Request!");
});

const PORT = 8000;

server.listen(PORT, () => {
  console.log(`Server is listening on port: ${PORT}`);
});
