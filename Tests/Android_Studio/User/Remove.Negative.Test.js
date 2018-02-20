'use strict';

const
	driver = global.driver,
	webdriver = global.webdriver,
	userDetails = require(`${global.projRoot}/Config/data_config.js`).newUserDetails;

describe('User Remove - Negative', () => {
	before(() => {
		return driver
			.elementById('com.example.axway.mbaas:id/btn_login')
			.click()
			.elementByAndroidUIAutomator('new UiSelector().text("Users")')
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
				text.should.include('"status":"fail"');
			});
	});
});