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
			.sendKeys(customObject.className) // binding static information to input fields to search object
			.elementByXPath(`//XCUIElementTypeTextField[@value="${customObject.className}"]`)
			.isDisplayed().should.become(true);
	});
	it('Remove Query Object', () => {
		return driver
			.elementById('Query') // will search for element id namely to get list of objects
			.click()
			.waitForElementByXPath('//XCUIElementTypeCell[1]', webdriver.asserters.isDisplayed, 10000)
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
