'use strict';

const
	driver = global.driver,
	webdriver = global.webdriver,
	user = require(`${global.projRoot}/Config/data_config.js`).user;

// FIXME: There isn't anything on this page

describe('Chat Query - Positive', () => {
	before(() => {
		return driver
			.elementById('Users')
			.click()
			.elementById('Login User')
			.click()
			.elementByXPath('//XCUIElementTypeTextField[@value="Username"]')
			.sendKeys(user.username)
			.elementByXPath('//XCUIElementTypeSecureTextField[@value="Password"]')
			.sendKeys(user.password)
			.elementByXPath('//XCUIElementTypeButton[@name="Login"]')
			.click()
			.waitForElementById('OK', webdriver.asserters.isDisplayed, 10000)
			.click()
			.elementById('Axway')
			.click()
			.elementById('Chats')
			.click()
			.waitForElementById('Query Chat Groups', webdriver.asserters.isDisplayed, 10000)
			.click();
	});

	after(() => {
		return driver.resetApp();
	});

	it('Load the Current Chats', () => {
		return driver.waitForElementById('Empty list', webdriver.asserters.isDisplayed, 10000);
	});
});