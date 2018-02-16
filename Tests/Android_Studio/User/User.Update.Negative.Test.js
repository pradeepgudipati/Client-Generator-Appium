'use strict';

const
	driver = global.driver,
	webdriver = global.webdriver;

describe('Update user - Negative', () => {
	before(() => {
		return driver
			.elementById('com.example.axway.mbaas:id/btn_login')
			.click()
			.elementByAndroidUIAutomator('new UiSelector().text("Users")')
			.click()
			.elementByAndroidUIAutomator('new UiSelector().text("Update Current User")')
            .click();


	});

	after(() => {
		return driver.resetApp();
	});
	
    it('Click on the User Update Button', () => {
		return driver
			.waitForElementById('android:id/button1', webdriver.asserters.isDisplayed, 10000)
			.click()
			.waitForElementById('android:id/message', webdriver.asserters.isDisplayed, 10000)
			.getAttribute('text')
			.then(text => {
				text = JSON.parse('{' + text.split('{').slice(1).join('{'));
				text.meta.code.should.equal(401);
				text.meta.status.should.equal('fail');
			});
	});

});