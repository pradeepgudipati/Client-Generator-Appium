'use strict';
const
	driver = global.driver,
	webdriver = global.webdriver,
	// creating instance to get data placed in data config file
	acl = require(`${global.projRoot}/Config/data_config.js`).acl;
describe('ACL Update - Negative', () => {
	before(() => {
		return driver
			.elementById('Axway')
			.click()
			.elementById('Access Control')
			.click()
			.waitForElementById('Update User in ACL', webdriver.asserters.isDisplayed, 10000)
			.click()
			.waitForElementByXPath('//XCUIElementTypeNavigationBar[@name="Update"]', webdriver.asserters.isDisplayed, 10000);
	});
	after(() => {
		return driver.resetApp();
	});
	it('Enter ACL name', () => {
		return driver
			.elementById('Enter ACL name')
			.sendKeys(acl.name) // binding static information to input fields
			.hideKeyboard()
			.elementById(acl.name)
			.isDisplayed().should.become(true);
	});
	it('Update ACL', () => {
		return driver
			.elementById('Update ACL') // will search for element id namely update acl
			.click()
			.waitForElementByXPath('//XCUIElementTypeStaticText[2]', webdriver.asserters.isDisplayed, 10000)
			.getAttribute('value')
			.then(text => {
				text.should.include('code = 400');
				text.should.include('message = "Failed to authenticate user"');
			});
	});
});
