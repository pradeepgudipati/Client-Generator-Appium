'use strict';

const
	driver = global.driver,
	webdriver = global.webdriver,
	acl = require(`${global.projRoot}/Config/data_config.js`).acl,
	user = require(`${global.projRoot}/Config/data_config.js`).user;

describe('ACL Permissions - Positive', () => {
	before(() => {
		return driver
			.elementById('Users')
			.click()
			.elementById('Login User')
			.click()
			.elementByXPath('//XCUIElementTypeTextField[@value="Username"]')
			.sendKeys(user.username)
			.elementByXPath('//XCUIElementTypeSecureTextField[@value="Password"]')
			.sendKeys(user.password)
			.elementByXPath('//XCUIElementTypeButton[@name="Login"]')
			.click()
			.waitForElementById('OK', webdriver.asserters.isDisplayed, 10000)
			.click()
			.elementById('Axway')
			.click()
			.elementById('Access Control')
			.click()
			.waitForElementById('Check Permission of ACL', webdriver.asserters.isDisplayed, 10000)
			.click()
			.waitForElementByXPath('//XCUIElementTypeNavigationBar[@name="Check Permissions"]', webdriver.asserters.isDisplayed, 10000);
	});

	after(() => {
		return driver.resetApp();
	});

	it('Show the ACL Permissions', () => {
		return driver
			.elementById('Enter ACL name')
			.sendKeys(acl.name)
			.hideKeyboard()
			.elementById('Check')
			.click()
			.waitForElementByXPath('//XCUIElementTypeStaticText[2]', webdriver.asserters.isDisplayed, 10000)
			.getAttribute('value')
			.then(text => {
				text.should.include('code = 200');
				text.should.include('"method_name" = checkAcl');
				text.should.include('"read_permission" = 1');
				text.should.include('"write_permission" = 1');
			});
	});
});