'use strict';

const
	driver = global.driver,
	webdriver = global.webdriver,
	user = require(`${global.projRoot}/Config/data_config.js`).user,
	chat = require(`${global.projRoot}/Config/data_config.js`).chat;


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
			.waitForElementById('OK', webdriver.asserters.isDisplayed, 5000)
			.click()
			.elementById('Axway')
			.click()
			.elementById('Chats')
			.click();
			
	});

	after(() => {
		return driver.resetApp();
	});

	it('Select any user to start chatting',() => {

		return driver
        .sleep(5000)
		.waitForElementById('Create New Group',webdriver.asserters.isDisplayed, 5000)
		.click()
		.sleep(5000)
		.waitForElementById('Wilson Luu',webdriver.asserters.isDisplayed, 5000)
		.click()
		.waitForElementById('START CHATTING..!', webdriver.asserters.isDisplayed, 5000)
		.click()
		
	});
	it('Create a chat group', () => {
		return driver
		.waitForElementById('Enter chat message', webdriver.asserters.isDisplayed, 10000)
		.sendKeys(chat.message)
		.elementById('Done')
		.click();
	});
});