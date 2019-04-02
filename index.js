import {
  getHTML,
  getMenuItemFromPigCameHome,
  getItemsFromFoodora
} from "./lib/scraper";

const pigFoodora =
  "https://www.foodora.ca/restaurant/s1jc/when-the-pig-came-home";

const pig = "https://www.whenthepigcamehome.ca/menu";

async function go() {
  // const html = await getHTML("https://www.whenthepigcamehome.ca/menu");
  // const menuItems = await getMenuItemFromPigCameHome(html);
  // console.log(menuItems);
  const html = await getHTML(pigFoodora);
  const menuItems = await getItemsFromFoodora(html);
  console.log(menuItems);
}

go();
