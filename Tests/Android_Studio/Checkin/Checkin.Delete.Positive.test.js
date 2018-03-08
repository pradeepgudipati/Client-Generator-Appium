'use strict';
const
	driver = global.driver,
	webdriver = global.webdriver,
	user = require(`${global.projRoot}/Config/data_config.js`).user,
	place = require(`${global.projRoot}/Config/data_config.js`).tempPlace;
describe('Checkin Delete - Positive', () => {
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
			.elementByAndroidUIAutomator('new UiSelector().text("Remove Checkin")')
			.click()
			.elementByAndroidUIAutomator('new UiSelector().text("Are you sure?")')
			.click()
			.waitForElementById('android:id/message', webdriver.asserters.isDisplayed, 10000)
			.getAttribute('text')
			.then(text => {
				text.should.include('"status":"ok"');
				text.should.include('"code":200');
			});
	});
});
