'use strict';

const
	driver = global.driver,
	webdriver = global.webdriver,
	acl = require(`${global.projRoot}/Config/data_config.js`).acl,
	user = require(`${global.projRoot}/Config/data_config.js`).user;

describe('ACL Create - Positive', () => {
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
			.waitForElementById('Create ACL', webdriver.asserters.isDisplayed, 10000)
			.click()
			.waitForElementByXPath('//XCUIElementTypeNavigationBar[@name="Create"]', webdriver.asserters.isDisplayed, 10000);
	});

	after(() => {
		return driver.resetApp();
	});

	it('Create an ACL', () => {
		return driver
			.elementById('Enter ACL name')
			.sendKeys(acl.name)
			.hideKeyboard()
			.elementById('Select Readers')
			.click()
			.waitForElementById(`${user.firstName} ${user.lastName}`)
			.click()
			.elementById('Done')
			.click()
			.elementById('Select Writers')
			.click()
			.waitForElementById(`${user.firstName} ${user.lastName}`)
			.click()
			.elementById('Done')
			.click()
			.elementById('Create ACL')
			.click()
			.waitForElementByXPath('//XCUIElementTypeStaticText[2]', webdriver.asserters.isDisplayed, 10000)
			.getAttribute('value')
			.then(text => {
				text.should.include('code = 200');
				text.should.include('"method_name" = createAcl');
				text.should.include(`name = "${acl.name}"`);
				text.should.include('"public_read" = 0');
				text.should.include('"public_write" = 0');
			});
	});
});
