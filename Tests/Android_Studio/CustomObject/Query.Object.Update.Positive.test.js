'use strict';
const
	driver = global.driver,
	webdriver = global.webdriver,
	user = require(`${global.projRoot}/Config/data_config.js`).user,
	customObject = require(`${global.projRoot}/Config/data_config.js`).customObject;
describe('Query Object Update - Positive', () => {
	before(() => {
		return driver
			.elementById('com.example.axway.mbaas:id/btn_login')
			.click()
			.elementByAndroidUIAutomator('new UiSelector().text("Users")')
			.click()
			.elementByAndroidUIAutomator('new UiSelector().text("Login User")')
			.click()
			.elementById('com.example.axway.mbaas:id/users_login_username_field')
			.sendKeys(user.username)
			.elementById('com.example.axway.mbaas:id/users_login_password_field')
			.sendKeys(user.password)
			.elementById('com.example.axway.mbaas:id/users_login_button1')
			.click()
			.waitForElementByAndroidUIAutomator('new UiSelector().text("Success!")', webdriver.asserters.isDisplayed, 10000)
			.elementById('android:id/button1')
			.click()
			.back()
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
				text.should.include('"status":"ok"');
				text.should.include('"code":200');
				text.should.include('"method_name":"updateCustomObject"');
			});
	});
});
