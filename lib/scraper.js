import axios from "axios";
import cheerio from "cheerio";

async function getHTML(url) {
  const { data: html } = await axios.get(url);
  return html;
}

async function getMenuItemFromPigCameHome(html) {
  //load up cheerio
  const $ = cheerio.load(html);
  const items = $("#block-yui_3_17_2_15_1479102197363_4481 h3 > strong");
  const menuItems = [];
  items.each(function(i, elem) {
    menuItems[i] = $(this).text();
  });
  return menuItems;
}

async function getItemsFromFoodora(html) {
  //load up cheerio
  const $ = cheerio.load(html);
  const headers = $(".dish-category-header");
  const headerSiblings = headers.next().find($(".dish-name"));
  const headerItems = [];
  const menu = {};
  headers.each(function(h, elem) {
    const category = $(this)
      .text()
      .trim();
    menu[category] = [];
    const arraySibling = $(this)
      .next()
      .find($(".dish-name"));

    arraySibling.each(function(s, element) {
      menu[category].push(
        $(this)
          .text()
          .trim()
      );
    });
  });
  console.log(menu);
}
export { getHTML, getMenuItemFromPigCameHome, getItemsFromFoodora };
