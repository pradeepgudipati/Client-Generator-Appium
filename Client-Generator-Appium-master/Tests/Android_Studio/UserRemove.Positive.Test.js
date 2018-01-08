'use strict';

const
	driver = global.driver,
	webdriver = global.webdriver,
	adminUser = require('../../Config/data_config.js').adminUser;

describe('User Remove - Positive', () => {
	before(() => {
		return driver
			.elementById('com.example.axway.mbaas:id/btn_login')
			.click()
			.elementByAndroidUIAutomator('new UiSelector().text("Users")')
			.click()
			.elementByAndroidUIAutomator('new UiSelector().text("Login User")')
			.click()
			.elementById('com.example.axway.mbaas:id/users_login_username_field')
			.sendKeys(adminUser.username)
			.elementById('com.example.axway.mbaas:id/users_login_password_field')
			.sendKeys(adminUser.password)
			.elementById('com.example.axway.mbaas:id/users_login_button1')
			.click()
			.waitForElementByAndroidUIAutomator('new UiSelector().text("Success!")', webdriver.asserters.isDisplayed, 10000)
			.elementById('android:id/button1')
			.click()
			.elementByAndroidUIAutomator('new UiSelector().text("Remove User")')
			.click();
	});

	after(() => {
		return driver.resetApp();
	});

	it('Accept Prompt', () => {
		return driver
			.waitForElementByAndroidUIAutomator('new UiSelector().text("Are you Admin User?")', webdriver.asserters.isDisplayed, 10000)
			.elementById('android:id/button1')
			.click();
	});

	it('Remove the Normal User', () => {
		// Appium hangs on this page
		false.should.equal(true);
	});
});
