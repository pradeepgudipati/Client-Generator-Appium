'use strict';

const
	driver = global.driver,
	webdriver = global.webdriver,
	adminUser = require('../../Config/data_config.js').adminUser;

describe.only('ACL Show - Positive', () => {
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
			.back()
			.elementByAndroidUIAutomator('new UiSelector().text("Access Control Lists")')
			.click()
			.elementByAndroidUIAutomator('new UiSelector().text("Show ACL")')
			.click();
	});

	after(() => {
		return driver.resetApp();
	});

	it('Enter ACL Name', () => {
		return driver
			.elementById('com.example.axway.mbaas:id/access_control_lists_show_name_field')
			.sendKeys('Test_ACL')
			.elementById('com.example.axway.mbaas:id/access_control_lists_show_name_field')
			.text().should.become('Test_ACL');
	});

	it('Show the ACL', () => {
		return driver
			.elementById('com.example.axway.mbaas:id/access_control_lists_show_show_button3')
			.click()
			.waitForElementById('android:id/message', webdriver.asserters.isDisplayed, 10000)
			.text().should.become('Shown!')
			.elementById('android:id/button1')
			.click()
	});
});
