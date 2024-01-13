module.exports = {
  url: "http://automationpractice.multiformis.com/index.php",
  elements: {
    searchBar: {
      selector: "#search_query_top",
    },
    searchResults: {
      selector: "#product_list li .product-name",
      locateStrategy: "css selector",
    },
  },
};
