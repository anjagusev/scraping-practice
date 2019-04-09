import axios from "axios";
import cheerio from "cheerio";
import { isToday, getDaysOpen } from "./helper";

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
  const restaurantTitle = $("div.vendor-info-main-headline.item > h1").text();
  const menu = { name: restaurantTitle, categories: [] };
  const headers = $(".dish-category-header");
  headers.each(function(h, elem) {
    const categoryTitle = $(this)
      .text()
      .trim();

    //if the category is sides, skip it
    if (categoryTitle == "Sides") return;

    //initialize empty category
    const category = { title: "", items: [] };
    category["title"] = categoryTitle;

    const arraySibling = $(this)
      .next()
      .find($(".dish-name"));

    arraySibling.each(function(s, element) {
      //get this categories individual items
      category["items"].push(
        $(this)
          .text()
          .trim()
      );
    });

    menu["categories"].push(category);
  });

  let weekDaysOpen = $(".vendor-delivery-times > li")
    .text()
    .replace(/\s+/g, " ")
    .trim()
    .substring(0, 9);

  // console.log(weekDaysOpen);
  const daysOpen = getDaysOpen(weekDaysOpen);
  menu["daysOpen"] = daysOpen;

  // console.log(menu);
  return menu;
}

export async function getPigCameHomeMenu(url) {
  const html = await getHTML(url);
  const pigMenu = await getItemsFromFoodora(html);
  return pigMenu;
}

export async function getRanchoCameHomeMenu(url) {
  const html = await getHTML(url);
  const ranchoMenu = await getItemsFromFoodora(html);
  return ranchoMenu;
}
export { getHTML, getMenuItemFromPigCameHome, getItemsFromFoodora };
