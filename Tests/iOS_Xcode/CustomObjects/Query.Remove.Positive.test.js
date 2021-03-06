'use strict';
const
	driver = global.driver,
	webdriver = global.webdriver,
	user = require(`${global.projRoot}/Config/data_config.js`).user,
	customObject = require(`${global.projRoot}/Config/data_config.js`).customObject;
describe('Query Remove Object - Positive', () => {
	before(() => {
		return driver
			.elementById('Users')
			.click()
			.elementById('Login User')
			.click()
			.elementByXPath('//XCUIElementTypeTextField[@value="Username"]')
			.sendKeys(user.username)
			.elementByXPath('//XCUIElementTypeSecureTextField[@value="Password"]')
			.sendKeys(user.password)
			.elementByXPath('//XCUIElementTypeButton[@name="Login"]')
			.click()
			.waitForElementById('OK', webdriver.asserters.isDisplayed, 10000)
			.click()
			.elementById('Axway')
			.click()
			.elementById('Custom Objects')
			.click()
			.waitForElementById('Query Custom Object', webdriver.asserters.isDisplayed, 10000)
			.click()
			.waitForElementByXPath('//XCUIElementTypeTextField[@value="Class Name"]', webdriver.asserters.isDisplayed, 10000);
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
				text.includes('code = 200').should.equal(true);
				text.should.include('"method_name" = deleteObjects');
				text.should.include('status = ok');
			});
	});
});
