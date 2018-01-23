'use strict';

const
	driver = global.driver,
	webdriver = global.webdriver,
	user = require(`${global.projRoot}/Config/data_config.js`).user,
	customObject = require(`${global.projRoot}/Config/data_config.js`).customObject;

describe('Query Remove Object - Negative', () => {
	before(() => {
		return driver
        .elementById('Custom Objects')
        .click()
        .waitForElementById('Query Custom Object', webdriver.asserters.isDisplayed, 10000)
        .click()
        .waitForElementByXPath('//XCUIElementTypeButton[@name="Query"]', webdriver.asserters.isDisplayed, 10000);

	});

	after(() => {
		return driver.resetApp();
	});
    it('Enter a class name', () => {
		return driver
			.elementByXPath('//XCUIElementTypeTextField[@value="Class Name"]')
			.sendKeys(customObject.className)
			.elementByXPath(`//XCUIElementTypeTextField[@value="${customObject.className}"]`)
			.isDisplayed().should.become(true);
	});
	it('Get a Query Object', () => {
		return driver
			.elementById('Query')
            .click()
            .sleep(10000)
            .waitForElementById(`${customObject.queryId}`)
			.click()
			.waitForElementByXPath('//XCUIElementTypeButton[@name="Remove"]', webdriver.asserters.isDisplayed, 10000)
			.click();
	});
	it('Remove Query Object', () => {
		return driver

			.waitForElementById('Update values',webdriver.asserters.isDisplayed, 10000)
			.elementByXPath('//XCUIElementTypeButton[@name="Remove"]')
			.click()
			.waitForElementByXPath('//XCUIElementTypeStaticText[2]', webdriver.asserters.isDisplayed, 10000)
			.getAttribute('name')
			.then(text => {
                text.should.include('"method_name" = deleteObjects');
                text.should.includes('status = fail').should.equal(true);
			});
	});
});