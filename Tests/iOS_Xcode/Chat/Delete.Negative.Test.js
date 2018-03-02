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
			.click()
			.waitForElementById('Query Chat Groups', webdriver.asserters.isDisplayed, 5000)
			.click();
	});

	after(() => {
		return driver.resetApp();
	});

	it('Load the Current Chats', () => {
		return driver
			.waitForElementById('Ad,Wilson', webdriver.asserters.isDisplayed, 10000)
			.isDisplayed().should.become(true);
	});

	it('Delete selected chat', () => {
		return driver
			.elementById('Ad,Wilson')
            .click()
            .waitForElementById('Enter chat message', webdriver.asserters.isDisplayed, 10000)
            .elementById(chat.message)
            .click()
            .sleep(10000)
            .waitForElementById('Delete',webdriver.asserters.isDisplayed, 5000)
            .elementById('Ok')
            .click()
			.waitForElementByXPath('//XCUIElementTypeStaticText[2]', webdriver.asserters.isDisplayed, 10000)
			.getAttribute('value')
			.then(text => { //Api response is handled
				text.should.include('code = 400');
				text.should.include('message = "Failed to authenticate user"');
			});
	});
});