import express from "express";
import {
  getHTML,
  getPigCameHomeMenu,
  getRanchoCameHomeMenu
} from "./lib/scraper";
import db from "./lib/db";
import { getStringDate, daysOfWeek } from "./lib/helper";

const pigFoodora =
  "https://www.foodora.ca/restaurant/s1jc/when-the-pig-came-home";

const tacoFoodora = "https://www.foodora.ca/chain/cs4gd/rancho-relaxo";
const pig = "https://www.whenthepigcamehome.ca/menu";

const app = express();

//console.log(db);
app.get("/scrape", async (req, res, next) => {
  console.log("scraping!!");
  const [pigMenu, ranchoMenu] = await Promise.all([
    getPigCameHomeMenu(pigFoodora),
    getRanchoCameHomeMenu(tacoFoodora)
  ]);
  const restaurants = [pigMenu, ranchoMenu];
  console.log(pigMenu);
  // db.set("WTPCH.categories", pigMenu.categories).write();

  // db.set("RanchoRelaxo.categories", ranchoMenu.categories).write();

  res.json({ restaurants });
});

app.get("/save", async (req, res, next) => {
  console.log("scraping!!");
  const restaurants = await Promise.all([
    getPigCameHomeMenu(pigFoodora),
    getRanchoCameHomeMenu(tacoFoodora)
  ]);

  //db.set("restaurants", restaurants).write();
  res.json({ restaurants });
});

app.get("/slack", async (req, res, next) => {
  //TO DO
  //check what day of the week it is
  //grab restaurants that are open today (how?)
  //pick random item and suggest it
  const dt = new Date().getDay();
  const dayOfWeek = getStringDate(dt);
  // console.log(dayOfWeek);
  //returns all the info from the database
  const restaurants = db.get("restaurants").value();

  //calculates the number of "restaurant objects?"
  const numRestaurants = db
    .get("restaurants")
    .size()
    .value();

  //select a restaurant based on an index, so from 0 - numRestaurant

  const numCategories = db.get("restaurants");
  res.json({ restaurants });
});
app.post("/slack", async (req, res, next) => {});

app.listen(2005, () =>
  console.log("Example App Running on http://localhost:2005")
);
