'use strict';

const
	driver = global.driver,
	webdriver = global.webdriver;

describe('User Show - Negative', () => {
	before(() => {
		return driver
			.elementById('Users')
			.click()
			.elementById('Show Current User')
			.click();
	});

	after(() => {
		return driver.resetApp();
	});

	it('Click on the User Show Button', () => {
		return driver
			.waitForElementById('Please login to get user details', webdriver.asserters.isDisplayed, 10000);
	});
});