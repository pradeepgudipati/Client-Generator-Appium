'use strict';

const
	driver = global.driver,
	webdriver = global.webdriver,
	user = require(`${global.projRoot}/Config/data_config.js`).user;

// FIXME: Can't do anything once the chat page is open

describe('Chat Create - Positive', () => {
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
			.waitForElementById('Create New Group', webdriver.asserters.isDisplayed, 10000)
			.click()
			.waitForElementById('START CHATTING..!', webdriver.asserters.isDisplayed, 10000);
	});

	after(() => {
		return driver.resetApp();
	});

	it('Create a chat group', () => {
		return driver
			.elementById('Ad Ministrator')
			.click()
			.elementById('Wilson Luu')
			.click()
			.elementById('START CHATTING..!')
			.click()
			.elementById('Empty list')
			.isDisplayed().should.become(true);
	});
});