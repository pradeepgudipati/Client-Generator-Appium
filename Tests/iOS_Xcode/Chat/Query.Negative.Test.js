'use strict';

const
	driver = global.driver,
	webdriver = global.webdriver,
	user = require(`${global.projRoot}/Config/data_config.js`).user;

describe('Chat Query - Negative', () => {
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

	it('Navigate to Query Chat Groups', () => {
		return driver
			.waitForElementById('Ad,Wilson', webdriver.asserters.isDisplayed, 5000)
			.isDisplayed().should.become(true);

	});

	it('Load the Current Chats', () => {

		return driver
			.elementById('Ad,Wilson')
			.click()
			.waitForElementByXPath('//XCUIElementTypeStaticText[2]', webdriver.asserters.isDisplayed, 10000)
			.getAttribute('value')
			.then(text => { //Api response is handled
				text.should.include('code = 400');
				text.should.include('message = "Failed to authenticate user"');
			});
	})
});