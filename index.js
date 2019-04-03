import {
  getHTML,
  getMenuItemFromPigCameHome,
  getItemsFromFoodora,
  getPigCameHomeMenu,
  getRanchoCameHomeMenu
} from "./lib/scraper";

const pigFoodora =
  "https://www.foodora.ca/restaurant/s1jc/when-the-pig-came-home";

const tacoFoodora = "https://www.foodora.ca/chain/cs4gd/rancho-relaxo";
const pig = "https://www.whenthepigcamehome.ca/menu";

async function go() {
  const [pigMenu, ranchoMenu] = await Promise.all([
    getPigCameHomeMenu(pigFoodora),
    getRanchoCameHomeMenu(tacoFoodora)
  ]);
  console.log(`When the pig came home:`);
  console.log(pigMenu);

  console.log(`Rancho relaxo menu:`);
  console.log(ranchoMenu);
}

go();
