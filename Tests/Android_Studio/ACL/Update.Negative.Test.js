'use strict';

const
	driver = global.driver,
	webdriver = global.webdriver,
	acl = require(`${global.projRoot}/Config/data_config.js`).acl,
	user = require(`${global.projRoot}/Config/data_config.js`).user;

describe('ACL Update - Negative', () => {
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
			.text().should.become(acl.name);
	});

	it('Update Users in Readers List', () => {
		return driver
			.elementById('com.example.axway.mbaas:id/access_control_lists_update_users_select_readers_button1')
			.click()
			.waitForElementByAndroidUIAutomator(`new UiSelector().text("${acl.updateReaderName}"`, webdriver.asserters.isDisplayed, 10000)
			.click()
			.elementByAndroidUIAutomator(`new UiSelector().text("${acl.updateReaderName}"`)
			.getAttribute('checked')
			.then(checked => {
				checked.should.equal('true');
				return driver.back();
			});
	});

	it('Update Users in Writers List', () => {
		return driver
			.elementById('com.example.axway.mbaas:id/access_control_lists_update_users_select_writers_button2')
			.click()
			.waitForElementByAndroidUIAutomator(`new UiSelector().text("${acl.updateWiterName}"`, webdriver.asserters.isDisplayed, 10000)
			.click()
			.elementByAndroidUIAutomator(`new UiSelector().text("${acl.updateWiterName}"`)
			.getAttribute('checked')
			.then(checked => {
				checked.should.equal('true');
				return driver.back();
			});
	});

	it('Update the ACL', () => {
		return driver
			.elementById('com.example.axway.mbaas:id/access_control_lists_update_users_add_users_button3')
			.click()
			.waitForElementById('android:id/message', webdriver.asserters.isDisplayed, 10000)
			.getAttribute('text')
			.then(text => {
				text.should.include('"status":"fail"');
				text.should.include('"code":400');
			});
	});
});