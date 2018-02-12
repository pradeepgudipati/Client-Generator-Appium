'use strict';

const
	driver = global.driver,
	webdriver = global.webdriver,
	user = require(`${global.projRoot}/Config/data_config.js`).user,
	tempUser = require(`${global.projRoot}/Config/data_config.js`).tempUser;

describe('User Remove - Negative', () => {
	before(() => {
		return driver
			.elementById('Users')
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
			.sendKeys(tempUser.secondEmail)
			.elementById('Delete')
			.click()
			.waitForElementByXPath('//XCUIElementTypeStaticText[2]', webdriver.asserters.isDisplayed, 10000)
			.getAttribute('value')
			.then(text => {
				text.includes('code = 403').should.equal(true);
				text.includes('status = fail');
			});
	});
});