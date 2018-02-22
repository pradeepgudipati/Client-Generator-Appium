'use strict';
const
	driver = global.driver,
	webdriver = global.webdriver;
describe('Photo Delete - Negative', () => {
	before(() => {
		return driver
			.elementById('Photos')
			.click()
			.elementById('Query Photo')
			.click()
			.waitForElementById('0 .png', webdriver.asserters.isDisplayed, 10000)
			.click();
	});
	after(() => {
		return driver.resetApp();
	});
	it('Delete a Photo', () => {
		return driver
			.waitForElementById('Delete', webdriver.asserters.isDisplayed, 10000)
			.click()
			.waitForElementByXPath('//XCUIElementTypeStaticText[2]', webdriver.asserters.isDisplayed, 10000)
			.getAttribute('name')
			.then(text => {
				text.includes('code = 400').should.equal(true);
				text.includes('status = fail');
			});
	});
});
