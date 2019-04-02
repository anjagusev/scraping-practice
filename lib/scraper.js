import axios from "axios";
import cheerio from "cheerio";

async function getHTML(url) {
  const { data: html } = await axios.get(url);
  return html;
}

async function getMenuItem(html) {
  //load up cheerio
  const $ = cheerio.load(html);

  const items = $("#block-yui_3_17_2_15_1479102197363_4481 h3 > strong");
  const menuItems = [];
  items.each(function(i, elem) {
    menuItems[i] = $(this).text();
  });
  // menuItems.join(", ");
  //console.log(menuItems);
  return menuItems;
  // document.querySelectorAll(
  //   "#block-yui_3_17_2_15_1479102197363_4481 h3 strong"
  // );
}
export { getHTML, getMenuItem };
