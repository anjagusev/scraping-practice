import express from "express";
import {
  getHTML,
  getPigCameHomeMenu,
  getRanchoCameHomeMenu
} from "./lib/scraper";
import db from "./lib/db";
const pigFoodora =
  "https://www.foodora.ca/restaurant/s1jc/when-the-pig-came-home";

const tacoFoodora = "https://www.foodora.ca/chain/cs4gd/rancho-relaxo";

const app = express();

//console.log(db);

app.get("/scrape", async (req, res, next) => {
  console.log("scraping!!");
  const [pigMenu, ranchoMenu] = await Promise.all([
    getPigCameHomeMenu(pigFoodora),
    getRanchoCameHomeMenu(tacoFoodora)
  ]);
  db.set("WTPCH.categories", pigMenu.categories).write();

  db.set("RanchoRelaxo.categories", ranchoMenu.categories).write();

  res.json({ pigMenu, ranchoMenu });
});

const pig = "https://www.whenthepigcamehome.ca/menu";

app.listen(2005, () => console.log("Example App Running on 2005"));
