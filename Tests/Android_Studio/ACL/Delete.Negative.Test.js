'use strict';

const
	driver = global.driver,
	webdriver = global.webdriver,
	acl = require(`${global.projRoot}/Config/data_config.js`).acl,
	user = require(`${global.projRoot}/Config/data_config.js`).user;

describe('ACL Delete - Negative', () => {
	before(() => {
		return driver
			.elementById('com.example.axway.mbaas:id/btn_login')
			.click()
	        .elementByAndroidUIAutomator('new UiSelector().text("Access Control Lists")')
			.click()
			.elementByAndroidUIAutomator('new UiSelector().text("Update Users in ACL")')
			.click();
			
	});

	after(() => {
		return driver.resetApp();
	});

	it('Enter ACL Name', () => {
		return driver
			.elementById('com.example.axway.mbaas:id/access_control_lists_update_users_name_field')
			.sendKeys(acl.name)
			.elementById('com.example.axway.mbaas:id/access_control_lists_update_users_name_field')
			.hideKeyboard()
			.text().should.become(acl.name);
	});

	it('Delete ACL', () => {
		return driver
			.elementById('com.example.axway.mbaas:id/access_control_lists_update_users_remove_users_button4')
			.click()
			.waitForElementById('android:id/message', webdriver.asserters.isDisplayed, 10000)
			.getAttribute('text')
			.then(text => {
				console.log(JSON.parse('{' + text.split('{').slice(1).join('{')));
			});
	});
});