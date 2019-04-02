import { getHTML, getMenuItem } from "./lib/scraper";

async function go() {
  const html = await getHTML("https://www.whenthepigcamehome.ca/menu");
  const menuItems = await getMenuItem(html);
  console.log(menuItems);
}

go();
