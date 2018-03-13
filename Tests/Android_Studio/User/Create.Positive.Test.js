'use strict';

const
	driver = global.driver,
	webdriver = global.webdriver,
	user = require(`${global.projRoot}/Config/data_config.js`).user,
	tempUser = require(`${global.projRoot}/Config/data_config.js`).tempUser;

describe('User Creation - Positive', () => {
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
			.elementByAndroidUIAutomator('new UiSelector().text("Create User")')
			.click();
	});

	after(() => {
		return driver.resetApp();
	});

	it('Enter Username', () => {
		return driver
			.elementById('com.example.axway.mbaas:id/users_create_username_field')
			.sendKeys(tempUser.username)
			.elementById('com.example.axway.mbaas:id/users_create_username_field')
			.text().should.become(tempUser.username);
	});

	it('Enter Password', () => {
		return driver
			.elementById('com.example.axway.mbaas:id/users_create_password_field')
			.sendKeys(tempUser.password)
			.sleep(2000) // Wait for all of the password to be dotted out
			.elementById('com.example.axway.mbaas:id/users_create_password_field')
			.text().should.become('•••••••••••');
	});

	it('Enter Password Again', () => {
		return driver
			.elementById('com.example.axway.mbaas:id/users_create_password_conf_field')
			.sendKeys(tempUser.password)
			.sleep(2000) // Wait for all of the password to be dotted out
			.elementById('com.example.axway.mbaas:id/users_create_password_conf_field')
			.text().should.become('•••••••••••');
	});

	it('Enter First Name', () => {
		return driver
			.elementById('com.example.axway.mbaas:id/users_create_first_name_field')
			.sendKeys(tempUser.firstName)
			.elementById('com.example.axway.mbaas:id/users_create_first_name_field')
			.text().should.become(tempUser.firstName);
	});

	it('Enter Last Name', () => {
		return driver
			.elementById('com.example.axway.mbaas:id/users_create_last_name_field')
			.sendKeys(tempUser.lastName)
			.elementById('com.example.axway.mbaas:id/users_create_last_name_field')
			.text().should.become(tempUser.lastName);
	});

	it('Enter Email', () => {
		return driver
			.elementById('com.example.axway.mbaas:id/users_create_email_field')
			.sendKeys(tempUser.email)
			.elementById('com.example.axway.mbaas:id/users_create_email_field')
			.text().should.become(tempUser.email);
	});

	it('Should Successfully Create the User', () => {
		return driver
			.elementById('com.example.axway.mbaas:id/users_create_button1')
			.click()
			.waitForElementById('android:id/message', webdriver.asserters.isDisplayed, 10000)
			.getAttribute('text')
			.then(text => {
				text.should.equal(`User ${tempUser.username}Created!!`)
			});
	});
});