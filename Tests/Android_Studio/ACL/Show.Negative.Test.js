'use strict';

const
	driver = global.driver,
	webdriver = global.webdriver,
	user = require(`${global.projRoot}/Config/data_config.js`).user;

describe('ACL Show - Negative', () => {
	before(() => {
		return driver
			.elementById('com.example.axway.mbaas:id/btn_login')
			.click()
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
			.getAttribute('text')
			.then(text => {
				console.log(JSON.parse('{' + text.split('{').slice(1).join('{')));
			});
	});
});