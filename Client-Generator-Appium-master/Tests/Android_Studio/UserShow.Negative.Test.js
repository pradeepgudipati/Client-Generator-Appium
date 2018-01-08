'use strict';

const
	driver = global.driver,
	webdriver = global.webdriver;

describe('User Show - Negative', () => {
	before(() => {
		return driver
			.elementById('com.example.axway.mbaas:id/btn_login')
			.click()
			.elementByAndroidUIAutomator('new UiSelector().text("Users")')
			.click()
			.elementByAndroidUIAutomator('new UiSelector().text("Show Current User")')
			.click();
	});

	after(() => {
		return driver.resetApp();
	});

	it('Click on the User Show Button', () => {
		return driver
			.sleep(5000)
			.waitForElementById('android:id/message', webdriver.asserters.isDisplayed, 10000)
			.getAttribute('text')
			.then(text => {
				text.should.include('"code":401');
				text.should.include('"message":"You need to sign in or sign up before continuing."');
			});
	});
});
