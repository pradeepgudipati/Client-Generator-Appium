'use strict';

const
	driver = global.driver,
	webdriver = global.webdriver,
	tempUser = require(`${global.projRoot}/Config/data_config.js`).tempUser1;

describe('Update user - Positive', () => {
	before(() => {
		return driver
			.elementById('com.example.axway.mbaas:id/btn_login')
			.click()
			.elementByAndroidUIAutomator('new UiSelector().text("Users")')
			.click()
			.elementByAndroidUIAutomator('new UiSelector().text("Login User")')
			.click()
			.elementById('com.example.axway.mbaas:id/users_login_username_field')
			.sendKeys(tempUser.username)
			.elementById('com.example.axway.mbaas:id/users_login_password_field')
			.sendKeys(tempUser.password)
			.elementById('com.example.axway.mbaas:id/users_login_button1')
			.click()
			.waitForElementByAndroidUIAutomator('new UiSelector().text("Success!")', webdriver.asserters.isDisplayed, 10000)
			.elementById('android:id/button1')
			.click()
			.elementByAndroidUIAutomator('new UiSelector().text("Update Current User")')
			.click()
			.waitForElementById('android:id/button1', webdriver.asserters.isDisplayed, 10000)
			.click();
	});

	after(() => {
		return driver.resetApp();
	});

	it('Open the page, and check that the details auto fill', () => {
		return driver
			.elementById('com.example.axway.mbaas:id/users_update_username_field')
			.sendKeys(tempUser.username)
			.elementById('com.example.axway.mbaas:id/users_update_password_field')
			.sendKeys(tempUser.password)
			.elementById('com.example.axway.mbaas:id/users_update_password_conf_field')
			.sendKeys(tempUser.password)
			.elementById('com.example.axway.mbaas:id/users_update_first_name_field')
			.text().should.become(tempUser.firstName)
			.elementById('com.example.axway.mbaas:id/users_update_last_name_field')
			.text().should.become(tempUser.lastName)
			.hideKeyboard();
			
	});

	it('Change the Email of the User', () => {
		return driver
			.elementById('com.example.axway.mbaas:id/users_update_email_field')
			.clear()
			.sendKeys(tempUser.secondEmail)
			.hideKeyboard()
			.elementById('com.example.axway.mbaas:id/users_update_button1')
			.click()
			.waitForElementById('android:id/message', webdriver.asserters.isDisplayed, 10000)
			.getAttribute('text')
			.then(text => {
				text.should.include('Updated!');
			});
			
	});
});