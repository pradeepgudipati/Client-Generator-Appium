'use strict';
const
	driver = global.driver,
	webdriver = global.webdriver,
	newUser = require(`${global.projRoot}/Config/data_config.js`).newUserCreateAndDetails;
describe('User Creation - Positive', () => {
	before(() => {
		return driver
			.elementById('com.example.axway.mbaas:id/btn_login')
			.click()
			.elementByAndroidUIAutomator('new UiSelector().text("Users")')
			.click()
			.elementByAndroidUIAutomator('new UiSelector().text("Create User")')
			.click();
	});
	after(() => {
		return driver.resetApp();
	});
	it('Enter Username', () => {
		return driver
			.elementById('com.example.axway.mbaas:id/users_create_username_field')
			.sendKeys(newUser.username)
			.elementById('com.example.axway.mbaas:id/users_create_username_field')
			.text().should.become(newUser.username);
	});
	it('Enter Password', () => {
		return driver
			.elementById('com.example.axway.mbaas:id/users_create_password_field')
			.sendKeys(newUser.password)
			.elementById('com.example.axway.mbaas:id/users_create_password_field')
			.text().should.become('');
	});
	it('Enter Password Again', () => {
		return driver
			.elementById('com.example.axway.mbaas:id/users_create_password_conf_field')
			.sendKeys(newUser.password)
			.elementById('com.example.axway.mbaas:id/users_create_password_conf_field')
			.text().should.become('');
	});
	it('Enter First Name', () => {
		return driver
			.elementById('com.example.axway.mbaas:id/users_create_first_name_field')
			.sendKeys(newUser.firstName)
			.elementById('com.example.axway.mbaas:id/users_create_first_name_field')
			.text().should.become(newUser.firstName);
	});
	it('Enter Last Name', () => {
		return driver
			.elementById('com.example.axway.mbaas:id/users_create_last_name_field')
			.sendKeys(newUser.lastName)
			.elementById('com.example.axway.mbaas:id/users_create_last_name_field')
			.text().should.become(newUser.lastName);
	});
	it('Enter Email', () => {
		return driver
			.elementById('com.example.axway.mbaas:id/users_create_email_field')
			.sendKeys(newUser.email)
			.elementById('com.example.axway.mbaas:id/users_create_email_field')
			.text().should.become(newUser.email)
			.hideKeyboard();
	});
	it('Should Successfully Create the User', () => {
		return driver
			.elementById('com.example.axway.mbaas:id/users_create_button1')
			.click()
			.waitForElementById('android:id/message', webdriver.asserters.isDisplayed, 10000)
			.getAttribute('text')
			.then(text => {
				text.should.include('"status":"ok"');
				text.should.include('"code":200');
				text.should.include('"method_name":"createUser"');
			});
	});
});