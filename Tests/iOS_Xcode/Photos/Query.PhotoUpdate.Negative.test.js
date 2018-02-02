'use strict';

const
	driver = global.driver,
	webdriver = global.webdriver;
	
describe('Photo Update - Negative', () => {
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

	it('Update a Photo', () => {
		return driver
			.waitForElementById('Update', webdriver.asserters.isDisplayed, 10000)
            .click()
            .waitForElementByXPath('//XCUIElementTypeButton[@name="OK"]', webdriver.asserters.isDisplayed, 10000)
			.click()
			.waitForElementByXPath('//XCUIElementTypeCell[@name="Photo, Landscape, August 08, 2012, 11:52 AM"]')
			.click()
			.elementById('Choose')
			.click()
			.waitForElementByXPath('//XCUIElementTypeStaticText[2]', webdriver.asserters.isDisplayed, 10000)
			.getAttribute('name')
			.then(text => {
				text.includes('code = 400').should.equal(true);
				text.includes('status = fail');
			});
          
	});
});