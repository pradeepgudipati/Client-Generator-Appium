'use strict';

const
	driver = global.driver,
	webdriver = global.webdriver;

describe('User Logout - Positive', () => {
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
			.elementById('Logout Current User')
			.click();
	});

	after(() => {
		return driver.resetApp();
	});

	it('Validate That Logout Message is Correct', () => {
		return driver
			.waitForElementByXPath('//XCUIElementTypeStaticText[2]', webdriver.asserters.isDisplayed, 10000)
			.getAttribute('name')
			.then(text => {
				text.includes('code = 200').should.equal(true);
			});
	});
});