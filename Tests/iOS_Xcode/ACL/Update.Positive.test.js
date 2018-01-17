'use strict';

const
	driver = global.driver,
	webdriver = global.webdriver,
	//creating instance to get data placed in data config file
	acl = require(`${global.projRoot}/Config/data_config.js`).acl,
	user = require(`${global.projRoot}/Config/data_config.js`).user;

describe('ACL Update - Positive', () => {
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
			.sendKeys(acl.name) //binding static information to input fields
			.hideKeyboard()
            //In this case we need readers and writers due to some limitation in appium we are directly binding data  
			.waitForElementById(`${user.firstName} ${user.lastName}`)
			.click()
			.waitForElementById(`${user.firstName} ${user.lastName}`)
			.click()
			
	});

	it('Update ACL',()=>{
		return driver
		.elementById('Update ACL') //will search for element id namely update acl
		.click()
		.waitForElementByXPath('//XCUIElementTypeStaticText[2]', webdriver.asserters.isDisplayed, 10000)
		.getAttribute('value')
		.then(text => {
			text.should.include('code = 200');
			text.should.include('"method_name" = updateAcl');
			text.should.include(`name = "${acl.name}"`);
			text.should.include('"public_read" = 0');
			text.should.include('"public_write" = 0');
		});
	  });
});
