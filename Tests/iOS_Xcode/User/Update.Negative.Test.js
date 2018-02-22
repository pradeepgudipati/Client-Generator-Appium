'use strict';

const
	driver = global.driver,
	webdriver = global.webdriver;

describe('User Update - Negative', () => {
	before(() => {
		return driver
			.elementById('Users')
			.click()
			.elementById('Update Current User')
			.click();
	});

	after(() => {
		return driver.resetApp();
	});

	it('Click on the User Update Button', () => {
		return driver
			.waitForElementByXPath('//XCUIElementTypeStaticText[2]', webdriver.asserters.isDisplayed, 10000)
			.getAttribute('name')
			.then(text => {
				text.includes('message = "You need to sign in or sign up before continuing."').should.equal(true);
				text.includes('code = 401').should.equal(true);
			});
	});
});
