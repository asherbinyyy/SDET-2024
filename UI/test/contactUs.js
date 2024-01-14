const data = require("../testData/data.json");
const path = require("path");

describe("Contact Us Page Testing", function () {
  it("1.1 Checks Elements' Visibility", function (browser) {
    // Navigate to home page then to vontact us Page VIP CHECK E3MELHA
    var contactUs = browser.page.contactUs.contactUs();
    contactUs.navigate();
    var contactUsSection = contactUs.section.contactUs;
    var contactUs = browser.page.contactUs.contactUs();
    var contactUsSection = contactUs.section.contactUs;
    contactUsSection.expect.element("@subjectHeadingDropdown").to.be.visible;
    contactUsSection.expect.element("@email").to.be.visible;
    contactUsSection.expect.element("@orderReference").to.be.visible;
    var fileUploadSection = contactUsSection.section.fileUploading;
    contactUsSection.expect.section("@fileUploading").to.be.visible;
    fileUploadSection.expect.element("@fileView").to.be.visible;
    fileUploadSection.expect.element("@uploadButton").to.be.visible;

    browser.end();
  });
  it("1.2 Mandatory Fields Submission For a Valid Submission", async function (browser) {
    var contactUs = browser.page.contactUs.contactUs();
    contactUs.navigate();
    var contactUsSection = contactUs.section.contactUs;

    contactUsSection.click("@selectOptionCustomerService");
    const optionText = await contactUsSection
      .element("@selectOptionCustomerService")
      .getText();

    await contactUsSection
      .element("@selectOptionDisplay")
      .getText()
      .assert.equals(optionText);

    contactUsSection.element("@email").setValue(data.validEmail);
    contactUsSection.assert.valueEquals("@email", data.validEmail);
    contactUsSection.assert.attributeMatches(
      "@email",
      "value",
      new RegExp(data.emailRegex)
    );

    contactUsSection.element("@message").setValue(data.messageEntered);
    contactUsSection.assert.valueEquals("@message", data.messageEntered);

    contactUsSection.element("@submit").click();
    contactUsSection.expect.element("@successMessage").to.be.visible;
    browser.end();
  });
  it("1.3 Invalid Submission // Leaving Mail Blank", async function (browser) {
    var contactUs = browser.page.contactUs.contactUs();
    contactUs.navigate();
    var contactUsSection = contactUs.section.contactUs;

    contactUsSection.click("@selectOptionCustomerService");
    const optionText = await contactUsSection
      .element("@selectOptionCustomerService")
      .getText();

    await contactUsSection
      .element("@selectOptionDisplay")
      .getText()
      .assert.equals(optionText);

    contactUsSection.element("@message").setValue(data.messageEntered);
    contactUsSection.assert.valueEquals("@message", data.messageEntered);

    contactUsSection.element("@submit").click();

    contactUsSection.expect.element("@errorMessage").to.be.visible;
    errorMessageElement = contactUsSection.findElements(
      "@errorMessageList",
      function (result) {
        browser.assert.equal(result.value.length, 1);
      }
    );
    browser.end();
  });
  it("1.4 Invalid Submission // Leaving Message Blank", async function (browser) {
    var contactUs = browser.page.contactUs.contactUs();
    contactUs.navigate();
    var contactUsSection = contactUs.section.contactUs;

    contactUsSection.click("@selectOptionCustomerService");
    const optionText = await contactUsSection
      .element("@selectOptionCustomerService")
      .getText();

    await contactUsSection
      .element("@selectOptionDisplay")
      .getText()
      .assert.equals(optionText);

    contactUsSection.element("@email").setValue(data.validEmail);
    contactUsSection.assert.valueEquals("@email", data.validEmail);
    contactUsSection.assert.attributeMatches(
      "@email",
      "value",
      new RegExp(data.emailRegex)
    );

    await contactUsSection.element("@submit").click();

    contactUsSection.expect.element("@errorMessage").to.be.visible;
    errorMessageElement = contactUsSection.findElements(
      "@errorMessageList",
      function (result) {
        browser.assert.equal(result.value.length, 1);
      }
    );

    browser.end();
  });
  it("1.5 Invalid Submission // Leaving Subject Heading Blank", async function (browser) {
    var contactUs = browser.page.contactUs.contactUs();
    contactUs.navigate();
    var contactUsSection = contactUs.section.contactUs;

    contactUsSection.element("@email").setValue(data.validEmail);
    contactUsSection.assert.valueEquals("@email", data.validEmail);
    contactUsSection.assert.attributeMatches(
      "@email",
      "value",
      new RegExp(data.emailRegex)
    );

    contactUsSection.element("@message").setValue(data.messageEntered);
    contactUsSection.assert.valueEquals("@message", data.messageEntered);

    contactUsSection.element("@submit").click();

    contactUsSection.expect.element("@errorMessage").to.be.visible;
    errorMessageElement = contactUsSection.findElements(
      "@errorMessageList",
      function (result) {
        browser.assert.equal(result.value.length, 1);
      }
    );
    browser.end();
  });
  it("1.6 Invalid Submission // Submitting Leaving All Fields Blank", async function (browser) {
    var contactUs = browser.page.contactUs.contactUs();
    contactUs.navigate();
    var contactUsSection = contactUs.section.contactUs;

    contactUsSection.element("@submit").click();

    contactUsSection.expect.element("@errorMessage").to.be.visible;
    errorMessageElement = contactUsSection.findElements(
      "@errorMessageList",
      function (result) {
        browser.assert.equal(result.value.length, 3);
      }
    );
    browser.end();
  });
  it("1.7 Invalid Submission // Leaving Subject Heading and Email Blank", async function (browser) {
    var contactUs = browser.page.contactUs.contactUs();
    contactUs.navigate();
    var contactUsSection = contactUs.section.contactUs;

    contactUsSection.element("@message").setValue(data.messageEntered);
    contactUsSection.assert.valueEquals("@message", data.messageEntered);

    contactUsSection.element("@submit").click();

    contactUsSection.expect.element("@errorMessage").to.be.visible;
    errorMessageElement = contactUsSection.findElements(
      "@errorMessageList",
      function (result) {
        browser.assert.equal(result.value.length, 2);
      }
    );
    browser.end();
  });
  it("1.8 Invalid Submission // Leaving Email and Message Blank", async function (browser) {
    var contactUs = browser.page.contactUs.contactUs();
    contactUs.navigate();
    var contactUsSection = contactUs.section.contactUs;

    contactUsSection.click("@selectOptionCustomerService");
    const optionText = await contactUsSection
      .element("@selectOptionCustomerService")
      .getText();

    await contactUsSection
      .element("@selectOptionDisplay")
      .getText()
      .assert.equals(optionText);

    contactUsSection.element("@submit").click();

    contactUsSection.expect.element("@errorMessage").to.be.visible;
    errorMessageElement = contactUsSection.findElements(
      "@errorMessageList",
      function (result) {
        browser.assert.equal(result.value.length, 2);
      }
    );
    browser.end();
  });
  it("1.9 Invalid Submission // Leaving Subject Heading and Message Blank", async function (browser) {
    var contactUs = browser.page.contactUs.contactUs();
    contactUs.navigate();
    var contactUsSection = contactUs.section.contactUs;

    contactUsSection.element("@email").setValue(data.validEmail);
    contactUsSection.assert.valueEquals("@email", data.validEmail);
    contactUsSection.assert.attributeMatches(
      "@email",
      "value",
      new RegExp(data.emailRegex)
    );

    contactUsSection.element("@submit").click();

    contactUsSection.expect.element("@errorMessage").to.be.visible;
    errorMessageElement = contactUsSection.findElements(
      "@errorMessageList",
      function (result) {
        browser.assert.equal(result.value.length, 2);
      }
    );
    browser.end();
  });
  it("1.10 Invalid Submission // Entering Invalid Email", async function (browser) {
    var contactUs = browser.page.contactUs.contactUs();
    contactUs.navigate();
    var contactUsSection = contactUs.section.contactUs;

    contactUsSection.click("@selectOptionCustomerService");
    const optionText = await contactUsSection
      .element("@selectOptionCustomerService")
      .getText();

    await contactUsSection
      .element("@selectOptionDisplay")
      .getText()
      .assert.equals(optionText);

    contactUsSection.element("@email").setValue(data.invalidEmail2);
    contactUsSection.assert.valueEquals("@email", data.invalidEmail2);
    contactUsSection.assert.not.attributeMatches(
      "@email",
      "value",
      new RegExp(data.emailRegex)
    );

    contactUsSection
      .element("@orderReference")
      .setValue("Order Number 9998777");
    contactUsSection.assert.valueEquals(
      "@orderReference",
      "Order Number 9998777"
    );

    contactUsSection.element("@message").setValue(data.messageEntered);
    contactUsSection.assert.valueEquals("@message", data.messageEntered);

    const fileUploadSection = contactUsSection.section.fileUploading;
    imagePath = path.resolve("./testData/Image.png");
    fileUploadSection.uploadFile("@fileInput", imagePath);

    await fileUploadSection
      .element("@fileView")
      .getText()
      .assert.equals(path.basename(imagePath));

    contactUsSection.element("@submit").click();
    contactUsSection.expect.element("@errorMessage").to.be.visible;

    browser.end();
  });
  it("1.11 Filling Mandatory Fields With Message Including 1000 Characters - Gives Valid Submission -- Bug", async function (browser) {
    var contactUs = browser.page.contactUs.contactUs();
    contactUs.navigate();
    var contactUsSection = contactUs.section.contactUs;

    contactUsSection.click("@selectOptionCustomerService");
    const optionText = await contactUsSection
      .element("@selectOptionCustomerService")
      .getText();

    await contactUsSection
      .element("@selectOptionDisplay")
      .getText()
      .assert.equals(optionText);

    contactUsSection.element("@email").setValue(data.validEmail);
    contactUsSection.assert.valueEquals("@email", data.validEmail);
    contactUsSection.assert.attributeMatches(
      "@email",
      "value",
      new RegExp(data.emailRegex)
    );

    const longString = Array(1000).fill("a").join("");
    contactUsSection.element("@message").setValue(longString);
    contactUsSection.assert.valueEquals("@message", longString);

    browser.pause(1000);

    contactUsSection.element("@submit").click();
    contactUsSection.expect.element("@errorMessage").to.be.visible;
    browser.end();
  });
  it("1.12 Filling All Fields ( Required + Optional ) For a Valid Submission", async function (browser) {
    var contactUs = browser.page.contactUs.contactUs();
    contactUs.navigate();
    var contactUsSection = contactUs.section.contactUs;

    contactUsSection.click("@selectOptionCustomerService");
    const optionText = await contactUsSection
      .element("@selectOptionCustomerService")
      .getText();

    await contactUsSection
      .element("@selectOptionDisplay")
      .getText()
      .assert.equals(optionText);

    contactUsSection.element("@email").setValue(data.validEmail);
    contactUsSection.assert.valueEquals("@email", data.validEmail);
    contactUsSection.assert.attributeMatches(
      "@email",
      "value",
      new RegExp(data.emailRegex)
    );

    contactUsSection.element("@orderReference").setValue(data.orderNumber);
    contactUsSection.assert.valueEquals("@orderReference", data.orderNumber);

    contactUsSection.element("@message").setValue(data.messageEntered);
    contactUsSection.assert.valueEquals("@message", data.messageEntered);

    const fileUploadSection = contactUsSection.section.fileUploading;
    imagePath = path.resolve("./testData/Image.png");
    fileUploadSection.uploadFile("@fileInput", imagePath);

    await fileUploadSection
      .element("@fileView")
      .getText()
      .assert.equals(path.basename(imagePath));

    browser.end();
  });
});
