'use strict';
const
	driver = global.driver,
	webdriver = global.webdriver,
	user = require(`${global.projRoot}/Config/data_config.js`).user,
	customObject = require(`${global.projRoot}/Config/data_config.js`).customObject;
describe('Create Object - Positive', () => {
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
			.elementByAndroidUIAutomator('new UiSelector().text("Create Object")')
			.click(); // Navigates to Create Object
	});
	after(() => {
		return driver.resetApp();
	});
	it('Enter a class name', () => {
		return driver
			.elementById('com.example.axway.mbaas:id/customobjects_create_class_name_field')
			.sendKeys(customObject.className) // binding static information to input fields to create a class name
			.elementById('com.example.axway.mbaas:id/customobjects_create_class_name_field')
			.text().should.become(customObject.className);
	});
	it('Enter a new property key', () => {
		return driver
			.elementById('com.example.axway.mbaas:id/customobjects_create_new_property_key_field')
			.sendKeys(customObject.propertyKey) // binding static information to input fields to create a property key
			.elementById('com.example.axway.mbaas:id/customobjects_create_new_property_key_field')
			.text().should.become(customObject.propertyKey);
	});
	it('Add new property value and Create a Custom Object', () => {
		return driver
			.elementById('com.example.axway.mbaas:id/customobjects_create_add_new_property_button')
			.click()
			.elementByAndroidUIAutomator('new UiSelector().text("New Property Key")')
			.sendKeys(customObject.propertyValue) // binding static information to input fields to create a property value
			.elementByAndroidUIAutomator(`new UiSelector().text("${customObject.propertyValue}")`)
			.isDisplayed().should.become(true);
	});
	it('Create a Custom Object', () => {
		return driver
			.elementById('com.example.axway.mbaas:id/customobjects_create_create_button')
			.click() // It creates a custom object
			.waitForElementById('android:id/message', webdriver.asserters.isDisplayed, 10000)
			.getAttribute('text')
			.then(text => {
				text.should.include('"status":"ok"');
				text.should.include('"code":200');
				text.should.include('"method_name":"createObject"');
			});
	});
});
