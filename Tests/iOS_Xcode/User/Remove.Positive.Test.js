'use strict';

const
	driver = global.driver,
	webdriver = global.webdriver,
	user = require(`${global.projRoot}/Config/data_config.js`).user,
	tempUser = require(`${global.projRoot}/Config/data_config.js`).tempUser;

describe('User Remove - Positive', () => {
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
			.elementById('Remove User')
			.click();
	});

	after(() => {
		return driver.resetApp();
	});

	it('Click on the User Remove Button', () => {
		return driver
			.elementByXPath('//XCUIElementTypeTextField[@value="EmailId"]')
			.sendKeys(tempUser.email)
			.elementById('Delete')
			.click()
			.waitForElementByXPath('//XCUIElementTypeStaticText[2]', webdriver.asserters.isDisplayed, 10000)
			.getAttribute('name')
			.then(text => {
				text.includes('code = 200').should.equal(true);
				text.includes('"method_name" = batchDelete').should.equal(true);
			});
	});
});
