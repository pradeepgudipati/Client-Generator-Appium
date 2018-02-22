'use strict';

const
	driver = global.driver,
	webdriver = global.webdriver,
	user = require(`${global.projRoot}/Config/data_config.js`).user,
	tempPlace = require(`${global.projRoot}/Config/data_config.js`).tempPlace;

describe('Place Search - Positive', () => {
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
			.elementById('Places')
			.click()
			.waitForElementById('Search Place', webdriver.asserters.isDisplayed, 10000)
			.click()
			.waitForElementById('Search', webdriver.asserters.isDisplayed, 10000);
	});

	after(() => {
		return driver.resetApp();
	});

	it('Enter the Place Name', () => {
		return driver
			.elementByXPath('//XCUIElementTypeTextField[@value="Place Name"]')
			.sendKeys(tempPlace.name)
			.elementByXPath(`//XCUIElementTypeTextField[@value="${tempPlace.name}"]`)
			.isDisplayed().should.become(true);
	});

	it('Search for the Place', () => {
		// return driver
		// 	.elementById('Search')
		// 	.click()
		// 	.elementById('Error in current location'); // This isn't the correct outcome
		true.should.equal(false);
	});
});
