'use strict';
const
	driver = global.driver,
	webdriver = global.webdriver,
	UpdateGeoFence = require(`${global.projRoot}/Config/data_config.js`).UpdateGeoFence;
describe('GeoFence Delete - Negative', () => {
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
				text.should.include('"code":403');
				text.should.include('"status":"fail"');
				text.should.include('"message":"You are not authorized to perform this action."');
			});
	});
});
