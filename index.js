import {
  getHTML,
  getMenuItemFromPigCameHome,
  getItemsFromFoodora
} from "./lib/scraper";

const pigFoodora =
  "https://www.foodora.ca/restaurant/s1jc/when-the-pig-came-home";

const tacoFoodora = "https://www.foodora.ca/chain/cs4gd/rancho-relaxo";
const pig = "https://www.whenthepigcamehome.ca/menu";

async function go() {
  const pigPromise = getHTML(pigFoodora);
  const tacoPromise = getHTML(tacoFoodora);

  const [pigHTML, tacoHTML] = await Promise.all([pigPromise, tacoPromise]);

  const pigItems = await getItemsFromFoodora(pigHTML);
  const ranchoItems = await getItemsFromFoodora(tacoHTML);
  console.log(`When the pig came home:`);
  console.log(pigItems);

  console.log(`Rancho relaxo menu:`);
  console.log(ranchoItems);
}

go();
