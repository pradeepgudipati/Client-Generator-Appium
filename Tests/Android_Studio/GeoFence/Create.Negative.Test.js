'use strict';
const
	driver = global.driver,
	webdriver = global.webdriver,
	geofence = require(`${global.projRoot}/Config/data_config.js`).geoFence;
describe('GeoFence Creation - Negative', () => {
	before(() => {
		return driver
			.elementById('com.example.axway.mbaas:id/btn_login')
			.click()
			.elementByAndroidUIAutomator('new UiSelector().text("Geo Fences")')
			.click() // Navigate to GeoFence module
			.elementByAndroidUIAutomator('new UiSelector().text("Create Geo Fence")')
			.click();
	});
	after(() => {
		return driver.resetApp();
	});
	// Enter Geofence details
	it('Enter GeoFence Name', () => {
		return driver
			.elementById('com.example.axway.mbaas:id/geofences_create_name_field')
			.sendKeys(geofence.name)
			.elementById('com.example.axway.mbaas:id/geofences_create_name_field')
			.text().should.become(geofence.name);
	});
	it('Enter Latitude', () => {
		return driver
			.elementById('com.example.axway.mbaas:id/geofences_create_latitude_field')
			.sendKeys(geofence.latitude)
			.elementById('com.example.axway.mbaas:id/geofences_create_latitude_field')
			.text().should.become(geofence.latitude);
	});
	it('Enter Longitude', () => {
		return driver
			.elementById('com.example.axway.mbaas:id/geofences_create_longitude_field')
			.sendKeys(geofence.longitude)
			.elementById('com.example.axway.mbaas:id/geofences_create_longitude_field')
			.text().should.become(geofence.longitude);
	});
	it('Enter Radius', () => {
		return driver
			.elementById('com.example.axway.mbaas:id/geofences_create_radius_field')
			.sendKeys(geofence.radius)
			.elementById('com.example.axway.mbaas:id/geofences_create_radius_field')
			.text().should.become(geofence.radius)
			.hideKeyboard();
	});
	it('Create GeoFence', () => { // Will create geofence with given inputs
		return driver
			.elementById('com.example.axway.mbaas:id/geofences_create_button1')
			.click()
			.waitForElementById('android:id/message', webdriver.asserters.isDisplayed, 15000)
			.getAttribute('text')
			.then(text => {
				text.should.include('"code":403');
				text.should.include('"status":"fail"');
				text.should.include('"message":"You are not authorized to perform this action."');
			});
	});
});
