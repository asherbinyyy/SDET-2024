module.exports = {
  url: "http://automationpractice.multiformis.com/index.php?controller=contact",
  sections: {
    contactUs: {
      selector: "#center_column",
      elements: {
        subjectHeadingDropdown: {
          selector: "#uniform-id_contact",
        },
        selectOptionCustomerService: {
          selector: "#id_contact  option[value='2']",
        },
        selectOptionWebmaster: {
          selector: "#id_contact  option[value='1']",
        },
        selectOptionDisplay: {
          selector: "#uniform-id_contact span",
        },
        email: {
          selector: "#email",
          retryInterval: 5000,
        },
        orderReference: {
          selector: "#id_order",
          retryInterval: 5000,
        },
        message: {
          selector: "#message",
        },
        submit: {
          selector: "#submitMessage",
        },
        successMessage: {
          selector: ".alert-success",
        },
        errorMessage: {
          selector: ".alert-danger",
        },
        errorMessageList: {
          selector: "#center_column > div > ol > li",
        },
      },
      sections: {
        fileUploading: {
          selector: "#uniform-fileUpload",
          elements: {
            fileView: {
              selector: "#uniform-fileUpload span",
              index: 0,
            },
            uploadButton: {
              selector: "#uniform-fileUpload span",
              index: 1,
            },
            fileInput: { selector: "#fileUpload" },
          },
        },
      },
    },
  },
};
