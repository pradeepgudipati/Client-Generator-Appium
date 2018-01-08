'use strict';

const
	driver = global.driver,
	webdriver = global.webdriver;

describe('User Login - Positive', () => {
	before(() => {
		return driver
			.elementById('Users')
			.click()
			.elementById('Login User')
			.click();
	});

	after(() => {
		return driver.resetApp();
	});

	it('Enter Username', () => {
		return driver
			.elementByXPath('//XCUIElementTypeTextField[@value="Username"]')
			.sendKeys('wluu')
			.elementByXPath('//XCUIElementTypeTextField[@value="wluu"]')
			.isDisplayed().should.become(true);
	});

	it('Enter Password', () => {
		return driver
			.elementByXPath('//XCUIElementTypeSecureTextField[@value="Password"]')
			.sendKeys('MonkeyLord!')
			.elementByXPath('//XCUIElementTypeSecureTextField[@value="•••••••••••"]')
			.isDisplayed().should.become(true);
	});

	it('Attempt Login', () => {
		return driver
			.elementByXPath('//XCUIElementTypeButton[@name="Login"]')
			.click()
			.waitForElementByXPath('//XCUIElementTypeStaticText[2]', webdriver.asserters.isDisplayed, 10000)
			.getAttribute('name')
			.then(text => {
				// text.includes('email = "wluu@appcelerator.com"').should.equal(true);
				// text.includes('"first_name" = Wilson').should.equal(true);
				// text.includes('"last_name" = Luu').should.equal(true);
				console.log(text);
				text.includes('code = 200').should.equal(true);
			});
	});
});
