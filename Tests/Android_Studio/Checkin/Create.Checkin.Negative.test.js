'use strict';
const
	driver = global.driver,
	webdriver = global.webdriver,
	place = require(`${global.projRoot}/Config/data_config.js`).tempPlace;
describe('Checkin Create - Negative', () => {
	before(() => {
		return driver
			.elementById('com.example.axway.mbaas:id/btn_login')
			.click()
			.elementByAndroidUIAutomator('new UiSelector().text("Checkins")')
			.click() // Navigates to Checkins module
			.elementByAndroidUIAutomator('new UiSelector().text("Create Checkin")')
			.click(); // Navigates to Create Checkin
	});
	after(() => {
		return driver.resetApp();
	});
	it('Create a Checkin', () => { //It creates checkin
		return driver
			.waitForElementByAndroidUIAutomator(`new UiSelector().text("${place.name}")`, webdriver.asserters.isDisplayed, 10000)
			.click()
			.waitForElementById('android:id/message', webdriver.asserters.isDisplayed, 10000)
			.getAttribute('text')
			.then(text => {
				text.should.include('"status":"fail"');
				text.should.include('"code":400');
			});
	});
});
