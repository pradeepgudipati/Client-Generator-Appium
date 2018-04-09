'use strict';
const
	driver = global.driver,
	webdriver = global.webdriver,
	user = require(`${global.projRoot}/Config/data_config.js`).user,
	UpdateGeoFence = require(`${global.projRoot}/Config/data_config.js`).UpdateGeoFence;
describe('GeoFence Delete - Positive', () => {
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
	it('Choose a GeoFence', () => {
		return driver
			.waitForElementByAndroidUIAutomator(`new UiSelector().text("${UpdateGeoFence.name}")`, webdriver.asserters.isDisplayed, 10000)
			.click()
			.elementById('com.example.axway.mbaas:id/geofences_update_name_field')
			.text().should.become(UpdateGeoFence.name)
			.hideKeyboard();
	});
	it('Delete GeoFence', () => { // will delete selected geofence
		return driver
			.elementById('com.example.axway.mbaas:id/geofences_update_remove_button2')
			.click()
			.elementById('com.example.axway.mbaas:id/geofences_remove_button1')
			.click()
			.waitForElementById('android:id/message', webdriver.asserters.isDisplayed, 10000)
			.getAttribute('text')
			.then(text => {
				text.should.include('"code":200');
				text.should.include('"status":"ok"');
				text.should.include('"method_name" : "DeleteGeoFence"');
				text.should.include('"method_name":"destroyGeoFence"');
			});
	});
});
