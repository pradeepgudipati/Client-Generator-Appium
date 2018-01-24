'use strict';

const
	driver = global.driver,
	webdriver = global.webdriver,
	user = require(`${global.projRoot}/Config/data_config.js`).user,
	tempPlace = require(`${global.projRoot}/Config/data_config.js`).tempPlace;

describe('Place Update - Positive', () => {
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
		.waitForElementById("Queensgate", webdriver.asserters.isDisplayed, 10000)
		.elementByXPath('//XCUIElementTypeTextField[@value="Queensgate"]')
		.clear()
		.sendKeys(tempPlace.secondCountry)
		.elementByXPath('//XCUIElementTypeTextField[@value="Great Britain"]')
		.isDisplayed().should.become(true);
	});

	it('Update Place', () => {
		return driver
			.elementById('Done')
			.click()
			.elementById('Update Place')
			.click()
			.waitForElementByXPath('//XCUIElementTypeStaticText[2]', webdriver.asserters.isDisplayed, 10000)
			.getAttribute('name')
			.then(text => {
				text.should.include('code = 200');
				text.should.include('"method_name" = updatePlace');
				text.should.include(`name = "${tempPlace.name}"`);
				text.should.include(`address = ${tempPlace.address}`);
				text.should.include(`city = ${tempPlace.city}`);
				text.should.include(`state = "${tempPlace.state}"`);
				text.should.include(`"postal_code" = "${tempPlace.postcode}"`);
				text.should.include(`country = "${tempPlace.secondCountry}"`);
				text.should.include(`latitude = "${tempPlace.latitude}"`);
				text.should.include(`longitude = "${tempPlace.longitude}"`);
			});
	});
});