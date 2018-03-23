'use strict';
const
	driver = global.driver,
	webdriver = global.webdriver,
	user = require(`${global.projRoot}/Config/data_config.js`).user,
	chat = require(`${global.projRoot}/Config/data_config.js`).chat;
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
	it('Select any user to start chatting', () => {
		return driver
			.sleep(5000) // When entering into this screen we have getchats api in order to get response and refresh the table sleep is being included
			.waitForElementById('Create New Group', webdriver.asserters.isDisplayed, 5000)
			.click()
			.sleep(5000) // Placed for api response 
			.waitForElementById(chat.userName, webdriver.asserters.isDisplayed, 5000)
			.click()
			.waitForElementById('START CHATTING..!', webdriver.asserters.isDisplayed, 5000)
			.isDisplayed().should.become(true);
	});
	it('Create a chat group', () => {
		return driver
			.elementById('START CHATTING..!')
			.click()
			.waitForElementById('Enter chat message', webdriver.asserters.isDisplayed, 10000)
			.sendKeys(chat.message) // dynamic chat message binding
			.elementById('Done')
			.click()
			.sleep(10000)
			.getAttribute('value') // Help me out in completing this test case as in this module we are not displaying any alert after service call we are refreshing table so how could this be achieved
			.then(text => {
				console.log(text);
			});
	});
});
