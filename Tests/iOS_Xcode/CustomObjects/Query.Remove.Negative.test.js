'use strict';
const
	driver = global.driver,
	webdriver = global.webdriver,
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
	it('Remove Query Object', () => {
		return driver
			.elementById('Query')
			.click()
			.waitForElementById(`${customObject.queryId}`, webdriver.asserters.isDisplayed, 10000)
			.click()
			.waitForElementByXPath('//XCUIElementTypeButton[@name="Remove"]', webdriver.asserters.isDisplayed, 10000)
			.click()
			.elementByXPath('//XCUIElementTypeButton[@name="Delete"]')
			.click()
			.waitForElementByXPath('//XCUIElementTypeStaticText[2]', webdriver.asserters.isDisplayed, 10000)
			.getAttribute('name')
			.then(text => {
				text.should.include('"method_name" = deleteObjects');
				text.should.include('status = fail');
			});
	});
});
