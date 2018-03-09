'use strict';

const driver = global.driver,
	webdriver = global.webdriver,
	user = require(`${global.projRoot}/Config/data_config.js`).user,
	place = require(`${global.projRoot}/Config/data_config.js`).place;

describe('Place Create - Positive', () => {
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
			.elementById('Checkins')
			.click()
			.waitForElementById('Query Checkin', webdriver.asserters.isDisplayed, 10000)
			.click()
			.waitForElementById(`Checked in to ${place.name}`, webdriver.asserters.isDisplayed, 10000);
	});

	after(() => {
		return driver.resetApp();
	});

	it('Get Checkin Details', () => {
		return driver
			.elementById(`Checked in to ${place.name}`)
			.click()
			.waitForElementByClassName('XCUIElementTypeTextView', webdriver.asserters.isDisplayed, 10000)
			.getAttribute('value')
			.then(text => {
				text.should.include('code = 200');
				text.should.include('"method_name" = showCheckins');
				text.should.include(`message = "Checked in to ${place.name}"`);
				text.should.include(`address = "${place.address}"`);
				text.should.include(`city = "${place.city}"`);
				text.should.include(`country = "${place.country}"`);
				text.should.include(`latitude = "${place.latitude}"`);
				text.should.include(`longitude = "${place.longitude}"`);
				text.should.include(`name = ${place.name}`);
				text.should.include(`"postal_code" = ${place.postcode}`);
				text.should.include(`state = ${place.state}`);
			});
	});
});