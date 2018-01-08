'use strict';

const
	driver = global.driver,
	webdriver = global.webdriver;

// A basic user shouldn't be able to remove a user, this is an admin right

describe('User Remove - Positive', () => {
	before(() => {
		return driver
			.elementById('Users')
			.click()
			.elementById('Login User')
			.click()
			.elementByXPath('//XCUIElementTypeTextField[@value="Username"]')
			.sendKeys('wluu')
			.elementByXPath('//XCUIElementTypeSecureTextField[@value="Password"]')
			.sendKeys('MonkeyLord!')
			.elementByXPath('//XCUIElementTypeButton[@name="Login"]')
			.click()
			.waitForElementById('OK', webdriver.asserters.isDisplayed, 10000)
			.click()
			.elementById('Remove User')
			.click();
	});

	after(() => {
		return driver.resetApp();
	});

	it('Click on the User Remove Button', () => {
		return driver
			.elementByXPath('//XCUIElementTypeTextField[@value="EmailId"]')
			.sendKeys('wluu@appcelerator.com')
			.elementById('Delete')
			.click()
			.waitForElementByXPath('//XCUIElementTypeStaticText[2]', webdriver.asserters.isDisplayed, 10000)
			.getAttribute('name')
			.then(text => {
				// text.includes('message = "You are not authorized to perform this action."').should.equal(true);
				text.includes('code = 403').should.equal(true);
			});
	});
});
