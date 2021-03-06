'use strict';

const
	driver = global.driver,
	webdriver = global.webdriver,
	// creating instance to get data placed in data config file
	tempPlace = require(`${global.projRoot}/Config/data_config.js`).tempPlace,
	place = require(`${global.projRoot}/Config/data_config.js`).place;


describe('Place Update - Negative', () => {
	before(() => {
		return driver
			.elementById('Places')
			.click()
			.waitForElementById('Query Place', webdriver.asserters.isDisplayed, 10000)
			.click()
			.waitForElementByXPath('//XCUIElementTypeStaticText[@name="University of Huddersfield"]', webdriver.asserters.isDisplayed, 10000)
			.click()
			.elementById('Update Place')
			.click();
	});

	after(() => {
		return driver.resetApp();
	});

	it('Update the City Text Field', () => {
		return driver
			.waitForElementById(tempPlace.city, webdriver.asserters.isDisplayed, 10000)
			.elementByXPath('//XCUIElementTypeTextField[@value="Huddersfield"]')
			.clear()
			.sendKeys(place.city) // binding static information to input fields 
			.elementByXPath('//XCUIElementTypeTextField[@value="San Jose"]')
			.isDisplayed().should.become(true);
	});

	it('Update Place', () => {
		return driver
			.elementById('Done')
			.click()
			.elementById('Update Place') // will search for element id namely update to update the given place
			.click()
			.waitForElementByXPath('//XCUIElementTypeStaticText[2]', webdriver.asserters.isDisplayed, 10000)
			.getAttribute('name')
			.then(text => {
				text.should.include('code = 400');
				text.should.include('message = "Failed to authenticate user"');
			});
	});
});