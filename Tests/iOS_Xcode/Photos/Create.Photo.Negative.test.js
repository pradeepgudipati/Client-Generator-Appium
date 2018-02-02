'use strict';

const
	driver = global.driver,
	webdriver = global.webdriver;

describe('Photo Create - Negative', () => {
	before(() => {
		return driver
			.elementById('Photos')
			.click()
			.elementById('Create Photo')
			.click()
			.waitForElementById('Select Photo From Gallery', webdriver.asserters.isDisplayed, 10000)
			.click();
	});

	after(() => {
		return driver.resetApp();
	});

	it('Create a Photo', () => {
		return driver
			.waitForElementByXPath('//XCUIElementTypeButton[@name="OK"]', webdriver.asserters.isDisplayed, 10000)
			.click()
			.waitForElementByXPath('//XCUIElementTypeCell[@name="Photo, Landscape, August 08, 2012, 11:52 AM"]')
			.click()
			.elementById('Choose')
			.click()
			.elementById('Create')
			.click()
			.waitForElementByXPath('//XCUIElementTypeStaticText[2]', webdriver.asserters.isDisplayed, 50000)
			.getAttribute('name')
			.then(text => {
				text.includes('code = 400').should.equal(true);
				text.includes('status = fail');
			});
           
	});
});