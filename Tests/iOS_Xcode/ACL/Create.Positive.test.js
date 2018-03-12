'use strict';
const
	driver = global.driver,
	webdriver = global.webdriver,
<<<<<<< HEAD
=======
	//creating instance to get data placed in data config file
>>>>>>> f699af831371134ed8ba76d286fee05df8b3aa75
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
<<<<<<< HEAD
=======
			//will wait for 10000 seconds when alert is being display
>>>>>>> f699af831371134ed8ba76d286fee05df8b3aa75
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
<<<<<<< HEAD

	it('Create an ACL', () => {
=======
	it('Enter ACL name', () => {
>>>>>>> f699af831371134ed8ba76d286fee05df8b3aa75
		return driver
			.elementById('Enter ACL name')
			.sendKeys(acl.name)
			.hideKeyboard()
<<<<<<< HEAD
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
=======
			.elementById(acl.name)
			.isDisplayed().should.become(true)
	});
	it('Create ACL', () => {
		return driver
			.elementById('Create ACL') //will search for element id namely create acl
>>>>>>> f699af831371134ed8ba76d286fee05df8b3aa75
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
