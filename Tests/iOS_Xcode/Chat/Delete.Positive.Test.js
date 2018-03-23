'use strict';
const
	driver = global.driver,
	webdriver = global.webdriver,
	user = require(`${global.projRoot}/Config/data_config.js`).user,
	chat = require(`${global.projRoot}/Config/data_config.js`).chat;
describe('Chat Delete - Postive', () => {
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
			.isDisplayed().should.become(true);
	});
	after(() => {
		return driver.resetApp();
	});
	it('Load the Current Chats', () => {
		return driver
			.elementById('Query Chat Groups')
			.click()
			.waitForElementById(chat.chatGroup, webdriver.asserters.isDisplayed, 5000)
			.isDisplayed().should.become(true);
	});
	it('Delete selected chat', () => { // delete selected chat
		return driver
			.elementById(chat.chatGroup)
			.click()
			.sleep(5000)
			.waitForElementById('Enter chat message', webdriver.asserters.isDisplayed, 10000)
			// .elementById(chat.message)
			.waitForElementByXPath('//XCUIElementTypeCell[1]', webdriver.asserters.isDisplayed, 10000)
			.click()
			.sleep(10000)
			.waitForElementById('Delete', webdriver.asserters.isDisplayed, 5000)
			.elementById('Ok')
			.click()
			.sleep(10000)
			.getAttribute('value') // Help me out in completing this test case as in this module we are not displaying any alert after service call we are refreshing table so how could this be achieved
			.then(text => {
				console.log(text);
			});
	});
});
