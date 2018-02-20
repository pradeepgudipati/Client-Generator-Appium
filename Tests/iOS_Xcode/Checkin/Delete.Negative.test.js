'use strict';

const
	driver = global.driver,
	webdriver = global.webdriver,
	place = require(`${global.projRoot}/Config/data_config.js`).tempPlace;

describe('Checkin Query Delete - Negative', () => {
	before(() => {
		return driver
			.elementById('Checkins')
			.click()
			.waitForElementById('Query Checkin', webdriver.asserters.isDisplayed, 10000)
			.click()
			.waitForElementById(`Checked in to ${place.name}`, webdriver.asserters.isDisplayed, 10000);
	});

	after(() => {
		return driver.resetApp();
	});

	it('Get Details and  Delete Checkin', () => {
		return driver
        .elementById(`Checked in to ${place.name}`)
        .click()
		.waitForElementById('Delete', webdriver.asserters.isDisplayed, 10000)
        .click()
        .waitForElementById('Ok', webdriver.asserters.isDisplayed, 10000)
		.click()
		.waitForElementByXPath('//XCUIElementTypeStaticText[2]', webdriver.asserters.isDisplayed, 10000)
        .getAttribute('value')
        .then(text => {
            text.should.include('code = 403');
            text.should.include('"method_name" = deleteCheckin');
            text.should.include('status = fail');
            
        });
	});
});