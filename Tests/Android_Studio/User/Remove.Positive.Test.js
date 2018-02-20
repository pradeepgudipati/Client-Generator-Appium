'use strict';

const
	driver = global.driver,
	webdriver = global.webdriver,
	user = require(`${global.projRoot}/Config/data_config.js`).user,
	userDetails = require(`${global.projRoot}/Config/data_config.js`).newUserDetails;

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
			.sendKeys(user.username)
			.elementById('com.example.axway.mbaas:id/users_login_password_field')
			.sendKeys(user.password)
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

	it('Enter Username', () => {
		return driver
			.elementById('com.example.axway.mbaas:id/users_delete_username_field')
			.sendKeys(userDetails.username)
			.elementById('com.example.axway.mbaas:id/users_delete_username_field')
			.text().should.become(userDetails.username);
	});

	it('Remove the Normal User', () => {
		return driver
			.elementById('com.example.axway.mbaas:id/users_remove_button1')
			.click()
			.waitForElementById('android:id/message', webdriver.asserters.isDisplayed, 10000)
			.getAttribute('text')
			.then(text => {
				text.should.include('Removed!');
			});
	});
});