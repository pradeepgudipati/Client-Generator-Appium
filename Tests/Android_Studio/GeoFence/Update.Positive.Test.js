'use strict';
const
	driver = global.driver,
	webdriver = global.webdriver,
	user = require(`${global.projRoot}/Config/data_config.js`).user,
	geofence = require(`${global.projRoot}/Config/data_config.js`).geoFence,
	UpdateGeoFence = require(`${global.projRoot}/Config/data_config.js`).UpdateGeoFence;
describe('GeoFence Update - Positive', () => {
	before(() => {
		return driver
			.elementById('com.example.axway.mbaas:id/btn_login')
			.click()
			.elementByAndroidUIAutomator('new UiSelector().text("Users")')
			.click()
			.elementByAndroidUIAutomator('new UiSelector().text("Login User")')
			.click()
			.elementById('com.example.axway.mbaas:id/users_login_username_field')
			.sendKeys(user.username)
			.elementById('com.example.axway.mbaas:id/users_login_password_field')
			.sendKeys(user.password)
			.elementById('com.example.axway.mbaas:id/users_login_button1')
			.click()
			.waitForElementByAndroidUIAutomator('new UiSelector().text("Success!")', webdriver.asserters.isDisplayed, 10000)
			.elementById('android:id/button1')
			.click()
			.back()
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
				text.should.include('"code":200');
				text.should.include('"status":"ok"');
				text.should.include('"method_name" : "UpdateGeoFence"');
				text.should.include('"method_name":"updateGeoFence"');
			});
	});
});
