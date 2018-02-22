'use strict';

const
	driver = global.driver,
	webdriver = global.webdriver,
	user = require(`${global.projRoot}/Config/data_config.js`).user;

describe('User Show - Positive', () => {
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
			.elementByAndroidUIAutomator('new UiSelector().text("Show Current User")')
			.click();
	});

	after(() => {
		return driver.resetApp();
	});

	it('Check User Details Are Correct', () => {
		return driver
			.waitForElementById('com.example.axway.mbaas:id/users_show_me_text_view', 10000)
			.getAttribute('text')
			.then(text => {
				text.should.include('ok');
				text.should.include('200');
			});
	});
});
