'use strict';
const
	driver = global.driver,
	webdriver = global.webdriver,
	place = require(`${global.projRoot}/Config/data_config.js`).tempPlace;
describe('Checkin Delete - Negative', () => {
	before(() => {
		return driver
			.elementById('com.example.axway.mbaas:id/btn_login')
			.click()
			.elementByAndroidUIAutomator('new UiSelector().text("Checkins")')
			.click() // Navigates to Checkins module
			.elementByAndroidUIAutomator('new UiSelector().text("Query Checkin")')
			.click(); // Navigates to Query Checkin
	});
	after(() => {
		return driver.resetApp();
	});
	it('Get Checkin Details and Delete', () => { //will get selected checkin details and delete checkin
		return driver
			.waitForElementByAndroidUIAutomator(`new UiSelector().text("${place.name}")`, webdriver.asserters.isDisplayed, 10000)
			.click()
			.waitForElementById('com.example.axway.mbaas:id/checkins_show_remove_button1', webdriver.asserters.isDisplayed, 10000)
			.click()
			.elementById('com.example.axway.mbaas:id/checkins_remove_button1')
			.click()
			.waitForElementById('android:id/message', webdriver.asserters.isDisplayed, 10000)
			.getAttribute('text')
			.then(text => {
				text.should.include('"status":"fail"');
				text.should.include('"code":403');
				text.should.include('"method_name":"deleteCheckin"');
				text.should.include('"message":"Current user cannot delete this checkin"');
			});
	});
});
