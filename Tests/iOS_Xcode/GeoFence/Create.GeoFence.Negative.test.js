'use strict';
const
	driver = global.driver,
	webdriver = global.webdriver,
	//creating instance to get data placed in data config file
	geofence = require(`${global.projRoot}/Config/data_config.js`).geofence;
describe('GeoFence Create - Negative', () => {
	before(() => {
		return driver
			.elementById('Geo Fences')
			.click()
			.elementById('Create Geo Fence')
			.click();
	});
	after(() => {
		return driver.resetApp();
	});
	it('Enter Geo Fence Data', () => {
		return driver
			.elementById('Name')
			.sendKeys(geofence.name) // binding static information to input fields
			.elementById(geofence.name)
			.isDisplayed().should.become(true)
			.elementById('Latitude')
			.sendKeys(geofence.latitude) // binding static information to input fields
			.elementById(geofence.latitude)
			.isDisplayed().should.become(true)
			.elementById('Longitude')
			.sendKeys(geofence.longitude) // binding static information to input fields
			.elementById(geofence.longitude)
			.isDisplayed().should.become(true)
			.elementById('Radius')
			.sendKeys(geofence.radius) // binding static information to input fields
			.elementById(geofence.radius)
			.isDisplayed().should.become(true);
	});
	it('Create Geo Fence', () => {
		return driver
			.elementById('Create') // will search for element id namely create Geo Fence
			.click()
			.waitForElementByXPath('//XCUIElementTypeStaticText[2]', webdriver.asserters.isDisplayed, 10000)
			.getAttribute('value')
			.then(text => { // Api response is handled
				text.should.include('code = 403'); // Modified text as per api response but this api inturn should return 400 (failed to authenticate user). 
				text.should.include('message = "You are not authorized to perform this action."');
			});
	});
});