'use strict';

const
	driver = global.driver,
	webdriver = global.webdriver,
	user = require(`${global.projRoot}/Config/data_config.js`).user,
	tempPlace = require(`${global.projRoot}/Config/data_config.js`).tempPlace;

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

	it('Update the Country Text Field', () => {
		return driver
        .waitForElementById(tempPlace.secondCountry, webdriver.asserters.isDisplayed, 10000)
		.elementByXPath('//XCUIElementTypeTextField[@value="Great Britain"]')
		.clear()
		.sendKeys(tempPlace.country)
		.elementByXPath('//XCUIElementTypeTextField[@value="England"]')
		.isDisplayed().should.become(true);
	});

	it('Push the Update', () => {
		return driver
			.elementById('Done')
			.click()
			.elementById('Update Place')
			.click()
			.waitForElementByXPath('//XCUIElementTypeStaticText[2]', webdriver.asserters.isDisplayed, 10000)
			.getAttribute('name')
			.then(text => {
                text.should.include('code = 400');
				text.should.include('message = "Failed to authenticate user"');
			});
	});
});