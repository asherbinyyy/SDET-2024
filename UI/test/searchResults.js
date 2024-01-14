describe("2. Search Testing", function () {
  it("2.1 Checks SearchBar's Visibility", async function (browser) {
    var search = browser.page.search.search();
    search.navigate();
    search.expect.element("@searchBar").to.be.visible;
  });
  it("2.2 Searches For Dress and Validates Results", async function (browser) {
    var search = browser.page.search.search();
    search.element("@searchBar").setValue("dress");
    search.assert.valueEquals("@searchBar", "dress");
    search.element("@searchBar").sendKeys(browser.Keys.ENTER);

    searchResults = await search.findElements("@searchResults");
    dressCount = 0;
    itemsProcessed = 0;
    notDress = [];
    //function to use as a callback for asynchronous foreach
    function assertMySearch(dressCount, length, notDress) {
      browser.assert.equal(
        dressCount,
        length,
        (message = `Results ${notDress.join(",")} are not dresses`)
      );
    }
    searchResults.forEach(async (element, index) => {
      const text = await browser.elementIdText(element.getId());
      itemsProcessed++;
      if (text.toLowerCase().includes("dress")) {
        dressCount++;
      } else {
        notDress.push(index + 1);
      }
      if (itemsProcessed === searchResults.length) {
        assertMySearch(dressCount, searchResults.length, notDress);
      }
    });
    browser.end();
  });
});
