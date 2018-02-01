'use strict';

const
	driver = global.driver,
	webdriver = global.webdriver,
	user = require(`${global.projRoot}/Config/data_config.js`).user,
	chat = require(`${global.projRoot}/Config/data_config.js`).chat;


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
			.waitForElementById('OK', webdriver.asserters.isDisplayed, 5000)
			.click()
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
		.waitForElementById('Ad,Wilson',webdriver.asserters.isDisplayed, 5000)
		.click()
	});

	it('Chat with selected user', () => {
		return driver
		.waitForElementById('Enter chat message', webdriver.asserters.isDisplayed, 10000)
		.sendKeys(chat.message)
		.elementById('Done')
		.click();
	});
});