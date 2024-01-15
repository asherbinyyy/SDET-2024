# SDET 2024 - Technical Task

## Introduction

This project is designed to provide a user interface (UI) testing for the website outlined in the accompanying documentation. Additionally, it includes API testing capabilities that simulate user authentication.

### Features

- **User Interface (UI) Testing:** The project includes a comprehensive UI that tests the user experience on the specified website.

- **API Testing:** The project incorporates API testing functionality, with a focus on mocking user authentication processes. This allows for thorough testing of authentication-related scenarios.

## Getting Started

1. **UI Testing:**

- The UI Testing was done on the following website: [My Store](http://automationpractice.multiformis.com/index.php)

  Tests and report creation was done by using 'Nightwatch js" and the tests include:

  - Contact Us Page Functionality Tests
  - Search Results Functionality Tests

- [UI Tests HTML Results](https://github.com/asherbinyyy/SDET-2024/tree/main/UI/tests_output/nightwatch-html-report) can be seen on my github reposiotary

2. **API Testing:**

- This part tests all api routes of the module mock-user-auth using:

  - **SuperTest**
  - **chai** for assertions and mocha for running tests and generating HTML reports.

- [API Tests HTML Results](https://github.com/asherbinyyy/SDET-2024/tree/main/API/mochawesome-report) can be seen on my github reposiotary

3. **Integration with CircleCI**

- I have integrated my project with [CircleCI](https://app.circleci.com/pipelines/github/asherbinyyy/SDET-2024) and you will find the badge included as well.

- All tests successfully run on CircleCI.

4. **Deliverables**

- [github reposiotary](https://github.com/asherbinyyy/SDET-2024)
  includes the following:

  - UI Tests
  - API Tests
  - [Test Cases Documentation for the UI Testing](https://github.com/asherbinyyy/SDET-2024/blob/main/SDET2024-Technical_Task--%20UI_TestCase_Documentation.pdf)
  - [Bug Report for the UI Testing](https://github.com/asherbinyyy/SDET-2024/blob/main/SDET2024-Technical_Task--%20UI_BugReport_Documentation.pdf)
  - [Bug Report for the API Testing](https://github.com/asherbinyyy/SDET-2024/blob/main/SDET2024-Technical_Task--%20API_BugReport_Documentation.pdf)

# CircleCI Status Badge:

[![CircleCI](https://dl.circleci.com/status-badge/img/gh/asherbinyyy/SDET-2024/tree/main.svg?style=svg)](https://dl.circleci.com/status-badge/redirect/gh/asherbinyyy/SDET-2024/tree/main)
