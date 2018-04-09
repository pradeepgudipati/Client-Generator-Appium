'use strict';
const
	driver = global.driver,
	webdriver = global.webdriver,
	geofence = require(`${global.projRoot}/Config/data_config.js`).geoFence,
	UpdateGeoFence = require(`${global.projRoot}/Config/data_config.js`).UpdateGeoFence;
describe('GeoFence Update - Negative', () => {
	before(() => {
		return driver
			.elementById('com.example.axway.mbaas:id/btn_login')
			.click()
			.elementByAndroidUIAutomator('new UiSelector().text("Geo Fences")')
			.click()
			.elementByAndroidUIAutomator('new UiSelector().text("Query Geo Fences")')
			.click();
	});
	after(() => {
		return driver.resetApp();
	});
	// Update Geofence details
	it('Update GeoFence name', () => {
		return driver
			.waitForElementByAndroidUIAutomator(`new UiSelector().text("${geofence.name}")`, webdriver.asserters.isDisplayed, 10000)
			.click()
			.elementById('com.example.axway.mbaas:id/geofences_update_name_field')
			.clear()
			.sendKeys(UpdateGeoFence.name)
			.elementById('com.example.axway.mbaas:id/geofences_update_name_field')
			.text().should.become(UpdateGeoFence.name);
	});
	it('Update Latitude', () => {
		return driver
			.elementById('com.example.axway.mbaas:id/geofences_update_latitude_field')
			.clear()
			.sendKeys(UpdateGeoFence.latitude)
			.elementById('com.example.axway.mbaas:id/geofences_update_latitude_field')
			.text().should.become(UpdateGeoFence.latitude);
	});
	it('Update Longitude', () => {
		return driver
			.elementById('com.example.axway.mbaas:id/geofences_update_longitude_field')
			.clear()
			.sendKeys(UpdateGeoFence.longitude)
			.elementById('com.example.axway.mbaas:id/geofences_update_longitude_field')
			.text().should.become(UpdateGeoFence.longitude);
	});
	it('Update Radius', () => {
		return driver
			.elementById('com.example.axway.mbaas:id/geofences_update_radius_field')
			.clear()
			.sendKeys(UpdateGeoFence.radius)
			.elementById('com.example.axway.mbaas:id/geofences_update_radius_field')
			.text().should.become(UpdateGeoFence.radius)
			.hideKeyboard();
	});
	it('Update GeoFence', () => { // will update selected geofence
		return driver
			.elementById('com.example.axway.mbaas:id/geofences_update_update_button1')
			.click()
			.waitForElementById('android:id/message', webdriver.asserters.isDisplayed, 10000)
			.getAttribute('text')
			.then(text => {
				text.should.include('"code":403');
				text.should.include('"status":"fail"');
				text.should.include('"message":"You are not authorized to perform this action."');
			});
	});
});
