'use strict';
const
	driver = global.driver,
	webdriver = global.webdriver,
	// creating instance to get data placed in data config file
	user = require(`${global.projRoot}/Config/data_config.js`).user,
	photocollection = require(`${global.projRoot}/Config/data_config.js`).photocollection;
describe('Remove - Photo Collection - Positive', () => {
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
			.elementById('Photo Collections')
			.click()
			.waitForElementById('Search Photo Collection', webdriver.asserters.isDisplayed, 5000)
			.click()
			.waitForElementById(photocollection.updatedName, webdriver.asserters.isDisplayed, 5000)
			.click();
	});
	after(() => {
		return driver.resetApp();
	});
	it('Remove photo colection', () => {
		return driver
			.elementById('Remove') // will remove the selected photo collection
			.click()
			.elementById('Delete')
			.elementById('Ok')
			.click()
			.waitForElementByXPath('//XCUIElementTypeStaticText[2]', webdriver.asserters.isDisplayed, 10000)
			.getAttribute('value')
			.then(text => {
				text.should.include('code = 200');
				text.should.include('"method_name" = deleteCollection');
			});
	});
});
