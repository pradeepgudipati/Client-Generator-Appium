'use strict';

const
	driver = global.driver,
	webdriver = global.webdriver,
	user = require(`${global.projRoot}/Config/data_config.js`).user,
	chat = require(`${global.projRoot}/Config/data_config.js`).chat;


// FIXME: Can't do anything once the chat page is open

describe('Chat Delete - Positive', () => {
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
		.sleep(10000) //Here sleep is placed as to wait for api call response as tableview reloads upon api hit
		.waitForElementById('Query Chat Groups',webdriver.asserters.isDisplayed,5000)
		.click()
		.waitForElementById('Ad,testios',webdriver.asserters.isDisplayed,5000)
        .click()
        .sleep(5000)
        .elementByXPath('(//XCUIElementTypeStaticText[@name="Hello axway group Ad Ministrator"])[1]',webdriver.asserters.isDisplayed,10000)
        .click();
	
	});

	it('Create a chat group', () => {
        return driver
        .waitForElementById('Delete',webdriver.asserters.isDisplayed,5000)
        .elementById('Ok')
        .click()
        .waitForElementByXPath('//XCUIElementTypeStaticText[2]', webdriver.asserters.isDisplayed, 10000)
		.getAttribute('name')
		.then(text => {
			text.should.include('code = 200');
			text.should.include('"method_name" = deleteChat');
		});
	});
});