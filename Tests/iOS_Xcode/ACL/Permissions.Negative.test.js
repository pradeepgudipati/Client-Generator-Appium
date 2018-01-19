'use strict';

const
	driver = global.driver,
	webdriver = global.webdriver,
	//creating instance to get data placed in data config file
	acl = require(`${global.projRoot}/Config/data_config.js`).acl,
	user = require(`${global.projRoot}/Config/data_config.js`).user;

describe('ACL Permissions - Negative', () => {
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

	it('Enter ACL name', () => {
		return driver
		.elementById('Enter ACL name')
		.sendKeys(acl.name) //binding static information to input fields
		.hideKeyboard()
		.elementById(acl.name)
		.isDisplayed().should.become(true)
	});


	it('Show ACL Permissions', () => { 
		return driver
		.elementById('Check') //will search for element id namely check
		.click()
		.waitForElementByXPath('//XCUIElementTypeStaticText[2]', webdriver.asserters.isDisplayed, 10000)
		.getAttribute('value')
		.then(text => {
			text.should.equal('Please login to get user details');
		});
  
	  });
});