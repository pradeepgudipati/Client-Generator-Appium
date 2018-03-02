'use strict';

const
    driver = global.driver,
    webdriver = global.webdriver,
    user = require(`${global.projRoot}/Config/data_config.js`).user,
    chat = require(`${global.projRoot}/Config/data_config.js`).chat;

describe('Chat Delete - Negative', () => {
    before(() => {
        return driver
            .elementById('Axway')
            .click()
            .elementById('Chats')
            .click();

    });

    after(() => {
        return driver.resetApp();
    });

    it('Load the Current Chats', () => {
        return driver
            .sleep(5000) // When entering into this screen we have getchats api in order to get response and refresh the table sleep is being included
            .waitForElementById('Query Chat Groups', webdriver.asserters.isDisplayed, 5000)
            .isDisplayed().should.become(true);
    });

    it('Delete selected chat', () => {
        return driver
            .elementById('Query Chat Groups')
            .click()
            .waitForElementByXPath('//XCUIElementTypeStaticText[2]', webdriver.asserters.isDisplayed, 10000)
            .getAttribute('value')
            .then(text => { // Api response is handled
                text.should.include('code = 400');
                text.should.include('message = "Failed to authenticate user"');
            });
    });
});