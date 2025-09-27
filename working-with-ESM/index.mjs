import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname } from "node:path";
import replaceCabinTemplate from "./modules/replaceCabinTemplate.js";
import supabase from "./supabase.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log(process.env.SUPABASE_URL);

const server = createServer(async (req, res) => {
  try {
    const templateOverview = await readFile(
      `${__dirname}/template-overview.html`,
      "utf-8"
    );

    const templateCabin = await readFile(
      `${__dirname}/template-cabin.html`,
      "utf-8"
    );

    let { data: cabins, error } = await supabase
      .from("cabins")
      .select("*")
      .order("name");

    const settedTemplateCabins = cabins
      .map((cabin) => replaceCabinTemplate(templateCabin, cabin))
      .join("");
    const output = templateOverview.replace(/{%CABINS%}/, settedTemplateCabins);

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
