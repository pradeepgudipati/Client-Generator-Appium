'use strict';

const
	driver = global.driver,
	webdriver = global.webdriver,
	// creating instance to get data placed in data config file
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
			.click();
	});

	after(() => {
		return driver.resetApp();
	});

	it('Enter the Place Name', () => {
		return driver
			.waitForElementById('Axway', webdriver.asserters.isDisplayed, 10000)
			.elementById('Allow')
			.click()
			.waitForElementById('Place Name', webdriver.asserters.isDisplayed, 10000)
			.sendKeys(tempPlace.name) // binding static information to input fields 
			.elementByXPath(`//XCUIElementTypeTextField[@value="${tempPlace.name}"]`)
			.isDisplayed().should.become(true);
	});

	it('Search for the Place', () => {
		return driver
			.elementById('Search') // will search for element id namely search to search the given place
			.click()
			.waitForElementByXPath('//XCUIElementTypeStaticText[2]', webdriver.asserters.isDisplayed, 10000)
			.getAttribute('name')
			.then(text => {
				text.should.include('code = 200');
				text.should.include('"method_name" = searchPlace');
			})
	});
});