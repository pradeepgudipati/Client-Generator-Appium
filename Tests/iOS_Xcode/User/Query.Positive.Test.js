'use strict';

const
	driver = global.driver,
	webdriver = global.webdriver,
	user = require(`${global.projRoot}/Config/data_config.js`).user;

// Querying a user calls the delete method?

describe('User Query - Positive', () => {
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
			.elementById('Query User')
			.click();
	});

	after(() => {
		return driver.resetApp();
	});

	it('Enter the Key', () => {
		return driver
			.sleep(2000)
			.elementByXPath('//XCUIElementTypeTextField[@value="Enter key"]')
			.sendKeys('First Name')
			.elementByXPath('//XCUIElementTypeTextField[@value="First Name"]')
			.isDisplayed().should.become(true);
	});

	it('Enter the Value', () => {
		return driver
			.elementByXPath('//XCUIElementTypeTextField[@value="Enter value"]')
			.sendKeys(user.firstName)
			.elementByXPath(`//XCUIElementTypeTextField[@value="${user.firstName}"]`)
			.isDisplayed().should.become(true);
	});

	it('Submit the Details and Check the Response', () => {
		return driver
			.elementById('Ok')
			.click()
			.waitForElementByXPath('//XCUIElementTypeStaticText[2]', webdriver.asserters.isDisplayed, 10000)
			.getAttribute('name')
			.then(text => {
				text.includes('code = 200').should.equal(true);
				text.includes('status = ok').should.equal(true);
			});
	});
});