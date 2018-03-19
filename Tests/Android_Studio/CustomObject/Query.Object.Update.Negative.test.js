'use strict';
const
	driver = global.driver,
	webdriver = global.webdriver,
	customObject = require(`${global.projRoot}/Config/data_config.js`).customObject;
describe('Query Object Update - Negative', () => {
	before(() => {
		return driver
			.elementById('com.example.axway.mbaas:id/btn_login')
			.click()
			.elementByAndroidUIAutomator('new UiSelector().text("Custom Objects")')
			.click() // Navigates to Custom Objects module
			.elementByAndroidUIAutomator('new UiSelector().text("Query Object")')
			.click();
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
	it('Update class name value', () => {
		return driver
			.elementById('com.example.axway.mbaas:id/customobjects_query_query_button')
			.click() // Get list of custom objects
			.waitForElementByXPath('//android.widget.LinearLayout[@instance="1"]', webdriver.asserters.isDisplayed, 10000)
			.click() // Displays object details
			.waitForElementByXPath('//android.widget.EditText[@instance="1"]', webdriver.asserters.isDisplayed, 10000)
			.clear()
			.sendKeys(customObject.propertyValueUpdate) // binding updated information to input field 
			.elementByXPath('//android.widget.EditText[@instance="1"]')
			.text().should.become(customObject.propertyValueUpdate);
	});
	it('Update Query Object', () => {
		return driver
			.elementById('com.example.axway.mbaas:id/customobjects_update_update_button')
			.click() // It updates the object vlaue
			.waitForElementById('android:id/message', webdriver.asserters.isDisplayed, 10000)
			.getAttribute('text')
			.then(text => {
				text.should.include('"status":"fail"');
				text.should.include('"code":400');
			});
	});
});
