module.exports = {
  url: "http://automationpractice.multiformis.com/index.php",
  sections: {
    navigationBar: {
      selector: ".menu-content",
      elements: {
        // contactUsButton: {
        //   selector: "#contact-link",
        // },
        womenTab: {
          selector: 'a[title="Women"]',
        },
        dressesTab: {
          selector: "#block_top_menu > ul > li:nth-child(2) > a",
          retryInterval: 5000,
        },
        tshirtsTab: {
          selector: 'a[title="T-shirts"]',
          retryInterval: 5000,
        },
      },
    },
  },
};
