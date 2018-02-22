'use strict';
const
	driver = global.driver,
	webdriver = global.webdriver,
	// creating instance to get data placed in data config file
	geofence = require(`${global.projRoot}/Config/data_config.js`).geofence,
	updategeofence = require(`${global.projRoot}/Config/data_config.js`).updategeofence,
	user = require(`${global.projRoot}/Config/data_config.js`).user;
describe('GeoFence Update - Negative', () => {
	before(() => {
		return driver
			.elementById('Axway')
			.click()
			.elementById('Geo Fences')
			.click()
			.waitForElementById('Query Geo Fence', webdriver.asserters.isDisplayed, 10000)
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
				text.should.include('code = 400');
				text.should.include('message = "Failed to authenticate user"');
			});
	});
});
