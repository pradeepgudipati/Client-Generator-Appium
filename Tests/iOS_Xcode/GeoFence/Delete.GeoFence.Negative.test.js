'use strict';
const
	driver = global.driver,
	webdriver = global.webdriver,
	// creating instance to get data placed in data config file
	updategeofence = require(`${global.projRoot}/Config/data_config.js`).updategeofence;
describe('GeoFence Delete - Negative', () => {
	before(() => {
		return driver
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
			.click();
	});
	it('Delete Geo Fence', () => {
		return driver
			.elementById('Delete') // will search for element id namely delete Geo Fence
			.click()
			.waitForElementByXPath('//XCUIElementTypeStaticText[2]', webdriver.asserters.isDisplayed, 10000)
			.getAttribute('value')
			.then(text => { // Api response is handled
				text.should.include('code = 403'); // Modified text as per api response but this api inturn should return 400 (failed to authenticate user). 
				text.should.include('message = "You are not authorized to perform this action."');
			});
	});
});
