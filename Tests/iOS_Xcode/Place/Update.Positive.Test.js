'use strict';

const
	driver = global.driver,
	webdriver = global.webdriver,
	// creating instance to get data placed in data config file
	user = require(`${global.projRoot}/Config/data_config.js`).user,
	tempPlace = require(`${global.projRoot}/Config/data_config.js`).tempPlace,
	place = require(`${global.projRoot}/Config/data_config.js`).place;


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
				text.should.include('code = 200');
				text.should.include('"method_name" = updatePlace');
				text.should.include(`name = "${tempPlace.name}"`);
				text.should.include(`address = ${tempPlace.address}`);
				text.should.include(`city = "${place.city}"`);
				text.should.include(`state = "${tempPlace.state}"`);
				text.should.include(`"postal_code" = "${tempPlace.postcode}"`);
				text.should.include(`country = ${tempPlace.country}`);
				text.should.include(`latitude = "${tempPlace.latitude}"`);
				text.should.include(`longitude = "${tempPlace.longitude}"`);
			});
	});
});