'use strict';
const
	driver = global.driver,
	webdriver = global.webdriver,
	// creating instance to get data placed in data config file
	geofence = require(`${global.projRoot}/Config/data_config.js`).geofence,
	updategeofence = require(`${global.projRoot}/Config/data_config.js`).updategeofence,
	user = require(`${global.projRoot}/Config/data_config.js`).user;
describe('GeoFence Update - Positive', () => {
	before(() => {
		return driver
			.elementById('Users')
			.click()
			.elementById('Login User')
			.click()
			.elementByXPath('//XCUIElementTypeTextField[@value="Username"]')
			.sendKeys(user.username) // binding static information to input fields
			.elementByXPath('//XCUIElementTypeSecureTextField[@value="Password"]')
			.sendKeys(user.password) // binding static information to input fields
			.elementByXPath('//XCUIElementTypeButton[@name="Login"]')
			.click()
			// will wait for 10000 seconds when alert is being display
			.waitForElementById('OK', webdriver.asserters.isDisplayed, 10000)
			.click()
			.elementById('Axway')
			.click()
			.elementById('Geo Fences')
			.click()
			.waitForElementById('Query Geo Fence', webdriver.asserters.isDisplayed, 5000)
			.click()
			.waitForElementById(geofence.name, webdriver.asserters.isDisplayed, 5000)
			.isDisplayed().should.become(true);
	});
	after(() => {
		return driver.resetApp();
	});
	it('Change Geo Fence Name', () => {
		return driver
			.elementById(geofence.name)
			.click()
			.elementByXPath(`//XCUIElementTypeTextField[@value="${geofence.name}"]`)
			.clear()
			.sendKeys(updategeofence.name)
			.elementByXPath(`//XCUIElementTypeTextField[@value="${updategeofence.name}"]`)
			.isDisplayed().should.become(true);
	});
	it('Update Geo Fence', () => {
		return driver
			.elementById('Update') // will search for element id namely create Geo Fence
			.click()
			.waitForElementByXPath('//XCUIElementTypeStaticText[2]', webdriver.asserters.isDisplayed, 10000)
			.getAttribute('value')
			.then(text => { // Api response is handled
				text.should.include('code = 200');
				text.should.include('"method_name" = updateGeoFence');
				text.should.include(`name = "${updategeofence.name}"`);
				text.should.include('"public_read" = 0');
				text.should.include('"public_write" = 0');
			});
	});
});
