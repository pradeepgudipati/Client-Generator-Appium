'use strict';
const
	driver = global.driver,
	webdriver = global.webdriver,
	userDetails = require(`${global.projRoot}/Config/data_config.js`).newUserCreateAndDetails;
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
	it('Accept prompt and Enter EmailId', () => {
		return driver
			.waitForElementByAndroidUIAutomator('new UiSelector().text("Are you Admin User?")', webdriver.asserters.isDisplayed, 10000)
			.elementById('android:id/button1')
			.click()
			.elementById('com.example.axway.mbaas:id/users_delete_username_field')
			.sendKeys(userDetails.secondEmail)
			.elementById('com.example.axway.mbaas:id/users_delete_username_field')
			.text().should.become(userDetails.secondEmail);
	});
	it('Remove the Normal User', () => {
		return driver
			.elementById('com.example.axway.mbaas:id/users_remove_button1')
			.click()
			.waitForElementById('android:id/message', webdriver.asserters.isDisplayed, 10000)
			.getAttribute('text')
			.then(text => {
				text.should.include('"status":"fail"');
				text.should.include('"code":403');
				text.should.include('"message":"You are not authorized to perform this action."');
			});
	});
});
