'use strict';
const
	driver = global.driver,
	webdriver = global.webdriver,
	user = require(`${global.projRoot}/Config/data_config.js`).user,
	customObject = require(`${global.projRoot}/Config/data_config.js`).customObject;
describe('Create Object - Positive', () => {
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
			.sendKeys(customObject.className) // binding static information to input fields to create a class name
			.elementByXPath(`//XCUIElementTypeTextField[@value="${customObject.className}"]`)
			.isDisplayed().should.become(true);
	});
	it('Enter a new property key', () => {
		return driver
			.elementByXPath('//XCUIElementTypeTextField[@value="New Propert Key"]')
			.sendKeys(customObject.propertyKey) // binding static information to input fields to create a property key
			.elementByXPath(`//XCUIElementTypeTextField[@value="${customObject.propertyKey}"]`)
			.isDisplayed().should.become(true);
	});
	it('Add new property with key value', () => {
		return driver
			.elementById('Add New Property')
			.click()
			.elementByXPath(`//XCUIElementTypeTextField[@value="${customObject.propertyKey}"][2]`)
			.sendKeys(customObject.propertyValue) // binding static information to input fields to create a property key value
			.elementByXPath(`//XCUIElementTypeTextField[@value="${customObject.propertyValue}"]`)
			.isDisplayed().should.become(true);
	});
	it('Create a Custom Object', () => {
		return driver
			.elementById('Create') // will search for element id namely to create object
			.click()
			.waitForElementByXPath('//XCUIElementTypeStaticText[2]', webdriver.asserters.isDisplayed, 10000)
			.getAttribute('value')
			.then(text => {
				text.should.include('code = 200');
				text.should.include('"method_name" = createObject');
				text.should.include('status = ok');
			});
	});
});
