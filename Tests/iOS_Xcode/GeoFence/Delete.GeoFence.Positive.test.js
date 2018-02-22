'use strict';
const
	driver = global.driver,
	webdriver = global.webdriver,
	// creating instance to get data placed in data config file
	updategeofence = require(`${global.projRoot}/Config/data_config.js`).updategeofence,
	user = require(`${global.projRoot}/Config/data_config.js`).user;
describe('GeoFence Delete - Positive', () => {
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
			.waitForElementById('Query Geo Fence', webdriver.asserters.isDisplayed, 10000)
			.click()
			.waitForElementById(updategeofence.name, webdriver.asserters.isDisplayed, 10000)
			.isDisplayed().should.become(true);
	});
	after(() => {
		return driver.resetApp();
	});
	it('Choose a geo fence', () => {
		return driver
			.elementById(updategeofence.name)
			.click()
	});
	it('Delete Geo Fence', () => {
		return driver
			.elementById('Delete') // will search for element id namely create Geo Fence
			.click()
			.waitForElementByXPath('//XCUIElementTypeStaticText[2]', webdriver.asserters.isDisplayed, 10000)
			.getAttribute('value')
			.then(text => { // Api response is handled
				text.should.include('code = 200');
				text.should.include('"method_name" = destroyGeoFence');
			});
	});
});
