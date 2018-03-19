'use strict';
const
	driver = global.driver,
	webdriver = global.webdriver,
	customObject = require(`${global.projRoot}/Config/data_config.js`).customObject;
describe('Remove Object - Negative', () => {
	before(() => {
		return driver
			.elementById('com.example.axway.mbaas:id/btn_login')
			.click()
			.elementByAndroidUIAutomator('new UiSelector().text("Custom Objects")')
			.click() // Navigates to Custom Objects module
			.elementByAndroidUIAutomator('new UiSelector().text("Query Object")')
			.click(); // Navigates to Query Objects list
	});
	after(() => {
		return driver.resetApp();
	});
	it('Enter a class name', () => {
		return driver
			.elementById('com.example.axway.mbaas:id/customobjects_query_class_name_field', webdriver.asserters.isDisplayed, 10000)
			.sendKeys(customObject.className) // binding static information to input field 
			.elementById('com.example.axway.mbaas:id/customobjects_query_class_name_field')
			.text().should.become(customObject.className);
	});
	it('Remove Query Object', () => {
		return driver
			.elementById('com.example.axway.mbaas:id/customobjects_query_query_button')
			.click() // Get list of custom objects
			.waitForElementByXPath('//android.widget.LinearLayout[@instance="1"]', webdriver.asserters.isDisplayed, 10000)
			.click() // Displays object details
			.waitForElementById('com.example.axway.mbaas:id/customobjects_update_remove_button', webdriver.asserters.isDisplayed, 10000)
			.click()
			.elementByAndroidUIAutomator('new UiSelector().text("Are you sure?")')
			.click() // It removes the object
			.waitForElementById('android:id/message', webdriver.asserters.isDisplayed, 10000)
			.getAttribute('text')
			.then(text => {
				text.should.include('"status":"fail"');
				text.should.include('"code":403');
			});
	});
});
