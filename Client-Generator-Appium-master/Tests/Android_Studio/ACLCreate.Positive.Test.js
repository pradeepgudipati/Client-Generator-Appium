'use strict';

const
	driver = global.driver,
	webdriver = global.webdriver,
	adminUser = require('../../Config/data_config.js').adminUser;

describe('ACL Creation - Positive', () => {
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
			.elementByAndroidUIAutomator('new UiSelector().text("Create ACL")')
			.click();
	});

	after(() => {
		return driver.resetApp();
	});

	it('Enter ACL Name', () => {
		return driver
			.elementById('com.example.axway.mbaas:id/access_control_lists_create_name_field')
			.sendKeys('Test_ACL')
			.elementById('com.example.axway.mbaas:id/access_control_lists_create_name_field')
			.text().should.become('Test_ACL');
	});

	it('Add User to Read List', () => {
		return driver
			.elementById('com.example.axway.mbaas:id/access_control_lists_create_select_readers_button1')
			.click()
			.waitForElementByAndroidUIAutomator(`new UiSelector().text("${adminUser.firstName} ${adminUser.lastName}")`, webdriver.asserters.isDisplayed, 10000)
			.click()
			.elementByAndroidUIAutomator(`new UiSelector().text("${adminUser.firstName} ${adminUser.lastName}")`)
			.getAttribute('checked')
			.then(checked => {
				checked.should.equal('true');
				return driver.back();
			});
	});

	it('Add User to Writers List', () => {
		return driver
			.elementById('com.example.axway.mbaas:id/access_control_lists_create_select_writers_button2')
			.click()
			.waitForElementByAndroidUIAutomator(`new UiSelector().text("${adminUser.firstName} ${adminUser.lastName}")`, webdriver.asserters.isDisplayed, 10000)
			.click()
			.elementByAndroidUIAutomator(`new UiSelector().text("${adminUser.firstName} ${adminUser.lastName}")`)
			.getAttribute('checked')
			.then(checked => {
				checked.should.equal('true');
				return driver.back();
			});
	});

	it('Create the ACL', () => {
		return driver
			.elementById('com.example.axway.mbaas:id/access_control_lists_create_create_button3')
			.click()
			.waitForElementById('android:id/message', webdriver.asserters.isDisplayed, 10000)
			.text().should.become('Created!')
	});
});
