'use strict';
const
	driver = global.driver,
	webdriver = global.webdriver;
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
				text.should.include('ok');
				text.should.include('200');
			});
	});
});
