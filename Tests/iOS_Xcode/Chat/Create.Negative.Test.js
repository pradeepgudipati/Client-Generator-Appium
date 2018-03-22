'use strict';
const
	driver = global.driver,
	webdriver = global.webdriver,
	user = require(`${global.projRoot}/Config/data_config.js`).user,
	chat = require(`${global.projRoot}/Config/data_config.js`).chat;
describe('Chat Create - Negative', () => {
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
			.sendKeys(chat.message)
			.elementById('Done')
			.click()
			.waitForElementByXPath('//XCUIElementTypeStaticText[2]', webdriver.asserters.isDisplayed, 10000)
			.getAttribute('value')
			.then(text => { // Api response is handled
				text.should.include('code = 400');
				text.should.include('message = "Failed to authenticate user"');
			});
	});
});
