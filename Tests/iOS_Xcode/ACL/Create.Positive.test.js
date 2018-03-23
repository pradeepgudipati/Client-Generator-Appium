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
			.sendKeys(user.username) // binding static information to input fields
			.elementByXPath('//XCUIElementTypeSecureTextField[@value="Password"]')
			.sendKeys(user.password) // binding static information to input fields
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
	it('Enter ACL name', () => {
		return driver
			.elementById('Enter ACL name')
			.sendKeys(acl.name) // binding static information to input fields
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
			.elementById(acl.name)
			.isDisplayed().should.become(true);
	});
	it('Create ACL', () => {
		return driver
			.elementById('Create ACL') // will search for element id namely create acl
			.click()
			.waitForElementByXPath('//XCUIElementTypeStaticText[2]', webdriver.asserters.isDisplayed, 10000)
			.getAttribute('value')
			.then(text => { // Api response is handled
				text.should.include('code = 200');
				text.should.include('"method_name" = createAcl');
				text.should.include(`name = "${acl.name}"`);
				text.should.include('"public_read" = 0');
				text.should.include('"public_write" = 0');
			});
	});
});
