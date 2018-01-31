'use strict';

const
	driver = global.driver,
	webdriver = global.webdriver,
	acl = require(`${global.projRoot}/Config/data_config.js`).acl;

describe('ACL Delete - Negative', () => {
	before(() => {
		return driver
			.elementById('Access Control')
			.click()
			.waitForElementById('Show ACL', webdriver.asserters.isDisplayed, 10000)
			.click()
			.waitForElementByXPath('//XCUIElementTypeNavigationBar[@name="Show"]', webdriver.asserters.isDisplayed, 10000);
	});

	after(() => {
		return driver.resetApp();
	});

	it('Attempt to Delete the ACL', () => {
		return driver
			.elementById('Enter ACL name')
			.sendKeys(acl.name)
			.hideKeyboard()
			.elementById('Delete ACL')
			.click()
			.waitForElementByXPath('//XCUIElementTypeStaticText[2]', webdriver.asserters.isDisplayed, 10000)
			.getAttribute('value')
			.then(text => {
				text.should.include('code = 400');
				text.should.include('message = "Failed to authenticate user"');
			});
	});
});
