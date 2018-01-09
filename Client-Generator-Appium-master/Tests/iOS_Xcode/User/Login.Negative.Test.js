'use strict';

const
	driver = global.driver,
	webdriver = global.webdriver,
	user = require(`${global.projRoot}/Config/data_config.js`).user;

// App crashes if you attempt to login with invalid credentials

describe('User Login - Negative', () => {
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
			.sendKeys(user.username)
			.elementByXPath(`//XCUIElementTypeTextField[@value="${user.username}"]`)
			.isDisplayed().should.become(true);
	});

	it('Enter Password', () => {
		return driver
			.elementByXPath('//XCUIElementTypeSecureTextField[@value="Password"]')
			.sendKeys('IncorrectPassword')
			.elementByXPath('//XCUIElementTypeSecureTextField[@value="•••••••••••••••••"]')
			.isDisplayed().should.become(true);
	});

	it('Attempt Login', () => {
		return driver
			.elementByXPath('//XCUIElementTypeButton[@name="Login"]')
			.click()
			.waitForElementByXPath('//XCUIElementTypeStaticText[2]', webdriver.asserters.isDisplayed, 10000)
			.getAttribute('name')
			.then(text => {
				console.log(text);
				text.includes('code = 401').should.equal(true);
			});
	});
});