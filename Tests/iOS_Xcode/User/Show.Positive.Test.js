'use strict';

const
	driver = global.driver,
	webdriver = global.webdriver,
	user = require(`${global.projRoot}/Config/data_config.js`).user;

describe('User Show - Positive', () => {
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
			.elementById('Show Current User')
			.click();
	});

	after(() => {
		return driver.resetApp();
	});

	it('Check User Details Are Correct', () => {
		return driver
			.waitForElementByXPath('//XCUIElementTypeStaticText[2]', webdriver.asserters.isDisplayed, 10000)
			.getAttribute('name')
			.then(text => {
				text.includes(`"first_name" = ${user.firstName}`).should.equal(true);
				text.includes(`"last_name" = ${user.lastName}`).should.equal(true);
				text.includes(`username = ${user.username}`).should.equal(true);
				text.includes('code = 200').should.equal(true);
			});
	});
});