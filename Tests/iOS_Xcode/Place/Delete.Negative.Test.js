'use strict';

const
	driver = global.driver,
	webdriver = global.webdriver,
	// creating instance to get data placed in data config file
	tempPlace = require(`${global.projRoot}/Config/data_config.js`).tempPlace;

describe('Place Delete - Negative', () => {
	before(() => {
		return driver
			.elementById('Axway')
			.click()
			.elementById('Places')
			.click()
			.waitForElementById('Query Place', webdriver.asserters.isDisplayed, 10000)
			.click()
			.waitForElementByXPath(`//XCUIElementTypeStaticText[@name="University of Huddersfield"]`, webdriver.asserters.isDisplayed, 10000)
			.click();
	});

	after(() => {
		return driver.resetApp();
	});

	it('Delete the Location', () => {
		return driver
			.elementById('Delete Place') // will search for element id namely delete place
			.click()
			.waitForElementByXPath('//XCUIElementTypeStaticText[2]', webdriver.asserters.isDisplayed, 10000)
			.getAttribute('name')
			.then(text => {
				text.should.include('code = 400');
				text.should.include('message = "Failed to authenticate user"');
			});
	});
});