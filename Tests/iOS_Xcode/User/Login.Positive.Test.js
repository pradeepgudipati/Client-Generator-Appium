'use strict';

const
	driver = global.driver,
	webdriver = global.webdriver,
	user = require(`${global.projRoot}/Config/data_config.js`).user;

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
			.sendKeys(user.username)
			.elementByXPath(`//XCUIElementTypeTextField[@value="${user.username}"]`)
			.isDisplayed().should.become(true);
	});

	it('Enter Password', () => {
		return driver
			.elementByXPath('//XCUIElementTypeSecureTextField[@value="Password"]')
			.sendKeys(user.password)
			.elementByXPath('//XCUIElementTypeSecureTextField[@value="••••••••"]')
			.isDisplayed().should.become(true);
	});

	it('Attempt Login', () => {
		return driver
			.elementByXPath('//XCUIElementTypeButton[@name="Login"]')
			.click()
			.waitForElementByXPath('//XCUIElementTypeStaticText[2]', webdriver.asserters.isDisplayed, 10000)
			.getAttribute('name')
			.then(text => {
				text.includes(`email = "${user.email}"`).should.equal(true);
				text.includes(`"first_name" = ${user.firstName}`).should.equal(true);
				text.includes(`"last_name" = ${user.lastName}`).should.equal(true);
				text.includes('code = 200').should.equal(true);
			});
	});
});