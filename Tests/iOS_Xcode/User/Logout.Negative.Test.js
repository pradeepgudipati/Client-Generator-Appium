'use strict';

const
	driver = global.driver,
	webdriver = global.webdriver,
	user = require(`${global.projRoot}/Config/data_config.js`).user,
	tempUser = require(`${global.projRoot}/Config/data_config.js`).tempUser;

describe('User Logout- Negative', () => {
	before(() => {
		return driver
			.elementById('Users')
			.click()
			.elementById('Logout Current User')
			.click();
	});

	after(() => {
		return driver.resetApp();
	});

	it('Click on the User Remove Button', () => {
		return driver
		.waitForElementByXPath('//XCUIElementTypeStaticText[2]', webdriver.asserters.isDisplayed, 10000)
			.console.log(text)
			.then(text => {
				text.includes('status = fail').should.equal(true);

			});
	});
});