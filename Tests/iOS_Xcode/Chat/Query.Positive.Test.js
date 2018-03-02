'use strict';

const
	driver = global.driver,
	webdriver = global.webdriver,
	user = require(`${global.projRoot}/Config/data_config.js`).user,
	chat = require(`${global.projRoot}/Config/data_config.js`).chat;

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
			.waitForElementById('Ad,Wilson', webdriver.asserters.isDisplayed, 5000)
			.isDisplayed().should.become(true);
	});

	it('Query Chat Groups', () => {
		return driver
			.elementById('Ad,Wilson')
			.click()
			.waitForElementById('Enter chat message', webdriver.asserters.isDisplayed, 10000)
			.sendKeys(chat.message)
			.elementById('Done')
			.click()
			.sleep(10000)
			.getAttribute('value') // Help me out in completing this test case as in this module we are not displaying any alert after service call we are refreshing table so how could this be achieved
			.then(text => {
				console.log(text);
			});
	});
});
