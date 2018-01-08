'use strict';

const
	driver = global.driver,
	webdriver = global.webdriver;

// Currently the keyboard refuses to drop, so is in the way of the button press

describe('User Creation - Positive', () => {
	before(() => {
		return driver
			.elementById('Users')
			.click()
			.elementById('Create User')
			.click();
	});

	after(() => {
		return driver.resetApp();
	});

	afterEach(() => {
		return driver.hideKeyboard();
	});

	it('Enter a first name', () => {
		return driver
			.elementByXPath('//XCUIElementTypeTextField[@value="First Name"]')
			.sendKeys('Wilson')
			.elementByXPath('//XCUIElementTypeTextField[@value="Wilson"]')
			.isDisplayed().should.become(true);
	});

	it('Enter a last name', () => {
		return driver
			.elementByXPath('//XCUIElementTypeTextField[@value="Last Name"]')
			.sendKeys('Luu')
			.elementByXPath('//XCUIElementTypeTextField[@value="Luu"]')
			.isDisplayed().should.become(true);
	});

	it('Enter a user name', () => {
		return driver
			.elementByXPath('//XCUIElementTypeTextField[@value="User Name"]')
			.sendKeys('wluu')
			.elementByXPath('//XCUIElementTypeTextField[@value="wluu"]')
			.isDisplayed().should.become(true);
	});

	it('Enter an email', () => {
		return driver
			.elementByXPath('//XCUIElementTypeTextField[@value="Email ID"]')
			.sendKeys('wluu@appcelerator.com')
			.elementByXPath('//XCUIElementTypeTextField[@value="wluu@appcelerator.com"]')
			.isDisplayed().should.become(true);
	});

	it('Enter a password', () => {
		return driver
			.elementByXPath('//XCUIElementTypeSecureTextField[@value="Password"]')
			.sendKeys('MonkeyLord!')
			.elementByXPath('//XCUIElementTypeSecureTextField[@value="•••••••••••"]')
			.isDisplayed().should.become(true);
	});

	it('Confirm the password', () => {
		return driver
			.elementByXPath('//XCUIElementTypeSecureTextField[@value="Confirm Password"]')
			.sendKeys('MonkeyLord!')
			.elementsByXPath('//XCUIElementTypeSecureTextField[@value="•••••••••••"]')
			.then(elements => {
				elements.length.should.equal(2);
			});
	});

	it('Create the user', () => {
		return driver
			.elementById('CREATE')
			.click()
			.waitForElementByXPath('//XCUIElementTypeStaticText[2]', webdriver.asserters.isDisplayed, 10000)
			.getAttribute('value')
			.then(value => {
				value.includes('code = 200').should.equal(true);
			});
	});
});
