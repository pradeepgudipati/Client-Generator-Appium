'use strict';

const
	driver = global.driver,
	webdriver = global.webdriver,
	acl = require(`${global.projRoot}/Config/data_config.js`).acl,
	user = require(`${global.projRoot}/Config/data_config.js`).user;

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

	it('Update an ACL', () => {
		return driver
			.elementById('Enter ACL name')
			.sendKeys(acl.name)
			.hideKeyboard()
			.isDisplayed().should.become(true)
		
			// .elementById('Select Readers')
			// .click()
			// .waitForElementById(`${user.firstName} ${user.lastName}`)
			// .click()
			// .elementById('Done')
			// .click()
			// .elementById('Select Writers')
			// .click()
			// .waitForElementById(`${user.firstName} ${user.lastName}`)
			// .click()
	});

	it('Update ACL',() => {

	  return driver
			.elementById('Update ACL')
			.click()
			.waitForElementByXPath('//XCUIElementTypeStaticText[2]', webdriver.asserters.isDisplayed, 10000)
			.getAttribute('value')
			.then(text => {
				text.should.include('code = 400');
				text.should.include('message = "Failed to authenticate user"');
			});

	});

});
