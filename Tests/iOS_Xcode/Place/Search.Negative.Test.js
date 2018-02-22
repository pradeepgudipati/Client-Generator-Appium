'use strict';

const
	driver = global.driver,
	webdriver = global.webdriver,
	// creating instance to get data placed in data config file
	tempPlace = require(`${global.projRoot}/Config/data_config.js`).tempPlace;

describe('Place Search - Negative', () => {
	before(() => {
		return driver
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
				text.should.include('code = 400');
				text.should.include('message = "Failed to authenticate user"');
			})
	});
});