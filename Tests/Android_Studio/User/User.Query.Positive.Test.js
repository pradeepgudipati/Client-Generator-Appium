'use strict';

const
	driver = global.driver,
	webdriver = global.webdriver,
	user = require(`${global.projRoot}/Config/data_config.js`).user,
	tempUser = require(`${global.projRoot}/Config/data_config.js`).tempUser1;

describe('User Query - Positive', () => {
	before(() => {
		return driver
			.elementById('com.example.axway.mbaas:id/btn_login')
			.click()
			.elementByAndroidUIAutomator('new UiSelector().text("Users")')
			.click()
			.elementByAndroidUIAutomator('new UiSelector().text("Query User")')
			.click();
	});

	after(() => {
		return driver.resetApp();
	});

	it('Should the details checked the response', () => {
		return driver
			.waitForElementByAndroidUIAutomator('new UiSelector().text("11")', webdriver.asserters.isDisplayed, 10000)
			.click()
			.waitForElementById('com.example.axway.mbaas:id/users_show_text_view', 10000)
			.getAttribute('text')
			.then(text => {
				text = JSON.parse('{' + text.split('{').slice(1).join('{'));
				text.meta.code.should.equal(200);
				text.meta.status.should.equal('ok');
			});

	});
});