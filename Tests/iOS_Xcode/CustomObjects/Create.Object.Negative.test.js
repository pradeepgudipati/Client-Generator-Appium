'use strict';
const
	driver = global.driver,
	webdriver = global.webdriver,
	customObject = require(`${global.projRoot}/Config/data_config.js`).customObject;
describe('Create Object - Negative', () => {
	before(() => {
		return driver
			.elementById('Custom Objects')
			.click()
			.waitForElementById('Create Custom Object', webdriver.asserters.isDisplayed, 10000)
			.click()
			.waitForElementByXPath('//XCUIElementTypeTextField[@value="Class Name"]', webdriver.asserters.isDisplayed, 10000);
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
	it('Enter a new property key', () => {
		return driver
			.elementByXPath('//XCUIElementTypeTextField[@value="New Propert Key"]')
			.sendKeys(customObject.propertyKey)
			.elementByXPath(`//XCUIElementTypeTextField[@value="${customObject.propertyKey}"]`)
			.isDisplayed().should.become(true)
	});
	it('Add new property', () => {
		return driver
			.elementById('Add New Property')
			.click();
	});
	it('Create a Custom Object', () => {
		return driver
			.elementById('Create')
			.click()
			.waitForElementByXPath('//XCUIElementTypeStaticText[2]', webdriver.asserters.isDisplayed, 10000)
			.getAttribute('value')
			.then(text => {
				text.includes('code = 400').should.equal(true);
				text.should.include('status = fail');
			});
	});
});
