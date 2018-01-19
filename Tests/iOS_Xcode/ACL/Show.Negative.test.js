'use strict';

const
	driver = global.driver,
	webdriver = global.webdriver,
	//creating instance to get data placed in data config file
	acl = require(`${global.projRoot}/Config/data_config.js`).acl;

describe('ACL Show - Negative', () => {
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

	it('Enter ACL name', () => {
		return driver
			.elementById('Enter ACL name')
			.sendKeys(acl.name) //binding static information to input fields
			.hideKeyboard()
			.elementById(acl.name)
			.isDisplayed().should.become(true)
			
	});

	it('Show ACL',() => {
		return driver
		  .elementById('Show ACL') //will search for element id namely show acl
		  .click()
		  .waitForElementByXPath('//XCUIElementTypeStaticText[2]', webdriver.asserters.isDisplayed, 10000)
		  .getAttribute('value')
		  .then(text => {
			text.should.include('code = 400');
			text.should.include('"method_name" = showAcl');
			text.should.include('message = "Invalid ACL name"');
		  });


  });
});