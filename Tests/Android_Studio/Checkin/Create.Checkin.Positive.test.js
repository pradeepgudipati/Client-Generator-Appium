'use strict';
const
	driver = global.driver,
	webdriver = global.webdriver,
	user = require(`${global.projRoot}/Config/data_config.js`).user,
	place = require(`${global.projRoot}/Config/data_config.js`).tempPlace;
describe('Checkin Create - Positive', () => {
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
				text.should.include('"status":"ok"');
				text.should.include('"code":200');
				text.should.include('"method_name":"createCheckin"');
			});
	});
});
