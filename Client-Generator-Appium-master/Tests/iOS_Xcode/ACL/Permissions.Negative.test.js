'use strict';

const
	driver = global.driver,
	webdriver = global.webdriver,
	acl = require(`${global.projRoot}/Config/data_config.js`).acl,
	user = require(`${global.projRoot}/Config/data_config.js`).user;

describe('ACL Permissions - Positive', () => {
	before(() => {
		return driver
			.elementById('Access Control')
			.click()
			.waitForElementById('Check Permission of ACL', webdriver.asserters.isDisplayed, 10000)
			.click()
			.waitForElementByXPath('//XCUIElementTypeNavigationBar[@name="Check Permissions"]', webdriver.asserters.isDisplayed, 10000);
	});

	after(() => {
		return driver.resetApp();
	});

	it('Attempt to Show the ACL Permissions', () => {
		return driver
			.elementById('Enter ACL name')
			.sendKeys(acl.name)
			.hideKeyboard()
			.elementById('Check')
			.click()
			.waitForElementByXPath('//XCUIElementTypeStaticText[2]', webdriver.asserters.isDisplayed, 10000)
			.getAttribute('value')
			.then(text => {
				text.should.equal('Please login to get user details');
			});
	});
});