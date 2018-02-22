'use strict';

const driver = global.driver,
	webdriver = global.webdriver,
	place = require(`${global.projRoot}/Config/data_config.js`).tempPlace;

describe('Checkin Create - Negative', () => {
	before(() => {
		return driver
			.elementById('Checkins')
			.click()
			.waitForElementById('Create Checkin', webdriver.asserters.isDisplayed, 10000)
			.click()
			.waitForElementById(place.name, webdriver.asserters.isDisplayed, 10000);
	});

	after(() => {
		return driver.resetApp();
	});

	it('Create a Checkin', () => {
		return driver
			.elementById(place.name)
			.click()
			.waitForElementByXPath('//XCUIElementTypeStaticText[2]', webdriver.asserters.isDisplayed, 10000)
			.getAttribute('value')
			.then(text => {
				text.should.include('code = 400');
				text.should.include('status = fail');
			});
	});
});