'use strict';

const
	driver = global.driver,
	webdriver = global.webdriver,
	user = require(`${global.projRoot}/Config/data_config.js`).user,
	geofence = require(`${global.projRoot}/Config/data_config.js`).geoFence;

describe('GeoFence Creation - Positive', () => {
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
			.waitForElementById('android:id/message', webdriver.asserters.isDisplayed, 10000)
			.getAttribute('text')
			.then(text => {
				text.should.include('"code":200');
				text.should.include('"status":"ok"');
				text.should.include('"method_name":"createGeoFence"');
			});

	});

});