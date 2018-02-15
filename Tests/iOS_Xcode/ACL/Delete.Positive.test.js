'use strict';

const
	driver = global.driver,
	webdriver = global.webdriver,
	//creating instance to get data placed in data config file
	acl = require(`${global.projRoot}/Config/data_config.js`).acl,
	user = require(`${global.projRoot}/Config/data_config.js`).user;

describe('ACL Delete - Positive', () => {
	before(() => {
		return driver
			.elementById('Users')
			.click()
			.elementById('Login User')
			.click()
			.elementByXPath('//XCUIElementTypeTextField[@value="Username"]')
			.sendKeys(user.username) //binding static information to input fields
			.elementByXPath('//XCUIElementTypeSecureTextField[@value="Password"]')
			.sendKeys(user.password) //binding static information to input fields
			.elementByXPath('//XCUIElementTypeButton[@name="Login"]')
			.click()
			.waitForElementById('OK', webdriver.asserters.isDisplayed, 10000)
			.click()
			.elementById('Axway')
			.click()
			.elementById('Access Control')
			.click()
			.waitForElementById('Show ACL', webdriver.asserters.isDisplayed, 10000)
			.click()
			.waitForElementByXPath('//XCUIElementTypeNavigationBar[@name="Show"]', webdriver.asserters.isDisplayed, 10000);
	});

	after(() => {
		return driver.resetApp();
	});

	it('Enter ACL name', () => {
		return driver
		.elementById('Enter ACL name')
		.sendKeys(acl.name) //binding static information to input fields
		.hideKeyboard()
		.elementById(acl.name)
		.isDisplayed().should.become(true)
	});

	it('Delete  ACL', () => { //will search for element id namely delete acl
		return driver
			.elementById('Delete ACL')
			.click()
			.waitForElementByXPath('//XCUIElementTypeStaticText[2]', webdriver.asserters.isDisplayed, 10000)
			.getAttribute('value')
			.then(text => {
				text.should.include('code = 200');
				text.should.include('"method_name" = deleteAcl');
			});
	});
});